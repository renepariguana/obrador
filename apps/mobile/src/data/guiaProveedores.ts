// Guía de Proveedores — todas las provincias (NOA + otras). Demo con geocoding.
// Generado desde el Excel oficial + geocoding. En producción: Supabase (guia_proveedores) por bounds.

export type GuiaProveedor = {
  proveedor: string
  provincia: string
  rubros: string[]
  direccion: string
  tel: string
  whatsapp: string
  mail: string
  web: string
  lat: number
  lng: number
}

export const GUIA: GuiaProveedor[] = [
{
"proveedor": "EASY",
"provincia": "Tucumán",
"rubros": [
"MADERAS",
"CONSTRUCCIÓN EN SECO",
"PINTURERÍAS",
"FERRETERÍAS - BULONERÍAS",
"SANITARIOS",
"PISOS Y REVESTIMIENTOS",
"ADHESIVOS",
"HIERROS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS"
],
"direccion": "Yerba Buena, Tucumán (confirmar dirección/pin)",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://www.easy.com.ar",
"lat": -26.8123,
"lng": -65.3186
},
{
"proveedor": "EGGER",
"provincia": "Buenos Aires",
"rubros": [
"PISOS DE MADERA"
],
"direccion": "25 de Mayo 359",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://www.egger.com/es/?country=AR",
"lat": -34.603576,
"lng": -58.371012
},
{
"proveedor": "EGGER",
"provincia": "Buenos Aires",
"rubros": [
"PISOS Y REVESTIMIENTOS"
],
"direccion": "26 de Mayo 359",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://www.egger.com/es/?country=AR",
"lat": -34.607168,
"lng": -58.37091
},
{
"proveedor": "GRUPO A2",
"provincia": "Buenos Aires",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Olavarría 130, Avellaneda",
"tel": "(54-11) 4138-3000",
"whatsapp": "",
"mail": "ventas@grupoa2.com",
"web": "https://grupoa2.com/",
"lat": -34.66453,
"lng": -58.356825
},
{
"proveedor": "PEWEN",
"provincia": "Buenos Aires",
"rubros": [
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Jorge Newbery 3458. Palermo",
"tel": "11 5376 4903",
"whatsapp": "",
"mail": "",
"web": "https://www.pewenpisos.com.ar/",
"lat": -34.567516,
"lng": -58.435014
},
{
"proveedor": "ARCO IRIS PINTURERÍA Y MAQUINARIAS SRL",
"provincia": "Catamarca",
"rubros": [
"ADHESIVOS",
"ADITIVOS",
"FERRETERÍAS - BULONERÍAS",
"INDUSTRIAL",
"LUSTRES Y LAQUEADOS",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"PINTURA DE OBRA",
"PINTURERÍAS"
],
"direccion": "Mota Botello 782, Capital, Catamarca",
"tel": "3834434383",
"whatsapp": "3834302353",
"mail": "provearcoiris@gmail.com",
"web": "",
"lat": -28.471916,
"lng": -65.775619
},
{
"proveedor": "ARCO IRIS PINTURERÍA Y MAQUINARIAS SRL",
"provincia": "Catamarca",
"rubros": [
"ADHESIVOS",
"ADITIVOS",
"FERRETERÍAS - BULONERÍAS",
"INDUSTRIAL",
"LUSTRES Y LAQUEADOS",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"PINTURA DE OBRA",
"PINTURERÍAS"
],
"direccion": "Av. Alem 840, Capital, Catamarca",
"tel": "3834873801",
"whatsapp": "",
"mail": "provearcoiris@gmail.com",
"web": "",
"lat": -28.470884,
"lng": -65.769382
},
{
"proveedor": "ARCO IRIS PINTURERÍA Y MAQUINARIAS SRL",
"provincia": "Catamarca",
"rubros": [
"ADHESIVOS",
"ADITIVOS",
"FERRETERÍAS - BULONERÍAS",
"INDUSTRIAL",
"LUSTRES Y LAQUEADOS",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"PINTURA DE OBRA"
],
"direccion": "Av. Illia 987, Capital, Catamarca",
"tel": "3834175873",
"whatsapp": "",
"mail": "provearcoiris@gmail.com",
"web": "",
"lat": -28.460993,
"lng": -65.800375
},
{
"proveedor": "Bernardi SRL",
"provincia": "Catamarca",
"rubros": [
"ACERO INOXIDABLE",
"ADITIVOS",
"AISLACIONES HIDRÓFUGAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"ALUMINIO",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"CAÑOS Y ACCESORIOS",
"CIELORRASOS",
"ESTRUCTURAS METÁLICAS",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"GRUPOS ELECTRÓGENOS",
"HERRAJES",
"HIERROS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PERFILES DE ALUMINIO",
"PRODUCTOS QUÍMICOS PARA LA CONSTRUCCIÓN",
"PVC",
"SISTEMAS DE BOMBEO",
"TANQUES PARA AGUA",
"ZINGUERÍAS"
],
"direccion": "Prado 663, San Fernando del Valle de Catamarca",
"tel": "+54 383 452-8164",
"whatsapp": "3834008538",
"mail": "info@bernardisrl.catamarca",
"web": "",
"lat": -28.465908,
"lng": -65.777515
},
{
"proveedor": "Bernardi SRL",
"provincia": "Catamarca",
"rubros": [
"ACERO INOXIDABLE",
"ADITIVOS",
"AISLACIONES HIDRÓFUGAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"ALUMINIO",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"CAÑOS Y ACCESORIOS",
"CIELORRASOS",
"ESTRUCTURAS METÁLICAS",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"GRUPOS ELECTRÓGENOS",
"HERRAJES",
"HIERROS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PERFILES DE ALUMINIO",
"PRODUCTOS QUÍMICOS PARA LA CONSTRUCCIÓN",
"PVC",
"SISTEMAS DE BOMBEO",
"TANQUES PARA AGUA",
"ZINGUERÍAS"
],
"direccion": "Fidel Mardoqueo Castro 402, San Fernando del Valle de Catamarca",
"tel": "",
"whatsapp": "383452909",
"mail": "info@bernardisrl.catamarca",
"web": "",
"lat": -28.470626,
"lng": -65.7802
},
{
"proveedor": "ING. ERNESTO A. BLANCO",
"provincia": "Catamarca",
"rubros": [
"AGRIMENSURA Y TOPOGRAFÍA",
"EQUIPO DE TRABAJO",
"EQUIPOS PARA LA CONSTRUCCIÓN"
],
"direccion": "Capital, San Fernando del Valle de Catamarca",
"tel": "3834685113",
"whatsapp": "3834685113",
"mail": "eablanco55@hotmail.com",
"web": "",
"lat": -28.479254,
"lng": -65.787721
},
{
"proveedor": "NUESTRA ARQUITECTURA ESTUDIO",
"provincia": "Catamarca",
"rubros": [
"ESTUDIOS DE ARQUITECTURA"
],
"direccion": "San Fernando del Valle de Catamarca",
"tel": "",
"whatsapp": "3815 32-5619",
"mail": "nuestraarquitectura.estudio@gmail.com",
"web": "",
"lat": -28.468881,
"lng": -65.779064
},
{
"proveedor": "Todo Caño",
"provincia": "Catamarca",
"rubros": [
"CAÑOS Y ACCESORIOS",
"INSTALADORES SANITARIOS"
],
"direccion": "Prado 231, San Fernando del Valle de Catamarca",
"tel": "",
"whatsapp": "+54 9 383 443-1777",
"mail": "",
"web": "",
"lat": -28.466326,
"lng": -65.783953
},
{
"proveedor": "Trend",
"provincia": "Catamarca",
"rubros": [
"CORTE LÁSER"
],
"direccion": "Padre Leiria 2248,San Fernando del Valle de Catamarca",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.45771,
"lng": -65.756128
},
{
"proveedor": "Trend",
"provincia": "Catamarca",
"rubros": [
"CARPINTERÍA METÁLICA",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"CARPINTERÍA PVC - ALUMINIO",
"CARTELERÍAS - LETREROS",
"CHAPAS",
"CHAPAS (CORTE Y PEGADO)",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Padre Leiria 2248, San Fernando del Valle de Catamarca",
"tel": "",
"whatsapp": "3834607588",
"mail": "trendgraficacorporativa@gmail.com",
"web": "",
"lat": -28.45771,
"lng": -65.756128
},
{
"proveedor": "CREMA",
"provincia": "Córdoba",
"rubros": [
"ABERTURAS"
],
"direccion": "Sarmiento 453 | Villa del Rosario",
"tel": "",
"whatsapp": "54 03573-425834",
"mail": "",
"web": "www.aberturascrema.com.ar",
"lat": -31.551555,
"lng": -63.544338
},
{
"proveedor": "LUMINOTECNIA",
"provincia": "Córdoba",
"rubros": [
"ILUMINACIÓN LED"
],
"direccion": "Achaval Rodriguez 220",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://luminotecnia.com.ar/",
"lat": -31.424466,
"lng": -64.190926
},
{
"proveedor": "AB CONSTRUCCIONES",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Almirante Brown 198",
"tel": "425-3011",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "AB CONSTRUCCIONES",
"provincia": "Jujuy",
"rubros": [
"SANITARIOS"
],
"direccion": "Av. Almirante Brown 198",
"tel": "425-3011",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "ABERTURAS 2000",
"provincia": "Jujuy",
"rubros": [
"ABERTURAS",
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Av. Almirante Brown 951",
"tel": "425-7653",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "ACERNOR",
"provincia": "Jujuy",
"rubros": [
"CHAPAS",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Pachi Gorriti 1197",
"tel": "425-8344",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.203381,
"lng": -65.28232
},
{
"proveedor": "ACOSTA MUEBLES",
"provincia": "Jujuy",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Cerro Zapla 45",
"tel": "425-1500",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.20846,
"lng": -65.280116
},
{
"proveedor": "ADICEM",
"provincia": "Jujuy",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CONSTRUCCIÓN EN SECO",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 1462",
"tel": "388 431-6338",
"whatsapp": "",
"mail": "jujuy@adicem.com.ar",
"web": "https://www.adicem.com.ar/",
"lat": -24.205853,
"lng": -65.282484
},
{
"proveedor": "ALFIC",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Mosconi 553",
"tel": "426-9915",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.173742,
"lng": -65.306214
},
{
"proveedor": "ARCE REFRIGERACIÓN",
"provincia": "Jujuy",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Pueyrredón 676",
"tel": "422-2381",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.230782,
"lng": -64.872605
},
{
"proveedor": "ASSEF EDUARDO",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Yrigoyen 1140",
"tel": "422-2275",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.978639,
"lng": -65.353476
},
{
"proveedor": "ASSEF MARCELO",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"HIERROS"
],
"direccion": "Lavalle 32",
"tel": "424-3311",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.185413,
"lng": -65.302825
},
{
"proveedor": "AÑOS LUZ",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Urdininea 172",
"tel": "422-7777",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.193117,
"lng": -65.301503
},
{
"proveedor": "BELLOMO SRL",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Belgrano 1383",
"tel": "423-4010",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.185729,
"lng": -65.31214
},
{
"proveedor": "BLANCO VIDRIOS",
"provincia": "Jujuy",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Balcarce 585",
"tel": "422-2690",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.102584,
"lng": -65.598964
},
{
"proveedor": "BLOKE SRL",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Av. Libertad 794",
"tel": "424-3810",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.188666,
"lng": -65.312657
},
{
"proveedor": "BONUTTO",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Los Andes 139",
"tel": "425-2537",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.198146,
"lng": -65.288185
},
{
"proveedor": "BURGOS VIDRIOS",
"provincia": "Jujuy",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "E. Zegada 1226",
"tel": "422-5592",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.191593,
"lng": -65.306791
},
{
"proveedor": "C&C MATERIALES",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Senador Pérez 380",
"tel": "423-5096",
"whatsapp": "",
"mail": "cycmateriales@infovia.com",
"web": "",
"lat": -24.184653,
"lng": -65.308323
},
{
"proveedor": "C&C MATERIALES",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Senador Pérez 384",
"tel": "423-5096",
"whatsapp": "",
"mail": "cycmateriales@infovia.com",
"web": "",
"lat": -24.184612,
"lng": -65.308328
},
{
"proveedor": "CALERA NOA",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Pueyrredón 675",
"tel": "423-4083",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.200678,
"lng": -65.297433
},
{
"proveedor": "CARMOTO",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Almirante Brown 914",
"tel": "425-4244",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "CARPINTERÍA ARAMAYO",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Caseros 5",
"tel": "423-0550",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.198425,
"lng": -65.298037
},
{
"proveedor": "CASA NAH PORT",
"provincia": "Jujuy",
"rubros": [
"CIELORRASOS ACÚSTICOS Y TÉRMICOS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Almirante Brown 1045",
"tel": "425-0920",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.19767,
"lng": -65.280504
},
{
"proveedor": "CONST. ROSA LARRIEU",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"HIERROS",
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Patricias Argentinas 626",
"tel": "423-7451",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.80158,
"lng": -64.78055
},
{
"proveedor": "CONSTRUCCIONES CIVILES",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "M. Belgrano 969",
"tel": "424-2961",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.105427,
"lng": -65.603596
},
{
"proveedor": "COOVIPAL VIDRIOS",
"provincia": "Jujuy",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Pueyrredón 725",
"tel": "424-3502",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.229297,
"lng": -64.876195
},
{
"proveedor": "COPY NORTE",
"provincia": "Jujuy",
"rubros": [
"PLANOS - PLOTEO"
],
"direccion": "Iriarte 405",
"tel": "422-2139",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.388532,
"lng": -65.263103
},
{
"proveedor": "CORRALON EL AMIGO",
"provincia": "Jujuy",
"rubros": [
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 2626",
"tel": "425-2561",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.214835,
"lng": -65.277231
},
{
"proveedor": "CORRALON EL AMIGO",
"provincia": "Jujuy",
"rubros": [
"SANITARIOS"
],
"direccion": "AV. Al. Brown 2626",
"tel": "425-2561",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197613,
"lng": -65.290865
},
{
"proveedor": "CORRALON MARTIN",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "H. Guzmán 269",
"tel": "422-9208",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.248451,
"lng": -64.886067
},
{
"proveedor": "CORRALÓN ACONQUIJA",
"provincia": "Jujuy",
"rubros": [
"ABERTURAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA DE MADERA - MADERERAS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"CIELORRASOS ACÚSTICOS Y TÉRMICOS",
"CONSTRUCCIÓN EN SECO",
"DECORACIÓN Y EQUIPAMIENTO",
"FERRETERÍAS - BULONERÍAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Independencia 546",
"tel": "423-5977",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.187953,
"lng": -65.304768
},
{
"proveedor": "CORRALÓN BERNARDO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 531",
"tel": "425-3900",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "CORRALÓN CHACO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Siria 301",
"tel": "423-2639",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.189917,
"lng": -65.29873
},
{
"proveedor": "CORRALÓN EL CRUCE",
"provincia": "Jujuy",
"rubros": [
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 230",
"tel": "425-4558",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "CORRALÓN EL MERCADO",
"provincia": "Jujuy",
"rubros": [
"CIELORRASOS ACÚSTICOS Y TÉRMICOS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 198",
"tel": "425-3011",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "CRISTALES JUJUY",
"provincia": "Jujuy",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Bárcena 12",
"tel": "425-4251",
"whatsapp": "",
"mail": "cristalesjujuy@yahoo.com.ar",
"web": "",
"lat": -23.982552,
"lng": -65.451951
},
{
"proveedor": "CUORE AMOBLAMIENTOS",
"provincia": "Jujuy",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Alvear 502",
"tel": "423-0336",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.576234,
"lng": -65.397747
},
{
"proveedor": "DAC",
"provincia": "Jujuy",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Senador Pérez 563",
"tel": "422-3728",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.17509,
"lng": -65.30934
},
{
"proveedor": "DAC DISEÑOS",
"provincia": "Jujuy",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Sdor. Pérez 567",
"tel": "422-3728",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.949448,
"lng": -64.801607
},
{
"proveedor": "DECO",
"provincia": "Jujuy",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Independencia 875",
"tel": "424-3241",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.187334,
"lng": -65.295676
},
{
"proveedor": "DEL NOA MATAFUEGOS",
"provincia": "Jujuy",
"rubros": [
"MATAFUEGOS"
],
"direccion": "Jorge Newbery 516",
"tel": "424-4414",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190342,
"lng": -65.301259
},
{
"proveedor": "DEL RIO",
"provincia": "Jujuy",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "Av. 19 de Abril 901",
"tel": "423-1556",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.189253,
"lng": -65.310035
},
{
"proveedor": "DEL RÍO SATURNINO",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Av. 19 de Abril 901",
"tel": "423-1556",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.189253,
"lng": -65.310035
},
{
"proveedor": "DEL VALLE",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Fuerza Aérea 45",
"tel": "430-7887",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.232385,
"lng": -65.269733
},
{
"proveedor": "DEMISA",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Independencia 291",
"tel": "423-8067",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.187379,
"lng": -65.297133
},
{
"proveedor": "DERGAM",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Gorriti 436",
"tel": "424-0569",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.191809,
"lng": -65.295864
},
{
"proveedor": "DURLOCK",
"provincia": "Jujuy",
"rubros": [
"CIELORRASOS ACÚSTICOS Y TÉRMICOS"
],
"direccion": "Alem 638",
"tel": "423-7679",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.191917,
"lng": -65.301758
},
{
"proveedor": "EFNIK SH",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Lavalle 242",
"tel": "422-8872",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.18604,
"lng": -65.302831
},
{
"proveedor": "EIE MATERIALES ELECTRICOS",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Almirante Brown 1059",
"tel": "425-0243",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.212395,
"lng": -65.278873
},
{
"proveedor": "EL CAÑADÓN",
"provincia": "Jujuy",
"rubros": [
"ABERTURAS",
"AMOBLAMIENTOS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"MARMOLERÍAS – MOSAICOS - CERÁMICOS",
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Av. Almirante Brown 325",
"tel": "425-4500",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.212395,
"lng": -65.278873
},
{
"proveedor": "EL CAÑADÓN",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante G 2445",
"tel": "425-4500",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.216619,
"lng": -65.276372
},
{
"proveedor": "EL CHAÑI",
"provincia": "Jujuy",
"rubros": [
"CHAPAS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Pueyrredón 709",
"tel": "422-4798",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.229973,
"lng": -64.874826
},
{
"proveedor": "EL HORNERO",
"provincia": "Jujuy",
"rubros": [
"CONTENEDORES"
],
"direccion": "Las Heras 634",
"tel": "425-0352",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.198717,
"lng": -65.287739
},
{
"proveedor": "EL MUNDO DEL PLOMERO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 629",
"tel": "425-4599",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.195056,
"lng": -65.289161
},
{
"proveedor": "EL TRÉBOL",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Corrientes 2842",
"tel": "425-5406",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.225982,
"lng": -64.866408
},
{
"proveedor": "ELECTROMAT",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"TELEFONÍA- EQUIPOS - INSTALACIÓN"
],
"direccion": "Alvear 952",
"tel": "423-2476",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.184297,
"lng": -65.306273
},
{
"proveedor": "ELEGANZA",
"provincia": "Jujuy",
"rubros": [
"GAS"
],
"direccion": "Balcarce 323",
"tel": "423-1573",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.102584,
"lng": -65.598964
},
{
"proveedor": "FATI DECORACIONES",
"provincia": "Jujuy",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "San Martín 615",
"tel": "422-7966",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.254006,
"lng": -65.205572
},
{
"proveedor": "FERRETERIA ASSEF",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Almirante Brown 769",
"tel": "425-0259",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "FERRETERIA GAY",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Almirante Brown 922",
"tel": "425-0909",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.212395,
"lng": -65.278873
},
{
"proveedor": "FERRETERIA SAN SALVADOR",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Almirante Brown 826",
"tel": "425-3492",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "FERRETERIA URQUIZA",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Urquiza 562",
"tel": "422-5374",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.183136,
"lng": -65.300381
},
{
"proveedor": "FEYCO",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Almirante Brown 1876",
"tel": "425-7020",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "FH MADERAS",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Av. El Exodo 423",
"tel": "422-2478",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197224,
"lng": -65.291456
},
{
"proveedor": "FULL COLOR PINTURERÍA",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Almirante Brown 1487",
"tel": "431-1443",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.19767,
"lng": -65.280504
},
{
"proveedor": "GARDEN VIVERO",
"provincia": "Jujuy",
"rubros": [
"VIVEROS"
],
"direccion": "España 1488",
"tel": "422-9005",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.247362,
"lng": -64.879228
},
{
"proveedor": "GASARI",
"provincia": "Jujuy",
"rubros": [
"GAS"
],
"direccion": "Lavalle 11",
"tel": "424-2910",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.185413,
"lng": -65.302825
},
{
"proveedor": "GASODUCTO ATACAMA",
"provincia": "Jujuy",
"rubros": [
"GAS"
],
"direccion": "Independencia 60",
"tel": "425-9600",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.187953,
"lng": -65.304768
},
{
"proveedor": "GMKT",
"provincia": "Jujuy",
"rubros": [
"AMOBLAMIENTOS",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"SANITARIOS"
],
"direccion": "Salta 1262",
"tel": "413-0328",
"whatsapp": "",
"mail": "info@gmkt.com.ar",
"web": "",
"lat": -24.181906,
"lng": -65.305201
},
{
"proveedor": "GREPO",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Güemes 787",
"tel": "423-2362",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.264605,
"lng": -65.202381
},
{
"proveedor": "GÓMEZ ROCO",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Almirante Brown 833",
"tel": "425-5448",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "HIERROS LA QUIACA S.R.L.",
"provincia": "Jujuy",
"rubros": [
"HIERROS"
],
"direccion": "Puesto del Marqués 38",
"tel": "425-4797",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.205304,
"lng": -65.282188
},
{
"proveedor": "HIPERPLACA",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS",
"DECORACIÓN Y EQUIPAMIENTO",
"MADERERAS"
],
"direccion": "Av. Almirante Brown 32",
"tel": "388-4622816",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "HORACIO BERNARDO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Almirante Brown 531",
"tel": "425-3900",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "HORIZONTE",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Las Heras 760",
"tel": "425-3402",
"whatsapp": "",
"mail": "horizontejujuy@arnet.com.ar",
"web": "",
"lat": -24.198717,
"lng": -65.287739
},
{
"proveedor": "HORMIGONERA JUJUY",
"provincia": "Jujuy",
"rubros": [
"HORMIGÓN ELABORADO"
],
"direccion": "Almirante Brown 7",
"tel": "425-3100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197702,
"lng": -65.283592
},
{
"proveedor": "HORMIXA",
"provincia": "Jujuy",
"rubros": [
"HORMIGÓN ELABORADO"
],
"direccion": "Necochea 225",
"tel": "422-3132",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.186273,
"lng": -65.304063
},
{
"proveedor": "IDFL TECNOLOGÍA EN COMUNICACIONES",
"provincia": "Jujuy",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN"
],
"direccion": "Av. Almirante Brown 626",
"tel": "431-1277",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "IGR",
"provincia": "Jujuy",
"rubros": [
"PILETAS"
],
"direccion": "Salta 679",
"tel": "423-7108",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.181906,
"lng": -65.305201
},
{
"proveedor": "INGENIERO BLANCA PALACIOS",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Janssen 557",
"tel": "422-7024",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.259484,
"lng": -65.191995
},
{
"proveedor": "INGENIERO DELGADO",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "M Belgrano 969",
"tel": "424-2961",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.105427,
"lng": -65.603596
},
{
"proveedor": "INGENIERO MIGUEL VERA",
"provincia": "Jujuy",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Ruta 9",
"tel": "428-1690",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -31.371879,
"lng": -64.181112
},
{
"proveedor": "IZQUIERDO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Independencia 102",
"tel": "422-6387",
"whatsapp": "",
"mail": "iluminacionizquierdo@yahoo.com.ar",
"web": "",
"lat": -24.187953,
"lng": -65.304768
},
{
"proveedor": "JUJUY HERRAJES",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Necochea 63",
"tel": "423-2876",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.185292,
"lng": -65.304174
},
{
"proveedor": "JUJUY HIERROS",
"provincia": "Jujuy",
"rubros": [
"HIERROS"
],
"direccion": "Av.. Almirante Brown 2448",
"tel": "425-8021",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "JUJUY INGENIERIA",
"provincia": "Jujuy",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Bustamante 32",
"tel": "423-4572",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.395672,
"lng": -65.259847
},
{
"proveedor": "JUJUY MATAFUEGOS",
"provincia": "Jujuy",
"rubros": [
"MATAFUEGOS"
],
"direccion": "Iguazú 1207",
"tel": "423-0016",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.1922,
"lng": -65.304357
},
{
"proveedor": "JUJUY MATERIALES",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS",
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS"
],
"direccion": "Av. Almirante Brown 2310",
"tel": "425-4707",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "JUJUY MATERIALES",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS"
],
"direccion": "J. de la Iglesia 1197",
"tel": "422-4954",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190766,
"lng": -65.302649
},
{
"proveedor": "LA CASA DE LOS BULONES",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. El Éxodo 512",
"tel": "422-7431",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197224,
"lng": -65.291456
},
{
"proveedor": "LA ESPERANZA",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "San Martín 271",
"tel": "422-9480",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.177517,
"lng": -65.31554
},
{
"proveedor": "LAC LENARDUZZI",
"provincia": "Jujuy",
"rubros": [
"HORMIGÓN PREMOLDEADO"
],
"direccion": "Pachi Gorriti 986",
"tel": "425-1603",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.271211,
"lng": -65.198018
},
{
"proveedor": "Las Pircas Lajas",
"provincia": "Jujuy",
"rubros": [
"LAJAS"
],
"direccion": "Av. Almirante Brown 650",
"tel": "156-827635",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209671,
"lng": -65.280085
},
{
"proveedor": "LENARDUZZI",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "H Yrigoyen 1182",
"tel": "422-6216",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.235133,
"lng": -64.864636
},
{
"proveedor": "M&B",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Gorriti 644",
"tel": "424-0767",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190061,
"lng": -65.301895
},
{
"proveedor": "MACKOW INSTALACIONES",
"provincia": "Jujuy",
"rubros": [
"CIELORRASOS ACÚSTICOS Y TÉRMICOS"
],
"direccion": "Avellaneda 759",
"tel": "404-4405",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.19646,
"lng": -65.316286
},
{
"proveedor": "MADERERA DEL BOSQUE",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Av. Almirante Brown 1275",
"tel": "425-6432",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "MADERERA DEL NORTE",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Av. H. Yrigoyen 651",
"tel": "425-4524",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190151,
"lng": -65.290129
},
{
"proveedor": "MADERERA EL TREBOL",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Av. Corrientes 2842",
"tel": "425-5406",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.213926,
"lng": -65.274744
},
{
"proveedor": "MADERERA TRES ARROYOS",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "C Alvarado 222",
"tel": "425-2154",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.250967,
"lng": -65.236829
},
{
"proveedor": "MARCO ROTEMBERG",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Junín 125",
"tel": "423-4048",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.24852,
"lng": -65.207255
},
{
"proveedor": "MATERIALES EL CRUCE",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Alte Brown 230",
"tel": "425-4558",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190406,
"lng": -65.291079
},
{
"proveedor": "MATERIALES LA VIÑA",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Mosconi",
"tel": "426-1186",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.173742,
"lng": -65.306214
},
{
"proveedor": "MATERIALES SAN RAFAEL",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Zurita 36",
"tel": "425-0769",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.202039,
"lng": -65.281092
},
{
"proveedor": "METALÚRGICA FILERGUTTI",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "José de la Iglesia 1352",
"tel": "423-0641",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190766,
"lng": -65.302649
},
{
"proveedor": "METALÚRGICA GARLATTI",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Las Heras 650",
"tel": "425-2910",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.198717,
"lng": -65.287739
},
{
"proveedor": "METALÚRGICA MONTEAGUDO",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Monteagudo 1168",
"tel": "423-4448",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.232963,
"lng": -64.879772
},
{
"proveedor": "MOGRO CONSTRUCCIONES",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Keller 125",
"tel": "422-3196",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.205024,
"lng": -65.289603
},
{
"proveedor": "MOSAICOS ADHEMAR",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Santa Cruz 50",
"tel": "423-3306",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.224757,
"lng": -64.863733
},
{
"proveedor": "MOSAIQUERÍA ZENTENO",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Dr. Baldi 1614",
"tel": "422-8996",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.196047,
"lng": -65.316013
},
{
"proveedor": "MRD FERRETERIA INDUSTRIAL",
"provincia": "Jujuy",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Belgrano 232",
"tel": "491-6524",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.259404,
"lng": -65.19229
},
{
"proveedor": "MUEBLES DE MADERA",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "San Martín 965",
"tel": "408-5677",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.254006,
"lng": -65.205572
},
{
"proveedor": "NESMAR EMPRESA CONSTRUCTORA",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Lamadrid 50",
"tel": "422-4553",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.389312,
"lng": -65.25916
},
{
"proveedor": "OBRAS Y SERVICIOS",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Argañaraz 149",
"tel": "422-8662",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.375479,
"lng": -65.121172
},
{
"proveedor": "PINTURERIA DIP",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Almirante Brown 1398",
"tel": "425-5158",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.194195,
"lng": -65.289604
},
{
"proveedor": "PINTURERIA MARTÍN",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. El Éxodo 700",
"tel": "423-1100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197224,
"lng": -65.291456
},
{
"proveedor": "PINTURERIA NEBAR",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "J. Newbery 686",
"tel": "422-3822",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190342,
"lng": -65.301259
},
{
"proveedor": "PINTURERIAS CARRIZO",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Salta 711",
"tel": "423-1329",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.182076,
"lng": -65.312043
},
{
"proveedor": "PINTURERIAS DEL CENTRO",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Salta 1063",
"tel": "422-7152",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.182076,
"lng": -65.312043
},
{
"proveedor": "PINTURERÍA ROSA LARRIEU",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Patricias Argentinas 626",
"tel": "423-7451",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.80158,
"lng": -64.78055
},
{
"proveedor": "PINTURERÍAS ÉXODO",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Fascio 706",
"tel": "423-7180",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.181449,
"lng": -65.305141
},
{
"proveedor": "PLASTIMAR DE J. MARTÍNEZ",
"provincia": "Jujuy",
"rubros": [
"PILETAS"
],
"direccion": "La Posta 49",
"tel": "426-2056",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.169451,
"lng": -65.310691
},
{
"proveedor": "PRAMAX MADERAS",
"provincia": "Jujuy",
"rubros": [
"CARPINTERÍA DE MADERA - MADERERAS"
],
"direccion": "Av. Almirante Brown 645",
"tel": "425-4451",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.212395,
"lng": -65.278873
},
{
"proveedor": "RIMATEL S.R.L.",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Urdininea 268",
"tel": "424-4678",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.193117,
"lng": -65.301503
},
{
"proveedor": "RIMATEL S.R.L.",
"provincia": "Jujuy",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Párroco Marshke 2954",
"tel": "425-8073",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197983,
"lng": -65.289419
},
{
"proveedor": "ROSARIO MUEBLES",
"provincia": "Jujuy",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Necochea 250",
"tel": "423-8570",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.186017,
"lng": -65.304154
},
{
"proveedor": "SADIR INGENIERIA",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "C ISSA 310",
"tel": "426-2938",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.175716,
"lng": -65.289477
},
{
"proveedor": "SAN FRANCISCO",
"provincia": "Jujuy",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Pte. Perón 1284",
"tel": "424-2949",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.309845,
"lng": -64.96043
},
{
"proveedor": "SANITARIOS DIP",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Av. Almirante Brown 1462",
"tel": "425-2572",
"whatsapp": "",
"mail": "sanitariosdip@hotmail.com",
"web": "",
"lat": -24.205853,
"lng": -65.282484
},
{
"proveedor": "SANITARIOS DIP",
"provincia": "Jujuy",
"rubros": [
"SANITARIOS"
],
"direccion": "Av. Brown 1462",
"tel": "425-2572",
"whatsapp": "",
"mail": "sanitariosdip@hotmail.com",
"web": "",
"lat": -24.205853,
"lng": -65.282484
},
{
"proveedor": "SIETE COLORES",
"provincia": "Jujuy",
"rubros": [
"PLANOS - PLOTEO"
],
"direccion": "Necochea 250",
"tel": "423-8025",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.186017,
"lng": -65.304154
},
{
"proveedor": "SUPERMAT",
"provincia": "Jujuy",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"AMOBLAMIENTOS",
"MATERIALES DE CONSTRUCCIÓN",
"SANITARIOS"
],
"direccion": "Av. Almirante Brown 1350",
"tel": "425-4785",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.195056,
"lng": -65.289161
},
{
"proveedor": "SYMAR",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Las Heras 1084",
"tel": "425-5589",
"whatsapp": "",
"mail": "szylak@imagine.com.ar",
"web": "",
"lat": -24.198717,
"lng": -65.287739
},
{
"proveedor": "TECNO SHOP",
"provincia": "Jujuy",
"rubros": [
"CIELORRASOS ACÚSTICOS Y TÉRMICOS"
],
"direccion": "Av. Almirante Brown 1340",
"tel": "425-4998",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.209738,
"lng": -65.280264
},
{
"proveedor": "TECNOMAT",
"provincia": "Jujuy",
"rubros": [
"CONSTRUCCIÓN EN SECO",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "L. Alem 638",
"tel": "423-7679",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.192093,
"lng": -65.300222
},
{
"proveedor": "TERRA CONFORT",
"provincia": "Jujuy",
"rubros": [
"MARMOLERÍAS – MOSAICOS - CERÁMICOS"
],
"direccion": "Pereyra 1271",
"tel": "424-2642",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.206859,
"lng": -65.288756
},
{
"proveedor": "TÉCNICAS TELEFÓNICAS",
"provincia": "Jujuy",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN"
],
"direccion": "Güemes 934",
"tel": "422-7837",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.183103,
"lng": -65.306152
},
{
"proveedor": "VELAZQUEZ VIDRIOS",
"provincia": "Jujuy",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Alte Brown 1797",
"tel": "425-0887",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.190406,
"lng": -65.291079
},
{
"proveedor": "VIMAT",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Providencia 249",
"tel": "426-3600",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.219589,
"lng": -64.860665
},
{
"proveedor": "XIBI",
"provincia": "Jujuy",
"rubros": [
"CONTENEDORES"
],
"direccion": "Av. Corrientes 2607",
"tel": "425-1364",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.210247,
"lng": -65.279654
},
{
"proveedor": "ZARIF MARCELO",
"provincia": "Jujuy",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Zenta 1271",
"tel": "431-1475",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.151068,
"lng": -65.121786
},
{
"proveedor": "ÉXODO",
"provincia": "Jujuy",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. El Éxodo 660",
"tel": "424-1333",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.197322,
"lng": -65.291499
},
{
"proveedor": "10 DE OCTUBRE",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS",
"MOSAICOS"
],
"direccion": "10 de Octubre 787",
"tel": "423-4379",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.805483,
"lng": -65.423195
},
{
"proveedor": "20 DE FEBRERO",
"provincia": "Salta",
"rubros": [
"CONTENEDORES"
],
"direccion": "O’Higgins 973",
"tel": "434-5452",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.774829,
"lng": -65.427771
},
{
"proveedor": "A.F.INGENIERÍA",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "General Alvarado 2019",
"tel": "422-0634",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.849611,
"lng": -65.457655
},
{
"proveedor": "A.G. CHIBAN S.R.L.",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Pellegrini 802",
"tel": "423-2206",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.799666,
"lng": -65.41622
},
{
"proveedor": "ABERTURAS AMÉRICA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA METÁLICA"
],
"direccion": "J.M. Leguizamón 1023",
"tel": "421-4536",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.489773,
"lng": -64.973255
},
{
"proveedor": "ABRASIVOS SAN LUIS",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Islas Malvinas 220",
"tel": "431-8291",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792123,
"lng": -65.418332
},
{
"proveedor": "ACERLOT",
"provincia": "Salta",
"rubros": [
"ALAMBRES",
"CAÑOS Y ACCESORIOS",
"CHAPAS",
"HIERROS"
],
"direccion": "Leguizamón 1450",
"tel": "431-5599",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.782865,
"lng": -65.422207
},
{
"proveedor": "ACLIMATARE",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "J.M. Leguizamón 1720",
"tel": "421-8099",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.489773,
"lng": -64.973255
},
{
"proveedor": "ADICEM",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CONSTRUCCIÓN EN SECO",
"IMPERMEABILIZACIONES"
],
"direccion": "Av. Independencia 605",
"tel": "423-6474",
"whatsapp": "",
"mail": "adicem@adicem.com.ar",
"web": "https://www.adicem.com.ar/",
"lat": -24.808059,
"lng": -65.408185
},
{
"proveedor": "AGI CONSTRUCCIONES",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"HORMIGÓN ELABORADO"
],
"direccion": "Durañona 1050",
"tel": "428-2758",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.834264,
"lng": -65.374293
},
{
"proveedor": "AGUA Y SOL",
"provincia": "Salta",
"rubros": [
"BOMBAS PARA AGUA",
"PILETAS"
],
"direccion": "Alsina 777",
"tel": "431-4811",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.779815,
"lng": -65.412413
},
{
"proveedor": "AGUA’S",
"provincia": "Salta",
"rubros": [
"GAS",
"IMPERMEABILIZACIONES",
"SANITARIOS"
],
"direccion": "Av. Entre Ríos 2199",
"tel": "401-9558",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.781551,
"lng": -65.404173
},
{
"proveedor": "AISLAPOR",
"provincia": "Salta",
"rubros": [
"CIELORRASOS"
],
"direccion": "Mendoza 1174",
"tel": "156-058836",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788097,
"lng": -65.445712
},
{
"proveedor": "AISLAR",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Necochea 1632",
"tel": "387 537-1827",
"whatsapp": "381 510-2150",
"mail": "cmartinaislarnoa@gmail.com",
"web": "",
"lat": -24.777526,
"lng": -65.42433
},
{
"proveedor": "ALAMBRAR",
"provincia": "Salta",
"rubros": [
"ALAMBRES"
],
"direccion": "Zabala 410",
"tel": "426-2676",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.802645,
"lng": -65.409601
},
{
"proveedor": "ALARMA GOIVA",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Córdoba 1021",
"tel": "426-2422",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.803052,
"lng": -65.40911
},
{
"proveedor": "ALBIERO HNOS.",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Av. Virrey Toledo 874",
"tel": "421-8800",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.89791,
"lng": -65.668255
},
{
"proveedor": "ALBIERO HNOS.",
"provincia": "Salta",
"rubros": [
"CIRCUITOS CERRADOS DE TV",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Av. Virrey Toledo 898",
"tel": "421-8800",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.89791,
"lng": -65.668255
},
{
"proveedor": "ALPA",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Güemes 694",
"tel": "431-2642",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.514053,
"lng": -63.805246
},
{
"proveedor": "ALQUIMIA",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Balcarce 405",
"tel": "422-8240",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784741,
"lng": -65.411976
},
{
"proveedor": "AMPERE NORTE",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Ituzaingó 2",
"tel": "421-3322",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789686,
"lng": -65.413791
},
{
"proveedor": "AMÉRICA",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Leguizamón 1023",
"tel": "431-1608",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.783387,
"lng": -65.416373
},
{
"proveedor": "AMÉRICA",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Leguizamón 960",
"tel": "421-1222",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.783331,
"lng": -65.415319
},
{
"proveedor": "ANBRA",
"provincia": "Salta",
"rubros": [
"ADHESIVOS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"EMPRESAS CONSTRUCTORAS",
"IMPERMEABILIZACIONES"
],
"direccion": "Güemes 1032",
"tel": "422-3744",
"whatsapp": "",
"mail": "prokretesalta@gmail.com",
"web": "",
"lat": -24.785573,
"lng": -65.416705
},
{
"proveedor": "AQUAPOOL",
"provincia": "Salta",
"rubros": [
"PILETAS"
],
"direccion": "Av. Entre Ríos 1650",
"tel": "431-1117",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.780134,
"lng": -65.424775
},
{
"proveedor": "ARGOS",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Virrey Toledo 250",
"tel": "421-6060",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.89791,
"lng": -65.668255
},
{
"proveedor": "ARIDOS QUIJANO",
"provincia": "Salta",
"rubros": [
"ÁRIDOS- CANTERAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Alfredo Palacios 2720",
"tel": "427-0050",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.816371,
"lng": -65.425664
},
{
"proveedor": "ARNEDO",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "M. Cornejo 428",
"tel": "431-5368",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.509907,
"lng": -63.804837
},
{
"proveedor": "ASUNTA MUEBLES",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Chile 1336",
"tel": "423-1524",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.732854,
"lng": -65.482285
},
{
"proveedor": "AYALA",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Zacarías Yanci 549",
"tel": "434-4702",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.800061,
"lng": -65.449252
},
{
"proveedor": "AYELEN COPIAS",
"provincia": "Salta",
"rubros": [
"COPIAS DE PLANOS"
],
"direccion": "Zuviría 342",
"tel": "421-2466",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785886,
"lng": -65.409213
},
{
"proveedor": "BANCHIC",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Libertad 343",
"tel": "423-0893",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.005647,
"lng": -63.208154
},
{
"proveedor": "BARRO",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Río del Valle 2546",
"tel": "435-0232",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.674787,
"lng": -64.200129
},
{
"proveedor": "BEBEL MAURY",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Pueyrredón 1144",
"tel": "432-0369",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.775915,
"lng": -65.405411
},
{
"proveedor": "BETON S.R.L.",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Tavella 1255",
"tel": "401-2020",
"whatsapp": "",
"mail": "beton@salnet.com.ar",
"web": "",
"lat": -24.828592,
"lng": -65.428421
},
{
"proveedor": "BIMAQO",
"provincia": "Salta",
"rubros": [
"CONSTRUCCIÓN EN SECO"
],
"direccion": "10 de Octubre 70",
"tel": "431-0039",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789751,
"lng": -65.423601
},
{
"proveedor": "BINDA AUGUSTO",
"provincia": "Salta",
"rubros": [
"CALDERAS - CALEFACCIÓN"
],
"direccion": "Dean Funes 348",
"tel": "431-0136",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785936,
"lng": -65.407847
},
{
"proveedor": "BINDA VICTORIO",
"provincia": "Salta",
"rubros": [
"ADHESIVOS"
],
"direccion": "España 63",
"tel": "431-2077",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789145,
"lng": -65.403588
},
{
"proveedor": "BOLLINI S.A.",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "C. Pellegrini 811",
"tel": "423-5990",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.987481,
"lng": -65.579303
},
{
"proveedor": "BP",
"provincia": "Salta",
"rubros": [
"ALUMBRADO PUBLICO",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Tavella 2830",
"tel": "427-1001",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.812242,
"lng": -65.39769
},
{
"proveedor": "BULONERA LA TUERCA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini 888",
"tel": "423-3078",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.800369,
"lng": -65.416294
},
{
"proveedor": "BUNKER CARTELERIA",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Pellegrini 982",
"tel": "423-6652",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.987481,
"lng": -65.579303
},
{
"proveedor": "CALCARTE",
"provincia": "Salta",
"rubros": [
"MOSAICOS"
],
"direccion": "Av. Entre Ríos 327",
"tel": "422-7497",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.781544,
"lng": -65.406493
},
{
"proveedor": "CANDY",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO",
"CALDERAS - CALEFACCIÓN"
],
"direccion": "10 de Octubre 444",
"tel": "421-2983",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.794513,
"lng": -65.423988
},
{
"proveedor": "CARLOS FLORES SRL",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "Deán Funes 1148",
"tel": "421-1489",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.775713,
"lng": -65.406807
},
{
"proveedor": "CAS FERRETERIA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Independencia 624",
"tel": "423-3759",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.08557,
"lng": -63.23362
},
{
"proveedor": "CASA OREL",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Chacabuco 142",
"tel": "421-5585",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.790518,
"lng": -65.426434
},
{
"proveedor": "CASANOVA",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Alberdi 417",
"tel": "421-4702",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.795054,
"lng": -65.411444
},
{
"proveedor": "CASAS CONTEMPORANEAS",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Pueyrredón 999",
"tel": "422-2815",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.777734,
"lng": -65.405783
},
{
"proveedor": "CASEROS VIDRIOS",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "General Lavalle 3",
"tel": "431-9369",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.150141,
"lng": -64.322469
},
{
"proveedor": "CASTELLANI",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Chile 1243",
"tel": "421-2929",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.732854,
"lng": -65.482285
},
{
"proveedor": "CEAR",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"PREMOLDEADOS"
],
"direccion": "Zuviría 2565",
"tel": "439-3572",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.978124,
"lng": -65.578559
},
{
"proveedor": "CEDRORÁN",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Caseros 1750",
"tel": "421-1582",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788676,
"lng": -65.426916
},
{
"proveedor": "CEM",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS",
"CARPINTERÍA METÁLICA",
"CHAPAS"
],
"direccion": "Av. Chile 1456",
"tel": "423-6089",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809059,
"lng": -65.418729
},
{
"proveedor": "CEMENTO MINETTI",
"provincia": "Salta",
"rubros": [
"CEMENTO"
],
"direccion": "España 612",
"tel": "431-8483",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788501,
"lng": -65.411126
},
{
"proveedor": "CENTRO GOMA",
"provincia": "Salta",
"rubros": [
"PISOS Y REVESTIMIENTOS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "Pellegrini 411",
"tel": "421-6231",
"whatsapp": "",
"mail": "centrogoma@yahoo.com.ar",
"web": "",
"lat": -24.794671,
"lng": -65.415521
},
{
"proveedor": "CENTRO IMAGEN",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Deán Funes 165",
"tel": "431-0963",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788073,
"lng": -65.408171
},
{
"proveedor": "CERAMICA COQUENA",
"provincia": "Salta",
"rubros": [
"CERÁMICOS"
],
"direccion": "Av. Durañona 1335",
"tel": "428-3343",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.834264,
"lng": -65.374293
},
{
"proveedor": "CERAMICA SALTEÑA",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Polonia 2201",
"tel": "435-0350",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817873,
"lng": -65.410616
},
{
"proveedor": "CERAMICADOS",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Paraguay s/n",
"tel": "423-6629",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809596,
"lng": -65.421512
},
{
"proveedor": "CERRALUM SALTA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "J.B. Alberdi 793",
"tel": "496-0322",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.51588,
"lng": -63.803343
},
{
"proveedor": "CERRALUM SALTA",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "J. B. Alberdi 793",
"tel": "496-0322",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.51588,
"lng": -63.803343
},
{
"proveedor": "CERÁMICA DEL NORTE",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Av. Artigas 252",
"tel": "428-0680",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808207,
"lng": -65.392494
},
{
"proveedor": "CHIBAN HNOS",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Caseros 759",
"tel": "431-7302",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789694,
"lng": -65.413166
},
{
"proveedor": "CLI-MAX REFRIGERACIÓN",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Mar Adriático 1330",
"tel": "427-1957",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.827335,
"lng": -65.421877
},
{
"proveedor": "COBRE 2000",
"provincia": "Salta",
"rubros": [
"ALAMBRES"
],
"direccion": "Mendoza 1174",
"tel": "432-1194",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788097,
"lng": -65.445712
},
{
"proveedor": "COLORSHOP",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Caseros 1098",
"tel": "422-5550",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789289,
"lng": -65.417821
},
{
"proveedor": "COMESA",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Pueyrredón 775",
"tel": "431-1233",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.780547,
"lng": -65.406009
},
{
"proveedor": "CONSTRUCTORA FEYLING",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Santiago del Estero 283",
"tel": "431-7594",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785421,
"lng": -65.406245
},
{
"proveedor": "CONTEMAS",
"provincia": "Salta",
"rubros": [
"CONTENEDORES"
],
"direccion": "Santiago del Estero 191",
"tel": "431-0496",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785517,
"lng": -65.405029
},
{
"proveedor": "CONTENOR",
"provincia": "Salta",
"rubros": [
"CONTENEDORES"
],
"direccion": "Martín Cornejo 1461",
"tel": "431-2690",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.770887,
"lng": -65.421634
},
{
"proveedor": "COPIAS DE PLANOS",
"provincia": "Salta",
"rubros": [
"COPIAS DE PLANOS"
],
"direccion": "San Luis 112",
"tel": "423-4311",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797853,
"lng": -65.40484
},
{
"proveedor": "COPY-SHOW",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Mitre 424",
"tel": "421-3030",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784641,
"lng": -65.410462
},
{
"proveedor": "CORRALON EL AMIGO",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Chile 1450",
"tel": "423-1235",
"whatsapp": "",
"mail": "elamigo.salta@elamigo.com",
"web": "",
"lat": -24.80839,
"lng": -65.419382
},
{
"proveedor": "CORRALÓN 20 DE FEBRERO",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "O’Higgins 973",
"tel": "434-5452",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.774829,
"lng": -65.427771
},
{
"proveedor": "CORRALÓN ACONQUIJA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CONSTRUCCIÓN EN SECO",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Chile 1145",
"tel": "496-0786",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80511,
"lng": -65.417031
},
{
"proveedor": "CORRALÓN AMERICA",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Leguizamón 1977",
"tel": "431-1608",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.782553,
"lng": -65.429473
},
{
"proveedor": "CORRALÓN AYALA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PINTURERÍAS"
],
"direccion": "Zacarías Yanci 549",
"tel": "434-4702",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.800061,
"lng": -65.449252
},
{
"proveedor": "CORRALÓN CHACABUCO",
"provincia": "Salta",
"rubros": [
"CONSTRUCCIÓN EN SECO",
"HERRAJES",
"HIERROS",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Chacabuco 264",
"tel": "422-5647",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792007,
"lng": -65.42656
},
{
"proveedor": "CORRALÓN DEL NOA",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Chile 1296",
"tel": "423-4700",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809059,
"lng": -65.418729
},
{
"proveedor": "CORRALÓN DON ABRAHAM",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Paraguay 1248",
"tel": "426-9890",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.829983,
"lng": -65.431456
},
{
"proveedor": "CORRALÓN EL MERCADO",
"provincia": "Salta",
"rubros": [
"CEMENTO",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PISOS Y REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Independencia 698",
"tel": "423-2233",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808252,
"lng": -65.407037
},
{
"proveedor": "CORRALÓN LA TABLADA",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"CEMENTO",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN",
"PISOS Y REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Independencia 1150",
"tel": "423-0874",
"whatsapp": "",
"mail": "corralonlatablada@arnetbiz.com.ar",
"web": "",
"lat": -24.80818,
"lng": -65.400732
},
{
"proveedor": "CORRALÓN SALTA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "Siria 1232",
"tel": "422-3306",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.773353,
"lng": -65.426007
},
{
"proveedor": "CORRALÓN SAN ANTONIO",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Independencia 124",
"tel": "423-6125",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808674,
"lng": -65.414008
},
{
"proveedor": "CORTINADOS RODRIGUEZ",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "A. Güemes 427",
"tel": "431-0988",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.786422,
"lng": -65.455761
},
{
"proveedor": "CRISTALIZANDO",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Pellegrini 702",
"tel": "423-7777",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798413,
"lng": -65.416084
},
{
"proveedor": "CRYSTAL",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Alberdi 200",
"tel": "422-2059",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792428,
"lng": -65.411308
},
{
"proveedor": "CUADRADO HERMANOS",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini 742",
"tel": "423-6713",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798815,
"lng": -65.416129
},
{
"proveedor": "DALCÓN S.A.",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Balcarce 2530",
"tel": "439-2037",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.781776,
"lng": -65.411608
},
{
"proveedor": "DALFER MADERAS",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Av. Paraguay 2180",
"tel": "427-1256",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809596,
"lng": -65.421512
},
{
"proveedor": "DANIEL LEÓN",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "A. Alsina 960",
"tel": "421-0733",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.677548,
"lng": -65.040432
},
{
"proveedor": "DE SANTOS",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS",
"PVC"
],
"direccion": "Buenos Aires 900",
"tel": "423-6665",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.801397,
"lng": -65.410806
},
{
"proveedor": "DECORAR",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Santiago del Estero 287",
"tel": "421-5059",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785417,
"lng": -65.406289
},
{
"proveedor": "DENKI INGENIERIA",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Vicente López 315",
"tel": "422-3495",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.786634,
"lng": -65.405377
},
{
"proveedor": "DEPÓSITO CANDELA",
"provincia": "Salta",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "J.M. Leguizamón 1360",
"tel": "431-3088",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.67161,
"lng": -65.057578
},
{
"proveedor": "DINELEC",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Urquiza 1402",
"tel": "431-3914",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791436,
"lng": -65.422411
},
{
"proveedor": "DISTRIBUIDORA GAY",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"SANITARIOS"
],
"direccion": "San Martín 863",
"tel": "422-2723",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.515828,
"lng": -63.797975
},
{
"proveedor": "DOLMEN",
"provincia": "Salta",
"rubros": [
"INGENIERÍA"
],
"direccion": "Adolfo Güemes 389",
"tel": "386 4469 635",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784685,
"lng": -65.417562
},
{
"proveedor": "DULCE Y MELOSO",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Balcarce 406",
"tel": "401-1708",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784733,
"lng": -65.411846
},
{
"proveedor": "EL ALGARROBO",
"provincia": "Salta",
"rubros": [
"VIVEROS"
],
"direccion": "Villa San Lorenzo",
"tel": "492-1597",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.802654,
"lng": -65.45836
},
{
"proveedor": "EL CHABOT",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "B. Mitre 859",
"tel": "422-4154",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.982627,
"lng": -65.583965
},
{
"proveedor": "EL CUERVO",
"provincia": "Salta",
"rubros": [
"CONTENEDORES"
],
"direccion": "Bolívar 1090",
"tel": "431-6880",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.775701,
"lng": -65.419301
},
{
"proveedor": "EL GALPÓN",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Ameghino 262",
"tel": "431-5500",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.77762,
"lng": -65.405195
},
{
"proveedor": "EL OBRERO",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "General Güemes",
"tel": "(0387) 491-1859",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.807674,
"lng": -64.916738
},
{
"proveedor": "EL OMBÚ",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Maipú 580",
"tel": "422-8483",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.781794,
"lng": -65.425499
},
{
"proveedor": "EL PINTOR",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Florida 779",
"tel": "423-2950",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.799513,
"lng": -65.413276
},
{
"proveedor": "EL PORTAL",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "F. de Zuviría 1760",
"tel": "439-3669",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.587541,
"lng": -63.859298
},
{
"proveedor": "EL SALTEÑO",
"provincia": "Salta",
"rubros": [
"ABERTURAS"
],
"direccion": "Av. Independencia 699",
"tel": "426-2199",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808053,
"lng": -65.407012
},
{
"proveedor": "EL SALTEÑO",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Independencia 680",
"tel": "426-2199",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808252,
"lng": -65.407264
},
{
"proveedor": "EL SOL",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"SANITARIOS"
],
"direccion": "I. Malvinas 144",
"tel": "421-0476",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.787485,
"lng": -65.445071
},
{
"proveedor": "ELECTRICID R. D.",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Jujuy 642",
"tel": "431-6065",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797334,
"lng": -65.417406
},
{
"proveedor": "ELECTRO NORTE",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Entre Ríos 867",
"tel": "431-1448",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.781067,
"lng": -65.413807
},
{
"proveedor": "ELECTRO TELEFONIA J C",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Pasaje Gobelli 2083",
"tel": "422-0005",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.597266,
"lng": -63.808993
},
{
"proveedor": "ELECTRONOA",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Urquiza 854",
"tel": "422-5593",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792022,
"lng": -65.4147
},
{
"proveedor": "ELEMENTOS PARA LA CONSTRUCCIÓN",
"provincia": "Salta",
"rubros": [
"PREMOLDEADOS"
],
"direccion": "Zambrano 57",
"tel": "428-2125",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.728084,
"lng": -65.394118
},
{
"proveedor": "ELEMNOR",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "V. Tedín 940",
"tel": "423-2002",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.805285,
"lng": -65.409567
},
{
"proveedor": "ELEMNOR SRL",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA",
"CONSTRUCCIÓN EN SECO",
"VIDRIERÍAS"
],
"direccion": "Virgilio Tedin 940",
"tel": "423-2002",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80636,
"lng": -65.416703
},
{
"proveedor": "EMI",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ADHESIVOS",
"ALUMINIO - CARPINTERIA",
"PISOS Y REVESTIMIENTOS",
"PVC"
],
"direccion": "Av. Chile 1591 - Capital",
"tel": "426-1631",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "EMI",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ADHESIVOS",
"ALUMINIO - CARPINTERIA",
"CEMENTO",
"CIELORRASOS",
"CORTINAS - PERSIANAS",
"PISOS Y REVESTIMIENTOS",
"PVC"
],
"direccion": "Arenales 1870 - Oran",
"tel": "420-030",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.137353,
"lng": -64.319713
},
{
"proveedor": "EMI",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ADHESIVOS",
"ALUMINIO - CARPINTERIA",
"CEMENTO",
"CIELORRASOS",
"CORTINAS - PERSIANAS",
"PISOS Y REVESTIMIENTOS",
"PVC"
],
"direccion": "Av. Alberdi 1135 - Tartagal",
"tel": "423-993",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.516861,
"lng": -63.794529
},
{
"proveedor": "EMI",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"BOMBAS PARA AGUA",
"CAÑOS Y ACCESORIOS",
"CARPINTERÍA METÁLICA",
"CHAPAS",
"CONSTRUCCIÓN EN SECO",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"HERRAJES",
"HIERROS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Corrientes 1315",
"tel": "426-2553",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.801572,
"lng": -65.422681
},
{
"proveedor": "EMI",
"provincia": "Salta",
"rubros": [
"CEMENTO",
"CIELORRASOS",
"CORTINAS - PERSIANAS"
],
"direccion": "Av. Chile 1591- Capital",
"tel": "4261631",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80511,
"lng": -65.417031
},
{
"proveedor": "ENORTEC",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "General Mitre 899",
"tel": "421-9267",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.908803,
"lng": -65.643086
},
{
"proveedor": "ERG NORANDINA SRL",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "25 de Mayo 105",
"tel": "432-1312",
"whatsapp": "",
"mail": "www.grupoerg.com",
"web": "",
"lat": -24.788138,
"lng": -65.415061
},
{
"proveedor": "ESPE VÍDRIOS",
"provincia": "Salta",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Córdoba 701",
"tel": "423-9364",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798894,
"lng": -65.409
},
{
"proveedor": "ESTAR MUEBLES",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Pueyrredón 496",
"tel": "432-1448",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784116,
"lng": -65.40634
},
{
"proveedor": "ESTILO & DISEÑO",
"provincia": "Salta",
"rubros": [
"ABERTURAS"
],
"direccion": "Av. Sarmiento 965",
"tel": "431-1521",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.777504,
"lng": -65.415451
},
{
"proveedor": "ESTILO & DISEÑO",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "Sarmiento 965",
"tel": "431-1521",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.510762,
"lng": -63.802321
},
{
"proveedor": "ESTILO Y DISEÑO",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Sarmiento 965",
"tel": "431-1521",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.510762,
"lng": -63.802321
},
{
"proveedor": "ESTUDIO 3",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Tucumán 995",
"tel": "423-1754",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.800792,
"lng": -65.426429
},
{
"proveedor": "EXODO",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Independencia 650",
"tel": "423-3355",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808252,
"lng": -65.407642
},
{
"proveedor": "FAAL",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS",
"PINTURERÍAS"
],
"direccion": "Av. Independencia 849",
"tel": "423-9498",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808051,
"lng": -65.404732
},
{
"proveedor": "FAAL",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Independencia 849",
"tel": "423-9498",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.08557,
"lng": -63.23362
},
{
"proveedor": "FABIÁN",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "B° San Francisco",
"tel": "424-2967",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.081251,
"lng": -63.89252
},
{
"proveedor": "FELTRIN",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Jujuy 363",
"tel": "421-1600",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.793865,
"lng": -65.416857
},
{
"proveedor": "FER-CONS",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Reyes Católicos 2192",
"tel": "439-0762",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.748237,
"lng": -65.397267
},
{
"proveedor": "FERBAZEL",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Rivadavia 101 (Tartagal)",
"tel": "(03875) 42-4299",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.520765,
"lng": -63.805903
},
{
"proveedor": "FERRETERÍA GAY",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Jujuy 591",
"tel": "422-5544",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796734,
"lng": -65.417158
},
{
"proveedor": "FERRETERÍA MAESTRO",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. San Martín 2091",
"tel": "431-7353",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792217,
"lng": -65.431846
},
{
"proveedor": "FERRETERÍA PELLEGRINI",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini 602",
"tel": "431-6669",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797096,
"lng": -65.415936
},
{
"proveedor": "FERROLUZ",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Alberdi 222",
"tel": "431-2811",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792653,
"lng": -65.411327
},
{
"proveedor": "FIORI",
"provincia": "Salta",
"rubros": [
"ALAMBRES",
"FERRETERÍAS - BULONERÍAS",
"HERRAJES",
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "Catamarca 431",
"tel": "431-8351",
"whatsapp": "",
"mail": "gfiori@arnet.com.ar",
"web": "",
"lat": -24.795688,
"lng": -65.40595
},
{
"proveedor": "FLORES GRION",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Zuviria 2641",
"tel": "439-3533",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.756943,
"lng": -65.409624
},
{
"proveedor": "FLORES GRIÓN SRL",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Zuviría 2641",
"tel": "439-3533",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.978124,
"lng": -65.578559
},
{
"proveedor": "FRAVAL",
"provincia": "Salta",
"rubros": [
"ALAMBRES",
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Chile 1750",
"tel": "426-2666",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "FRIO SALT REFRIGERACIÓN",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Pellegrini 664",
"tel": "422-2415",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797805,
"lng": -65.416019
},
{
"proveedor": "GALVYTUB",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"CHAPAS"
],
"direccion": "San Luis 881",
"tel": "431-9598",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797078,
"lng": -65.415536
},
{
"proveedor": "GARIN CONSTRUCCIONES",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Reyes Católicos 1677",
"tel": "439-2410",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.748237,
"lng": -65.397267
},
{
"proveedor": "GAS SERVICE",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"GAS"
],
"direccion": "Bolívar 340",
"tel": "422-4570/422-1219",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784925,
"lng": -65.420233
},
{
"proveedor": "GASOL SRL",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini 672",
"tel": "431-4080",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797897,
"lng": -65.416029
},
{
"proveedor": "GAVENDA",
"provincia": "Salta",
"rubros": [
"ALARMAS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Los Nogales 61",
"tel": "439-2101",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.086841,
"lng": -64.795774
},
{
"proveedor": "GAY GAS",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS"
],
"direccion": "San Martín 863",
"tel": "422-2723",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.515828,
"lng": -63.797975
},
{
"proveedor": "GAY SRL",
"provincia": "Salta",
"rubros": [
"GAS"
],
"direccion": "San Martin 863",
"tel": "422-2723",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -22.515828,
"lng": -63.797975
},
{
"proveedor": "GEMA TOLDOS & CORTINAS",
"provincia": "Salta",
"rubros": [
"CORTINAS - PERSIANAS"
],
"direccion": "Brown 594",
"tel": "421-4848",
"whatsapp": "",
"mail": "info@toldosgema.com.ar",
"web": "www.toldosgema.com.ar",
"lat": -25.327858,
"lng": -64.005314
},
{
"proveedor": "GIOVA",
"provincia": "Salta",
"rubros": [
"PORTONES AUTOMÁTICOS"
],
"direccion": "Córdoba 1021",
"tel": "426-2422",
"whatsapp": "",
"mail": "gmalvasi@arnet.com.ar",
"web": "",
"lat": -24.803052,
"lng": -65.40911
},
{
"proveedor": "GMKT",
"provincia": "Salta",
"rubros": [
"BOMBAS PARA AGUA",
"CALDERAS - CALEFACCIÓN",
"CAÑOS Y ACCESORIOS",
"ENERGÍA SOLAR",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PVC",
"SANITARIOS",
"SISTEMAS DE BOMBEO"
],
"direccion": "Av. Chile 1243",
"tel": "486-0979",
"whatsapp": "",
"mail": "info@gmkt.com.ar",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "GOIVA",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Córdoba 1021",
"tel": "426-2422",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.803052,
"lng": -65.40911
},
{
"proveedor": "GRADO CELSIUS",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "C. Pellegrini 520",
"tel": "431-6275",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.987481,
"lng": -65.579303
},
{
"proveedor": "GUAFRA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"CARPINTERIA DE OBRA",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Av. Independencia 1164",
"tel": "423-6582",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808178,
"lng": -65.400572
},
{
"proveedor": "GÓMEZ ROCO Y CIA.",
"provincia": "Salta",
"rubros": [
"BOMBAS PARA AGUA",
"CAÑOS Y ACCESORIOS",
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Rioja 834",
"tel": "431-0968",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798305,
"lng": -65.415147
},
{
"proveedor": "HABITAT INTERIOR",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Av. Belgrano 1800",
"tel": "421-8288",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785993,
"lng": -65.427437
},
{
"proveedor": "HBC Construcción",
"provincia": "Salta",
"rubros": [
"ABERTURAS"
],
"direccion": "Av. Durañona 985",
"tel": "428-2221",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.834264,
"lng": -65.374293
},
{
"proveedor": "HERRAJES ABC",
"provincia": "Salta",
"rubros": [
"HERRAJES"
],
"direccion": "Av. Entre Ríos 966",
"tel": "421-3975",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.780771,
"lng": -65.415142
},
{
"proveedor": "HERRAJES ITUZAINGÓ",
"provincia": "Salta",
"rubros": [
"HERRAJES"
],
"direccion": "Ituzaingó 430",
"tel": "422-8870",
"whatsapp": "-",
"mail": "herrajes.ituzaingo.salta@gmail.com",
"web": "-",
"lat": -24.799028,
"lng": -65.41471
},
{
"proveedor": "HERRAJES SAN JOSE",
"provincia": "Salta",
"rubros": [
"HERRAJES"
],
"direccion": "Av. Entre Ríos 976",
"tel": "422-4809",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.780763,
"lng": -65.415253
},
{
"proveedor": "HIERRONORT",
"provincia": "Salta",
"rubros": [
"ALAMBRES",
"CAÑOS Y ACCESORIOS",
"CHAPAS",
"HIERROS"
],
"direccion": "Paraguay 1450",
"tel": "423-1445",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.734319,
"lng": -65.481657
},
{
"proveedor": "HIERROS METÁN",
"provincia": "Salta",
"rubros": [
"HIERROS"
],
"direccion": "San Martín s/n",
"tel": "(03876) 421674",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -25.186188,
"lng": -65.812136
},
{
"proveedor": "HOSEN MUEBLES",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS",
"CARPINTERIA DE OBRA"
],
"direccion": "H.D. Lerma 131",
"tel": "432-9472",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.981079,
"lng": -65.59731
},
{
"proveedor": "HUASI SA",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "España 1535",
"tel": "422-3146",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.787663,
"lng": -65.423825
},
{
"proveedor": "IMPOPLEGA",
"provincia": "Salta",
"rubros": [
"CIELORRASOS"
],
"direccion": "La Rioja 500",
"tel": "421-8314",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798619,
"lng": -65.41052
},
{
"proveedor": "IMPOPLEGA",
"provincia": "Salta",
"rubros": [
"PVC"
],
"direccion": "La Rioja",
"tel": "421-8314",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796772,
"lng": -65.435431
},
{
"proveedor": "INDEPENDENCIA",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"FERRETERÍAS - BULONERÍAS",
"HERRAJES",
"MADERAS - CARPINTERÍAS - ASERRADEROS",
"PINTURERÍAS"
],
"direccion": "Santa Fe 1398",
"tel": "426-2094",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -32.802834,
"lng": -61.418036
},
{
"proveedor": "INDUMETAL",
"provincia": "Salta",
"rubros": [
"PORTONES AUTOMÁTICOS"
],
"direccion": "Los Partidarios 1220",
"tel": "423-6097",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.807584,
"lng": -65.415912
},
{
"proveedor": "INDUMETAL S.R.L.",
"provincia": "Salta",
"rubros": [
"CORTINAS - PERSIANAS"
],
"direccion": "Av. Chile 1449",
"tel": "423-6097",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "INDUSPARQUET",
"provincia": "Salta",
"rubros": [
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Indalecio Gómez 154",
"tel": "431-3959",
"whatsapp": "",
"mail": "npintado@indusparquet.com.ar",
"web": "",
"lat": -24.790405,
"lng": -65.399974
},
{
"proveedor": "INDUSTRIAS CLARCK",
"provincia": "Salta",
"rubros": [
"PILETAS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "General Lamadrid 610",
"tel": "422-8601",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796755,
"lng": -65.422744
},
{
"proveedor": "ING. J. R. MARTINEZ",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Paraguay 1450",
"tel": "423-0805",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.734319,
"lng": -65.481657
},
{
"proveedor": "ING. RAMÓN RUSSO",
"provincia": "Salta",
"rubros": [
"SISTEMA CONTRA INCENDIO"
],
"direccion": "Catamarca 155",
"tel": "431-4625",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792078,
"lng": -65.405713
},
{
"proveedor": "INGE 2 SRL",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Esteco 1015",
"tel": "423-6198",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.433144,
"lng": -64.850384
},
{
"proveedor": "INGENIERIA COMTEC",
"provincia": "Salta",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Ituzaingó 73",
"tel": "431-4447",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.790481,
"lng": -65.413782
},
{
"proveedor": "INGENOR SALTA",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Urquiza 1437",
"tel": "422-6033",
"whatsapp": "",
"mail": "ingenorsalta@ingenoraire.com.ar",
"web": "",
"lat": -24.791536,
"lng": -65.422831
},
{
"proveedor": "INTECTO",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Lamadrid 877",
"tel": "426-0072",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.799874,
"lng": -65.421975
},
{
"proveedor": "ISN",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Vicente López 2398",
"tel": "439-3701",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.754929,
"lng": -65.405925
},
{
"proveedor": "J.A. TEXTIL",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Jujuy 486",
"tel": "421-2566",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.795375,
"lng": -65.417194
},
{
"proveedor": "LA ACHIRANA",
"provincia": "Salta",
"rubros": [
"LAJAS"
],
"direccion": "Av. Ex Combatientes. de Malvinas 3773",
"tel": "424-9567",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.790837,
"lng": -64.957505
},
{
"proveedor": "LA CANTERA",
"provincia": "Salta",
"rubros": [
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Av. Paraguay 1501",
"tel": "426-0350",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.829983,
"lng": -65.431456
},
{
"proveedor": "LA CASA DE COPIAS Y PLANOS",
"provincia": "Salta",
"rubros": [
"COPIAS DE PLANOS"
],
"direccion": "Av. Belgrano 877",
"tel": "431-1487",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.787051,
"lng": -65.414536
},
{
"proveedor": "LA CASA DEL REVESTIMIENTO",
"provincia": "Salta",
"rubros": [
"CIELORRASOS",
"DECORACIÓN Y EQUIPAMIENTO",
"MARMOLERÍAS",
"PINTURERÍAS"
],
"direccion": "Buenos Aires 715",
"tel": "423-4111",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798979,
"lng": -65.410409
},
{
"proveedor": "LA FERRET",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. 17 de Junio 297",
"tel": "425-1847",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.715861,
"lng": -65.401884
},
{
"proveedor": "LA NUEVA INDUSTRIAL",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS",
"MOSAICOS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Corrientes 1195",
"tel": "423-1664",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.801382,
"lng": -65.409981
},
{
"proveedor": "LA RIVERA",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Islas Malvinas 181",
"tel": "431-5467",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791509,
"lng": -65.418121
},
{
"proveedor": "LAMI-TECH SH",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Coronel Moldes 665",
"tel": "431-2780",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797114,
"lng": -65.427937
},
{
"proveedor": "LAS DOÑAS",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Caseros 665",
"tel": "431-4187",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789776,
"lng": -65.411885
},
{
"proveedor": "LAS MALVINAS",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Islas Malvinas 189",
"tel": "432-9386",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.7916,
"lng": -65.418131
},
{
"proveedor": "LAS MARGARITAS",
"provincia": "Salta",
"rubros": [
"VIVEROS"
],
"direccion": "Reyes Católicos 1433",
"tel": "439-8989",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.812882,
"lng": -64.974826
},
{
"proveedor": "LAVICOR",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA",
"CORTINAS - PERSIANAS",
"DECORACIÓN Y EQUIPAMIENTO",
"PVC"
],
"direccion": "S. del Estero 953",
"tel": "431-7025",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784744,
"lng": -65.413965
},
{
"proveedor": "LESELEC",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Zabala 117",
"tel": "423-2663",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.803151,
"lng": -65.405448
},
{
"proveedor": "LIBRA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Córdoba 648",
"tel": "431-1756",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798155,
"lng": -65.409061
},
{
"proveedor": "LIQUITAY",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Lavalle 2015",
"tel": "423-0231",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.237095,
"lng": -62.674421
},
{
"proveedor": "LISI SANITARIOS",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Pueyrredón 720",
"tel": "432-9227",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.78113,
"lng": -65.405937
},
{
"proveedor": "LOS ESPECIALISTAS",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "San Luis 1501",
"tel": "431-3965",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796514,
"lng": -65.424208
},
{
"proveedor": "LOZANO ARIDOS",
"provincia": "Salta",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "Zuviria 2370",
"tel": "439-3786",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.765995,
"lng": -65.407267
},
{
"proveedor": "LUXEM",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Belgrano 1795",
"tel": "421-1605",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.786202,
"lng": -65.427202
},
{
"proveedor": "LUXEN CONSTRUCCIONES",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Belgrano 1795",
"tel": "422-7009",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.786202,
"lng": -65.427202
},
{
"proveedor": "M Y G",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Av. Chile 1640",
"tel": "423-8625",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "M&T",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "San Martín 1314",
"tel": "421-0984",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792758,
"lng": -65.421291
},
{
"proveedor": "M-ELECTRICIDAD",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Chile 1449",
"tel": "423-1751",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "MADEKA SRL",
"provincia": "Salta",
"rubros": [
"CARPINTERIA DE OBRA",
"MADERAS - CARPINTERÍAS - ASERRADEROS",
"PARQUETS- PISOS FLOTANTES",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Olavarría 146",
"tel": "431-3548",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.790172,
"lng": -65.431962
},
{
"proveedor": "MADEO LUIS DANIEL",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Alvarado 81",
"tel": "421-8509",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.79167,
"lng": -65.402565
},
{
"proveedor": "MADERAS EL MENSU II",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Av. Artigas 50",
"tel": "428-1868",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809333,
"lng": -65.384165
},
{
"proveedor": "MADERERA OTTO",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Av. Artigas 70",
"tel": "428-2137",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809333,
"lng": -65.384165
},
{
"proveedor": "MAESTRO",
"provincia": "Salta",
"rubros": [
"HERRAJES"
],
"direccion": "Av. San Martín 2091",
"tel": "431-7353",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.792217,
"lng": -65.431846
},
{
"proveedor": "MAFE ELECTROMECANICA",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "B. Mitre 1898",
"tel": "439-4622",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.982627,
"lng": -65.583965
},
{
"proveedor": "MAJA DISEÑO",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Pueyrredón 1126",
"tel": "422-8782",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.776069,
"lng": -65.405428
},
{
"proveedor": "MANUEL ALVARADO",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA METÁLICA"
],
"direccion": "Av. Independencia 710",
"tel": "423-1805",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808253,
"lng": -65.406705
},
{
"proveedor": "MARIO BANCHIK Y CIA",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Libertad 343",
"tel": "423-0898",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.005647,
"lng": -63.208154
},
{
"proveedor": "MARMOLERÍA PSENDA",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Av. Chile 1665",
"tel": "423-1523",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.817848,
"lng": -65.424809
},
{
"proveedor": "MARTEL",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "La Rioja 969",
"tel": "423-2566",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798294,
"lng": -65.416915
},
{
"proveedor": "MARTÍN",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Jujuy 636",
"tel": "422-4205",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797279,
"lng": -65.417399
},
{
"proveedor": "MAS AISLACIÓN",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"IMPERMEABILIZACIONES"
],
"direccion": "Lerma 754",
"tel": "421-3995",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.799767,
"lng": -65.407802
},
{
"proveedor": "MAT-FER",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "Urquiza 1341",
"tel": "422-5457",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791626,
"lng": -65.421498
},
{
"proveedor": "MAT-FER",
"provincia": "Salta",
"rubros": [
"CORTINAS - PERSIANAS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Urquiza 1730",
"tel": "421-4639",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791129,
"lng": -65.426885
},
{
"proveedor": "MAT-FER",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"HERRAJES",
"HIERROS"
],
"direccion": "Urquiza 1275",
"tel": "422-5457",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791693,
"lng": -65.420511
},
{
"proveedor": "MEMBRANAS SALTA",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Urquiza 1111",
"tel": "421-1169",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791861,
"lng": -65.418445
},
{
"proveedor": "MEMBRANOR",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Lerma 918",
"tel": "423-2027",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80187,
"lng": -65.407909
},
{
"proveedor": "METALÚRGICA SER-MAN",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "Los Lanceros 1480",
"tel": "423-0054",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809173,
"lng": -65.417031
},
{
"proveedor": "MOLINS",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Córdoba 275",
"tel": "431-1085",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.793473,
"lng": -65.408556
},
{
"proveedor": "MORIZZIO",
"provincia": "Salta",
"rubros": [
"ALARMAS"
],
"direccion": "Catamarca 147",
"tel": "421-3170",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.79198,
"lng": -65.405707
},
{
"proveedor": "MORIZZIO",
"provincia": "Salta",
"rubros": [
"PORTONES AUTOMÁTICOS",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Mendoza 480",
"tel": "421-5494",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.794116,
"lng": -65.419189
},
{
"proveedor": "MORIZZIO AUTO-RADIO",
"provincia": "Salta",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN"
],
"direccion": "Mendoza 480",
"tel": "421-5494",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.794116,
"lng": -65.419189
},
{
"proveedor": "MUEBLES ALGARROBO",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. San Martín 967",
"tel": "422-1777",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.793233,
"lng": -65.41637
},
{
"proveedor": "MURATORE",
"provincia": "Salta",
"rubros": [
"HIERROS"
],
"direccion": "Alvarado 1491",
"tel": "422-1596",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.790337,
"lng": -65.421875
},
{
"proveedor": "NICFUN",
"provincia": "Salta",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Alvarado 504",
"tel": "421-0470",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791248,
"lng": -65.408552
},
{
"proveedor": "NOROESTE CONSTRUCCIONES",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "20 de Febrero 393",
"tel": "422-7878",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.784948,
"lng": -65.413317
},
{
"proveedor": "NORTE",
"provincia": "Salta",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Ameghino 577",
"tel": "422-5809",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.777466,
"lng": -65.409441
},
{
"proveedor": "OBINSE SRL",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Av. Independencia 1149",
"tel": "401-1100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808058,
"lng": -65.400834
},
{
"proveedor": "OFFICE",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Jujuy 40",
"tel": "421-7924",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789916,
"lng": -65.416555
},
{
"proveedor": "OIEL",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Coronel Suárez 271",
"tel": "431-0996",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785075,
"lng": -65.431574
},
{
"proveedor": "OSVALDO LEON",
"provincia": "Salta",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Mendoza 979",
"tel": "431-4531",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.794405,
"lng": -65.416625
},
{
"proveedor": "P&C GRAPHIC",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Caseros 1203",
"tel": "421-8007",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789276,
"lng": -65.419396
},
{
"proveedor": "PARTENÓN",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "D. Leguizamón 832",
"tel": "426-0576",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.788543,
"lng": -65.457702
},
{
"proveedor": "PETTINAROLI METALÚRGICA",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA",
"HIERROS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Pedernera 223",
"tel": "421-9426",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.785606,
"lng": -65.43019
},
{
"proveedor": "PINTURERÍA SILVA",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Las Acacias 32",
"tel": "439-5602",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.768122,
"lng": -65.401798
},
{
"proveedor": "PINTURERÍA ZELAYA",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Jujuy 958",
"tel": "423-9537",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.800421,
"lng": -65.417625
},
{
"proveedor": "PIRÁMIDES",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"PINTURERÍAS"
],
"direccion": "Entre Ríos 1401",
"tel": "422-3648",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.780571,
"lng": -65.421358
},
{
"proveedor": "PIXEL",
"provincia": "Salta",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Pellegrini 915",
"tel": "422-7956",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.668234,
"lng": -65.039977
},
{
"proveedor": "PLACACENTRO",
"provincia": "Salta",
"rubros": [
"ABERTURAS"
],
"direccion": "J.M. Leguizamón 950",
"tel": "431-1608",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.67161,
"lng": -65.057578
},
{
"proveedor": "PLACACENTRO",
"provincia": "Salta",
"rubros": [
"CONSTRUCCIÓN EN SECO",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "J. M. Leguizamón 950",
"tel": "431-1608",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.664751,
"lng": -65.060332
},
{
"proveedor": "PLANTA ING. MOYANO",
"provincia": "Salta",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "Los Tucanes 1825",
"tel": "434-2139",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.810007,
"lng": -65.444787
},
{
"proveedor": "PLATINUM",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Jujuy 232",
"tel": "431-6591",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792337,
"lng": -65.416827
},
{
"proveedor": "PREMAR S.A.",
"provincia": "Salta",
"rubros": [
"PREMOLDEADOS"
],
"direccion": "Paraguay 1450",
"tel": "423-1297",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.734319,
"lng": -65.481657
},
{
"proveedor": "PRESISSO",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Leguizamón 1496",
"tel": "421-3748",
"whatsapp": "",
"mail": "saltapresisso@gmail.com",
"web": "",
"lat": -24.78283,
"lng": -65.422748
},
{
"proveedor": "PRO-MET",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"CAÑOS Y ACCESORIOS",
"CARPINTERÍA METÁLICA",
"CHAPAS",
"FERRETERÍAS - BULONERÍAS",
"HIERROS",
"IMPERMEABILIZACIONES"
],
"direccion": "Av. Chile 1680",
"tel": "423-4050",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809059,
"lng": -65.418729
},
{
"proveedor": "PÉTREOS",
"provincia": "Salta",
"rubros": [
"LAJAS",
"MARMOLERÍAS",
"PILETAS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "San Juan 785",
"tel": "422-1935",
"whatsapp": "",
"mail": "ventas@petreos.com.ar",
"web": "",
"lat": -24.795914,
"lng": -65.414105
},
{
"proveedor": "QUE COLOR",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Zuviría 1465",
"tel": "439-4747",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.771706,
"lng": -65.407914
},
{
"proveedor": "RAMON RUSSO",
"provincia": "Salta",
"rubros": [
"BOMBAS PARA AGUA"
],
"direccion": "Catamarca 155",
"tel": "431-4625",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792078,
"lng": -65.405713
},
{
"proveedor": "REDES",
"provincia": "Salta",
"rubros": [
"PVC"
],
"direccion": "Olavarría 104",
"tel": "421-8060",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.789717,
"lng": -65.431925
},
{
"proveedor": "REDES NORTE SRL",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Rivadavia 1319",
"tel": "422-8061",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.781878,
"lng": -65.42033
},
{
"proveedor": "REFRIGERACIÓN NORTE",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Pellegrini 550",
"tel": "431-9578",
"whatsapp": "",
"mail": "refrinorte@infovia.com.ar",
"web": "",
"lat": -24.796439,
"lng": -65.415873
},
{
"proveedor": "RESINA SAN LUIS",
"provincia": "Salta",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Islas Malvinas 220",
"tel": "431-8291",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792123,
"lng": -65.418332
},
{
"proveedor": "RESTON",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "M. Acevedo 188",
"tel": "423-6558",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.803492,
"lng": -65.40105
},
{
"proveedor": "RHOMANY",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Zuviría 1456",
"tel": "422-7221",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.771811,
"lng": -65.40782
},
{
"proveedor": "RICARDO J. JUAREZ",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Rivadavia 796",
"tel": "421-5829",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.512987,
"lng": -63.806537
},
{
"proveedor": "RIS",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CALDERAS - CALEFACCIÓN"
],
"direccion": "San Luis 89",
"tel": "432-1014",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.79798,
"lng": -65.404323
},
{
"proveedor": "ROMA",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Zabala 599",
"tel": "423-5832",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.802512,
"lng": -65.412077
},
{
"proveedor": "SALTAPOR",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS"
],
"direccion": "J.M. Leguizamón 1946",
"tel": "422-5501",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.67161,
"lng": -65.057578
},
{
"proveedor": "SALTAPOR",
"provincia": "Salta",
"rubros": [
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO"
],
"direccion": "J. M. Leguizamón 1946",
"tel": "431-1088",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.664751,
"lng": -65.060332
},
{
"proveedor": "SAN JAVIER",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS"
],
"direccion": "Leguizamón 1817",
"tel": "431-1496",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.782693,
"lng": -65.427366
},
{
"proveedor": "SAN JORGE",
"provincia": "Salta",
"rubros": [
"ABERTURAS",
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Córdoba 933",
"tel": "423-1642",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.801893,
"lng": -65.409234
},
{
"proveedor": "SAN JORGE",
"provincia": "Salta",
"rubros": [
"PINTURERÍAS"
],
"direccion": "General Güemes",
"tel": "(0387) 491-2626",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.807674,
"lng": -64.916738
},
{
"proveedor": "SAN JOSÉ",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "San Martín 806",
"tel": "431-3486",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -22.515764,
"lng": -63.798503
},
{
"proveedor": "SAN JUAN ELECTRICIDAD",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "San Juan 502",
"tel": "421-2855",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796152,
"lng": -65.410323
},
{
"proveedor": "SAN PATRICIO",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Juan 151",
"tel": "431-4920",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796697,
"lng": -65.405335
},
{
"proveedor": "SANITARIOS SALTA",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Ituzaingó 158",
"tel": "422-0243",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791577,
"lng": -65.413992
},
{
"proveedor": "SANITEC",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Olavarría 246",
"tel": "431-5600",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791432,
"lng": -65.432066
},
{
"proveedor": "SANSONE MATERIALES",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"CAÑOS Y ACCESORIOS",
"CONSTRUCCIÓN EN SECO",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Virrey Toledo 753",
"tel": "431-5063",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.89791,
"lng": -65.668255
},
{
"proveedor": "SANSONE MATERIALES",
"provincia": "Salta",
"rubros": [
"PVC"
],
"direccion": "Av. Virrey Toledo 754",
"tel": "431-5063",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.89791,
"lng": -65.668255
},
{
"proveedor": "SANSONE y JC FERNANDEZ",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Mariano Benítez 647",
"tel": "439-3561",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.759637,
"lng": -65.408748
},
{
"proveedor": "SANTA FE",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Lavalle 1171",
"tel": "423-0125",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.237095,
"lng": -62.674421
},
{
"proveedor": "SANTA LUCILDA",
"provincia": "Salta",
"rubros": [
"VIVEROS"
],
"direccion": "Av. Chile 1596",
"tel": "426-0815",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80511,
"lng": -65.417031
},
{
"proveedor": "SANTA RITA",
"provincia": "Salta",
"rubros": [
"MADERAS - CARPINTERÍAS - ASERRADEROS"
],
"direccion": "Pueyrredón 2923",
"tel": "439-5287",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.78275,
"lng": -65.406281
},
{
"proveedor": "SERVIOBRAS",
"provincia": "Salta",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Pedernera 1350",
"tel": "421-0730",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.771711,
"lng": -65.428582
},
{
"proveedor": "SETYE CLIMATIZACIONES",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Balcarce 1276",
"tel": "431-3940",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.773905,
"lng": -65.410754
},
{
"proveedor": "SILVA",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Las Acacias 32",
"tel": "439-5602",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.768122,
"lng": -65.401798
},
{
"proveedor": "SISTEM LOCK",
"provincia": "Salta",
"rubros": [
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "San Luis 650",
"tel": "421-7269",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.796676,
"lng": -65.419459
},
{
"proveedor": "SISTEMA DE SEGURIDAD SRL",
"provincia": "Salta",
"rubros": [
"TELEFONÍA- EQUIPOS - INSTALACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Urquiza 1402",
"tel": "431-3914",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.791436,
"lng": -65.422411
},
{
"proveedor": "SOLA GUILLERMO",
"provincia": "Salta",
"rubros": [
"HORMIGÓN ELABORADO"
],
"direccion": "Martínez Saravia 1810",
"tel": "426-1699",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -25.081875,
"lng": -65.484382
},
{
"proveedor": "SOMECO",
"provincia": "Salta",
"rubros": [
"CONSTRUCCIÓN EN SECO",
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Gral. Güemes 561",
"tel": "155-501022",
"whatsapp": "",
"mail": "contacto@consultorasomeco.com",
"web": "www.consultorasomeco.com",
"lat": -22.516379,
"lng": -63.80781
},
{
"proveedor": "SOTO",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Rondeau 1395",
"tel": "423-2634",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.790486,
"lng": -64.964718
},
{
"proveedor": "SU BULONERA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Independencia 792",
"tel": "427-2349",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.808261,
"lng": -65.40571
},
{
"proveedor": "SUPERBRICO",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Mendoza 937",
"tel": "422-3697",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.794451,
"lng": -65.416111
},
{
"proveedor": "SUPERMAT",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"CAÑOS Y ACCESORIOS",
"CHAPAS",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN",
"PISOS Y REVESTIMIENTOS",
"PVC",
"SANITARIOS"
],
"direccion": "C. Pellegrini 445",
"tel": "421-6000",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.987481,
"lng": -65.579303
},
{
"proveedor": "SUPERMERCADO SINGH",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "El Galpón",
"tel": "(03876) 49-1131",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.380663,
"lng": -64.651595
},
{
"proveedor": "TAPICERIA NADAL",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Chacabuco 313",
"tel": "432-0430",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792746,
"lng": -65.426479
},
{
"proveedor": "TECNO CLIMA",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Buenos Aires 737",
"tel": "423-0864",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.799257,
"lng": -65.410432
},
{
"proveedor": "TECNOFER",
"provincia": "Salta",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Necochea 226",
"tel": "422-2446",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.778371,
"lng": -65.413774
},
{
"proveedor": "TELAS Y COSAS",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Balcarce 495",
"tel": "431-9034",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.783762,
"lng": -65.411884
},
{
"proveedor": "TELEFONIA SAF",
"provincia": "Salta",
"rubros": [
"ALARMAS",
"TELEFONÍA- EQUIPOS - INSTALACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Entre Ríos 1679",
"tel": "422-2878",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.780313,
"lng": -65.42509
},
{
"proveedor": "TEPKO",
"provincia": "Salta",
"rubros": [
"IMPERMEABILIZACIONES"
],
"direccion": "Av. Güemes 1032",
"tel": "422-3744",
"whatsapp": "",
"mail": "info@tepko.com.ar",
"web": "",
"lat": -23.239338,
"lng": -64.283305
},
{
"proveedor": "TERRANOVA MUEBLES & DISEÑOS",
"provincia": "Salta",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "B. Mitre 946",
"tel": "421-0764",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.982627,
"lng": -65.583965
},
{
"proveedor": "TODO ALAMBRE",
"provincia": "Salta",
"rubros": [
"ALAMBRES"
],
"direccion": "Jujuy 599",
"tel": "431-1111",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.79681,
"lng": -65.41717
},
{
"proveedor": "TODO CAÑOS",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"PVC"
],
"direccion": "Olavarría 155",
"tel": "421-7969",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797558,
"lng": -65.432426
},
{
"proveedor": "TODO CAÑOS MELGAR",
"provincia": "Salta",
"rubros": [
"SANITARIOS"
],
"direccion": "Olavarría 155",
"tel": "421-7969",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.797558,
"lng": -65.432426
},
{
"proveedor": "TODO CIELORRASO",
"provincia": "Salta",
"rubros": [
"CIELORRASOS"
],
"direccion": "Av. San Martín 1625",
"tel": "431-6324",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792637,
"lng": -65.425551
},
{
"proveedor": "TODO GAS",
"provincia": "Salta",
"rubros": [
"GAS",
"SANITARIOS"
],
"direccion": "Av. San Martín 822",
"tel": "421-4047",
"whatsapp": "-",
"mail": "-",
"web": "-",
"lat": -24.793147,
"lng": -65.414416
},
{
"proveedor": "TODO LAJAS Y PISCINAS",
"provincia": "Salta",
"rubros": [
"LAJAS",
"PILETAS"
],
"direccion": "Av. Paraguay 2300",
"tel": "427-1451",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.809596,
"lng": -65.421512
},
{
"proveedor": "TODO TELGOPOR",
"provincia": "Salta",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CIELORRASOS"
],
"direccion": "San Juan 918",
"tel": "421-3985",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.795655,
"lng": -65.416036
},
{
"proveedor": "TORRES VIDRIOS",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "Santiago del Estero 677",
"tel": "431-3997",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.78498,
"lng": -65.411579
},
{
"proveedor": "TORRES VÍDRIOS",
"provincia": "Salta",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Santiago. del Estero 677",
"tel": "431-3997",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.78498,
"lng": -65.411579
},
{
"proveedor": "TOSONI",
"provincia": "Salta",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Co. Egues 478 (Orán)",
"tel": "(03878) 421-449",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -23.135622,
"lng": -64.307576
},
{
"proveedor": "TUBO PLAST",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"PVC",
"SANITARIOS"
],
"direccion": "Catamarca 903",
"tel": "423-0024",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.801863,
"lng": -65.406387
},
{
"proveedor": "TUBONOR",
"provincia": "Salta",
"rubros": [
"ADHESIVOS",
"CAÑOS Y ACCESORIOS",
"PVC"
],
"direccion": "Av. Tavella 2750",
"tel": "423-4021",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.828592,
"lng": -65.428421
},
{
"proveedor": "TUBOS SALTA",
"provincia": "Salta",
"rubros": [
"CAÑOS Y ACCESORIOS",
"PVC"
],
"direccion": "25 de Mayo 791",
"tel": "421-5632",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.730818,
"lng": -65.483991
},
{
"proveedor": "URQUIZA MUEBLES",
"provincia": "Salta",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Urquiza 581",
"tel": "421-6059",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.792416,
"lng": -65.410964
},
{
"proveedor": "VALDEZ",
"provincia": "Salta",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "Jujuy 881",
"tel": "426-2590",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.795642,
"lng": -65.417133
},
{
"proveedor": "VALDEZ VICENTE",
"provincia": "Salta",
"rubros": [
"CARPINTERÍA METÁLICA"
],
"direccion": "Córdoba 1128",
"tel": "423-6135",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.804336,
"lng": -65.409565
},
{
"proveedor": "VALE EDUARDO",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Catamarca 1193",
"tel": "423-4516",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.80534,
"lng": -65.406634
},
{
"proveedor": "VELEZ LA BULONERA",
"provincia": "Salta",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini 691",
"tel": "431-1399",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.798121,
"lng": -65.415916
},
{
"proveedor": "VICTORIO BINDA",
"provincia": "Salta",
"rubros": [
"AIRE ACONDICIONADO",
"CALDERAS - CALEFACCIÓN",
"CAÑOS Y ACCESORIOS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "España 63",
"tel": "431-0777",
"whatsapp": "",
"mail": "victoriobinda@arnetbiz.com.ar",
"web": "",
"lat": -24.789145,
"lng": -65.403588
},
{
"proveedor": "VIDRIERIA SAN MARTÍN",
"provincia": "Salta",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Av. San Martín 2047",
"tel": "431-6310",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.79225,
"lng": -65.431335
},
{
"proveedor": "VIOBAL",
"provincia": "Salta",
"rubros": [
"ASCENSORES"
],
"direccion": "Florida 1073",
"tel": "423-5883",
"whatsapp": "",
"mail": "viobal@arnet.com.ar",
"web": "",
"lat": -22.806342,
"lng": -63.613191
},
{
"proveedor": "WALTER JARDINERÍA",
"provincia": "Salta",
"rubros": [
"VIVEROS"
],
"direccion": "Los Mandarinos 54",
"tel": "439-9389",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.767352,
"lng": -65.392908
},
{
"proveedor": "ZANNIER HNOS",
"provincia": "Salta",
"rubros": [
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Belgrano 1955",
"tel": "154-027960",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.786043,
"lng": -65.429528
},
{
"proveedor": "ZENAVILLAS CERÁMICAS",
"provincia": "Salta",
"rubros": [
"CERÁMICOS"
],
"direccion": "Mariano Moreno 2131",
"tel": "434-1092",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -24.733568,
"lng": -65.494014
},
{
"proveedor": "ABBONDANDOLO ROQUE H.",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Edison 40 Bº Cabildo",
"tel": "431-0703",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.808907,
"lng": -64.241056
},
{
"proveedor": "ABERTURAS",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "Av. Belgrano (S) 4071",
"tel": "431-6290",
"whatsapp": "",
"mail": "jorgearesta@arnetbiz.com.ar",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "AC",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "La Plata 497",
"tel": "422-0783",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.781149,
"lng": -64.263259
},
{
"proveedor": "AC COMPONENTES",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "La Plata 497",
"tel": "422-0783",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.781149,
"lng": -64.263259
},
{
"proveedor": "AILLU DISTRIBUCIONES",
"provincia": "Santiago del Estero",
"rubros": [
"INFORMÁTICA - COMPUTACIÓN"
],
"direccion": "Av. Moreno (S) 1267",
"tel": "155005926",
"whatsapp": "",
"mail": "aillu@hotmail.com",
"web": "",
"lat": -27.817337,
"lng": -64.249613
},
{
"proveedor": "ALPA S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Aguirre (S) 2498",
"tel": "431-7924",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "ALU-CON S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Congreso 651",
"tel": "421-9613",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796673,
"lng": -64.265517
},
{
"proveedor": "ALUM CONS S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS"
],
"direccion": "Congreso 651",
"tel": "421-9613",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796673,
"lng": -64.265517
},
{
"proveedor": "ALUM-CONS",
"provincia": "Santiago del Estero",
"rubros": [
"ALUMINIO"
],
"direccion": "Congreso 661",
"tel": "421-9613",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796726,
"lng": -64.265599
},
{
"proveedor": "ALVAREZ RAMON CARPINTERIA DE OBRA",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"CARPINTERÍAS"
],
"direccion": "Viamonte 85",
"tel": "156096300",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.801012,
"lng": -64.253752
},
{
"proveedor": "ANIBAL DUMIT",
"provincia": "Santiago del Estero",
"rubros": [
"CARTELERÍA - LETREROS",
"LETRROS - PLANOS"
],
"direccion": "San Martín 668",
"tel": "422-9907",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79518,
"lng": -64.267068
},
{
"proveedor": "ARTE MUEBLES BARBAGLIA",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "24 de Septiembre 886",
"tel": "585-1092",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.794072,
"lng": -64.254779
},
{
"proveedor": "ASHPAY",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Independencia 672",
"tel": "421-6945",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79316,
"lng": -64.253596
},
{
"proveedor": "BAHÍA",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "H. Yrigoyen 828",
"tel": "421-6249",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.777481,
"lng": -64.268306
},
{
"proveedor": "BAILON Y ASOC. S.R.L",
"provincia": "Santiago del Estero",
"rubros": [
"CAMARAS DE SEGURIDAD",
"EMPRESAS CONSTRUCTORAS",
"HIGIENE Y SEGURIDAD",
"MÁQUINAS PARA LA CONSTRUCCIÓN"
],
"direccion": "Taboada 460",
"tel": "425-9510",
"whatsapp": "",
"mail": "info@bailonyasociados.com.ar",
"web": "",
"lat": -27.773809,
"lng": -64.267524
},
{
"proveedor": "BAJO CERO",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Viamonte 224",
"tel": "422-6538",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.802133,
"lng": -64.25543
},
{
"proveedor": "BECCARIA JOSE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Congreso 1202",
"tel": "424-1868",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799982,
"lng": -64.271149
},
{
"proveedor": "BECCARIA JUAN",
"provincia": "Santiago del Estero",
"rubros": [
"ÁRIDOS- CANTERAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Congreso 1203",
"tel": "421-4358",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799898,
"lng": -64.271222
},
{
"proveedor": "BERRA REPARACIONES",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Av. Alsina (O) 718",
"tel": "421-8136",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.787658,
"lng": -64.242694
},
{
"proveedor": "BILBAO MADERAS",
"provincia": "Santiago del Estero",
"rubros": [
"MADERAS",
"PISOS DE MADERA"
],
"direccion": "Formosa 637",
"tel": "422-2394",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786164,
"lng": -64.276046
},
{
"proveedor": "BLANGINO",
"provincia": "Santiago del Estero",
"rubros": [
"MOSAICOS"
],
"direccion": "Av. Moreno Sur 937",
"tel": "421-7398",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795221,
"lng": -64.260179
},
{
"proveedor": "BOGLIONE CENTRO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"GAS"
],
"direccion": "A del Valle 172 (La Banda)",
"tel": "427-8665",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.727312,
"lng": -64.229571
},
{
"proveedor": "BOLLINI",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Urquiza 502",
"tel": "421-4128",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.787442,
"lng": -64.253916
},
{
"proveedor": "BONACINA",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Independencia 954",
"tel": "422-8876",
"whatsapp": "",
"mail": "bonacinapinturerias.com.ar",
"web": "www.bonacinapinturerias.com.ar",
"lat": -27.796502,
"lng": -64.250558
},
{
"proveedor": "BP",
"provincia": "Santiago del Estero",
"rubros": [
"ALUMBRADO PUBLICO",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Av. Libertad 1840",
"tel": "439-2299",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796376,
"lng": -64.274498
},
{
"proveedor": "BUSPER",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Saenz Peña 71",
"tel": "422-5276",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.637537,
"lng": -65.136872
},
{
"proveedor": "CABILDO",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Juncal 613",
"tel": "431-4069",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.807788,
"lng": -64.24309
},
{
"proveedor": "CALIDO REGALOS",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Avellaneda 15",
"tel": "422-9728",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.788924,
"lng": -64.260505
},
{
"proveedor": "CAMILO ZAIEK",
"provincia": "Santiago del Estero",
"rubros": [
"MADERAS"
],
"direccion": "Formosa 25",
"tel": "421-8101",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782179,
"lng": -64.268801
},
{
"proveedor": "CAR VER",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "25 de Mayo 177",
"tel": "(03844) 42-1930",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786855,
"lng": -64.255833
},
{
"proveedor": "CAR VER",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "25 de Mayo 177 (S)",
"tel": "(03844) 42-1930",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.413401,
"lng": -63.066702
},
{
"proveedor": "CARPINTERIA DE ALUMINIO",
"provincia": "Santiago del Estero",
"rubros": [
"ALUMINIO",
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Av. Belgrano Sur 4071",
"tel": "431-6290",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.78526,
"lng": -64.265279
},
{
"proveedor": "CARPINTERIA SPITALE HNOS",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Peralta Luna 715",
"tel": "431-0727",
"whatsapp": "",
"mail": "vicentespitale@hotmail.com",
"web": "",
"lat": -27.821259,
"lng": -64.267571
},
{
"proveedor": "CASA EL CRISTAL",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Alsina (O) 646",
"tel": "421-3705",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796763,
"lng": -64.257747
},
{
"proveedor": "CASA GIL",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "A. Alvarez 397, B°Belgrano",
"tel": "421-0604",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.804034,
"lng": -64.248648
},
{
"proveedor": "CASA GIL",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "A. Alvarez 397 B°Belgrano",
"tel": "421-0604",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.803343,
"lng": -64.246985
},
{
"proveedor": "CASA LIVA",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Lavalle 66 (La Banda)",
"tel": "427-0035",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.738684,
"lng": -64.242099
},
{
"proveedor": "CASA LIVA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"IMPERMEABILIZACIÓN"
],
"direccion": "Lavalle 66 (La Banda)",
"tel": "427-0035",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.738684,
"lng": -64.242099
},
{
"proveedor": "CASA MAINO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"IMPERMEABILIZACIÓN",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Colón (S) 47",
"tel": "422-2618",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "CASO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "San Martín 477",
"tel": "421-5760",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79345,
"lng": -64.264988
},
{
"proveedor": "CEA BAÑOS",
"provincia": "Santiago del Estero",
"rubros": [
"SANITARIOS"
],
"direccion": "La Plata 233",
"tel": "424-1720",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.783742,
"lng": -64.260869
},
{
"proveedor": "CESCA HNOS.",
"provincia": "Santiago del Estero",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "H. Irigoyen 663",
"tel": "421-3263",
"whatsapp": "",
"mail": "marmoleriacesca@arnetbiz.com.ar",
"web": "",
"lat": -25.806411,
"lng": -62.835093
},
{
"proveedor": "CHAZARRETA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Lavalle 185",
"tel": "422-9965",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.802622,
"lng": -64.254451
},
{
"proveedor": "CIELORRASOS DEL NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CONSTRUCCIÓN EN SECO",
"IMPERMEABILIZACIÓN",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS"
],
"direccion": "Yrigoyen 828",
"tel": "3855250079 / 3855007122",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.778518,
"lng": -64.267425
},
{
"proveedor": "CIVIAL SRL",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Solís Este 405",
"tel": "431-7972",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.817492,
"lng": -64.242379
},
{
"proveedor": "CM LAS MALVINAS",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS",
"CARPINTERÍAS",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Tucumán 278",
"tel": "421-9223",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.784013,
"lng": -64.262345
},
{
"proveedor": "COLORSHOP",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Mitre y Belgrano",
"tel": "422-6266",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.886188,
"lng": -62.263988
},
{
"proveedor": "COMERCIAL RUIZ",
"provincia": "Santiago del Estero",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "Tucumán 39 - Of. 11",
"tel": "422-5103",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786657,
"lng": -64.259694
},
{
"proveedor": "COMINTEL S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Juana Manuela Gorriti 158",
"tel": "422-7420",
"whatsapp": "",
"mail": "contacto@comintel.com.ar",
"web": "",
"lat": -27.781537,
"lng": -64.257544
},
{
"proveedor": "CONORVIAL S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Aguirre (S) 2221",
"tel": "439-3401",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "CONSTRUIR S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS"
],
"direccion": "Av. Libertad 2797",
"tel": "439-0326",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796788,
"lng": -64.275367
},
{
"proveedor": "CONSTRUIR S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Libertad 2759",
"tel": "439-0326",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796787,
"lng": -64.275366
},
{
"proveedor": "COPISTERIA SIGMA",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Independencia 348",
"tel": "421-8477",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.790072,
"lng": -64.256523
},
{
"proveedor": "CORRALÓN A.NI.CAR",
"provincia": "Santiago del Estero",
"rubros": [
"IMPERMEABILIZACIÓN",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Mitre 465 (La Banda)",
"tel": "427-0029",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.734754,
"lng": -64.250899
},
{
"proveedor": "CORRALÓN ACONQUIJA",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"CARPINTERÍAS",
"CONSTRUCCIÓN EN SECO",
"DECORACIÓN Y EQUIPAMIENTO",
"FERRETERÍAS - BULONERÍAS",
"MADERAS",
"MATERIALES DE CONSTRUCCIÓN",
"PISOS DE MADERA",
"REVESTIMIENTOS"
],
"direccion": "Libertad 2644",
"tel": "439-2451",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.08129,
"lng": -63.073025
},
{
"proveedor": "CORRALÓN AGUIRRE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre (S) 1648",
"tel": "422-7376",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "CORRALÓN BRIZ",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "Av. Belgrano (S) 4912",
"tel": "431-3993",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "CORRALÓN BRIZ",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Independencia 3125",
"tel": "431-3326",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.816774,
"lng": -64.225323
},
{
"proveedor": "CORRALÓN CENTRO",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Mitre s/n (Bandera)",
"tel": "03857-421457",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.886188,
"lng": -62.263988
},
{
"proveedor": "CORRALÓN CHEIN",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "San Martín C. Dora",
"tel": "48-1100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.603895,
"lng": -62.951477
},
{
"proveedor": "CORRALÓN COMERCIAL COLÓN",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Colón Sur 2344",
"tel": "431-2889",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.834871,
"lng": -64.253623
},
{
"proveedor": "CORRALÓN CONSTRUCTOR",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre (S) 2346",
"tel": "431-6515",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "CORRALÓN COPETTI",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Maipú 706",
"tel": "422-4645",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786904,
"lng": -64.273727
},
{
"proveedor": "CORRALÓN DEAN FUNES",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Deán Funes 309 (La Banda)",
"tel": "427-7821",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.74423,
"lng": -64.235539
},
{
"proveedor": "CORRALÓN DON ALFREDO",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Alsina 717",
"tel": "421-2829",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79738,
"lng": -64.258709
},
{
"proveedor": "CORRALÓN EL AMIGO",
"provincia": "Santiago del Estero",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Belgrano (N) 956",
"tel": "450-4450",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.750409,
"lng": -64.265761
},
{
"proveedor": "CORRALÓN EL CRUCE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Belgrano 1997 (La Banda)",
"tel": "437-2908",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.74739,
"lng": -64.262169
},
{
"proveedor": "CORRALÓN FLOR DE VALENCIA",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "San Martín 198 (I. Forres)",
"tel": "490-2026",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.874008,
"lng": -63.982338
},
{
"proveedor": "CORRALÓN FLOR DE VALENCIA",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "San Martín 198(I. Forres)",
"tel": "490-2026",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.874008,
"lng": -63.982338
},
{
"proveedor": "CORRALÓN GÓMEZ ABRAM",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "B Mitre 266",
"tel": "427-2736",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.789787,
"lng": -64.254749
},
{
"proveedor": "CORRALÓN JG",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre (S) 622",
"tel": "424-1296",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "CORRALÓN JS",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Dorrego 1710(La Banda)",
"tel": "427-1100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.722075,
"lng": -64.222594
},
{
"proveedor": "CORRALÓN LOS DOS HERMANOS",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. San Martín 261",
"tel": "(0385) 490-3249",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.924338,
"lng": -63.895376
},
{
"proveedor": "CORRALÓN MARTINEZ",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Alsina (O) 1377",
"tel": "422-0551",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.802883,
"lng": -64.266705
},
{
"proveedor": "CORRALÓN MATÍAS",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Gottau 150",
"tel": "(03844) 42-2135",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.462329,
"lng": -62.838387
},
{
"proveedor": "CORRALÓN MUKDISE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "25 de Mayo 76",
"tel": "(03858) 42-1660",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786027,
"lng": -64.256871
},
{
"proveedor": "CORRALÓN NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Pellegrini S/N",
"tel": "(03857) 42-1010",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785368,
"lng": -64.259289
},
{
"proveedor": "CORRALÓN NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Pellegrini S/N Bandera",
"tel": "(03857) 42-1010",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.883161,
"lng": -62.265348
},
{
"proveedor": "CORRALÓN SAN JORGE",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS",
"ELECTRICIDAD MATERIALES",
"FERRETERÍAS - BULONERÍAS",
"GAS"
],
"direccion": "A. del Valle 1074",
"tel": "427-2894",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.513824,
"lng": -64.857283
},
{
"proveedor": "CORRALÓN SAN MARTIN",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Rivadavia 399 (Frías)",
"tel": "(03854) 42-1061",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.632776,
"lng": -65.128417
},
{
"proveedor": "CORRALÓN SAN ROQUE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Solís (O) 1171",
"tel": "431-3717",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.815548,
"lng": -64.235457
},
{
"proveedor": "CRISAR S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"EXCAVACIONES - MOVIMIENTO DE SUELOS"
],
"direccion": "Av. Belgrano S/N",
"tel": "434-0036",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.74118,
"lng": -64.253027
},
{
"proveedor": "D+B arquitectos",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "W Estrecho de le Maire 147",
"tel": "385 699 5093",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.80645,
"lng": -64.246898
},
{
"proveedor": "DEFFIS VICTOR",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "P. León Gallo 1695",
"tel": "424-0533",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.807061,
"lng": -64.285447
},
{
"proveedor": "DEL TEJAR S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Mitre 525",
"tel": "421-8279",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.788512,
"lng": -64.25255
},
{
"proveedor": "DEL VALLE",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "H Yrigoyen 1009",
"tel": "421-2477",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.880594,
"lng": -62.264682
},
{
"proveedor": "DELTA MUEBLES",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Av. Rivadavia (O) 245",
"tel": "421-4540",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.791513,
"lng": -64.275181
},
{
"proveedor": "DIGITRONIC",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Rivadavia 266",
"tel": "(03854)42-1674",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.729557,
"lng": -64.239147
},
{
"proveedor": "DILUX ELECTRICIDAD",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Aguirre (S) 984",
"tel": "424-1278",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "DISA SA",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Catamarca 264",
"tel": "424-0526",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.791748,
"lng": -64.253422
},
{
"proveedor": "DISEÑO Y CONSTRUCCIÓN",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Libertad 299",
"tel": "421-2500",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.925403,
"lng": -63.89564
},
{
"proveedor": "DISTRIBUIDORA SUDAMERICANA",
"provincia": "Santiago del Estero",
"rubros": [
"CERÁMICOS",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN",
"SANITARIOS"
],
"direccion": "Independencia 1730",
"tel": "422-9779",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.716733,
"lng": -64.241659
},
{
"proveedor": "DOMUS S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Balcarce 68",
"tel": "422-1454",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.80014,
"lng": -64.251614
},
{
"proveedor": "DRAGMA SANTIAGO",
"provincia": "Santiago del Estero",
"rubros": [
"MATAFUEGOS"
],
"direccion": "H. Irigoyen 713",
"tel": "422-1819",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.806411,
"lng": -62.835093
},
{
"proveedor": "D´ANGELO Y CIA. S.C.",
"provincia": "Santiago del Estero",
"rubros": [
"ESTRUCTURAS METÁLICAS"
],
"direccion": "Av. Aguirre (S) 1899",
"tel": "385 402 9476",
"whatsapp": "",
"mail": "dangeloycia@hotmail.com",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "D’ANGELO Y CIA.",
"provincia": "Santiago del Estero",
"rubros": [
"ASCENSORES",
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Av. Aguirre (S) 1899",
"tel": "439-0098",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "EDESE",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Roca Sur 214",
"tel": "450-5555",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.780479,
"lng": -64.259798
},
{
"proveedor": "EDISON ELECTRICIDAD",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "La Plata 331",
"tel": "422-3674",
"whatsapp": "",
"mail": "edisonelectricidad@argentina.com",
"web": "",
"lat": -27.782707,
"lng": -64.261822
},
{
"proveedor": "EL CONSTRUCTOR",
"provincia": "Santiago del Estero",
"rubros": [
"BULONERÍAS",
"IMPERMEABILIZACIÓN",
"MÁQUINAS PARA LA CONSTRUCCIÓN"
],
"direccion": "Aristobulo del Valle 905",
"tel": "427-0007",
"whatsapp": "",
"mail": "elconstructor@arnet.com.ar",
"web": "",
"lat": -27.727312,
"lng": -64.229571
},
{
"proveedor": "EL CRISTAL",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "A. del Valle 157",
"tel": "427-1050",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.513824,
"lng": -64.857283
},
{
"proveedor": "EL FARAON",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "M. Belgrano 445",
"tel": "(03857) 48-1035",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.800785,
"lng": -64.249711
},
{
"proveedor": "EL GALPON CONSTRUCCIONES",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Garibaldi 190",
"tel": "421-4533",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.791289,
"lng": -64.262309
},
{
"proveedor": "EL GRINGO",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Av. Aguirre 1153",
"tel": "439-4394",
"whatsapp": "",
"mail": "info@elgringoferreteria.com.ar",
"web": "",
"lat": -27.820039,
"lng": -64.258518
},
{
"proveedor": "EL GRINGO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Aguirre (s) 1153",
"tel": "439-4394",
"whatsapp": "",
"mail": "info@elgringoferreteria.com.ar",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "EL MEDITERRANEO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"PINTURERÍAS"
],
"direccion": "Pellegrini 280",
"tel": "421-1592",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785501,
"lng": -64.259609
},
{
"proveedor": "EL MIRASOL",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "G. Saavedra 745",
"tel": "422-4556",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795905,
"lng": -64.246119
},
{
"proveedor": "EL NENE",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"PINTURERÍAS"
],
"direccion": "Güemes 597",
"tel": "422-6068",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.690392,
"lng": -64.042288
},
{
"proveedor": "El PINTAO",
"provincia": "Santiago del Estero",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CONSTRUCCIÓN EN SECO",
"REVESTIMIENTOS"
],
"direccion": "Av. Aguirre Sur 35",
"tel": "439-0770",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.797818,
"lng": -64.276115
},
{
"proveedor": "EL PINTAO",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Belgrano (S) 2788",
"tel": "431-9060",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "EL PROFESIONAL",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av Aguirre 703",
"tel": "439-3968",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.803736,
"lng": -64.271712
},
{
"proveedor": "EL SATÉLITE",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Lorenzo 135",
"tel": "(03854) 42-1342",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.630876,
"lng": -65.132132
},
{
"proveedor": "ELECAD",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Buenos Aires 396",
"tel": "422-9782",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.789566,
"lng": -64.254812
},
{
"proveedor": "ELECTRICIDAD LUNA",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Belgrano (S) 2900",
"tel": "431-4991",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "ELECTRICIDAD LUNA SUD",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Moreno (S) 1347",
"tel": "421-1196",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.793655,
"lng": -64.261556
},
{
"proveedor": "ELECTRICIDAD NOVALUX",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Rivadavia (N) 272 (La Banda)",
"tel": "427-1054",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.728955,
"lng": -64.239683
},
{
"proveedor": "ELECTRO NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "A. Del Valle 305 (La Banda)",
"tel": "427-1580",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.727312,
"lng": -64.229571
},
{
"proveedor": "ELECTRO SHOP",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "España 62 (La Banda)",
"tel": "427-3440",
"whatsapp": "",
"mail": "ventas@electroshoponline.com.ar",
"web": "",
"lat": -27.724781,
"lng": -64.232083
},
{
"proveedor": "ELECTROCENTRO S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Moreno (S) 914",
"tel": "421-5226",
"whatsapp": "",
"mail": "electrocentrosrl@arnetbiz.com.ar",
"web": "",
"lat": -27.793655,
"lng": -64.261556
},
{
"proveedor": "ELECTROCLIMA",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Antenor Álvarez 326",
"tel": "434-4528",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.779907,
"lng": -64.279994
},
{
"proveedor": "ELECTROFER",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"FERRETERÍAS - BULONERÍAS",
"SANITARIOS"
],
"direccion": "H Yrigoyen 633",
"tel": "421-1685",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.777481,
"lng": -64.268306
},
{
"proveedor": "ELECTROMOTOR",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA",
"ELECTRICIDAD MATERIALES"
],
"direccion": "Av. Belgrano (N) 1578",
"tel": "434-0024",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.74118,
"lng": -64.253027
},
{
"proveedor": "ELECTRONICA PS",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Avellaneda 44 (La Banda)",
"tel": "385 597 9963",
"whatsapp": "",
"mail": "info@pselectronica.com.ar",
"web": "www.pseletronica.com.ar",
"lat": -27.734479,
"lng": -64.23927
},
{
"proveedor": "ELECTRONICA ROCA",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "La Plata 350",
"tel": "429-9528",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782632,
"lng": -64.262003
},
{
"proveedor": "ELECTROTECNICA ALIEND",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA"
],
"direccion": "Av. Roca Sur 1107",
"tel": "422-9628",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.789664,
"lng": -64.252081
},
{
"proveedor": "ELITE",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Avellaneda 508",
"tel": "422-7005",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785542,
"lng": -64.255586
},
{
"proveedor": "EMI",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"CAÑOS Y ACCESORIOS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"CARPINTERÍAS",
"CHAPAS",
"CONSTRUCCIÓN EN SECO",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"HIERROS",
"IMPERMEABILIZACIÓN",
"LADRILLOS",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Libertad 2716",
"tel": "439-2848",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.08129,
"lng": -63.073025
},
{
"proveedor": "EMPRECONS S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "San Lorenzo 3533",
"tel": "431-0214",
"whatsapp": "",
"mail": "emprecons@hotmail.com",
"web": "",
"lat": -27.914648,
"lng": -64.482679
},
{
"proveedor": "EMPRESA MONTI",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Jujuy 444",
"tel": "421-5905",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.78209,
"lng": -64.26012
},
{
"proveedor": "ESTABLECIMIENTO DON ALFREDO",
"provincia": "Santiago del Estero",
"rubros": [
"SANITARIOS"
],
"direccion": "Alsina (O) 717",
"tel": "421-2829",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79738,
"lng": -64.258709
},
{
"proveedor": "ESTUDIO A",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Libertad 202",
"tel": "421-2499",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.925815,
"lng": -63.89709
},
{
"proveedor": "EVINCO",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Entre Ríos 580",
"tel": "422-8987",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.794485,
"lng": -64.258141
},
{
"proveedor": "FAR JOR",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"PINTURERÍAS",
"REVESTIMIENTOS"
],
"direccion": "Independencia 435",
"tel": "422-4626",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.79101,
"lng": -64.255772
},
{
"proveedor": "FEL ROS",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Absalón Rojas 621",
"tel": "421-4341",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.780953,
"lng": -64.266039
},
{
"proveedor": "FEL-ROS",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "A. Rojas 621",
"tel": "421-4341",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.826586,
"lng": -64.242984
},
{
"proveedor": "FERRETERIA COMERCIAL COLÓN",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"HORMIGÓN ELABORADO"
],
"direccion": "Av. Colón 1031",
"tel": "421-7267",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.798607,
"lng": -64.263851
},
{
"proveedor": "FERRETERIA EL PROFESIONAL",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre 703",
"tel": "439-3968",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.803736,
"lng": -64.271712
},
{
"proveedor": "FERRETERIA FAILLA",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Posadas (O) 296",
"tel": "422-5800",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.82226,
"lng": -64.276618
},
{
"proveedor": "FERRETERIA OVEJERO",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "España 108 (La Banda)",
"tel": "427-5697",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.721746,
"lng": -64.227045
},
{
"proveedor": "FERRETERIAS DEL NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"BULONERÍAS"
],
"direccion": "Av Saenz Peña 96",
"tel": "421-6067",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795236,
"lng": -64.277499
},
{
"proveedor": "FORTALEZA",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Av. Roca (S) 104",
"tel": "421-7733",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.477191,
"lng": -64.864278
},
{
"proveedor": "FRIO CONFORT",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO",
"INSTALACIONES ELÉCTRICAS"
],
"direccion": "Av. Belgrano (N) 1745",
"tel": "434-3667",
"whatsapp": "",
"mail": "edmundoagorosito@hotmail.com",
"web": "",
"lat": -27.74118,
"lng": -64.253027
},
{
"proveedor": "GEMA DISEÑOS",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS",
"MARMOLERÍAS",
"PILETAS"
],
"direccion": "Av. Belgrano (S) 1038",
"tel": "424-1642",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "GMKT",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA",
"CALDERAS - CALEFACCIÓN",
"CAÑOS Y ACCESORIOS",
"ENERGÍA SOLAR",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PVC",
"SANITARIOS"
],
"direccion": "Av. Moreno Sur 953",
"tel": "417-1152",
"whatsapp": "",
"mail": "info@gmkt.com.ar",
"web": "",
"lat": -27.795324,
"lng": -64.260082
},
{
"proveedor": "GOITEA FÉLIX",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Quintana 530 (La Banda)",
"tel": "427-1362",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.739563,
"lng": -64.239175
},
{
"proveedor": "GONZALEZ GAS",
"provincia": "Santiago del Estero",
"rubros": [
"SANITARIOS"
],
"direccion": "Av. Aguirre (S) 1553",
"tel": "439-1588",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "GONZALEZ HNOS",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"ELECTRICIDAD MATERIALES",
"GAS",
"SANITARIOS"
],
"direccion": "H. Yrigoyen 633",
"tel": "421-1685",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.777481,
"lng": -64.268306
},
{
"proveedor": "GRUPO A2",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. Belgrano Sur 941",
"tel": "54 9 385 595-4301",
"whatsapp": "",
"mail": "",
"web": "https://grupoa2.com/",
"lat": -27.79353,
"lng": -64.257254
},
{
"proveedor": "HD EQUIPAMIENTOS",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. Belgrano Sur 43",
"tel": "421-0450",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785075,
"lng": -64.26557
},
{
"proveedor": "HIERRO CONS S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Solís (O) 320",
"tel": "431-2181",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.815548,
"lng": -64.235457
},
{
"proveedor": "HIPERPLACA",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"MADERAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre Sur 1079",
"tel": "385-3231010",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.805211,
"lng": -64.270328
},
{
"proveedor": "HORMITEC",
"provincia": "Santiago del Estero",
"rubros": [
"HORMIGÓN ELABORADO"
],
"direccion": "Av. Aguirre (S) 2221",
"tel": "428-1479",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "HUGOR MATAFUEGOS",
"provincia": "Santiago del Estero",
"rubros": [
"MATAFUEGOS"
],
"direccion": "Rivadavia (N) 54 (La Banda)",
"tel": "427-2010",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.728955,
"lng": -64.239683
},
{
"proveedor": "IBARRA LETREROS",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Necochea 820",
"tel": "(0385) 427-6648",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.803123,
"lng": -64.240565
},
{
"proveedor": "IESS TELEFONIA Y ALARMAS",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Sarmiento 455",
"tel": "431-8362",
"whatsapp": "",
"mail": "lesserviciosintegrales@gmail.com",
"web": "",
"lat": -29.503851,
"lng": -63.695124
},
{
"proveedor": "IMPRENTA IMAGEN",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Av. Avellaneda 250",
"tel": "421-7361",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.830489,
"lng": -64.06118
},
{
"proveedor": "IMPRENTA KONTINUOS",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Av. Colón Sur 659",
"tel": "421-3302",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795125,
"lng": -64.26583
},
{
"proveedor": "ING. ELIAS MAUD",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Aguirre (S) 2325",
"tel": "422-4891",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "ING. PRIVITERA",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Pedro León Gallo 886",
"tel": "422-8179",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.797613,
"lng": -64.268771
},
{
"proveedor": "INGECON SRL",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"HORMIGÓN ELABORADO",
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS"
],
"direccion": "Av. Colón Sur 1031",
"tel": "421-9001",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.798607,
"lng": -64.263851
},
{
"proveedor": "INGELECTRIC ARGENTINA",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Mitre 233",
"tel": "421-2261",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.790367,
"lng": -64.255568
},
{
"proveedor": "INGENIERIA DEL NOA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Libertad 1892",
"tel": "439-5388",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796699,
"lng": -64.275017
},
{
"proveedor": "INGENIERIA Y ARQUITECTURA SA",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Aguirre (S) 2877",
"tel": "431-7028",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "INSTALAR",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS",
"GAS",
"SANITARIOS"
],
"direccion": "Av. Aguirre 2855",
"tel": "383 516 0198 / 431 5449",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796905,
"lng": -64.276682
},
{
"proveedor": "INTEGRAF",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "La Plata 333",
"tel": "424-0009",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782693,
"lng": -64.261836
},
{
"proveedor": "INTILUX",
"provincia": "Santiago del Estero",
"rubros": [
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Posadas (E) 45",
"tel": "421-3840",
"whatsapp": "",
"mail": "santiagodelestero@dled.com.ar",
"web": "",
"lat": -27.82226,
"lng": -64.276618
},
{
"proveedor": "JENSEN MARIA FLORENCIA",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "9 de Julio 227",
"tel": "421-1254",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.788431,
"lng": -64.257524
},
{
"proveedor": "JM ELECTRICIDAD",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Tucumán 233",
"tel": "422-7572",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.784349,
"lng": -64.261822
},
{
"proveedor": "JOERLIVA",
"provincia": "Santiago del Estero",
"rubros": [
"CONSTRUCCIÓN EN SECO",
"FERRETERÍAS - BULONERÍAS",
"GAS",
"SANITARIOS"
],
"direccion": "Rodolfo Filas 670 Bº Cabildo",
"tel": "431-3576",
"whatsapp": "",
"mail": "joerliva2000@yahoo.com.ar",
"web": "",
"lat": -27.809769,
"lng": -64.240186
},
{
"proveedor": "JULIO Y GUIDO CHAVEZ SA",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "25 de Mayo S/N",
"tel": "(03846)49-1027",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.596146,
"lng": -64.666797
},
{
"proveedor": "LA ARGENTINA SANITARIOS",
"provincia": "Santiago del Estero",
"rubros": [
"SANITARIOS"
],
"direccion": "Güemes 1170",
"tel": "422-3288",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.791958,
"lng": -64.274195
},
{
"proveedor": "LA CASA DEL INSTALADOR",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Alvear 137",
"tel": "(03844) 42-3671",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782649,
"lng": -64.265466
},
{
"proveedor": "LA CASA DEL PVC",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS",
"HORMIGÓN PREMOLDEADO",
"SANITARIOS",
"TANQUES (FÁBRICA)"
],
"direccion": "Av. Colón (N) 22",
"tel": "422-2391",
"whatsapp": "385 6882000",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "LA TORRE",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Perú 1019",
"tel": "421-7650",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.775637,
"lng": -64.266875
},
{
"proveedor": "LATCH",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "La Plata 51",
"tel": "422-9673",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785721,
"lng": -64.258936
},
{
"proveedor": "LINEA BLANCA",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Av. Hipólito Irigoyen 872",
"tel": "421-3494",
"whatsapp": "",
"mail": "lineablancasrl@lineablancasrl.com.ar",
"web": "",
"lat": -28.680723,
"lng": -62.884851
},
{
"proveedor": "LINEAS ELECTRICAS S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES"
],
"direccion": "Salta 78",
"tel": "421-5600",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785541,
"lng": -64.262793
},
{
"proveedor": "LO BRUNO S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"BULONERÍAS"
],
"direccion": "Av. Roque Sáenz Peña 1305",
"tel": "427-8558",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.792857,
"lng": -64.271325
},
{
"proveedor": "LO BRUNO S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "Av. Saenz Peña 1305",
"tel": "439-0475",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.793308,
"lng": -64.269819
},
{
"proveedor": "LO BRUNO S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Aguirre (N) 191",
"tel": "439-0475",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.820039,
"lng": -64.258518
},
{
"proveedor": "LOBRUNO S.A.",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA"
],
"direccion": "Av. Saenz Peña 1305",
"tel": "439-0475",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.793308,
"lng": -64.269819
},
{
"proveedor": "LOGROS",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS",
"DECORACIÓN Y EQUIPAMIENTO",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Avellaneda 252",
"tel": "421-0150",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.787385,
"lng": -64.258204
},
{
"proveedor": "LOS CUATRO VIENTOS",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av Belgrano 1895 (La Banda)",
"tel": "437-0123",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.74739,
"lng": -64.262169
},
{
"proveedor": "LUCRECIA GRÁFICA INTEGRAL",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Belgrano Sur 1919",
"tel": "421-9724",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.801566,
"lng": -64.251858
},
{
"proveedor": "MANZUR",
"provincia": "Santiago del Estero",
"rubros": [
"BULONERÍAS"
],
"direccion": "H. Yrigoyen 956",
"tel": "424-0637",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.769696,
"lng": -64.272288
},
{
"proveedor": "MAQUINAS Y MOTORES",
"provincia": "Santiago del Estero",
"rubros": [
"MÁQUINAS PARA LA CONSTRUCCIÓN"
],
"direccion": "Absalón Rojas 717",
"tel": "421-9621",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.779946,
"lng": -64.266945
},
{
"proveedor": "MAQUINAS Y MOTORES S.C.",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA"
],
"direccion": "Absalón Rojas 717",
"tel": "421-9621",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.779946,
"lng": -64.266945
},
{
"proveedor": "MARIANO BERNABÉ",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av San Martín 348",
"tel": "(0385) 427-0116",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.924701,
"lng": -63.894295
},
{
"proveedor": "MARIO CESCA",
"provincia": "Santiago del Estero",
"rubros": [
"MOSAICOS"
],
"direccion": "P. Industrial (La Banda)",
"tel": "437-0042",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.75683,
"lng": -64.254781
},
{
"proveedor": "MATAFUEGOS GÜEMES",
"provincia": "Santiago del Estero",
"rubros": [
"MATAFUEGOS"
],
"direccion": "Av. Moreno Norte 224",
"tel": "439-0175",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782933,
"lng": -64.271525
},
{
"proveedor": "MATAFUEGOS ROJO",
"provincia": "Santiago del Estero",
"rubros": [
"MATAFUEGOS"
],
"direccion": "Moreno (S) 150",
"tel": "424-0030",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.849074,
"lng": -62.077313
},
{
"proveedor": "MATERIALES NOROESTE",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS"
],
"direccion": "Av. Roca (S) 326",
"tel": "422-1519",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.477191,
"lng": -64.864278
},
{
"proveedor": "MATERIALES NOROESTE",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Roca Sur 326",
"tel": "422-1519",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782,
"lng": -64.259082
},
{
"proveedor": "MATERIALES NOROESTE",
"provincia": "Santiago del Estero",
"rubros": [
"REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Roca 326",
"tel": "422-1519",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782,
"lng": -64.259082
},
{
"proveedor": "MAURICIO VIDRIOS",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Belgrano 3118",
"tel": "431-8573",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.750409,
"lng": -64.265761
},
{
"proveedor": "MBM S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"BULONERÍAS"
],
"direccion": "Av. S. Martín 348 (La Banda)",
"tel": "427-0116",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.733955,
"lng": -64.235266
},
{
"proveedor": "MEDIAVILLA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "RN34 S/N",
"tel": "423-7139",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -29.764926,
"lng": -62.045088
},
{
"proveedor": "MELSAN",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Libertad 2302",
"tel": "439-0336",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.08129,
"lng": -63.073025
},
{
"proveedor": "MERCOMAT",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"SANITARIOS"
],
"direccion": "Av. Belgrano (N) 1179",
"tel": "437-0440",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.888719,
"lng": -62.269079
},
{
"proveedor": "MERCOMAT",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Belgrano(N) 1179",
"tel": "437-0440",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -28.888719,
"lng": -62.269079
},
{
"proveedor": "METALÚRGICA DORREGO",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "A. del Valle 1853",
"tel": "427-1121",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.513824,
"lng": -64.857283
},
{
"proveedor": "MISHIMA",
"provincia": "Santiago del Estero",
"rubros": [
"ADITIVOS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CERÁMICOS",
"CONSTRUCCIÓN EN SECO",
"FERRETERÍAS - BULONERÍAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Alsina (O) 1468",
"tel": "422-1550",
"whatsapp": "3855 71-5555/3853 19-7777",
"mail": "",
"web": "",
"lat": -27.803576,
"lng": -64.267718
},
{
"proveedor": "MISHIMA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"IMPERMEABILIZACIÓN",
"PINTURERÍAS"
],
"direccion": "Av. Alsina (O) 1468",
"tel": "422-1550",
"whatsapp": "3855 71-5555/3853 19-7777",
"mail": "",
"web": "",
"lat": -27.803576,
"lng": -64.267718
},
{
"proveedor": "MISIONES",
"provincia": "Santiago del Estero",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CARPINTERÍAS",
"FERRETERÍAS - BULONERÍAS",
"IMPERMEABILIZACIÓN"
],
"direccion": "Av. Aguirre (S) 558",
"tel": "421-2367",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "MISIONES MADERAS",
"provincia": "Santiago del Estero",
"rubros": [
"MADERAS"
],
"direccion": "Av. Aguirre (S) 558",
"tel": "421-2367",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "MISSIO DANILO",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍA METÁLICA - METALÚRGICAS"
],
"direccion": "Absalon Rojas 658",
"tel": "421-7390",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.78082,
"lng": -64.2666
},
{
"proveedor": "MISSIO DANILO",
"provincia": "Santiago del Estero",
"rubros": [
"HERRERÍAS"
],
"direccion": "A. Rojas 658",
"tel": "421-7390",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.826586,
"lng": -64.242984
},
{
"proveedor": "MONITOR",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "H. Yrigoyen 440",
"tel": "422-5505",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.769696,
"lng": -64.272288
},
{
"proveedor": "MONITOR LA BANDA",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Yrigoyen Norte 195",
"tel": "427-8333",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -29.378342,
"lng": -63.474636
},
{
"proveedor": "MUCON CONSTRUCTORA",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Rivadavia 632",
"tel": "(03843) 42-1615",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.784997,
"lng": -64.266259
},
{
"proveedor": "MUEBLERÍA TAIN",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Libertad 1676",
"tel": "439-0447",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795357,
"lng": -64.272859
},
{
"proveedor": "MUKDISE",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Sáenz Peña 603",
"tel": "421-3533",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795236,
"lng": -64.277499
},
{
"proveedor": "MÁRMOLERIA PEREYRA",
"provincia": "Santiago del Estero",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Lamadrid 2244",
"tel": "439-3777",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.816174,
"lng": -64.274315
},
{
"proveedor": "MÁRMOLERIA ROMANO",
"provincia": "Santiago del Estero",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Antenor Alvarez 1503",
"tel": "434-0218",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.772411,
"lng": -64.285579
},
{
"proveedor": "NIETO HNOS",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Solís 970",
"tel": "431-5066",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836923,
"lng": -64.277895
},
{
"proveedor": "NOVA INFORMÁTICA",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. Belgrano Sur 476",
"tel": "0810-555-6682",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.788764,
"lng": -64.260937
},
{
"proveedor": "PAULA DIBU",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Thomas Edison 455",
"tel": "431-0531",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.808907,
"lng": -64.241056
},
{
"proveedor": "PAVAN Y MOSCA S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"BOMBAS PARA AGUA",
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "La Plata 116/18",
"tel": "422-4057",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.780962,
"lng": -64.263487
},
{
"proveedor": "PAZ HECTOR",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Belgrano (S) 270",
"tel": "421-5522",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.735653,
"lng": -64.243637
},
{
"proveedor": "PINTURERIA BAHÍA",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "H Yrigoyen 828",
"tel": "421-6249",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.777481,
"lng": -64.268306
},
{
"proveedor": "PINTURERIAS DEL CENTRO",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Belgrano 331",
"tel": "421-3583",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.787744,
"lng": -64.262419
},
{
"proveedor": "PRESISSO",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Belgrano Sur 873",
"tel": "424-0880",
"whatsapp": "",
"mail": "spacios@presisso.com.ar",
"web": "",
"lat": -27.792693,
"lng": -64.257693
},
{
"proveedor": "PS ELECTRONICA",
"provincia": "Santiago del Estero",
"rubros": [
"INFORMÁTICA - COMPUTACIÓN"
],
"direccion": "Avellaneda 44 (La Banda)",
"tel": "385 597 9963",
"whatsapp": "",
"mail": "info@pselectronica.com.ar",
"web": "",
"lat": -27.734479,
"lng": -64.23927
},
{
"proveedor": "PVC LIBERTAD",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS",
"SANITARIOS"
],
"direccion": "Libertad 1905",
"tel": "439-0464",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796761,
"lng": -64.275324
},
{
"proveedor": "RD MATERIALES",
"provincia": "Santiago del Estero",
"rubros": [
"ELECTRICIDAD MATERIALES",
"FERRETERÍAS - BULONERÍAS",
"PINTURERÍAS",
"SANITARIOS"
],
"direccion": "Independencia 985",
"tel": "421-9890",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796845,
"lng": -64.25036
},
{
"proveedor": "REFRIGERACIÓN DIAZ",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Libertad 2228",
"tel": "439-3999",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.08129,
"lng": -63.073025
},
{
"proveedor": "REFRIGERACIÓN NORTE",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Alvarado 302",
"tel": "422-5196",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.787364,
"lng": -64.267587
},
{
"proveedor": "REFRIGERACIÓN RIVADAVIA",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Av. Rivadavia 902",
"tel": "421-9707",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786557,
"lng": -64.268337
},
{
"proveedor": "RIZOLO HNOS.",
"provincia": "Santiago del Estero",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Aguirre (S) 106",
"tel": "421-8645",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -25.808304,
"lng": -62.830764
},
{
"proveedor": "RUIZ JOSE D.",
"provincia": "Santiago del Estero",
"rubros": [
"HERRERÍAS"
],
"direccion": "Av. Colón (N) 598",
"tel": "421-8208",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "SABA SRL",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Yrigoyen (N) 214",
"tel": "437-0618",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.777481,
"lng": -64.268306
},
{
"proveedor": "SADOC",
"provincia": "Santiago del Estero",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Libertad 264/68",
"tel": "421-5987",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.08129,
"lng": -63.073025
},
{
"proveedor": "SALTO PEDRO F.",
"provincia": "Santiago del Estero",
"rubros": [
"LADRILLOS"
],
"direccion": "Suárez 794",
"tel": "431-4987",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.770705,
"lng": -64.288091
},
{
"proveedor": "SALVADOR SCROSOPPI",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Entre Ríos 540",
"tel": "422-2250/422-7346",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.794106,
"lng": -64.258329
},
{
"proveedor": "SANTIAGO ABERTURAS",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS"
],
"direccion": "Av. Belgrano 1465",
"tel": "421-5064",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.798818,
"lng": -64.253917
},
{
"proveedor": "SANTIAGO ABERTURAS",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Av.Belgrano 1465",
"tel": "421-5064",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.750409,
"lng": -64.265761
},
{
"proveedor": "SANTIAGO ALAMBRES S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Colón 342",
"tel": "421-2241",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "SANTIAGO ALAMBRES S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "Av. Colón (S) 342",
"tel": "421-2241",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "SANTIAGO ILUMINACIÓN",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"ELECTRICIDAD MATERIALES",
"ILUMINACIÓN Y MATERIALES ELÉCTRICOS"
],
"direccion": "Mendoza 75",
"tel": "422-0514",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.792644,
"lng": -64.256583
},
{
"proveedor": "SANTIAGO MADERAS",
"provincia": "Santiago del Estero",
"rubros": [
"MADERAS"
],
"direccion": "Av. Belgrano (S) 2988",
"tel": "431-2459",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "SANTIAGO PINTURERIAS",
"provincia": "Santiago del Estero",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Colón (S) 657",
"tel": "421-8080",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "SCROSSOPI SALVADOR SRL",
"provincia": "Santiago del Estero",
"rubros": [
"IMPERMEABILIZACIÓN"
],
"direccion": "Entre Ríos 540",
"tel": "422-2250",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.794106,
"lng": -64.258329
},
{
"proveedor": "SEGUNDO BOLZON S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Sarmiento 551 Bº Congreso",
"tel": "421-6131",
"whatsapp": "",
"mail": "segundobolzonsrl@gmail.com",
"web": "",
"lat": -27.793042,
"lng": -64.266751
},
{
"proveedor": "SEGURIDAD ELECTRÓNICA",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Misiones 472",
"tel": "424-0760",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.785268,
"lng": -64.268221
},
{
"proveedor": "SEÑALARTE S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"LETRROS - PLANOS"
],
"direccion": "Avellaneda 315",
"tel": "422-6761",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.786979,
"lng": -64.257441
},
{
"proveedor": "SIMA S.R.L.",
"provincia": "Santiago del Estero",
"rubros": [
"ASCENSORES"
],
"direccion": "Viamonte 146",
"tel": "156-884980",
"whatsapp": "",
"mail": "ascensores@yahoo.com.ar",
"web": "",
"lat": -27.801598,
"lng": -64.254508
},
{
"proveedor": "SPAZIO (CORTINAS Y TOLDOS)",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Catamarca 230",
"tel": "385 411 1937",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.792084,
"lng": -64.25387
},
{
"proveedor": "SUPERMAT",
"provincia": "Santiago del Estero",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Belgrano (S) 858",
"tel": "450-4456",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "SUPERMAT S.A.C.I.F.I.A.",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "Av. Belgrano (S) 858",
"tel": "450-4456",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "SUPERMAT S.A.C.I.F.I.A.",
"provincia": "Santiago del Estero",
"rubros": [
"HIERROS"
],
"direccion": "Av. Belgrano (N) 956",
"tel": "450-4458",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.750409,
"lng": -64.265761
},
{
"proveedor": "SUPERMERCADO YAGUE",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Av. Belgrano (S) 802",
"tel": "421-1269",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "TECNO FRIO",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Uriarte 16",
"tel": "421-2629",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.736633,
"lng": -64.245874
},
{
"proveedor": "TOBA",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"DECORACIÓN Y EQUIPAMIENTO",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS",
"SANITARIOS"
],
"direccion": "Av. Aguirre (S) 2906",
"tel": "431-7929",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.799433,
"lng": -64.274865
},
{
"proveedor": "TOBA",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"DECORACIÓN Y EQUIPAMIENTO",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS"
],
"direccion": "Av. Rivadavia 148 (O)",
"tel": "422-3532",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.781236,
"lng": -64.260976
},
{
"proveedor": "TOBA",
"provincia": "Santiago del Estero",
"rubros": [
"ABERTURAS",
"CARPINTERÍA METÁLICA - METALÚRGICAS",
"DECORACIÓN Y EQUIPAMIENTO",
"MATERIALES DE CONSTRUCCIÓN",
"REVESTIMIENTOS"
],
"direccion": "España 564 (La Banda)",
"tel": "427-2937",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.721746,
"lng": -64.227045
},
{
"proveedor": "TOBA CERAMICOS",
"provincia": "Santiago del Estero",
"rubros": [
"CERÁMICOS"
],
"direccion": "Av. Belgrano (S) 765",
"tel": "422-3532",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.836346,
"lng": -64.244644
},
{
"proveedor": "TODO CONSTRUCCIÓN",
"provincia": "Santiago del Estero",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Monteagudo 271 (La Banda)",
"tel": "427-3321",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.73552,
"lng": -64.232338
},
{
"proveedor": "TODO FRÍO",
"provincia": "Santiago del Estero",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Leandro N. Alem 126",
"tel": "424-0577",
"whatsapp": "",
"mail": "todofrio@gmail.com",
"web": "",
"lat": -27.781078,
"lng": -64.267407
},
{
"proveedor": "TODO SANITARIO",
"provincia": "Santiago del Estero",
"rubros": [
"CAÑOS Y ACCESORIOS",
"SANITARIOS"
],
"direccion": "Av. Bolivia Sur 365",
"tel": "427-3653",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.73236,
"lng": -64.232602
},
{
"proveedor": "TODO VIDRIO",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Moreno (S) 176",
"tel": "421-8292",
"whatsapp": "",
"mail": "todoaluminio@hotmail.com",
"web": "",
"lat": -27.793655,
"lng": -64.261556
},
{
"proveedor": "TRILOX SA",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Colón 3550",
"tel": "431-8333",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.76651,
"lng": -64.282624
},
{
"proveedor": "TUFI",
"provincia": "Santiago del Estero",
"rubros": [
"FERRETERÍAS - BULONERÍAS"
],
"direccion": "Rivadavia 125 (La Banda)",
"tel": "427-0015",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.732406,
"lng": -64.236969
},
{
"proveedor": "ULLA HNOS. CARPINTERIA",
"provincia": "Santiago del Estero",
"rubros": [
"CARPINTERÍAS"
],
"direccion": "Lavalle 590 (La Banda)",
"tel": "427-1334",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.736212,
"lng": -64.237911
},
{
"proveedor": "URBANA CONST.",
"provincia": "Santiago del Estero",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Belgrano 2282",
"tel": "421-8623",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.750409,
"lng": -64.265761
},
{
"proveedor": "URBANO",
"provincia": "Santiago del Estero",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Avellaneda 42",
"tel": "421-7647",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.788725,
"lng": -64.260414
},
{
"proveedor": "VIDRIAR",
"provincia": "Santiago del Estero",
"rubros": [
"ALUMINIO",
"VIDRIERÍAS"
],
"direccion": "Independencia 954",
"tel": "422-5116",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.796502,
"lng": -64.250558
},
{
"proveedor": "VIDRIOS DEL CENTRO",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Belgrano Sur 843",
"tel": "422-9919",
"whatsapp": "",
"mail": "vidriosdelcentro@hotmail.com.ar",
"web": "",
"lat": -27.792373,
"lng": -64.257849
},
{
"proveedor": "VIDRIOS Y ALUMINIOS",
"provincia": "Santiago del Estero",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Belgrano Sur 4071",
"tel": "431-6290",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.78526,
"lng": -64.265279
},
{
"proveedor": "VIGIA",
"provincia": "Santiago del Estero",
"rubros": [
"ALARMAS"
],
"direccion": "Libertad 254",
"tel": "421-2488",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.926056,
"lng": -63.896657
},
{
"proveedor": "VIVERO EL PIMPOLL",
"provincia": "Santiago del Estero",
"rubros": [
"VIVEROS"
],
"direccion": "Ruta 51 (La Banda)",
"tel": "437-2511",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.721506,
"lng": -64.229695
},
{
"proveedor": "VIVERO EL SAUCE",
"provincia": "Santiago del Estero",
"rubros": [
"VIVEROS"
],
"direccion": "9 de Julio 30 (La Banda)",
"tel": "427-6603",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.73665,
"lng": -64.237037
},
{
"proveedor": "VIVERO JARDIN DEL CENTRO",
"provincia": "Santiago del Estero",
"rubros": [
"VIVEROS"
],
"direccion": "Absalón Rojas 258",
"tel": "421-9869",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.784736,
"lng": -64.262985
},
{
"proveedor": "VIVERO LA FLORESTA GARDENS",
"provincia": "Santiago del Estero",
"rubros": [
"VIVEROS"
],
"direccion": "Ruta 51 - Km 5",
"tel": "496-9330",
"whatsapp": "",
"mail": "viverolafloresta@hotmail.com",
"web": "",
"lat": -27.767229,
"lng": -64.244519
},
{
"proveedor": "VIVERO MUNDO VERDE",
"provincia": "Santiago del Estero",
"rubros": [
"VIVEROS"
],
"direccion": "San Martín 688",
"tel": "422-0367",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.795335,
"lng": -64.267279
},
{
"proveedor": "ZAIEK CAMILO",
"provincia": "Santiago del Estero",
"rubros": [
"MADERAS"
],
"direccion": "Formosa 25",
"tel": "421-8101",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.782179,
"lng": -64.268801
},
{
"proveedor": "A Medida Equipamiento",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTO",
"CARPINTERIA DE MADERA",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Cariola 190, Yerba Buena",
"tel": "3815396501",
"whatsapp": "3815396501",
"mail": "amedidaequipamiento@gmail.com",
"web": "www.amedidaequipamiento.com.ar",
"lat": -26.82023,
"lng": -65.269081
},
{
"proveedor": "ABALUM",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "Av. Siria 1637",
"tel": "427-6592",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.807438,
"lng": -65.204937
},
{
"proveedor": "ABERNOA",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS"
],
"direccion": "Marco Avellaneda 1195",
"tel": "432-0668",
"whatsapp": "",
"mail": "abernoa@hotmail.com",
"web": "",
"lat": -26.812515,
"lng": -65.210869
},
{
"proveedor": "AC CONTENEDORES",
"provincia": "Tucumán",
"rubros": [
"CONTENEDORES"
],
"direccion": "Junín 435",
"tel": "430-6161",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824163,
"lng": -65.207595
},
{
"proveedor": "ACEROS DEL NOA",
"provincia": "Tucumán",
"rubros": [
"CARTELERÍA - LETREROS",
"CHAPAS (CORTE Y PEGADO)",
"DECORACIÓN Y EQUIPAMIENTO",
"ESTRUCTURAS METÁLICAS",
"HIERROS",
"PERFILES DE ALUMINIO",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Las Piedras 2895",
"tel": "321400",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.827224,
"lng": -65.242128
},
{
"proveedor": "ACOTTO & ASOCIADOS",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "San Lorenzo 201",
"tel": "430-5459",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.834521,
"lng": -65.201018
},
{
"proveedor": "ADICEM",
"provincia": "Tucumán",
"rubros": [
"ADITIVOS",
"AISLACIONES HIDRÓFUGAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ASFALTOS",
"CONSTRUCCIÓN EN SECO",
"IMPERMEABILIZACIÓN EN CIMIENTOS",
"IMPERMEABILIZACIONES",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"POLIURETANO",
"PRODUCTOS QUÍMICOS PARA LA CONSTRUCCIÓN",
"REVESTIMIENTOS PLÁSTICOS",
"TRATAMIENTOS ANTICORROSIVOS"
],
"direccion": "Av. Belgrano 1858",
"tel": "423-9010",
"whatsapp": "",
"mail": "ventas@adicem.com.ar",
"web": "https://www.adicem.com.ar/",
"lat": -26.805996,
"lng": -65.265499
},
{
"proveedor": "ADICEM",
"provincia": "Tucumán",
"rubros": [
"ADITIVOS",
"AISLACIONES HIDRÓFUGAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ASFALTOS",
"CONSTRUCCIÓN EN SECO",
"IMPERMEABILIZACIÓN EN CIMIENTOS",
"IMPERMEABILIZACIONES",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"POLIURETANO",
"PRODUCTOS QUÍMICOS PARA LA CONSTRUCCIÓN",
"REVESTIMIENTOS PLÁSTICOS",
"TRATAMIENTOS ANTICORROSIVOS"
],
"direccion": "Av. Pte. Perón 188 (Y.B.)",
"tel": "435-3661",
"whatsapp": "",
"mail": "ventas@adicem.com.ar",
"web": "https://www.adicem.com.ar/",
"lat": -26.805996,
"lng": -65.265499
},
{
"proveedor": "AGORA S.R.L",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Manuel Alberti 735",
"tel": "423-0314",
"whatsapp": "",
"mail": "agorasrl@arnet.com.ar",
"web": "",
"lat": -26.817263,
"lng": -65.225487
},
{
"proveedor": "AIRTECNICA",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Jujuy 726",
"tel": "424-1121",
"whatsapp": "",
"mail": "airtecnica@uolsinectis.com.ar",
"web": "",
"lat": -26.839693,
"lng": -65.213269
},
{
"proveedor": "AISLAR - CENTRO PROTEX",
"provincia": "Tucumán",
"rubros": [
"ADITIVOS",
"AISLACIONES HIDRÓFUGAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS"
],
"direccion": "Av. América 286",
"tel": "435-1356",
"whatsapp": "",
"mail": "sergioaislar@gmail.com",
"web": "",
"lat": -26.816484,
"lng": -65.249907
},
{
"proveedor": "AISLAR - CENTRO PROTEX",
"provincia": "Tucumán",
"rubros": [
"IMPERMEABILIZACIÓN EN CIMIENTOS",
"IMPERMEABILIZACIONES",
"MICROCEMENTOS - PISOS INDUSTRIALES",
"PRODUCTOS QUÍMICOS PARA LA CONSTRUCCIÓN",
"REVESTIMIENTOS PLÁSTICOS"
],
"direccion": "Av Adolfo de la Vega 695",
"tel": "-",
"whatsapp": "3815102150",
"mail": "ventas1aislarnoa@gmail.com",
"web": "",
"lat": -26.823147,
"lng": -65.251665
},
{
"proveedor": "AISLAR NOA",
"provincia": "Tucumán",
"rubros": [
"ADHESIVOS"
],
"direccion": "Av. Adolfo de la Vega 695",
"tel": "",
"whatsapp": "3816293516",
"mail": "",
"web": "",
"lat": -26.830986,
"lng": -65.254005
},
{
"proveedor": "AISLAR NOA",
"provincia": "Tucumán",
"rubros": [
"ADITIVOS"
],
"direccion": "Av. Adolfo de la Vega 696",
"tel": "",
"whatsapp": "3816293516",
"mail": "",
"web": "",
"lat": -26.830986,
"lng": -65.254005
},
{
"proveedor": "AISLAR NOA",
"provincia": "Tucumán",
"rubros": [
"AISLACIONES HIDRÓFUGAS"
],
"direccion": "Av. Adolfo de la Vega 697",
"tel": "",
"whatsapp": "3816293516",
"mail": "",
"web": "",
"lat": -26.830986,
"lng": -65.254005
},
{
"proveedor": "AISLAR NOA",
"provincia": "Tucumán",
"rubros": [
"REVESTIMIENTOS"
],
"direccion": "Av. Adolfo de la Vega 698",
"tel": "",
"whatsapp": "3816293516",
"mail": "",
"web": "",
"lat": -26.830986,
"lng": -65.254005
},
{
"proveedor": "ALBIERO HNOS. SRL",
"provincia": "Tucumán",
"rubros": [
"ALARMAS",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Catamarca 479",
"tel": "430-5677",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.822907,
"lng": -65.210785
},
{
"proveedor": "ALEX DISTRIBUIDORA",
"provincia": "Tucumán",
"rubros": [
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"PINTURERÍAS"
],
"direccion": "Gral. Paz 1958",
"tel": "452-6132/33",
"whatsapp": "",
"mail": "distalexdelnoa@yahoo.com.ar",
"web": "",
"lat": -27.441786,
"lng": -65.624767
},
{
"proveedor": "ALFA EMPRESA CONSTRUCTORA S.R.L.",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"CONSULTORÍA PROFESIONAL",
"EMPRESAS CONSTRUCTORAS",
"ESTRUCTURAS METÁLICAS",
"EXCAVACIONES - MOVIMIENTO DE SUELOS"
],
"direccion": "Av. Mate de Luna 3737",
"tel": "435-3609",
"whatsapp": "",
"mail": "alfasrl@uolsinectis.com.ar",
"web": "",
"lat": -26.826338,
"lng": -65.226409
},
{
"proveedor": "ALPRE S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Paso de los Andes 2399",
"tel": "427-6572",
"whatsapp": "",
"mail": "alvareztuc@live.com.ar",
"web": "",
"lat": -26.817042,
"lng": -65.223647
},
{
"proveedor": "ALTAMIRANDA",
"provincia": "Tucumán",
"rubros": [
"PORTONES AUTOMÁTICOS"
],
"direccion": "Marina Alfaro 1502",
"tel": "429-3485",
"whatsapp": "",
"mail": "metalurgicaaltamiranda@hotmail.com",
"web": "",
"lat": -26.851948,
"lng": -65.202062
},
{
"proveedor": "ALTER",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "San Martín 1002",
"tel": "421-3572",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828259,
"lng": -65.212219
},
{
"proveedor": "ALUGLASS",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Maipú 1167",
"tel": "471-1495",
"whatsapp": "",
"mail": "vi.ar.tec@hotmail.com",
"web": "",
"lat": -26.814438,
"lng": -65.203847
},
{
"proveedor": "ALUMINA",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "San Lorenzo 1790",
"tel": "433-0213",
"whatsapp": "",
"mail": "aluminaca@gmail.com",
"web": "",
"lat": -26.829568,
"lng": -65.225195
},
{
"proveedor": "ALUMINIO 25 DE MAYO",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "Don Bosco 2334",
"tel": "427-5918",
"whatsapp": "",
"mail": "aluminio25m@arnet.com.ar",
"web": "",
"lat": -26.822231,
"lng": -65.225167
},
{
"proveedor": "ALUMINIO CENTER",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "Av. Siria 2447",
"tel": "423-1421",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.807435,
"lng": -65.205112
},
{
"proveedor": "ALUNORT SRL",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA",
"PERFILES DE ALUMINIO"
],
"direccion": "Amador Lucero 253",
"tel": "433-3868",
"whatsapp": "",
"mail": "info@alunort.com.ar",
"web": "",
"lat": -26.829187,
"lng": -65.23031
},
{
"proveedor": "ALUSOL",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA"
],
"direccion": "San Miguel 531",
"tel": "424-4258",
"whatsapp": "",
"mail": "ventas@alusol.com.ar",
"web": "",
"lat": -26.819531,
"lng": -65.222429
},
{
"proveedor": "ALVAREZ ALUMINIO",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS"
],
"direccion": "Sarmiento 63 (Concepción)",
"tel": "425-751",
"whatsapp": "",
"mail": "",
"web": "www.alvarezaluminios.com.ar",
"lat": -27.343612,
"lng": -65.585459
},
{
"proveedor": "ARBORIO HNOS.",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"CARPINTERÍA DE MADERA",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "C. Alvarez 1371",
"tel": "424-4026",
"whatsapp": "",
"mail": "arboriohermanos@arnet.com.ar",
"web": "",
"lat": -27.555477,
"lng": -65.620921
},
{
"proveedor": "ARQ. ALICIA MENA",
"provincia": "Tucumán",
"rubros": [
"CARPINTERÍA DE MADERA",
"CIELORRASOS"
],
"direccion": "Av. Alem 1132",
"tel": "436-1133",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.052151,
"lng": -65.394372
},
{
"proveedor": "ARROYO (CARPINTERÍA)",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "Alvear 676 (Alberdi)",
"tel": "471-723",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.585914,
"lng": -65.621435
},
{
"proveedor": "ARTE Y DISEÑO EXPORT S.R.L.",
"provincia": "Tucumán",
"rubros": [
"PILETAS"
],
"direccion": "Av. Solano Vera 2700",
"tel": "425-4880",
"whatsapp": "",
"mail": "arteparis@hotmail.com",
"web": "",
"lat": -26.817609,
"lng": -65.303281
},
{
"proveedor": "ARTESAN",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av.Roca 139",
"tel": "400-0043",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.164755,
"lng": -65.490801
},
{
"proveedor": "ASCENSORES SANT",
"provincia": "Tucumán",
"rubros": [
"ASCENSORES"
],
"direccion": "San Lorenzo 438",
"tel": "497-7889",
"whatsapp": "",
"mail": "sant-asc@tucbbs.com.ar",
"web": "",
"lat": -26.833821,
"lng": -65.204488
},
{
"proveedor": "ASERRADERO 25 DE MAYO",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "25 de Mayo 2165",
"tel": "427-6331",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.286615,
"lng": -65.394422
},
{
"proveedor": "AVANCO SRL",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Av. Salta 565",
"tel": "430-5758",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.822128,
"lng": -65.208706
},
{
"proveedor": "AZUL PILETAS",
"provincia": "Tucumán",
"rubros": [
"PILETAS"
],
"direccion": "Av. Mitre 235",
"tel": "430-6718",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824887,
"lng": -65.217613
},
{
"proveedor": "B Y M S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "9 de Julio 926",
"tel": "420-2088",
"whatsapp": "",
"mail": "edithpaz@hotmail.com.ar",
"web": "",
"lat": -26.889791,
"lng": -65.225352
},
{
"proveedor": "B.P.  S.A.",
"provincia": "Tucumán",
"rubros": [
"ALUMBRADO PUBLICO"
],
"direccion": "San Martín 1301",
"tel": "422-4427",
"whatsapp": "",
"mail": "bpsa@bp-sa.com.ar",
"web": "",
"lat": -26.826989,
"lng": -65.216824
},
{
"proveedor": "B.P.  S.A.",
"provincia": "Tucumán",
"rubros": [
"ALUMBRADO PUBLICO"
],
"direccion": "Córdoba 637",
"tel": "452-2343",
"whatsapp": "",
"mail": "bpsa@bp-sa.com.ar",
"web": "",
"lat": -26.826474,
"lng": -65.205727
},
{
"proveedor": "B.P. S.A.",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "San Martín 1301",
"tel": "422-4427",
"whatsapp": "",
"mail": "bpsa@bp-sa.com.ar",
"web": "",
"lat": -26.826989,
"lng": -65.216824
},
{
"proveedor": "B.P. S.A.",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Córdoba 637",
"tel": "452-2343",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826474,
"lng": -65.205727
},
{
"proveedor": "BAIT PROPIEDADES",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Lamadrid 341",
"tel": "420-1321",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838257,
"lng": -65.204029
},
{
"proveedor": "BASHEM",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Chacabuco 516 P.B.",
"tel": "420-3112",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.835083,
"lng": -65.208921
},
{
"proveedor": "BATCON S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "España 1247",
"tel": "423-4220",
"whatsapp": "",
"mail": "batconsrl@arnetbiz.com.ar",
"web": "",
"lat": -26.814964,
"lng": -65.212724
},
{
"proveedor": "BATIA S.R.L.",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Maipu 605",
"tel": "430-9099",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.822075,
"lng": -65.205523
},
{
"proveedor": "BERCOVICH",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO"
],
"direccion": "24 de Septiembre 746",
"tel": "421-9178",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "BERCOVICH",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO"
],
"direccion": "Asunción 237",
"tel": "433-0434",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.823782,
"lng": -65.222192
},
{
"proveedor": "BERCOVICH SACIFIA",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "24 de Septiembre 746",
"tel": "421-9178",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "BERCOVICH SACIFIA",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Asunción 237",
"tel": "433-0434",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.823782,
"lng": -65.222192
},
{
"proveedor": "BERRAL RAFAEL LUIS",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Asunción 210",
"tel": "423-4719",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824081,
"lng": -65.222461
},
{
"proveedor": "BIENES RAICES",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "San Martín 1081",
"tel": "430-9610",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.827872,
"lng": -65.213252
},
{
"proveedor": "BLASCO S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Suipacha 440",
"tel": "433-0686",
"whatsapp": "",
"mail": "jmblasco@arnet.com.ar",
"web": "",
"lat": -26.822587,
"lng": -65.215455
},
{
"proveedor": "BOCETO",
"provincia": "Tucumán",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Muñecas 391",
"tel": "156-459418",
"whatsapp": "",
"mail": "bocetoargentina@hotmail.com",
"web": "",
"lat": -26.825558,
"lng": -65.204715
},
{
"proveedor": "BOLLINI",
"provincia": "Tucumán",
"rubros": [
"BOMBAS PARA AGUA"
],
"direccion": "Catamarca 354",
"tel": "422-4022",
"whatsapp": "",
"mail": "",
"web": "http://www.norviguet.com.ar/",
"lat": -26.824638,
"lng": -65.211028
},
{
"proveedor": "BOLLINI Y CIA.S.R.L.",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "Catamarca 353",
"tel": "431-0148",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824593,
"lng": -65.211229
},
{
"proveedor": "BRB AMOBLAMIENTOS",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. Belgrano 2578",
"tel": "153-498-800",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814149,
"lng": -65.224529
},
{
"proveedor": "BUILDING MATERIALES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Lucas Córdoba 823",
"tel": "433-0483",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.803562,
"lng": -65.213747
},
{
"proveedor": "BULOS HECTOR RICARDO",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "9 de Julio 97 (Monteros)",
"tel": "426-436",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.168679,
"lng": -65.495747
},
{
"proveedor": "C&C AMOBLAMIENTOS",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Asunción 548",
"tel": "432-0138",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.819625,
"lng": -65.221204
},
{
"proveedor": "C&C AMOBLAMIENTOS",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "San Juan 945",
"tel": "497-7830",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824,
"lng": -65.210161
},
{
"proveedor": "C.B.N SERVICIOS ELÉCTRICOS",
"provincia": "Tucumán",
"rubros": [
"SEGURIDAD INDUSTRIAL"
],
"direccion": "Av. Belgrano 1681",
"tel": "423-8769",
"whatsapp": "",
"mail": "electric.cb.n@hotmail.com",
"web": "",
"lat": -26.814149,
"lng": -65.224529
},
{
"proveedor": "C.B.N. SERV. ELECTRICOS",
"provincia": "Tucumán",
"rubros": [
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Av. Belgrano 1681",
"tel": "423-8769",
"whatsapp": "",
"mail": "electric.cb.n@hotmail.com",
"web": "",
"lat": -26.814149,
"lng": -65.224529
},
{
"proveedor": "C.J. ELECTRICIDAD",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Córdoba 834",
"tel": "421-0337",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826032,
"lng": -65.208861
},
{
"proveedor": "CAMARA ARG. DE LA CONSTRUCCIÓN",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Martín 623",
"tel": "430-0660",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.829323,
"lng": -65.206395
},
{
"proveedor": "CARLINO HNOS. S.A.",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "Av. Mitre 349",
"tel": "433-0311",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.823334,
"lng": -65.217189
},
{
"proveedor": "CARPINTERÍA VALDÉZ",
"provincia": "Tucumán",
"rubros": [
"CARPINTERÍA DE MADERA"
],
"direccion": "Corrientes 339 (T. Viejo)",
"tel": "421-8759",
"whatsapp": "",
"mail": "carpinteriavaldezhnos@gmail.com",
"web": "",
"lat": -26.738452,
"lng": -65.262718
},
{
"proveedor": "CASA JAIME",
"provincia": "Tucumán",
"rubros": [
"EQUIPO DE TRABAJO"
],
"direccion": "Brígido Terán 75",
"tel": "421-1339",
"whatsapp": "",
"mail": "casajaime@casajaime.com.ar",
"web": "",
"lat": -26.834005,
"lng": -65.195063
},
{
"proveedor": "CASA MALKIND S.A.",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Laprida 250",
"tel": "421-6189",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.827986,
"lng": -65.202352
},
{
"proveedor": "CASTRO SANITARIOS",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS"
],
"direccion": "Alberdi 454",
"tel": "424-2100",
"whatsapp": "",
"mail": "castromat@arnet.com.ar",
"web": "",
"lat": -26.835118,
"lng": -65.215517
},
{
"proveedor": "Cerámica El Parque",
"provincia": "Tucumán",
"rubros": [
"LADRILLOS CERÁMICOS (FÁBRICAS)"
],
"direccion": "Lavalle 4299",
"tel": "432-0405",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.836312,
"lng": -65.220497
},
{
"proveedor": "CHAPERO",
"provincia": "Tucumán",
"rubros": [
"ALAMBRES"
],
"direccion": "Don Bosco 1675",
"tel": "423-0165",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.822915,
"lng": -65.221568
},
{
"proveedor": "CHAPERO",
"provincia": "Tucumán",
"rubros": [
"HIERROS"
],
"direccion": "Don Bosco 1678",
"tel": "423-0165",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.82307,
"lng": -65.221627
},
{
"proveedor": "CIA YESERA DEL NOROESTE",
"provincia": "Tucumán",
"rubros": [
"CAL - DISTRIBUIDORAS"
],
"direccion": "Marcos Paz 2065",
"tel": "427-9213",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.816667,
"lng": -65.283333
},
{
"proveedor": "CIA. EL CÓNDOR",
"provincia": "Tucumán",
"rubros": [
"CARPINTERÍA DE MADERA"
],
"direccion": "Uruguay 1104",
"tel": "424-4258",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.813,
"lng": -65.209502
},
{
"proveedor": "CIA. YESERA DEL NOROESTE",
"provincia": "Tucumán",
"rubros": [
"YESERÍAS"
],
"direccion": "Marcos Paz 2065",
"tel": "400-4578",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.816667,
"lng": -65.283333
},
{
"proveedor": "CIELORRASO TUCUMAN",
"provincia": "Tucumán",
"rubros": [
"CIELORRASOS",
"YESERÍAS"
],
"direccion": "Asunción 633",
"tel": "433-0847",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.818456,
"lng": -65.220665
},
{
"proveedor": "CINELLU",
"provincia": "Tucumán",
"rubros": [
"MADERAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Lavalle 1560",
"tel": "230-3664",
"whatsapp": "",
"mail": "",
"web": "www.cinellu.com.ar",
"lat": -26.84043,
"lng": -65.200686
},
{
"proveedor": "CITY PROPIEDADES",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Lamadrid 736",
"tel": "420-5025",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.837118,
"lng": -65.210031
},
{
"proveedor": "COBA",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "9 de Julio 1740",
"tel": "429-6973",
"whatsapp": "",
"mail": "cvbader@yahoo.com.ar",
"web": "",
"lat": -26.889791,
"lng": -65.225352
},
{
"proveedor": "CODESA S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Monteagudo 255",
"tel": "4313093",
"whatsapp": "",
"mail": "codesasrl@arnetbiz.com.ar",
"web": "",
"lat": -26.82838,
"lng": -65.199337
},
{
"proveedor": "COLETTI CONSTRUCCIONES",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Monteagudo 852",
"tel": "421-5805",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.820193,
"lng": -65.197591
},
{
"proveedor": "COMERCIAL COLON",
"provincia": "Tucumán",
"rubros": [
"ABRASIVOS",
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"BAÑOS QUÍMICOS - CASILLAS DE SEGURIDAD",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"GRUPOS ELECTRÓGENOS",
"MÁQUINAS Y EQUIPOS PARA LA CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"REPARACIÓN DE HERRAMIENTAS ELÉCTRICAS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "Av. Colón 107",
"tel": "433-0646",
"whatsapp": "",
"mail": "administracion@comercialcolon.com.ar",
"web": "",
"lat": -26.826609,
"lng": -65.232601
},
{
"proveedor": "COMERCIAL COLON",
"provincia": "Tucumán",
"rubros": [
"ANDAMIOS METÁLICOS"
],
"direccion": "Av. Colón 111",
"tel": "433-0646",
"whatsapp": "",
"mail": "administracion@comercialcolon.com.ar",
"web": "",
"lat": -26.826785,
"lng": -65.232438
},
{
"proveedor": "COMPUMATIC",
"provincia": "Tucumán",
"rubros": [
"INFORMÁTICA - COMPUTACIÓN"
],
"direccion": "Buenos Aires 310",
"tel": "422-5896",
"whatsapp": "",
"mail": "compumatic@arnet.com.ar",
"web": "",
"lat": -26.834851,
"lng": -65.207256
},
{
"proveedor": "CON-FER",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Chiclana 55",
"tel": "423-5253",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826174,
"lng": -65.230914
},
{
"proveedor": "CONEL S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Roca 2575",
"tel": "423-2561",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.168002,
"lng": -65.493281
},
{
"proveedor": "CONMIX",
"provincia": "Tucumán",
"rubros": [
"TANQUES PARA AGUAS"
],
"direccion": "Lavalle 3228",
"tel": "433-2797",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.831416,
"lng": -65.248692
},
{
"proveedor": "CONSTRUCCIONES ELECTRICAS S.A",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Coronel Zelaya 349",
"tel": "423-5064",
"whatsapp": "",
"mail": "ce-sa@arnetbiz.com.ar",
"web": "",
"lat": -26.82853,
"lng": -65.23966
},
{
"proveedor": "CONSTRUCCIONES PANAMERICANAS SA",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Congreso 180 Of 10",
"tel": "4213115",
"whatsapp": "",
"mail": "cpanamsa@hotmail.com",
"web": "",
"lat": -26.833599,
"lng": -65.203685
},
{
"proveedor": "CONSTRUKAB",
"provincia": "Tucumán",
"rubros": [
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Bolivia 2958",
"tel": "434-6634",
"whatsapp": "",
"mail": "emolina@ckab.com.ar",
"web": "",
"lat": -26.804433,
"lng": -65.238747
},
{
"proveedor": "CONTACTO",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "San Martín 1074",
"tel": "421-5612",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.836264,
"lng": -65.181798
},
{
"proveedor": "CORRALÓN  24",
"provincia": "Tucumán",
"rubros": [
"CHAPAS",
"HIERROS"
],
"direccion": "24 de Septiembre 817",
"tel": "452-2532",
"whatsapp": "",
"mail": "corralon24tucuman@yahoo.com.ar",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "CORRALÓN  ACONQUIJA",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA DE MADERA",
"CARPINTERÍA METÁLICA",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"HERRAJES"
],
"direccion": "San Lorenzo 1345/71",
"tel": "497-7889",
"whatsapp": "",
"mail": "ventas@corralonaconquija.com.ar",
"web": "",
"lat": -26.835002,
"lng": -65.199407
},
{
"proveedor": "Corralón 24",
"provincia": "Tucumán",
"rubros": [
"LADRILLOS (CORTADAS)",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PINTURERÍAS"
],
"direccion": "24 de Septiembre 817",
"tel": "452-2532",
"whatsapp": "",
"mail": "corralon24tucuman@yahoo.com.ar",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "CORRALÓN ACONQUIJA",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"DECORACIÓN Y EQUIPAMIENTO",
"MADERAS",
"MATERIALES DE CONSTRUCCIÓN",
"TOLDOS"
],
"direccion": "San Lorenzo 1345/71",
"tel": "381-5741-315",
"whatsapp": "54 381 574-1315",
"mail": "https://corralonaconquija.com/",
"web": "https://corralonaconquija.com/",
"lat": -26.835002,
"lng": -65.199407
},
{
"proveedor": "CORRALÓN ACONQUIJA",
"provincia": "Tucumán",
"rubros": [
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "San Lorenzo 1345",
"tel": "424-4258",
"whatsapp": "",
"mail": "ventas@corralonaconquija.com.ar",
"web": "",
"lat": -26.831184,
"lng": -65.218423
},
{
"proveedor": "CORRALÓN ALEM",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"CHAPAS",
"CIELORRASOS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PINTURERÍAS",
"REFRACTARIOS"
],
"direccion": "Av. Alem 535",
"tel": "400-0060",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.834982,
"lng": -65.220321
},
{
"proveedor": "CORRALÓN BOLIVIA",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Chile 150",
"tel": "422-9066",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814342,
"lng": -65.195191
},
{
"proveedor": "CORRALÓN CIUDADELA",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Gral. Paz 2049",
"tel": "423-5635",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.441786,
"lng": -65.624767
},
{
"proveedor": "CORRALÓN EL PROGRESO",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "San Martín 148 (Bella Vista)",
"tel": "482-0262",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.029792,
"lng": -65.312896
},
{
"proveedor": "CORRALÓN EL PROGRESO",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "S. Martín 148 (Bella Vista)",
"tel": "482-0262",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.029792,
"lng": -65.312896
},
{
"proveedor": "CORRALÓN SALTA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS"
],
"direccion": "Av. Salta 1650",
"tel": "427-3501",
"whatsapp": "",
"mail": "corralonsalta@argentina.com",
"web": "",
"lat": -26.806469,
"lng": -65.20486
},
{
"proveedor": "CORRALÓN SALTA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS"
],
"direccion": "Av. Roca 2397",
"tel": "432-1997",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.164755,
"lng": -65.490801
},
{
"proveedor": "CORRALÓN SAN FRANCISCO",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Bolívar 1590",
"tel": "424-2166",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.837039,
"lng": -65.22409
},
{
"proveedor": "CORRALÓN SAN JUAN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "San Juan 3552",
"tel": "423-6342",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.819038,
"lng": -65.234704
},
{
"proveedor": "COZZI Y COZZI",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS",
"MOSAICOS"
],
"direccion": "Saavedra 427",
"tel": "423-7371",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.820369,
"lng": -65.232786
},
{
"proveedor": "CÁMARA  TUC. DE LA CONSTRUCCIÓN",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Martín 427",
"tel": "430-2648",
"whatsapp": "",
"mail": "gerencia@ctuc.org.ar",
"web": "",
"lat": -26.829851,
"lng": -65.203262
},
{
"proveedor": "DAKAR S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Thames 546",
"tel": "432-1484",
"whatsapp": "",
"mail": "danielmafud@dakarsrl.com.ar",
"web": "",
"lat": -27.024908,
"lng": -65.301241
},
{
"proveedor": "DANIEL ILUMINACION",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Jujuy 302",
"tel": "422-9992",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.834019,
"lng": -65.211843
},
{
"proveedor": "DANIEL INGENIERIA",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"AIRE ACONDICIONADO",
"ALUMINIO - CARPINTERIA",
"AMOBLAMIENTOS",
"ASCENSORES",
"CARPINTERÍA DE MADERA",
"CARPINTERÍA METÁLICA",
"CORTINAS - PERSIANAS",
"CORTINAS METÁLICAS",
"EMPRESAS CONSTRUCTORAS",
"MATERIALES DE CONSTRUCCIÓN",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Las Piedras 884",
"tel": "497-7889",
"whatsapp": "",
"mail": "danielingenieria@hotmail.com",
"web": "",
"lat": -26.834016,
"lng": -65.211603
},
{
"proveedor": "DANILO G",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Santiago 718",
"tel": "422-8616",
"whatsapp": "",
"mail": "danilog.tuc@hotmail.com.ar",
"web": "",
"lat": -26.953954,
"lng": -65.044124
},
{
"proveedor": "DARUICH & ASOC.",
"provincia": "Tucumán",
"rubros": [
"CONSULTORÍA PROFESIONAL"
],
"direccion": "12 de Octubre 1060",
"tel": "423-9903",
"whatsapp": "",
"mail": "estudiodaruich@hotmail.com",
"web": "",
"lat": -26.82501,
"lng": -65.219384
},
{
"proveedor": "DEL NOA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS"
],
"direccion": "Las Piedras 2895",
"tel": "321400",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.827224,
"lng": -65.242128
},
{
"proveedor": "DELAPORTE",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"CARPINTERÍA METÁLICA"
],
"direccion": "Crisóstomo Álvarez 471",
"tel": "421-8202",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832343,
"lng": -65.204571
},
{
"proveedor": "DF NOA",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MADERAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Av. colón 1235",
"tel": "438-0060",
"whatsapp": "",
"mail": "info@dfnoa.com",
"web": "",
"lat": -26.868745,
"lng": -65.243562
},
{
"proveedor": "DIAZ MEINERS",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"AMOBLAMIENTOS",
"CARPINTERÍA DE MADERA",
"CARPINTERÍA PVC - ALUMINIO",
"CORTINAS METÁLICAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Corrientes 2151",
"tel": "433-0540",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.82027,
"lng": -65.214898
},
{
"proveedor": "DIGICOM SIST. REDES",
"provincia": "Tucumán",
"rubros": [
"INSTALACIONES ELÉCTRICAS"
],
"direccion": "Av. Independencia Nº 1580",
"tel": "4515729",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.844193,
"lng": -65.231943
},
{
"proveedor": "DIMATER S.A.",
"provincia": "Tucumán",
"rubros": [
"ALUMBRADO PUBLICO",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Marina Alfaro 1140",
"tel": "420-5348",
"whatsapp": "",
"mail": "consultas@dimater.com.ar",
"web": "",
"lat": -26.871187,
"lng": -65.211474
},
{
"proveedor": "DIMOND S.A.",
"provincia": "Tucumán",
"rubros": [
"BOMBAS PARA AGUA",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"GRUPOS ELECTRÓGENOS",
"MOTORES ELÉCTRICOS",
"PILETAS"
],
"direccion": "Mendoza 939",
"tel": "452-6132/33",
"whatsapp": "",
"mail": "",
"web": "http://www.norviguet.com.ar/",
"lat": -26.826793,
"lng": -65.210862
},
{
"proveedor": "DISCAR",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Córdoba 429",
"tel": "430-3434",
"whatsapp": "",
"mail": "info@discarsc.com.ar",
"web": "",
"lat": -26.827107,
"lng": -65.202692
},
{
"proveedor": "DISTRIBUIDORA ARMONÍA",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Maipú 340",
"tel": "430-1351",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.825795,
"lng": -65.206651
},
{
"proveedor": "DISTRIBUIDORA BELGRANO",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MADERAS"
],
"direccion": "Av. Belgrano 1964",
"tel": "432-3131",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815323,
"lng": -65.2183
},
{
"proveedor": "DISTRIBUIDORA TAFÍ",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "(Tafí del Valle)",
"tel": "421-419",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.851974,
"lng": -65.710812
},
{
"proveedor": "DISTRICORT",
"provincia": "Tucumán",
"rubros": [
"CORTINAS - PERSIANAS",
"CORTINAS METÁLICAS"
],
"direccion": "San Juan 2181",
"tel": "381 480-5979 / 381 679-3400",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824755,
"lng": -65.207148
},
{
"proveedor": "DOMINGO BRAVO",
"provincia": "Tucumán",
"rubros": [
"ALAMBRES"
],
"direccion": "Uruguay 465",
"tel": "422-3682",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814603,
"lng": -65.200272
},
{
"proveedor": "DOVANET",
"provincia": "Tucumán",
"rubros": [
"INTERNET"
],
"direccion": "San Martin 2211",
"tel": "",
"whatsapp": "3815161888",
"mail": "",
"web": "",
"lat": -26.823518,
"lng": -65.230871
},
{
"proveedor": "DRAGOTUC",
"provincia": "Tucumán",
"rubros": [
"MATAFUEGOS Y SERVICIOS CONTRA INCENDIOS"
],
"direccion": "Entre Ríos 280",
"tel": "422-2352",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.835816,
"lng": -65.201028
},
{
"proveedor": "DURAFORT",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"MÁRMOL SINTÉTICO"
],
"direccion": "Pje. Boulogne Sur Mer 3334",
"tel": "423-9465",
"whatsapp": "",
"mail": "info@durafort.com.ar",
"web": "",
"lat": -26.828386,
"lng": -65.256165
},
{
"proveedor": "DYMA ELECTROCOMERCIAL",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Crisóstomo Alvarez 21",
"tel": "421-2903",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.833797,
"lng": -65.197904
},
{
"proveedor": "ECOCLIMA",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Lavalle 1315",
"tel": "420-3046",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.836514,
"lng": -65.219358
},
{
"proveedor": "EL ARENAL",
"provincia": "Tucumán",
"rubros": [
"ÁRIDOS- CANTERAS",
"CIELORRASOS",
"CONTENEDORES",
"MADERAS"
],
"direccion": "Lavalle 1574",
"tel": "437-4141",
"whatsapp": "",
"mail": "alejandro.elarenal@gmail.com",
"web": "",
"lat": -26.836312,
"lng": -65.220497
},
{
"proveedor": "EL CHINO",
"provincia": "Tucumán",
"rubros": [
"FLETES Y MUDANZAS"
],
"direccion": "Diego de Villarroel 757",
"tel": "3184065308",
"whatsapp": "3184065308",
"mail": "rentuc123@gmail.com",
"web": "",
"lat": -26.820271,
"lng": -65.183914
},
{
"proveedor": "EL CRISTO",
"provincia": "Tucumán",
"rubros": [
"VIVEROS"
],
"direccion": "Av. Aconquija 400",
"tel": "435-3598",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.817149,
"lng": -65.272148
},
{
"proveedor": "EL FAROL S.R.L.",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "24 de Septiembre 629",
"tel": "430-2593",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "EL KAIREL ILUMINACIÓN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Maipú 350",
"tel": "422-7669",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.825672,
"lng": -65.206619
},
{
"proveedor": "EL MORAL S.R.L",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"CONTENEDORES",
"EXCAVACIONES - MOVIMIENTO DE SUELOS",
"MÁQUINAS Y EQUIPOS PARA LA CONSTRUCCIÓN"
],
"direccion": "Bernabé Aráoz 281",
"tel": "420-2218",
"whatsapp": "",
"mail": "estudiofrancisco@arnet.com.ar",
"web": "",
"lat": -26.832618,
"lng": -65.216732
},
{
"proveedor": "EL NORTEÑO PARQUET",
"provincia": "Tucumán",
"rubros": [
"CONTRATISTAS DE OBRAS",
"DECORACIÓN Y EQUIPAMIENTO",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MADERAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Lavalle 2389",
"tel": "423-2001",
"whatsapp": "",
"mail": "javiernaessens@yahoo.com.ar",
"web": "",
"lat": -26.833623,
"lng": -65.23639
},
{
"proveedor": "EL PORVENIR",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN",
"PINTURERÍAS"
],
"direccion": "Av. Belgrano 3276",
"tel": "423-7369",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815323,
"lng": -65.2183
},
{
"proveedor": "ELECTRO ROCA",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Roca 489",
"tel": "424-6038",
"whatsapp": "",
"mail": "electroroca@hotmail.com",
"web": "",
"lat": -26.843113,
"lng": -65.207356
},
{
"proveedor": "ELECTRO VIAL",
"provincia": "Tucumán",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Pío XII 868",
"tel": "420-2929",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.845876,
"lng": -65.194924
},
{
"proveedor": "ELECTROSORIA",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Jujuy 1083",
"tel": "424-7304",
"whatsapp": "",
"mail": "elizapazsoria@gmail.com",
"web": "",
"lat": -26.844389,
"lng": -65.214409
},
{
"proveedor": "ELGART PROPIEDADES",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "San Lorenzo 763",
"tel": "421-1182",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832819,
"lng": -65.209426
},
{
"proveedor": "EMARZAR",
"provincia": "Tucumán",
"rubros": [
"PINTURA DE OBRA",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Tafi Viejo",
"tel": "155666101",
"whatsapp": "",
"mail": "emarzar@hotmail.com",
"web": "",
"lat": -26.734315,
"lng": -65.259223
},
{
"proveedor": "EMI",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ABRASIVOS",
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"ALUMINIO - CARPINTERIA",
"AMOBLAMIENTOS",
"ANDAMIOS METÁLICOS",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"CARPINTERÍA DE MADERA",
"CARPINTERÍA METÁLICA",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"CORTINAS METÁLICAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"GAS",
"GRUPOS ELECTRÓGENOS",
"HERRAJES",
"HIERROS",
"IMPERMEABILIZACIONES"
],
"direccion": "Av. Roca 336",
"tel": "452-6132/33",
"whatsapp": "",
"mail": "hola@emisrl.com.ar",
"web": "http://www.emisrl.com.ar/",
"lat": -26.843811,
"lng": -65.205191
},
{
"proveedor": "EMI",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ABRASIVOS",
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"ALUMINIO - CARPINTERIA",
"AMOBLAMIENTOS",
"ANDAMIOS METÁLICOS",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"CARPINTERÍA DE MADERA",
"CARPINTERÍA METÁLICA",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"CORTINAS METÁLICAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"GAS",
"GRUPOS ELECTRÓGENOS",
"HERRAJES",
"HIERROS",
"IMPERMEABILIZACIONES"
],
"direccion": "Av. Aconquija 1331 (Yerba Buena)",
"tel": "431-6520",
"whatsapp": "",
"mail": "hola@emisrl.com.ar",
"web": "http://www.emisrl.com.ar/",
"lat": -26.808042,
"lng": -65.320931
},
{
"proveedor": "EMILIO ROSSI E HIJOS SRL",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"DECORACIÓN Y EQUIPAMIENTO",
"MARMOLERÍAS",
"MOSAICOS"
],
"direccion": "Santiago del Estero 2412",
"tel": "432-3695",
"whatsapp": "",
"mail": "marmoleriarossi@arnetbiz.com.ar",
"web": "",
"lat": -26.816773,
"lng": -65.2389
},
{
"proveedor": "ENRIQUE ARMENGOL",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. F. de Aguirre 2226",
"tel": "427-3259",
"whatsapp": "",
"mail": "tecnica.armengol@gmail.com",
"web": "",
"lat": -26.791012,
"lng": -65.216264
},
{
"proveedor": "EQUISER",
"provincia": "Tucumán",
"rubros": [
"CONTROL DE ACCESO"
],
"direccion": "Santa Fé 2037",
"tel": "432-2971",
"whatsapp": "",
"mail": "ventas@equiser.com.ar",
"web": "",
"lat": -26.822808,
"lng": -65.310794
},
{
"proveedor": "ER ALUMINIO",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "Av. Marina Alfaro 1070",
"tel": "381-5316-907",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.871187,
"lng": -65.211474
},
{
"proveedor": "ERG NORANDINA SRL",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "La Rioja 518",
"tel": "424-4653",
"whatsapp": "",
"mail": "www.grupoerg.com",
"web": "",
"lat": -26.836341,
"lng": -65.214241
},
{
"proveedor": "EXCECON S.R.L",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Colombia 1324",
"tel": "155548309",
"whatsapp": "",
"mail": "excecontuc@gmail.com",
"web": "",
"lat": -26.799108,
"lng": -65.240585
},
{
"proveedor": "EXPRESO SAN JOSE S.A",
"provincia": "Tucumán",
"rubros": [
"CAL - DISTRIBUIDORAS",
"CEMENTO",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Alfonsina Storni 97",
"tel": "503-5641",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.79702,
"lng": -65.185837
},
{
"proveedor": "FAMIQ",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE"
],
"direccion": "Av. Avellaneda 554",
"tel": "421-2700",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824823,
"lng": -65.195412
},
{
"proveedor": "FARBE PINTURERÍA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Ejército del Norte 555",
"tel": "451-8157",
"whatsapp": "",
"mail": "farbepintureria@yuhmak.com.ar",
"web": "",
"lat": -26.822806,
"lng": -65.231687
},
{
"proveedor": "FB INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Virgen de la Merced 137",
"tel": "156256255",
"whatsapp": "",
"mail": "fginmobiliariatucuman@gmail.com",
"web": "",
"lat": -26.829713,
"lng": -65.201169
},
{
"proveedor": "FERREKIT",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "San Martín 1080",
"tel": "421-8365",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.836284,
"lng": -65.181696
},
{
"proveedor": "FERRETERIA MARTIN",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "24 de Septiembre 140",
"tel": "422-1240",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.166411,
"lng": -65.494461
},
{
"proveedor": "FERRETERÍA SAN JUAN",
"provincia": "Tucumán",
"rubros": [
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MATERIALES DE CONSTRUCCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "San Juan 3501",
"tel": "424-5023",
"whatsapp": "",
"mail": "ferreteriasanjuantuc@gmail.com",
"web": "",
"lat": -26.825631,
"lng": -65.203361
},
{
"proveedor": "FINTUC",
"provincia": "Tucumán",
"rubros": [
"PEGAMENTOS (FÁBRICAS)"
],
"direccion": "Jujuy 5000",
"tel": "429-3378",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.834429,
"lng": -65.212081
},
{
"proveedor": "FONTANA MATERIALES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Belgrano 1904",
"tel": "423-6628",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.812058,
"lng": -65.235351
},
{
"proveedor": "FONTDEVILA S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Marcos Paz 623",
"tel": "421-5239",
"whatsapp": "",
"mail": "fontdevilasa@arnet.com.ar",
"web": "",
"lat": -26.821027,
"lng": -65.20417
},
{
"proveedor": "FORMOSO EDUARDO",
"provincia": "Tucumán",
"rubros": [
"CARPINTERÍA METÁLICA",
"ESTRUCTURAS METÁLICAS",
"HOJALATERÍA",
"TANQUES AUSTRALIANOS",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Lavalle 2412",
"tel": "436-1134",
"whatsapp": "",
"mail": "eduardo_formoso@yahoo.com.ar",
"web": "",
"lat": -26.833562,
"lng": -65.236953
},
{
"proveedor": "FORTALEZA INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Las Heras 484",
"tel": "424-7585",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838165,
"lng": -65.203193
},
{
"proveedor": "GARDE S.R.L",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Juan 787",
"tel": "4330258",
"whatsapp": "",
"mail": "avant_garde@arnet.com.ar",
"web": "",
"lat": -26.83976,
"lng": -65.216787
},
{
"proveedor": "GBS GREEN BUILDING SOLUTIONS",
"provincia": "Tucumán",
"rubros": [
"CIELORRASOS"
],
"direccion": "Av. Aconquija 2579",
"tel": "155-504064",
"whatsapp": "",
"mail": "pvidal@gbsargentina.com.ar",
"web": "",
"lat": -26.817149,
"lng": -65.272148
},
{
"proveedor": "GECONPE S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Don Bosco 1887",
"tel": "423-0067",
"whatsapp": "",
"mail": "informacion@geconpe.com.ar",
"web": "",
"lat": -26.822208,
"lng": -65.224807
},
{
"proveedor": "GENTILE TUCUMAN",
"provincia": "Tucumán",
"rubros": [
"CHAPAS",
"TANQUES AUSTRALIANOS"
],
"direccion": "Lavalle 2729",
"tel": "423-3131",
"whatsapp": "",
"mail": "gentiletuc@uolsinectis.com.ar",
"web": "",
"lat": -26.831807,
"lng": -65.245698
},
{
"proveedor": "GIACOSA A y E",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Marina Alfaro 1215",
"tel": "424-7863",
"whatsapp": "",
"mail": "giacosa@tucbbs.com.ar",
"web": "",
"lat": -26.851948,
"lng": -65.202062
},
{
"proveedor": "GIACOSA ALFREDO",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Lavalle 1902",
"tel": "400-5295",
"whatsapp": "",
"mail": "alfredogiacosa@arnet.com.ar",
"web": "",
"lat": -26.834374,
"lng": -65.228728
},
{
"proveedor": "GIACOSA ELIO",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CHAPAS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"HIERROS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Suipacha 482",
"tel": "400-5371",
"whatsapp": "",
"mail": "giacosaelio@yahoo.com.ar",
"web": "",
"lat": -26.821913,
"lng": -65.215353
},
{
"proveedor": "GIMÉNEZ",
"provincia": "Tucumán",
"rubros": [
"GAS"
],
"direccion": "Castro Barros 233",
"tel": "154-091179",
"whatsapp": "",
"mail": "gimenezinstalacionescomplementarias@hotmail.com",
"web": "",
"lat": -26.790283,
"lng": -65.241377
},
{
"proveedor": "GIMÉNEZ",
"provincia": "Tucumán",
"rubros": [
"INSTALADORES SANITARIOS",
"MATAFUEGOS Y SERVICIOS CONTRA INCENDIOS"
],
"direccion": "Juan Luis Nougues 50",
"tel": "154-091179",
"whatsapp": "",
"mail": "gimenezinstalacionescomplementarias@hotmail.com",
"web": "",
"lat": -26.921146,
"lng": -65.339051
},
{
"proveedor": "GMKT",
"provincia": "Tucumán",
"rubros": [
"BOMBAS PARA AGUA",
"CALDERAS - CALEFACCIÓN",
"CAÑOS Y ACCESORIOS",
"ENERGÍA SOLAR",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS",
"PVC",
"SISTEMAS DE BOMBEO"
],
"direccion": "Av. Mitre 172",
"tel": "450-4953",
"whatsapp": "",
"mail": "info@gmkt.com.ar",
"web": "",
"lat": -26.82579,
"lng": -65.218119
},
{
"proveedor": "GOLDMAN SANITARIOS",
"provincia": "Tucumán",
"rubros": [
"SANITARIOS"
],
"direccion": "Av. Juan B. Justo 1045",
"tel": "",
"whatsapp": "3814541190",
"mail": "",
"web": "",
"lat": -26.817468,
"lng": -65.193598
},
{
"proveedor": "GONELLA HNOS.",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "San Juan 1643",
"tel": "423-4013",
"whatsapp": "",
"mail": "gonellahnos@ciudad.com.ar",
"web": "",
"lat": -26.821651,
"lng": -65.220804
},
{
"proveedor": "GUERRERO",
"provincia": "Tucumán",
"rubros": [
"ASCENSORES"
],
"direccion": "Marcos Paz 316.",
"tel": "381-589-3566 / 381-587-8289",
"whatsapp": "",
"mail": "guerrero@jetnet.com.ar",
"web": "",
"lat": -26.822065,
"lng": -65.199789
},
{
"proveedor": "GUZMÁN Y GUZMÁN",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"INMOBILIARIAS"
],
"direccion": "Monteagudo 231",
"tel": "4227574",
"whatsapp": "",
"mail": "guzmanyguzman@msn.com",
"web": "",
"lat": -26.828644,
"lng": -65.199402
},
{
"proveedor": "HABITAT",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Buenos Aires 440",
"tel": "4205881",
"whatsapp": "",
"mail": "habitatsrl@yahoo.com.ar",
"web": "",
"lat": -26.836691,
"lng": -65.207758
},
{
"proveedor": "HELGUERA",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"EXCAVACIONES - MOVIMIENTO DE SUELOS"
],
"direccion": "Muñecas 2657",
"tel": "427-6539",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.821892,
"lng": -65.203908
},
{
"proveedor": "HELGUERA S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Francisco de Aguirre 564",
"tel": "427-6544",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.792717,
"lng": -65.213524
},
{
"proveedor": "HELPA S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"HORMIGÓN ELABORADO"
],
"direccion": "Monteagudo 49",
"tel": "430-0758",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.831159,
"lng": -65.200082
},
{
"proveedor": "HERRAJES VANCAR",
"provincia": "Tucumán",
"rubros": [
"HERRAJES"
],
"direccion": "Av. Belgrano 1525",
"tel": "4236275",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815306,
"lng": -65.217199
},
{
"proveedor": "HIERRONORT SALTA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS",
"HIERROS"
],
"direccion": "Av.Colón 925",
"tel": "436-1234",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838124,
"lng": -65.235786
},
{
"proveedor": "HORMECO",
"provincia": "Tucumán",
"rubros": [
"HORMIGÓN ELABORADO"
],
"direccion": "Jujuy 4445",
"tel": "429-3029",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.881946,
"lng": -65.227138
},
{
"proveedor": "HUGO Y JUAN CARLOS ENRICO S.C.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Luis 250",
"tel": "424-4528",
"whatsapp": "",
"mail": "juancarlosenrico@hotmail.com",
"web": "",
"lat": -26.832061,
"lng": -65.217897
},
{
"proveedor": "HUINCA RENANCO NORTE S.R.L.",
"provincia": "Tucumán",
"rubros": [
"ABRASIVOS",
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"BOMBAS PARA AGUA",
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MÁQUINAS Y EQUIPOS PARA LA CONSTRUCCIÓN",
"MOTORES ELÉCTRICOS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "9 de Julio 948",
"tel": "424-5023",
"whatsapp": "",
"mail": "ventas@huincasrl.com.ar",
"web": "",
"lat": -26.889791,
"lng": -65.225352
},
{
"proveedor": "HUINCA RENANCO S.R.L",
"provincia": "Tucumán",
"rubros": [
"GRUPOS ELECTRÓGENOS"
],
"direccion": "9 de Julio 948",
"tel": "424-5023",
"whatsapp": "",
"mail": "ventas@huincasrl.com.ar",
"web": "",
"lat": -26.889791,
"lng": -65.225352
},
{
"proveedor": "ICM S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Lavalle 2375",
"tel": "432-0321",
"whatsapp": "",
"mail": "icmsrl@icmsrl.arnetbiz.com.ar",
"web": "",
"lat": -26.83178,
"lng": -65.245847
},
{
"proveedor": "IMAGINARIA",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "José Colombres 198",
"tel": "425-1558",
"whatsapp": "",
"mail": "jjpmarchi@msn.com",
"web": "",
"lat": -26.82655,
"lng": -65.213369
},
{
"proveedor": "INCA SRL",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "9 de Julio 2088",
"tel": "4510981",
"whatsapp": "",
"mail": "incamoyano@hotmail.com",
"web": "",
"lat": -26.889791,
"lng": -65.225352
},
{
"proveedor": "INDUSPARQUET",
"provincia": "Tucumán",
"rubros": [
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Av. Aconquija 285",
"tel": "435-3772",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.817902,
"lng": -65.267333
},
{
"proveedor": "INDUSTRIAL BELGRANO",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS"
],
"direccion": "Santa Fe 3008",
"tel": "423-7900",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814598,
"lng": -65.229796
},
{
"proveedor": "ING. CHAVANNE -SEG. E HIG",
"provincia": "Tucumán",
"rubros": [
"CONSULTORÍA PROFESIONAL"
],
"direccion": "Las Piedras 337",
"tel": "430-7428",
"whatsapp": "",
"mail": "rchavanne@arnet.com.ar",
"web": "",
"lat": -26.835456,
"lng": -65.203267
},
{
"proveedor": "ING. OLI ALONSO - LUMINAR",
"provincia": "Tucumán",
"rubros": [
"DISEÑO DE ILUMINACIÓN"
],
"direccion": "Perú 935 (Y.B.)",
"tel": "431-6227",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814691,
"lng": -65.264221
},
{
"proveedor": "ING.PEREZ JAIME",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "San Juan 1003",
"tel": "421-5842",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.823794,
"lng": -65.211076
},
{
"proveedor": "INGEHSA",
"provincia": "Tucumán",
"rubros": [
"HIGIENE Y SEGURIDAD"
],
"direccion": "Godoy Cruz 1661",
"tel": "381-6418559",
"whatsapp": "",
"mail": "ingehsaargentina@gmail.com",
"web": "",
"lat": -26.800727,
"lng": -65.248405
},
{
"proveedor": "INGENIERÍA BIHOTZ",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Salta 126 2 B",
"tel": "4214148",
"whatsapp": "",
"mail": "ingenieriabihotz@gmail.com",
"web": "www.ingenieriabihotz.com.ar",
"lat": -26.819544,
"lng": -65.208282
},
{
"proveedor": "INGENIERÍA ENERGÉTICA",
"provincia": "Tucumán",
"rubros": [
"ENERGÍA SOLAR"
],
"direccion": "Santa Fe 1317",
"tel": "437-5496",
"whatsapp": "",
"mail": "administracion@adsservicios.com.ar",
"web": "",
"lat": -26.817473,
"lng": -65.214558
},
{
"proveedor": "INGENOR",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Amador Lucero 306",
"tel": "438-1218",
"whatsapp": "",
"mail": "lomascolo@ingenor.com.ar",
"web": "",
"lat": -26.845636,
"lng": -65.2345
},
{
"proveedor": "INSTALL INGENIERIA S.R.L",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"ALUMBRADO PUBLICO",
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"CIELORRASOS",
"COLUMNAS PARA ALUMBRADO",
"EMPRESAS CONSTRUCTORAS",
"EXCAVACIONES - MOVIMIENTO DE SUELOS",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Matheu 2476",
"tel": "436-0934",
"whatsapp": "",
"mail": "installtuc@arnet.com.ar",
"web": "",
"lat": -26.844927,
"lng": -65.241015
},
{
"proveedor": "INSTELEC",
"provincia": "Tucumán",
"rubros": [
"COLUMNAS PARA ALUMBRADO"
],
"direccion": "Italia 2464",
"tel": "423-2505",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815365,
"lng": -65.201794
},
{
"proveedor": "INTERFON",
"provincia": "Tucumán",
"rubros": [
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Corrientes 826",
"tel": "430-0786",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.821933,
"lng": -65.207634
},
{
"proveedor": "INTERIORES",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "San Martín 1026",
"tel": "400-4467/ 430-2239",
"whatsapp": "",
"mail": "interiorestuc@live.com/ interioresyb@live.com.ar",
"web": "",
"lat": -26.836106,
"lng": -65.18262
},
{
"proveedor": "INTI",
"provincia": "Tucumán",
"rubros": [
"PLANOS - PLOTEO"
],
"direccion": "Salta 250",
"tel": "422-3412",
"whatsapp": "",
"mail": "intiplot@arnet.com.ar",
"web": "",
"lat": -26.826297,
"lng": -65.210147
},
{
"proveedor": "INVIALCO S. A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Thames 254",
"tel": "432-4104",
"whatsapp": "",
"mail": "invialco@arnet.com.ar",
"web": "",
"lat": -26.822159,
"lng": -65.228748
},
{
"proveedor": "INYSER",
"provincia": "Tucumán",
"rubros": [
"CORTINAS METÁLICAS",
"PORTONES AUTOMÁTICOS"
],
"direccion": "Lavalle 2665",
"tel": "432-3232",
"whatsapp": "3815892263",
"mail": "",
"web": "www.inyser.com.ar",
"lat": -26.831802,
"lng": -65.245725
},
{
"proveedor": "IPS SANITARIOS",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"MATERIALES DE CONSTRUCCIÓN",
"TANQUES PARA AGUAS"
],
"direccion": "Av. Ejercito del Norte 225",
"tel": "451-4377",
"whatsapp": "",
"mail": "ipssanitarios@hotmail.com",
"web": "",
"lat": -26.822806,
"lng": -65.231687
},
{
"proveedor": "J.A. MORAN VIDRIOS",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Colon 181",
"tel": "423-4528",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.827499,
"lng": -65.23263
},
{
"proveedor": "JACARANDA MADERAS",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"CARPINTERÍA DE MADERA",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"HERRAJES",
"MADERAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Lavalle 2135/46",
"tel": "423-9302",
"whatsapp": "",
"mail": "jacarandam@uolsinectis.com.ar",
"web": "",
"lat": -26.830593,
"lng": -65.257787
},
{
"proveedor": "JIMENEZ",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Rivadavia 2497",
"tel": "422-2973",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.819227,
"lng": -65.198789
},
{
"proveedor": "KRONOS",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"ALUMINIO - CARPINTERIA"
],
"direccion": "Bolivia 2958",
"tel": "434-6634",
"whatsapp": "",
"mail": "info@kronossrl.com.ar",
"web": "",
"lat": -26.804433,
"lng": -65.238747
},
{
"proveedor": "KRYSTALLOS",
"provincia": "Tucumán",
"rubros": [
"VITROFUSIÓN"
],
"direccion": "Sarmiento 1895 (YB)",
"tel": "425-519",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.343612,
"lng": -65.585459
},
{
"proveedor": "LA ALDABA",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"MATERIALES DE CONSTRUCCIÓN",
"PREMOLDEADOS"
],
"direccion": "Camino del Perú 2250",
"tel": "434-4089",
"whatsapp": "",
"mail": "aldaba.sanjosegmail.com",
"web": "",
"lat": -26.791278,
"lng": -65.256571
},
{
"proveedor": "LA ALDABA",
"provincia": "Tucumán",
"rubros": [
"CORTINAS METÁLICAS",
"HERRAJES"
],
"direccion": "Mendoza 1095",
"tel": "422-9088",
"whatsapp": "",
"mail": "aldaba1@datafull.com",
"web": "",
"lat": -26.82631,
"lng": -65.213051
},
{
"proveedor": "LA CASA DEL MATAFUEGO",
"provincia": "Tucumán",
"rubros": [
"MATAFUEGOS Y SERVICIOS CONTRA INCENDIOS"
],
"direccion": "Las Piedras 979",
"tel": "430-3834",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.833551,
"lng": -65.213066
},
{
"proveedor": "LA ONDA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS",
"HIERROS"
],
"direccion": "Av. Colón 577",
"tel": "423-5328",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.868745,
"lng": -65.243562
},
{
"proveedor": "LA PINTURERÍA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Lídoro Quinteros 159 (Alberdi)",
"tel": "471-758",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.589108,
"lng": -65.620043
},
{
"proveedor": "LA RURAL",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Camino del Perú 1291/3",
"tel": "434-3231",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.791278,
"lng": -65.256571
},
{
"proveedor": "Ladricer",
"provincia": "Tucumán",
"rubros": [
"LADRILLOS CERÁMICOS (FÁBRICAS)"
],
"direccion": "Lavalle 2627",
"tel": "433-1020",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.831799,
"lng": -65.245741
},
{
"proveedor": "LAJAS NOROESTE",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Adolfo de la Vega 709",
"tel": "432-2466",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.823147,
"lng": -65.251665
},
{
"proveedor": "LEADER HOUSE",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "San Juan 730",
"tel": "431-2120",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824846,
"lng": -65.20686
},
{
"proveedor": "LEAL HNOS.",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"CARPINTERÍA DE MADERA"
],
"direccion": "Crisóstomo Alvarez 1930",
"tel": "432-0429",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.82783,
"lng": -65.22707
},
{
"proveedor": "LEDEHEZA ILUMINACIÓN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "José Colombres 230",
"tel": "497-9301",
"whatsapp": "",
"mail": "info@ledeheza.com.ar",
"web": "www.ledeheza.com.ar",
"lat": -26.825905,
"lng": -65.213232
},
{
"proveedor": "LEITEN NOA",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"EQUIPOS PARA LA CONSTRUCCIÓN"
],
"direccion": "Av. Adolfo de la Vega 470",
"tel": "423-7038",
"whatsapp": "",
"mail": "leitennoa@leiten.com.ar",
"web": "",
"lat": -26.823147,
"lng": -65.251665
},
{
"proveedor": "LEÓN ALPEROVICH GROUP",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Lorenzo 1083",
"tel": "422-5393",
"whatsapp": "",
"mail": "",
"web": "www.leonalperovich.com.ar",
"lat": -26.831847,
"lng": -65.214316
},
{
"proveedor": "LINARES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Libertad 125 (Lules)",
"tel": "481-1099",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.926689,
"lng": -65.339227
},
{
"proveedor": "LINARES MATERIALES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Libertad 125 (Lules)",
"tel": "481-1099",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.926689,
"lng": -65.339227
},
{
"proveedor": "LOS SANTIAGUEÑOS",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "(Tafí del Valle- El Mollar)",
"tel": "491-136",
"whatsapp": "",
"mail": "javiercellucci@hotmail.com",
"web": "",
"lat": -26.87437,
"lng": -65.679908
},
{
"proveedor": "LUIS MOLINA",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Frías Silva 29",
"tel": "429-1999",
"whatsapp": "",
"mail": "luismolinaventas@hotmail.com",
"web": "",
"lat": -26.827266,
"lng": -65.224919
},
{
"proveedor": "LÍNEA ESTUDIO",
"provincia": "Tucumán",
"rubros": [
"PLANOS - PLOTEO"
],
"direccion": "San Luis 284",
"tel": "424-9134",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832435,
"lng": -65.217988
},
{
"proveedor": "M&A",
"provincia": "Tucumán",
"rubros": [
"EQUIPAMIENTO GASTRONÓMICO"
],
"direccion": "Lavalle 3109",
"tel": "432-2238",
"whatsapp": "",
"mail": "myarpresentaciones@myacomercial.com.ar",
"web": "",
"lat": -26.831566,
"lng": -65.247001
},
{
"proveedor": "MACAGNO",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "Italia 2364",
"tel": "451-8277",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.811282,
"lng": -65.224445
},
{
"proveedor": "MACCARINI RAUL ENRIQUE",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Las Piedras 967",
"tel": "422-4399",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.833577,
"lng": -65.212907
},
{
"proveedor": "MADERPLAK",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"CONSTRUCCIÓN EN SECO",
"MADERAS",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Av. Roca 1999",
"tel": "424-6860",
"whatsapp": "",
"mail": "",
"web": "ventas@maderplak.com",
"lat": -27.168002,
"lng": -65.493281
},
{
"proveedor": "MAK CONSTRUCCIONES S.R.L",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS"
],
"direccion": "Av. Soldati 204",
"tel": "422-9052",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.82977,
"lng": -65.193903
},
{
"proveedor": "MAK CONSTRUCCIONES S.R.L",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av Soldati 204",
"tel": "422-9052",
"whatsapp": "",
"mail": "info@makconstruccionsrl.com.ar",
"web": "",
"lat": -26.82977,
"lng": -65.193903
},
{
"proveedor": "MARCHETTI GOMA",
"provincia": "Tucumán",
"rubros": [
"GOMA, ARTÍCULOS"
],
"direccion": "Cristo Rey 645 (Manantial)",
"tel": "439-2617",
"whatsapp": "",
"mail": "info@marchettigoma.com",
"web": "",
"lat": -26.847409,
"lng": -65.289312
},
{
"proveedor": "MARCHIANO",
"provincia": "Tucumán",
"rubros": [
"PORTONES AUTOMÁTICOS"
],
"direccion": "Paraguay 981",
"tel": "156-780252",
"whatsapp": "",
"mail": "dmarchiano@hotmail.com",
"web": "",
"lat": -26.80732,
"lng": -65.209374
},
{
"proveedor": "MARMOLERIA GALVEZ",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Carlos Pellegrini 1602",
"tel": "381 639-4749",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832633,
"lng": -65.227988
},
{
"proveedor": "MARMOLERIA GALVEZ",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Lavalle 2722",
"tel": "381 415-5846",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832717,
"lng": -65.241168
},
{
"proveedor": "MARMOLERIA LUJAN",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Don Bosco 2474",
"tel": "451-4802",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.820135,
"lng": -65.233865
},
{
"proveedor": "MARMOLERIA SOSA",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Av. Eva Perón 357 - Lastenia",
"tel": "426-1539",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.862533,
"lng": -65.159845
},
{
"proveedor": "MARMOLERÍA Y FCA. DE MOSAICOS ITALIA",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS",
"MOSAICOS",
"PISOS Y REVESTIMIENTOS"
],
"direccion": "Mendoza 1445",
"tel": "421-1749",
"whatsapp": "",
"mail": "marmoleriaitaliasrl@hotmail.com",
"web": "",
"lat": -26.825128,
"lng": -65.218598
},
{
"proveedor": "MAROLA",
"provincia": "Tucumán",
"rubros": [
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"BOMBAS PARA AGUA",
"ENERGÍA SOLAR",
"GRUPOS ELECTRÓGENOS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"MOTORES ELÉCTRICOS",
"PORTONES AUTOMÁTICOS",
"SISTEMAS DE BOMBEO",
"VENTILACIÓN INDUSTRIAL"
],
"direccion": "Libertad 462",
"tel": "432-1553",
"whatsapp": "",
"mail": "dardosancre@gmail.com / alejandrabo40@gmail.com",
"web": "",
"lat": -26.833344,
"lng": -65.224794
},
{
"proveedor": "MARTÍN SÁNCHEZ",
"provincia": "Tucumán",
"rubros": [
"PINTURA DE OBRA"
],
"direccion": "Santiago del Estero 2528",
"tel": "155043558",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814378,
"lng": -65.2509
},
{
"proveedor": "MASTER INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Crisóstomo Álvarez 434",
"tel": "421-8880",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832599,
"lng": -65.204089
},
{
"proveedor": "MATAFUEGOS LIBERTAD",
"provincia": "Tucumán",
"rubros": [
"MATAFUEGOS Y SERVICIOS CONTRA INCENDIOS"
],
"direccion": "Mendoza 2821",
"tel": "423-4409",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826698,
"lng": -65.211756
},
{
"proveedor": "MATEO CONSTRUCTORA S.R.L",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Juramento 94",
"tel": "428-7362",
"whatsapp": "",
"mail": "mateoconstructora@yahoo.com.ar",
"web": "",
"lat": -26.817403,
"lng": -65.192134
},
{
"proveedor": "MEDICI & CIA",
"provincia": "Tucumán",
"rubros": [
"BOMBAS PARA AGUA",
"MOTORES ELÉCTRICOS"
],
"direccion": "San Juan 256",
"tel": "423-7474",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826387,
"lng": -65.199847
},
{
"proveedor": "MEDITERRÁNEO S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Av. Mitre 547",
"tel": "433-0349",
"whatsapp": "",
"mail": "info@mediterraneosa.com.ar",
"web": "",
"lat": -26.820636,
"lng": -65.216436
},
{
"proveedor": "MEGA ELECTRICIDAD",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Junín 212",
"tel": "430-0108",
"whatsapp": "",
"mail": "megaelectricidad@arnet.com.ar",
"web": "",
"lat": -26.827117,
"lng": -65.208629
},
{
"proveedor": "MEGA ELECTRICIDAD",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "24 de Septiembre 1350",
"tel": "424-2300",
"whatsapp": "",
"mail": "megaelectricidad@arnet.com.ar",
"web": "",
"lat": -27.345029,
"lng": -65.591342
},
{
"proveedor": "MEMBRANAZO",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ASFALTOS",
"IMPERMEABILIZACIONES",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Roca 2264",
"tel": "436-3588",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.168002,
"lng": -65.493281
},
{
"proveedor": "MENA A. EDUARDO",
"provincia": "Tucumán",
"rubros": [
"CARPINTERÍA METÁLICA",
"CHAPAS (CORTE Y PEGADO)"
],
"direccion": "Av. Alem 1136",
"tel": "429-1999",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.052151,
"lng": -65.394372
},
{
"proveedor": "MENHIRES INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Santa Fé 640",
"tel": "422-8539",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.819771,
"lng": -65.204164
},
{
"proveedor": "MERKUSA",
"provincia": "Tucumán",
"rubros": [
"BOMBAS PARA AGUA",
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MOTORES ELÉCTRICOS",
"REPARACIÓN DE HERRAMIENTAS ELÉCTRICAS",
"SEGURIDAD INDUSTRIAL"
],
"direccion": "12 de Octubre 845",
"tel": "423-9201",
"whatsapp": "",
"mail": "administracion@merkusa.com.ar",
"web": "",
"lat": -26.81634,
"lng": -65.216929
},
{
"proveedor": "MERKUSA S.R.L.",
"provincia": "Tucumán",
"rubros": [
"GRUPOS ELECTRÓGENOS"
],
"direccion": "12 de Octubre 845",
"tel": "423-7474",
"whatsapp": "",
"mail": "administracion@merkusa.com.ar",
"web": "",
"lat": -26.81634,
"lng": -65.216929
},
{
"proveedor": "METALURGICA FATUM",
"provincia": "Tucumán",
"rubros": [
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Santiago 2675",
"tel": "423-6555",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.735464,
"lng": -65.248243
},
{
"proveedor": "METALURGICA MALABIA S.H",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA",
"CARPINTERÍA METÁLICA"
],
"direccion": "Mariano Moreno 1996",
"tel": "489-8006",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.431122,
"lng": -65.611958
},
{
"proveedor": "METALÚRGICA MALABIA",
"provincia": "Tucumán",
"rubros": [
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Mariano Moreno 1996",
"tel": "429-1999",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.431122,
"lng": -65.611958
},
{
"proveedor": "MF ELECTRÓNICA",
"provincia": "Tucumán",
"rubros": [
"ALARMAS",
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "San Isidro de Lules",
"tel": "155-9444-26",
"whatsapp": "",
"mail": "mfelectronica@hotmail.com",
"web": "",
"lat": -26.922219,
"lng": -65.337761
},
{
"proveedor": "MICROCEMENTO TUCUMAN",
"provincia": "Tucumán",
"rubros": [
"MICROCEMENTOS - PISOS INDUSTRIALES",
"PISOS IMPRESOS DE HORMIGÓN"
],
"direccion": "Lamadrid 1043",
"tel": "424-7273",
"whatsapp": "",
"mail": "microcementotucuman@gmail.com",
"web": "www.microcementotucuman.com.ar",
"lat": -26.835838,
"lng": -65.21481
},
{
"proveedor": "MINA NATALIO",
"provincia": "Tucumán",
"rubros": [
"MARMOLERÍAS"
],
"direccion": "Mendoza 1655",
"tel": "423-4589",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824431,
"lng": -65.221697
},
{
"proveedor": "MINAHK INSTALACIONES",
"provincia": "Tucumán",
"rubros": [
"CONTRATISTAS DE OBRAS",
"GAS",
"INSTALADORES SANITARIOS"
],
"direccion": "Mendoza 3569",
"tel": "423-8764",
"whatsapp": "",
"mail": "minahksrl@arnet.com.ar",
"web": "",
"lat": -26.826698,
"lng": -65.211756
},
{
"proveedor": "MIOTTI  GAS",
"provincia": "Tucumán",
"rubros": [
"GAS"
],
"direccion": "Av. Belgrano 1890",
"tel": "433-1694",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815323,
"lng": -65.2183
},
{
"proveedor": "MIOTTI SANITARIOS S.R.L",
"provincia": "Tucumán",
"rubros": [
"GAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Suipacha 212",
"tel": "497-6395",
"whatsapp": "",
"mail": "hugomiotti@hotmail.com.ar",
"web": "",
"lat": -26.825469,
"lng": -65.216347
},
{
"proveedor": "MOLINA VIDRIOS",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Rivadavia 1102",
"tel": "422-0111",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.816231,
"lng": -65.198141
},
{
"proveedor": "MORAN REVESTIMIENTOS",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Mitre 217",
"tel": "422-2692",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.825107,
"lng": -65.21767
},
{
"proveedor": "MOSAICOS CESCA HNOS. S.R.L",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"MARMOLERÍAS"
],
"direccion": "12 de Octubre 245",
"tel": "421-2485",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824386,
"lng": -65.219145
},
{
"proveedor": "MÁXIMO COLETTI",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Muñecas 621",
"tel": "421-3564",
"whatsapp": "",
"mail": "arquitectura@maximocoletti.com",
"web": "",
"lat": -26.82222,
"lng": -65.203869
},
{
"proveedor": "NASTIQUE",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Lavalle 3104",
"tel": "432-5023",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.831775,
"lng": -65.246977
},
{
"proveedor": "NC",
"provincia": "Tucumán",
"rubros": [
"GAS"
],
"direccion": "Lamadrid 333",
"tel": "424-8739",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838276,
"lng": -65.203923
},
{
"proveedor": "NC SANITARIOS",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "Lamadrid 333",
"tel": "424-8739",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838276,
"lng": -65.203923
},
{
"proveedor": "NEOCON S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Santiago Pb 21",
"tel": "432-7272",
"whatsapp": "",
"mail": "vsamara@neocon.com.ar",
"web": "",
"lat": -26.735464,
"lng": -65.248243
},
{
"proveedor": "NOA MATAFUEGOS",
"provincia": "Tucumán",
"rubros": [
"MATAFUEGOS Y SERVICIOS CONTRA INCENDIOS"
],
"direccion": "Ayacucho 949",
"tel": "424-4096",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.842991,
"lng": -65.212481
},
{
"proveedor": "NORCOLOR S.R.L",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Belgrano 1752",
"tel": "433-4071",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815323,
"lng": -65.2183
},
{
"proveedor": "NORTPLAS PVC",
"provincia": "Tucumán",
"rubros": [
"GAS"
],
"direccion": "Av. Néstor Kirchner 1839",
"tel": "4207778",
"whatsapp": "381 5805600",
"mail": "nortplas.pvc@hotmail.com",
"web": "",
"lat": -26.839936,
"lng": -65.224563
},
{
"proveedor": "NORVIGUET",
"provincia": "Tucumán",
"rubros": [
"BLOQUES (FÁBRICAS)",
"EXCAVACIONES - MOVIMIENTO DE SUELOS",
"HORMIGÓN ELABORADO",
"PREMOLDEADOS"
],
"direccion": "24 de Septiembre 675 - PB",
"tel": "381 453-4900",
"whatsapp": "",
"mail": "",
"web": "www.norviguet.com.ar",
"lat": -26.838455,
"lng": -65.22861
},
{
"proveedor": "NORVIGUET",
"provincia": "Tucumán",
"rubros": [
"BLOQUES (FÁBRICAS)",
"EXCAVACIONES - MOVIMIENTO DE SUELOS",
"HORMIGÓN ELABORADO",
"PREMOLDEADOS"
],
"direccion": "Av. Nestor Kirchner 1801",
"tel": "381 453-4900",
"whatsapp": "",
"mail": "",
"web": "www.norviguet.com.ar",
"lat": -26.838455,
"lng": -65.22861
},
{
"proveedor": "OBRAPLUS",
"provincia": "Tucumán",
"rubros": [
"TANQUES PARA AGUAS"
],
"direccion": "Lavalle 3417",
"tel": "432-1635",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.830846,
"lng": -65.250791
},
{
"proveedor": "OLEA HNOS.",
"provincia": "Tucumán",
"rubros": [
"CHAPAS",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Congreso 193 (Monteros)",
"tel": "42-6633",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.164105,
"lng": -65.491758
},
{
"proveedor": "OMODEO S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "24 de Septiembre 549",
"tel": "421-3384",
"whatsapp": "",
"mail": "empresa@omodeo.com.ar",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "OSCAR BASILOTTA E HIJOS",
"provincia": "Tucumán",
"rubros": [
"CÁMARAS FRIGORÍFICAS",
"POLIURETANO"
],
"direccion": "Bolivia 4781",
"tel": "155-6169-04",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.811321,
"lng": -65.203065
},
{
"proveedor": "OSMOTEC",
"provincia": "Tucumán",
"rubros": [
"AISLACIONES HIDRÓFUGAS"
],
"direccion": "24 de Septiembre 1175",
"tel": "307-5700",
"whatsapp": "",
"mail": "",
"web": "www.osmo-tec.com.ar",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "OSTENGO INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Av. Siria 1006",
"tel": "422-9469",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815956,
"lng": -65.207557
},
{
"proveedor": "OTTINO ASCENSORES",
"provincia": "Tucumán",
"rubros": [
"ASCENSORES"
],
"direccion": "9 de Julio 355",
"tel": "154-020-068",
"whatsapp": "",
"mail": "gaesser@hotmail.com   / luisdottino@hotmail.com",
"web": "",
"lat": -26.835447,
"lng": -65.20609
},
{
"proveedor": "PABLO SCROCCHI",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Saavedra 589",
"tel": "423-7764",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.820369,
"lng": -65.232786
},
{
"proveedor": "PILETA’S",
"provincia": "Tucumán",
"rubros": [
"PILETAS"
],
"direccion": "Av. Aconquija 182",
"tel": "435-0100",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.817902,
"lng": -65.267333
},
{
"proveedor": "PINTURERIA MAX",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Catamarca 222",
"tel": "422-4014",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826312,
"lng": -65.211754
},
{
"proveedor": "PINTURERIA SAENZ PEÑA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Saenz Peña 648",
"tel": "424-8141",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.841546,
"lng": -65.199128
},
{
"proveedor": "PINTURERIA SAENZ PEÑA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "24 de Septiembre 586",
"tel": "431-3230",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "PINTURERIA SAN JUAN",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "San Juan 3513",
"tel": "433-1064",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824048,
"lng": -65.210249
},
{
"proveedor": "PINTURERIA SAN JUAN",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Siria 1603",
"tel": "427-8585",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.808069,
"lng": -65.205094
},
{
"proveedor": "PINTURERÍA AEROPUERTO",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"PINTURERÍAS"
],
"direccion": "Av. Benjamín Áraoz 1196",
"tel": "4303540",
"whatsapp": "",
"mail": "pintureriaaeropuerto@hotmail.com",
"web": "",
"lat": -26.835826,
"lng": -65.179651
},
{
"proveedor": "PINTURERÍA AEROPUERTO",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"PINTURERÍAS"
],
"direccion": "Av. Belgrano 2085",
"tel": "4330307",
"whatsapp": "",
"mail": "pintureriaaeropuerto@hotmail.com",
"web": "",
"lat": -26.812058,
"lng": -65.235351
},
{
"proveedor": "PINTURERÍA FARBE",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "España 1700 (Concepción)",
"tel": "-",
"whatsapp": "",
"mail": "farbepintureria@yuhmak.com.ar",
"web": "",
"lat": -27.347804,
"lng": -65.585148
},
{
"proveedor": "PINTURERÍA ITALIA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Italia 1465 (Concepción)",
"tel": "422-671",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.34211,
"lng": -65.600548
},
{
"proveedor": "PISONOR",
"provincia": "Tucumán",
"rubros": [
"MOSAICOS"
],
"direccion": "Lavalle 2621",
"tel": "433-1023",
"whatsapp": "",
"mail": "juanfdangelo@yahoo.com.ar",
"web": "",
"lat": -26.831799,
"lng": -65.245743
},
{
"proveedor": "PLASTICAUCHO",
"provincia": "Tucumán",
"rubros": [
"GOMA, ARTÍCULOS"
],
"direccion": "Lavalle 2965",
"tel": "433-0723",
"whatsapp": "",
"mail": "plasticaucho@sinectis.com.ar",
"web": "",
"lat": -26.831824,
"lng": -65.245598
},
{
"proveedor": "POSITRON",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "C. Alvarez 1833",
"tel": "423-9740",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.555477,
"lng": -65.620921
},
{
"proveedor": "PREMOL SRL",
"provincia": "Tucumán",
"rubros": [
"PREMOLDEADOS"
],
"direccion": "Av. del Río s/n. Las Talitas",
"tel": "4370904",
"whatsapp": "",
"mail": "premol_srl@hotmail.com",
"web": "",
"lat": -26.787872,
"lng": -65.174038
},
{
"proveedor": "Propain",
"provincia": "Tucumán",
"rubros": [
"LUSTRES Y LAQUEADOS"
],
"direccion": "Mendoza 2746",
"tel": "423-9975",
"whatsapp": "",
"mail": "santiagoansar@hotmail.com",
"web": "",
"lat": -26.826698,
"lng": -65.211756
},
{
"proveedor": "PROPAINT",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Mendoza 2746",
"tel": "423-9975",
"whatsapp": "",
"mail": "santiagoansar@hotmail.com",
"web": "",
"lat": -26.826698,
"lng": -65.211756
},
{
"proveedor": "QUIROS FERRETERÍA",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PINTURERÍAS"
],
"direccion": "Av. Miguel Critto 355 (T. Valle)",
"tel": "421-011",
"whatsapp": "",
"mail": "info@quirosferreteria.com",
"web": "",
"lat": -26.85382,
"lng": -65.703782
},
{
"proveedor": "QUIROS FERRETERÍA",
"provincia": "Tucumán",
"rubros": [
"FERRETERÍAS - BULONERÍAS",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN",
"PINTURERÍAS"
],
"direccion": "Av. Miguel Critto 1400 (T. Valle)",
"tel": "-",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.854446,
"lng": -65.70061
},
{
"proveedor": "RAKÚ",
"provincia": "Tucumán",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "25 de Mayo 435",
"tel": "421-3637",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.286615,
"lng": -65.394422
},
{
"proveedor": "REFRIG. DE FUSCO",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Marco Avellaneda 335",
"tel": "430-6458",
"whatsapp": "",
"mail": "info@totalinetuc.com.ar",
"web": "",
"lat": -26.824158,
"lng": -65.214224
},
{
"proveedor": "REFRIGERACIÓN NORTE",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Santiago 1203",
"tel": "431-1318",
"whatsapp": "",
"mail": "refrinorte@infovia.com.ar",
"web": "",
"lat": -26.735464,
"lng": -65.248243
},
{
"proveedor": "REGINATO S.R.L.",
"provincia": "Tucumán",
"rubros": [
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "Av. Coronel Suárez 349",
"tel": "422-6903",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.834306,
"lng": -65.180692
},
{
"proveedor": "REMETAL S.A.",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"CHAPAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"HIERROS"
],
"direccion": "Av. Roca 3615",
"tel": "433-1133",
"whatsapp": "",
"mail": "info@remetal.com.ar",
"web": "",
"lat": -27.166441,
"lng": -65.491955
},
{
"proveedor": "REMETAL S.A.",
"provincia": "Tucumán",
"rubros": [
"ACERO INOXIDABLE",
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"ALAMBRES",
"CHAPAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"HIERROS"
],
"direccion": "Benjamín Aráoz 1164",
"tel": "422-1310",
"whatsapp": "",
"mail": "info@remetal.com.ar",
"web": "",
"lat": -26.835751,
"lng": -65.180048
},
{
"proveedor": "REMOAR",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Av. Belgrano 1950",
"tel": "423-0967",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.812058,
"lng": -65.235351
},
{
"proveedor": "REMOAR",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS",
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "San Juan 601",
"tel": "421-8048",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.825215,
"lng": -65.204813
},
{
"proveedor": "RENO TUCUMÁN - KÜCHENDESIGN",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "San Juan 28",
"tel": "497-6760",
"whatsapp": "",
"mail": "tucumancentro@amoblamientosreno.com",
"web": "",
"lat": -26.82689,
"lng": -65.196335
},
{
"proveedor": "REQUENA MADERAS",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "Sarmiento 546 (Concepción)",
"tel": "-",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.343612,
"lng": -65.585459
},
{
"proveedor": "RIPIERA GUERRERO",
"provincia": "Tucumán",
"rubros": [
"ÁRIDOS- CANTERAS"
],
"direccion": "Las Cañitas - Nogales",
"tel": "381-589-7154",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.697854,
"lng": -65.171558
},
{
"proveedor": "Roberto A. Villafañe",
"provincia": "Tucumán",
"rubros": [
"LADRILLOS (CORTADAS)",
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "San Alberto (Alderetes)",
"tel": "156815652",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.783363,
"lng": -65.139742
},
{
"proveedor": "RONDEAU S.R.L.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Santa Fe 447",
"tel": "421-9489",
"whatsapp": "",
"mail": "rondeausrl@arnet.com.ar",
"web": "",
"lat": -26.820241,
"lng": -65.201289
},
{
"proveedor": "ROSSO MATERIALES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Av. Alem 595",
"tel": "420-5000",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.835843,
"lng": -65.220517
},
{
"proveedor": "ROSSO MATERIALES",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "25 de Mayo 69 (Monteros)",
"tel": "426-583",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.167978,
"lng": -65.496948
},
{
"proveedor": "RÍO AZUL INGENIERIA SRL",
"provincia": "Tucumán",
"rubros": [
"ANDAMIOS METÁLICOS",
"CAÑOS (DOBLADO)",
"CHAPAS (CORTE Y PEGADO)",
"EMPRESAS CONSTRUCTORAS",
"ESTRUCTURAS METÁLICAS",
"GRÚAS",
"TANQUES AUSTRALIANOS",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Lavalle 2974",
"tel": "423-3340",
"whatsapp": "",
"mail": "rioazul@rioazul.com.ar",
"web": "www.rioazul.com.ar",
"lat": -26.831992,
"lng": -65.24545
},
{
"proveedor": "S.K. TELEFONÍA",
"provincia": "Tucumán",
"rubros": [
"TELEFONÍAS - VIDEOPORTEROS"
],
"direccion": "Mendoza 1332",
"tel": "421-5560",
"whatsapp": "",
"mail": "sktelefonia@hotmail.com",
"web": "",
"lat": -26.825678,
"lng": -65.216864
},
{
"proveedor": "SALVATORE LETREROS",
"provincia": "Tucumán",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Thames 662",
"tel": "432-1240",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.024908,
"lng": -65.301241
},
{
"proveedor": "SAN ROMAN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Jujuy 3500",
"tel": "429-2527",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.831827,
"lng": -65.211402
},
{
"proveedor": "SAN VALERO SRL Fca.",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "William Cross 3305",
"tel": "427-4788",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.789265,
"lng": -65.190203
},
{
"proveedor": "SANTIAGO KOHN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Maipú 471",
"tel": "421-8322",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824072,
"lng": -65.206038
},
{
"proveedor": "SCHILMAN INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Marcos Paz 295",
"tel": "422-4488",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.821997,
"lng": -65.199219
},
{
"proveedor": "SCREEN",
"provincia": "Tucumán",
"rubros": [
"CORTINAS - PERSIANAS",
"CORTINAS METÁLICAS",
"DECORACIÓN Y EQUIPAMIENTO",
"PORTONES AUTOMÁTICOS",
"TOLDOS"
],
"direccion": "España 714",
"tel": "421-6380",
"whatsapp": "",
"mail": "arqdsavino@hotmail.com",
"web": "",
"lat": -26.816802,
"lng": -65.204822
},
{
"proveedor": "SEBANA INGENIERÍA",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO",
"CALDERAS - CALEFACCIÓN"
],
"direccion": "Bolívar 630",
"tel": "420-2949",
"whatsapp": "",
"mail": "sebana@gmail.com",
"web": "",
"lat": -26.840139,
"lng": -65.209179
},
{
"proveedor": "SEDA",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "Frías Silva 164",
"tel": "423-0747",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.829017,
"lng": -65.225209
},
{
"proveedor": "SEPÚLVEDA Y ASOC.",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO",
"ALUMBRADO PUBLICO",
"CALDERAS - CALEFACCIÓN",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Santiago 1462",
"tel": "432-3218",
"whatsapp": "",
"mail": "sepulyasoc@sepulyasoc.com.ar",
"web": "",
"lat": -26.735464,
"lng": -65.248243
},
{
"proveedor": "SERVIGRÚAS",
"provincia": "Tucumán",
"rubros": [
"GRÚAS"
],
"direccion": "Av. Siria 2141",
"tel": "427-0271",
"whatsapp": "",
"mail": "servigruas@servigruas.com.ar",
"web": "",
"lat": -26.800899,
"lng": -65.203295
},
{
"proveedor": "SHALLOR CRYSS",
"provincia": "Tucumán",
"rubros": [
"ALQUILERES TEMPORARIOS"
],
"direccion": "San Luis 102. S.M de Tuc",
"tel": "",
"whatsapp": "54 381 511-3001",
"mail": "",
"web": "https://linktr.ee/shallorcryss_",
"lat": -26.829774,
"lng": -65.217362
},
{
"proveedor": "SILVA PINTURERIA",
"provincia": "Tucumán",
"rubros": [
"PINTURERÍAS"
],
"direccion": "Av. Colón 120",
"tel": "432-0323",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.826923,
"lng": -65.23256
},
{
"proveedor": "SINTESIS",
"provincia": "Tucumán",
"rubros": [
"ABERTURAS",
"AMOBLAMIENTOS",
"CARPINTERÍA DE MADERA",
"PARQUETS- PISOS FLOTANTES"
],
"direccion": "Av. Roca 3200",
"tel": "436-0837",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.168002,
"lng": -65.493281
},
{
"proveedor": "SINTESIS AMOBLAMIENTOS",
"provincia": "Tucumán",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO"
],
"direccion": "Av. Roca 3200",
"tel": "436-0837",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -27.168002,
"lng": -65.493281
},
{
"proveedor": "SISTELCO",
"provincia": "Tucumán",
"rubros": [
"SISTEMAS DE VOZ Y DATOS"
],
"direccion": "Buenos Aires 362",
"tel": "431-1151",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.835455,
"lng": -65.207389
},
{
"proveedor": "SOCOLISKI INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Crisóstomo Álvarez 488",
"tel": "422-4301",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.832449,
"lng": -65.204819
},
{
"proveedor": "SOFI ILUMINACIÓN",
"provincia": "Tucumán",
"rubros": [
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Mitre 255",
"tel": "431-0906",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.824642,
"lng": -65.21755
},
{
"proveedor": "SOLDPLAST",
"provincia": "Tucumán",
"rubros": [
"PLÁSTICOS PARA LA CONSTRUCCIÓN"
],
"direccion": "San Lorenzo 2063",
"tel": "423-2401",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828539,
"lng": -65.229224
},
{
"proveedor": "SOLER CIMAG",
"provincia": "Tucumán",
"rubros": [
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Asunción 844",
"tel": "433-0766",
"whatsapp": "",
"mail": "carlintucu@hotmail.com.ar",
"web": "",
"lat": -26.794649,
"lng": -65.214848
},
{
"proveedor": "SOPORTEC",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO",
"AQUILER DE MÁQUINAS Y HERRAMIENTAS",
"CÁMARAS FRIGORÍFICAS",
"CONTRATISTAS DE OBRAS"
],
"direccion": "Pedro León Gallo 735",
"tel": "155-6169-04",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.846215,
"lng": -65.255213
},
{
"proveedor": "STAGNETTO INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Crisóstomo Álvarez 376",
"tel": "430-1226",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.83275,
"lng": -65.203164
},
{
"proveedor": "TALME S.A.",
"provincia": "Tucumán",
"rubros": [
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Martín Berho 281",
"tel": "428-3256",
"whatsapp": "",
"mail": "talmesa@uolsinectis.com.ar",
"web": "",
"lat": -26.813982,
"lng": -65.173776
},
{
"proveedor": "TECNOPOR",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS"
],
"direccion": "Lorenzo 2041",
"tel": "432-2253",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828733,
"lng": -65.228845
},
{
"proveedor": "TECNOPOR",
"provincia": "Tucumán",
"rubros": [
"CONSTRUCCIÓN EN SECO"
],
"direccion": "San Lorenzo 2041",
"tel": "432-2253",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828733,
"lng": -65.228845
},
{
"proveedor": "TECNOPOR (FCA.)",
"provincia": "Tucumán",
"rubros": [
"CIELORRASOS"
],
"direccion": "San Lorenzo 2041",
"tel": "432-2253",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828733,
"lng": -65.228845
},
{
"proveedor": "TECOM SRL",
"provincia": "Tucumán",
"rubros": [
"AIRE ACONDICIONADO"
],
"direccion": "Corrientes 1866",
"tel": "432-3636",
"whatsapp": "",
"mail": "tecomtuc@arnetbiz.com.ar",
"web": "",
"lat": -26.82027,
"lng": -65.214898
},
{
"proveedor": "TENSOLITE S.A.",
"provincia": "Tucumán",
"rubros": [
"BLOQUES (FÁBRICAS)",
"COLUMNAS PARA ALUMBRADO",
"EMPRESAS CONSTRUCTORAS",
"PREMOLDEADOS"
],
"direccion": "Ruta 9 km 1298 (Los Pocitos)",
"tel": "431-0148",
"whatsapp": "",
"mail": "tensolite@tensolite.com.ar",
"web": "",
"lat": -26.783916,
"lng": -65.191244
},
{
"proveedor": "TENSOLITE S.A.",
"provincia": "Tucumán",
"rubros": [
"TANQUES AUSTRALIANOS",
"TEJAS (FÁBRICAS)"
],
"direccion": "Ruta 9 km 1298 (Pocitos)",
"tel": "437-2215",
"whatsapp": "",
"mail": "tensolite@tensolite.com.ar",
"web": "",
"lat": -26.77916,
"lng": -65.211568
},
{
"proveedor": "TER-NOR",
"provincia": "Tucumán",
"rubros": [
"MADERAS"
],
"direccion": "Marcos Paz 1977",
"tel": "423-1207",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.816667,
"lng": -65.283333
},
{
"proveedor": "TINCANI",
"provincia": "Tucumán",
"rubros": [
"CAÑOS (DOBLADO)",
"CHAPAS (CORTE Y PEGADO)"
],
"direccion": "Lamadrid 1745",
"tel": "503-5641",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.833619,
"lng": -65.225777
},
{
"proveedor": "TRANSPORTE GOMEZ",
"provincia": "Tucumán",
"rubros": [
"ÁRIDOS- CANTERAS",
"CONTENEDORES",
"EXCAVACIONES - MOVIMIENTO DE SUELOS"
],
"direccion": "Av. Pedro Miguel Aráoz 315",
"tel": "155-097-749 / 431-4263",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.847697,
"lng": -65.191036
},
{
"proveedor": "TRANSPORTE NACUSSE",
"provincia": "Tucumán",
"rubros": [
"ÁRIDOS- CANTERAS",
"CONTENEDORES"
],
"direccion": "Ruta 306 Km 19",
"tel": "422-0075",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.976161,
"lng": -65.216536
},
{
"proveedor": "TRESA",
"provincia": "Tucumán",
"rubros": [
"CHAPAS"
],
"direccion": "Belgrano 20 (El MANANTIAL.-Lules)",
"tel": "439-1275",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.845531,
"lng": -65.286782
},
{
"proveedor": "TUCUMAN  PROPIEDADES",
"provincia": "Tucumán",
"rubros": [
"INMOBILIARIAS"
],
"direccion": "Crisóstomo Álvarez 1451",
"tel": "424-4677",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.829397,
"lng": -65.219376
},
{
"proveedor": "TUCUMAN BULONES SRL",
"provincia": "Tucumán",
"rubros": [
"BULONERÍAS",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL"
],
"direccion": "San Martín 1492",
"tel": "400-4578",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.8265,
"lng": -65.219631
},
{
"proveedor": "TUCUMAN HERRAJES",
"provincia": "Tucumán",
"rubros": [
"HERRAJES"
],
"direccion": "José Colombres 68",
"tel": "421-4985",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.828355,
"lng": -65.213853
},
{
"proveedor": "TUCUMAN LAJAS",
"provincia": "Tucumán",
"rubros": [
"DECORACIÓN Y EQUIPAMIENTO",
"MARMOLERÍAS",
"MOSAICOS",
"REFRACTARIOS"
],
"direccion": "Av. Roca 3195",
"tel": "423-0800",
"whatsapp": "",
"mail": "tucumanlajas@hotmail.com",
"web": "www.tucumanlajas.com.ar",
"lat": -26.834506,
"lng": -65.248901
},
{
"proveedor": "TUCUMAN VIDRIOS SRL",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Siria 1617",
"tel": "427-1450",
"whatsapp": "",
"mail": "tucumanvidrios@tucumanvidrios.com.ar",
"web": "",
"lat": -26.807809,
"lng": -65.205029
},
{
"proveedor": "TUCUMÁN ALAMBRES",
"provincia": "Tucumán",
"rubros": [
"ALAMBRES",
"FERRETERÍAS- FERRETERÍA INDUSTRIAL",
"MATERIALES DE CONSTRUCCIÓN",
"PREMOLDEADOS"
],
"direccion": "Lavalle 2946",
"tel": "451-4980",
"whatsapp": "",
"mail": "informes@tucumanalambres.com.ar",
"web": "www.tucumanalambres.com.ar",
"lat": -26.832064,
"lng": -65.245018
},
{
"proveedor": "TUCUMÁN CARTELES",
"provincia": "Tucumán",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "Thames 866",
"tel": "435-5610",
"whatsapp": "",
"mail": "tuccarteles@yahoo.com.ar",
"web": "",
"lat": -26.814164,
"lng": -65.226101
},
{
"proveedor": "TUCUMÁN TECHOS",
"provincia": "Tucumán",
"rubros": [
"AISLACIONES HIDRÓFUGAS",
"TECHOS - TINGLADOS - ESTRUCTURAS METÁLICAS"
],
"direccion": "Jujuy 946",
"tel": "420-2100",
"whatsapp": "",
"mail": "tucumantechos@gmail.com",
"web": "",
"lat": -26.842694,
"lng": -65.21378
},
{
"proveedor": "V.H.A. CONSTRUCTORA S.A.",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS"
],
"direccion": "San Lorenzo 496",
"tel": "431-0152",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.833665,
"lng": -65.205263
},
{
"proveedor": "VIAMONTE",
"provincia": "Tucumán",
"rubros": [
"MATERIALES DE CONSTRUCCIÓN"
],
"direccion": "Viamonte 1885",
"tel": "434-4868",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.814855,
"lng": -65.238989
},
{
"proveedor": "VIDRIERIA RUSSO",
"provincia": "Tucumán",
"rubros": [
"VIDRIOS - ESPEJOS"
],
"direccion": "San Martín 62 (Monteros)",
"tel": "427-635",
"whatsapp": "",
"mail": "humbertojoserusso@yahoo.es",
"web": "",
"lat": -27.166063,
"lng": -65.498777
},
{
"proveedor": "VIDRIERÍA DEL CENTRO",
"provincia": "Tucumán",
"rubros": [
"ALUMINIO - CARPINTERIA",
"VIDRIERÍAS"
],
"direccion": "Amador Lucero 651",
"tel": "424-4026",
"whatsapp": "",
"mail": "vidrieriadelcentro@arnet.com.ar",
"web": "",
"lat": -26.845636,
"lng": -65.2345
},
{
"proveedor": "VIDRIOS Y ABERTURAS ROCA",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "Av. Roca 43",
"tel": "420-3379",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.844426,
"lng": -65.200741
},
{
"proveedor": "VISUAL CARTELERÍA",
"provincia": "Tucumán",
"rubros": [
"CARTELERÍA - LETREROS"
],
"direccion": "San Miguel 680",
"tel": "423-5669",
"whatsapp": "",
"mail": "visualtuc@arnet.com.ar",
"web": "",
"lat": -26.700925,
"lng": -64.6691
},
{
"proveedor": "VITRIU",
"provincia": "Tucumán",
"rubros": [
"VIDRIERÍAS"
],
"direccion": "España 1234",
"tel": "432-4996",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.815252,
"lng": -65.21255
},
{
"proveedor": "VIVERO SANTA FE",
"provincia": "Tucumán",
"rubros": [
"VIVEROS"
],
"direccion": "Santa Fe 41",
"tel": "431-2902",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.821324,
"lng": -65.195126
},
{
"proveedor": "VOLTAJE",
"provincia": "Tucumán",
"rubros": [
"ILUMINACIÓN LED",
"MATERIALES ELÉCTRICOS - ILUMINACIÓN"
],
"direccion": "Av. Solano Vera 598",
"tel": "381 255-2314 / 381 351-9651",
"whatsapp": "",
"mail": "voltajeventas@gmail.com",
"web": "",
"lat": -26.812931,
"lng": -65.301642
},
{
"proveedor": "WAINER INMOBILIARIA",
"provincia": "Tucumán",
"rubros": [
"EMPRESAS CONSTRUCTORAS",
"INMOBILIARIAS"
],
"direccion": "Lamadrid 791",
"tel": "420-3770",
"whatsapp": "",
"mail": "inmobiliaria.wainer@gmail.com",
"web": "",
"lat": -26.836764,
"lng": -65.210677
},
{
"proveedor": "YUHMAK",
"provincia": "Tucumán",
"rubros": [
"SEGURIDAD INDUSTRIAL"
],
"direccion": "José Colombres 168",
"tel": "452-3233",
"whatsapp": "",
"mail": "yuh3mrep@arnet.com.ar",
"web": "",
"lat": -26.826908,
"lng": -65.213458
},
{
"proveedor": "ZERAMIKO",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"AMOBLAMIENTOS",
"BOMBAS PARA AGUA",
"CAÑOS Y ACCESORIOS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS",
"PISOS Y REVESTIMIENTOS",
"PVC",
"REFRACTARIOS",
"VIDRIOS - ESPEJOS"
],
"direccion": "24 de septiembre 731",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://linktr.ee/zeramiko",
"lat": -26.838761,
"lng": -65.239511
},
{
"proveedor": "ZERAMIKO",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"AMOBLAMIENTOS",
"BOMBAS PARA AGUA",
"CAÑOS Y ACCESORIOS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS",
"PISOS Y REVESTIMIENTOS",
"PVC",
"REFRACTARIOS",
"VIDRIOS - ESPEJOS"
],
"direccion": "Av. Sáenz Peña 602",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://linktr.ee/zeramiko",
"lat": -26.84095,
"lng": -65.198988
},
{
"proveedor": "ZERAMIKO",
"provincia": "Tucumán",
"rubros": [
"AISLAMIENTOS TÉRMICOS Y ACÚSTICOS",
"AMOBLAMIENTOS",
"BOMBAS PARA AGUA",
"CAÑOS Y ACCESORIOS",
"CIELORRASOS",
"CONSTRUCCIÓN EN SECO",
"GAS",
"MATERIALES DE CONSTRUCCIÓN",
"PILETAS",
"PISOS Y REVESTIMIENTOS",
"PVC",
"REFRACTARIOS",
"VIDRIOS - ESPEJOS"
],
"direccion": "Av. Solano Vera 293 Yerba Buena",
"tel": "",
"whatsapp": "",
"mail": "",
"web": "https://linktr.ee/zeramiko",
"lat": -26.82837,
"lng": -65.306035
},
{
"proveedor": "ZIMMERMAN MUEBLES",
"provincia": "Tucumán",
"rubros": [
"AMOBLAMIENTOS"
],
"direccion": "Av. Belgrano 1456",
"tel": "432-1719",
"whatsapp": "",
"mail": "",
"web": "",
"lat": -26.81581,
"lng": -65.21624
}
]

export const RUBROS: string[] = Array.from(
  new Set(GUIA.flatMap((p) => p.rubros))
).sort((a, b) => a.localeCompare(b, 'es'))
