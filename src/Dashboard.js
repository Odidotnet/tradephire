import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faDollarSign, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Sidebar from './Dashboard/components/Sidebar';
import StatCard from './Dashboard/components/StatCard';
import ReportChart from './Dashboard/components/ReportChart';
import RecentActivity from './Dashboard/components/RecentActivity';



//preotected route component
const ProtectedRoute = ({children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="http://localhost:3000/login" replace />;
  }


  return children;
};

function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <div className="dashboard-container">
      <div className={`sidebar-wrapper ${showSidebar ? 'show' : ''}`}>
        <Sidebar onClose={closeSidebar} />
        <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar}></div>
      </div>
      
      <div className="main-content">
        <div className="top-bar d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="light" 
            className="d-lg-none menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
          <h1 className="mb-0">Dashboard</h1>
        </div>
        
        <Container fluid className="px-0">
          <Row className="g-4 mb-4">
            <Col xs={12} sm={6} lg={4}>
              <StatCard 
                title="Sales"
                value="145"
                change={12}
                period="Today"
                icon={<FontAwesomeIcon icon={faShoppingCart} />}
                color="primary"
              />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <StatCard 
                title="Revenue"
                value="$3,264"
                change={8}
                period="This Month"
                icon={<FontAwesomeIcon icon={faDollarSign} />}
                color="success"
              />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <StatCard 
                title="Customers"
                value="1244"
                change={-12}
                period="This Year"
                icon={<FontAwesomeIcon icon={faUsers} />}
                color="danger"
              />
            </Col>
          </Row>

          <Row className="g-4">
            <Col xs={12} lg={8}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="mb-4">Reports</Card.Title>
                  <div className="chart-container">
                    <ReportChart />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title className="mb-4">Recent Activity</Card.Title>
                  <RecentActivity />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;

