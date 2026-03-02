import type { ScenarioKey } from './graph'

export type TextBlock = {
  type: 'text'
  value: string
}

export type CodeBlock = {
  type: 'code'
  language: string
  value: string
}

export type ContentBlock = TextBlock | CodeBlock

export type ReadingStep = {
  type: 'reading'
  id: string
  title?: string
  content: ContentBlock[]
  visualization?: string
  visualizationVariant?: ScenarioKey
}

export type QuizStep = {
  type: 'quiz'
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export type TerminalExerciseStep = {
  type: 'terminal-exercise'
  id: string
  prompt: string
  expectedCommand: string
  acceptableVariants?: readonly string[]
  successOutput: string
  hints?: readonly string[]
}

export type BlockExerciseStep = {
  type: 'block-exercise'
  id: string
  prompt: string
  availableBlocks: readonly string[]
  correctAnswer: readonly string[]
  hints?: readonly string[]
}

export type Step = ReadingStep | QuizStep | TerminalExerciseStep | BlockExerciseStep

export type Lesson = {
  id: number
  title: string
  description: string
  steps: readonly Step[]
}
