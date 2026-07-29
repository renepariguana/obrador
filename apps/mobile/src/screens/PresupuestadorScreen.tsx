import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Share,
  Alert,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { AppHeader } from '../components/AppHeader'
import { Icon } from '../components/Icon'
import { useTheme, spacing, radius, Theme } from '../lib/theme'
import { getItemsAP, getItemsCache, getManoObra, getManoObraCache, pesos, RubroAP, ItemAP, ManoObra } from '../data/presupuestadorApi'
import { getMateriales, Material } from '../data/materialesApi'
import { listarPresupuestos, guardarPresupuesto, borrarPresupuesto, PresupuestoGuardado } from '../data/presupuestosApi'

const PROV = 'Tucumán' // provincia para el catálogo de materiales

// El usuario arma su propio análisis por unidad: 3 secciones con filas editables.
type CompEdit = { nombre: string; unidad: string; precio: number; cantidad: number; cantidadStr: string }
type AnalisisEdit = { materiales: CompEdit[]; manoobra: CompEdit[]; equipos: CompEdit[] }
type SecKey = 'materiales' | 'manoobra' | 'equipos'
// precioStr = precio del ítem (editable). Se recalcula solo desde el análisis mientras
// el usuario no lo haya tocado a mano (precioManual). Si lo edita, queda su valor.
type Linea = { id: string; item: ItemAP; cantidadStr: string; expandido: boolean; an: AnalisisEdit; precioStr: string; precioManual: boolean }

const SECS: { key: SecKey; titulo: string }[] = [
  { key: 'materiales', titulo: 'Materiales' },
  { key: 'manoobra', titulo: 'Mano de obra' },
  { key: 'equipos', titulo: 'Equipos' },
]

function sentence(str: string) {
  const s = (str || '').toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}
function norm(str: string) {
  return (str || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}
const num = (str: string) => parseFloat((str || '').replace(/\./g, '').replace(',', '.')) || 0
const numCant = (str: string) => parseFloat((str || '').replace(',', '.')) || 0

const nuevoAnalisis = (): AnalisisEdit => ({ materiales: [], manoobra: [], equipos: [] })
const costoAnalisis = (a: AnalisisEdit) =>
  [...a.materiales, ...a.manoobra, ...a.equipos].reduce((s, f) => s + f.cantidad * f.precio, 0)
const comp = (nombre: string, unidad: string, precio: number): CompEdit => ({ nombre, unidad: unidad || 'u', precio, cantidad: 1, cantidadStr: '1' })

function fmtFecha(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })
  } catch {
    return ''
  }
}

