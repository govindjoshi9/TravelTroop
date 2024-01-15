import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Parks from "./Parks";
export default function Places() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [phtoLink, setPhotoLink] = useState("");
  const [discription, setDescription] = useState("");
  const [parks, setParks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, ssetCheckOut] = useState("");
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
              onchange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apertment"
            />
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              value={address}
              onchange={(ev) => setAddress(ev.target.value)}
              placeholder="Address"
            />
            {preInput("Photo", "more = better")}
            <div className="flex gap-2">
              <input
                type="text"
                value={phtoLink}
                onchange={(ev) => setPhotoLink(ev.target.value)}
                placeholder={"Add using a link .....jpg"}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className=" flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
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
                    d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput("Description", "description of the place")}
            <textarea />
            {preInput("Perks", "select all the parks of your place")}
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Parks
                // selected={parks}
                // onchange={setParks()}
              />
            </div>
            {preInput("Extra Info", "house rules, etc")}
            <textarea />
            {preInput(
              "Check in&out times",
              "check in and out times, remeber to have some time window for cleaning the room betwwn guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2 -mb-1">
                <h3>ChecK in time</h3>
                <input type="text" placeholder="14:00" />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Check out time</h3>
                <input type="text" />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Max number of guests</h3>
                <input type="text" />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
