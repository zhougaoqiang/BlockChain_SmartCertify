import MainMenu from "../../components/sidebar/MainMenu";
import { Outlet, useLocation } from "react-router-dom";
// import Profile from "../../components/Profile";
import { useState } from "react";
// import { Button } from "@mui/material";

export default function GovHome() {
  const location = useLocation();
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <MainMenu Entity={"Government"}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/Government4.png" alt="Smart Certify x Government" style={{ width: '500px', height: '110px', objectFit: 'cover' } } />
    </div>
      <Outlet />
      {/* {location.pathname === "/Government" && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
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
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "darkslategray",
              color: "white",
            }}
            onClick={() => {
              setLogin(true);
              setRegister(false);
            }}
          >
            Login
          </Button>
          {register && (
            <Profile
              fields="government"
              title="Register Govt"
              action="create"
            />
          )}
          {login && (
            <Profile
              type="government"
              fields="verify"
              title="Login"
              action="login"
            />
          )}
        </div>
      )} */}
    </MainMenu>
  );
}
