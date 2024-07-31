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
  const { School, web3, CToken } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [title, setTitle] = useState("");

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleGetBalance = () => {
    getBalance();
    setTitle("Token Balance");
    handleOpen();
  }

  const getBalance = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const data = await School.methods
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

  const handleReceiveToken = () => {
    receiveToken();
    setTitle("Receive Token");
    handleOpen();
  }

  const receiveToken = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = 0;
      console.log(accounts);
      const paymentList = await School.methods.getWallets().call({
        from: accounts[0],
        gas: 1000000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log(paymentList);
      for (let i = 0; i < paymentList.length; i++) {
        const data = await CToken.methods
        .transferFrom(paymentList[i], accounts[0], 1*10**18)
        .send({
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
        balance += 1;
      }
      await School.methods.cleanWallets().send({
        from: accounts[0],
        gas: 1000000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      balance = balance.toString() + " CTH";
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop:'60px' }}>
        <Button
              variant="outlined"
              startIcon={<CurrencyBitcoinIcon />}
              sx={{
                backgroundColor: "#1876d2",
                marginBottom: '10px',
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
        <Button
              variant="outlined"
              startIcon={<CurrencyBitcoinIcon />}
              sx={{
                backgroundColor: "lightcoral",
                color: "white",
                width: '200px', // Adjust button width as needed
                height: '50px', // Adjust button height as needed
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#0d4e9b', // Make the background slightly darker on hover
                },
              }}

              onClick={handleReceiveToken}
            >
              Receive Token
        </Button>
      </div>
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
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