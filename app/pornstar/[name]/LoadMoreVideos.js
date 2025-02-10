"use client"; // ✅ Client Component for dynamic loading

import { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ Client-side component to load more videos dynamically
export default function LoadMoreVideos({ name, initialVideos }) {
  const [videos, setVideos] = useState(initialVideos.slice(0, 0)); // ✅ Only show first 16 initially
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialVideos.length > 10); // ✅ Check if more videos exist

  // ✅ Function to load more videos
  async function loadMoreVideos() {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const res = await fetch(`${apiUrl}/pornstar/${name}?page=${nextPage}&limit=16`);
      if (!res.ok) throw new Error("Failed to load more videos");

      const newVideos = await res.json();
      if (newVideos.records.length > 0) {
        setVideos((prev) => [...prev, ...newVideos.records]); // ✅ Append next 16 videos
        setPage(nextPage);
      } else {
        setHasMore(false); // No more videos available
      }
    } catch (error) {
      console.error("Error fetching more videos:", error);
    }

    setLoading(false);
  }

  return (
    <>
      <Grid container spacing={4}>
        {videos.map((video) => (
          <Grid item key={video._id} xs={12} sm={6} md={4}>
            <Link href={`/playVideo/${video._id}`} passHref>
              <Card>
                <CardMedia component="img" image={video.imageUrl} alt={video.titel} />
                <CardContent>
                  <Typography variant="h6">{video.titel}</Typography>
                  <div className="video-meta">
                    <i className="bi bi-clock">{video.minutes} Min</i>
                    <i className="bi bi-eye-fill">{video.views}K</i>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Load More Button */}
      {hasMore && (
        <Button
          variant="contained"
          color="dark"
          onClick={loadMoreVideos}
          disabled={loading}
          sx={{ display: "block", margin: "40px auto" }}
        >
          {loading ? "Loading..." : "Load More.."}
        </Button>
      )}
    </>
  );
}
