import { useEffect, useRef } from 'react'
import { useLessonNav } from './useLessonNav'

interface UseExerciseNavOptions {
  solved: boolean
  checkFn?: () => boolean | undefined
  checkDisabled?: boolean
}

export default function useExerciseNav({ solved, checkFn, checkDisabled }: UseExerciseNavOptions) {
  const { registerCheck, clearCheck, reportStepSolved } = useLessonNav()
  const checkFnRef = useRef(checkFn)

  useEffect(() => {
    checkFnRef.current = checkFn
  }, [checkFn])

  useEffect(() => {
    if (solved) {
      clearCheck()
      reportStepSolved(true)
    } else {
      reportStepSolved(false)
      registerCheck(() => checkFnRef.current?.(), checkDisabled)
    }
    return clearCheck
  }, [solved, checkDisabled, registerCheck, clearCheck, reportStepSolved])
}
