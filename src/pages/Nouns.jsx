import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Modal,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { FilterAlt as FilterIcon } from '@mui/icons-material';

import {
  otherNouns,
  family,
  animals,
  house,
  clothes,
  bodyParts,
  food,
} from '../translations/nounPronPlur';

function Nouns() {
  // CONSTANTs
  const languages = ['de', 'hu'];

  // STATE HOOKs
  const [nounPronounsAndPlurals, setNounPronounsAndPlurals] = useState([]);
  const [modalOpen, setFilterModalOpen] = useState(false);
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualWord, setActualWord] = useState('');
  const [actualLanguage, setActualLanguage] = useState('de');
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);
  const [solutions, setSolutions] = useState([]);

  // FUNCTIONs

  // get random language, next word index and fill solutions
  function setNextWord() {
    const language = getRandomLanguage();
    const nextWordIndex = getNextWordIndex();

    const nextItem = nounPronounsAndPlurals[nextWordIndex];
    const nextWord = nextItem[language];

    setActualLanguage(language);
    setActualIndex(nextWordIndex);
    setActualWord(nextWord);

    const translationSolution = language === 'de' ? nextItem.hu : nextItem.de;
    const pluralSolution = nextItem.de_pl;
    const pronounSolution = nextItem.pronoun;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      { solution: pronounSolution, visible: false },
      { solution: pluralSolution, visible: false },
    ];

    setSolutions(solutionsRefill);
    setShowButtonDisabled(false);
  }

  const setSolutionsItemVisible = (index) => {
    setSolutions(
      solutions.map((solution, si) => (si === index ? { ...solution, visible: true } : solution))
    );
  };

  function setNextPassed() {
    const firstInvisibleIndex = solutions.findIndex((solution) => !solution.visible);
    if (firstInvisibleIndex !== -1) {
      setSolutionsItemVisible(firstInvisibleIndex);
      if (firstInvisibleIndex === solutions.length - 1) {
        setShowButtonDisabled(true);
      }
    }
  }

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function getRandomLanguage() {
    const randomIndex = Math.floor(Math.random() * languages.length);
    const chosenLanguage = languages[randomIndex];
    return chosenLanguage;
  }

  function getNextWordIndex() {
    if (successCounter < 5 && lastFailsIndexes.length > 5) {
      const randomElementFromLastFails =
        lastFailsIndexes[Math.floor(Math.random() * lastFailsIndexes.length)];

      return randomElementFromLastFails;
    }

    if (nounPronounsAndPlurals.length > 1) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * nounPronounsAndPlurals.length);
      } while (randomIndex === actualIndex);

      return randomIndex;
    } else {
      return 0;
    }
  }

  function addLastFailsIndexes(index) {
    const newIndexes = [...lastFailsIndexes, index];
    setLastFailsIndexes(newIndexes);
  }

  // HANDLERs
  function handlehandleChangeWordSet(wordSet) {
    if (wordSet === 'all') {
      setNounPronounsAndPlurals([
        ...otherNouns,
        ...family,
        ...animals,
        ...house,
        ...clothes,
        ...bodyParts,
        ...food,
      ]);
    } else if (wordSet === 'otherNouns') {
      setNounPronounsAndPlurals(otherNouns);
    } else if (wordSet === 'family') {
      setNounPronounsAndPlurals(family);
    } else if (wordSet === 'animals') {
      setNounPronounsAndPlurals(animals);
    } else if (wordSet === 'house') {
      setNounPronounsAndPlurals(house);
    } else if (wordSet === 'clothes') {
      setNounPronounsAndPlurals(clothes);
    } else if (wordSet === 'bodyParts') {
      setNounPronounsAndPlurals(bodyParts);
    } else if (wordSet === 'food') {
      setNounPronounsAndPlurals(food);
    }
  }

  // EFFECT HOOKs
  useEffect(() => {
    setNounPronounsAndPlurals([
      ...otherNouns,
      ...family,
      ...animals,
      ...house,
      ...clothes,
      ...bodyParts,
      ...food,
    ]);
  }, []);

  useEffect(() => {
    if (nounPronounsAndPlurals.length > 0) {
      setNextWord();
      setFilterModalOpen(false);
    }
  }, [nounPronounsAndPlurals]);

  useEffect(() => {
    setSuccessCounter(passedInLastTen.filter((passed) => passed).length);
  }, [passedInLastTen]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        // 56+56+6+16
        paddingTop: '134px',
        marginTop: 0,
      }}
    >
      {/* subheader  */}
      <AppBar position="fixed" sx={{ marginTop: '60px' }}>
        <Toolbar
          sx={{
            // "primary.main", "primary.light",
            backgroundColor: 'primary.dark',
            color: 'white',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Nouns
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              color="inherit"
              onClick={() => setFilterModalOpen(true)}
              aria-label="Open filter options"
            >
              <FilterIcon />
            </IconButton>

            <Typography
              variant="h4"
              // vertical middle
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {successCounter} / 10
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* main content */}
      <Box
        id="word"
        sx={{
          marginTop: '10px',
          borderBottom: '3px solid black',
          paddingBottom: '10px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h2">{actualWord}</Typography>
      </Box>

      {/* translation table  */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        width="100%"
        paddingX={2}
        paddingTop={3}
      >
        {/* label column */}
        <Stack
          direction="column"
          spacing={2}
          width="30%"
          minHeight={300}
          justifyContent="center"
          sx={{
            borderRight: '2px solid black',
            textAlign: 'right',
            paddingRight: 2,
          }}
        >
          <Typography variant="h4">{actualLanguage === 'hu' ? 'de' : 'hu'}</Typography>
          <Typography variant="h4">e/r/s</Typography>
          <Typography variant="h4">pl</Typography>
        </Stack>

        {/* value column */}
        <Stack direction="column" spacing={2} width="70%" minHeight={300} justifyContent="center">
          {solutions.length > 0 && (
            <>
              <Typography variant="h4">
                {solutions[0].visible ? solutions[0].solution : '-'}
              </Typography>
              <Typography variant="h4">
                {solutions[1].visible ? solutions[1].solution : '-'}
              </Typography>
              <Typography variant="h4">
                {solutions[2].visible ? solutions[2].solution : '-'}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>

      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          padding: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Footer Markers */}
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mx: 2 }}>
          <Button
            disabled={!showButtonDisabled}
            onClick={() => {
              setNewInLastTen(false);
              addLastFailsIndexes(actualIndex);
              setNextWord();
            }}
            endIcon="❌"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Failed
          </Button>
          <Button
            disabled={!showButtonDisabled}
            onClick={() => {
              setNewInLastTen(true);
              setNextWord();
            }}
            endIcon="✅"
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Passed
          </Button>
        </Stack>

        {/* Footer Show */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 2, mx: 2 }}>
          <Button
            disabled={showButtonDisabled}
            onClick={() => setNextPassed()}
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Show
          </Button>
        </Stack>
      </Box>
      {/* modals */}
      <Modal
        open={modalOpen}
        onClose={() => setFilterModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Select an option
          </Typography>
          <Stack spacing={2}>
            <ModalButton
              label="all"
              handlehandleChangeWordSet={() => {
                setNounPronounsAndPlurals([
                  ...otherNouns,
                  ...family,
                  ...animals,
                  ...house,
                  ...clothes,
                  ...bodyParts,
                  ...food,
                ]);
                setFilterModalOpen(false);
              }}
            />
            <ModalButton label="otherNouns" handlehandleChangeWordSet={handlehandleChangeWordSet} />
            <ModalButton label="family" handlehandleChangeWordSet={handlehandleChangeWordSet} />
            <ModalButton label="animals" handlehandleChangeWordSet={handlehandleChangeWordSet} />
            <ModalButton label="bodyParts" handlehandleChangeWordSet={handlehandleChangeWordSet} />
            <ModalButton label="food" handlehandleChangeWordSet={handlehandleChangeWordSet} />

            {/* <Button
              variant="contained"
              onClick={() => {
                // Handle option 2
                setFilterModalOpen(false);
              }}
            >
              Option 2
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                // Handle option 3
                setFilterModalOpen(false);
              }}
            >
              Option 3
            </Button> */}
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}

function ModalButton({ label, handlehandleChangeWordSet }) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        handlehandleChangeWordSet(label);
      }}
    >
      {label}
    </Button>
  );
}

export default Nouns;
