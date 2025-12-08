import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { ModalOverlay, ModalContent, CloseButton, ModalTitle } from "./Modal.styles";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <FiX />
                </CloseButton>
                <ModalTitle>{title}</ModalTitle>
                {children}
            </ModalContent>
        </ModalOverlay>,
        document.body
    );
}
