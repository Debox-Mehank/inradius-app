import React from 'react'
import { motion } from "framer-motion"
import Link from 'next/link';
import {TailSpin} from "@agney/react-loading"
interface ReusableButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    title: string;
    bg: string;
    text: string;
    link?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    type?: "button" | "submit" | "reset" | undefined
    loading: string
}


const ReusableButton = ({loading, title, bg, text, link, onClick, type }: ReusableButtonProps) => {
    return (
        <motion.button type={type} onClick={onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className={`px-3 py-2 text-sm ${bg} ${text} rounded-md shadow font-semibold`}>
            {loading === 'true' ? <div className='flex'><div className='pr-2'><TailSpin width={20} loading={loading}/></div> {link ? (
                <Link href={link}>
                    {title}
                </Link>
                // <a href={link} target="_blank" rel="noopener noreferrer">
                //     {title}
                // </a>
            ) : title }</div>: link ? (
                <Link href={link}>
                    {title}
                </Link>
                // <a href={link} target="_blank" rel="noopener noreferrer">
                //     {title}
                // </a>
            ) : title}
        </motion.button>
    )
}

export default ReusableButton