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
  Tabs,
  Tab
} from "@mui/material";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  const [showNavbar, setShowNavbar] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { label: "Videos", path: "/1" },
    { label: "Indian", path: "/indian" },
    { label: "Stars", path: "/stars" },
    { label: "Hijabi", path: "/hijabi" },
    { label: "Movies", path: "/movies" },
    { label: "New Videos", path: "/newVideos" },
    { label: "Popular Videos", path: "/popularVideos" },
    { label: "Top rated", path: "/toprated" },
  ];

  // Ensure active tab stays highlighted with pagination
  const currentTab =
    tabs.find((tab) => pathname.startsWith(tab.path))?.path || "/1";

    const handleChange = (event, newValue) => {
      // If the selected tab is "/1" (Videos tab), push without appending "/1"
      if (newValue === "/1") {
        router.push(newValue, { shallow: true });
      } else {
        router.push(`${newValue}/1`, { shallow: true });
      }
    };
    

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "black",
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {!searchOpen ? (
          <Toolbar>
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

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, background: "#f2f2f2", padding: "5px", borderRadius: "10px" }}>
              <StyledInputBase placeholder="Search..." />
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton size="large" color="inherit" onClick={toggleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>

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
          <SearchContainer>
            <StyledInputBase placeholder="Search..." autoFocus />
            <IconButton size="large" color="inherit" onClick={toggleSearch}>
              <CloseIcon />
            </IconButton>
          </SearchContainer>
        )}

        {/* Tabs Navigation */}
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Navigation Tabs"
        >
          {tabs.map((tab) => (
            <Tab key={tab.path} value={tab.path} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
}
