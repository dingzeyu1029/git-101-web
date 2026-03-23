import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import HomePage from './pages/home/HomePage'
import LessonPage from './pages/lesson/LessonPage'
import SummaryPage from './pages/summary/SummaryPage'
import CheatsheetPage from './pages/cheatsheet/CheatsheetPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'lesson/:lessonId', element: <LessonPage /> },
        { path: 'lesson/:lessonId/summary', element: <SummaryPage /> },
        { path: 'cheatsheet', element: <CheatsheetPage /> },
      ],
    },
  ],
  { basename: '/git-101-web' }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
