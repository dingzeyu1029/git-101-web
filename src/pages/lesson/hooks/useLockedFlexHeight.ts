import { useRef, useLayoutEffect } from 'react'

export default function useLockedFlexHeight(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const lock = () => {
      el.style.flexGrow = ''
      el.style.flexBasis = ''
      const height = el.getBoundingClientRect().height
      el.style.flexGrow = '0'
      el.style.flexBasis = `${height}px`
    }

    lock()
    window.addEventListener('resize', lock)

    return () => {
      window.removeEventListener('resize', lock)
      el.style.flexGrow = ''
      el.style.flexBasis = ''
    }
  }, [dep])

  return ref
}
