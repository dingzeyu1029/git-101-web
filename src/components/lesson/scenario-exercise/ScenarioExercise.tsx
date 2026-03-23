import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import type { ScenarioExerciseStep } from '../../../types'
import useProgressStore from '../../../stores/progressStore'
import useExerciseNav from '../../../hooks/useExerciseNav'
import ExerciseControls from '../ExerciseControls'

interface ScenarioExerciseProps {
  step: ScenarioExerciseStep
  lessonId: number
}

export default function ScenarioExercise({ step, lessonId }: ScenarioExerciseProps) {
  const completeStep = useProgressStore((s) => s.completeStep)
  const isCompleted = useProgressStore((s) => !!s.completedSteps[`${lessonId}:${step.id}`])

  const correctIndex = step.options.findIndex((o) => o.isCorrect)
  const [selected, setSelected] = useState<number | null>(
    isCompleted && correctIndex !== -1 ? correctIndex : null
  )
  const [shake, setShake] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [showHint, setShowHint] = useState(false)

  function handleCheck() {
    const option = selected !== null ? step.options[selected] : undefined
    if (!option) return false
    if (option.isCorrect) {
      completeStep(lessonId, step.id)
      return true
    }
    setShake(true)
    setHintIndex((prev) => Math.min(prev + 1, (step.hints?.length ?? 1) - 1))
    setTimeout(() => setShake(false), 600)
    return false
  }

  function handleReset() {
    setSelected(null)
    setShake(false)
    setHintIndex(0)
    setShowHint(false)
  }

  function handleToggleHint() {
    setShowHint((prev) => !prev)
  }

  useExerciseNav({ solved: isCompleted, checkFn: handleCheck, checkDisabled: selected === null })

  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-text-primary leading-snug">{step.scenario}</h2>

      <motion.div
        className="space-y-3"
        animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {step.options.map((option, i) => {
          let styles = 'border-border bg-bg-card'

          if (isCompleted && option.isCorrect) {
            styles = 'border-accent-green bg-accent-green/5'
          } else if (i === selected) {
            styles = shake ? 'border-accent-red bg-accent-red/5' : 'border-text-primary bg-bg-secondary'
          }

          return (
            <button
              key={option.command}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary
                ${isCompleted ? 'cursor-default' : 'cursor-pointer'} ${styles} ${
                !isCompleted ? 'hover:border-text-muted' : ''
              }`}
              disabled={isCompleted}
            >
              <code className="bg-bg-card px-2 py-1 rounded text-sm font-mono text-text-primary">
                {option.command}
              </code>
              {(isCompleted || i === selected) && (
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  {option.consequence}
                </p>
              )}
            </button>
          )
        })}
      </motion.div>

      {isCompleted && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm leading-relaxed bg-accent-green/5 border border-accent-green/20">
          <CheckCircle size={18} className="text-accent-green shrink-0" />
          <p className="text-text-secondary">{step.explanation}</p>
        </div>
      )}

      <ExerciseControls
        hints={step.hints}
        hintIndex={hintIndex}
        showHint={showHint}
        solved={isCompleted}
        onToggleHint={handleToggleHint}
        onReset={handleReset}
      />
    </div>
  )
}
