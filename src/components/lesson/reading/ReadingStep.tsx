import type { ComponentType } from 'react'
import type { ReadingStep as ReadingStepType } from '../../../types'
import ThreePlaceModel from '../../visualization/ThreePlaceModel'
import GitGraph from '../../visualization/git-graph/GitGraph'
import ConflictMarkers from '../../visualization/ConflictMarkers'
import DiffWalkthrough from '../../visualization/DiffWalkthrough'
import ResetWalkthrough from '../../visualization/ResetWalkthrough'
import RestoreWalkthrough from '../../visualization/RestoreWalkthrough'
import useExerciseNav from '../../../hooks/useExerciseNav'
import ContentBlock from './components/ContentBlock'

const VISUALIZATIONS: Record<string, ComponentType> = {
  'three-place-model': ThreePlaceModel,
  'conflict-markers': ConflictMarkers,
  'diff-walkthrough': DiffWalkthrough,
  'reset-walkthrough': ResetWalkthrough,
  'restore-walkthrough': RestoreWalkthrough,
}

interface ReadingStepProps {
  step: ReadingStepType
}

export default function ReadingStep({ step }: ReadingStepProps) {
  useExerciseNav({ solved: true })

  const Visualization = step.visualization ? VISUALIZATIONS[step.visualization] : undefined

  return (
    <div className="space-y-6">
      {step.title && (
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">{step.title}</h2>
      )}

      {step.content.map((block) => (
        <ContentBlock key={`${block.type}-${block.value.slice(0, 32)}`} block={block} />
      ))}

      {step.visualization === 'git-graph' && <GitGraph scenario={step.visualizationVariant} />}
      {Visualization && <Visualization />}
    </div>
  )
}
