import React, { useEffect, useState } from 'react'
import AccountNav from './pages/AccountNav'
import axios from 'axios'
import {differenceInCalendarDays, format} from 'date-fns'
export default function BookingsPage() {
    const [bookings, setBooking] = useState([]);
    useEffect(() => {
        axios.get('/booking').then(res => {
            setBooking(res.data)
        })
    }, [])
  
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              key={booking}
            >
              <div className="w-48">
                <img
                  className="object-cover"
                  src={
                    "http://localhost:8080/uploads/" +
                    booking.place.addedPhotos[0]
                  }
                  alt=""
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl ">{booking.place.title}</h2>
                <div className='flex gap-2 border-t border-gray-300 mt-2 py-2'>
                  {/* calnder svg */}
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")}
                  &rarr;
                  {/* calnder svg */}
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </div>
                <div className='flex gap-1 mb-2 mt-2  text-sm'>
                  {/* night svg */}
                  Number of night: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights<br/>
                  Total Price: ${booking.price}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
