import React, { useContext } from 'react'
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function Account() {
    const { ready, user } = useContext(UserContext);
    if (!ready) {
        return "Loading...."
    }
    if (ready && !user ) {
        return <Navigate to={'/login'}/>
    }

    let { subPage } = useParams();
  if (subPage !== undefined) {
      subPage = "profile";
    }
  function linkClass(type) {
    let classes = 'py-2 px-6';
    if (type === subPage) {
      classes += 'bg-primary text-white rounded-full';
    }
    return classes;

  }

  return (
    <div>
          <nav className='w-full flex justify-center mt-8 gap-2'>
              <Link className={linkClass('profile')} to={'/account'}>My Profile</Link>
              <Link className={linkClass('booking')} to={'/account/booking'}>My Booking</Link>
              <Link className={linkClass('places')} to={'/account/places'}>My Accomodation</Link>
              
        </nav>
    </div>
  ) 
}
