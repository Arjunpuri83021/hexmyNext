"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, Tabs, Tab } from "@mui/material";

export default function TabsSlider() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "Videos", path: "/1" },
    { label: "Indian", path: "/indian/1" },
    { label: "Stars", path: "/stars/1" },

    { label: "Hijabi", path: "/hijabi/1" },
    { label: "Movies", path: "/movies/1" },
    { label: "New Videos", path: "/newVideos/1" },
    { label: "Popular Videos", path: "/popularVideos/1" },
    { label: "Top rated", path: "/toprated/1" },
    
  ];

  const currentTab = tabs.find((tab) => pathname === tab.path)?.path || "/";

  const handleChange = (event, newValue) => {
    router.push(newValue, { shallow: true }); // Enables fast navigation
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Fashion Tabs"
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} value={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
