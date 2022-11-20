import PriceCode from '@entities/currencies/CurrencyCode';
import EventType from '@entities/events/EventType';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { IconCurrencyDollar, IconCurrencyReal } from '@tabler/icons';
import { FC, useRef, useState } from 'react';

type Props = {
  submitForm: (
    stockNegotiationType: EventType,
    quantity: number,
    priceCode: PriceCode,
    price: number,
  ) => void;
};

const NegotiationForm: FC<Props> = ({ submitForm }) => {
  const [stockNegotiationType, setStockNegotiationType] =
    useState<EventType>('BUY');
  const [quantity, setQuantity] = useState<string>('');
  const [priceCode, setPriceCode] = useState<PriceCode>('BRL');
  const [price, setPrice] = useState<string>('');

  const priceInput = useRef<HTMLInputElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);

  const numberPattern = /^[0-9]+\.?[0-9]*$/;

  const [quantityError, setQuantityError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');

  const handleSubmit = () => {
    validate();

    if (quantityError || priceError) return;

    submitForm(
      stockNegotiationType,
      parseFloat(quantity),
      priceCode,
      parseFloat(price),
    );
  };

  const validate = () => {
    setQuantityError('');
    setPriceError('');

    if (!quantity.match(numberPattern) || !parseFloat(quantity))
      setQuantityError('Enter a valid quantity');

    if (!price.match(numberPattern) || !parseFloat(price))
      setPriceError('Enter a valid price');
  };

  return (
    <Grid container direction="column" sx={{ px: 3, py: 2 }}>
      <Grid item>
        <Typography variant="h4">Enter negotiation data</Typography>
      </Grid>

      <Grid item container sx={{ pt: 3 }} spacing={2}>
        <Grid item md={6}>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={stockNegotiationType}
            onChange={(_, value) => setStockNegotiationType(value)}
          >
            <ToggleButton value={'BUY'}>
              <ArrowDropUp sx={{ mr: 1 }} />
              <b>Buy</b>
            </ToggleButton>
            <ToggleButton value={'SELL'}>
              <ArrowDropDown sx={{ mr: 1 }} />
              <b>Sell</b>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item md={6}>
          <TextField
            value={quantity}
            label="Quantity"
            fullWidth
            autoFocus
            onKeyPress={(event) => {
              if (event.key === 'Enter') priceInput.current.focus();
            }}
            onChange={(event) => setQuantity(event.target.value)}
            inputProps={{ pattern: numberPattern }}
            error={!!quantityError}
            helperText={quantityError}
          />
        </Grid>
      </Grid>

      <Grid container item sx={{ pt: 3 }} spacing={2}>
        <Grid item md={6}>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={priceCode}
            onChange={(_, value) => setPriceCode(value)}
          >
            <ToggleButton value={'BRL'}>
              <Grid container alignItems="center" justifyContent="center">
                <IconCurrencyReal size={20} style={{ marginRight: 8 }} />
                <b>BRL</b>
              </Grid>
            </ToggleButton>
            <ToggleButton value={'USD'}>
              <Grid container alignItems="center" justifyContent="center">
                <IconCurrencyDollar size={20} style={{ marginRight: 8 }} />
                <b>USD</b>
              </Grid>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item md={6}>
          <TextField
            value={price}
            label="Price"
            fullWidth
            inputRef={priceInput}
            onKeyPress={(event) => {
              if (event.key === 'Enter') submitButton.current.focus();
            }}
            onChange={(event) => setPrice(event.target.value)}
            error={!!priceError}
            helperText={priceError}
          />
        </Grid>
      </Grid>

      <Grid container item justifyContent="flex-end" sx={{ pt: 3 }}>
        <Button variant="contained" ref={submitButton} onClick={handleSubmit}>
          Continue
        </Button>
      </Grid>
    </Grid>
  );
};

export default NegotiationForm;
