import FIIsService from 'main/services/fiis_service';
import LoadFIIs from './load_fiis';

const LoadFIIsFirstTime =
  (fiisService: FIIsService) => async (): Promise<boolean> => {
    const storedFIIs = await fiisService.findFIIs();
    const hasAnyFIIstored = storedFIIs.length > 0;

    if (hasAnyFIIstored) return false;

    const loadFIIs = LoadFIIs(fiisService);
    await loadFIIs();

    return true;
  };

export default LoadFIIsFirstTime;
