import '@fontsource/varela-round';
import { CssBaseline, ThemeProvider } from '@mui/material';
import * as ReactDOM from 'react-dom';
import App from 'renderer/App';
import 'renderer/assets/styles.scss';
import theme from 'renderer/theme/theme';

const render = () => {
  ReactDOM.render(
    <>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </>,
    document.getElementById('root'),
  );
};

render();
