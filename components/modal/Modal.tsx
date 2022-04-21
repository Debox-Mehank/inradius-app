import React from 'react';
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Backdrop from './Backdrop';

interface ModalProps {
    modalOpen: boolean;
    handleClose: React.MouseEventHandler<HTMLElement>;
    children: JSX.Element;
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        },
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}

const Modal = ({ handleClose, children }: ModalProps) => {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div initial="hidden" animate="visible" exit="exit" className='w-11/12 md:w-1/4 lg:w-1/4 xl:w-1/4 h-max bg-white m-auto rounded flex flex-col justify-center items-center' variants={dropIn} onClick={(e) => e.stopPropagation()}>
                <div onClick={handleClose} className="self-end cursor-pointer">
                    <FontAwesomeIcon icon={faCircleXmark} size="xs" className='text-gray-700 font-light w-6 m-2' />
                </div>
                {children}
            </motion.div>
        </Backdrop>
    );
};

export default Modal;
