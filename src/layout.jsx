import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from './feature/auth/authSlice';

function Layout() {
  const location = useLocation()
  const { pathname } = location
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const auth = async () => {
    const token = localStorage.getItem("user-token");
    if (token) {
      const getUser = await axios.get('http://localhost:3000/api/v1/userDashboard', {
        headers: {
          Authorization: token
        }
      })
      console.log(getUser);
      dispatch(addUser({userInfo: getUser.data, role: getUser.data.role, userToken: token, success: true}))
      if(getUser.data.role == 'user' || localStorage.getItem('role') == 'user'){
        navigate("/")  
      }else if(getUser.data.role == 'admin' || localStorage.getItem('role') == 'admin'){
        navigate('/admin/dashboard')
      }else{
        navigate('/librarian/dashboard')
      }
      
      // console.log('is it authenticated', userCtx.isAuthenticated);
    } else {
      navigate("/signin")
    }
  }

  useEffect(() => {
    auth()
  }, [])

  console.log(pathname);

  return (
    <div>
      {
        pathname!=='/signin' && pathname!=='/signup' ? <Header />: null
      }
      <Outlet />
      {
        pathname!=='/signin' && pathname!=='/signup' ? <Footer />: null
      }
    </div>
  )
}

export default Layout