import { useState, useContext } from "react";
import {
  Typography,
  Box,
  CssBaseline,
  TableContainer,
  TableBody,
  TableCell,
  tableCellClasses,
  Table,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Alert,
  Select,
  MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import AuthContext from "../stores/authContext";
import FetchContext from "../stores/fetchContext";
import AddIcon from '@mui/icons-material/Add';//add icon

const TableTemplate = ({ headers, data, title, actions }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "darkslategray",
      fontSize: 16,
      color: theme.palette.common.white,
      fontFamily: "century gothic",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: theme.palette.common.black,
      fontFamily: "Century Gothic",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const styles = {
    paperContainer: {
      backgroundColor: "white",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    title: {
      color: "black",
      fontFamily: "Century Gothic",
      padding: "30px",
    },
  };

  const { Company, web3, companyAddress, School, schoolAddress, Person, CToken } =
    useContext(AuthContext);

  const { fetchCandidates, fetchStudents, fetchCertificates, fetchCertificatesCompany, certificates } = useContext(FetchContext);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyResult, setVerifyResult] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [studentID, setStudentID] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState('');

  const deleteItem = async (id, index) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      if (title === "Final Candidate") {
        await Company.methods.removeCandicator(id, index).send({
          from: accounts[0],
          gas: 100000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createItem = async (item, candidateContract, category, major) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      console.log(item);
      console.log(candidateContract, category, major);
      if (title === "Final Candidate") {
        await Company.methods.addCandicator(candidateContract).send({
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      } else if (title === "Matriculated Students") {
        const response = await School.methods.studentAdmission(item, category, major).send({
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyItem = async (id, index) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      console.log("id: ", id)
      console.log("index: ", index)
      const response1 = await Company.methods.fetchCertificate(id, index).send({
        from: accounts[0],
        gas: 1000000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log("response1: ", response1);
      if (response1) {
        const response2 = await Company.methods
          .verifyCertificateIssuedSchool()
          .call({
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
        console.log("response2: ", response2);
        if (response2[0]) {
          console.log("schoolWalletAddress: ", response2[1])
          await CToken.methods.approve(response2[1], 1*10**18).send({
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
          const balance = await CToken.methods.allowance(accounts[0], response2[1]).call({
            from: accounts[0],
            gas: 1000000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
          console.log("transfer successs");
          console.log(balance)
          const response3 = await Company.methods
            .verifyStaffCertificateSignature()
            .call({
              from: accounts[0],
              gas: 1000000,
              gasPrice: web3.utils.toWei("50", "gwei"),
            });
          console.log("response3: ", response3);
          if (response3) {
            setVerifiedStatus(true);
          } else {
            setVerifiedStatus(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const graduateItem = async (id, studAdd, certAdd, index) => {
    try {
      console.log(id, studAdd, certAdd)
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      console.log("index; ", index)
      const response = await School.methods
        .studentGradutaion(id, studAdd, certAdd, index)
        .send({
          from: accounts[0],
          gas: 1000000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setCertificate = async (id, honor, status, description) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      const response = await School.methods
        .setStudCert(id, honor, status, description)
        .send({
          from: accounts[0],
          gas: 100000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateItem = (event) => {
    event.preventDefault();
    const item = {
      name: event.target.elements.name?.value,
      id: (Math.floor(Math.random() * 90000000) + 10000000).toString(),
      nationality: event.target.elements.nationality?.value,
      nric: event.target.elements.nric?.value,
      add: event.target.elements.add?.value,
      passport: event.target.elements.passport?.value,
    };
    createItem(
      item,
      event.target.elements.candidateContract?.value,
      event.target.elements.category?.value,
      event.target.elements.major?.value
    )
      .then(() => Promise.all([fetchCandidates(), fetchStudents()]))
      .then(() => setCreateOpen(false));
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteItem = (item, index) => {
    deleteItem(item.id, index)
      .then(() => fetchCandidates())
      .then(() => setDeleteOpen(false));
  };

  const handleVerifyOpen = (item) => {
    fetchCertificatesCompany(item.id);
    setVerifyOpen(true);
  };

  const handleVerifyClose = () => {
    setVerifyOpen(false);
  };

  const handleVerification = (event) => {
    event.preventDefault();
    // setVerifiedStatus(false);
    verifyItem(
      event.target.elements.candidateId.value,
      event.target.elements.certificateIndex.value
    );
    handleVerifyResultOpen();
  };

  const handleVerifyResultOpen = () => {
    setVerifyResult(true);
  };

  const handleVerifyResultClose = () => {
    setVerifyResult(false);
  };

  const handleGraduationOpen = (item) => {
    setStudentID(item.id);
    setAdmissionOpen(true);
  };

  const handleGraduationClose = () => {
    setAdmissionOpen(false);
  };

  const handleGraduationItem = (event, index) => {
    event.preventDefault();
    graduateItem(
      event.target.elements.studentId.value,
      event.target.elements.studentWallet.value,
      event.target.elements.certificateContract.value,
      index
    )
      .then(() => fetchStudents())
      .then(() => setAdmissionOpen(false));
  };

  const handleSetCertificate = (event) => {
    event.preventDefault();
    setCertificate(
      event.target.elements.studentId.value,
      event.target.elements.honor.value,
      event.target.elements.status.value,
      event.target.elements.description.value
    );
  };

  return (
    <Box
      sx={{
        // bgcolor: "lightgrey",
        height: "100%",
        width: "100%",
        padding: "2%",
      }}
    >
      <CssBaseline />
      <Typography variant="h4" sx={styles.title}>
        {title}
      </Typography>
      <Paper elevation={5} sx={styles.paperContainer}>
        <TableContainer sx={{ border: "1px solid lightslategray" }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* map table headers */}
                {headers &&
                  headers.map((header) => (
                    <StyledTableCell key={header} sx={{ textAlign: "center" }}>
                      <b>{header}</b>
                    </StyledTableCell>
                  ))}
                  {title != "Certificates" && (                
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    <b>Actions</b>
                  </StyledTableCell>)}     
              </TableRow>
            </TableHead>
            <TableBody>
              {/* map table data */}
              {data.map((item, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {index + 1}
                  </StyledTableCell>
                  {Object.values(item).map((value, innerIndex) => (
                    <StyledTableCell align="center" key={innerIndex}>
                      {value}
                    </StyledTableCell>
                  ))}
                  {/* testing button */}
                  {/* <Button
                    variant="outlined"
                    sx={{ backgroundColor: "darkslategray", color: "white" }}
                    onClick={() => handleFetchData()}
                  >
                    Test
                  </Button> */}
                  {/* button for verification */}
                  {actions.includes("verify") && (
                    <StyledTableCell align="center" width="20%">
                      <Button
                        variant="outlined"
                        sx={{
                          backgroundColor: "darkslategray",
                          color: "white",
                        }}
                        onClick={() => handleVerifyOpen(item)}
                      >
                        Verify
                      </Button>
                      {/* verification dialog */}
                      <Dialog
                        open={verifyOpen}
                        onClose={handleVerifyClose}
                        componentsProps={{
                          backdrop: {
                            style: {
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                            },
                          },
                        }}
                        PaperProps={{
                          component: "form",
                          onSubmit: (event) => {
                            event.preventDefault();
                            handleVerification(event);
                          },
                        }}
                      >
                        <DialogTitle>Verify Certificate</DialogTitle>
                        <DialogContent>
                          <TextField
                            defaultValue={item.id}
                            name="candidateId"
                            label="Candidate ID"
                            fullWidth
                            margin="normal"
                            color="primary"
                          />
                          <Select
                            fullWidth
                            name="certificateIndex"
                            value={selectedCertificate}
                            onChange={(event) => setSelectedCertificate(parseInt(event.target.value, 10))}
                            color="primary"
                          >
                            {certificates.map((certificate, index) => (
                              <MenuItem key={index} value={index}>
                                {certificate.schoolName}, {certificate.cate}, {certificate.major}
                              </MenuItem>
                            ))}
                          </Select>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleVerifyClose}>Cancel</Button>
                          <Button type="submit">Verify</Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={verifyResult}
                        onClose={handleVerifyResultClose}
                      >
                        {verifiedStatus ? (
                          <Alert severity="success">
                            Certificate is successfully verified.
                          </Alert>
                        ) : (
                          <Alert severity="error">
                            Certificate is not verified.
                          </Alert>
                        )}
                      </Dialog>
                    </StyledTableCell>
                  )}
                  {/* button for graduation */}
                  {actions.includes("graduate") && (
                    <StyledTableCell align="center" width="10%">
                      <Button
                        variant="outlined"
                        sx={{
                          backgroundColor: "darkslategray",
                          color: "white",
                        }}
                        onClick={() => handleGraduationOpen(item)}
                      >
                        Graduate
                      </Button>
                      {/* graduation dialog */}
                      <Dialog
                        open={admissionOpen}
                        onClose={() => {
                          handleGraduationClose();
                          setStep(0); // Reset step when dialog is closed
                        }}
                        componentsProps={{
                          backdrop: {
                            style: {
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                            },
                          },
                        }}
                        PaperProps={{
                          component: "form",
                          onSubmit: (event) => {
                            event.preventDefault();
                            if (step === 0) {
                              // Handle setting certificate
                              handleSetCertificate(event);
                              setStep(1); // Move to next step
                            } else if (step === 1) {
                              // Handle graduation
                              handleGraduationItem(event, index);
                            }
                          },
                        }}
                      >
                        {step === 0 ? (
                          <>
                            <DialogTitle>Set Certificate</DialogTitle>
                            <DialogContent>
                              <TextField
                                value={studentID}
                                name="studentId"
                                label="Student ID"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                              <TextField
                                name="honor"
                                label="Honor"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                              <TextField
                                name="status"
                                label="Status"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                              <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                            </DialogContent>
                          </>
                        ) : (
                          <>
                            <DialogTitle>Graduate Student</DialogTitle>
                            <DialogContent>
                              <TextField
                                value={studentID}
                                name="studentId"
                                label="Student ID"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                              <TextField
                                name="studentWallet"
                                label="Student Wallet"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                              <TextField
                                name="certificateContract"
                                label="Certificate Contract"
                                fullWidth
                                margin="normal"
                                color="primary"
                              />
                            </DialogContent>
                          </>
                        )}
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleGraduationClose();
                              setStep(0); // Reset step when dialog is closed
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            {step === 0 ? "Next" : "Graduate"}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </StyledTableCell>
                  )}
                  {/* buttons for delete */}
                  {actions.includes("delete") && (
                    <StyledTableCell align="center" width="10%">
                        <IconButton
                          aria-label="delete"
                          onClick={handleDeleteOpen}
                        >
                          <DeleteIcon style={{ fill: "#dd6b6b" }} />
                        </IconButton>
                      {/* delete dialog */}
                      <Dialog
                        open={deleteOpen}
                        onClose={handleDeleteClose}
                        componentsProps={{
                          backdrop: {
                            style: {
                              backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust this value to lighten or darken the backdrop
                            },
                          },
                        }}
                      >
                        <DialogTitle>
                          Are you sure you want to delete the item?
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={handleDeleteClose}>No</Button>
                          <Button onClick={() => handleDeleteItem(item, index)}>
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* button for create */}
      {actions.includes("create") && (
        <Box sx={{ textAlign: "center", paddingTop:"50px"}}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: '#1876d2', color: "white",
            width: '300px', // Adjust button width as needed
            height: '36px', // Adjust button height as needed
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: '#0d4e9b', // Make the background slightly darker on hover
            }
            }}
          
            onClick={handleCreateOpen}
          >
            Add New
          </Button>
          {/* create dialog */}
          <Dialog
            open={createOpen}
            onClose={handleCreateClose}
            componentsProps={{
              backdrop: {
                style: {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
              },
            }}
            PaperProps={{
              component: "form",
              onSubmit: (event) => {
                event.preventDefault();
                handleCreateItem(event);
              },
            }}
          >
            <DialogTitle>Create Item</DialogTitle>
            <DialogContent>
              {title === "Final Candidate" && (
                <>
                  <TextField
                    name="candidateContract"
                    label="CANDIDATE CONTRACT"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                </>
              )}
              {title === "Matriculated Students" && (
                <>
                  <TextField
                    name="name"
                    label="NAME"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="nationality"
                    label="NATIONALITY"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="nric"
                    label="NRIC"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="passport"
                    label="PASSPORT"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="add"
                    label="ADDRESS"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="category"
                    label="CATEGORY"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                  <TextField
                    name="major"
                    label="MAJOR"
                    fullWidth
                    margin="normal"
                    color="primary"
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

TableTemplate.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.array,
};

TableTemplate.defaultProps = {
  actions: [],
};

export default TableTemplate;
