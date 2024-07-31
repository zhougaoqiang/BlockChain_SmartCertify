//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Definition.sol";
import "./IGovernment.sol";
import "./ISchool.sol";
import "./IPerson.sol";
import "./CertificateHashLib.sol";
import "./openzeppelin/token/ERC20/IERC20.sol";

contract Company
{
    using CertificateHashLib for * ;
    event VerificationResult(bool result);
    event hasCertificate(uint256);
    event saveEvent(string, address);
    address owner;
    mapping(address => bool) private adminList;

    Personal_Info[] private candidateInfoList;
    mapping(string => address) private candidateAddresses;
    Company_Info public companyInfo;
    address governmentAddress;
    Certificate_Info public tmpCertifcate;
    IERC20 erc20;

    constructor(address _gov, string memory _uenNo, 
        string memory _name, string memory _profile, string memory _add, address _etk)
    {
        governmentAddress = _gov;
        owner = msg.sender;
        companyInfo.uenNo = _uenNo;
        companyInfo.name = _name;
        companyInfo.profile = _profile;
        companyInfo.add = _add;
        // companyInfo.id = uint256(keccak256(abi.encodePacked(_uenNo, _name, _profile, _add)));
        erc20 = IERC20(_etk);
    }

    modifier onlyOwner()
    {
        require(msg.sender == owner, "only owner allowed");
        _;
    }

    modifier onlyAdmin()
    {
        require(owner == msg.sender || adminList[msg.sender] == true, "only goverment admin is allowed");
        _;
    }

    function addAdmin(address _add) public onlyOwner()
    {
        adminList[_add] = true;
    }

    function removeAdmin(address _add) public onlyOwner()
    {
        adminList[_add] = false;
    }

    function setCompanyInfo(Company_Info memory _info) public onlyAdmin()
    {
        companyInfo = _info;
    }

    function getCompanyInfo() public returns (Company_Info memory)
    {
        return companyInfo;
    }

    function addCandicator(address _candicator) onlyAdmin() public
    {
        IPerson per = IPerson(_candicator);
        candidateInfoList.push(per.getPersonalInfo());
        candidateAddresses[per.getPersonalInfo().id] = _candicator;
    }

    function removeCandicator(string memory _id, uint index) public onlyAdmin() returns (bool)
    {
        if (index < candidateInfoList.length)
        {
            delete candidateAddresses[_id];
            candidateInfoList[index] = candidateInfoList[candidateInfoList.length - 1];
            candidateInfoList.pop();
            return true;
        }
        return false;
    }

    function getAllCandidates() public view returns (Personal_Info[] memory)
    {
        return candidateInfoList;
    }

    // id in personal infor;
    function getCandidateCertifcates(string memory _id) public view returns (Simplifed_Cert[] memory)
    {
        IPerson per = IPerson(candidateAddresses[_id]);
        Simplifed_Cert[] memory certs = per.getAllCertificates();
        return certs;
    }

 //step 1
    function fetchCertificate(string memory _id, uint _index) public onlyAdmin() returns (bool)
    {
        IPerson per = IPerson(candidateAddresses[_id]);
        tmpCertifcate = per.getCertificateByIndex(_index);
        ISchool schoolContract = ISchool(tmpCertifcate.schoolInfo.schoolContractAddress);
        schoolContract.addWallet(msg.sender);
        return true;
    }

    //step 2
    function verifyCertificateIssuedSchool() public onlyAdmin() view returns (bool, address)
    {
        address _add = tmpCertifcate.schoolInfo.schoolContractAddress;
        // emit saveEvent("verifyCertificateIssuedSchool", _add);
        // emit saveEvent("government address", address(governmentAddress));
        IGovernment govContract = IGovernment(governmentAddress);
        bool rtn = govContract.isRegisterSchool(_add);
        ISchool _sch = ISchool(_add);
        address _wallet = _sch.getSchoolWalletAddress();
        return (rtn, _wallet);
        // return true;
    }

    //step 3 ///better, should use this
    function verifyStaffCertificateSignature() public onlyAdmin() view returns (bool)
    {
        uint256 hc = CertificateHashLib.hashCertificate(tmpCertifcate);
        ISchool schoolContract = ISchool(tmpCertifcate.schoolInfo.schoolContractAddress);
        bool result = schoolContract.directVerifyGraduatedStudentCertificate(msg.sender, tmpCertifcate.studentDetails.id, hc);
        return result;
    }


    //any admin or owner can check balance, however, only the owner can receive register company rewards.
    function getBanlance() public view returns (uint256)
    {
        return erc20.balanceOf(msg.sender);
    }
}