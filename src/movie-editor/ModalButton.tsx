import React, { useState, ReactElement, ButtonHTMLAttributes } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ModalButtonProps = {
  children: ReactElement;
  className?: string;
  label: string;
};

const ModalButton = ({ children, label, className }: ModalButtonProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline-secondary"
        className={className}
        onClick={() => setModalOpen(true)}
      >
        {label}
      </Button>

      <Modal show={isModalOpen} onHide={() => setModalOpen(false)}>
        {React.cloneElement(children, {
          closeModal: () => setModalOpen(false)
        })}
      </Modal>
    </>
  );
};

export default ModalButton;
