// src/WithdrawModal.js
import React, { useState } from 'react';

const WithdrawModal = ({ showModal, toggleModal }) => {
  const [amount, setAmount] = useState('');

  if (!showModal) return null;

  const handleAmountChange = (e) => {
    setAmount(e.target.value === '' ? '' : parseFloat(e.target.value));
  };

  const isWithdrawDisabled = amount === '' || amount <= 0;

  const handleWithdraw = () => {
    // Add your withdrawal logic here
    console.log('Withdrawing:', amount);
    toggleModal(); // Close the modal after withdrawal
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Withdraw Funds</h5>
            <button type="button" className="close" onClick={toggleModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Enter the amount you wish to withdraw:</p>
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              aria-label="Withdraw Amount"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={isWithdrawDisabled}
              onClick={handleWithdraw}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
