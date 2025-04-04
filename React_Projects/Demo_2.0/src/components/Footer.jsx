import React from "react";
import { Container, Typography, Box, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: "#f8f8f8", py: 4, mt: 4 }}>
      <Container>
        <Grid container columnSpacing={4} rowSpacing={2}>
          <Grid sx={{ flex: 1 }}>
            <Typography variant="h6">Company</Typography>
            <Link href="#" color="inherit" underline="none">About Us</Link><br />
            <Link href="#" color="inherit" underline="none">Careers</Link><br />
            <Link href="#" color="inherit" underline="none">Press</Link>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Typography variant="h6">Support</Typography>
            <Link href="#" color="inherit" underline="none">Help Center</Link><br />
            <Link href="#" color="inherit" underline="none">Terms of Service</Link><br />
            <Link href="#" color="inherit" underline="none">Privacy Policy</Link>
          </Grid>

          <Grid sx={{ flex: 1 }}>
            <Typography variant="h6">Connect</Typography>
            <Link href="#" color="inherit" underline="none">Facebook</Link><br />
            <Link href="#" color="inherit" underline="none">Twitter</Link><br />
            <Link href="#" color="inherit" underline="none">Instagram</Link>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
