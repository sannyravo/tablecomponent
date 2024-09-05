import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './BankTransferModal.css'; // Ensure this path is correct

const BankTransferModal = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static" // Prevents closing when clicking outside
      keyboard={false} // Disables closing with keyboard
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="wave-text" data-text="Bank Transfer">Bank Transfer</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Modal body content here */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BankTransferModal;
