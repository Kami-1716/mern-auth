import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-slate-300 mb-[1px]'>
      <header className='flex justify-between items-center max-w-6xl mx-auto bg-slate-300 shadow-sm'>
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
            <Link to="/sign-up">
              <li className='font-semibold'>
                Sign Up
              </li>
            </Link>
            <Link to="/profile">
              <li className='font-semibold'>
                Profile
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header