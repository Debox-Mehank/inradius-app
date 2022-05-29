import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Logo from '../reusables/Logo'
import LogoWhite from '../reusables/LogoWhite'
import CTASection from './CTASection'

const Home3 = () => {
    const [showwhiteIcon, setShowWhiteIcon] = useState(true)

    useEffect(() => {
        const checkLastSection = () => {
            var section1 = document.querySelector('#cta');
            var position1 = section1?.getBoundingClientRect();
            if (position1?.top == 0) {
                setShowWhiteIcon(false)
            } else {
                setShowWhiteIcon(true)
            }
        }
        document.addEventListener('scroll', checkLastSection, true)
        return () => document.removeEventListener('scroll', (event) => checkLastSection)
    }, [])
    return (
        <div className='h-screen relative overflow-y-auto snap-y snap-mandatory'>

            {/* Logo */}
            {showwhiteIcon ? <div className='z-40 w-full p-8 md:px-20 fixed top-0 left-0 right-0'>
                <div className='flex justify-center items-center w-28 h-28 md:w-32 md:h-32'>
                    <LogoWhite />
                </div>
            </div> : <div className='z-40 w-full p-8 md:px-20 fixed top-0 left-0 right-0'>
                <div className='flex justify-center items-center w-28 h-28 md:w-32 md:h-32'>
                    <Logo />
                </div>
            </div>}


            {/* Down Arrow */}
            {showwhiteIcon && (
                <div className='z-40 w-max fixed bottom-10 right-20 animate-bounce flex justify-center items-center flex-col'>
                    <FontAwesomeIcon icon={faAngleDown} size='4x' border={false} className='text-white' />
                </div>
            )}

            {/* Animation Section */}
            <section className='h-screen w-full bg-traffic p-6 snap-start text-white flex justify-center items-center'>
                <h2 data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true" className='whitespace-pre-line text-3xl md:text-4xl xl:text-6xl font-bold tracking-widest leading-relaxed text-center mt-28 lg:mt-0 xl:mt-0'>{"Still stuck somewhere\n you don't belong?"} </h2>
            </section>
            <section className='h-screen w-full bg-bus p-6 snap-start text-white flex justify-center items-center'>
                <h2 data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true" className='whitespace-pre-line text-3xl md:text-4xl xl:text-6xl font-bold tracking-widest leading-relaxed text-center mt-28 lg:mt-0 xl:mt-0'>{"Still travelling hours\n to reach work?"} </h2>
            </section>
            <section className='h-screen w-full bg-rickshaw p-6 snap-start text-white flex justify-center items-center'>
                <h2 data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true" className='whitespace-pre-line text-3xl md:text-4xl xl:text-6xl font-bold tracking-widest leading-relaxed text-center mt-28 lg:mt-0 xl:mt-0'>{"Tired of the rejections\nfrom autowalas?"} </h2>
            </section>
            <section className='h-screen w-full bg-train p-6 snap-start text-white flex justify-center items-center'>
                <h2 data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true" className='whitespace-pre-line text-3xl md:text-4xl xl:text-6xl font-bold tracking-widest leading-relaxed text-center mt-28 lg:mt-0 xl:mt-0'>{"Fed up waiting for that\n 4th seat?"} </h2>
            </section>

            {/* CTA Section */}
            <CTASection />
        </div>
    )
}

export default Home3