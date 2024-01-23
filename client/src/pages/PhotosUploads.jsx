import axios from 'axios';
import React, { useState } from 'react'

export default function PhotosUploads({addedPhotos , onChange}) {
    const [phtoLink, setPhotoLink] = useState("");


    async function addPhotobyLink(ev){
        ev.preventDefault();
        const {data: filename}  = await axios.post('/upload-by-link', {link:phtoLink})
        onChange(prev =>{
          return [...prev, filename]
        })
        setPhotoLink('');
      }
      async function uploadPhoto(ev){
        const file =ev.target.files;
        const data = new FormData();
        for(let i=0; i<file.length; i++){
    
          data.append('photos',file[i]);
        }
        await axios.post('/upload', data,{
          headers: {'Content-Type':'multipart/form-data'}
        }).then(responce =>{
          const {data: filenames} = responce;
          onChange(prev =>{
            return [...prev, ...filenames]
          })
        })
      }
  return (
    <>
    <div className="flex gap-2">
              <input
                type="text"
                value={phtoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                placeholder={"Add using a link .....jpg"}
              />
              <button onClick={addPhotobyLink} className="bg-gray-200 px-4 rounded-2xl">
                Add Photo
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length> 0 && addedPhotos.map(link=>(
                <div className="h-32 flex" key={link}>
                 <img className="rounded-2xl w-full object-cover " src={'http://localhost:8080/uploads/' +link} alt="" />
                </div>
              ))}
              <label className="cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
              <input type="file" multiple className="hidden" onChange={uploadPhoto} />
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
              </label>
            </div>
    
    </>
  )
}
