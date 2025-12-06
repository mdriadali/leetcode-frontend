import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from 'zod'; 
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import {loginUser} from '../context/authSlice'

const signupSchema=z.object({
  emailId:z.string().email('Enter a valid email'),
  password:z.string().regex(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm,'Password should be at least one capital letter, one small letter, one number and 8 character length'),
})

const Login = () => {

  
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const {isAuthenticated,}=useSelector((state)=>state.auth)

const { register,handleSubmit,formState: { errors },} = useForm({resolver:zodResolver(signupSchema)});

const [showPass, setShowPass] = useState(false)

useEffect(()=>{
  if(isAuthenticated){
    navigate('/')
  }
},[isAuthenticated,navigate])

const onSubmit=(data)=>{
dispatch(loginUser(data))
}

  return (
   <div className='min-h-screen flex justify-center items-center p-4'>
    <div className='card w-96 bg-base-100 shadow-lg'>
      <div className='card-body'>
        <h2 className='card-title justify-center text-3xl'>LEETCODE</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
      
          <div className='form-control'>
            <label className='label mb-1'>
              <span className='lable-text'>Email</span>
            </label>
            <input
            type="email"
            placeholder='abc@email.com'
            className={`input input-bordered ${errors.emailId&&'input-error'}`}
            {...register('emailId')}
            />
            {errors.emailId &&(
              <span className='text-error'>{errors.emailId.message}</span>
            )}
          </div>

            <div className='form-control'>
            <label className='label mb-1'>
              <span className='lable-text'>Password</span>
            </label>
            <div className='relative'>
            <input
            type={showPass?'text':'password'}
            placeholder='•••••••••'
            className={`input input-bordered ${errors.password&&'input-error'}`}
             {...register('password')}
            />
            <span
            className="absolute right-6 top-3 cursor-pointer"
             onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                    // eye-off svg
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477a2.7 2.7 0 103.046 3.046M6.532 6.532A9.74 9.74 0 003 12c2 4.5 6 7 9 7 1.797 0 3.557-.59 5.032-1.532M17.468 17.468A9.74 9.74 0 0021 12c-2-4.5-6-7-9-7-1.455 0-2.88.348-4.155.98" />
                    </svg>
                  ) : (
                    // eye svg
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-70">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
            </span>
            </div>
            {errors.password&&(
              <span className='text-error'>{errors.password.message}</span>
            )}
          </div>

          <div className='form-control mt-6 flex flex-col justify-center'>
            <button
            type='submit'
            className='btn btn-primary'
            >
             Login
            </button>

             <div className='flex justify-center items-center gap-1 mt-2'>
               <div>Don't have an Account?</div>
               <NavLink to={'/signup'}>
                <div className='text-blue-600'> Signup</div>
               </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
   </div>
  )
}

export default Login
