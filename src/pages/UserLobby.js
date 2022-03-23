import React, { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { useLocation, useHistory } from 'react-router-dom';
import { parse } from 'query-string';
import ImagePng from '../assets/image.png'
import config from '../config';
import { stringify } from 'query-string';

const getUserData = (search) => {
  const {pin = 553530, playerName = 'defaultUserName'} = search;
  return new Promise(resolve => (
    setTimeout(() => resolve({pin, playerName }), 500)
  )
)};

const UserLobby = (props) => {
  const history = useHistory();
  const data = useLocation();
  const [ userPin, setUserPin ] = useState(null);
  const [ userName, setUserName ] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      const search = parse(data.search);
      const { accountId, eventId, sessionId, userId, email } = search;
      if (accountId && eventId && sessionId && userId && email) {
        const stringyString = stringify({
          accountId,
          eventId,
          sessionId,
          userId,
          email
        })
        const url = `${config.serverUrl}/player?${stringyString}`
        console.log(url)
        const res  = await fetch(url);
        const { playerName } = await res.json();
        console.log(data);
        setUserPin(sessionId);
        setUserName(playerName);
      }
    }
    fetchUser()
  }, []); //eslint-disable-line 

  const { setSocketUser, socketUser, BASE_URL } = props;

  useEffect(() => {
    if (userPin && userName) {
      if (!socketUser) {
        let newSocketUser;
  
        if (BASE_URL === 'http://localhost:3030') {
          newSocketUser = socketIO(`/${userPin}`, {
            query: `playerName=${userName}`,
          });
        } else {
          newSocketUser = socketIO(`${BASE_URL}/${userPin}`, {
            query: `playerName=${userName}`,
          });
        }
  
        setSocketUser(newSocketUser);
      }
  
      if (socketUser) {
        socketUser.on('question', (data) => {
          props.setTriviaDataUser(data);
          history.push('/user/trivia');
        });
      }
    }
  }, [history, props, setSocketUser, socketUser, BASE_URL, userPin, userName]);
  return (
    <body>
      {userPin && userName ? (
        <div className='main-wrapper'>
          <div className='image-wrapper'>
            <img
              src={ImagePng}
              style={{ width: 50 }}
              alt=""
            />
          </div>
          <div className='welcome-container welcome-header'>
            <div className='v-center'>Welcome to</div>
            <div className='v-center'>Quizzabo</div>
          </div>
          <div className='welcome-container'>
            <ul className='header-list'>
              <li>
                Listen to the session
              </li>
              <li>
                Answer questions related to the session content
              </li>
              <li>
                win an awesome price!
              </li>
            </ul>
          </div>
          <div className='welcome-container footer-container'>
            <div>
              The game will start shortly!
            </div>
          </div>
        </div>
      ) : ( <div className='container h-center v-center'>Loading...</div> )}
    </body>
  );
};

export default UserLobby;
