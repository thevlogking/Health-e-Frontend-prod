import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col md:flex-row flex-wrap rounded-full px-6 sm:px-10 md:px-14 lg:px-20 my-20 md:mx-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 overflow-hidden">

      {/* ------- Left Side ------- */}
      <div className="flex-1 py-10 sm:py-12 md:py-16 lg:py-24 lg:pl-5 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-snug">
          <span>Book Appointment</span>
          <br />
          <span className="mt-3 inline-block">With 100+ Trusted Doctors</span>
        </h2>
        <button
          onClick={() => { navigate('/login'); scrollTo(0, 0) }}
          className="bg-white text-sm sm:text-base text-blue-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>

      {/* ------- Right Side ------- */}
      <div className="md:w-1/2 relative flex justify-center items-end">
        <img
          className="absolute top-0 bottom-0 right-0 w-full h-full object-contain"
          src={assets.appointment_img}
          alt="Appointment illustration"
        />
      </div>
    </div>
  )
}

export default Banner
