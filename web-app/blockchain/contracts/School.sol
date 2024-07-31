//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Definition.sol";
import "./ICertificate.sol";
import "./ISchool.sol";
import "./CertificateHashLib.sol";
import "./openzeppelin/token/ERC20/IERC20.sol";

contract School is ISchool
{
    event hasCertificateResult(uint256);
    event graduationResult(bool, string);
    event studentIdEvent(string);
    event perstudentIdEvent(string, string);
    event saveCertificates(Certificate_Info);

    event showSchoolInfo(School_Info);

    using CertificateHashLib for * ;

    struct StudIdNamePair
    {
        string id;
        string name;
    }

    // using Hash_Lib for * ;
    School_Info public schoolInfo;
    address owner;
    mapping(address => bool) private adminList;
    mapping(string => Certificate_Info) private studsCerts;
    StudIdNamePair[] studentArray;
    mapping(string => uint256) private certSignatures; //signature generate after graduate
    address erc20;
    address[] paymentList;
    constructor(string memory _schoolId, string memory _name, string memory _phyAdd, string memory _email, address _erc20)
    {
        owner = msg.sender;
        schoolInfo.schoolContractAddress = address(this);
        schoolInfo.id = _schoolId;
        schoolInfo.name = _name;
        schoolInfo.add = _phyAdd;
        schoolInfo.email = _email;
        erc20 = _erc20;
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

    function getSchoolInfo() public view returns (School_Info memory)
    {
        return schoolInfo;
    }

    function updateSchoolInfo(School_Info memory _schInfo) public onlyAdmin()
    {
        schoolInfo = _schInfo;
    }

    function studentAdmission(Student_Info memory _stdInfo, string memory _category, string memory _major) 
            public onlyAdmin() returns (Certificate_Info memory)
    {
        string memory studentId = _stdInfo.id; //school must create a unqiure id for student first;
        emit studentIdEvent(studentId);
        Certificate_Info memory cert;
        studsCerts[studentId] = cert;
        studsCerts[studentId].schoolInfo = schoolInfo;
        studsCerts[studentId].honor = "";
        studsCerts[studentId].status = EStudyStatus.InProgress;
        studsCerts[studentId].admissionTimestamp = block.timestamp;
        studsCerts[studentId].studentDetails = _stdInfo;
        studsCerts[studentId].certificateId = 0;
        studsCerts[studentId].category = _category;
        studsCerts[studentId].major = _major;

        StudIdNamePair memory pair;
        pair.id = studentId;
        pair.name = _stdInfo.name;

        emit showSchoolInfo(schoolInfo);
        studentArray.push(pair);
        return studsCerts[studentId];
    }

    function getStudCert(string memory _studId) public onlyAdmin() view returns (Certificate_Info memory)
    {
        return studsCerts[_studId];
    }

    function setStudCert(string memory _stuId, string memory _honor, EStudyStatus _status,
                        string memory _decription) public onlyAdmin()
    {
        studsCerts[_stuId].honor = _honor;
        studsCerts[_stuId].status = _status;
        studsCerts[_stuId].description = _decription;
    }

    function getAllStudent() public onlyAdmin() view returns (StudIdNamePair[] memory)
    {
        return studentArray;
    }

    //core function: issue student certificate contract
    //para 1: student id (create by school)
    //para 2: student account
    //para 3: certifcate address, should deployed by website or manually deployed
    function studentGradutaion(string memory _studId, address _stud, address newStudentContract, uint index) public onlyAdmin() returns (bool)
    {
        emit studentIdEvent(_studId);
        if (studsCerts[_studId].status == EStudyStatus.InProgress) //must graduate
        {
            emit graduationResult(false, "not in progress student");
            return false;
        }
        //get hash
        studsCerts[_studId].graduationTimestamp =block.timestamp;
        studsCerts[_studId].signature = CertificateHashLib.hashCertificate(studsCerts[_studId]);
                
        ICertificate studContract = ICertificate(newStudentContract);
        studContract.setCertificate(msg.sender, studsCerts[_studId]);
        if (!studContract.setStudentAddress(msg.sender, _stud))
        {
            emit graduationResult(false, "set Student Address fail");
            return false;
        }
                    
        certSignatures[_studId] = studsCerts[_studId].signature;
        emit saveCertificates(studsCerts[_studId]);
        studentArray[index] = studentArray[studentArray.length - 1];
        studentArray.pop();
        return true;
    }

    function verifyGraduatedStudentCertificate(Certificate_Info memory _cert) external override returns (bool)
    {
        uint256 sig = CertificateHashLib.hashCertificate(_cert);
        emit hasCertificateResult(sig);
        return certSignatures[_cert.studentDetails.id] == sig;
    }

    function addWallet(address _add) external override
    {
        paymentList.push(_add);
    }

    // need support ERC20 here, this is better, no need check event
    // company must pay to school owner, not admin
    function directVerifyGraduatedStudentCertificate(address companyWallet, string memory _studId, uint256 _signature) external view override returns (bool)
    {
        IERC20 _erc20 = IERC20(erc20);
        require(_erc20.allowance(companyWallet, owner) >= 1*10**18, "not enough etoken");
        return certSignatures[_studId] == _signature;
    }

     // only get the school owner's balance.
    function getBanlance() public view returns (uint256)
    {
        IERC20 _erc20 = IERC20(erc20);
        return _erc20.balanceOf(owner);
    }

    function getSchoolWalletAddress() external override view returns (address)
    {
        return owner;
    }
    
    function getWallets() public onlyAdmin() view returns (address[] memory)
    {
        return paymentList;
    }

    function cleanWallets() public onlyAdmin()
    {
        address[] memory _paymentList;
        paymentList = _paymentList;
    }
}
