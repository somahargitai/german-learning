import PropTypes from "prop-types";
import { Box, SwipeableDrawer, Toolbar } from "@mui/material";
import { LogoMark } from "./LogoMark";

const HamburgerMenuItems = ({ open, handleOpenClose, children }) => {
  return (
    <>
      <SwipeableDrawer
        anchor="right"
        onOpen={handleOpenClose}
        open={Boolean(open)}
        onClose={handleOpenClose}
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "0px 0px 0px 16px",
            boxSizing: "border-box",
            width: "80%",
            height: "95%",
          },
        }}
      >
        <Toolbar
          sx={{
            height: "200px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "2vh",
          }}
        >
          <LogoMark
            sx={{
              width: "100px",
              height: "100px",
              marginTop: "50px",
              marginLeft: "0px",
              marginRight: "0px",
            }}
          />
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "30px",
          }}
        >
          {children}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

HamburgerMenuItems.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpenClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default HamburgerMenuItems;
