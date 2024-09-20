import { Route, Routes, Navigate } from "react-router-dom";
import { Handshake } from "@mui/icons-material";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

const menuOptions = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: Handshake,
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: Handshake,
  },
];

function App() {
  return (
    <>
      <NavBar menuOptions={menuOptions} />
      <Routes>
        <Route path="/" element={<Home menuOptions={menuOptions} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
