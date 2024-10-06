import { Box } from '@mui/material/';
import viteLogo from '../assets/Flag_of_Germany.svg';
import PropTypes from 'prop-types';

export function LogoMark({ sx }) {
  return (
    <Box
      sx={{
        width: '40px',
        height: '40px',
        marginRight: '16px',
        marginLeft: '0px',
        justifyContent: 'center',
        display: { xs: 'flex', md: 'flex' },
        ...sx,
      }}
    >
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </Box>
  );
}

export function LogoMarkFlex({ style }) {
  return <img src={viteLogo} className="logo" alt="Vite logo" style={style} />;
}

LogoMark.propTypes = {
  sx: PropTypes.object,
};

LogoMarkFlex.propTypes = {
  sx: PropTypes.object,
};
