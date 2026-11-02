import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="main-content">
          <Suspense fallback={<Loader label="Carregando página..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projetos" element={<Projects />} />
              <Route path="/projetos/:repoName" element={<ProjectDetails />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
              <Route path="/inicio" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </AuthProvider>
  )
}
