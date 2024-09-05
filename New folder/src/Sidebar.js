import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-light p-3" style={{ height: '100vh', width: '250px' }}>
      <h4 className="mb-4">Navigation</h4>
      <Nav vertical>
        <NavItem>
          <NavLink href="#my-accounts">My Accounts</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#deposit">Deposit</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#withdrawal">Withdrawal</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#transaction-history">Transaction History</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#analytics">Analytics</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#social-trading">Social Trading</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#mam-system">MAM System</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#performance">Performance</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#support-hub">Support Hub</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#settings">Settings</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#invite-friends">Invite Friends and Earn Money</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
