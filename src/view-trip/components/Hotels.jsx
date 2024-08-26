import { Hotel } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'
import HotelCardItem from './HotelCardItem'

function Hotels({trip}) {
  return (
    <div> 
        <h2 className=' font-bold text-2xl my-5'>Hotel Recomendation</h2>
        <div className='grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4'>
            {trip?.tripData?.hotels?.map((hotel, index)=>(
           <HotelCardItem hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels