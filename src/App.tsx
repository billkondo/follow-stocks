import { APP_NAME } from 'config/app_name';
import { Fragment } from 'react';

const App = () => {
  return (
    <Fragment>
      <h1>💖 {APP_NAME}</h1>
      <p>Welcome to your Electron application.</p>
    </Fragment>
  );
};

export default App;
