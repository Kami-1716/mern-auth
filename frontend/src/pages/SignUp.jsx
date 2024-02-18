import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { OAuth } from '../components'

const SignUp = () => {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: {
    errors,
    isSubmitting
  } } = useForm()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('profilePic', data.profilePic[0]);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);

      const response = await fetch('/api/v1/user/register', {
        method: 'POST',
        body: formData,
      });
      const responseData = await response.json();
      setUserData(responseData.data);
      navigate('/sign-in');
    } catch (error) {
      setError("root", {
        message: "Username or Email Already Taken"
      })
    }
  }

  return (
    <div className='m-4'>
      <h1 className='text-3xl text-center font-semibold my-6'>Sign Up</h1>
      <form className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type='file'
          className='p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          {...register('profilePic', {
            required: "Profile Picture is required",
          })}
        />
        {errors.profilePic && <p className='text-red-500'>{errors.profilePic.message}</p>}
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
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
        <OAuth />
        {errors.root && <p className='text-red-500'>{errors.root.message}</p>}
        <p className='text-right'>Have an account? <span className='text-blue-500'>
          <Link to='/sign-in'>Login</Link>
        </span></p>
      </form>


    </div>
  )
}

export default SignUp