import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/HostLobby.css';
import socketIO from 'socket.io-client';
import Players from '../components/Players';
import config from '../config';

const HostLobby = (props) => {
  const [players, setPlayers] = useState([]);
  const data = useLocation();

  console.log('data.state', data.state);
  
  const pin = data.state;
  const { socket, setTriviaData, BASE_URL } = props;

  useEffect(() => {
    console.log('hostsocket', props.socket);
    if (!props.socket) {
      fetch(`${BASE_URL}/trivia/${pin}/${props.trivia}`).then(() => {
        let newSocketHost;
        if (BASE_URL === 'http://localhost:3030') {
          newSocketHost = socketIO(`/${pin}`);
        } else {
          newSocketHost = socketIO(`${config.socketUrl}/${pin}`);
        }
        props.setSocket(newSocketHost);
      });
    }
  }, [pin, props, BASE_URL]);

  useEffect(() => {
    if (socket) {
      socket.on('question', (triviaData) => {
        const newTriviaData = triviaData;
        setTriviaData(newTriviaData);
      });
      socket.on('playerlist', (players) => {
        const newPlayers = players;
        setPlayers(newPlayers);
      });
    }
  }, [socket, setTriviaData]);

  return (
    <React.Fragment>
      <body className="bg-primary">
        <div className="container d-flex align-items-center flex-column">
          <h2 className="pin-host-lobby masthead-heading text-uppercase mb-0 text-white">
            The PIN is {pin}
          </h2>
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
          <Link to="/host/trivia">
            <button
              onClick={() => props.socket.emit('start-game')}
              className="start-game-btn text-white bg-secondary btn btn-xl btn-outline-light"
            >
              Start Game
            </button>
          </Link>
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
          <h2 className="pin-host-lobby text-center text-uppercase text-secondary">
            Players connected:
          </h2>
          <br />
          <div className="container d-flex align-items-center justify-content-center flex-column">
            <Players className="" players={players} />
          </div>
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i class="fas fa-star"></i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
        </div>
      </body>
    </React.Fragment>
  );
};

export default HostLobby;
