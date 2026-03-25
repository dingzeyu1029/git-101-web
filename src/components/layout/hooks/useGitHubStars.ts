import { useState, useEffect } from 'react'

const REPO = 'itsdingze/git-101-web'
const CACHE_KEY = 'gh-stars'

export default function useGitHubStars(): number | null {
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
