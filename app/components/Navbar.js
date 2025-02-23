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
  Tab,
  CircularProgress
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

const SearchResultsContainer = styled(Box)({
  position: "absolute",
  top: "100%",
  left: 0,
  width: "100%",
  background: "white",
  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  zIndex: 1000,
  maxHeight: "300px",
  overflowY: "auto",
});

export default function PrimarySearchAppBar() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data.records);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchSearchResults(query);
  };

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

  const currentTab = tabs.find((tab) => pathname.startsWith(tab.path))?.path || "/1";

  const handleChange = (event, newValue) => {
    if (newValue === "/1") {
      router.push(newValue, { shallow: true });
    } else {
      router.push(`${newValue}/1`, { shallow: true });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black" }}>
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
              <StyledInputBase placeholder="Search..." onChange={handleSearchChange} value={searchQuery} />
            </Box>

            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton size="large" color="inherit" onClick={() => setSearchOpen(true)}>
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
            <StyledInputBase placeholder="Search..." autoFocus onChange={handleSearchChange} value={searchQuery} />
            <IconButton size="large" color="inherit" onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </IconButton>
          </SearchContainer>
        )}

        {searchQuery && (
          <SearchResultsContainer>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                <CircularProgress size={24} />
              </Box>
            ) : searchResults.length > 0 ? (
              searchResults.map((item) =>
                item.name.map((star, index) => (
                  <Box key={`${item._id}-${index}`} sx={{ padding: "8px 12px", borderBottom: "1px solid #ddd" }}>
                    <Link href={`/pornstar/${star}`} passHref>
                      <Typography variant="body1" sx={{ display: "block", padding: "5px 0" }}>
                        {star}
                      </Typography>
                    </Link>
                  </Box>
                ))
              )
            ) : (
              <Typography sx={{ padding: "10px" }}>No results found</Typography>
            )}
          </SearchResultsContainer>
        )}

        <Tabs value={currentTab} onChange={handleChange} textColor="secondary" indicatorColor="secondary" variant="scrollable" scrollButtons="auto" aria-label="Navigation Tabs">
          {tabs.map((tab) => (
            <Tab key={tab.path} value={tab.path} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>
    </Box>
  );
}
