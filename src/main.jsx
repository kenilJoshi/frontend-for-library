import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout.jsx'
import './index.css'
import Home from './components/Home/Home.jsx'
import UserDetail from './components/UserDetail/UserDetail.jsx'
import Librarian from './components/LibrarianDashboard/ Librarian.jsx'
import Admin from './components/AdminDashboard/Admin.jsx'
import Signin from './components/Signin/Signin.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import { Provider } from 'react-redux'
import store from './app/store'

const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path='/' element={
      <Provider store={store}>
        <Layout />
      </Provider>
    }>
      <Route path='' element={<Home />} />
      <Route path='userDetail' element={<UserDetail />} />
      <Route path='librarian/dashboard' element={<Librarian />} />
      <Route path='admin/dashboard' element={<Admin />} />
      <Route path='signin' element={<Signin />} />
      <Route path='signup' element={<SignUp />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  
  <RouterProvider router={router} />,
)
