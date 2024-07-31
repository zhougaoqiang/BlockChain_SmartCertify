import { createContext, useState } from "react";

import Web3 from "web3";
import GovernmentArtifact from "../../blockchain/build/contracts/Government.json";
import CompanyArtifact from "../../blockchain/build/contracts/Company.json";
import PersonArtifact from "../../blockchain/build/contracts/Person.json";
import SchoolArtifact from "../../blockchain/build/contracts/School.json";
import CertificateArtifact from "../../blockchain/build/contracts/Certificate.json";
import CTokenArtifact from "../../blockchain/build/contracts/CToken.json";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState("select");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [personAddress, setPersonAddress] = useState("");

  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");

  // Smart Contract Addresses
  const governmentAddress = GovernmentArtifact.networks[1688].address;
  const governmentAbi = GovernmentArtifact.abi;
  const Government = new web3.eth.Contract(governmentAbi, governmentAddress);

  // const schoolAddress = SchoolArtifact.networks[1688].address;
  const schoolAbi = SchoolArtifact.abi;
  const School = new web3.eth.Contract(schoolAbi, schoolAddress);

  // const companyAddress = CompanyArtifact.networks[1688].address;
  const companyAbi = CompanyArtifact.abi;
  const Company = new web3.eth.Contract(companyAbi, companyAddress);

  // const personAddress = PersonArtifact.networks[1688].address;
  const personAbi = PersonArtifact.abi;
  const Person = new web3.eth.Contract(personAbi, personAddress);

  const certificateAddress = CertificateArtifact.networks[1688].address;
  const certificateAbi = CertificateArtifact.abi;
  const Certificate = new web3.eth.Contract(certificateAbi, certificateAddress);

  const cTokenAddress = CTokenArtifact.networks[1688].address;
  const cTokenAbi = CTokenArtifact.abi;
  const CToken = new web3.eth.Contract(cTokenAbi, cTokenAddress);

  const context = {
    selectedButton,
    setSelectedButton,
    web3,
    Government,
    governmentAddress,
    School,
    schoolAddress,
    setSchoolAddress,
    Company,
    companyAddress,
    setCompanyAddress,
    Person,
    personAddress,
    setPersonAddress,
    Certificate,
    CToken
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
