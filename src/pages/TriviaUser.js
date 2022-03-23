import React, { useState, useEffect, useRef } from 'react';
import StopGame from '../components/StopGame';
import Questions from '../components/Questions';
import Countdown from '../components/Countdown';
import '../styles/TriviaUser.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const Trivia = (props) => {
  const [isClicked, setIsClicked] = useState('');
  const [isDisabled, setIsDisabled] = useState('');
  const [counter, setCounter] = useState(20);
  const timer = useRef();


  const onGameEnd = props.onGameEnd;
  const { socketUser } = props;

  useEffect(() => {
    if (socketUser) {
      socketUser.on('podium', (podium) => {
        onGameEnd(podium);
      });
      socketUser.on('timer', (counter) => {
        setCounter(counter);
        if (counter === 0 ) {
          setIsDisabled('clicked')
          timer.current = setTimeout(() => {
            props.history.push('/user/wait_question');
          }, 2000);
        }
      });
    }
    setIsClicked(false);
    setIsDisabled('');
    return () => {};
  }, [onGameEnd, socketUser, props.history]);

  return props.triviaData ? (
    <body>
      <div className="text-center text-white bg-secondary text-uppercase">
        <Countdown counter={counter} />
      </div>

      <Container className="d-flex align-items-center justify-content-center text-center">
        <Alert className="item1 d-flex align-items-center justify-content-center bg-secondary text-center shadow-lg">
          <Questions triviaData={props.triviaData} />
        </Alert>
      </Container>

      <div className="divider-custom divider">
        <div className="divider-custom-line"></div>
        <div className="divider-custom-icon">
          <i className="fas fa-star"></i>
        </div>
        <div className="divider-custom-line"></div>
      </div>
      {!isClicked &&
        <div className="container answers d-flex justify-content-between flex-wrap">
          {props.triviaData.options.map((option, index) => (
            <button
              id={`answer${index}`}
              key={`index-${index}`}
              className={`answer-trivia${index}  text-white text-center answer-trivia d-flex flex-wrap w-100 border p-3 ${isDisabled} ${
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
      <Container>
        <StopGame
          socket={socketUser}
          setSocketUser={props.setSocketUser}
          setSocket={props.setSocket}
        />
      </Container>
    </body>
  ) : (
    'Loading trivia...'
  );
};

export default Trivia;
