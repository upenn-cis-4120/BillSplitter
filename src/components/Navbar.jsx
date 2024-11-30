import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUser, faUserGroup, faCamera, faHouse } from '@fortawesome/free-solid-svg-icons';
function Navbar({ user }) {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
              <NavLink to="/dashboard" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
            </li>
            <li>
                <NavLink to="/bills" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faMoneyBill} />
                </NavLink>
            </li>
            <li>
              <NavLink to="/camera" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faCamera} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/friends" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faUserGroup} />
            </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
          </>
        ) : (
          <div className="auth-buttons">
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                aria-label="Login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}
                aria-label="Register"
              >
                Register
              </NavLink>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
