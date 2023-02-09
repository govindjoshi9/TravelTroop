import React from 'react'
import {Link} from 'react-router-dom';
export default function loginPage() {
  return (
    <div className='mt-4 grow flex item-center justify-around'>
        <div className='mb-64'> 
        <h1 className='text-3xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto '>
            <input type="email" placeholder='Your@email.com' />
            <input type="password" placeholder='password' />
            <button className='primary'>Login</button>
            <div className='text-center py-2 text-gray-500'>
                Don't have an account yet?
                <Link className='underline text-black' to={'/register'}>Register now</Link>
            </div>
        </form>
        </div>
        
    </div>
  )
}
