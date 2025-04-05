import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  AccountBalance as WalletIcon,
  CreditCard as CardIcon,
  History as HistoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const Wallet = () => {
  const [balance, setBalance] = useState(2500);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [openTopUp, setOpenTopUp] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock transaction history
  const [transactions] = useState([
    { id: 1, type: 'Credit', amount: 1000, date: '2025-04-01', description: 'Initial deposit' },
    { id: 2, type: 'Debit', amount: 250, date: '2025-04-02', description: 'Grocery shopping' },
    { id: 3, type: 'Debit', amount: 350, date: '2025-04-03', description: 'Medicine purchase' },
    { id: 4, type: 'Credit', amount: 2000, date: '2025-04-04', description: 'Family deposit' },
  ]);

  const handleTopUpOpen = () => {
    setOpenTopUp(true);
  };

  const handleTopUpClose = () => {
    setOpenTopUp(false);
    setTopUpAmount('');
    setPaymentMethod('card');
  };

  const handleTopUp = () => {
    if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid amount',
        severity: 'error',
      });
      return;
    }

    setBalance(prevBalance => prevBalance + Number(topUpAmount));
    setSnackbar({
      open: true,
      message: `Successfully added ₹${topUpAmount} to your wallet`,
      severity: 'success',
    });
    handleTopUpClose();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Wallet
      </Typography>

      {/* Balance Card */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <WalletIcon sx={{ fontSize: 60, opacity: 0.8 }} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Available Balance</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              ₹{balance.toLocaleString()}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleTopUpOpen}
              sx={{ 
                py: 1.5, 
                px: 3, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }
              }}
            >
              Top Up
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Quick Actions */}
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <AddIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Add Money</Typography>
              <Typography variant="body2" color="text.secondary">
                Top up your wallet balance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <CardIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Payment Methods</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your payment options
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <HistoryIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Transaction History</Typography>
              <Typography variant="body2" color="text.secondary">
                View your past transactions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <AccountBalance color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Bank Accounts</Typography>
              <Typography variant="body2" color="text.secondary">
                Link or manage bank accounts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Transactions
        </Typography>
        <Paper elevation={2} sx={{ p: 0, overflow: 'hidden' }}>
          {transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <Box sx={{ p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography variant="subtitle1">{transaction.description}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: transaction.type === 'Credit' ? 'success.main' : 'error.main'
                      }}
                    >
                      {transaction.type === 'Credit' ? '+' : '-'}₹{transaction.amount}
                    </Typography>
                    <Chip 
                      label={transaction.type} 
                      size="small" 
                      color={transaction.type === 'Credit' ? 'success' : 'error'}
                      sx={{ float: 'right' }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {index < transactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      </Box>

      {/* Top Up Dialog */}
      <Dialog open={openTopUp} onClose={handleTopUpClose} maxWidth="sm" fullWidth>
        <DialogTitle>Top Up Your Wallet</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment Method"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                <MenuItem value="upi">UPI</MenuItem>
                <MenuItem value="netbanking">Net Banking</MenuItem>
              </Select>
            </FormControl>

            {paymentMethod === 'card' && (
              <>
                <TextField
                  label="Card Number"
                  fullWidth
                  placeholder="XXXX XXXX XXXX XXXX"
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField label="Expiry Date" fullWidth placeholder="MM/YY" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField label="CVV" fullWidth placeholder="XXX" />
                  </Grid>
                </Grid>
              </>
            )}

            {paymentMethod === 'upi' && (
              <TextField
                label="UPI ID"
                fullWidth
                placeholder="yourname@upi"
                sx={{ mb: 2 }}
              />
            )}

            {paymentMethod === 'netbanking' && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Select Bank</InputLabel>
                <Select label="Select Bank">
                  <MenuItem value="sbi">State Bank of India</MenuItem>
                  <MenuItem value="hdfc">HDFC Bank</MenuItem>
                  <MenuItem value="icici">ICICI Bank</MenuItem>
                  <MenuItem value="axis">Axis Bank</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTopUpClose}>Cancel</Button>
          <Button onClick={handleTopUp} variant="contained" color="primary">
            Add Money
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Wallet;
