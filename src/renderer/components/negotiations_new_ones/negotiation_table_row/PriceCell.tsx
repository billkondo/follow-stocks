import Price from '@entities/price/price';
import { Grid, TableCell } from '@mui/material';
import { IconCurrencyDollar, IconCurrencyReal } from '@tabler/icons';
import { FC } from 'react';

type Props = {
  price: Price;
};

const PriceCell: FC<Props> = ({ price }) => {
  const { code, value } = price;

  const PriceCodeIcon = code === 'BRL' ? IconCurrencyReal : IconCurrencyDollar;

  return (
    <TableCell>
      <Grid container alignItems="center">
        <PriceCodeIcon size={20} />

        <b style={{ marginLeft: 4 }}>{value.toFixed(2)}</b>
      </Grid>
    </TableCell>
  );
};

export default PriceCell;
