import '@testing-library/jest-dom';
import delayed from 'utils/delayed';
import sleep from 'utils/sleep';

jest.mock('@services/http_service');
jest.mock('utils/delayed');

Date.now = jest.fn();

(delayed as jest.Mock).mockImplementation(async (promise) => {
  await sleep(50);

  return promise;
});
