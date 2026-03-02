import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import LessonFooter from './components/layout/LessonFooter'
import { LessonNavProvider } from './contexts/LessonNavContext'

export default function App() {
  return (
    <LessonNavProvider>
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <Outlet />
        </main>
        <LessonFooter />
      </div>
    </LessonNavProvider>
  )
}
