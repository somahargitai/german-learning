// get the .SVG file as LogoSVG '../images/vite.svg';
import viteLogo from '../assets/react.svg';
// import viteLogo from "/vite.svg";
import { useNavigate, Link as LinkRRD } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material/';

const LogoMark = ({ sx }) => {
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
};

export default LogoMark;

