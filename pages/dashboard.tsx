import React from 'react'
import DashboardButton from '../components/reusables/DashboardButton'
import Logo from '../components/reusables/Logo'
import LogoWhite from '../components/reusables/LogoWhite'
import ProfileDisplay from '../components/reusables/ProfileDisplay'

function Dashboard() {
  return (
    <>
    <header className='h-[20%] fixed inset-0 bg-white'>
    <div className='z-50 py-4 sm:py-4 fixed sm:px-4 px-4 top-0 left-0 right-0 hidden lg:block'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <Logo />
                    </div>
                </div>
                {/* Logo White */}
                <div className='z-50 py-4 sm:py-4 sm:px-4 px-4 fixed top-0 left-0 right-0 lg:hidden'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <LogoWhite />
                    </div>
                </div>
    </header>
    <div className='flex mt-[9rem] flex-row'>
      <div className='basis-[20%] flex flex-col'>
        <div className='bg-primary fixed w-[18rem] rounded-t-3xl flex flex-col items-center pt-8 h-full'>
        <DashboardButton width='md:w-4/5 w-4/5' title="Explore" clicked={true}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="My Interests" clicked={false}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="Interested In Me" clicked={false}/>
        <DashboardButton width='md:w-4/5 w-4/5' title="Saved For Later" clicked={false}/>
        </div>
      </div>
      <div className='basis-[80%] flex flex-col'>
        <div className='px-8'>
        <ProfileDisplay />
        <ProfileDisplay />
        <ProfileDisplay />
        <ProfileDisplay />
        <ProfileDisplay />
    </div>
    </div>
    </div>
    </>
  )
}

export default Dashboard