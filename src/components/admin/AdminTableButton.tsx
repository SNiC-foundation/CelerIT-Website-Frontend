import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(Button)({
  minWidth: 0,
  padding: '6px 12px',
  marginRight: '0.5em',
});

export default function AdminTableButton(props: ButtonProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton variant="contained" {...props} />
  );
}
