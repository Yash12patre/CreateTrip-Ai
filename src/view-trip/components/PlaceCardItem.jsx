import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    place&&GetPlacePhoto();
  },[place])


  const GetPlacePhoto=async()=>{
    try {
      const data={
        textQuery:place?.placeName
      }
      const result = await GetPlaceDetails(data).then(resp=>{
        const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name);
        setPhotoUrl(PhotoUrl);
      })
      
    } catch (error) {
      console.log("mamaji",error)
    }

  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>

    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-sm'>
        <img src={photoUrl?photoUrl :' /placeholder.jpg'}  className=' flex gap-5 w-[130px] h-[100px] rounded-xl object-cover' />
        <div className='my-2'>
            <h2 className='font-bold text-lg '>{place.placeName}</h2>
            <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem