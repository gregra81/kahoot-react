import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Countdown = ({ counter }) => {

  return (
    <Alert className="counter bg-secondary border-dark">
      {counter ? `You have ${counter} seconds left` : 'You dont have any more time'}
    </Alert>
  );
};

export default Countdown;
