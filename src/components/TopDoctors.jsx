import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer 
                                   hover:translate-y-[-10px] transition-all duration-500 flex flex-col items-center p-4'
                        key={index}
                    >
                        {/* Doctor Profile Image (Round) */}
                        <img
                            className='w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover bg-[#EAEFFF]'
                            src={item.image}
                            alt={item.name}
                        />

                        <div className='p-4 text-center'>
                            <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
            >
                Explore More Doctors →
            </button>
        </div>
    )
}

export default TopDoctors
