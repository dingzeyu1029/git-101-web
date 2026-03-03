import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type WalkthroughLine = { text: string; kind: string };
type WalkthroughStage = { label: string; command?: string; lines: WalkthroughLine[] };

interface CodeWalkthroughProps {
  stages: WalkthroughStage[];
  lineStyles: Record<string, string>;
  filename: string;
}

export default function CodeWalkthrough({
  stages,
  lineStyles,
  filename,
}: CodeWalkthroughProps) {
  const [stageIndex, setStageIndex] = useState(0);

  const maxLines = Math.max(0, ...stages.map((s) => s.lines.length));
  const stage = stages[stageIndex];
  const atStart = stageIndex === 0;
  const atEnd = stageIndex === stages.length - 1;

  if (!stage) return null;

  const statusDisplay = stage.command ? (
    <span className="text-text-primary font-mono text-sm">
      $ {stage.command}
    </span>
  ) : (
    <span className="text-text-muted italic text-sm">{stage.label}</span>
  );

  return (
    <div className="border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-bg-secondary font-mono text-text-secondary">
          {filename}
        </span>
        <span className="text-text-muted">{stage.label}</span>
      </div>

      <div className="bg-code-bg rounded-xl px-4 py-3 font-mono text-xs leading-relaxed">
        {Array.from({ length: maxLines }, (_, i) => {
          const line = stage.lines[i];
          return (
            <div
              key={i}
              className={`px-2 py-[3px] ${line ? lineStyles[line.kind] ?? "" : ""}`}
            >
              {line?.text || "\u00A0"}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setStageIndex((s) => Math.max(s - 1, 0))}
          disabled={atStart}
          aria-label="Previous step"
          className="p-1.5 rounded-md border border-border text-text-secondary
            enabled:hover:bg-bg-card enabled:cursor-pointer
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex-1 text-center truncate">{statusDisplay}</div>

        <button
          onClick={() =>
            setStageIndex((s) => Math.min(s + 1, stages.length - 1))
          }
          disabled={atEnd}
          aria-label="Next step"
          className="p-1.5 rounded-md border border-border text-text-secondary
            enabled:hover:bg-bg-card enabled:cursor-pointer
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
