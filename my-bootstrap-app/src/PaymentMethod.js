import React, { useState } from 'react';
import BankTransferModal from './BankTransferModal'; // Import the modal component

const PaymentMethod = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleMethodChange = (e) => {
    const method = e.target.value;
    if (method === 'bankTransfer') {
      setModalShow(true);
    } else {
      setModalShow(false); // Hide modal for other methods
    }
  };

  return (
    <div className="form-group mt-4">
      <label htmlFor="paymentMethod">Payment Method</label>
      <select className="form-control" id="paymentMethod" onChange={handleMethodChange}>
        <option value="">Select Payment Method</option>
        <option value="bankTransfer">Bank Transfer</option>
        <option value="usdtErc20">Tether (USDT ERC20)</option>
        <option value="usdtTrc20">Tether (USDT TRC20)</option>
        <option value="astroPay">Astropay Wallet</option>
        <option value="bankCard">Bank Card</option>
      </select>

      <BankTransferModal show={modalShow} handleClose={() => setModalShow(false)} />
    </div>
  );
};

export default PaymentMethod;
