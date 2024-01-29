import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  useEffect(() => {
    if (id) {
      axios.get('/booking').then(res => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking)
        }
      })
    }
  }, [id])
  
  if (!booking) {
    return "";
  }
  return (
    <div>
      <div className='my-8'>
        <h1 className='text-3xl'>{booking.place.title}</h1>
        <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
          <h2 className='text-xl'>Your booking information:</h2>
        </div>
      </div>
    </div>
  )
}
