import React, {useEffect, useRef, useState} from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../feature/auth/authSlice';
import axios from 'axios';

const emailRegex = new RegExp('^\\w[\\w.-]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,}$');

function SignUp() {
  let nameRef = useRef()
  let emailRef = useRef()
  let passwordRef = useRef()
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    if(validateUser(user)){
      // console.log(user);
      axios.post("http://localhost:3000/api/v1/userSignUp", user).then((res) => {
        dispatch(addUser({userInfo: res.data.user, role: res.data.user.role, userToken: res.data.token, success: true}))
        localStorage.setItem("role", res.data.user.role)
        localStorage.setItem("user-token", res.data.token)
        navigate("/")
      })
    }
  }

  const validateUser = (user) => {
    if(user.name == ''){
      setNameError("Name shouldn't be kept empty")
      return false
    }else{
      setNameError("")
    }

    if(user.email == ""){
      setEmailError("Email shouldn't be kept empty")
      return false
    }else{
      setEmailError("")
    }

    if(emailRegex.test(user.email) == false){
      setEmailError("Give Proper Email")
      return false
    }else{
      setEmailError("")
    }

    if(user.password == ""){
      setPasswordError("Password shouldn't be kept Empty")
      return false
    }else{
      setPasswordError("")
    }

    return true
  }

  return (
    <div className='w-full h-screen flex justify-center items-center'>
            <div className="registerForm bg-white rounded shadow-md text-center flex flex-col w-128 gap-7 p-5 pr-12">

                <h1 className='text-5xl font-bold text-left'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-7 pl-7' encType="multipart/form-data">

                    <TextField
                        id="outlined-multiline-flexible-name"
                        label="Name"
                        maxRows={4}
                        inputRef={nameRef}
                        error={nameError && nameError.length ? true : false}
                        helperText = {nameError=='' ? null : nameError}
                    />
                    <TextField
                        id="outlined-multiline-flexible-email"
                        label="Email"
                        maxRows={4}
                        inputRef={emailRef}
                        error={emailError && emailError.length ? true : false}
                        helperText = {emailError=='' ? null : emailError}
                    />
                    <TextField
                        id="outlined-multiline-flexible-password"
                        label="Password"
                        type='password'
                        maxRows={4}
                        inputRef={passwordRef}
                        error={passwordError && passwordError.length ? true : false}
                        helperText = {passwordError=='' ? null : passwordError}
                    />
                    <div className='text-right'>
                        <input type="submit" value="Sign Up" className="text-white w-24 bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"></input>
                    </div>
                </form>
                <p className='text-left'>Do you have account? <Link to="/signin" className='text-blue-400'>Sign in</Link></p>
            </div>
        </div>
  )
}

export default SignUp