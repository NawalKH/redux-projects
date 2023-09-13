import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './AppContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
  <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </AppContextProvider>
)