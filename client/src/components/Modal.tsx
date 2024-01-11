import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
    children: React.ReactNode;
    onClose: (value: React.SetStateAction<boolean>) => void;
};

const Modal = ({ children, onClose }: Props) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => document.body.classList.remove("overflow-hidden");
    }, []);

    return (
        <>
            <div
                className="fixed bg-login-bg opacity-50 inset-0 z-10"
                onClick={() => onClose(false)}
            />
            <div className="fixed flex flex-col text-gray-200 bg-login-input p-6 break-words inset-0 rounded-md z-50 md:inset-y-10 md:inset-80">
                <div className="flex flex-row justify-end bg-login-input">
                    <button
                        onClick={() => onClose(false)}
                        className="text-2xl hover:opacity-90"
                    >
                        <IoCloseSharp />
                    </button>
                </div>
                {children}
            </div>
        </>
    );
};

export default Modal;
