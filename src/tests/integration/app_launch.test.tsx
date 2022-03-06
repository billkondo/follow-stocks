import { render, waitFor } from '@testing-library/react';
import App from 'renderer/App';
import useElectron from 'tests/hooks/use_electron';
import useStocks from 'tests/hooks/use_stocks';

describe('App launch', () => {
  useElectron();
  const { stocksServiceFactory } = useStocks();

  const setup = () => {
    const stocksService = stocksServiceFactory();

    return {
      stocksService,
    };
  };

  test('should load fiis on launch', async () => {
    const { stocksService } = setup();

    render(<App />);

    await waitFor(async () => {
      await expect(stocksService.findAll('FII')).resolves.toEqual([
        {
          name: 'Alianza FOF',
          ticker: 'AFOF11',
          type: 'FII',
        },
        {
          name: 'Hotel Maxinvest',
          ticker: 'HTMX11',
          type: 'FII',
        },
        {
          name: 'Valora RE III',
          ticker: 'VGIR11',
          type: 'FII',
        },
      ]);
    });
  });
});
