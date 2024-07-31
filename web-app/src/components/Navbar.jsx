import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const styles = {
    link: {
      color: "maroon",
      fontFamily: "Century Gothic",
      paddingRight: 20,
      fontSize: 20,
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: 5,
      backgroundColor: "lightgray",
    },
    title: {
      align: "left",
      color: "black",
      fontFamily: "century",
      paddingInline: 20,
      fontWeight: "bold",
    },
  };

  const [entity, setEntity] = useState();

  return (
    <div>
      <div style={styles.navbar}>
        <h3 style={styles.title}>SMARTCERTIFY</h3>
        <nav>
          <Box
            // display="flex"
            // justifyContent="end"
            alignItems="center"
            // sx={{ paddingInline: 5, backgroundColor: "lightgray" }}
          >
            <Link to="/" style={styles.link}>
              Home
            </Link>
            <FormControl fullWidth>
              <InputLabel id="entity">Select</InputLabel>
              <Select
                labelId="entity"
                id="entity"
                value={entity}
                label="entity"
                onChange={(e) => setEntity(e.target.value)}
              >
                <MenuItem>
                  <Link to="/admin">
                    Admin
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/certificates">
                    Certificates
                  </Link>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
