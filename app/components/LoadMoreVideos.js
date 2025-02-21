"use client";

import { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";




export default function LoadMoreVideos() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function loadMoreVideos() {
    setLoading(true); 

   
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    router.push("/1");
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
