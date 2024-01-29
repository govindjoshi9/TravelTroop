import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import {UserContext} from '../UserContext'
import {  Navigate } from "react-router-dom";
export default function BookingWidget({ placs }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user) {
      setName(user.name)
    }
  },[user])
  let numberofDays = 0;
  if (checkIn && checkOut) {
    numberofDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookthisPlace() {
    const responce = await axios.post("/booking", {
      checkIn,
      checkOut,
      maxGuest,
      name,
      phone,
      place: placs._id,
      price: numberofDays * placs.price,
    });
    const bookingid = responce.data._id;
    setRedirect(`/account/booking/${bookingid}`)
  }

  if (redirect) {
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <div className="bg-gray-50 shadow p-4 rounded-2xl">
        <div className="text-xl text-center">
          Price : ${placs.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="px-3 py-4 border-l">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="px-3 py-4 border-t">
            <label>No of Guests:</label>
            <input
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
            />
          </div>
          {numberofDays > 0 && (
            <div className="px-3 py-4 border-t">
              <label>Your full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label>Phone No:</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookthisPlace} className="primary mt-4">
          Book this place
          {numberofDays > 0 && <span>$ {numberofDays * placs.price}</span>}
        </button>
      </div>
    </div>
  );
}
