import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Parks from "./Parks";
import axios from 'axios';
import PhotosUploads from "./PhotosUploads";
export default function Places() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [discription, setDescription] = useState("");
  const [parks, setParks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

  function Inputheader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {Inputheader(header)}
        {inputDescription(description)}
      </>
    );
  }
  

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "title for your place should be short and catchy as a advistement"
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apertment"
            />
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Address"
            />
            {preInput("Photo", "more = better")}
            
              <PhotosUploads addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            {preInput("Description", "description of the place")}
            <textarea value={discription} onChange={ev=>setDescription(ev.target.value)}/>
            {preInput("Perks", "select all the parks of your place")}
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Parks
                selected={parks}
                onChange={setParks}
              />
            </div>
            {preInput("Extra Info", "house rules, etc")}
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
            {preInput(
              "Check in&out times",
              "check in and out times, remeber to have some time window for cleaning the room betwwn guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2 -mb-1">
                <h3>ChecK in time</h3>
                <input type="text" value={checkIn} onChange={ev=> setCheckIn(ev.target.value)} placeholder="14:00" />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Check out time</h3>
                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev=>setCheckOut(ev.target.value))}/>
              </div>
              <div className="mt-2 -mb-1">
                <h3>Max number of guests</h3>
                <input type="number" value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
