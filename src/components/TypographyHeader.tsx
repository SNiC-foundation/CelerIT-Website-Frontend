import { styled, Typography } from '@mui/material';

const TypographyHeader = styled(Typography)(({ theme }) => ({
  fontFamily: 'Quicksand',
  fontWeight: '500',
  color: theme.palette.text.primary,
  margin: '0 1rem 0.75rem',
}));

export default TypographyHeader;
