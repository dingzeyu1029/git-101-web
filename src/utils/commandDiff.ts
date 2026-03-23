function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!)
  return dp[m]![n]!
}

export default function getCommandFeedback(
  actual: string,
  expected: string,
  variants?: readonly string[],
): string | null {
  const norm = (s: string) => s.trim().replace(/\s+/g, ' ').toLowerCase()
  const actualNorm = norm(actual)
  const expectedNorm = norm(expected)

  if (actualNorm === expectedNorm) return null

  const actualTokens = actualNorm.split(' ')
  const expectedTokens = expectedNorm.split(' ')

  if (
    actualTokens[0] === 'git' &&
    expectedTokens[0] === 'git' &&
    actualTokens.length > 1 &&
    expectedTokens.length > 1 &&
    actualTokens[1] !== expectedTokens[1]
  ) {
    const actualSub = actualTokens[1]!
    const expectedSub = expectedTokens[1]!
    if (levenshtein(actualSub, expectedSub) <= 2) {
      return `Did you mean \`${expectedSub}\` instead of \`${actualSub}\`?`
    }
    return `The right subcommand is \`git ${expectedSub}\`, not \`git ${actualSub}\`.`
  }

  for (const aToken of actualTokens) {
    if (aToken.startsWith('-') && !aToken.startsWith('--')) {
      const doubleDash = '-' + aToken
      if (expectedTokens.includes(doubleDash)) {
        return `Use \`${doubleDash}\` (two dashes), not \`${aToken}\`.`
      }
    }
  }

  for (const token of expectedTokens) {
    if (token.startsWith('-') && !actualTokens.includes(token)) {
      return `You're missing the \`${token}\` flag.`
    }
  }

  for (const token of actualTokens) {
    if (token.startsWith('-') && !expectedTokens.includes(token)) {
      return `The \`${token}\` flag is not needed here.`
    }
  }

  if (expected.includes('"') && !actual.includes('"') && !actual.includes("'")) {
    return "Don't forget to put the message in quotes."
  }

  const allTargets = [expected, ...(variants || [])].map(norm)
  for (const target of allTargets) {
    if (levenshtein(actualNorm, target) <= 2) {
      return 'Close! Check for typos.'
    }
  }

  return null
}
