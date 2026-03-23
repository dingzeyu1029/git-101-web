import type { WorkflowExerciseStep } from '../../../types'
import useExerciseNav from '../../../hooks/useExerciseNav'

interface WorkflowExerciseProps {
  step: WorkflowExerciseStep
  lessonId: number
}

export default function WorkflowExercise({ step }: WorkflowExerciseProps) {
  useExerciseNav({ solved: true })

  return <div>{step.title}</div>
}
