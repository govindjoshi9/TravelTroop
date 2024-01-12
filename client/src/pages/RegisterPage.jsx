import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom';
export default function RegisterPage() {
    const[name, setName] = useState('');
    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');
 async function registerUser(ev){
    ev.preventDefault();
    try {
      axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });
      alert('Registration successfull. Now you can log in');
    }
    catch (e) {
      alert('Registration faild. Pleas try  again later');
      
    }
  }

  return (
    <div className='mt-4 grow flex item-center justify-around'>
        <div className='mb-64'> 
        <h1 className='text-3xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto ' onSubmit={registerUser}>
            <input type="text" placeholder='Name'
            value={name}
            onChange={ev=>setName(ev.target.value)}
            />
            <input type="email" placeholder='Your@email.com' 
            value={email}
            onChange={ev=>setemail(ev.target.value)}
            />
            <input type="password" placeholder='password' 
            value={password}
            onChange={ev=>setpassword(ev.target.value)}
            />
            <button className='primary'>Register</button>
            <div className='text-center py-2 text-gray-500'>
                Already a member? 
                <Link className='underline text-black' to={'/login'}>Login</Link>
            </div>
        </form>
        </div>
        
    </div>
  )
}
