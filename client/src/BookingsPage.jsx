import React, { useEffect, useState } from 'react'
import AccountNav from './pages/AccountNav'
import axios from 'axios'

export default function BookingsPage() {
    const [bookings, setBooking] = useState([]);
    useEffect(() => {
        axios.get('/booking').then(resp => {
            setBooking(resp.data)
        })
    }, [])
  return (
    <div>
          <AccountNav />
          <div>
              {bookings?.length > 0 && bookings.map(booking => {
                  <div>
                    {booking.name} 
                  </div>;
              })}
          </div>
      </div>
  )
}
