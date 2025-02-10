import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Tab from "../../components/tabs/tab"
import { notFound } from "next/navigation";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const itemsPerPage = 16;

export async function generateMetadata({ params }) {
  return {
    title: `Best Pornstars On | Hexmy`,
    description: `Explore the best pornstars on Hexmy. Watch all pornstar videos on Hexmy.`,
    alternates: {
      canonical: `https://hexmy.com/stars/${params.page}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function fetchStars(page) {
  try {
    const res = await fetch(`${apiUrl}/getpostdata?page=${page}&limit=${itemsPerPage}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    
    // Handle case where no stars are found (invalid page)
    if (!data.records || data.records.length === 0) {
      return notFound(); // Show 404 if page is invalid
    }

    const uniqueNames = [...new Set(data.records.map((record) => record.name).flat())];

    return { stars: uniqueNames, totalPages: data.totalPages, currentPage: data.currentPage };
  } catch (error) {
    console.error("Error fetching stars:", error);
    return notFound(); // Redirects to 404 if fetch fails
  }
}

export default async function PornStars({ params }) {
  const page = parseInt(params.page || "1", 10);
  
  // Ensure the page number is valid
  if (isNaN(page) || page < 1) {
    return notFound();
  }

  const { stars, totalPages, currentPage } = await fetchStars(page);

  return (
    <>
      <Head>
        <title>Best Pornstars On | Hexmy</title>
        <link rel="canonical" href={`https://hexmy.com/stars/${currentPage}`} />
        <meta name="description" content="Explore the best pornstars on Hexmy. Watch all pornstar videos on Hexmy." />
      </Head>

      <Navbar />
      <Tab/>
      <div style={{ width: "95%", margin: "auto", marginTop: "30px" }}>
        <h1>Porn Stars</h1>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {stars.length > 0 ? (
            stars.map((name, index) => (
              <Link href={`/pornstar/${name}`} key={index} style={{ margin: "10px", textAlign: "center", textDecoration: "none" }}>
               <Image 
  src="/female.png" 
  alt={name} 
  width={120} 
  height={120} 
  style={{ objectFit: "cover" }} 
/>
                <h2 style={{ color: "#000" }}>{name}</h2>
              </Link>
            ))
          ) : (
            <p>No stars found.</p>
          )}
        </div>

        {/* Pagination */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {currentPage < totalPages && (
            <Link href={`/stars/${currentPage + 1}`}>
              <button className="btn btn-dark">Load More</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
