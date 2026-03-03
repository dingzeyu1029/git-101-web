interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0

  return (
    <div
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Lesson progress: step ${current + 1} of ${total}`}
      className="w-full h-2 bg-bg-card rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-text-primary rounded-full transition-[width] duration-400 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
