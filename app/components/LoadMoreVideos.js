"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Grid, Card, CardMedia, CardContent, Typography, Box, CircularProgress } from "@mui/material";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoadMoreVideos({ title }) {
  const [videos, setVideos] = useState([]);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const fetchRelatedVideos = useCallback(async (pageNumber = 1) => {
    try {
      const response = await fetch(`${apiUrl}/relatedpostData?search=${title}&page=${pageNumber}&limit=16`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch related videos");
      const data = await response.json();
      setVideos((prev) => [...prev, ...data.records]);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  }, [title]);

  useEffect(() => {
    fetchRelatedVideos();
  }, [fetchRelatedVideos]);

  function handleLoadMore() {
    setRedirecting(true);
    setTimeout(() => {
      router.push("/1");
    }, 1500);
  }

  return (
    <>
      <Grid container spacing={4}>
        {videos.map((video) => (
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

      {/* Centered Button */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="dark"
          onClick={handleLoadMore}
          disabled={redirecting}
          startIcon={redirecting && <CircularProgress size={20} color="inherit" />}
        >
          {redirecting ? "Please Wait..." : "Load More"}
        </Button>
      </Box>
    </>
  );
}
