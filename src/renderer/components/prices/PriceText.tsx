import CurrencyCode from '@entities/currencies/CurrencyCode';
import { Box, Typography } from '@mui/material';
import { IconCurrencyDollar, IconCurrencyReal } from '@tabler/icons';
import { FC } from 'react';

type Props = {
  currencyCode: CurrencyCode;
  price: number;
};

const PriceText: FC<Props> = ({ currencyCode, price }) => {
  const PriceCodeIcon =
    currencyCode === 'BRL' ? IconCurrencyReal : IconCurrencyDollar;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 0.5,
      }}
    >
      <PriceCodeIcon size={20} stroke={1.5} />

      <Typography fontSize={14}>{price.toFixed(2)}</Typography>
    </Box>
  );
};

export default PriceText;
