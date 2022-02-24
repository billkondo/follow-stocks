import FII from 'domain/fii';

interface FIIsRepository {
  fetchFIIs: () => Promise<FII[]>;
  saveFIIs: (fiis: FII[]) => Promise<void>;
}

export default FIIsRepository;
