import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
import { Toaster } from "sonner"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className='container mb-24'>
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </QueryClientProvider>
  )
}

export default App
