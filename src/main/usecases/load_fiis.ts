import FIIsService from 'main/services/fiis_service';

const LoadFIIs = (fiisService: FIIsService) => async () => {
  const fiis = await fiisService.fetchFIIs();
  await fiisService.saveFIIs(fiis);
};

export default LoadFIIs;
