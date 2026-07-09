import React from 'react'
import Svg, { Path, Circle, Rect } from 'react-native-svg'

// Cada entrada devuelve los elementos SVG (paths Lucide de los mockups).
// Los que van rellenos usan fill="currentColor" (resuelve al `color` del <Svg>).
const p = (d: string) => <Path d={d} key={d} />

const ICONS: Record<string, () => React.ReactNode> = {
  home: () => <>{p('M3 10.7 12 3.3l9 7.4')}{p('M5.2 9.4V20.5h13.6V9.4')}{p('M9.6 20.5v-6h4.8v6')}</>,
  store: () => <>{p('M4 9.5V20h16V9.5')}{p('M3.5 4h17l1 5.5a2.6 2.6 0 0 1-5 .6 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5 0 2.6 2.6 0 0 1-5-.6z')}{p('M9.5 20v-5.5h5V20')}</>,
  box: () => <>{p('m21 8-9-5-9 5v8l9 5 9-5z')}{p('m3 8 9 5 9-5')}{p('M12 13v8')}</>,
  briefcase: () => <><Rect x={3} y={7.5} width={18} height={12.5} rx={2} />{p('M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5')}{p('M3 12.7h18')}</>,
  user: () => <><Circle cx={12} cy={8.5} r={3.7} />{p('M5.5 20a6.5 6.5 0 0 1 13 0')}</>,
  pin: () => <>{p('M12 21c4-4.6 6-7.8 6-10.5a6 6 0 1 0-12 0C6 13.2 8 16.4 12 21z')}<Circle cx={12} cy={10.5} r={2.3} /></>,
  search: () => <><Circle cx={11} cy={11} r={7} />{p('m20 20-3.2-3.2')}</>,
  bell: () => <>{p('M18 8.5a6 6 0 1 0-12 0c0 6-2.5 8-2.5 8h17S18 14.5 18 8.5z')}{p('M13.7 21a2 2 0 0 1-3.4 0')}</>,
  check: () => <>{p('m5 12.5 4.5 4.5L19 6.5')}</>,
  chevron: () => <>{p('m9 6 6 6-6 6')}</>,
  back: () => <>{p('M15 5l-7 7 7 7')}</>,
  plus: () => <>{p('M12 5v14M5 12h14')}</>,
  camera: () => <>{p('M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z')}<Circle cx={12} cy={13} r={3.4} /></>,
  wrench: () => <>{p('M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z')}</>,
  zap: () => <>{p('M13 2 4 14h7l-1 8 9-12h-7z')}</>,
  roller: () => <><Rect x={2} y={2} width={16} height={6} rx={2} />{p('M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7')}<Rect x={8} y={16} width={4} height={6} rx={1} /></>,
  wall: () => <><Rect x={3.5} y={5} width={17} height={14} rx={1} />{p('M3.5 9.7h17M3.5 14.3h17M10 5v4.7M15 9.7v4.6M9 14.3V19')}</>,
  flame: () => <>{p('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z')}</>,
  hammer: () => <>{p('m15 12-8.4 8.4a2.1 2.1 0 0 1-3-3L12 9')}{p('M17.6 15 22 10.6')}{p('m20.9 11.7-1.2-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h.86c.85 0 1.65.33 2.25.93l1.25 1.25')}</>,
  leaf: () => <>{p('M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z')}{p('M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12')}</>,
  dots: () => <><Circle cx={5} cy={12} r={1.6} fill="currentColor" stroke="none" /><Circle cx={12} cy={12} r={1.6} fill="currentColor" stroke="none" /><Circle cx={19} cy={12} r={1.6} fill="currentColor" stroke="none" /></>,
  gear: () => <>{p('M19.4 13a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 8 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 3.7 15a1.7 1.7 0 0 0-1.56-1H2a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 3.7 8.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8 4.2h.08A1.7 1.7 0 0 0 9 2.64V2a2 2 0 0 1 4 0v.09A1.7 1.7 0 0 0 14 3.7a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 20.3 8v.08c.14.63.7 1.06 1.7 1.02h.09a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1z')}<Circle cx={12} cy={12} r={3} /></>,
  logout: () => <>{p('M15 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9')}{p('M18 15l3-3-3-3')}{p('M9 12h12')}</>,
  trash: () => <>{p('M4 7h16')}{p('M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2')}{p('M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13')}</>,
  mail: () => <><Rect x={3} y={5.5} width={18} height={13} rx={2.5} />{p('m4 7 8 6 8-6')}</>,
  filter: () => <>{p('M3 5h18l-7 8.2V20l-4-2.2v-4.6z')}</>,
  locate: () => <><Circle cx={12} cy={12} r={6.5} />{p('M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3')}<Circle cx={12} cy={12} r={1.6} fill="currentColor" stroke="none" /></>,
  clock: () => <><Circle cx={12} cy={12} r={8.5} />{p('M12 7.5V12l3 2')}</>,
  chat: () => <>{p('M20 4H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3v4l4-4h9a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z')}</>,
  phone: () => <>{p('M6.5 3.5 9 4l1 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1 .5 2.5a2 2 0 0 1-2 2.3A16 16 0 0 1 4.2 5.5a2 2 0 0 1 2.3-2z')}</>,
  star: () => <Path d="M12 2.3l2.6 5.7 6.2.6-4.7 4.1 1.4 6.1L12 15.8l-5.5 3 1.4-6.1L3.2 8.6l6.2-.6z" fill="currentColor" stroke="none" />,
  badge: () => <>{p('M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z')}{p('m9 12 2 2 4-4')}</>,
}

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  size = 24,
  color = '#16181D',
}: {
  name: IconName
  size?: number
  color?: string
}) {
  const render = ICONS[name]
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      color={color}
      fill="none"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {render ? render() : null}
    </Svg>
  )
}
