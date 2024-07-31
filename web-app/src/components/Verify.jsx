import { useState, useContext } from "react";
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
import AuthContext from "../stores/authContext";

// eslint-disable-next-line react/prop-types
function Register({ title, action }) {
  const {
    web3,
    Government,
    School,
    Company,
    Person,
  } = useContext(AuthContext);

  const styles = {
    title: {
      color: "black",
      fontFamily: "Century Gothic",
      padding: "30px",
    },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(false);

  const verifyItem = async (address) => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (title === "Verify Company") {
      const response = await Government.methods.isRegisterCompany(address).call(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
          setVerificationStatus(response)
          console.log(response)
    } else if (title === "Verify School") {
      const response = await Government.methods.isRegisterSchool(address).call(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
          setVerificationStatus(response)
          console.log(response)
    }
    handleOpen();
  } catch (error) {
    console.log(error)
  }
  }

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    verifyItem(e.target.elements.address.value)
    handleOpen();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={styles.title}>
        {title}
      </Typography>
      {action === "verify" && (
        <form onSubmit={handleVerify}>
          <Box display="flex" flexDirection="column" gap={4}>
            <TextField
              label="Address"
              variant="filled"
              name="address"
            />
            <Button type="submit" variant="contained" color="primary">
              Verify
            </Button>
          </Box>
        </form>
      )}
      <Dialog open={modalOpen} onClose={handleClose}>
        {verificationStatus ? (        
        <>
          <DialogTitle>Verification Successful</DialogTitle>
          <DialogContent>
            <DialogContentText>Successful!</DialogContentText>
          </DialogContent>
        </> ) : (
        <>
          <DialogTitle>Verification Failed</DialogTitle>
          <DialogContent>
            <DialogContentText>Failed!</DialogContentText>
          </DialogContent>
        </>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Register;