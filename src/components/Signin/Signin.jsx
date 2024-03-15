import React, {useEffect, useRef, useState} from 'react'
import TextField from '@mui/material/TextField';
// import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../../feature/auth/authSlice';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

function Signin() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    if(validateInfo(user)){
      axios.post('http://localhost:3000/api/v1/userSignIn', user).then((res) => {
        dispatch(addUser({userInfo: res.data.user, role: res.data.user.role, userToken: res.data.token, success: true}))
        if(res.data.user.role === 'user'){
          localStorage.setItem("role", res.data.user.role)
          localStorage.setItem("user-token", res.data.token)
          navigate("/")
        }else if(res.data.user.role === 'admin'){
          localStorage.setItem("role", res.data.user.role)
          localStorage.setItem("user-token", res.data.token)
          navigate('/admin/dashboard')
        }else{
          localStorage.setItem("role", res.data.user.role)
          localStorage.setItem("user-token", res.data.token)
          navigate('/librarian/dashboard')
        }
      })
    }
  }

  const validateInfo = (user) => {
    if(user.email == ''){
      setEmailError("Email shouldn't be Empty")
      return false
    }else{
      setEmailError('')
    }

    if(user.password == ''){
      setPasswordError("Password shouldn't be Empty")
      return false
    }else{
      setPasswordError("")
    }
    return true
  }

  return (
    <div className='w-full h-screen flex justify-center items-center '>
      <div className="registerForm bg-white rounded shadow-md flex flex-col w-128 gap-7 p-5 pr-12">

      <h1 className='text-5xl font-bold text-left'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7' encType="multipart/form-data">
                    <div className='emailInput'>
                        <TextField
                            id="outlined-multiline-flexible-email"
                            label="Email"
                            className='w-full'
                            maxRows={4}
                            inputRef={emailRef}
                            error={emailError && emailError.length ? true : false}
                            helperText={emailError==="" ? '' : emailError}
                        />
                    </div>
                    <div className='passwordInput'>
                        <TextField
                            id="outlined-multiline-flexible-password"
                            label="Password"
                            type='password'
                            className='w-full'
                            maxRows={4}
                            inputRef={passwordRef}
                            error={passwordError && passwordError.length ? true : false}
                            helperText={passwordError==="" ? '' : passwordError}
                        />
                       
                    </div>
                    <div className='text-right'>
                        <input type="submit" value="Sign In" className="text-white w-24 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></input>
                    </div>
                </form>
                <p className='text-left'>Dont have account? <Link to="/signup" className='text-blue-400'>Create</Link></p>
      </div>
    </div>
  )
}

export default Signin