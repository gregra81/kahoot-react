import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Countdown = ({ counter }) => {
  return (
    <Alert className="counter bg-secondary border-dark">
      {counter ? `${counter} seconds left` : 'Time is up!'}
    </Alert>
  );
};

export default Countdown;
