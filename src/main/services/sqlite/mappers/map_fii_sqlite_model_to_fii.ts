import FII from 'domain/fii';
import FIISqliteModel from 'main/services/sqlite/models/fii_sqlite_model';

const mapFIISqliteModelToFII = (fiiSqliteModel: FIISqliteModel): FII => {
  const { name, ticker } = fiiSqliteModel;

  return {
    name,
    ticker,
  };
};

export default mapFIISqliteModelToFII;
