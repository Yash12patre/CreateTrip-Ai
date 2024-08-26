import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
        trip&&GetPlacePhoto();
    },[trip])
  
  
    const GetPlacePhoto=async()=>{
      try {
        const data={
          textQuery:trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[2].name)
          const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name);
          setPhotoUrl(PhotoUrl);
        })
        
      } catch (error) {
        console.log("mamaji",error)
      }
  
    }
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all '>
       <img src={photoUrl?photoUrl :' /placeholder.jpg'} className='object-cover rounded-xl h-[220px]' />
       <div>
        <h2 className='font-bold text-xl'>{trip.userSelection.location.label}</h2>
        <h2 className='text-sm to-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget</h2>
       </div>
    </div>
    </Link>
    
  )
}

export default UserTripCardItem