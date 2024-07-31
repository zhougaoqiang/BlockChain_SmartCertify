//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Definition.sol";

interface ISchool
{
    // function getVerifyFee(address _verify) external view returns (uint);
    function verifyGraduatedStudentCertificate(Certificate_Info memory _cert) external returns (bool);
    function directVerifyGraduatedStudentCertificate(address companyWallet, string memory _studId, uint256 _signature) external view returns (bool);
    function addWallet(address _add) external;
    function getSchoolWalletAddress() external view returns (address);
    // function verifyGraduateStudentTranscript(Transcript_Info memory  _trans) external returns (bool);
}
