import type { ContentBlock as ContentBlockType } from '../../../../types'

interface ContentBlockProps {
  block: ContentBlockType
}

export default function ContentBlock({ block }: ContentBlockProps) {
  switch (block.type) {
    case 'text':
      return (
        <div
          className="text-sm text-text-secondary leading-relaxed"
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- intentional: renders trusted lesson markdown
          dangerouslySetInnerHTML={{
            __html: block.value
              .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue">$1</a>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="bg-bg-card px-1.5 py-0.5 rounded text-text-primary font-mono text-xs">$1</code>')
              .replace(/\n/g, '<br />'),
          }}
        />
      )
    case 'code':
      return (
        <pre className="bg-code-bg rounded-xl px-5 py-4 overflow-x-auto font-mono text-xs leading-relaxed">
          <code className="text-code-text">{block.value}</code>
        </pre>
      )
    default: {
      const _exhaustive: never = block
      return _exhaustive
    }
  }
}
