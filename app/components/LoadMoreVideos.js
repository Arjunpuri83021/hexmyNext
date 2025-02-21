"use client";

import { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch more related videos
async function fetchRelatedVideos(title, page) {
  try {
    const response = await fetch(`${apiUrl}/relatedpostData?search=${title}&page=${page}&limit=16`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch related videos");
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
}

// ✅ Client Component for Load More Feature
export default function LoadMoreVideos({ initialVideos, title }) {
  const [relatedVideos, setRelatedVideos] = useState(initialVideos);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Use Next.js router for redirection

  // Function to load more videos
  async function loadMoreVideos() {
    setLoading(true); // Show loader

    // Simulating an API call delay (optional)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false); // Hide loader
    router.push("/1"); // Redirect to the new page
  }

  return (
    <>
      <Grid container spacing={4}>
        {relatedVideos.map((video) => (
          <Grid item key={video._id} xs={12} sm={6} md={4}>
            <Link href={`/playVideo/${video._id}`} passHref>
              <Card>
                <CardMedia loading="lazy" component="img" image={video.imageUrl} alt={video.titel} className="related-video-thumbnail" />
                <CardContent>
                  <Typography variant="h6">{video.titel}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Centered Load More Button with Loading Spinner */}
      <Box display="flex" justifyContent="center" marginTop="40px">
        <Button
          variant="contained"
          color="dark"
          onClick={loadMoreVideos}
          disabled={loading}
          
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Load More.."}
        </Button>
      </Box>
    </>
  );
}
