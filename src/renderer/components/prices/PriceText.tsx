import Price from '@entities/price/price';
import { Box, Typography } from '@mui/material';
import { IconCurrencyDollar, IconCurrencyReal } from '@tabler/icons';
import { FC } from 'react';

type Props = {
  price: Price;
};

const PriceText: FC<Props> = ({ price }) => {
  const { code, value } = price;

  const PriceCodeIcon = code === 'BRL' ? IconCurrencyReal : IconCurrencyDollar;

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

      <Typography fontSize={14}>{value.toFixed(2)}</Typography>
    </Box>
  );
};

export default PriceText;
