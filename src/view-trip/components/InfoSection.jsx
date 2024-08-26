import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';



const InfoSection = ({trip}) => {
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
    <>
        <img src={photoUrl?photoUrl :' /placeholder.jpg'} alt="" 
        className='h-[340px] w-full object-cover rounded-xl'
        />
        <div className='flex items-center justify-between'>

           <div className='my-5 flex flex-col gap-2'>
             <h2 className='font-bold text-2xl'>
             {trip?.userSelection?.location?.label}</h2>
               <div className='flex gap-5'>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 {trip?.userSelection?.budget} Days</h2>
                  <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💸 Number of Traveler: {trip?.userSelection?.traveler} Days</h2>
               </div>
           </div>
           <Button><IoIosSend /></Button>
        </div>
        
    </>

  )
}

export default InfoSection