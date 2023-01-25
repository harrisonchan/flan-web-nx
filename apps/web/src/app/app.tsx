import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 300000, //5*60*1000 milliseconds
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>{' '}
    </QueryClientProvider>
  )
}

export default App
