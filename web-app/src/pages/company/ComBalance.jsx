import { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'; //Balance icon
import AuthContext from "../../stores/authContext";

const GovBalance = () => {
  const { Company, web3 } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleGetBalance = () => {
    getBalance();
    handleOpen();
  }

  const getBalance = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const data = await Company.methods
        .getBanlance()
        .call({
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      console.log(data);
      const balance = data.toString();
      const modifiedBalance = balance.substring(0, balance.length - 18) + " CTH";
      setBalance(balance < 18 ? '0 CTH' : modifiedBalance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'60px' }}>
        <Button
              variant="outlined"
              startIcon={<CurrencyBitcoinIcon />}
              sx={{
                backgroundColor: "#1876d2",
                color: "white",
                width: '200px', // Adjust button width as needed
                height: '50px', // Adjust button height as needed
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#0d4e9b', // Make the background slightly darker on hover
                },
              }}

              onClick={handleGetBalance}
            >
              Get Balance
        </Button>
      </div>
      {/* <Typography variant="h6" sx={{ marginTop: 2 }}>
        Balance: {balance}
      </Typography> */}
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Token Balance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h4" sx={{ marginTop: 2 }}>
              {balance}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GovBalance;