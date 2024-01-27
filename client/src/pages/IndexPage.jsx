import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(responce => {
            setPlaces(responce.data,);
        })
    }, [])
    return (

        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places?.map(place => (
                <div>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place.addedPhotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:8080/uploads/' + place.addedPhotos?.[0]} alt="" />
                        )}
                    </div>
                    <h2 className="text-sm  leading-4">
                    {place?.title}
                    </h2>
                    <h3 className="font-bold">{place.address}</h3>
                    <div className="mt-2">${place.price}  per night</div>
                </div>
            ))}
        </div>

    );
}