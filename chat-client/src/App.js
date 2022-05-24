import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from './Messages';
import MessageInput from './MessageInput';

import './App.css';
import { useOktaAuth } from '@okta/okta-react';
import { useAuth } from './auth';

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
     
      <div className='opening'>iChat</div>
      <header className="app-header">
{ !authState? (
    <div>Loading...</div>
) : (user ? (
  
    <div>
      <div>Signed in as {user.name}</div>
      <button className='btnout' onClick={logout}>Sign out</button>
    </div>
) : (
    <div>
      <div>Not signed in</div>
      <button className='btnin' onClick={login}>Sign in</button>
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
