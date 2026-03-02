import { useEffect, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Home, CheckCircle } from 'lucide-react'
import type { Step } from '../../types'
import useProgressStore from '../../stores/progressStore'
import lessons from '../../data/lessons/index'
import Button from '../../components/ui/Button'

function extractCommands(steps: readonly Step[]): string[] {
  const commands: string[] = []

  for (const step of steps) {
    if (step.type === 'terminal-exercise') {
      commands.push(step.expectedCommand)
    }
    if (step.type === 'block-exercise') {
      commands.push(step.correctAnswer.join(' '))
    }
  }

  return [...new Set(commands)]
}

export default function SummaryPage() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const parsedId = parseInt(lessonId ?? '', 10)

  const completeLesson = useProgressStore((s) => s.completeLesson)

  const lesson = lessons.find((l) => l.id === parsedId)
  const nextLesson = lessons.find((l) => l.id === parsedId + 1)

  const commands = useMemo(() => {
    if (!lesson) return []
    return extractCommands(lesson.steps)
  }, [lesson])

  useEffect(() => {
    if (lesson) {
      completeLesson(parsedId)
    }
  }, [lesson, parsedId, completeLesson])

  if (!lesson) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-20 text-center">
        <h2 className="text-xl font-semibold text-text-primary mb-3">Lesson Not Found</h2>
        <Link to="/" className="text-text-muted hover:text-text-primary underline text-sm">
          Back to lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-16 sm:py-20 pb-36 sm:pb-40 flex-1 flex flex-col justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-green/10 mb-6">
          <CheckCircle size={28} className="text-accent-green" />
        </div>

        <h1 className="text-2xl font-semibold text-text-primary mb-2 tracking-tight">
          Lesson Complete
        </h1>

        <p className="text-base text-text-secondary leading-relaxed">
          You finished <span className="font-medium text-text-primary">{lesson.title}</span>
        </p>
      </div>

      {commands.length > 0 && (
        <div className="border border-border rounded-xl p-6 mt-12">
          <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-4">
            Commands Covered
          </h2>
          <div className="flex flex-wrap gap-2">
            {commands.map((cmd) => (
              <code
                key={cmd}
                className="bg-bg-card text-text-primary px-3 py-1.5 rounded-lg text-sm font-mono"
              >
                {cmd}
              </code>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
        <Button as={Link} variant="outlined" to="/">
          <Home size={14} />
          All Lessons
        </Button>

        {nextLesson && (
          <Button variant="filled" onClick={() => void navigate(`/lesson/${nextLesson.id}`)}>
            Next Lesson
            <ArrowRight size={14} />
          </Button>
        )}
      </div>
    </div>
  )
}
