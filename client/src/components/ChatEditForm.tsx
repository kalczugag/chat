import { useState } from "react";
import { createPortal } from "react-dom";
import { MdEdit } from "react-icons/md";
import Modal from "./Modal";

const ChatEditForm = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modal = <Modal onClose={setIsOpen}>xl</Modal>;

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="hover:opacity-90"
            >
                <MdEdit />
            </button>
            {isOpen && createPortal(modal, document.body)}
        </>
    );
};

export default ChatEditForm;
