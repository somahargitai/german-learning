import { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { Send } from '@mui/icons-material';

function ApiTest() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hardcoded prompt sentence
  const hardcodedPrompt = 'Hallo! Wie geht es dir heute?';

  //   // Get API URL from configuration
  //   const apiUrl = import.meta.env.VITE_API_URL;

  const handleSendPrompt = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/openai/freeTalk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: hardcodedPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.message || JSON.stringify(data));
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        gap: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        API Test Page
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          maxWidth: 600,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hardcoded Prompt:
        </Typography>

        <Typography
          variant="body1"
          sx={{
            backgroundColor: '#f5f5f5',
            padding: 2,
            borderRadius: 1,
            marginBottom: 3,
            fontStyle: 'italic',
          }}
        >
          "{hardcodedPrompt}"
        </Typography>

        <Button
          variant="contained"
          onClick={handleSendPrompt}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          sx={{ marginBottom: 3 }}
        >
          {loading ? 'Sending...' : 'Send to API'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {response && (
          <Box>
            <Typography variant="h6" gutterBottom>
              API Response:
            </Typography>
            <Paper
              elevation={1}
              sx={{
                padding: 2,
                backgroundColor: '#e8f5e8',
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <Typography variant="body1">{response}</Typography>
            </Paper>
          </Box>
        )}

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            marginTop: 2,
            color: 'text.secondary',
          }}
        >
          API URL: {import.meta.env.VITE_API_URL}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ApiTest;
