import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const ReligiousMode = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend
    setResponse('Your question has been received. Response coming soon...');
    setQuery('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Religious Companion Mode
      </Typography>
      <Typography variant="body1" paragraph align="center">
        Ask questions about religious practices, stories, or teachings
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Your Question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            disabled={!query.trim()}
            sx={{ float: 'right' }}
          >
            Ask Question
          </Button>
        </form>
      </Paper>

      {response && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Response:
          </Typography>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="body1">{response}</Typography>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ReligiousMode;
