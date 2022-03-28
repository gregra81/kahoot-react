import React, { useEffect } from 'react';
import '../styles/WaitQuestion.css';
import sonicImg from '../assets/sonic.gif';

const WaitQuestion = (props) => {
  const { socketUser, setTriviaDataUser, history } = props;
  useEffect(() => {
    if (socketUser) {
      socketUser.on('question', (data) => {
        setTriviaDataUser(data);
        history.push('/user/trivia');
      });
    }
  }, [socketUser, setTriviaDataUser, history])
  return (
    <body>
      <div className='wait_container h-center v-center'>
        <div className='text_container header_text'>
          Next question coming soon...
        </div>
        <div className='image-holder'>
          <div className='image-wrapper'>
            <img className="sonic-image" src={sonicImg} alt="" />
          </div>
        </div>
        <div className='text_container footer_text'>
          Be prepared and listen carefully
        </div>
      </div>
    </body>
  );
};

export default WaitQuestion;
