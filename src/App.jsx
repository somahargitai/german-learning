import { Route, Routes, Navigate } from 'react-router-dom';
import { Handshake, School } from '@mui/icons-material';

import './App.css';
import Adjectives from './pages/Adjectives';
import AdjConjSent from './pages/AdjConjSent';
import Home from './pages/Home';
import LessonTwo from './pages/LessonTwo';
import LessonThree from './pages/LessonThree';
import NavBar from './components/NavBar';
import Nouns from './pages/Nouns';
import Phrases from './pages/Phrases';
import Search from './pages/Search';
import Verbs from './pages/Verbs';
import Sentences from './pages/Sentences';

const menuOptions = [
  // {
  //   key: "home",
  //   label: "Home",
  //   href: "/",
  //   icon: Handshake,
  // },
  {
    key: 'nouns',
    label: 'Nouns',
    href: '/nouns',
    icon: Handshake,
  },
  {
    key: 'adjectives',
    label: 'Adjectives',
    href: '/adjectives',
    icon: Handshake,
  },
  {
    key: 'verbs',
    label: 'Verbs',
    href: '/verbs',
    icon: Handshake,
  },
  {
    key: 'adjectives/sentences',
    label: 'Adj. Sentences',
    href: '/adjectives/sentences',
    icon: Handshake,
  },
  {
    key: 'sentences',
    label: 'Sentences',
    href: '/sentences',
    icon: Handshake,
  },
  {
    key: 'lesson-two',
    label: 'Lesson Two',
    href: '/lesson-two',
    icon: School,
  },
  {
    key: 'lesson3',
    label: 'Lesson Three',
    href: '/lesson3',
    icon: School,
  },
  {
    key: 'search',
    label: 'Search',
    href: '/search',
    icon: Handshake,
  },

  // {
  //   key: "phrases",
  //   label: "Phrases",
  //   href: "/phrases",
  //   icon: Handshake,
  // },
];

function App() {
  return (
    <>
      <NavBar menuOptions={menuOptions} />
      <Routes>
        <Route path="/" element={<Home menuOptions={menuOptions} />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/lesson3" element={<LessonThree />} />
        <Route path="/nouns" element={<Nouns />} />
        <Route path="/adjectives" element={<Adjectives />} />
        <Route path="/adjectives/sentences" element={<AdjConjSent />} />
        <Route path="/sentences" element={<Sentences />} />
        <Route path="/verbs" element={<Verbs />} />
        <Route path="/phrases" element={<Phrases />} />
        <Route path="/lesson-two" element={<LessonTwo />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
