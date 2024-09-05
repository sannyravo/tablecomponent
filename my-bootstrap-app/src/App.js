import React from 'react';
import './App.css';
import TableComponent from './TableComponent';
import PaymentMethod from './PaymentMethod';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TableComponent />
        <PaymentMethod /> {/* Add the PaymentMethod component here */}
      </header>
    </div>
  );
}

export default App;
