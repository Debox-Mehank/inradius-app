import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReusableButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  title: string;
  bg: string;
  text: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "small" | "medium" | "large" | undefined;
  icon?: IconDefinition;
  iconButton?: boolean;
}

const ReusableButton = ({
  title,
  bg,
  text,
  link,
  onClick,
  type,
  size = "large",
  icon,
  iconButton = false,
}: ReusableButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className={`px-3 py-2 ${
        size === "small"
          ? "text-xs"
          : size === "medium"
          ? "text-sm"
          : size === "large"
          ? "text-base"
          : ""
      } ${bg} ${text} rounded-md shadow font-semibold`}
    >
      {!iconButton && (
        <>
          {link ? (
            <Link href={link}>{title}</Link>
          ) : (
            // <a href={link} target="_blank" rel="noopener noreferrer">
            //     {title}
            // </a>
            title
          )}
        </>
      )}
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          size={
            size === "small"
              ? "sm"
              : size === "medium"
              ? "1x"
              : size === "large"
              ? "lg"
              : "sm"
          }
          className={!iconButton ? "ml-2" : "ml-0"}
        />
      )}
    </motion.button>
  );
};

export default ReusableButton;
