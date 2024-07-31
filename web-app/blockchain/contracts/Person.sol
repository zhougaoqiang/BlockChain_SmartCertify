//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Definition.sol";
import "./ICertificate.sol";
import "./IPerson.sol";

contract Person is IPerson
{
    Personal_Info private personalInfo;
    Certificate_Info[] certificates;
    Simplifed_Cert[] simplifedCerts;
    address owner;
    bool isPublic;

    constructor(string memory _id, string memory _na, string memory _nric, string memory _pass, string memory _name, string memory _add )
    {
        personalInfo.id = _id;personalInfo.nationality = _na;
        personalInfo.nric = _nric;
        personalInfo.passport = _pass;
        personalInfo.name = _name;
        personalInfo.add = _add;
        owner = msg.sender;
        isPublic = false;
    }

    modifier onlyOwner()
    {
        require(msg.sender == owner, "only owner can do");
        _;
    }

    function setToPublic(bool _isPublic) public onlyOwner()
    {
        isPublic = _isPublic;
    }

    // before add certificate to self. please call acceptCertificateContract first. 
    function addCertificateContract(address _add) public
    {
        ICertificate certContract = ICertificate(_add);
        Certificate_Info memory cert = certContract.getCertificate(msg.sender);
        Simplifed_Cert memory scert;
        scert.schoolName = cert.schoolInfo.name;
        scert.cate = cert.category;
        scert.hor= cert.honor;
        scert.major = cert.major;
        certificates.push(cert);
        simplifedCerts.push(scert);
    }

    function setPersonalInfo(Personal_Info memory _info) public onlyOwner()
    {
        personalInfo = _info;
    }

    function getPersonalInfo() external override view returns (Personal_Info memory) 
    {
        if (isPublic || msg.sender == owner)
        {
            return personalInfo;
        }
        else
        {
            Personal_Info memory _person;
            return _person;
        }
    }

    function getAllFullCertificates() external view returns (Certificate_Info[] memory)
    {
        if (isPublic || msg.sender == owner)
        {
            return certificates;
        }
        else
        {
            Certificate_Info[] memory _certs;
            return _certs;
        }
    }

    function getAllCertificates() external override view returns (Simplifed_Cert[] memory)
    {
        if (isPublic || msg.sender == owner)
        {
            return simplifedCerts;
        }
        else
        {
            Simplifed_Cert[] memory _certs;
            return _certs;
        }
    }

    function getCertificatesCounts() external override view returns (uint)
    {
        if (isPublic || msg.sender == owner)
        {
            return certificates.length;
        }
        else
        {
            return type(uint).max;
        }
    }

    function getCertificateByIndex(uint _index) external override view returns (Certificate_Info memory)
    {
        require(_index < certificates.length, "This certificate is not exist");
        
        if (isPublic || msg.sender == owner)
        {
            return certificates[_index];
        }
        else
        {
            Certificate_Info memory _cert;
            return _cert;
        }
    }

    function isPubliced() public view returns (bool)
    {
        return isPublic;
    }
}