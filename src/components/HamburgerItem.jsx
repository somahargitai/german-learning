import PropTypes from "prop-types";
import { Box, ListItemButton } from "@mui/material";

const HamburgerItem = ({ startIcon, children, onClick }) => {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "150px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </ListItemButton>
  );
};

HamburgerItem.propTypes = {
  startIcon: PropTypes.element,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HamburgerItem;
