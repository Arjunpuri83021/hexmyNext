import Navbar from "../components/Navbar";
import Tab from "../components/tabs/tab";
import PaginationComponent from "../components/PaginationComponent";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";
import "../page.css";


export const generateMetadata = ({ params }) => {
    const currentPage = params.page || 1;
  
    return {
      title: `new xvids xxbrits altyaazili porno alt yazili porno | Hexmy`,  
      description: `Influencersgonewild xvide xvids xvideo xvodeos sex izle hentairead jessenia rebecca porn megbanksxo pornp phim sex vietsub mckenzie valdez leaked | hexmy`, 
      alternates: {
        canonical: `https://hexmy.com/${currentPage}`,
      },
      robots: {
        index: true, // Allows indexing by search engines
        follow: true, // Ensures crawlers follow links
      },
    };
  };
  


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function Home({ params }) {
  const page = Number(params.page) || 1;
  const itemsPerPage = 16;

  let data = { records: [], totalPages: 1 };

  try {
    const response = await fetch(
      `${apiUrl}/getpostdata?page=${page}&limit=${itemsPerPage}`,
      { mode: "cors", cache: "no-store" }
    );
    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div>
      <Navbar />
      <Tab />

      
      <Grid spacing={3}>
        {data.records.length > 0 ? (
          data.records.map((item,index) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Link href={`/playVideo1/${item._id}`} passHref>
                <Card>
                  <CardMedia loading="lazy" component="img" height="250" image={item.imageUrl} alt={item.titel} />
                  <CardContent>
                  {index === 0 ? (
                      <Typography variant="h1" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        {item.metatitel || item.titel}
                      </Typography>
                    ) : (
                      <Typography variant="h2" sx={{ fontSize: "13px" }}>
                        {item.metatitel || item.titel}
                      </Typography>
                    )}
                    <Typography sx={{ marginTop: "10px" }} variant="body2" color="text.secondary">
                      <i className="bi bi-clock"></i> {item.minutes} Min &nbsp;
                      <i className="bi bi-eye-fill"></i> {item.views || 0}K
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography>No data available</Typography>
        )}
      </Grid>

      <PaginationComponent totalPages={data.totalPages} currentPage={page} />
    </div>
  );
}
