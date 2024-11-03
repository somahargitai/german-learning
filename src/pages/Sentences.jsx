import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { introduceSentences, questions } from '../translations/drillSentences';

const languages = ['de', 'hu'];

function Sentences() {
  const [actualIndex, setActualIndex] = useState(0);
  const [actualSentence, setActualSentence] = useState('');
  const [solution, setSolution] = useState({ solution: '', visible: false });
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);
  const [successCounter, setSuccessCounter] = useState(0);
  const [passedInLastTen, setPassedInLastTen] = useState(new Array(10).fill(false));
  const [selectedList, setSelectedList] = useState(introduceSentences);
  const [selectedListName, setSelectedListName] = useState('introduce');
  const [lastFailsIndexes, setLastFailsIndexes] = useState([]);

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

    if (selectedList.length > 1) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * selectedList.length);
      } while (randomIndex === actualIndex);
      return randomIndex;
    } else {
      return 0;
    }
  }

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function addLastFailsIndexes(index) {
    const newIndexes = [...lastFailsIndexes, index];
    setLastFailsIndexes(newIndexes);
  }

  function setNextWord() {
    const language = getRandomLanguage();
    const nextWordIndex = getNextWordIndex();
    const nextItem = selectedList[nextWordIndex];
    const nextWord = nextItem[language];

    setActualIndex(nextWordIndex);
    setActualSentence(nextWord);

    const translationSolution = language === 'de' ? nextItem.hu : nextItem.de;

    setSolution({ solution: translationSolution, visible: false });
    setShowButtonDisabled(false);
  }

  function setNextPassed() {
    if (!solution.visible) {
      setSolution({ ...solution, visible: true });
      setShowButtonDisabled(true);
    }
  }

  function handleWordListChange(event) {
    if (event.target.value === 'introduce') {
      setSelectedList(introduceSentences);
      setSelectedListName('introduce');
    } else if (event.target.value === 'questions') {
      setSelectedList(questions);
      setSelectedListName('questions');
    }
    setNextWord();
  }

  useEffect(() => {
    setNextWord();
  }, []);

  useEffect(() => {
    setSuccessCounter(passedInLastTen.filter((passed) => passed).length);
  }, [passedInLastTen]);

  useEffect(() => {
    if (selectedList.length > 1) {
      setNextWord();
    }
  }, [selectedList]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            Sentences
          </Typography>
          <Typography variant="h4">{successCounter} / 10</Typography>
        </Toolbar>
      </AppBar>

      <FormControl sx={{ mb: 4 }}>
        <InputLabel>Sentence Type</InputLabel>
        <Select value={selectedListName} onChange={handleWordListChange}>
          <MenuItem value="introduce">Introduction Sentences</MenuItem>
          <MenuItem value="questions">Questions</MenuItem>
        </Select>
      </FormControl>

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

      <Typography variant="h4">{solution.visible ? solution.solution : '-'}</Typography>

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
            color="error"
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
            color="success"
            sx={{ flexGrow: 1 }}
          >
            Passed
          </Button>
        </Stack>

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

export default Sentences;
