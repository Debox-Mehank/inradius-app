import React from 'react'
import DashboardButton from './DashboardButton'
import ReusableButton from './ReusableButton'

function ProfileDisplay() {
  return (
    <div className='bg-transparent border mb-4 border-gray-300 rounded-3xl w-[80%] h-[15.5rem] flex flex-row align-middle items-start'>
        <div className='bg-transparent border mt-7 border-gray-300 rounded-3xl h-[12rem] w-2/6 ml-7'>Image</div>
        <div className='flex flex-col mx-8'>
            <div className='font-semibold text-xl mt-7'>Company Name</div>
            <div className='font-normal text-lg mt-2'>Job Domain</div>
            <div className='font-light text-sm mt-2'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
 nonummy nibh euismod tincidunt ut laoreet dolore ma</div>
            <div className='flex flex-row'>
            <div className='font-light text-sm mt-2'>1-2 years</div>
            <div className='font-light text-sm mt-2 pl-8'>3,00,000 - 4,00,000</div>
        </div>
            <div className='flex flex-row justify-between'>
            <DashboardButton width='' title="Interested" clicked={true}/>
            <DashboardButton width='' typeBtn='Interested' title="Not Interested" clicked={false}/>
        </div>
        </div>

    </div>
  )
}

export default ProfileDisplay