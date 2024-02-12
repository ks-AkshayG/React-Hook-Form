import './App.css'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const queryClient = new QueryClient()

function App() {

  return (
    <div className='w-[100vw] h-[100vh]'>
      <QueryClientProvider client={queryClient} >
        <Home />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  )
}

export default App
