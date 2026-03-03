import CodeWalkthrough from "./CodeWalkthrough";

const STAGES = [
  {
    label: "Original file on main",
    lines: [
      { text: "<html>", kind: "normal" },
      { text: "  <body>", kind: "normal" },
      { text: "    <h1>Welcome to our website!</h1>", kind: "normal" },
      { text: "  </body>", kind: "normal" },
      { text: "</html>", kind: "normal" },
    ],
  },
  {
    label: "CONFLICT: Automatic merge failed",
    command: "git merge feature-banner",
    lines: [
      { text: "<html>", kind: "normal" },
      { text: "  <body>", kind: "normal" },
      { text: "<<<<<<< HEAD", kind: "marker_ours" },
      { text: "    <h1>Welcome to our website!</h1>", kind: "ours" },
      { text: "=======", kind: "normal" },
      { text: "    <h1>Welcome to our amazing website!</h1>", kind: "theirs" },
      { text: ">>>>>>> feature-banner", kind: "marker_theirs" },
      { text: "  </body>", kind: "normal" },
      { text: "</html>", kind: "normal" },
    ],
  },
  {
    label: "Conflict resolved — markers removed",
    lines: [
      { text: "<html>", kind: "normal" },
      { text: "  <body>", kind: "normal" },
      { text: "    <h1>Welcome to our amazing website!</h1>", kind: "normal" },
      { text: "  </body>", kind: "normal" },
      { text: "</html>", kind: "normal" },
    ],
  },
];

const LINE_CLASSES: Record<string, string> = {
  normal: "text-code-text",
  marker_ours: "bg-accent-green/40 text-code-text",
  marker_theirs: "bg-accent-blue/40 text-code-text",
  ours: "bg-accent-green/20 text-code-text",
  theirs: "bg-accent-blue/20 text-code-text",
};

export default function ConflictMarkers() {
  return (
    <CodeWalkthrough
      stages={STAGES}
      lineStyles={LINE_CLASSES}
      filename="index.html"
    />
  );
}
