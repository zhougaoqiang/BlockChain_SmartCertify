//import TableTemplate from "../../components/TableTemplate";
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AuthContext from "../../stores/authContext";
import { useContext, useEffect } from 'react';


export default function PerViewers() {
  const { Person, personAddress, web3 } = useContext(AuthContext);
  const [publicView, setPublicView] = React.useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current status from the smart contract
        const isPublic = await Person.methods.isPubliced().call();
        setPublicView(isPublic);
        console.log("is public view enabled?:", isPublic)
      } catch (error) {
        console.error('Error fetching public status:', error);
      }
    };

    if (Person && personAddress && web3) {
      fetchData();
    }
  }, [Person, personAddress, web3]);

  const handlePublic = async (event) => {
    const isChecked = event.target.checked;
    try {
      console.log("Person contract address:", personAddress);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await Person.methods.setToPublic(isChecked).send({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei('50', 'gwei')
      });
      setPublicView(isChecked);
    } catch (error) {
      console.error('Error calling setToPublic:', error);
      // Reset the switch to its previous state on error
      setPublicView(!isChecked);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={publicView} onChange={handlePublic} />}
        label="Public"
      />
    </FormGroup>
  );
}


// const PerViewers = () => {
//   const title = "Viewers";
//   const headers = ["No.", "ID No.", "Name"];
//   const adminDetails = [
//     {
//       id: 123,
//       name: "James",
//     },
//     {
//       id: 124,
//       name: "John",
//     },
//     {
//       id: 125,
//       name: "Jane",
//     },
//   ];
//   const actions = ["create", "delete"]

//   return (
//     <TableTemplate
//       headers={headers}
//       data={adminDetails}
//       title={title}
//       actions={actions}
//     />
//   );
// };

// export default PerViewers;
