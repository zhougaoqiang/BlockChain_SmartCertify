import { Button } from "@mui/material";
import MainMenu from "../../components/sidebar/MainMenu";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../../components/Login";
import { useState } from "react";

export default function ComHome() {
  const location = useLocation();
  // const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <MainMenu Entity={"Company"}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/Organisation4.png" alt="Smart Certify x Organisation" style={{ width: '500px', height: '110px', objectFit: 'cover' } } />
    </div>
      <Outlet />
      {location.pathname === "/Company" && (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Button
            variant="outlined"
            sx={{
              backgroundColor: "darkslategray",
              color: "white",
              marginRight: "10px",
            }}
            onClick={() => {
              setRegister(true);
              setLogin(false);
            }}
          >
            Register
          </Button> */}
          {/* <Button
            variant="outlined"
            sx={{
              backgroundColor: "darkslategray",
              color: "white",
            }}
            onClick={() => {
              setLogin(true);
              // setRegister(false);
            }}
          >
            Login
          </Button> */}
          {/* {register && (
            <Profile
              fields="company"
              title="Register Company"
              action="create"
            />
          )} */}
          <Login type="company" />
          </div>
      )}
    </MainMenu>
  );
}
