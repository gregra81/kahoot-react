import React from 'react';
import '../styles/Podium.css';
import Container from 'react-bootstrap/Container';
import priseUrl from '../assets/prise.gif'

const Podium = (props) => {
  const rankingData = (Object.entries(props.ranking)).slice(0, 4);
  return (
    <Container>
      <div className='podium-wrapper'>
        <div className='podium-header'>
          And the winner is...
        </div>
        <div className='prise-image-wrapper'>
          <img className='prise-image' src={priseUrl} alt="" />
        </div>
        <div className='ranking-container'>
          {rankingData.map(([keyValue, {name, score}]) => {
            const key = parseInt(keyValue, 10);
            const currentRank = key + 1;
            const notLast = currentRank !== rankingData.length ? 'user-separator' : '';
            return (
              <>
                <div key={key} className={`d-flex justified-content ${notLast}`}>
                  <div className='user-position'>
                    <span>{currentRank}</span></div>
                  <div className='user-name'>{name}</div>
                  <div className='user-score-section'>
                    <span className='user-score'>{score }</span>
                    <span>Pts</span>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Podium;
