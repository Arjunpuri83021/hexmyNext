"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import "./Navbar.css";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SearchContainer = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  backgroundColor: "white",
  padding: theme.spacing(1),
}));

const StyledInputBase = styled(InputBase)({
  flex: 1,
  fontSize: "1rem",
});

export default function PrimarySearchAppBar() {
  const [searchOpen, setSearchOpen] = React.useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
        {!searchOpen ? (
          <Toolbar>
            {/* Logo (Hidden in Mobile Search Mode) */}
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              <Link href="/1" passHref>
                <section>
                  <div className="content">
                    <h2>HexMy</h2>
                    <h2>HexMy</h2>
                  </div>
                </section>
              </Link>
            </Typography>

            {/* Search Bar (Always Visible on Desktop) */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", background:"#f2f2f2", padding:"5px", borderRadius:"10px"} }}>
              <StyledInputBase placeholder="Search..." />
            </Box>

            {/* Search Icon (Only on Mobile) */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton size="large" color="inherit" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Right Icons (Hide in Mobile Search Mode) */}
            <Box sx={{ display: { xs: "flex", md: "flex" } }}>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" edge="end" color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        ) : (
          /* Mobile Search Bar Fully Replaces Navbar */
          <SearchContainer>
            <StyledInputBase placeholder="Search..." autoFocus />
            <IconButton size="large" color="inherit" onClick={toggleSearch}>
              <CloseIcon />
            </IconButton>
          </SearchContainer>
        )}
      </AppBar>
    </Box>
  );
}
