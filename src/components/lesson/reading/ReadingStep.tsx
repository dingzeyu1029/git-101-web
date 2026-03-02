import type { ReadingStep as ReadingStepType } from '../../../types'
import ThreePlaceModel from '../../visualization/ThreePlaceModel'
import GitGraph from '../../visualization/git-graph/GitGraph'
import useExerciseNav from '../../../hooks/useExerciseNav'
import ContentBlock from './components/ContentBlock'

interface ReadingStepProps {
  step: ReadingStepType
}

export default function ReadingStep({ step }: ReadingStepProps) {
  useExerciseNav({ solved: true })

  return (
    <div className="space-y-6">
      {step.title && (
        <h2 className="text-xl font-semibold text-text-primary tracking-tight">{step.title}</h2>
      )}

      {step.content.map((block) => (
        <ContentBlock key={`${block.type}-${block.value.slice(0, 32)}`} block={block} />
      ))}

      {step.visualization === 'three-place-model' && <ThreePlaceModel />}
      {step.visualization === 'git-graph' && <GitGraph scenario={step.visualizationVariant} />}
    </div>
  )
}
