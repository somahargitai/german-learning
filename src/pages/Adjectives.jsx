import { useEffect, useState } from 'react';
import { AppBar, Stack, Toolbar, Box, Typography, Button, Container } from '@mui/material';

import adjCompSupList from '../translations/adjectiveCompSup';

function Adjectives() {
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualWord, setActualWord] = useState('');
  const [actualLanguage, setActualLanguage] = useState('de');
  const [solutions, setSolutions] = useState([
    { solution: 'bla', visible: false },
    { solution: 'blabla', visible: false },
    { solution: 'blablabla', visible: false },
  ]);
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);

  function addLastFailsIndexes(index) {
    const newIndexes = [...lastFailsIndexes, index];
    setLastFailsIndexes(newIndexes);
  }

  function getNextWordIndex() {
    if (successCounter < 5 && lastFailsIndexes.length > 5) {
      const randomElementFromLastFails =
        lastFailsIndexes[Math.floor(Math.random() * lastFailsIndexes.length)];

      return randomElementFromLastFails;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * adjCompSupList.length);
    } while (randomIndex === actualIndex);

    return randomIndex;
  }

  const setSolutionsItemVisible = (index) => {
    setSolutions(
      solutions.map((solution, si) => (si === index ? { ...solution, visible: true } : solution))
    );
  };

  function setNextPassed() {
    if (solutions[0].visible === false) {
      setSolutionsItemVisible(0);
    } else if (solutions[1].visible === false) {
      setSolutionsItemVisible(1);
    } else if (solutions[2].visible === false) {
      setSolutionsItemVisible(2);
      setShowButtonDisabled(true);
    }
  }

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function getRandomLanguage() {
    const languages = ['de', 'hu'];
    const randomIndex = Math.floor(Math.random() * languages.length);
    const chosenLanguage = languages[randomIndex];
    return chosenLanguage;
  }

  function setNextWord() {
    const language = getRandomLanguage();
    const nextWordIndex = getNextWordIndex();
    const nextItem = adjCompSupList[nextWordIndex];
    const nextWord = nextItem[language];

    setActualLanguage(language);
    setActualIndex(nextWordIndex);
    setActualWord(nextWord);

    const translationSolution = language === 'de' ? nextItem.hu : nextItem.de;
    const supSolution = nextItem.de_su;
    const compSolution = nextItem.de_co;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      { solution: compSolution, visible: false },
      { solution: supSolution, visible: false },
    ];

    setSolutions(solutionsRefill);
    setShowButtonDisabled(false);
  }

  useEffect(() => {
    setNextWord();
  }, []);

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
            Adjectives
          </Typography>
          <Typography variant="h4">{successCounter} / 10</Typography>
        </Toolbar>
      </AppBar>

      {/* main content */}

      <Box
        id="word"
        sx={{
          marginTop: '10px',
          borderBottom: '3px solid black',
          paddingBottom: '10px',
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
          <Typography variant="h4">comp</Typography>
          <Typography variant="h4">sup</Typography>
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
    </Container>
  );
}

export default Adjectives;
