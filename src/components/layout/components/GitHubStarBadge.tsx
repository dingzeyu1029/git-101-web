import { useState, useEffect } from 'react'
import { Github, Star } from 'lucide-react'

const REPO = 'dingzeyu1029/git-101-web'
const CACHE_KEY = 'gh-stars'

function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    return cached ? Number(cached) : null
  })

  useEffect(() => {
    if (stars !== null) return

    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data: { stargazers_count: number }) => {
        const count = data.stargazers_count
        sessionStorage.setItem(CACHE_KEY, String(count))
        setStars(count)
      })
      .catch(() => {})
  }, [stars])

  return stars
}

export default function GitHubStarBadge() {
  const stars = useGitHubStars()

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary no-underline transition-colors"
    >
      <Github size={18} />
      {stars !== null && stars > 0 && (
        <>
          <Star size={13} fill="currentColor" />
          <span className="text-xs font-medium">{stars}</span>
        </>
      )}
    </a>
  )
}
