import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUser, faUserGroup, faCamera, faHouse } from '@fortawesome/free-solid-svg-icons';
function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {user ? (
          <>
            <li>
                <NavLink to="/bills" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faMoneyBill} />
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
            <li>
              <NavLink to="/camera" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faCamera} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="nav-link" activeClassName="active-link">
                <FontAwesomeIcon icon={faHouse} />
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="nav-link" activeClassName="active-link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="nav-link" activeClassName="active-link">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
