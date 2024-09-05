import React, { useState } from 'react';
import './MAMpanel.css'; // Import the CSS file for styling

const MAMpanel = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  const toggleSubscribe = () => {
    setShowSubscribe((prev) => !prev);
  };

  return (
    <div className="mam-panel container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-dark shadow-lg bg-dark text-light">
            <div className="card-header bg-secondary text-light">
              <h4 className="mb-0">MAM Panel</h4>
            </div>
            <div className="card-body">
              <div className="agent-info mb-4">
                <div className="agent-name">
                  <label>Agent Name:</label>
                  <span>John Doe</span>
                </div>
                <div className="agent-id">
                  <label>Agent ID:</label>
                  <span>#123456</span>
                </div>
                <div className="growth">
                  <label>Growth:</label>
                  <span>15%</span>
                </div>
              </div>
              <button
                className="subscribe-button btn btn-primary"
                onClick={toggleSubscribe}
              >
                {showSubscribe ? 'Subscribed' : 'Subscribe'}
              </button>
              {showSubscribe && (
                <div className="subscription-info mt-3">
                  <p>You have successfully subscribed to the MAM account.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MAMpanel;
