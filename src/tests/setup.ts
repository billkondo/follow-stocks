import '@testing-library/jest-dom';

jest.mock('@services/http_service');

Date.now = jest.fn();
