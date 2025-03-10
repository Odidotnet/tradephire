import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faChartLine, 
  faTable, 
  faUser, 
  faQuestionCircle,
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onClose }) => {
  return (
    <div className="sidebar bg-light border-end h-100">
      <div className="sidebar-header p-3 d-flex justify-content-between align-items-center">
        <h3 className="text-primary mb-0">LogAuth Admin Panel</h3>
        <button className="btn btn-link d-lg-none p-0 text-dark" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/" className="nav-link d-flex align-items-center">
            <FontAwesomeIcon icon={faHome} className="me-3" />
            <span>Dashboard</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/charts" className="nav-link d-flex align-items-center">
            <FontAwesomeIcon icon={faChartLine} className="me-3" />
            <span>Charts</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/tables" className="nav-link d-flex align-items-center">
            <FontAwesomeIcon icon={faTable} className="me-3" />
            <span>Tables</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/profile" className="nav-link d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="me-3" />
            <span>Profile</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/faq" className="nav-link d-flex align-items-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="me-3" />
            <span>F.A.Q</span>
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
