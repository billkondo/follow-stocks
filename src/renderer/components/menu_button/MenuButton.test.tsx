import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuButton from './MenuButton';

const TestComponent = () => <div data-testid="menu-button"></div>;

describe('MenuButton', () => {
  test('should open menu button and close it when clicked outside', async () => {
    const user = userEvent.setup();
    const LABEL = 'Test Label';

    render(
      <MenuButton label={LABEL}>
        <TestComponent />
      </MenuButton>,
    );

    const button = screen.getByRole('button', { name: LABEL });
    await user.click(button);

    const children = screen.getByTestId('menu-button');
    expect(children).toBeInTheDocument();

    await user.click(screen.getByRole('dialog').parentElement);
    await waitForElementToBeRemoved(() => screen.queryByTestId('menu-button'));
  });
});
