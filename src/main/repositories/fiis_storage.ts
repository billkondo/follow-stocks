import FII from 'domain/fii';

interface FIIsStorage {
  saveFIIs: (fiis: FII[]) => Promise<void>;
  findAllFIIs: () => Promise<FII[]>;
}

export default FIIsStorage;