export default function PresupuestadorScreen() {
  const t = useTheme()
  const s = styles(t)
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()

  const [rubros, setRubros] = useState<RubroAP[]>([])
  const [items, setItems] = useState<ItemAP[]>([])
  const [mo, setMo] = useState<ManoObra[]>([])
  const [cargando, setCargando] = useState(true)

  const [nombreObra, setNombreObra] = useState('')
  const [superficie, setSuperficie] = useState('')
  const [lineas, setLineas] = useState<Linea[]>([])
  const [presupuestoId, setPresupuestoId] = useState<string | null>(null)
  const [guardados, setGuardados] = useState<PresupuestoGuardado<Linea>[]>([])
  const [showGuardados, setShowGuardados] = useState(false)

  const [showAdd, setShowAdd] = useState(false)
  const [reemplazo, setReemplazo] = useState<Linea | null>(null)
  const [rubroSel, setRubroSel] = useState<string | null>(null)
  const [itemSel, setItemSel] = useState<ItemAP | null>(null)
  const [cantidadStr, setCantidadStr] = useState('1')
  const [busqueda, setBusqueda] = useState('')

  // Agregar componente a una sección de una línea:
  const [addComp, setAddComp] = useState<{ lineaId: string; sec: SecKey } | null>(null)
  const [busquedaMat, setBusquedaMat] = useState('')
  const [matResultados, setMatResultados] = useState<Material[]>([])
  const [cargandoMat, setCargandoMat] = useState(false)
  const [eq, setEq] = useState({ nombre: '', unidad: '', precio: '', cantidad: '1' })

  useEffect(() => {
    ;(async () => {
      const [ic, mc] = await Promise.all([getItemsCache(), getManoObraCache()])
      if (ic && ic.items.length) {
        setRubros(ic.rubros)
        setItems(ic.items)
        setCargando(false)
      }
      if (mc) setMo(mc)
      const [it, moFresh] = await Promise.all([getItemsAP(), getManoObra('A')])
      if (it.items.length) {
        setRubros(it.rubros)
        setItems(it.items)
      }
      if (moFresh.length) setMo(moFresh)
      setCargando(false)
    })()
  }, [])

  // Buscar materiales del catálogo mientras el modal de materiales está abierto.
  useEffect(() => {
    if (addComp?.sec !== 'materiales') return
    let vivo = true
    setCargandoMat(true)
    const id = setTimeout(() => {
      getMateriales(PROV, null, busquedaMat).then((r) => {
        if (vivo) {
          setMatResultados(r)
          setCargandoMat(false)
        }
      })
    }, 250)
    return () => {
      vivo = false
      clearTimeout(id)
    }
  }, [addComp, busquedaMat])

  const precioItem = (l: Linea) => num(l.precioStr)
  const totalLinea = (l: Linea) => numCant(l.cantidadStr) * precioItem(l)
  const totalGeneral = lineas.reduce((a, l) => a + totalLinea(l), 0)
  const rubroNombre = (id: string) => rubros.find((r) => r.codigo === id)?.nombre || 'Sin rubro'

  const setLinea = (id: string, patch: Partial<Linea>) =>
    setLineas((xs) => xs.map((l) => (l.id === id ? { ...l, ...patch } : l)))

  // Modifica el análisis de una línea (agregar/quitar/editar cantidad de un componente).
  const editAn = (lineaId: string, sec: SecKey, fn: (arr: CompEdit[]) => CompEdit[]) =>
    setLineas((xs) =>
      xs.map((x) => {
        if (x.id !== lineaId) return x
        const an: AnalisisEdit = { ...x.an, [sec]: fn(x.an[sec].map((c) => ({ ...c }))) }
        // Mientras no lo hayan tocado a mano, el precio del ítem sigue al análisis.
        const precioStr = x.precioManual ? x.precioStr : String(Math.round(costoAnalisis(an)))
        return { ...x, an, precioStr }
      }),
    )
  const agregarComp = (lineaId: string, sec: SecKey, c: CompEdit) => editAn(lineaId, sec, (arr) => [...arr, c])
  const quitarComp = (lineaId: string, sec: SecKey, idx: number) => editAn(lineaId, sec, (arr) => arr.filter((_, i) => i !== idx))
  const setCompCant = (lineaId: string, sec: SecKey, idx: number, v: string) =>
    editAn(lineaId, sec, (arr) => arr.map((c, i) => (i === idx ? { ...c, cantidadStr: v, cantidad: numCant(v) } : c)))

  const grupos = useMemo(() => {
    const map = new Map<string, Linea[]>()
    lineas.forEach((l) => {
      const k = l.item.rubroId || '999'
      if (!map.has(k)) map.set(k, [])
      map.get(k)!.push(l)
    })
    return [...map.entries()]
      .map(([rubroId, ls]) => ({
        rubroId,
        nombre: rubroNombre(rubroId),
        lineas: ls,
        total: ls.reduce((a, l) => a + totalLinea(l), 0),
      }))
      .sort((a, b) => (parseInt(a.rubroId) || 999) - (parseInt(b.rubroId) || 999))
  }, [lineas, rubros])

  const itemsMostrados = useMemo(() => {
    const q = norm(busqueda)
    if (q) return items.filter((i) => norm(i.nombre).includes(q)).slice(0, 60)
    return rubroSel ? items.filter((i) => i.rubroId === rubroSel) : []
  }, [busqueda, rubroSel, items])

  const abrirAdd = () => {
    setRubroSel(null)
    setItemSel(null)
    setCantidadStr('1')
    setBusqueda('')
    setShowAdd(true)
  }
  const agregar = () => {
    if (!itemSel) return
    const cant = numCant(cantidadStr)
    if (cant <= 0) return
    setLineas((xs) => [
      ...xs,
      { id: String(Date.now()), item: itemSel, cantidadStr: String(cant), expandido: true, an: nuevoAnalisis(), precioStr: '0', precioManual: false },
    ])
    setShowAdd(false)
  }
  const hacerReemplazo = (nuevo: ItemAP) => {
    if (!reemplazo) return
    setLinea(reemplazo.id, { item: nuevo, an: nuevoAnalisis(), expandido: true, precioStr: '0', precioManual: false })
    setReemplazo(null)
  }

  // Guardar / cargar / borrar / compartir presupuestos
  const guardar = async () => {
    if (lineas.length === 0) return Alert.alert('Presupuesto vacío', 'Agregá al menos un ítem antes de guardar.')
    const id = presupuestoId || String(Date.now())
    const p: PresupuestoGuardado<Linea> = {
      id,
      nombre: nombreObra.trim() || 'Presupuesto sin nombre',
      superficie,
      fecha: new Date().toISOString(),
      total: totalGeneral,
      lineas,
    }
    await guardarPresupuesto(p)
    setPresupuestoId(id)
    Alert.alert('Guardado', 'El presupuesto quedó guardado en tu teléfono.')
  }
  const abrirGuardados = async () => {
    setGuardados(await listarPresupuestos())
    setShowGuardados(true)
  }
  const cargar = (p: PresupuestoGuardado<Linea>) => {
    setNombreObra(p.nombre === 'Presupuesto sin nombre' ? '' : p.nombre)
    setSuperficie(p.superficie || '')
    setLineas(p.lineas || [])
    setPresupuestoId(p.id)
    setShowGuardados(false)
  }
  const borrar = async (id: string) => {
    setGuardados(await borrarPresupuesto(id))
    if (presupuestoId === id) setPresupuestoId(null)
  }
  const nuevo = () => {
    setNombreObra('')
    setSuperficie('')
    setLineas([])
    setPresupuestoId(null)
  }
  const compartir = async () => {
    if (lineas.length === 0) return Alert.alert('Presupuesto vacío', 'Agregá al menos un ítem antes de compartir.')
    const L: string[] = []
    L.push(`PRESUPUESTO — ${nombreObra.trim() || 'Sin nombre'}`)
    if (superficie.trim()) L.push(`Superficie: ${superficie} m²`)
    L.push(fmtFecha(new Date().toISOString()))
    L.push('')
    grupos.forEach((g) => {
      L.push(`${g.rubroId}. ${(g.nombre || 'Sin rubro').toUpperCase()}`)
      g.lineas.forEach((l, i) => {
        L.push(`  ${g.rubroId}.${i + 1} ${sentence(l.item.nombre)} — ${l.cantidadStr} ${l.item.unidad} × ${pesos(precioItem(l))} = ${pesos(totalLinea(l))}`)
      })
      L.push(`  Subtotal: ${pesos(g.total)}`)
      L.push('')
    })
    L.push(`TOTAL: ${pesos(totalGeneral)}`)
    L.push('')
    L.push('Hecho con Obrador')
    try {
      await Share.share({ message: L.join('\n') })
    } catch {}
  }

  // Elegir un ítem del modal de componentes → agregar a la sección y cerrar.
  const elegirMaterial = (m: Material) => {
    if (!addComp) return
    agregarComp(addComp.lineaId, 'materiales', comp(m.nombre, m.unidadBase, m.precioBase))
    setAddComp(null)
  }
  const elegirMO = (c: ManoObra) => {
    if (!addComp) return
    agregarComp(addComp.lineaId, 'manoobra', comp(c.nombre, c.unidad, c.precio))
    setAddComp(null)
  }
  const agregarEquipo = () => {
    if (!addComp || !eq.nombre.trim()) return
    agregarComp(addComp.lineaId, 'equipos', {
      nombre: eq.nombre.trim(),
      unidad: eq.unidad.trim() || 'u',
      precio: num(eq.precio),
      cantidad: numCant(eq.cantidad),
      cantidadStr: eq.cantidad || '1',
    })
    setEq({ nombre: '', unidad: '', precio: '', cantidad: '1' })
    setAddComp(null)
  }
  const abrirComp = (lineaId: string, sec: SecKey) => {
    setBusquedaMat('')
    setMatResultados([])
    setEq({ nombre: '', unidad: '', precio: '', cantidad: '1' })
    setAddComp({ lineaId, sec })
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <AppHeader
        title="Presupuestador"
        left={
          <Pressable onPress={() => navigation.goBack()} style={s.hLeft} hitSlop={10}>
            <Icon name="back" size={22} color={t.onPrimary} />
            <Text style={s.hTitle}>Presupuestador</Text>
          </Pressable>
        }
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
            <Pressable hitSlop={8} onPress={nuevo}>
              <Icon name="plus" size={23} color={t.onPrimary} />
            </Pressable>
            <Pressable hitSlop={8} onPress={abrirGuardados}>
              <Icon name="file" size={21} color={t.onPrimary} />
            </Pressable>
          </View>
        }
      />

      {cargando ? (
        <View style={s.center}>
          <ActivityIndicator color={t.text2} />
          <Text style={s.cargTxt}>Cargando…</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl + insets.bottom }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={s.tituloSec}>Datos de la obra</Text>
          <View style={s.obra}>
            <View style={{ flex: 2 }}>
              <Text style={s.miniLabel}>Nombre</Text>
              <TextInput style={s.input} placeholder="Ej: Casa García" placeholderTextColor={t.text3} value={nombreObra} onChangeText={setNombreObra} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.miniLabel}>Sup. (m²)</Text>
              <TextInput style={s.input} placeholder="0" placeholderTextColor={t.text3} keyboardType="numeric" value={superficie} onChangeText={setSuperficie} />
            </View>
          </View>

          <Text style={[s.tituloSec, { marginTop: spacing.xl }]}>Presupuesto</Text>

          {grupos.length === 0 && (
            <Text style={s.vacio}>Tocá “Agregar ítem”, elegí un ítem y armá su análisis de precios por unidad.</Text>
          )}

          {grupos.map((g) => (
            <View key={g.rubroId} style={{ marginBottom: spacing.md }}>
              <View style={s.rubroRow}>
                <Text style={s.rubroTxt} numberOfLines={1}>
                  {g.rubroId}. {(g.nombre || 'Sin rubro').toUpperCase()}
                </Text>
                <Text style={s.rubroTotal}>{pesos(g.total)}</Text>
              </View>

              {g.lineas.map((l, idx) => (
                <View key={l.id} style={s.card}>
                  <View style={s.head}>
                    <Pressable style={s.headMain} onPress={() => setReemplazo(l)}>
                      <Text style={s.numTxt}>
                        {g.rubroId}.{idx + 1}
                      </Text>
                      <View style={{ flex: 1 }}>
                        <Text style={s.nomTxt} numberOfLines={2}>
                          {sentence(l.item.nombre)}
                        </Text>
                        <Text style={s.subTxt}>{pesos(totalLinea(l))}</Text>
                      </View>
                    </Pressable>
                    <TextInput
                      style={s.cantMini}
                      keyboardType="numeric"
                      value={l.cantidadStr}
                      onChangeText={(v) => setLinea(l.id, { cantidadStr: v })}
                      selectTextOnFocus
                    />
                    <Pressable onPress={() => setLineas((xs) => xs.filter((x) => x.id !== l.id))} hitSlop={8}>
                      <Icon name="trash" size={17} color={t.text3} />
                    </Pressable>
                    <Pressable onPress={() => setLinea(l.id, { expandido: !l.expandido })} hitSlop={8}>
                      <View style={{ transform: [{ rotate: l.expandido ? '-90deg' : '90deg' }] }}>
                        <Icon name="chevron" size={18} color={t.text3} filled={false} />
                      </View>
                    </Pressable>
                  </View>

                  {l.expandido && (
                    <View style={s.body}>
                      <View style={s.bRow}>
                        <Text style={s.bLbl}>Unidad</Text>
                        <Text style={s.bVal}>{l.item.unidad || '—'}</Text>
                      </View>
                      <View style={s.bRow}>
                        <Text style={s.bLbl}>Precio del ítem</Text>
                        <View style={s.precioBox}>
                          <Text style={s.peso}>$</Text>
                          <TextInput
                            style={s.precioInput}
                            keyboardType="numeric"
                            value={l.precioStr}
                            onChangeText={(v) => setLinea(l.id, { precioStr: v, precioManual: true })}
                            selectTextOnFocus
                          />
                        </View>
                      </View>

                      {SECS.map((sec) => {
                        const filas = l.an[sec.key]
                        return (
                          <View key={sec.key} style={{ marginTop: spacing.sm }}>
                            <View style={s.anSecHead}>
                              <Text style={s.anSecTit}>{sec.titulo.toUpperCase()}</Text>
                              <Pressable style={s.anAdd} onPress={() => abrirComp(l.id, sec.key)} hitSlop={6}>
                                <Icon name="plus" size={15} color={t.text} />
                              </Pressable>
                            </View>
                            {filas.length === 0 && <Text style={s.anVacioSec}>Tocá + para agregar</Text>}
                            {filas.map((f, i) => (
                              <View key={i} style={s.compRow}>
                                <View style={{ flex: 1 }}>
                                  <Text style={s.compNom} numberOfLines={1}>
                                    {sentence(f.nombre)}
                                  </Text>
                                  <Text style={s.compPre}>
                                    {pesos(f.precio)} /{f.unidad}
                                  </Text>
                                </View>
                                <TextInput
                                  style={s.compCant}
                                  keyboardType="numeric"
                                  value={f.cantidadStr}
                                  onChangeText={(v) => setCompCant(l.id, sec.key, i, v)}
                                  selectTextOnFocus
                                />
                                <Pressable onPress={() => quitarComp(l.id, sec.key, i)} hitSlop={6}>
                                  <Icon name="close" size={16} color={t.text3} />
                                </Pressable>
                              </View>
                            ))}
                          </View>
                        )
                      })}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}

          <Pressable style={s.addBtn} onPress={abrirAdd}>
            <Icon name="plus" size={20} color={t.text} />
            <Text style={s.addTxt}>Agregar ítem</Text>
          </Pressable>

          <View style={s.totalRow}>
            <Text style={s.totalLbl}>TOTAL PRESUPUESTO</Text>
            <Text style={s.totalVal}>{pesos(totalGeneral)}</Text>
          </View>

          <View style={s.acciones}>
            <Pressable style={s.accGuardar} onPress={guardar}>
              <Icon name="check" size={18} color={t.onPrimary} />
              <Text style={s.accGuardarTxt}>Guardar</Text>
            </Pressable>
            <Pressable style={s.accCompartir} onPress={compartir}>
              <Icon name="logout" size={17} color={t.text} />
              <Text style={s.accCompartirTxt}>Compartir</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}

      {/* Modal: agregar ítem al presupuesto */}
      <Modal visible={showAdd} animationType="slide" transparent onRequestClose={() => setShowAdd(false)}>
        <KeyboardAvoidingView style={s.modalBg} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={{ flex: 1 }} onPress={() => setShowAdd(false)} />
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={s.modalHead}>
              <Text style={s.modalTitle}>Agregar ítem</Text>
              <Pressable onPress={() => setShowAdd(false)} hitSlop={8}>
                <Icon name="close" size={22} color={t.text} />
              </Pressable>
            </View>

            <TextInput
              style={s.buscar}
              placeholder="Buscá un ítem (ej: contrapiso, mampostería…)"
              placeholderTextColor={t.text3}
              value={busqueda}
              onChangeText={(v) => {
                setBusqueda(v)
                setItemSel(null)
              }}
            />

            {!busqueda && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chips}>
                {rubros.map((r) => {
                  const on = rubroSel === r.codigo
                  return (
                    <Pressable
                      key={r.codigo}
                      onPress={() => {
                        setRubroSel(r.codigo)
                        setItemSel(null)
                      }}
                      style={[s.chip, on && s.chipOn]}
                    >
                      <Text style={[s.chipTxt, on && s.chipTxtOn]} numberOfLines={1}>
                        {sentence(r.nombre)}
                      </Text>
                    </Pressable>
                  )
                })}
              </ScrollView>
            )}

            {(busqueda || rubroSel) && (
              <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {itemsMostrados.map((i) => {
                  const on = itemSel?.codigo === i.codigo
                  return (
                    <Pressable key={i.codigo} onPress={() => setItemSel(i)} style={[s.itemRow, on && s.itemRowOn]}>
                      <View style={{ flex: 1 }}>
                        <Text style={[s.itemNom, on && { color: t.surface }]} numberOfLines={2}>
                          {sentence(i.nombre)}
                        </Text>
                        <Text style={[s.itemPre, on && { color: t.surface }]}>
                          {busqueda ? sentence(rubroNombre(i.rubroId)) + ' · ' : ''}
                          {i.unidad}
                        </Text>
                      </View>
                      {on && <Icon name="check" size={18} color={t.surface} />}
                    </Pressable>
                  )
                })}
                {itemsMostrados.length === 0 && <Text style={s.vacio}>No se encontraron ítems.</Text>}
              </ScrollView>
            )}

            {itemSel && (
              <View style={s.cantModalRow}>
                <Text style={s.mLabel}>Cantidad ({itemSel.unidad})</Text>
                <TextInput style={s.cantInput} keyboardType="numeric" value={cantidadStr} onChangeText={setCantidadStr} selectTextOnFocus />
              </View>
            )}

            <Pressable style={[s.confirm, !itemSel && s.confirmOff]} disabled={!itemSel} onPress={agregar}>
              <Text style={[s.confirmTxt, !itemSel && { color: t.text3 }]}>Agregar al presupuesto</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal: cambiar ítem (mismo rubro) */}
      <Modal visible={!!reemplazo} animationType="slide" transparent onRequestClose={() => setReemplazo(null)}>
        <View style={s.modalBg}>
          <Pressable style={{ flex: 1 }} onPress={() => setReemplazo(null)} />
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={s.modalHead}>
              <View style={{ flex: 1 }}>
                <Text style={s.modalTitle}>Cambiar ítem</Text>
                {reemplazo && (
                  <Text style={s.modalSub}>
                    {reemplazo.item.rubroId}. {sentence(rubroNombre(reemplazo.item.rubroId))}
                  </Text>
                )}
              </View>
              <Pressable onPress={() => setReemplazo(null)} hitSlop={8}>
                <Icon name="close" size={22} color={t.text} />
              </Pressable>
            </View>

            <ScrollView style={{ maxHeight: 380, marginTop: spacing.sm }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {(reemplazo ? items.filter((i) => i.rubroId === reemplazo.item.rubroId) : []).map((i) => {
                const on = reemplazo?.item.codigo === i.codigo
                return (
                  <Pressable key={i.codigo} onPress={() => hacerReemplazo(i)} style={[s.itemRow, on && s.itemRowOn]}>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.itemNom, on && { color: t.surface }]} numberOfLines={2}>
                        {sentence(i.nombre)}
                      </Text>
                      <Text style={[s.itemPre, on && { color: t.surface }]}>{i.unidad}</Text>
                    </View>
                    {on && <Icon name="check" size={18} color={t.surface} />}
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal: agregar componente (Materiales / Mano de obra / Equipos) */}
      <Modal visible={!!addComp} animationType="slide" transparent onRequestClose={() => setAddComp(null)}>
        <KeyboardAvoidingView style={s.modalBg} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={{ flex: 1 }} onPress={() => setAddComp(null)} />
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={s.modalHead}>
              <Text style={s.modalTitle}>
                {addComp?.sec === 'materiales' ? 'Agregar material' : addComp?.sec === 'manoobra' ? 'Agregar mano de obra' : 'Agregar equipo'}
              </Text>
              <Pressable onPress={() => setAddComp(null)} hitSlop={8}>
                <Icon name="close" size={22} color={t.text} />
              </Pressable>
            </View>

            {addComp?.sec === 'materiales' && (
              <>
                <TextInput
                  style={s.buscar}
                  placeholder="Buscá un material (ej: cemento, pintura…)"
                  placeholderTextColor={t.text3}
                  value={busquedaMat}
                  onChangeText={setBusquedaMat}
                />
                <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                  {cargandoMat && <ActivityIndicator color={t.text3} style={{ marginVertical: spacing.md }} />}
                  {!cargandoMat &&
                    matResultados.map((m) => (
                      <Pressable key={m.id} onPress={() => elegirMaterial(m)} style={s.itemRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={s.itemNom} numberOfLines={2}>
                            {sentence(m.nombre)}
                          </Text>
                          <Text style={s.itemPre}>
                            {m.proveedor} · {pesos(m.precioBase)}/{m.unidadBase}
                          </Text>
                        </View>
                        <Icon name="plus" size={18} color={t.text2} />
                      </Pressable>
                    ))}
                  {!cargandoMat && matResultados.length === 0 && <Text style={s.vacio}>No se encontraron materiales.</Text>}
                </ScrollView>
              </>
            )}

            {addComp?.sec === 'manoobra' && (
              <ScrollView style={{ maxHeight: 380, marginTop: spacing.sm }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {mo.map((c, i) => (
                  <Pressable key={i} onPress={() => elegirMO(c)} style={s.itemRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.itemNom} numberOfLines={2}>
                        {sentence(c.nombre)}
                      </Text>
                      <Text style={s.itemPre}>
                        {pesos(c.precio)} /{c.unidad || 'Hs'}
                      </Text>
                    </View>
                    <Icon name="plus" size={18} color={t.text2} />
                  </Pressable>
                ))}
                {mo.length === 0 && <Text style={s.vacio}>No se pudo cargar la mano de obra.</Text>}
              </ScrollView>
            )}

            {addComp?.sec === 'equipos' && (
              <View style={{ marginTop: spacing.sm, gap: spacing.sm }}>
                <TextInput style={s.input} placeholder="Nombre del equipo" placeholderTextColor={t.text3} value={eq.nombre} onChangeText={(v) => setEq((e) => ({ ...e, nombre: v }))} />
                <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                  <TextInput style={[s.input, { flex: 1 }]} placeholder="Unidad (Hs, u…)" placeholderTextColor={t.text3} value={eq.unidad} onChangeText={(v) => setEq((e) => ({ ...e, unidad: v }))} />
                  <TextInput style={[s.input, { flex: 1 }]} placeholder="Precio unit." placeholderTextColor={t.text3} keyboardType="numeric" value={eq.precio} onChangeText={(v) => setEq((e) => ({ ...e, precio: v }))} />
                </View>
                <Pressable style={[s.confirm, !eq.nombre.trim() && s.confirmOff]} disabled={!eq.nombre.trim()} onPress={agregarEquipo}>
                  <Text style={[s.confirmTxt, !eq.nombre.trim() && { color: t.text3 }]}>Agregar equipo</Text>
                </Pressable>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal: mis presupuestos guardados */}
      <Modal visible={showGuardados} animationType="slide" transparent onRequestClose={() => setShowGuardados(false)}>
        <View style={s.modalBg}>
          <Pressable style={{ flex: 1 }} onPress={() => setShowGuardados(false)} />
          <View style={[s.modalCard, { paddingBottom: insets.bottom + spacing.md }]}>
            <View style={s.modalHead}>
              <Text style={s.modalTitle}>Mis presupuestos</Text>
              <Pressable onPress={() => setShowGuardados(false)} hitSlop={8}>
                <Icon name="close" size={22} color={t.text} />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 420, marginTop: spacing.sm }} showsVerticalScrollIndicator={false}>
              {guardados.length === 0 && <Text style={s.vacio}>Todavía no guardaste ningún presupuesto.</Text>}
              {guardados.map((p) => (
                <View key={p.id} style={s.gRow}>
                  <Pressable style={{ flex: 1 }} onPress={() => cargar(p)}>
                    <Text style={s.gNom} numberOfLines={1}>
                      {p.nombre}
                    </Text>
                    <Text style={s.gMeta}>
                      {fmtFecha(p.fecha)} · {p.lineas.length} ítem{p.lineas.length === 1 ? '' : 's'} · {pesos(p.total)}
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => borrar(p.id)} hitSlop={8}>
                    <Icon name="trash" size={18} color={t.text3} />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = (t: Theme) =>
  StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
    cargTxt: { color: t.text2, fontSize: 14 },
    hLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    hTitle: { color: t.onPrimary, fontSize: 20, fontWeight: '900', letterSpacing: -0.4 },
    acciones: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
    accGuardar: { flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: radius.md, backgroundColor: t.primary },
    accGuardarTxt: { color: t.onPrimary, fontSize: 15, fontWeight: '800' },
    accCompartir: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, backgroundColor: t.surface },
    accCompartirTxt: { color: t.text, fontSize: 15, fontWeight: '800' },
    gRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, padding: spacing.md, marginBottom: 6 },
    gNom: { color: t.text, fontSize: 15, fontWeight: '800' },
    gMeta: { color: t.text3, fontSize: 12, marginTop: 3 },
    tituloSec: { color: t.text, fontSize: 16, fontWeight: '900', marginBottom: spacing.sm },
    obra: { flexDirection: 'row', gap: spacing.md },
    miniLabel: { color: t.text2, fontSize: 12, fontWeight: '700', marginBottom: 4 },
    input: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, height: 48, paddingHorizontal: spacing.md, color: t.text, fontSize: 15 },
    vacio: { color: t.text2, fontSize: 14, lineHeight: 20, paddingVertical: spacing.lg },

    rubroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: t.sel, borderRadius: radius.md, paddingVertical: 9, paddingHorizontal: spacing.md, marginBottom: spacing.xs },
    rubroTxt: { color: t.surface, fontSize: 12.5, fontWeight: '900', flex: 1, marginRight: spacing.sm },
    rubroTotal: { color: t.surface, fontSize: 13, fontWeight: '900' },

    card: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, marginBottom: 6, overflow: 'hidden' },
    head: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.md },
    headMain: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    numTxt: { color: t.text3, fontSize: 12, fontWeight: '800', width: 34 },
    nomTxt: { color: t.text, fontSize: 13.5, fontWeight: '700', lineHeight: 18 },
    subTxt: { color: t.text2, fontSize: 12.5, fontWeight: '800', marginTop: 2 },
    cantMini: { width: 60, height: 38, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.sm, textAlign: 'center', color: t.text, fontSize: 15, fontWeight: '800' },

    body: { borderTopWidth: 1, borderTopColor: t.border, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: t.surface },
    bRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 7 },
    bLbl: { color: t.text2, fontSize: 13, fontWeight: '600' },
    bVal: { color: t.text, fontSize: 14, fontWeight: '700' },
    bTotal: { color: t.text, fontSize: 16, fontWeight: '900' },
    precioBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.sm, paddingHorizontal: 8, height: 38, minWidth: 120 },
    peso: { color: t.text2, fontSize: 14, fontWeight: '800' },
    precioInput: { flex: 1, color: t.text, fontSize: 15, fontWeight: '700', textAlign: 'right', padding: 0 },

    anSecHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 2 },
    anSecTit: { color: t.text2, fontSize: 11, fontWeight: '900', letterSpacing: 0.4 },
    anAdd: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: t.border, backgroundColor: t.bg, alignItems: 'center', justifyContent: 'center' },
    anVacioSec: { color: t.text3, fontSize: 12.5, fontStyle: 'italic', paddingVertical: 4 },
    compRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 6, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: t.border },
    compNom: { color: t.text, fontSize: 13.5, fontWeight: '600', lineHeight: 18 },
    compPre: { color: t.text3, fontSize: 11, marginTop: 1 },
    compCant: { width: 60, height: 38, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, borderRadius: radius.sm, textAlign: 'center', color: t.text, fontSize: 15, fontWeight: '800' },

    addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 50, borderRadius: radius.md, borderWidth: 1, borderColor: t.border, borderStyle: 'dashed', backgroundColor: t.surface, marginTop: spacing.sm },
    addTxt: { color: t.text, fontSize: 15, fontWeight: '800' },

    totalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: t.sel, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, marginTop: spacing.md },
    totalLbl: { color: t.surface, fontSize: 13, fontWeight: '800', letterSpacing: 0.4 },
    totalVal: { color: t.surface, fontSize: 22, fontWeight: '900' },

    modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    modalCard: { backgroundColor: t.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.lg },
    modalHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs },
    modalTitle: { color: t.text, fontSize: 20, fontWeight: '900' },
    modalSub: { color: t.text2, fontSize: 12.5, fontWeight: '700', marginTop: 2 },
    buscar: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, height: 46, paddingHorizontal: spacing.md, color: t.text, fontSize: 15, marginTop: spacing.sm, marginBottom: spacing.sm },
    chips: { gap: spacing.sm, paddingBottom: 2 },
    chip: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8, maxWidth: 200 },
    chipOn: { backgroundColor: t.sel, borderColor: t.sel },
    chipTxt: { color: t.text2, fontWeight: '700', fontSize: 13 },
    chipTxtOn: { color: t.surface },
    itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, padding: spacing.md, marginBottom: 6 },
    itemRowOn: { backgroundColor: t.sel, borderColor: t.sel },
    itemNom: { color: t.text, fontSize: 14, fontWeight: '700', lineHeight: 18 },
    itemPre: { color: t.text3, fontSize: 12, marginTop: 2 },
    cantModalRow: { marginTop: spacing.md },
    mLabel: { color: t.text2, fontSize: 13, fontWeight: '700', marginBottom: spacing.sm },
    cantInput: { backgroundColor: t.surface, borderWidth: 1, borderColor: t.border, borderRadius: radius.md, height: 50, paddingHorizontal: spacing.md, color: t.text, fontSize: 18, fontWeight: '800' },
    confirm: { height: 52, borderRadius: radius.md, backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg },
    confirmOff: { backgroundColor: t.surface2 },
    confirmTxt: { color: t.onPrimary, fontSize: 16, fontWeight: '800' },
  })
