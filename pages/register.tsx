import React, { useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Logo from '../components/reusables/Logo';
import ReusableForm from '../components/reusables/ResuableForm';
import LogoWhite from '../components/reusables/LogoWhite';
import type { NextPage } from 'next'
import { FormTemplateType, FieldTypes } from '../utils/custom_types';
import register_static from "../assets/register_static.png";
import { useDispatch } from 'react-redux';
import { setUser, UserState, UserType } from '../features/userSlice';
import { useForm } from 'react-hook-form';
import { api } from '../utils/AxiosClient';
const Register: NextPage = () => {
    const router = useRouter()
    const { type } = router.query

    const { register, handleSubmit, formState, watch } = useForm()

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
                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d.@$!%*#?&]{8,}$/, message: "enter valid password!" },
                },
                cols: "col-span-2",
                desc: <p className="text-xs text-white px-1 font-light py-1">{"Password should be 8-12 characters long with atleast one uppercase letter, containing a number (0-9) and a speacial character (@,#,%,$...)"}</p>
            },
            {
                title: "Confirm Password*",
                name: "cnfPassword",
                type: FieldTypes.password,
                validation: {
                    required: "confirm password cannot be empty!",
                    validate: (val: string) => {
                        if (watch('password') != val) {
                            return "both passwords do no match!";
                        }
                    }
                },
                cols: "col-span-2",
            }
        ]
    }

    const EmployeerRegistrationFormTemplate: FormTemplateType = {
        title: "Employer Registration",
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
                title: "Company Name*",
                name: "companyName",
                type: FieldTypes.text,
                validation: {
                    required: "company name cannot be empty!"
                },
                cols: "col-span-2"
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
                    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d.@$!%*#?&]{8,}$/, message: "enter valid password!" },
                },
                cols: "col-span-2",
                desc: <p className="text-xs text-white px-1 font-light py-1">{"Password should be 8-12 characters long with atleast one uppercase letter, containing a number (0-9) and a speacial character (@,#,%,$...)"}</p>
            }
        ]
    }

    const dispatch = useDispatch()
    const onSubmit = async (data: UserState) => {
        dispatch(setUser({ firstName: data.firstName, lastName: data.lastName, companyName: type === "employer" ? data.companyName : null, email: data.email, phoneNumber: data.phoneNumber, type: type === "employee" ? UserType.employee : UserType.employer }))
        try{
            const response = await api.post("", {firstName: data.firstName, lastName: data.lastName, companyName: type === "employer" ? data.companyName : "", email: data.email, type: type === "employee" ? "employee" : "employer", isSurveyComplete: false, isProfileComplete: false});
            console.log(response)
            localStorage.setItem("id", response.data)
            router.push("/survey")
        }
        catch(e){
        console.log(e)}
        }

    const [counter, setCounter] = useState(0)

    return (
        <React.Fragment>
            <Head>
                <title>Welcome to InRadius!</title>
                <link rel="shortcut icon" href="/favicon.png" />
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
                    <div className='w-full h-full bg-white hidden lg:flex flex-col'>
                        <div className='w-full flex items-end pt-16 px-16' style={{ height: "45%" }}>
                            <h2 className='whitespace-pre-line text-2xl lg:text-3xl xl:text-4xl font-bold tracking-widest leading-relaxed mb-16'>{"You don't have to do this\nyou "} <span className='text-primary'>choose</span> {" to!"}</h2>
                        </div>
                        <div className=' w-full flex items-center justify-center p-12' style={{ height: "55%" }}>
                            <div className='h-full w-full relative'>
                                <Image
                                    alt=''
                                    src={register_static}
                                    layout='fill'
                                    objectFit='cover'
                                    className='rounded-xl'
                                />
                            </div>
                        </div>
                    </div>

                    {/*Registration Form */}
                    <div className='w-full h-full bg-darkGray flex flex-col justify-center items-center tracking-wide'>
                        {/* Register Form Fields */}
                        <div className='max-w-md w-4/5'>
                            {type && (
                                <ReusableForm template={type === "employee" ? EmployeeRegistrationFormTemplate : EmployeerRegistrationFormTemplate} onSubmit={onSubmit} formState={formState} handleSubmit={handleSubmit} register={register} watch={watch} setCounter={setCounter} />
                            )}
                            <p className='text-center text-white font-light text-xs py-2'>Already have an account ?<span className="cursor-pointer text-primary font-medium"> <Link href={'/login'}>Click here</Link> </span></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register
