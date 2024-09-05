import React from 'react';
import TradingAccountDetails from './TradingAccountDetails';

const App = () => {
  return (
    <div className="App">
      <TradingAccountDetails
        tradingPlatform="MT5"
        accountType="Real"
        accountID="12345678"
        accountName="Karupu Samy"
        accountBalance={10000.00}
        accountEquity={9500.00}
      />
    </div>
  );
};

export default App;
