import { CheckCircle } from 'lucide-react'
import useProgressStore from '../../stores/progressStore'
import cheatsheet from '../../data/cheatsheet'

export default function CheatsheetPage() {
  const completedLessons = useProgressStore((s) => s.completedLessons)

  return (
    <div className="w-full max-w-2xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight leading-tight">
          Cheat Sheet
        </h1>
        <p className="text-base text-text-muted mt-2 leading-relaxed">
          Quick reference for Git commands
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {cheatsheet.map((category) => (
          <section key={category.name}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
              {category.name}
            </h2>
            <div className="flex flex-col gap-1">
              {category.commands.map((cmd) => {
                const learned = completedLessons.includes(cmd.lessonId)

                return (
                  <div
                    key={cmd.command}
                    className="flex items-baseline gap-3 py-1.5"
                  >
                    {learned && (
                      <CheckCircle size={12} className="text-accent-green shrink-0 translate-y-0.5" />
                    )}
                    <code className="text-sm font-mono text-text-primary shrink-0">
                      {cmd.command}
                    </code>
                    <span className="text-sm text-text-muted">
                      {cmd.description}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
