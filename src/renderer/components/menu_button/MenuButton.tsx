import { Breakpoint, Button, Dialog } from '@mui/material';
import { FC, useState } from 'react';

type Props = {
  label: string;
  variant?: 'contained' | 'outlined' | 'text';
  maxWidth?: Breakpoint | false;
};

const MenuButton: FC<Props> = ({
  label,
  variant = 'text',
  maxWidth = 'sm',
  children,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant={variant} onClick={handleOpen}>
        {label}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={maxWidth}>
        {children}
      </Dialog>
    </>
  );
};

export default MenuButton;
