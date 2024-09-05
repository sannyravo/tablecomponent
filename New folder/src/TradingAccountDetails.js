import React, { useState } from 'react';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import './TradingAccountDetails.css'; // Import the CSS file for styling

const TradingAccountDetails = ({
  tradingPlatform,
  accountType,
  accountId,
  accountName,
  accountBalance,
  accountEquity,
}) => {
  const [activeTab, setActiveTab] = useState('real');
  const [showModal, setShowModal] = useState({ deposit: false, withdraw: false });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleModal = (modal) => {
    setShowModal((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const AccountActions = () => (
    <div className="account-actions">
      <div className="dropdown">
        <button
          className="btn btn-info dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          More Options
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a className="dropdown-item" href="/account-history">
              <i className="bi bi-clock-history me-2"></i>
              <i className="bi bi-archive"></i>
              Account History
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/transaction-history">
              <i className="bi bi-file-text me-2"></i>
              <i className="bi bi-clipboard-data"></i>
              Transaction History
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/open-positions">
              <i className="bi bi-bar-chart-line me-2"></i>
              <i className="bi bi-graph-up"></i>
              Open Positions
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/closed-positions">
              <i className="bi bi-check-circle me-2"></i>
              <i className="bi bi-check2-circle"></i>
              Closed Positions
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/pending-orders">
              <i className="bi bi-hourglass-split me-2"></i>
              <i className="bi bi-clock"></i>
              Pending Orders
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
  

  const renderAccountDetails = (balance, equity) => (
    <div className="account-details">
      <p><strong>Account ID:</strong> {accountId}</p>
      <p><strong>Account Name:</strong> {accountName}</p>
      <p><strong>Account Balance:</strong> ${balance.toFixed(2)}</p>
      <p><strong>Account Equity:</strong> ${equity.toFixed(2)}</p>
      <AccountActions />
    </div>
  );

  return (
    <div className="trading-account-details container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-dark text-light">
              <h4 className="mb-0">Trading Account Details</h4>
            </div>
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'real' ? 'active' : ''}`}
                    onClick={() => handleTabChange('real')}
                  >
                    Real
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'demo' ? 'active' : ''}`}
                    onClick={() => handleTabChange('demo')}
                  >
                    Demo
                  </button>
                </li>
              </ul>
              {activeTab === 'real' ? (
                <>
                  <h5 className="mb-4">Real Account Details</h5>
                  {renderAccountDetails(accountBalance, accountEquity)}
                </>
              ) : (
                <>
                  <h5 className="mb-4">Demo Account Details</h5>
                  {renderAccountDetails(100000, 100000)}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-buttons">
        <button
          type="button"
          className="btn btn-primary floating-btn"
          onClick={() => toggleModal('deposit')}
        >
          Deposit
        </button>
        <button
          type="button"
          className="btn btn-secondary floating-btn"
          onClick={() => toggleModal('withdraw')}
        >
          Withdraw
        </button>
      </div>

      {/* Modals for Deposit and Withdraw */}
      {showModal.deposit && <DepositModal showModal={showModal.deposit} toggleModal={() => toggleModal('deposit')} />}
      {showModal.withdraw && <WithdrawModal showModal={showModal.withdraw} toggleModal={() => toggleModal('withdraw')} />}
    </div>
  );
};

export default TradingAccountDetails;
