import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PlacePage() {
    const { id } = useParams();
    const [placs, setPlace] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(resp => {
            setPlace(resp.data);
        });
    }, [id]);

    if (!placs) return "";

    const displayPhotos = showMore ? placs.addedPhotos : placs.addedPhotos?.slice(0, 3);

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8 relative'>
            <h1 className='text-2xl'>{placs?.title}</h1>
            <a className='my-2 block font-semibold underline' target='__blank' href={'https://maps.google.com/?q=' + placs?.address}>
                {placs?.address}
            </a>
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 rounded-2xl'>
                {displayPhotos.map((photo, index) => (
                    <div key={index} className='h-80 overflow-hidden'>
                        <img className='w-full h-full object-cover' src={'http://localhost:8080/uploads/' + photo} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </div>
            {placs.addedPhotos && placs.addedPhotos.length > 3 && (
                <button
                    className='absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500'
                    onClick={() => setShowMore(!showMore)}
                >
                    {showMore ? 'Show less photos' : 'Show more photos'}
                </button>
            )}
        </div>
    );
}
