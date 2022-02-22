import App from 'App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const render = () => {
  ReactDOM.render(
    <React.Fragment>
      <App />
    </React.Fragment>,
    document.getElementById('root'),
  );
};

render();
