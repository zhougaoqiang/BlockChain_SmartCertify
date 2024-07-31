import { useState, useEffect, useContext } from "react";
import { TextField, Button, Container, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AuthContext from "../stores/authContext";

function ProfilePerson({ type, fields, title, action }) {
  const { Government, web3, governmentAddress, School, schoolAddress, setSchoolAddress, Company, companyAddress, setCompanyAddress, Person, personAddress, setPersonAddress} = useContext(AuthContext);

  const styles = {
    title: {
      color: "black",
      fontFamily: "Century Gothic",
      padding: "30px",
    },
  };

  const fieldsByProfiles = {
    government: {"ID":"", "Name":"", "Email":"", "Address":"", "Government Description":""},
    company: {"ID":"", "UEN":"", "Name":"", "Address":"", "Company Description":""},
    school: {"ID":"", "Name":"", "Email":"", "Address":"", "School Description":""},
    person: {"ID":"", "Name":"", "Nationality":"", "NRIC":"", "Passport":"", "Address":""},
    admin: {"Address":""},
    register: {"Address":""},
    verify: {"Address":""},
  };

  const choosenProfile = fieldsByProfiles[fields] || [];

  // const initialFormData = choosenProfile.reduce(
  //   (acc, field) => ({
  //     ...acc,
  //     [field]: { value: "", isValid: true, errorMessage: "" },
  //   }),
  //   {}
  // );



  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(choosenProfile);
  const [isEditable, setIsEditable] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Update");


  const getProfileValue = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (fields == "company") {
      const response = await Company.methods.getCompanyInfo().call({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      setFormData(response);
      // Object.keys(formData).forEach(key => {
      //   formData[key] = response[key];
      // });
      console.log("the updated formData is " + formData);

    } else if (fields == "school") {
      const response = await School.methods.getSchoolInfo().call({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      setFormData(response);
      // Object.keys(formData).forEach(key => {
      //   formData[key] = response[key];
      // });
      console.log(response)
      console.log("the updated formData is " + formData)

    } else if (fields == "person") {
      const response = await Person.methods.getPersonalInfo().call({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      setFormData(response);
      // Object.keys(formData).forEach(key => {
      //   formData[key] = response[key];
      // });
      console.log("the updated formData is " + formData)
    }
    
  }

  useEffect(() => {
    getProfileValue();
  },[])
  



  // const isValidInput = (value) => value.trim().length >= 2;

  const toggleEdit = () => {
    if (isEditable) {
      handleSubmit();
    } else {
      setIsEditable(true);
      setButtonLabel("Submit");
    }
  };

  const toggleCancel = () => {
    setIsEditable(false);
    setButtonLabel("Update");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: { ...prevFormData[name],
        //  isValid: true 
        },
    }));
    setFormData(choosenProfile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const isValid = isValidInput(value); // Ensure this is called correctly
    // const errorMessage = isValid ? "" : "Input must be at least 2 characters";

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:value,
        // isValid: isValid,
        // errorMessage: errorMessage,
      
    }));
  };

  const handleSubmit = async(e) => {
    // e.preventDefault();

    // let isFormValid = true;
    // const updatedFormData = Object.keys(formData).reduce((acc, field) => {
    //   const isValid = isValidInput(formData[field].value);
    //   if (!isValid) isFormValid = false;
    //   acc[field] = {
    //     ...formData[field],
    //     isValid: isValid,
    //     errorMessage: isValid
    //       ? ""
    //       : `${field.charAt(0).toUpperCase() + field.slice(1)} must be filled.`,
    //   };
    //   return acc;
    // }, {});

    // setFormData(updatedFormData);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

    // if (isFormValid) {
      console.log("Form data:", formData);
      setIsEditable(false);
      setButtonLabel("Update");
      if (fields == "company") {
        await Company.methods.setCompanyInfo(formData).send(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei('50', 'gwei')
          }
          );
      } else if (fields == "school") {
        await School.methods.updateSchoolInfo(formData).send(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei('50', 'gwei')
          }
          );
      } else if (fields == "person") {
        await Person.methods.setPersonalInfo(formData).send(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei('50', 'gwei')
          }
          );
      }
    // } else {
    //   console.log("Validation failed");
    //   // Optionally, handle the case where some fields are invalid
    // }
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalOpen(false);
  };

  const handleRegister = async(e) => {

    try{
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			console.log("Accounts:", accounts);
      console.log("Register:", formData["Address"].value);
      console.log("deployed address =>", governmentAddress);
      if (title === "Register Company"){
        await Government.methods.registerCompany(formData["Address"].value).send(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei("50", "gwei"),
          });
      } else if (title === "Register School") {
        await Government.methods.registerSchool(formData["Address"].value).send(
          {
            from: accounts[0],
            gas: 100000,
            gasPrice: web3.utils.toWei('50', 'gwei')
          }
          );
      } else if (title === "Add Admin") {
        await Government.methods.addAdmin(formData["Address"].value).send({
          from: accounts[0],
          gas: 100000,
          gasPrice: web3.utils.toWei("50", "gwei"),
        });
      }
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await Government.methods.removeAdmin(formData["Address"].value).send({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="sm">
      {title && (
        <Typography variant="h4" sx={styles.title}>
          {title}
        </Typography>
      )}
      {action === "update" && (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={4}>
            {Object.entries(formData).slice(-6).map(([key]) => (
              <TextField
                key={key}
                label={key}
                // variant="filled"
                variant={isEditable ? "outlined" : "filled"}
                name={key}
                disabled={!isEditable}
                value={formData[key]}
                onChange={handleChange}
                // error={!formData[key].isValid}
                // helperText={formData[key].errorMessage}
                // error={!formData[key].isValid}
                // helperText={formData[key].errorMessage}
              />
            ))}
            <Button onClick={toggleEdit} variant="contained" color="primary">
              {buttonLabel}
            </Button>

            {isEditable && (
              <Button
                onClick={toggleCancel}
                variant="contained"
                color="warning"
              >
                Cancel
              </Button>
            )}
          </Box>
        </form>
      )}
      {action === "register" && (
        <form onSubmit={handleRegister}>
          <Box display="flex" flexDirection="column" gap={4}>
          {Object.entries(formData).map(([key]) => (
              <TextField
                key={key}
                label={key}
                variant="outlined"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            ))}
            <Button
              onClick={handleRegister}
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Box>
        </form>
      )}
      {action === "delete" && (
        <form onSubmit={handleDelete}>
          <Box display="flex" flexDirection="column" gap={4}>
          {Object.entries(formData).map(([key]) => (
              <TextField
                key={key}
                label={key}
                // variant="filled"
                variant={isEditable ? "outlined" : "filled"}
                name={key}
                // disabled={!isEditable}
                value={formData[key]}
                onChange={handleChange}
                // error={!formData[key].isValid}
                // helperText={formData[key].errorMessage}
                // error={!formData[key].isValid}
                // helperText={formData[key].errorMessage}
              />
            ))}
            <Button onClick={handleDelete} variant="contained" color="primary">
              Remove
            </Button>
          </Box>
        </form>
      )}
      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Successful!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProfilePerson;