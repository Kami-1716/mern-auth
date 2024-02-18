import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const [userData, setUserData] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const { register, handleSubmit, formState: {
    errors,
    isSubmitting
  } } = useForm()

  const onSubmit = async (data) => {
    const response = await fetch('/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    if (response.ok) {
      const responseData = await response.json();
      setUserData(responseData.data);
      setIsSuccess(true);
    } else {
      setIsError(true);
    }
  }

  setTimeout(() => {
    setIsSuccess(false);
    setIsError(false);
  }, 4000);

  return (
    <div className='m-4'>
      <h1 className='text-3xl text-center font-semibold my-6'>Sign In</h1>
      <form className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
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
              value: 8,
              message: "Minimum length is 8"
            }
          })}
        />
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

        <button
          type='submit'
          className='p-3 bg-blue-500 max-w-md w-full mx-2 my-2 font-bold text-white hover:bg-blue-600 transition duration-200'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
        {isSuccess && <p className='text-green-500'>Logged in Successfully</p>}
        {isError && <p className='text-red-500'>Something went wrong</p>}
        <p className='text-right'>Have an account? <span className='text-blue-500'>
          <Link to='/sign-in'>Login</Link>
        </span></p>
      </form>
    </div>
  )
}

export default SignIn