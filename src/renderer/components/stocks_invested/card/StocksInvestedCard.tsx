import { Card, CardContent, Grid, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import { GRID_SPACING } from 'renderer/config/constants';
import StocksInvestedContext from 'renderer/stocks/stocks_invested_context';
import StocksInvestedBodyEmptyList from './body/StocksInvestedBodyEmptyList';
import StocksInvestedBodyLoading from './body/StocksInvestedBodyLoading';

interface IProps {
  stockText: string;
}

const StocksInvestedCard: FC<IProps> = ({ stockText }) => {
  const { stocksInvested, loadStatus } = useContext(StocksInvestedContext);

  const title = `Invested ${stockText}`;

  const isLoading = loadStatus === 'LOADING';
  const isDone = loadStatus === 'DONE';

  const hasAnyStockInvested = stocksInvested.length > 0;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={GRID_SPACING}>
          <Grid item xs={12}>
            <Grid
              container
              alignContent="center"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h3">{title}</Typography>
              </Grid>
            </Grid>
          </Grid>

          {isLoading && <StocksInvestedBodyLoading />}
          {isDone && !hasAnyStockInvested && (
            <StocksInvestedBodyEmptyList stockText={stockText} />
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StocksInvestedCard;
