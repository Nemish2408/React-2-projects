import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Container from "@mui/material/Container";
import ModalForm from "./Modal"; // Import the modal
import { LanguagesIcon } from "lucide-react";

const Navbar = () => {
  const [anchorElLogo, setAnchorElLogo] = useState(null);
  const [anchorElExplore, setAnchorElExplore] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('signin'); // Add state for modal mode

  const handleMenuOpen = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor) => {
    setAnchor(null);
  };

  const handleOpenModal = (mode) => {
    setModalMode(mode); // Set the mode based on the button clicked
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
        <Container sx={{minWidth: "100%"}}>
          <Toolbar sx={{display: "flex", justifyContent: "space-between", gap: "30px"}}>
            <Typography variant="h3" sx={{ flexGrow: 1,}}>
              Logo
            </Typography>

            {/* Logo Pro Dropdown */}
            <Button onClick={(e) => handleMenuOpen(e, setAnchorElLogo)} endIcon={<ArrowDropDownIcon />} color="secondary">
              Logo Pro
            </Button>
            <Menu anchorEl={anchorElLogo} open={Boolean(anchorElLogo)} onClose={() => handleMenuClose(setAnchorElLogo)}>
              <MenuItem onClick={() => handleMenuClose(setAnchorElLogo)}>Option 1</MenuItem>
              <MenuItem onClick={() => handleMenuClose(setAnchorElLogo)}>Option 2</MenuItem>
            </Menu>

            {/* Explore Dropdown */}
            <Button onClick={(e) => handleMenuOpen(e, setAnchorElExplore)} endIcon={<ArrowDropDownIcon />} color="secondary">
              Explore
            </Button>
            <Menu anchorEl={anchorElExplore} open={Boolean(anchorElExplore)} onClose={() => handleMenuClose(setAnchorElExplore)}>
              <MenuItem onClick={() => handleMenuClose(setAnchorElExplore)}>Category 1</MenuItem>
              <MenuItem onClick={() => handleMenuClose(setAnchorElExplore)}>Category 2</MenuItem>
            </Menu>

            {/* Language */}
            <Typography sx={{ mx: 2, display:"flex" }}> <LanguagesIcon/> English</Typography>

            {/* Become Service Provider */}
            <Button color="secondary">Become Service Provider</Button>

            {/* Sign In (Opens Modal) */}
            <Button onClick={() => handleOpenModal('signin')} color="secondary">Sign In</Button>

            {/* Join (Opens Modal with Signup Mode) */}
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => handleOpenModal('signup')}
            >
              Join
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal Component with Dynamic Mode */}
      <ModalForm 
        open={openModal} 
        handleClose={handleCloseModal} 
        mode={modalMode} // Pass the mode dynamically
      />
    </>
  );
};

export default Navbar;