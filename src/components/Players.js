import React from 'react';

const Players = (props) => {
  return (
    <React.Fragment>
      {props.players.map((player, index) => (
        <div className="border-dark">
          <h4 className="text-black" key={`player-${index + 1}`}>
            {player}
          </h4>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Players;
