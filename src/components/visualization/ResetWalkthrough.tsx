import CodeWalkthrough from "./CodeWalkthrough";

const STAGES = [
  {
    label: "Clean working tree",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "nothing to commit, working tree clean", kind: "normal" },
    ],
  },
  {
    label: "Changes kept staged",
    command: "git reset --soft HEAD~1",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "Changes to be committed:", kind: "header" },
      { text: "  modified:   app.js", kind: "staged" },
      { text: "  new file:   utils.js", kind: "staged" },
    ],
  },
  {
    label: "Changes unstaged",
    command: "git reset HEAD~1",
    lines: [
      { text: "On branch main", kind: "normal" },
      { text: "Changes not staged for commit:", kind: "header" },
      { text: "  modified:   app.js", kind: "unstaged" },
      { text: "", kind: "normal" },
      { text: "Untracked files:", kind: "header" },
      { text: "  utils.js", kind: "unstaged" },
    ],
  },
  {
    label: "Changes discarded",
    command: "git reset --hard HEAD~1",
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

export default function ResetWalkthrough() {
  return (
    <CodeWalkthrough
      stages={STAGES}
      lineStyles={LINE_CLASSES}
      filename="$ git status"
    />
  );
}
