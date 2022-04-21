import React from 'react';
import { motion } from "framer-motion"

interface BackdropProps {
    children: JSX.Element;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop = ({ children, onClick }: BackdropProps) => {
    return <motion.div
        className='absolute h-full w-full top-0 left-0 bg-backdropBg flex justify-center items-center z-20'
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        {children}
    </motion.div>;
};

export default Backdrop;
