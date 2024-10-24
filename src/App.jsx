import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
import { Toaster } from "sonner"


function App() {

  return (
    <>
      <Header />
      <div className='container min-h-[100vh]'>
        <Outlet />
      </div>
      <Toaster />
      <Footer />
      </>
  )
}

export default App
