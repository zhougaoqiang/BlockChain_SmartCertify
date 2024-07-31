import MainMenu from "../../components/sidebar/MainMenu";
import { Outlet, useLocation } from "react-router-dom";
import Login from "../../components/Login";
import { useState } from "react";
import { Button } from "@mui/material";

export default function PerHome() {
  const location = useLocation();
  // const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <MainMenu Entity={"Person"}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/Individual4.png" alt="Smart Certify x Individual" style={{ width: '500px', height: '110px', objectFit: 'cover' } } />
    </div>
      <Outlet />
      {location.pathname === "/Person" && (
        <>
          {/* <Button
            variant="outlined"
            sx={{
              backgroundColor: "darkslategray",
              color: "white",
              marginRight: "10px",
            }}
            onClick={() => {
              console.log("Logged in as:", localStorage.getItem("govAddress"));
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
            <Profile fields="person" title="Register Person" action="create" />
          )} */}
          <Login type="person" />
        </>
      )}
    </MainMenu>
  );
}
