import { HelpCircle, RotateCcw } from 'lucide-react'
import Button from '../ui/Button'

interface ExerciseControlsProps {
  hints?: readonly string[]
  hintIndex: number
  showHint: boolean
  solved: boolean
  onToggleHint: () => void
  onReset: () => void
}

export default function ExerciseControls({ hints, hintIndex, showHint, solved, onToggleHint, onReset }: ExerciseControlsProps) {
  return (
    <>
      {!solved && (
        <div className="flex items-center justify-between">
          <div>
            {hints && (
              <Button
                variant="text"
                onClick={onToggleHint}
                className="!text-sm !gap-1.5 !px-3 !py-1.5"
              >
                <HelpCircle size={14} />
                {showHint ? 'Hide hint' : 'Show hint'}
              </Button>
            )}
          </div>
          <Button
            variant="text"
            onClick={onReset}
            className="!text-sm !gap-1.5 !px-3 !py-1.5"
          >
            <RotateCcw size={14} />
            Reset
          </Button>
        </div>
      )}

      {showHint && !solved && hints && (
        <div className="bg-bg-secondary border border-border rounded-xl px-5 py-3.5 text-sm text-text-secondary leading-relaxed">
          {hints[Math.min(hintIndex, hints.length - 1)]}
        </div>
      )}
    </>
  )
}
