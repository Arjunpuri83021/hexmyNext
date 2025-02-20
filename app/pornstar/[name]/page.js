import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import LoadMoreVideos from "./LoadMoreVideos";
import "./PornstarPage.css"
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getPornstarData(name, page = 1) {
  try {
    const res = await fetch(`${apiUrl}/pornstar/${name}?page=${page}&limit=16`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching pornstar videos:", error);
    return null;
  }
}

export default async function PornstarPage({ params }) {
  const { name } = params;
  const pornstarVideos = await getPornstarData(name, 1); // Fetch first page on the server

  if (!pornstarVideos || pornstarVideos.records.length === 0) {
    return notFound(); // Show 404 if no videos found
  }

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "20px", background:"white"}}>
        <Typography sx={{ fontSize: "20px", textAlign: "center", marginBottom: "20px", color: "black" }} variant="h1" gutterBottom>
          All best time Videos of &quot;{name.replace(/-/g, " ")}&quot; | Hexmy
        </Typography>


        <Grid container spacing={4}>
          {pornstarVideos.records.map((video) => (
            <Grid item key={video._id} xs={12} sm={6} md={3}>
              <Link href={`/playVideo/${video._id}`} passHref>
                <Card>
                  <CardMedia component="img" image={video.imageUrl} alt={video.titel} />
                  <CardContent>
                    <Typography variant="h6">{video.titel}</Typography>
                    <div className="video-meta">
                      <i className="bi bi-clock">{video.minutes} Min</i>
                      <i className="bi bi-eye-fill ms-3">{video.views}K</i>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>

        <LoadMoreVideos name={name} initialVideos={pornstarVideos.records} />
      </Container>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { name } = params;
  return {
    title: `${name.replace(/-/g, " ")} hot sex videos ,goodporn,4k anal,pornhits,sex18,xxxnx`,
    description: `${name.replace(/-/g, " ")} Free huge tits Porn Videos, Free ${name.replace(
      /-/g,
      " "
    )} family sex & Enjoy cheating bhabhi porn, big natural boobs, download vporn sex videos or stream sex hub and pornhut videos.`,
    alternates: {
      canonical: `https://hexmy.com/pornstar/${name}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
