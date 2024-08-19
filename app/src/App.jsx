import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Landing from './pages/Landing'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/' element={<Landing />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/send' element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
