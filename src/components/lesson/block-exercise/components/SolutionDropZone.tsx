import type { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/react'
import { motion, useReducedMotion } from 'framer-motion'

interface SolutionDropZoneProps {
  children: ReactNode
  solved: boolean
  shakeSlots: boolean
  overSolution: boolean
}

export default function SolutionDropZone({ children, solved, shakeSlots, overSolution }: SolutionDropZoneProps) {
  const prefersReduced = useReducedMotion()
  const { ref } = useDroppable({ id: 'solution-area' })

  return (
    <motion.div
      ref={ref}
      data-solution-zone
      className={`min-h-14 flex flex-wrap items-center gap-2 px-4 py-3.5 rounded-xl border-2 border-dashed transition-colors ${
        solved
          ? 'border-accent-green/40 bg-accent-green/5'
          : shakeSlots
            ? 'border-accent-red bg-accent-red/5'
            : overSolution
              ? 'border-text-muted bg-bg-secondary'
              : 'border-border bg-bg-secondary'
      }`}
      animate={shakeSlots && !prefersReduced ? { x: [-4, 4, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
