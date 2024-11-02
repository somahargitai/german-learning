import { useEffect, useState } from 'react';
import { AppBar, Stack, Toolbar, Box, Typography, Button, Container, Modal } from '@mui/material';

import adjectiveConjugationSentences from '../translations/adjectiveConjSent';
import adjectiveComparativeAndSuperlativeList from '../translations/adjectiveCompSup';

const AdjConjSent = () => {
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);
  const [passedInLastTen, setPassedInLastTen] = useState(Array(10).fill(false));
  const [successCounter, setSuccessCounter] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [actualSentence, setActualSentence] = useState('');
  // const [actualLanguage, setActualLanguage] = useState("de");
  const language = 'hu';
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);
  const [solutions, setSolutions] = useState([
    { solution: 'bla', visible: false },
    { solution: 'blabla', visible: false },
  ]);
  const [explainModalOpen, setExplainModalOpen] = useState(false);

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
      randomIndex = Math.floor(Math.random() * adjectiveConjugationSentences.length);
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

      setShowButtonDisabled(true);
    }
  }

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function setNextWord() {
    const nextWordIndex = getNextWordIndex();
    const nextItem = adjectiveConjugationSentences[nextWordIndex];
    const nextWord = nextItem[language];

    setActualIndex(nextWordIndex);
    setActualSentence(nextWord);

    const translationSolution = language === 'de' ? nextItem.hu : nextItem.de;
    const pronounSolution = nextItem.pronoun;
    const solutionsRefill = [
      { solution: translationSolution, visible: false },
      { solution: pronounSolution, visible: false },
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
      <AppBar position="fixed" sx={{ marginTop: '60px' }}>
        <Toolbar
          sx={{
            backgroundColor: 'primary.dark',
            color: 'white',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Adjective Conjugation in Sentences
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
          marginBottom: '20px',
        }}
      >
        <Typography variant="h2">{actualSentence}</Typography>
      </Box>

      {/* Translation   */}
      <Typography variant="h4">{solutions[0].visible ? solutions[0].solution : '-'}</Typography>

      {/* Explain */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Button variant="contained" onClick={() => setExplainModalOpen(true)}>
          Explain
        </Button>
        <ExplainModal open={explainModalOpen} setOpen={setExplainModalOpen} />
      </Box>

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
};

const ExplainModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Explanation
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          This is the explanation of the sentence.
        </Typography>
      </Container>
    </Modal>
  );
};

export default AdjConjSent;
