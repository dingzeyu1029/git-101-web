import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import StepRenderer from '../../components/lesson/StepRenderer'
import useLessonPage from './hooks/useLessonPage'
import useLockedFlexHeight from './hooks/useLockedFlexHeight'

export default function LessonPage() {
  const { lessonId } = useParams()
  const { lesson, step, currentStepIndex, parsedId } = useLessonPage(lessonId)
  const topSpacerRef = useLockedFlexHeight(currentStepIndex)
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    stepRef.current?.focus()
    stepRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [currentStepIndex])

  if (!lesson || !step) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-20 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-3">Lesson Not Found</h2>
        <p className="text-text-secondary mb-6">
          The lesson you are looking for does not exist.
        </p>
        <Link to="/" className="text-text-muted hover:text-text-primary underline text-sm rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary">
          Back to lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 flex-1 flex flex-col">
      <div ref={topSpacerRef} className="flex-2 min-h-16 sm:min-h-24" />
      <div key={currentStepIndex} ref={stepRef} tabIndex={-1} className="outline-none">
        <StepRenderer
          step={step}
          lessonId={parsedId}
        />
      </div>
      <div className="flex-3 min-h-16 sm:min-h-24" />
    </div>
  )
}
