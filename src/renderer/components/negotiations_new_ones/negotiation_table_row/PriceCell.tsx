import CurrencyCode from '@entities/currencies/CurrencyCode';
import { Grid, TableCell } from '@mui/material';
import { IconCurrencyDollar, IconCurrencyReal } from '@tabler/icons';
import { FC } from 'react';

type Props = {
  price: number;
  currencyCode: CurrencyCode;
};

const PriceCell: FC<Props> = ({ price, currencyCode }) => {
  const PriceCodeIcon =
    currencyCode === 'BRL' ? IconCurrencyReal : IconCurrencyDollar;

  return (
    <TableCell>
      <Grid container alignItems="center">
        <PriceCodeIcon size={20} />

        <b style={{ marginLeft: 4 }}>{price.toFixed(2)}</b>
      </Grid>
    </TableCell>
  );
};

export default PriceCell;
