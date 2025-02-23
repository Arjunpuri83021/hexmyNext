"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button, Grid, Card, CardMedia, CardContent, Typography, Box, CircularProgress } from "@mui/material";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoadMoreVideos({ title }) {
  const [videos, setVideos] = useState([]); // Stores videos
  const [page, setPage] = useState(1); // Tracks the current page
  const [loading, setLoading] = useState(false); // Controls loading state
  const [hasMore, setHasMore] = useState(true); // Controls 'Load More' visibility

  const fetchRelatedVideos = useCallback(async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/relatedpostData?search=${title}&page=${page}&limit=16`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch related videos");
      
      const data = await response.json();
      if (data.records.length === 0) {
        setHasMore(false); // No more videos available
      } else {
        setVideos((prev) => [...prev, ...data.records]); // Append new 16 videos
        setPage((prevPage) => prevPage + 1); // Increment page
      }
    } catch (error) {
      console.error("Error fetching related videos:", error);
    } finally {
      setLoading(false);
    }
  }, [title, page, loading]);

  useEffect(() => {
    fetchRelatedVideos(); // Load first 16 videos on mount
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
      <Grid container spacing={4}>
        {videos.map((video) => ( // Show only fetched videos
          <Grid item key={video._id} xs={12} sm={6} md={4}>
            <Link href={`/playVideo/${video._id}`} passHref>
              <Card>
                <CardMedia loading="lazy" component="img" image={video.imageUrl} alt={video.titel} className="related-video-thumbnail" />
                <CardContent>
                  <Typography variant="h6">{video.titel}</Typography>
                  <div className="video-meta">
                    <i className="bi bi-clock">{video.minutes} Min</i>
                    <i style={{ paddingLeft: "10px" }} className="bi bi-eye-fill">{video.views}K</i>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {hasMore && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="dark"
            onClick={fetchRelatedVideos} // Fetch next 16 videos
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </>
  );
}
