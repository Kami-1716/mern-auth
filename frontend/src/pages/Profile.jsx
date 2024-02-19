import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector(state => state.user)
  return (
    <div className='p-2'>
      <h1
        className='text-center mt-5 text-3xl font-semibold my-7'
      >Profile</h1>
      <div
        className='flex flex-col items-center'>
        <img
          src={user.currentUser.profilePic}
          className='rounded-full h-28 w-28 object-cover cursor-pointer'
        />
        <input
          type='text'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          value={user.currentUser.username}
          disabled
        />
        <input
          type='email'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          value={user.currentUser.email}
          disabled
        />
        <input
          type='password'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          placeholder='Password'
        />
        <button
          className='p-3 bg-blue-500 max-w-md w-full mx-2 my-2 font-bold text-white hover:bg-blue-600 transition duration-200'>
          Update
        </button>
      </div>
      <div className='flex justify-between max-w-md mx-auto mt-3'>
        <span className='
          text-red-500 cursor-pointer
          '>Delete Account</span>
        <span className='
          text-red-500 cursor-pointer
          '>Sign Out</span>

      </div>
    </div>
  )
}

export default Profile