import Link from "next/link";
import { Container, Typography, Card, CardMedia, CardContent, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import LoadMoreVideos from "../../components/LoadMoreVideos"; // Load More Client Component
import "./videoPage.css";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export async function generateMetadata({ params }) {
  const videoData = await fetchVideoData(params.id);
  return {
    title: videoData ? videoData.titel : "Video Not Found",
    description: videoData ? `Watch ${videoData.titel} - ${videoData.views}K views` : "Video not found.",
    alternates: {
      canonical: `https://hexmy.com/playVideo/${params.id}`,
    },
    robots: {
      index: true, // Allows indexing by search engines
      follow: true, // Ensures crawlers follow links
    },
  };
}


// Function to fetch video data
async function fetchVideoData(id) {
  try {
    const response = await fetch(`${apiUrl}/getVideo/${id}`, { method: "POST", cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch video");
    return await response.json();
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
}

// Function to fetch related videos
async function fetchRelatedVideos(title, page) {
  try {
    const response = await fetch(`${apiUrl}/relatedpostData?search=${title}&page=${page}&limit=8`, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch related videos");
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching related videos:", error);
    return [];
  }
}

export default async function VideoPage({ params }) {
  const { id } = params;
  const videoData = await fetchVideoData(id);
  if (!videoData) {
    return <Typography color="error">Failed to load video.</Typography>;
  }
  
  const relatedVideos = await fetchRelatedVideos(videoData.titel, 1);

  const formatViews = (views) => {
    const adjustedViews = Math.floor(views * 0.7);
    if (adjustedViews >= 1_000_000) return (adjustedViews / 1_000_000).toFixed(1) + "M";
    if (adjustedViews >= 1_000) return (adjustedViews / 1_000).toFixed(1) + "K";
    return adjustedViews.toString();
  };

  

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "140px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "10px", color:"black" }}>{videoData.titel}</h1>
        <Card>
          <a href={videoData.link} target="_blank" rel="noopener noreferrer" className="video-container">
            <CardMedia loading="lazy" component="img" image={videoData.imageUrl} alt={videoData.titel} className="video-thumbnail" />
            <div className="play-button">
              <svg viewBox="0 0 64 64" width="90" height="90" fill="white">
                <circle cx="32" cy="32" r="30" stroke="white" strokeWidth="4" fill="rgba(0,0,0,0.7)" />
                <polygon points="25,18 50,32 25,46" fill="white" />
              </svg>
            </div>
          </a>
          <div className="video-details">
            <i className="bi bi-hand-thumbs-up-fill">{formatViews(videoData.views)}K+</i>
            <i className="bi bi-eye-fill">{videoData.views || 0}K</i>
            <i className="bi bi-clock">{videoData.minutes} Min</i>
          </div>
          <div className="pornstars-list mt-2 mb-4 ms-2">
            {Array.isArray(videoData.name) && videoData.name.length > 0 ? (
              videoData.name.map((name, index) => (
                <Link href={`/pornstar/${name}`} key={index}>
                  <h2 style={{ marginLeft: "10px", cursor: "pointer", textDecoration: "underline", display: "inline-flex", alignItems: "center" }}>
                    <i className="bi bi-star-fill" style={{ marginRight: "5px" }}></i> {name.replace(/-/g, " ")}
                  </h2>
                </Link>
              ))
            ) : (
              <h2>PornStars: {videoData.name}</h2>
            )}
          </div>
        </Card>

        {/* Related Videos Section */}
        <Container sx={{ marginTop: "20px" }}>
          <Typography sx={{ color: "black" }} variant="h4" gutterBottom>Related Videos</Typography>
          <Grid container spacing={4}>
            {relatedVideos.map((video) => (
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
          
          {/* Load More Button - Moves to a Client Component */}
          <LoadMoreVideos initialVideos={relatedVideos} title={videoData.titel} />
        </Container>
      </Container>
    </>
  );
}
