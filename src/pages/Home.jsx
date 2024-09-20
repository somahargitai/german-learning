import Menu from "../components/Menu";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Home({ menuOptions }) {
  const navigate = useNavigate();
  return (
    <>
      <h1>Német</h1>
      <Menu
        options={menuOptions.map((option) => ({
          id: option.key,
          label: option.label,
          onClick: () => navigate(option.href),
        }))}
      />
    </>
  );
}

Menu.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default Home;
