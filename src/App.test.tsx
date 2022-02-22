import { render, screen } from '@testing-library/react';
import App from 'App';
import { APP_NAME } from 'config/app_name';

test('It should display app name', () => {
  render(<App />);
  expect(screen.getByText(new RegExp(APP_NAME)));
});
