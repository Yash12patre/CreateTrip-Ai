import React from 'react'
import PlaceCardItem from './PlaceCardItem'


function PlacesToVisit({trip}) {
  return (
    <div>
    <h2 className='font-bold text-2xl mt-3'>Places To Visit</h2>
    <div>
        {trip.tripData?.itinerary.map((item,index)=>(
            <div>
                <h2 className='font-medium text-lg mt-3'>Day {item.day}</h2>
                <div className=' gap-3 md:grid grid-cols-2'>

                {item.plan.map((place,index)=>(
                    <div className=''>
                        <h2 className='font-medium text-purple-600 text-sm'>{place.bestTime}</h2>
                        
                            <PlaceCardItem place={place}/>
                        
                    </div>
                ))}
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default PlacesToVisit