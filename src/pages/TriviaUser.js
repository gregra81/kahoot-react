import React, { useState, useEffect } from 'react';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/TriviaUser.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const Trivia = (props) => {
  const [isClicked, setIsClicked] = useState('');
  const [isDisabled, setIsDisabled] = useState('');
  const [counter, setCounter] = useState(20);

  const onGameEnd = props.onGameEnd;
  const { socketUser } = props;

  useEffect(() => {
    setIsClicked(false);
    setIsDisabled('');
  }, []);

  useEffect(() => {
    if (socketUser) {
      socketUser.on('timer', currentTimerHandler);
    }
  }, [socketUser]); //eslint-disable-line

  const currentTimerHandler = (currentCounter) => {
    setCounter(currentCounter);
    if (currentCounter <= 0) {
      setTimeout(() => {
        if (window.location.pathname !== '/user/wait_question'
        || window.location.pathname !== '/user/check_answer') {
          props.history.push('/user/wait_question');
        }
      }, 1000);
    }
  }

  useEffect(() => {
    if (socketUser) {
      socketUser.on('podium', (podium) => {
        onGameEnd(podium);
      });
      socketUser.on('answer-check', (data) => {
        props.history.push('/user/check_answer', { ...data });
        socketUser.removeListener('timer', currentTimerHandler);
      });
    }
  }, [onGameEnd, socketUser, props.history]);  //eslint-disable-line

  return props.triviaData ? (
    <body>
      <div className="text-center text-white bg-secondary text-uppercase">
        <Countdown counter={counter} />
      </div>

      <Container className="d-flex align-items-center justify-content-center text-center question-container">
        <Alert className="d-flex align-items-center justify-content-center text-center">
          <Questions triviaData={props.triviaData} />
        </Alert>
      </Container>
      <div className="divider-custom divider" />
      {!isClicked &&
        <div className="container answers d-flex justify-content-between flex-wrap">
          {props.triviaData.options.map((option, index) => (
            <button
              key={`index-${index}`}
              className={`text-center answer-trivia d-flex flex-wrap w-100 p-2 ${isDisabled} ${
                isClicked === option.description ? 'selected' : ''
              }`}
              onClick={() => {
                setIsClicked(option.description);
                setIsDisabled('clicked');
                socketUser.emit('answer', option.id);
                socketUser.emit('show-mini-podium');
              }}
            >
              {option.description}
            </button>
          ))}
        </div>}
      <br />
    </body>
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
