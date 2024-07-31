import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

//below all dummy pages, please update the contain accordingly
import Homepage from "./pages/homepage"; //Smart Certify WebApp home page
import GovHome from "./pages/government/GovHome"; // government home page
import GovAddAdmin from "./pages/government/GovAddAdmin";
import GovRemoveAdmin from "./pages/government/GovRemoveAdmin";
import GovRegisterSchool from "./pages/government/GovRegisterSchool";
import GovRegisterCompany from "./pages/government/GovRegisterCompany";
import GovVerifyCompany from "./pages/government/GovVerifyCompany";
import GovVerifySchool from "./pages/government/GovVerifySchool";
import GovBalance from "./pages/government/GovBalance"; 
import ComHome from "./pages/company/ComHome"; //  company home page
import ComProfile from "./pages/company/ComProfile"; //company profile page
import ComFinalCandidate from "./pages/company/ComFinalCandidate"; //company final candidate page
import ComAddAdmin from "./pages/company/ComAddAdmin";
import ComRemoveAdmin from "./pages/company/ComRemoveAdmin";
import ComBalance from "./pages/company/ComBalance";
import SchHome from "./pages/school/SchHome"; //school home page
import SchProfile from "./pages/school/SchProfile";
import SchStudents from "./pages/school/SchStudents";
import SchAddAdmin from "./pages/school/SchAddAdmin";
import SchRemoveAdmin from "./pages/school/SchRemoveAdmin";
import SchBalance from "./pages/school/SchBalance";
import PerHome from "./pages/person/PerHome"; // person home page\
import PerProfile from "./pages/person/PerProfile"; // person profile page
import PerViewCertificates from "./pages/person/PerViewCertificates"; // person view certificates page
import PerCollectCertificate from "./pages/person/PerCollectCertificate";
import PerViewers from "./pages/person/PerViewers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} index />
          <Route path="Company" element={<ComHome />}>
            <Route path="Profile" element={<ComProfile />} />
            <Route path="AddAdmin" element={<ComAddAdmin />} />
            <Route path="RemoveAdmin" element={<ComRemoveAdmin />} />
            <Route path="Finalcandidate" element={<ComFinalCandidate />} />
            <Route path="Balance" element={<ComBalance />} />
          </Route>
          <Route path="Government" element={<GovHome />}>
            <Route path="AddAdmin" element={<GovAddAdmin />} />
            <Route path="RemoveAdmin" element={<GovRemoveAdmin />} />
            <Route path="RegisterSchool" element={<GovRegisterSchool />} />
            <Route path="RegisterCompany" element={<GovRegisterCompany />} />
            <Route path="VerifyCompany" element={<GovVerifyCompany />} />
            <Route path="VerifySchool" element={<GovVerifySchool />} />
            <Route path="Balance" element={<GovBalance />} />
          </Route>
          <Route path="School" element={<SchHome />}>
            <Route path="Profile" element={<SchProfile />} />
            <Route path="AddAdmin" element={<SchAddAdmin />} />
            <Route path="RemoveAdmin" element={<SchRemoveAdmin />} />
            <Route path="Students" element={<SchStudents />} />
            <Route path="Balance" element={<SchBalance />} />
          </Route>
          <Route path="Person" element={<PerHome />}>
            <Route path="Profile" element={<PerProfile />} />
            <Route path="ViewCertificates" element={<PerViewCertificates />} />
            <Route path="CollectCertificate" element={<PerCollectCertificate />} />
            <Route path="Viewers" element={<PerViewers />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
