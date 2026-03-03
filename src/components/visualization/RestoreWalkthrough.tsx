import CodeWalkthrough from "./CodeWalkthrough";

const STAGES = [
  {
    label: "File is staged",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "Changes to be committed:", kind: "header" },
      { text: "  modified:   filename.txt", kind: "staged" },
    ],
  },
  {
    label: "File unstaged, edits kept",
    command: "git restore --staged filename.txt",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "Changes not staged for commit:", kind: "header" },
      { text: "  modified:   filename.txt", kind: "unstaged" },
    ],
  },
  {
    label: "Changes discarded",
    command: "git restore filename.txt",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "nothing to commit, working tree clean", kind: "normal" },
    ],
  },
];

const LINE_CLASSES: Record<string, string> = {
  normal: "text-code-text",
  staged: "bg-accent-green/20 text-code-text",
  unstaged: "bg-accent-red/20 text-code-text",
  header: "text-code-muted",
};

export default function RestoreWalkthrough() {
  return (
    <CodeWalkthrough
      stages={STAGES}
      lineStyles={LINE_CLASSES}
      filename="$ git status"
    />
  );
}
