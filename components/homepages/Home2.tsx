import React from 'react'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../reusables/Logo'
import CTASection from './CTASection'

const Home2 = () => {
    return (
        <div className='h-screen relative overflow-y-auto snap-y snap-mandatory'>
            {/* Logo */}
            <div className='z-40 w-full p-8 md:px-20 fixed top-0 left-0 right-0'>
                <div className='flex justify-center items-center w-28 h-28 md:w-32 md:h-32 bg-white'>
                    <Logo />
                </div>
            </div>

            {/* Down Arrow */}
            <div className='z-40 w-full xl:w-max absolute bottom-10 left-0 xl:left-20 animate-bounce flex justify-center items-center flex-col'>
                Scroll Down
                <FontAwesomeIcon icon={faAngleDown} size='4x' border={false} className='text-primary' />
            </div>

            {/* Animation Section */}
            <section className='w-full h-screen grid lg:grid-cols-2 relative snap-start'>
                <div className='h-full bg-white flex flex-col justify-center items-start p-8 md:px-20'>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold text-primary' data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">{"Changing"}</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold' data-aos-delay="500" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">the way</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold' data-aos-delay="1000" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">मुंबई</h2>
                    <h2 className='text-3xl lg:text-4xl xl:text-banner font-bold text-primary' data-aos-delay="1500" data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-mirror="true">{"travels to work!"}</h2>
                </div>
                <div className='hidden xl:flex h-full bg-black bg-cover bg-center relative flex-col justify-center items-center overflow-hidden'>
                    {/* Content */}
                    <div className='w-full z-10'>
                        <div className='opacity-70 w-full'>
                            <div className='w-4/5 mr-auto border-2 border-white rounded-xl text-white pl-12 py-6 -ml-4' data-aos-delay="1800" data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                <p className='text-2xl whitespace-pre-line' data-aos-delay="2000" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                    Why is communicating so <span className='font-bold'>stressful</span>{"\n"}in Mumbai?
                                </p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='opacity-70 w-full'>
                            <div className='w-4/5 ml-auto border-2 border-white rounded-xl text-white pl-12 py-6 -mr-4' data-aos-delay="2400" data-aos="fade-left" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                <p className='text-2xl whitespace-pre-line' data-aos-delay="2600" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                    Commuters spend<span className='font-bold'>135%</span>{"\n"}on Mumbai roads than any other city?
                                </p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='opacity-70 w-full'>
                            <div className='w-4/5 mr-auto border-2 border-white rounded-xl text-white pl-12 py-6 -ml-4' data-aos-delay="3000" data-aos="fade-right" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                <p className='text-2xl whitespace-pre-line' data-aos-delay="3200" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                    30 minutes commute takes over{"\n"}<span className='font-bold'>an hour</span> in peak time in Mumbai?
                                </p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className='opacity-70 w-full'>
                            <div className='w-4/5 ml-auto border-2 border-white rounded-xl text-white pl-12 py-6 -mr-4' data-aos-delay="3400" data-aos="fade-left" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                <p className='text-2xl whitespace-pre-line' data-aos-delay="3600" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                                    Mumbai: <span className='font-bold'>Slow commuting,{"\n"}Low productivity</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-traffic bg-cover' data-aos-delay="200" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true"></div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    )
}

export default Home2