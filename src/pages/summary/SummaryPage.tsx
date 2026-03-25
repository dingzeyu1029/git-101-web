import { Link } from 'react-router-dom'
import useSummaryPage from './hooks/useSummaryPage'
import SummaryHero from './components/SummaryHero'
import CommandsList from './components/CommandsList'
import SummaryNavigation from './components/SummaryNavigation'

export default function SummaryPage() {
  const { lesson, commands, nextLesson } = useSummaryPage()

  if (!lesson) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-20 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-3">Lesson Not Found</h2>
        <Link to="/" className="text-text-muted hover:text-text-primary underline text-sm rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary">
          Back to lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-20 pb-36 sm:pb-40 flex-1 flex flex-col justify-center">
      <SummaryHero lessonTitle={lesson.title} />
      <CommandsList commands={commands} />
      <SummaryNavigation nextLessonId={nextLesson?.id} />
    </div>
  )
}
