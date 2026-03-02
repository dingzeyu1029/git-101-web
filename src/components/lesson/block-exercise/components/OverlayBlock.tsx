import type { ReactNode } from 'react'

interface OverlayBlockProps {
  children: ReactNode
  isPlaced: boolean
}

export default function OverlayBlock({ children, isPlaced }: OverlayBlockProps) {
  return (
    <div
      className={`px-4 py-2 rounded-lg font-mono text-sm shadow-2xl select-none ${
        isPlaced
          ? 'bg-text-primary text-white'
          : 'bg-bg-card border border-border text-text-primary'
      }`}
    >
      {children}
    </div>
  )
}
