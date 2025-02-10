import Navbar from "../../components/Navbar";
import Tab from "../../components/tabs/tab";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";
import PaginationComponent from "../../components/PaginationComponent"; // Adjust the path

export const generateMetadata = ({ params }) => {
  const currentPage = params.page || 1;
  return {
    title: `trisha paytas porn missax pregnant hentai tecavüz porno | Hexmy`,
    description: `tnaboard turkish subtitled porn livvy dunne nude subtitled porn subtitled porn fullporner xxxx video aunty sex gulf sex outdoor sex sexy movie super movie`,
    alternates: {
      canonical: `https://hexmy.com/toprated/${currentPage}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function IndianPage({ params }) {
  const page = Number(params.page) || 1;
  const itemsPerPage = 16;

  let data = { records: [], totalPages: 1 };

  try {
    const response = await fetch(
      `${apiUrl}/getTopRate?page=${page}&limit=${itemsPerPage}`,
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

      <Grid container spacing={3}>
        {data.records.length > 0 ? (
          data.records.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Link href={`/playVideo/${item._id}`} passHref>
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

      {/* Use the Client-Side Pagination Component */}
      <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
      <PaginationComponent totalPages={data.totalPages} currentPage={page} />
      </Grid>
    </div>
  );
}
