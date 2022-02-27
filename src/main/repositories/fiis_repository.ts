import FII from 'domain/fii';
import StocksRepository from './stocks_repository';

interface FIIsRepository extends StocksRepository {
  fetchFIIs: () => Promise<FII[]>;
  saveFIIs: (fiis: FII[]) => Promise<void>;
}

export default FIIsRepository;
