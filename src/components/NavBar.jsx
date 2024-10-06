import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AppBar, IconButton, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HamburgerMenuItems from "./HamburgerMenuItems";
import HamburgerItem from "./HamburgerItem";
import { LogoMark, LogoMarkFlex } from "./LogoMark";

function NavBar({ menuOptions }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        // put contined  elements on the right
        // sx={{ justifyContent: "right" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <MenuIcon /> */}
        <IconButton
          // sx={{
          //   maxWidth: "30px",
          //   maxHeight: "30px",
          // }}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate("/")}
        >
          <LogoMarkFlex
            style={{
              width: "40px",
              height: "40px",
              padding: "0px",
            }}
          />
        </IconButton>
        v1.1.5
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 0 }}
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <HamburgerMenuItems open={open} handleOpenClose={handleOpenNavMenu}>
          {menuOptions.map((option) => (
            <Fragment key={`fr_${option.key}_brand`}>
              <HamburgerItem
                key={`hi_${option.key}_brand`}
                onClick={() => {
                  navigate(option.href);
                  // close
                  handleOpenNavMenu(!open);
                }}
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
              {/* <GreyLine /> */}
            </Fragment>
          ))}
        </HamburgerMenuItems>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default NavBar;
