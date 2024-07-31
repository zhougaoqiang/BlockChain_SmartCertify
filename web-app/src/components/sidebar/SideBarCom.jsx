import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from 'react-router-dom';

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; //admin icon
import ContactPageIcon from '@mui/icons-material/ContactPage'; //profile icon
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; //final candidate icon
import HomeIcon from '@mui/icons-material/Home'; //home icon
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined'; //1
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined'; //2
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'; //balance icon
//import { NavLink } from "react-router-dom";

export default function SideBarCom() {
  const [openA, setOpenA] = React.useState(false);

  const handleClickA = () => {
    setOpenA(!openA);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      <ListItemButton component={Link} to="/Company" >
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/Company/Profile" >
        <ListItemIcon>
          <ContactPageIcon/>
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton onClick={handleClickA}>
        <ListItemIcon>
          <SupervisorAccountIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {openA ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openA} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/Company/Addadmin"
          >
            <ListItemIcon>
              <LooksOneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Admin" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/Company/Removeadmin"
          >
            <ListItemIcon>
              <LooksTwoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Admin" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton component={Link} to="/Company/Finalcandidate"> 
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="Final Candidate" />
      </ListItemButton>

      <ListItemButton component={Link} to="/Company/Balance">
        <ListItemIcon>
          <CurrencyBitcoinIcon />
        </ListItemIcon>
        <ListItemText primary="Balance" />
      </ListItemButton>
    </List>
  );
}
