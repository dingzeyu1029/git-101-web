import CodeWalkthrough from "./CodeWalkthrough";

const STAGES = [
  {
    label: "Original file",
    lines: [
      { text: "function greet() {", kind: "normal" },
      { text: '  return "Hello!";', kind: "normal" },
      { text: "}", kind: "normal" },
    ],
  },
  {
    label: "Diff output",
    command: "git diff",
    lines: [
      { text: "--- a/greeting.js", kind: "header" },
      { text: "+++ b/greeting.js", kind: "header" },
      { text: "@@ -1,3 +1,3 @@", kind: "header" },
      { text: " function greet() {", kind: "normal" },
      { text: '-  return "Hello!";', kind: "removed" },
      { text: '+  return "Hello, world!";', kind: "added" },
      { text: " }", kind: "normal" },
    ],
  },
  {
    label: "File after changes",
    lines: [
      { text: "function greet() {", kind: "normal" },
      { text: '  return "Hello, world!";', kind: "normal" },
      { text: "}", kind: "normal" },
    ],
  },
];

const LINE_CLASSES: Record<string, string> = {
  normal: "text-code-text",
  added: "bg-accent-green/20 text-code-text",
  removed: "bg-accent-red/20 text-code-text",
  header: "text-code-muted",
};

export default function DiffWalkthrough() {
  return (
    <CodeWalkthrough
      stages={STAGES}
      lineStyles={LINE_CLASSES}
      filename="greeting.js"
    />
  );
}
