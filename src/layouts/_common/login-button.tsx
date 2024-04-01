// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href="/product" variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
