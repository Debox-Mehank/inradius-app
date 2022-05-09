import React from 'react'
import { motion } from "framer-motion"

interface ReusableButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    title: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SurveyButton = ({ title, onClick}: ReusableButtonProps) => {
    return (
        <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.101 }} whileTap={{ scale: 0.9 }} className={`px-6 py-3 md:w-2/5 w-4/5 text-sm my-4 text-white bg-primary rounded-md shadow font-semibold`}>
            {title}
        </motion.button>
    )
}

export default SurveyButton