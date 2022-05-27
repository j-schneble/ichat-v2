import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

import './App.css';
import { useOktaAuth } from '@okta/okta-react';
import { useAuth } from './auth';
import {BiLogInCircle} from 'react-icons/bi';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

function App() {
  const { oktaAuth, authState } = useOktaAuth();

const login = async () => oktaAuth.signInWithRedirect('/');
const logout = async () => oktaAuth.signOut('/');

const [user, token] = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`, token && { query: { token } });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket, token]);

  return (
    <div className="App">
     
      <div className='opening'>iChat.v2</div>
      <header className="app-header">
{ !authState? (
    <div>Loading...</div>
) : (user ? (
  
    <div>
      <div>Hello, {user.name}</div>
      <button className='btnout' onClick={logout}>Sign out <FiLogOut className='lilogo2' /></button>
    </div>
) : (
    <div>
      <div>Hello, you are anonymous. Please sign in </div> 
      <button className='btnin'  onClick={login}> Sign in <FiLogIn className='lilogo'/></button>
    </div>
)
)}
</header>

      { socket ? (
        <div className="chat-container">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
