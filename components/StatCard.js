import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ title, value, change, period, icon, color }) => {
  const isIncrease = change > 0;
  
  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`icon-shape bg-${color} text-white rounded-circle p-3`}>
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <span className={`text-${isIncrease ? 'success' : 'danger'}`}>
            {isIncrease ? '+' : ''}{change}%
          </span>
          <span className="text-muted ms-2">{period}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
