import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; //home icon

import ContactPageIcon from '@mui/icons-material/ContactPage'; //profile icon
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'; //certificate icon
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; //viewer icon
import LooksOneOutlinedIcon from '@mui/icons-material/LooksOneOutlined'; //1
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';//2
//import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined'; //3

export default function SideBarPer() {
  const [openA, setOpenA] = React.useState(false);

  const handleClickA = () => {
    setOpenA(!openA);
  };

  const [openB, setOpenB] = React.useState(false);

  const handleClickB = () => {
    setOpenB(!openB);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      <ListItemButton component={Link} to="/Person" >
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/Person/Profile">
        <ListItemIcon>
          <ContactPageIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>

      <ListItemButton onClick={handleClickA}>
        <ListItemIcon>
          <WorkspacePremiumIcon />
        </ListItemIcon>
        <ListItemText primary="Certificates" />
        {openA ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openA} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/Person/ViewCertificates" >
            <ListItemIcon>
              <LooksOneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View All" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component={Link} to="/Person/CollectCertificate">
            <ListItemIcon>
              <LooksTwoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Collect New" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton component={Link} to="/Person/Viewers">
        <ListItemIcon>
          <RemoveRedEyeIcon />
        </ListItemIcon>
        <ListItemText primary="Viewer" />
      </ListItemButton>

    </List>
  );
}
