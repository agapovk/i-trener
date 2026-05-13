import type { CSSProperties } from "react"

const base: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 0,
}

// Тонкое зерно — fine grain (оригинал, baseFrequency 0.78, 4 octaves)
export const NoiseLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.06,
    }}
  />
)

// Крупное зерно — coarse grain (baseFrequency 0.35, 2 octaves)
export const CoarseNoiseLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.09,
    }}
  />
)

// Электрический шум — sharp turbulence (type='turbulence', более контрастный)
export const TurbulenceLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.05,
    }}
  />
)

// Мраморные прожилки — marble streaks (асимметричный baseFrequency 0.04 0.7)
export const MarbleLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04 0.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.1,
    }}
  />
)

// Телевизионный статик — TV static (baseFrequency 0.92, 1 octave)
export const StaticLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.08,
    }}
  />
)

// Мягкие облака — clouds/fog (baseFrequency 0.12, 6 octaves)
export const CloudLayer = () => (
  <div
    style={{
      ...base,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.12' numOctaves='6' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.12,
    }}
  />
)

// Виньетка — CSS radial gradient, затемняет края
export const VignetteLayer = () => (
  <div
    style={{
      ...base,
      background: "radial-gradient(ellipse at 50% 0%, transparent 50%, rgba(0,0,0,0.45) 100%)",
    }}
  />
)
