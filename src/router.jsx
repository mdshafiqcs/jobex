
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { PageNotFound } from './components'
import { Home } from './pages'
import App from './App'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>} />

      <Route path='*' element={<PageNotFound/>} />
    </Route>
  )
)





export default router;
