import CheatsheetCommand from './CheatsheetCommand'

interface Command {
  command: string
  description: string
  lessonId: number
}

interface CheatsheetCategoryProps {
  name: string
  commands: Command[]
  completedLessons: number[]
}

export default function CheatsheetCategory({ name, commands, completedLessons }: CheatsheetCategoryProps) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-3">
        {name}
      </h2>
      <div className="flex flex-col gap-1">
        {commands.map((cmd) => (
          <CheatsheetCommand
            key={cmd.command}
            command={cmd.command}
            description={cmd.description}
            learned={completedLessons.includes(cmd.lessonId)}
          />
        ))}
      </div>
    </section>
  )
}
