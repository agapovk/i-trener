// Dot grid — точечная сетка 20px
export const GridDotsLayer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='0.9' fill='white'/%3E%3C/svg%3E")`,
      opacity: 0.14,
    }}
  />
)

// Diagonal hatch — 45° штриховка, шаг 8px
export const HatchLayer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cline x1='0' y1='8' x2='8' y2='0' stroke='white' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")`,
      opacity: 0.07,
    }}
  />
)

// Scan lines — горизонтальные полосы (CRT-эффект), шаг 4px
export const ScanLinesLayer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='4'%3E%3Crect x='0' y='0' width='2' height='1' fill='white'/%3E%3C/svg%3E")`,
      opacity: 0.05,
    }}
  />
)

// Crosshatch — перекрёстная штриховка, шаг 12px
export const CrosshatchLayer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12'%3E%3Cpath d='M0 12 L12 0' stroke='white' stroke-width='0.5' fill='none'/%3E%3Cpath d='M0 0 L12 12' stroke='white' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
      opacity: 0.07,
    }}
  />
)

// Grid lines — тонкая прямоугольная сетка 32px (blueprint)
export const GridLinesLayer = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M 32 0 L 0 0 0 32' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
      opacity: 0.07,
    }}
  />
)
