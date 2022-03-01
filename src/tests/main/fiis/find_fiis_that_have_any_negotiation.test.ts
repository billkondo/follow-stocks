import Stock from 'domain/stock';
import compareStocks from 'domain/usecases/compare_stocks';
import FindStocksThatHaveAnyNegotiation from 'main/usecases/find_stocks_that_have_any_negotiation';
import useFIIs from 'tests/hooks/use_fiis';
import useSqlite from 'tests/hooks/use_sqlite';

describe('Find FIIs that have any negotiation', () => {
  useSqlite();
  const { fiisServiceFactory, fiisNegotiationsServiceFactory } = useFIIs();
  const xplgStock: Stock = { name: 'XPLG STOCK', ticker: 'XPLG11' };
  const hgreStock: Stock = { name: 'HGRE STOCK', ticker: 'HGRE11' };

  const setup = () => {
    const fiisNegotiationService = fiisNegotiationsServiceFactory();
    const findFIIsThatHaveAnyNegotiation = FindStocksThatHaveAnyNegotiation(
      fiisNegotiationService,
    );

    return {
      findFIIsThatHaveAnyNegotiation,
    };
  };

  beforeEach(async () => {
    const fiisService = fiisServiceFactory();
    const fiisNegotiationsService = fiisNegotiationsServiceFactory();

    await fiisService.save([
      xplgStock,
      hgreStock,
      { name: 'HGLG STOCK', ticker: 'HGLG11' },
    ]);

    await fiisNegotiationsService.saveStockNegotiations(xplgStock, [
      {
        stock: xplgStock,
        date: new Date(2022, 12, 1),
        price: { value: 100, code: 'BRL' },
        quantity: 25,
        type: 'BUY',
      },
      {
        stock: xplgStock,
        date: new Date(2022, 12, 2),
        price: { value: 125, code: 'BRL' },
        quantity: 17,
        type: 'SELL',
      },
    ]);

    await fiisNegotiationsService.saveStockNegotiations(hgreStock, [
      {
        stock: hgreStock,
        date: new Date(2022, 12, 1),
        price: { value: 150, code: 'BRL' },
        quantity: 5,
        type: 'BUY',
      },
    ]);
  });

  test('should find FIIs that have any negotiation', async () => {
    const { findFIIsThatHaveAnyNegotiation } = setup();
    const fiis = await findFIIsThatHaveAnyNegotiation();

    expect(fiis.sort(compareStocks)).toEqual(
      [xplgStock, hgreStock].sort(compareStocks),
    );
  });
});
