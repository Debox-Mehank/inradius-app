import React from 'react';
import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../components/reusables/Logo';
import ReusableForm from '../components/reusables/ResuableForm';
import LogoWhite from '../components/reusables/LogoWhite';
import type { NextPage } from 'next'
import { FormTemplateType, FieldTypes } from '../utils/custom_types';
import login_static from "../assets/register_static.png";

const EmployeeRegistrationFormTemplate: FormTemplateType = {
    title: "Employee Registration",
    buttonText: "Create Account",
    fields: [
        {
            title: "First Name*",
            name: "firstName",
            type: FieldTypes.text,
            validation: {
                required: "first name cannot be empty!"
            },
            cols: "col-span-2 lg:col-span-1"
        },
        {
            title: "Last Name*",
            name: "lastName",
            type: FieldTypes.text,
            validation: {
                required: "last name cannot be empty!"
            },
            cols: "col-span-2 lg:col-span-1"
        },
        {
            title: "Email*",
            name: "email",
            type: FieldTypes.email,
            validation: {
                required: "email cannot be empty!",
                pattern: { value: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/, message: "enter valid email!" },
            },
            cols: "col-span-2"
        },
        {
            title: "Password*",
            name: "password",
            type: FieldTypes.password,
            validation: {
                required: "password cannot be empty!",
                pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/, message: "enter valid password!" },
            },
            cols: "col-span-2",
            desc: <p className="text-xs text-white px-1 font-light py-1">{"Password should be 8-12 characters long containing a number (0-9) and a speacial character (@,#,%,$...)"}</p>
        }
    ]
}

const Register: NextPage = () => {
    const onSubmit = () => {
        console.log("Register");
    }
    return (
        <React.Fragment>
            <Head>
                <title>Welcome to InRadius!</title>
            </Head>
            <div className='w-full h-screen'>
                {/* Logo */}
                <div className='z-50 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0 hidden lg:block'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <Logo />
                    </div>
                </div>
                {/* Logo White */}
                <div className='z-50 py-2 px-8 lg:py-8 fixed top-0 left-0 right-0 lg:hidden'>
                    <div className='z-50 flex justify-center items-center w-24 h-24 lg:w-28 lg:h-28'>
                        <LogoWhite />
                    </div>
                </div>

                <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden'>
                    {/*Information Section */}
                    <div className='w-full h-full bg-white hidden lg:flex flex-col justify-center'>
                        <div className='w-full h-full flex justify-center items-center'>
                            <h2 className='px-8 whitespace-pre-line text-3xl lg:text-4xl font-bold tracking-widest leading-relaxed pt-16'>{"You don't have to do this\nyou "} <span className='text-primary'>choose</span> {" to!"}</h2>
                        </div>
                        <div className='w-full h-full max-h-96 flex justify-center items-center p-16 mb-16'>
                            <Image src={login_static} alt="" className='rounded-xl' />
                        </div>
                    </div>

                    {/*Registration Form */}
                    <div className='w-full h-full bg-darkGray flex flex-col justify-center items-center tracking-wide'>
                        {/* Register Form Fields */}
                        <div className='max-w-md w-4/5'>
                            <ReusableForm template={EmployeeRegistrationFormTemplate} onSubmit={onSubmit} />
                            <p className='text-center text-white font-light text-xs py-2'>Already have an account ? <span className="cursor-pointer text-primary font-medium"> <Link href={'/login'}>Click here</Link> </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register
