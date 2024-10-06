import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import Menu from "../components/Menu";
import HamburgerItem from "../components/HamburgerItem";

function Home({ menuOptions }) {
  console.log('Home');
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        paddingX: "10vw",
      }}
    >
      <h1>Német</h1>

      {menuOptions.map((option) => (
        <Fragment key={`fr_${option.key}_brand`}>
          <HamburgerItem
            key={`hi_${option.key}_brand`}
            onClick={() => navigate(option.href)}
          >
            <option.icon
              sx={{
                mr: 1,
              }}
            />
            <ListItemText
              key={`lit_${option.key}_brand`}
              primary={option.label}
            />
          </HamburgerItem>
        </Fragment>
      ))}
    </Box>
  );
}

Menu.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ),
};

export default Home;
