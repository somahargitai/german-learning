import { Box, Typography, Button, Stack, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { testLesson34Vocabulary, testLesson34Sentences } from '../translations/testLesson34Data';

function TestLesson34() {
  // state for the last generated sentence
  const [lastGeneratedSentence, setLastGeneratedSentence] = useState(null);
  const [actualSentenceHungarian, setActualSentenceHungarian] = useState(null);
  const [actualSentenceGerman, setActualSentenceGerman] = useState(null);
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSentenceStructure, setCurrentSentenceStructure] = useState(null);
  const [currentWords, setCurrentWords] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  // random sentence generator for start
  async function getRandomSentence() {
    setIsLoading(true);
    setTranslation(''); // Clear previous translation
    setComparisonResult(null); // Clear previous comparison

    try {
      const randomSentenceStructure =
        testLesson34Sentences[Math.floor(Math.random() * testLesson34Sentences.length)];
      const tenRandomWords = testLesson34Vocabulary.sort(() => Math.random() - 0.5).slice(0, 20);

      // Store current structure and words for other functions
      setCurrentSentenceStructure(randomSentenceStructure);
      setCurrentWords(tenRandomWords);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/openai/getSentenceByExampleAndWords`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            randomSentenceStructure,
            tenRandomWords,
          }),
        }
      );

      const data = await response.json();
      console.log('fetching data bla');

      console.log(typeof data);
      setLastGeneratedSentence(data);
      setActualSentenceHungarian(data.hungarian);
      setActualSentenceGerman(data.german);
    } catch (error) {
      console.error('Error fetching sentence:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get new words with same sentence structure
  async function getNewWords() {
    if (!currentSentenceStructure) {
      console.error('No current sentence structure available');
      return;
    }

    setIsLoading(true);
    setTranslation(''); // Clear previous translation
    setComparisonResult(null); // Clear previous comparison

    try {
      const newWords = testLesson34Vocabulary.sort(() => Math.random() - 0.5).slice(0, 20);
      setCurrentWords(newWords);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/openai/getSentenceWithNewWords`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sentenceStructure: currentSentenceStructure,
            newWords: newWords,
          }),
        }
      );

      const data = await response.json();
      console.log('New words data:', data);

      setLastGeneratedSentence(data);
      setActualSentenceHungarian(data.hungarian);
      setActualSentenceGerman(data.german);
    } catch (error) {
      console.error('Error fetching new words sentence:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get new sentence structure with same words
  async function getNewSentenceStructure() {
    if (!currentWords) {
      console.error('No current words available');
      return;
    }

    setIsLoading(true);
    setTranslation(''); // Clear previous translation
    setComparisonResult(null); // Clear previous comparison

    try {
      const newSentenceStructure =
        testLesson34Sentences[Math.floor(Math.random() * testLesson34Sentences.length)];
      setCurrentSentenceStructure(newSentenceStructure);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/openai/getSentenceWithNewStructure`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newSentenceStructure: newSentenceStructure,
            words: currentWords,
          }),
        }
      );

      const data = await response.json();
      console.log('New structure data:', data);

      setLastGeneratedSentence(data);
      setActualSentenceHungarian(data.hungarian);
      setActualSentenceGerman(data.german);
    } catch (error) {
      console.error('Error fetching new structure sentence:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Compare user input with correct German translation
  function compareTranslation() {
    if (!actualSentenceGerman || !translation.trim()) {
      return;
    }

    const correctWords = actualSentenceGerman.toLowerCase().split(/\s+/);
    const userWords = translation.toLowerCase().split(/\s+/);

    const result = {
      isCorrect: translation.toLowerCase().trim() === actualSentenceGerman.toLowerCase().trim(),
      words: [],
    };

    // Create a map of correct words with their counts
    const correctWordCounts = {};
    correctWords.forEach((word) => {
      correctWordCounts[word] = (correctWordCounts[word] || 0) + 1;
    });

    // Create a copy for tracking used words
    const usedCorrectWords = { ...correctWordCounts };

    // Analyze each user word
    userWords.forEach((userWord, index) => {
      if (usedCorrectWords[userWord] && usedCorrectWords[userWord] > 0) {
        // Correct word in correct position
        result.words.push({
          word: userWord,
          status: 'correct',
          position: index,
        });
        usedCorrectWords[userWord]--;
      } else {
        // Wrong word
        result.words.push({
          word: userWord,
          status: 'wrong',
          position: index,
        });
      }
    });

    // Add missing words
    Object.entries(usedCorrectWords).forEach(([word, count]) => {
      for (let i = 0; i < count; i++) {
        result.words.push({
          word: word,
          status: 'missing',
          position: result.words.length,
        });
      }
    });

    setComparisonResult(result);
  }

  // Handle Enter key press in text field
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      compareTranslation();
    }
  }

  useEffect(() => {
    getRandomSentence();
  }, []);

  // print actual german and hungarian sentences
  useEffect(() => {
    console.log(actualSentenceGerman);
    console.log(actualSentenceHungarian);
  }, [actualSentenceGerman, actualSentenceHungarian]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Test Lesson 3-4
      </Typography>
      {lastGeneratedSentence && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" component="h3" sx={{ color: 'text.secondary' }}>
            {actualSentenceHungarian}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter your translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mb: 3, mt: 3 }}
          />
          {/* <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
            {actualSentenceGerman}
          </Typography> */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={getRandomSentence}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Loading...' : 'Random sentence'}
            </Button>
            <Button
              variant="contained"
              onClick={getNewWords}
              disabled={isLoading || !currentSentenceStructure}
            >
              New words
            </Button>
            <Button
              variant="contained"
              onClick={getNewSentenceStructure}
              disabled={isLoading || !currentWords}
            >
              New sentence structure
            </Button>
          </Stack>

          {/* Comparison Results */}

          {comparisonResult && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {comparisonResult.isCorrect ? '✅ Perfect!' : '📝 Your Translation:'}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 1,
                  mt: 2,
                  p: 2,
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                }}
              >
                
                
                  {comparisonResult.words.map((wordObj, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      sx={{
                        color:
                          wordObj.status === 'correct'
                            ? 'green'
                            : wordObj.status === 'missing'
                              ? 'blue'
                              : 'red',
                        textDecoration: wordObj.status === 'wrong' ? 'line-through' : 'none',
                        fontWeight: 'bold',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          wordObj.status === 'correct'
                            ? '#e8f5e8'
                            : wordObj.status === 'missing'
                              ? '#e3f2fd'
                              : '#ffebee',
                      }}
                    >
                      {wordObj.word}
                    </Typography>
                  ))}
                  
                  <Typography variant="h5" sx={{ mt: 2, color: 'text.secondary' }}>
                    {actualSentenceGerman}
                  </Typography>
                
              </Box>

              {!comparisonResult.isCorrect && (
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  <strong>Legend:</strong>
                  <span style={{ color: 'green' }}> Green</span> = Correct,
                  <span style={{ color: 'blue' }}> Blue</span> = Missing,
                  <span style={{ color: 'red', textDecoration: 'line-through' }}> Red</span> = Wrong
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TestLesson34;
