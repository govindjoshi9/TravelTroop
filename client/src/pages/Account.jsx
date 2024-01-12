import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import { Link, Navigate } from 'react-router-dom';

export default function Account() {
    const { ready, user } = useContext(UserContext);
    if (!ready) {
        return "Loading...."
    }
    if (ready && !user ) {
        return <Navigate to={'/login'}/>
    }
  return (
    <div>
          <nav className='w-full flex justify-center mt-8 gap-2'>
              <Link className='p-2 px-6 bg-primary text-white rounded-full ' to={'/account/booking'}>My Profile</Link>
              <Link className='p-2 px-6' to={'/account/booking'}>My Booking</Link>
              <Link className='p-2 px-6' to={'/account/places'}>My Accomodation</Link>
              
        </nav>
    </div>
  ) 
}
