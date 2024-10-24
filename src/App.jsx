import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"


function App() {

  return (
    <>
      <Header />
      <div className='container'>
        <Outlet />
      </div>
      <Footer />
      </>
  )
}

export default App
