import { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

function LanguageExercise({
  title,
  availableLanguagePairs,
  vocabularyArrays,
  sentenceArrays,
  vocabularyCategories,
  sentenceCategories,
}) {
  const [exerciseType, setExerciseType] = useState('vocabulary');
  const [vocabularyCategory, setVocabularyCategory] = useState('all');
  const [sentenceCategory, setSentenceCategory] = useState('all');
  const [languagePair, setLanguagePair] = useState(availableLanguagePairs[0]);
  const [currentItem, setCurrentItem] = useState(null);
  const [solution, setSolution] = useState({ solution: '', visible: false });
  const [showButtonDisabled, setShowButtonDisabled] = useState(false);
  const [successCounter, setSuccessCounter] = useState(0);
  const [passedInLastTen, setPassedInLastTen] = useState(new Array(10).fill(false));
  const [keyboardShortcutsActive, setKeyboardShortcutsActive] = useState(true);

  // Combine all vocabulary arrays
  const allVocabulary = vocabularyArrays.reduce((acc, arr) => [...acc, ...arr], []);

  // Combine all sentence arrays
  const allSentences = sentenceArrays.reduce((acc, arr) => [...acc, ...arr], []);

  const vocabularyData = {
    all: allVocabulary,
    ...vocabularyCategories.reduce(
      (acc, category) => ({
        ...acc,
        [category.key]: category.data,
      }),
      {}
    ),
  };

  const sentenceData = {
    all: allSentences,
    ...sentenceCategories.reduce(
      (acc, category) => ({
        ...acc,
        [category.key]: category.data,
      }),
      {}
    ),
  };

  // Combined data for "all exercises" mode
  const allExercisesData = [...allVocabulary, ...allSentences];

  function setNewInLastTen(newPassed) {
    const newList = [...passedInLastTen.slice(1), newPassed];
    setPassedInLastTen(newList);
  }

  function getRandomItem(items) {
    const randomIndex = Math.floor(Math.random() * items.length);
    return { item: items[randomIndex], index: randomIndex };
  }

  function setNextItem() {
    let items;

    if (exerciseType === 'all') {
      items = allExercisesData;
    } else if (exerciseType === 'vocabulary') {
      items = vocabularyData[vocabularyCategory];
    } else {
      items = sentenceData[sentenceCategory];
    }

    if (!items || items.length === 0) return;

    const { item, index } = getRandomItem(items);
    setCurrentItem({ ...item, index });

    const [fromLang, toLang] = languagePair.split('-');

    // If the item is a vocabulary item (has both language properties directly)
    if (
      item[fromLang] &&
      item[toLang] &&
      !item.hasOwnProperty('personDescription') &&
      !item.hasOwnProperty('animalDescription')
    ) {
      const question = item[fromLang];
      const answer = item[toLang];

      setCurrentItem({
        ...item,
        index,
        displayQuestion: question,
        displayAnswer: answer,
        type: 'vocabulary',
      });

      setSolution({ solution: answer, visible: false });
    } else {
      // It's a sentence
      setSolution({ solution: item[toLang], visible: false });
      setCurrentItem({
        ...item,
        index,
        type: 'sentence',
      });
    }

    setShowButtonDisabled(false);
  }

  const handlePassed = useCallback(() => {
    if (showButtonDisabled) {
      setNewInLastTen(true);
      setNextItem();
    }
  }, [showButtonDisabled]);

  const handleFailed = useCallback(() => {
    if (showButtonDisabled) {
      setNewInLastTen(false);
      setNextItem();
    }
  }, [showButtonDisabled]);

  const handleShowSolution = useCallback(() => {
    if (!showButtonDisabled) {
      setSolution({ ...solution, visible: true });
      setShowButtonDisabled(true);
    }
  }, [showButtonDisabled, solution]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!keyboardShortcutsActive) return;

      const activeElement = document.activeElement;
      const isInputActive =
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT';

      if (isInputActive) return;

      switch (event.key) {
        case ' ': // Spacebar
          event.preventDefault();
          handleShowSolution();
          break;
        case 'f':
        case 'F':
          handleFailed();
          break;
        case 'p':
        case 'P':
          handlePassed();
          break;
        default:
          break;
      }
    },
    [handleShowSolution, handleFailed, handlePassed, keyboardShortcutsActive]
  );

  // Add event listener for keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    setNextItem();
  }, [exerciseType, vocabularyCategory, sentenceCategory, languagePair]);

  useEffect(() => {
    setSuccessCounter(passedInLastTen.filter((passed) => passed).length);
  }, [passedInLastTen]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
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
            {title}
          </Typography>
          <Typography variant="h4">{successCounter} / 10</Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          paddingTop: '134px',
          paddingBottom: '120px',
          width: '100%',
        }}
      >
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              {vocabularyArrays.length > 0 && sentenceArrays.length > 0 ? (
                <Box sx={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel>Exercise Type</InputLabel>
                    <Select value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                      <MenuItem value="all">All Exercises</MenuItem>
                      <MenuItem value="vocabulary">Vocabulary</MenuItem>
                      <MenuItem value="sentences">Sentences</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              ) : (
                <Box
                  sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {vocabularyArrays.length > 0 ? 'Vocabulary Exercises' : 'Sentence Exercises'}
                  </Typography>
                </Box>
              )}

              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth>
                  <InputLabel>Language Direction</InputLabel>
                  <Select value={languagePair} onChange={(e) => setLanguagePair(e.target.value)}>
                    {availableLanguagePairs.map((pair) => (
                      <MenuItem key={pair} value={pair}>
                        {pair
                          .split('-')
                          .map((lang) => lang.toUpperCase())
                          .join(' → ')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {exerciseType === 'vocabulary' && vocabularyArrays.length > 0 && (
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <InputLabel>Vocabulary Category</InputLabel>
                  <Select
                    value={vocabularyCategory}
                    onChange={(e) => setVocabularyCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {vocabularyCategories.map((category) => (
                      <MenuItem key={category.key} value={category.key}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {exerciseType === 'sentences' && sentenceArrays.length > 0 && (
              <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                  <InputLabel>Sentence Category</InputLabel>
                  <Select
                    value={sentenceCategory}
                    onChange={(e) => setSentenceCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Sentences</MenuItem>
                    {sentenceCategories.map((category) => (
                      <MenuItem key={category.key} value={category.key}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Keyboard shortcuts: {keyboardShortcutsActive ? 'On' : 'Off'}
              </Typography>
              <Button
                size="small"
                onClick={() => setKeyboardShortcutsActive(!keyboardShortcutsActive)}
                variant={keyboardShortcutsActive ? 'contained' : 'outlined'}
                color={keyboardShortcutsActive ? 'success' : 'primary'}
              >
                {keyboardShortcutsActive ? 'Shortcuts On' : 'Shortcuts Off'}
              </Button>
            </Box>

            {keyboardShortcutsActive && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
                Space: Show | F: Failed | P: Passed
              </Typography>
            )}
          </Box>
        </Paper>

        <Card
          sx={{
            mb: 4,
            p: { xs: 1, md: 2 },
            minHeight: { xs: '200px', md: '300px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            border: 'none',
            boxShadow: 'none',
            elevation: 0,
          }}
        >
          <CardContent sx={{ width: '100%', px: { xs: 1, md: 2 }, py: 2 }}>
            {currentItem && (
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="h3"
                  align="center"
                  gutterBottom
                  sx={{
                    mb: 2,
                    fontSize: {
                      xs: '1.8rem',
                      sm: '2.5rem',
                      md: '3.5rem',
                      lg: '4.5rem',
                    },
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    overflowWrap: 'break-word',
                    padding: { xs: 0, md: 1 },
                  }}
                >
                  {currentItem[languagePair.split('-')[0]]}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    visibility: solution.visible ? 'visible' : 'hidden',
                    minHeight: '3rem',
                    fontSize: {
                      xs: '1.5rem',
                      sm: '2rem',
                      md: '2.8rem',
                      lg: '3.5rem',
                    },
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                    overflowWrap: 'break-word',
                    padding: { xs: 0, md: 1 },
                    marginTop: 2,
                  }}
                >
                  {solution.solution}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          padding: 2,
          bgcolor: 'background.paper',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          zIndex: 1100,
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mx: 2 }}>
          <Button
            disabled={!showButtonDisabled}
            onClick={handleFailed}
            endIcon="❌"
            variant="contained"
            color="error"
            sx={{ flexGrow: 1 }}
          >
            Failed
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {' '}
              (F)
            </Typography>
          </Button>
          <Button
            disabled={!showButtonDisabled}
            onClick={handlePassed}
            endIcon="✅"
            variant="contained"
            color="success"
            sx={{ flexGrow: 1 }}
          >
            Passed
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {' '}
              (P)
            </Typography>
          </Button>
        </Stack>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2, mx: 2 }}>
          <Button
            disabled={showButtonDisabled}
            onClick={handleShowSolution}
            variant="contained"
            sx={{ flexGrow: 1 }}
          >
            Show
            <Typography component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              (Space)
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default LanguageExercise;
