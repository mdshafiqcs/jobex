import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"


function App() {

  return (
    <>
      <Header />
      <div className='container min-h-[100vh]'>
        <Outlet />
      </div>
      <Footer />
      </>
  )
}

export default App
