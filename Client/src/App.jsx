import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashborad from './pages/Admin/AdminDashborad'
function App() {


  return (
    <>
      <Routes>
        <Route path='/'element={<HomePage></HomePage>}></Route>
        <Route path='/dashboard' element={<PrivateRoute></PrivateRoute>}>
              <Route path='user'element={<Dashboard></Dashboard>}></Route>
        </Route>

        <Route path='/dashboard' element={<AdminRoute></AdminRoute>}>
              <Route path='admin'element={<AdminDashborad></AdminDashborad>}></Route>
        </Route>
        <Route path='/register'element={<Register></Register>}></Route>
        <Route path='/login'element={<Login></Login>}></Route>
        <Route path='/about'element={<About></About>}></Route>
        <Route path='/contact'element={<Contact></Contact>}></Route>
        <Route path='/policy'element={<Policy></Policy>}></Route>
        <Route path='*'element={<Pagenotfound></Pagenotfound>}></Route>
      </Routes>
    </>
  )
}

export default App
