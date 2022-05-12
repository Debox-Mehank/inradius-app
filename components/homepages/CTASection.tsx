import React from 'react'
import ReusableButton from '../reusables/ReusableButton'

const CTASection = () => {
    return (
        <section className='w-full h-screen grid lg:grid-cols-2 snap-start' id='cta'>
            <div className='h-full bg-white flex flex-col justify-center items-start p-8 md:px-20'>
                <div data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                    <h2 className='whitespace-pre-line text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold tracking-widest leading-relaxed mt-20 lg:mt-0'>{"Looking For\n Opportunities?"} </h2>
                    <p className='whitespace-pre-line text-base md:text-lg lg:text-lg xl:text-lg font-medium tracking-widest leading-normal mt-8 lg:mt-14 mb-4'>{"Bringing Opportunities & Talent\ncloser with a hyperlocal smart\ntech platform."}</p>
                    <ReusableButton loading={"false"} bg="bg-primary" text="text-white" title='Proceed' link={`/register?type=employee`} />
                </div>
            </div>
            <div className='h-full bg-primary flex flex-col justify-center items-start p-8 md:px-20 text-white'>
                <div data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-mirror="true">
                    <h2 className='whitespace-pre-line text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold tracking-widest leading-relaxed'>{"Looking For\n Talent?"} </h2>
                    <p className='whitespace-pre-line text-base md:text-lg lg:text-lg xl:text-lg font-medium tracking-widest leading-normal mt-8 lg:mt-14 mb-4'>{"Bringing Talent & Opportunities\ncloser with a hyperlocal smart\ntech platform."}</p>
                    <ReusableButton loading={"false"} bg='bg-white' text="text-black" title='Proceed' link={`/register?type=employer`} />
                </div>
            </div>
        </section>
    )
}

export default CTASection