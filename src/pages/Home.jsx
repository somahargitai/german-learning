import Menu from "../components/Menu";

const Home = () => {
  return (
    <>
      <h1>Német</h1>
      <Menu
        options={[
          {
            id: 1,
            label: "Home",
            onClick: () => alert("Home"),
          },
          {
            id: 2,
            label: "About",
            onClick: () => alert("About"),
          },
        ]}
      />
    </>
  );
};

export default Home;
