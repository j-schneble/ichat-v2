import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

const oktaAuth = new OktaAuth({
  issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
});

function SecuredRoutes(props) {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  
  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path="/" exact component={App} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
}



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SecuredRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


