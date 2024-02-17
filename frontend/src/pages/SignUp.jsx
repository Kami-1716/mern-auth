import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const { register, handleSubmit, formState: {
    errors
  } } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-6'>Sign Up</h1>
      <form className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='text'
          placeholder='Username'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          {...register('username', {
            required: "User Name is Required",
            minLength: {
              value: 3,
              message: "Minimum length is 3"
            }
          })}
        />
        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
        <input
          type='email'
          placeholder='Email'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          {...register('email', {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
        <input
          type='password'
          placeholder='Password'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          {...register('password', {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum length is 6"
            }
          })}
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        <button
          type='submit'
          className='p-3 bg-blue-500 max-w-md w-full mx-2 my-2 font-bold text-white hover:bg-blue-600 transition duration-200'
        >
          Sign Up
        </button>
        <p className='text-right'>Have an account? <span className='text-blue-500'>
          <Link to='/sign-in'>Login</Link>
        </span></p>
      </form>


    </div>
  )
}

export default SignUp