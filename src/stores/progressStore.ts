import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressState, ProgressStore } from '../types'

const initialState: ProgressState = {
  completedLessons: [],
  completedSteps: {},
  currentStep: {},
}

const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeStep: (lessonId, stepId) => {
        const state = get()
        const key = `${lessonId}:${stepId}`
        if (state.completedSteps[key]) return

        set((state) => ({
          completedSteps: { ...state.completedSteps, [key]: true },
        }))
      },

      isStepCompleted: (lessonId, stepId) => {
        return !!get().completedSteps[`${lessonId}:${stepId}`]
      },

      setCurrentStep: (lessonId, stepIndex) => {
        set((state) => ({
          currentStep: { ...state.currentStep, [lessonId]: stepIndex },
        }))
      },

      getCurrentStep: (lessonId) => {
        return get().currentStep[lessonId] || 0
      },

      completeLesson: (lessonId) => {
        const state = get()
        if (state.completedLessons.includes(lessonId)) return

        set((state) => ({
          completedLessons: [...state.completedLessons, lessonId],
        }))
      },

      isLessonCompleted: (lessonId) => {
        return get().completedLessons.includes(lessonId)
      },

      nextLessonId: () => {
        const completed = get().completedLessons
        for (let i = 0; ; i++) {
          if (!completed.includes(i)) return i
        }
      },

      resetLesson: (lessonId, stepIds) => {
        set((state) => {
          const completedSteps = { ...state.completedSteps }
          for (const stepId of stepIds) {
            delete completedSteps[`${lessonId}:${stepId}`]
          }

          const currentStep = { ...state.currentStep }
          delete currentStep[lessonId]

          const completedLessons = state.completedLessons.filter((id) => id !== lessonId)

          return { completedSteps, currentStep, completedLessons }
        })
      },

      resetProgress: () => set({ ...initialState }),
    }),
    {
      name: 'git-101-progress',
      version: 3,
      migrate: (): ProgressState => ({ ...initialState }),
    }
  )
)

export default useProgressStore
