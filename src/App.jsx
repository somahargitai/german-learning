import { Route, Routes, Navigate } from "react-router-dom";
import { Handshake } from "@mui/icons-material";
import "./App.css";
import Home from "./pages/Home";
import Nouns from "./pages/Nouns";
import Adjectives from "./pages/Adjectives";
import Verbs from "./pages/Verbs";
import NavBar from "./components/NavBar";
import Phrases from "./pages/Phrases";

const menuOptions = [
  // {
  //   key: "home",
  //   label: "Home",
  //   href: "/",
  //   icon: Handshake,
  // },
  {
    key: "nouns",
    label: "Nouns",
    href: "/nouns",
    icon: Handshake,
  },
  {
    key: "adjectives",
    label: "Adjectives",
    href: "/adjectives",
    icon: Handshake,
  },
  {
    key: "verbs",
    label: "Verbs",
    href: "/verbs",
    icon: Handshake,
  },
  {
    key: "phrases",
    label: "Phrases",
    href: "/phrases",
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
        <Route path="/nouns" element={<Nouns />} />
        <Route path="/adjectives" element={<Adjectives />} />
        <Route path="/verbs" element={<Verbs />} />
        <Route path="/phrases" element={<Phrases />} />
      </Routes>
    </>
  );
}

export default App;
