import React, { useEffect } from 'react';
import '../styles/WaitQuestion.css';

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
    <body className="bg-primary">
      <div className='wait_container h-center v-center'>
        <div className='text_container'>
          Next question coming soon.
        </div>
        <div className='text_container'>
          Be prepared and listen carefully
        </div>
      </div>
    </body>
  );
};

export default WaitQuestion;
