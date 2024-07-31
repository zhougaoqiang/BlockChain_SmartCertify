import { createContext, useState, useContext } from "react";
import AuthContext from "./authContext";

const FetchContext = createContext({});

export const FetchContextProvider = ({ children }) => {
  const { web3, School, Company, Person } = useContext(AuthContext);
  const [students, setStudents] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [candidates, setCandidates] = useState([
    {
      id: "",
      nationality: "",
      nric: "",
      passport: "",
      name: "",
      address: ""
    },
  ]);
  const [certificates, setCertificates] = useState([]);

  const fetchStudents = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let data = await School.methods.getAllStudent().call({
        from: accounts[0],
        gas: 1000000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log(data);
      if (data) {
        data = data.map(item => {
          const keys = Object.keys(item);
          const lastTwoKeys = keys.slice(-1);
          const newItem = {};
          if (item.id) {
            newItem.id = item.id;
          }
          lastTwoKeys.forEach(key => {
            newItem[key] = item[key];
          });
          return newItem;
        });
        setStudents(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      let data = await Company.methods.getAllCandidates().call({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log(data);
      if (data) {
        data = data.map(item => {
          const keys = Object.keys(item);
          const lastTwoKeys = keys.slice(-6);
          const newItem = {};
          if (item.id) {
            newItem.id = item.id;
          }
          lastTwoKeys.forEach(key => {
            newItem[key] = item[key];
          });
          return newItem;
        });
        setCandidates(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      let data = await Person.methods.getAllCertificates().call({
        from: accounts[0],
        gas: 100000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log(data);
      if (data) {
        data = data.map(item => {
          const keys = Object.keys(item);
          const lastTwoKeys = keys.slice(-4);
          const newItem = {};
          if (item.id) {
            newItem.id = item.id;
          }
          lastTwoKeys.forEach(key => {
            newItem[key] = item[key];
          });
          return newItem;
        });
        setCertificates(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCertificatesCompany = async (id) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      let data = await Company.methods.getCandidateCertifcates(id).call({
        from: accounts[0],
        gas: 1000000,
        gasPrice: web3.utils.toWei("50", "gwei"),
      });
      console.log(data);
      if (data && data.length > 0) {
        setCertificates(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const context = {
    fetchStudents,
    fetchCandidates,
    fetchCertificates,
    fetchCertificatesCompany,
    students,
    candidates,
    certificates,
    setStudents,
    setCandidates,
    setCertificates
  };

  return (
    <FetchContext.Provider value={context}>{children}</FetchContext.Provider>
  );
};

export default FetchContext;
