"use client";

import { Pagination, Stack } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function PaginationComponent({ totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current route dynamically

  // Detect correct base path (e.g., "/indian", "/hijabi", "/")
  const basePath = pathname.startsWith("/indian")
    ? "/indian"
    : pathname.startsWith("/hijabi")
    ? "/hijabi"
    :pathname.startsWith("/movies")
    ? "/movies" 
    : pathname.startsWith("/newVideos")
    ? "/newVideos" 
    : pathname.startsWith("/popularVideos")
    ? "/popularVideos" 
    : pathname.startsWith("/toprated")
    ? "/toprated" 
    : ""; // Default to home page

  const handleChange = (event, value) => {
    router.push(`${basePath}/${value}`); // Ensures "/indian/2" or "/hijabi/2" instead of "/2"
  };

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
