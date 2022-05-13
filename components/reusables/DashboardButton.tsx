import React from 'react'
import { motion } from "framer-motion"

interface ReusableButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    title: string
    clicked: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    width: string
    typeBtn?: string
}

const DashboardButton = ({ title, clicked, width, onClick, typeBtn}: ReusableButtonProps) => {
    return (
        <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.101 }} whileTap={{ scale: 0.9 }} className={`px-6 py-3 ${width} text-sm my-4 rounded-3xl ${typeBtn! === "Interested" ? `text-black border-gray-300` : `text-white border-white`} ${clicked ? `bg-purple-800` : `bg-transparent border`}  rounded-md shadow font-semibold`}>
            {title}
        </motion.button>
    )
}

export default DashboardButton