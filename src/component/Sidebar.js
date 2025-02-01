// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/Sidebar.css";  // We'll define custom CSS styles for the sidebar
// import Sidebar from './components/Sidebar'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>DIABETICS HEALTH CARE</h2>
      </div>
      <ul className="sidebar-list">
        {/* <li>
          <Link to="/" className="sidebar-item">
            Dashboard
          </Link>
        </li> */}
        {/* <li>
          <Link to="/doctor" className="sidebar-item">
          <i className="bi bi-cash-stack display-4 text-success"></i>
            Doctor
          </Link>
        </li> */}
        <li>
        
          <Link to="/patient" className="sidebar-item">
          <i className="bi bi-person-fill display-8 text-danger"></i>
            Patient
          </Link>
        </li>
        <li>
          <Link to="/comment" className="sidebar-item">
          <i className="bi bi-chat display-8 text-primary"></i>
            Comment
          </Link>
        </li>
        {/* <li>
          <Link to="/sugar" className="sidebar-item">
          <i className="bi bi-droplet display-8 text-warning"></i>
            Sugar
          </Link>
        </li> */}
      </ul>
       {/* Logout Button
       <div className="mt-auto">
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;

