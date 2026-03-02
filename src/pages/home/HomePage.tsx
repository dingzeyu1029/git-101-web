import useProgressStore from '../../stores/progressStore'
import lessons from '../../data/lessons/index'
import LessonCard from './components/LessonCard'

export default function HomePage() {
  const isLessonCompleted = useProgressStore((s) => s.isLessonCompleted)
  const nextLessonId = useProgressStore((s) => s.nextLessonId)

  const nextId = nextLessonId()

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
          Learn Git
        </h1>
        <p className="text-base text-text-muted mt-2 leading-relaxed">
          Interactive lessons to master version control
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={isLessonCompleted(lesson.id)}
            isCurrent={lesson.id === nextId}
          />
        ))}
      </div>
    </div>
  )
}
