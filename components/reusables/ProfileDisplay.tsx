import React from 'react'
import DashboardButton from './DashboardButton'
import ReusableButton from './ReusableButton'

function ProfileDisplay({index, companyName, jobTitle, jobDesc, fromPay, toPay, onClick, noInt} : any) {
  console.log("noInt",noInt)
  return (
    <div className='bg-transparent border mb-4 border-gray-300 rounded-3xl w-[80%] h-[15.5rem] flex flex-row align-middle items-start'>
        <div className='bg-transparent border mt-7 border-gray-300 rounded-3xl h-[12rem] w-2/6 ml-7'>Image</div>
        <div className='flex flex-col mx-8'>
            <div className='font-semibold text-xl mt-7'>{companyName}</div>
            <div className='font-normal text-lg mt-2'>{jobTitle}</div>
            <div className='font-light text-sm mt-2'>{jobDesc}</div>
            <div className='flex flex-row'>
            <div className='font-light text-sm mt-2'>1-2 years</div>
            <div className='font-light text-sm mt-2 pl-8'>{`${parseInt(fromPay).toLocaleString('en-IN',{ maximumFractionDigits: 0 })} - ${parseInt(toPay).toLocaleString('en-IN',{ maximumFractionDigits: 0 })}`}</div>
        </div>
        {noInt === false ?
            <div className='flex flex-row'>
            <DashboardButton width='' title="Interested" clicked={true} onClick={() => onClick(index, companyName, jobTitle, jobDesc, fromPay, toPay)}/>
            <div className='pl-4'>
            <DashboardButton width='' typeBtn='Interested' title="Not Interested" clicked={false}/>
            </div>
        </div> : null
        }
        </div>

    </div>
  )
}

export default ProfileDisplay