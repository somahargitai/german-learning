import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

const HamburgerItem = ({ startIcon, children, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{ width: '100%', marginBottom: '10px' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {startIcon}
        {children}
      </Box>
    </Button>
  );
};

HamburgerItem.propTypes = {
  startIcon: PropTypes.element,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HamburgerItem;
