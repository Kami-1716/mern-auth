import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

  const user = useSelector(state => state.user)


  return (
    <div className='bg-slate-300 mb-[1px]'>
      <header className='flex justify-between items-center max-w-6xl mx-auto bg-slate-300 shadow-sm px-2'>
        <div>
          <Link to="/">
            <h1 className='text-xl font-bold'>Home</h1>
          </Link>
        </div>
        <div>
          <ul className='flex gap-4 py-4'>
            <Link to="/about">
              <li className='font-semibold'>
                About
              </li>
            </Link>
            <Link to="/profile">
              <li className='font-semibold'>
                Profile
              </li>
            </Link>
            <Link to="/profile">
              {user && user.currentUser ? (
                <img
                  className='h-8 w-8 rounded-full'
                  src={user.currentUser.profilePic} alt="" />
              ) : (
                <li className='font-semibold'>
                  Sign In
                </li>
              )}
            </Link>

          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header