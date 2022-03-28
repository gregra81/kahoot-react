import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Questions = (props) => {
  return (
    <div>
      <Jumbotron className="question text-white-100 text-center">
        <h1 className="text-center header-text">{props.triviaData.question}</h1>
      </Jumbotron>
    </div>
  );
};

export default Questions;
