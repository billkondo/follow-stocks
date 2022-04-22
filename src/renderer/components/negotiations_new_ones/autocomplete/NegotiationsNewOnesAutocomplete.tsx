import {
  Autocomplete,
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Stock from 'domain/stock';
import StockType from 'domain/stock_type';
import { FC, useCallback, useEffect, useState } from 'react';
import { MIN_WIDTH } from 'renderer/config/constants';
import debounce from 'utils/debounce';
import delayed from 'utils/delayed';

interface Props {
  stockType: StockType;
  stock: Stock;
  setStock: (stock: Stock) => void;
}

const NegotiationsNewOneAutocomplete: FC<Props> = ({
  stockType,
  stock,
  setStock,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tickerInput, setTickerInput] = useState('');
  const [stocksOptions, setStocksOptions] = useState<Stock[]>([]);

  const searchStocks = useCallback(
    debounce(async (tickerText: string) => {
      try {
        setLoading(true);

        const stocksOptions = await delayed(
          window.stocks.searchStocksByTicker(stockType, tickerText),
        );

        setStocksOptions(stocksOptions);
      } finally {
        setLoading(false);
      }
    }),
    [stockType],
  );

  useEffect(() => {
    searchStocks(tickerInput);
  }, [tickerInput]);

  return (
    <Autocomplete
      value={stock}
      options={stocksOptions}
      disableClearable
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(_, newValue) => setTickerInput(newValue)}
      getOptionLabel={(option) => (option ? option.ticker : '')}
      filterOptions={(option) => option}
      onChange={(_, newStock) => setStock(newStock as Stock)}
      noOptionsText="No stocks were found"
      PaperComponent={(props) => <Paper {...props} elevation={8} />}
      isOptionEqualToValue={(option, value) => {
        if (!value) return false;

        return option.ticker === value.ticker;
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography variant="body1">
            {`${option.ticker} - ${option.name}`}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Which stock was negotiated?"
          sx={{ minWidth: MIN_WIDTH }}
          placeholder="Ticker"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && open && (
                  <CircularProgress
                    data-testid="autocomplete-loading"
                    size={20}
                  />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default NegotiationsNewOneAutocomplete;
