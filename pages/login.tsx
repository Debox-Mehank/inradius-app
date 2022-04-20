import React from 'react';
import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../components/reusables/Logo';
import ReusableForm from '../components/reusables/ResuableForm';
import LogoWhite from '../components/reusables/LogoWhite';
import type { NextPage } from 'next'
import { FormTemplateType, FieldTypes } from '../utils/custom_types';
import login_static from "../assets/login_static.png";

const LoginFormTemplate: FormTemplateType = {
    title: "Login",
    buttonText: "Access Account",
    fields: [
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
            desc: <p className="text-xs text-white px-1 font-medium hover:text-primary transition-all py-1 text-right cursor-pointer">{"Forgot password?"}</p>
        }
    ]
}

const Login: NextPage = () => {
    const onSubmit = () => {
        console.log("Login");
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
                            <h2 className='px-8 whitespace-pre-line text-3xl lg:text-4xl font-bold tracking-widest leading-relaxed pt-16'>{"You are 8 steps away getting a\njob "} <span className='text-primary'>closer</span> {" to your home!"}</h2>
                        </div>
                        <div className='w-full h-full max-h-96 flex justify-center items-center'>
                            <Image src={login_static} alt="" />
                        </div>
                    </div>

                    {/*Login Form */}
                    <div className='w-full h-full bg-darkGray flex flex-col justify-center items-center tracking-wide'>
                        {/* Register Form Fields */}
                        <div className='max-w-md w-4/5'>
                            <ReusableForm template={LoginFormTemplate} onSubmit={onSubmit} />
                            <p className='text-center text-white font-light text-xs py-2'>{"Don't have an account ? "}<span className="cursor-pointer text-primary font-medium"> <Link href={'/register?type=employee'}>Click here</Link> </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
