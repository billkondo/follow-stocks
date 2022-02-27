import FII from 'domain/fii';
import StocksStorage from './stocks_storage';

interface FIIsStorage extends StocksStorage {
  saveFIIs: (fiis: FII[]) => Promise<void>;
  findAllFIIs: () => Promise<FII[]>;
}

export default FIIsStorage;
