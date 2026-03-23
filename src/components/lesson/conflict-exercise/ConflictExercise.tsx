import type { ConflictExerciseStep } from '../../../types'
import useExerciseNav from '../../../hooks/useExerciseNav'

interface ConflictExerciseProps {
  step: ConflictExerciseStep
  lessonId: number
}

export default function ConflictExercise({ step }: ConflictExerciseProps) {
  useExerciseNav({ solved: true })

  return <div>{step.prompt}</div>
}
