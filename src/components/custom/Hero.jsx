import React from 'react'
import { Button } from '../ui/button'
import { Link, NavLink } from 'react-router-dom'
const Hero = () => {
  return (
    <div  className='flex items-center mx-56 gap-16 flex-col '>
        <h1 className='font-inter font-bold text-5xl text=[60px] text-center mt-16'> <span className='text-cyan-600'>Discover incredible</span> adventures without breaking the bank.</h1>
        <p className='font-poppins text-xl text-gray-700 font-medium text-center'>
        Your perfect trip, planned to perfection. Select your dates, and let us handle the rest. From flight bookings to hotel reservations, we craft your ideal itinerary.
        </p>
        <Link
        to={'/createtrip'}
        >
        <Button>Get Started it's Free</Button>
        </Link>
        
    </div>
  )
}

export default Hero