import HamburgerItem from "./HamburgerItem.jsx";
import PropTypes from "prop-types";
import { List, Typography } from "@mui/material";

const Menu = ({ options }) => {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {options.map((option) => (
        <HamburgerItem key={option.id} onClick={option.onClick}>
          {option.icon}
          <Typography>{option.label}</Typography>
        </HamburgerItem>
      ))}
    </List>
  );
};

Menu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};

export default Menu;
