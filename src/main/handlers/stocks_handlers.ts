import StockType from '@entities/stock/stock_type';
import StockInvestedWithQuotation from '@entities/stock_invested/stock_invested_with_quotation';
import StocksInvestedWithQuotationsRepository from '@repositories/stocks_invested_wtih_quotations_repository';
import StocksRepository from '@repositories/stocks_repository';
import { IpcMainInvokeEvent } from 'electron';
import ListStocksInvested from 'main/usecases/list_stocks_invested';
import LoadStocksFirstTime from 'main/usecases/load_stocks_first_time';

const StocksHandlers = ({
  stocksRepository,
  stocksInvestedWithQuotationsRepository,
}: {
  stocksRepository: StocksRepository;
  stocksInvestedWithQuotationsRepository: StocksInvestedWithQuotationsRepository;
}) => ({
  async load(event: IpcMainInvokeEvent, type: StockType) {
    const loadStocksFirstTime = LoadStocksFirstTime(stocksRepository);

    await loadStocksFirstTime(type);

    return {
      message: 'SUCCESS',
    };
  },
  async listInvested(
    event: IpcMainInvokeEvent,
    type: StockType,
  ): Promise<StockInvestedWithQuotation[]> {
    const listStocksInvested = ListStocksInvested(
      stocksInvestedWithQuotationsRepository,
    );

    return listStocksInvested(type);
  },
});

export default StocksHandlers;
