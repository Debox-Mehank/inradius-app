import { ReactElement } from "react";

interface ModalProps {
  children: ReactElement;
  show: boolean;
  title?: string;
}

const Modal = ({ children, show, title }: ModalProps) => {
  return (
    <div
      className={`w-full h-screen z-50 bg-black bg-opacity-50 backdrop-blur-sm absolute grid place-items-center transition-all top-0 left-0 right-0 ${
        show ? "visible opacity-100" : "hidden opacity-0"
      }`}
    >
      <div className="w-72 bg-white grid place-items-center rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
