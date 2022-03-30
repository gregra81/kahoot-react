import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import urlCorrect from "../assets/correct.gif"
import urlIncorrect from '../assets/incorrect.gif';
import '../styles/AnswerCheck.css'

const AnswerCheck = ({ history }) => {

  useEffect(() => {
    setTimeout(() => history.push('/user/wait_question'), 5000)
  }, []); //eslint-disable-line

  const { state } = useLocation();

  return (
    state?.isCorrect
      ? <body className="answer-wrapper correct-wrapper">
        <div className="correct-part">
          <div className="correct image-answer-wrapper">
            <div className="correct-image-inner">
              <img
                className="image-correct"
                src={urlCorrect}
                alt="" />
            </div>
          </div>
          <div className="answer-description">Correct answer!</div>
        </div>
      </body>
      : <body className="answer-wrapper">
        <div className="incorrect-part">
          <div className="answer-description">Not exactly...</div>
          <div className="incorrect image-answer-wrapper">
            <img
              className="image-incorrect"
              src={urlIncorrect}
              alt="" />
          </div>
          <div className="incorrect-answer">
            The correct answer is:
          </div>
          <div className="answer-description">{state?.correctDescription}</div>
        </div>
      </body>
  );
};

export default AnswerCheck;
