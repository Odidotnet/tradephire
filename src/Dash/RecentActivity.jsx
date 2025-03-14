import React from 'react';
import { ListGroup } from 'react-bootstrap';

const RecentActivity = () => {
  const activities = [
    {
      time: '32 min',
      text: 'Price of Bitcoin goes higher than ever imagined, Will Bitcoin get up to $200k?',
      status: 'success'
    },
    {
      time: '56 min',
      text: 'LogAUth join the p2p trading league',
      status: 'danger'
    },
    {
      time: '2 hrs',
      text: 'Pi the new crypto currency rising at its peak',
      status: 'primary'
    },
    {
      time: '1 day',
      text: 'Euthemics is the new crypto currency',
      status: 'info'
    },
    {
      time: '2 days',
      text: 'Dive into PLUME Splash on Next Week Airdrop',
      status: 'warning'
    },
  ];

  return (
    <ListGroup variant="flush">
      {activities.map((activity, index) => (
        <ListGroup.Item key={index} className="d-flex align-items-start py-3">
          <div className="me-3">
            <div className={`bg-${activity.status} rounded-circle`} style={{ width: '10px', height: '10px' }}></div>
          </div>
          <div className="flex-grow-1">
            <div className="text-muted small">{activity.time}</div>
            <div>{activity.text}</div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default RecentActivity;
