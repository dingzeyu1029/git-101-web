import type { Branch } from '../../../../types'

function tint(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const blend = (c: number) => Math.round(c * opacity + 255 * (1 - opacity))
  return `rgb(${blend(r)}, ${blend(g)}, ${blend(b)})`
}

interface BranchLabelProps {
  branch: Branch
  isHead: boolean
  x: number
  y: number
}

export default function BranchLabel({ branch, isHead, x, y }: BranchLabelProps) {
  return (
    <foreignObject x={x} y={y - 11} width={1} height={22} style={{ overflow: 'visible' }}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span
          style={{
            padding: '1px 6px',
            borderRadius: 4,
            background: tint(branch.color, 0.15),
            color: branch.color,
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {branch.name}
        </span>
        {isHead && (
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 4,
              background: tint('#CA8A04', 0.15),
              color: '#CA8A04',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: 11,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            HEAD
          </span>
        )}
      </div>
    </foreignObject>
  )
}
