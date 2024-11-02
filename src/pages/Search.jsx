import React, { useState } from 'react';
import {
  otherNouns,
  family,
  animals,
  house,
  clothes,
  bodyParts,
  food,
} from '../translations/nounPronPlur';
import { verbs, sichVerbs } from '../translations/verbConjugation';
import { Container, Grid2 as Grid, Paper, Typography, Box, TextField } from '@mui/material';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  // Combine all word lists
  const allWords = [
    ...otherNouns,
    ...family,
    ...animals,
    ...house,
    ...clothes,
    ...bodyParts,
    ...food,
    ...verbs,
    ...sichVerbs,
  ];

  const filteredWords = allWords.filter((word) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      word.de?.toLowerCase().includes(searchLower) ||
      word.hu?.toLowerCase().includes(searchLower) ||
      word.de_pl?.toLowerCase().includes(searchLower) ||
      word.pronoun?.toLowerCase().includes(searchLower) ||
      word.ich?.toLowerCase().includes(searchLower) ||
      word.du?.toLowerCase().includes(searchLower) ||
      word.er_sie_es?.toLowerCase().includes(searchLower) ||
      word.wir?.toLowerCase().includes(searchLower) ||
      word.ihr?.toLowerCase().includes(searchLower) ||
      word.sie_Sie?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Container sx={{ p: 4, paddingTop: '134px', minHeight: '100vh' }}>
      <TextField
        fullWidth
        placeholder="Search words..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4}>
        {filteredWords.map((word, index) => (
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Paper sx={{ p: 4 }}>
              {/* Noun properties */}
              {word.de && (
                <>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      German:
                    </Box>{' '}
                    {word.de}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      Hungarian:
                    </Box>{' '}
                    {word.hu}
                  </Typography>
                  {word.pronoun && (
                    <Typography>
                      <Box component="span" fontWeight="bold">
                        Pronoun:
                      </Box>{' '}
                      {word.pronoun}
                    </Typography>
                  )}
                  {word.de_pl && (
                    <Typography>
                      <Box component="span" fontWeight="bold">
                        Plural:
                      </Box>{' '}
                      {word.de_pl}
                    </Typography>
                  )}
                </>
              )}

              {/* Verb properties */}
              {word.ich && (
                <>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      Infinitive:
                    </Box>{' '}
                    {word.infinitive}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      ich:
                    </Box>{' '}
                    {word.ich}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      du:
                    </Box>{' '}
                    {word.du}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      er/sie/es:
                    </Box>{' '}
                    {word.er_sie_es}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      wir:
                    </Box>{' '}
                    {word.wir}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      ihr:
                    </Box>{' '}
                    {word.ihr}
                  </Typography>
                  <Typography>
                    <Box component="span" fontWeight="bold">
                      sie/Sie:
                    </Box>{' '}
                    {word.sie_Sie}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Search;
