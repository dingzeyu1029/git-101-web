type CheatsheetCommand = {
  command: string
  description: string
  lessonId: number
}

type CheatsheetCategory = {
  name: string
  commands: CheatsheetCommand[]
}

const cheatsheet: CheatsheetCategory[] = [
  {
    name: 'Setup',
    commands: [
      { command: 'git --version', description: 'Check installed Git version', lessonId: 1 },
      { command: 'git config --global user.name "Name"', description: 'Set your name for commits', lessonId: 1 },
      { command: 'git config --global user.email "email"', description: 'Set your email for commits', lessonId: 1 },
    ],
  },
  {
    name: 'Creating Repos',
    commands: [
      { command: 'git init', description: 'Initialize a new repository', lessonId: 2 },
      { command: 'git clone <url>', description: 'Clone a remote repository', lessonId: 4 },
    ],
  },
  {
    name: 'Staging & Committing',
    commands: [
      { command: 'git status', description: 'Show working tree status', lessonId: 2 },
      { command: 'git add <file>', description: 'Stage a specific file', lessonId: 3 },
      { command: 'git add .', description: 'Stage all changes', lessonId: 3 },
      { command: 'git commit -m "msg"', description: 'Commit with inline message', lessonId: 3 },
      { command: 'git diff', description: 'Show unstaged changes', lessonId: 3 },
      { command: 'git diff --staged', description: 'Show staged changes', lessonId: 3 },
      { command: 'git log --oneline', description: 'View compact commit history', lessonId: 3 },
    ],
  },
  {
    name: 'Remotes',
    commands: [
      { command: 'git remote add origin <url>', description: 'Add a remote repository', lessonId: 4 },
      { command: 'git push -u origin main', description: 'Push and set upstream tracking', lessonId: 4 },
      { command: 'git pull origin main', description: 'Fetch and merge remote changes', lessonId: 4 },
      { command: 'git fetch', description: 'Download remote changes without merging', lessonId: 4 },
    ],
  },
  {
    name: 'Branching',
    commands: [
      { command: 'git branch', description: 'List local branches', lessonId: 6 },
      { command: 'git switch -c <name>', description: 'Create and switch to new branch', lessonId: 6 },
      { command: 'git switch <name>', description: 'Switch to existing branch', lessonId: 6 },
      { command: 'git branch -d <name>', description: 'Delete a merged branch', lessonId: 6 },
    ],
  },
  {
    name: 'Merging',
    commands: [
      { command: 'git merge <branch>', description: 'Merge branch into current', lessonId: 7 },
      { command: 'git merge --abort', description: 'Abort a merge in progress', lessonId: 8 },
    ],
  },
  {
    name: 'Stashing',
    commands: [
      { command: 'git stash', description: 'Stash uncommitted changes', lessonId: 9 },
      { command: 'git stash pop', description: 'Apply and remove latest stash', lessonId: 9 },
      { command: 'git stash list', description: 'List all stashes', lessonId: 9 },
    ],
  },
  {
    name: 'Undoing Changes',
    commands: [
      { command: 'git restore <file>', description: 'Discard working directory changes', lessonId: 10 },
      { command: 'git restore --staged <file>', description: 'Unstage a file', lessonId: 10 },
      { command: 'git revert HEAD', description: 'Undo last commit safely', lessonId: 10 },
      { command: 'git commit --amend -m "msg"', description: 'Fix last commit message', lessonId: 10 },
      { command: 'git reset --soft HEAD~1', description: 'Undo commit, keep staged', lessonId: 10 },
      { command: 'git reflog', description: 'View HEAD movement history', lessonId: 10 },
    ],
  },
  {
    name: 'Workflow',
    commands: [
      { command: 'git push -u origin <branch>', description: 'Push feature branch with tracking', lessonId: 11 },
      { command: 'git rebase main', description: 'Replay commits on top of main', lessonId: 11 },
      { command: 'git tag -a v1.0 -m "msg"', description: 'Create an annotated tag', lessonId: 11 },
      { command: 'git blame <file>', description: 'Show who last modified each line', lessonId: 11 },
    ],
  },
]

export default cheatsheet
export type { CheatsheetCommand, CheatsheetCategory }
