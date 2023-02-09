import React, { useState } from 'react'
import {Link} from 'react-router-dom';
export default function RegisterPage() {
    const[name, setName] = useState('');
    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');


  return (
    <div className='mt-4 grow flex item-center justify-around'>
        <div className='mb-64'> 
        <h1 className='text-3xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto '>
            <input type="text" placeholder='Name'
            value={name}
        
            />
            <input type="email" placeholder='Your@email.com' />
            <input type="password" placeholder='password' />
            <button className='primary'>Login</button>
            <div className='text-center py-2 text-gray-500'>
                Already a member? 
                <Link className='underline text-black' to={'/login'}>Login</Link>
            </div>
        </form>
        </div>
        
    </div>
  )
}
