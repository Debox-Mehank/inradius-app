import React from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../reusables/Logo'
import CTASection from './CTASection'

const Home1 = () => {
    return (
        <div className='h-full relative overflow-y-auto snap-y snap-mandatory'>
            {/* Logo */}
            <div className='z-40 w-full py-2 px-8 xl:p-8 md:px-20 fixed top-0 left-0 right-0'>
                <div className='z-40 flex justify-center items-center w-28 h-28 md:w-32 md:h-32 bg-white'>
                    <Logo />
                </div>
            </div>

            {/* Down Arrow */}
            <div className='z-40 w-full xl:w-max absolute bottom-10 left-0 xl:left-20 animate-bounce flex justify-center items-center flex-col'>
                Scroll Down
                <FontAwesomeIcon icon={faAngleDown} size='4x' border={false} className='text-primary' />
            </div>

            {/* Animation Section */}
            <section className='w-full h-screen grid lg:grid-cols-2 snap-start'>
                <div className='h-screen bg-white flex flex-col justify-center items-start p-8 md:px-20'>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold' data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">{"Bringing"}</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold' data-aos-delay="500" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true"><span className='text-primary'>Talent</span> and</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold text-primary' data-aos-delay="1000" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">{"Opportunities?"}</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold' data-aos-delay="1500" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">{"Closer..."}</h2>
                    <p className='text-base lg:text-lg font-bold mt-4' data-aos-delay="2000" data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">{"Like never before!"}</p>
                </div>
                <div className='hidden xl:flex h-screen bg-black bg-cover bg-center relative flex-col justify-center items-center'>
                    {/* Radius */}
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-map bg-cover z-10' data-aos-delay="2200" data-aos="zoom-in" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true"></div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    )
}

export default Home1