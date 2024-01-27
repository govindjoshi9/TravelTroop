import React, { useEffect, useState } from 'react'
import Parks from './Parks';
import PhotosUploads from './PhotosUploads';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from './AccountNav';

export default function PlacesForm() {
    const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [discription, setDescription] = useState("");
  const [parks, setParks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);


  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/places/'+id).then(responce =>{
          const {data} = responce;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.addedPhotos);
          setDescription(data.discription);
          setParks(data.parks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setMaxGuest(data.maxGuest);
          setCheckOut(data.checkOut);
          setPrice(data.price);

    })
  },[id])


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

  async function addNewPlace(ev){
    ev.preventDefault();
    const placedata = {title, address, 
      addedPhotos, discription, parks, 
      extraInfo,checkIn, checkOut, maxGuest, price}
    if(id){
      //updata
      await axios.put("/places",{
        id, ...placedata });
          setRedirect(true);

    }else{
      //new place
      await axios.post("/places", placedata);
          setRedirect(true);
    }
  }
  if(redirect ){
    return <Navigate to={'/account/places'}/>
  }

  return (
    <div>
      <AccountNav/>
          <form onSubmit={addNewPlace}>
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
            <div className="grid gap-2 sm:grid-cols-4">
              <div className="mt-2 -mb-1">
                <h3>ChecK in time</h3>
                <input type="text" value={checkIn} onChange={ev=> setCheckIn(ev.target.value)} placeholder="14:00" />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Check out time</h3>
                <input type="text" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}/>
              </div>
              <div className="mt-2 -mb-1">
                <h3>Max number of guests</h3>
                <input type="number" value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
              </div>
              <div className="mt-2 -mb-1">
                <h3>Per night  price</h3>
                <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)}/>
              </div>
            </div>
            
            <button className="primary my-4">Save</button>
          </form>
        </div>
  )
}
