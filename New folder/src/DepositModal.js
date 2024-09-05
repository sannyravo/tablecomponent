import React, { useState } from 'react';

const DepositModal = ({ showModal, toggleModal }) => {
  const [amount, setAmount] = useState('');

  if (!showModal) return null;

  const handleAmountChange = (e) => {
    setAmount(e.target.value === '' ? '' : parseFloat(e.target.value));
  };

  const isDepositDisabled = amount === '' || amount <= 0;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Deposit</h5>
            <button type="button" className="close" onClick={toggleModal} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Enter the amount you wish to deposit:</p>
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              aria-label="Deposit Amount"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" disabled={isDepositDisabled}>
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
