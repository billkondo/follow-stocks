import Stock from '@entities/stocks/Stock';
import StockType from '@entities/stocks/StockType';
import stockTypes from '@entities/stocks/stock_types';
import {
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { GRID_SPACING, MIN_WIDTH } from 'renderer/config/constants';
import NegotiationsNewOnesAutocomplete from './autocomplete/NegotiationsNewOnesAutocomplete';
import NegotiationsNewOnesDatePicker from './date_picker/NegotiationsNewOnesDatePicker';
import NegotiationsList from './negotiations_list';

const NegotiationsNewOneCard = () => {
  const [stockType, setStockType] = useState<StockType>('FII');

  const [stock, setStock] = useState<Stock>(null);
  const [negotiationDate, setNegotiationDate] = useState<Date>(null);

  const isNegotiationsListVisible = stock && negotiationDate;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={GRID_SPACING}>
          <Grid item xs={12}>
            <Typography variant="h3">New Negotiations</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormControl>
              <InputLabel id="stock-type-select">Stock type</InputLabel>
              <Select
                id="stock-type-select"
                label="Stock type"
                sx={{ minWidth: MIN_WIDTH }}
                value={stockType}
                onChange={(event) =>
                  setStockType(event.target.value as StockType)
                }
              >
                {stockTypes.map((stockType) => (
                  <MenuItem key={stockType} value={stockType}>
                    {stockType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1.5 }} />
          </Grid>

          <Grid item container xs={12} spacing={GRID_SPACING}>
            <Grid item xs={12}>
              <Typography variant="h4">Stock and date</Typography>
            </Grid>

            <Grid item container xs={12} spacing={GRID_SPACING}>
              <Grid item>
                <NegotiationsNewOnesAutocomplete
                  stockType={stockType}
                  stock={stock}
                  setStock={setStock}
                />
              </Grid>

              <Grid item>
                <NegotiationsNewOnesDatePicker
                  date={negotiationDate}
                  setDate={setNegotiationDate}
                />
              </Grid>
            </Grid>
          </Grid>

          {isNegotiationsListVisible && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 1.5 }} />
              </Grid>

              <Grid item container xs={12}>
                <NegotiationsList
                  stock={stock}
                  negotiationDate={negotiationDate}
                />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NegotiationsNewOneCard;
