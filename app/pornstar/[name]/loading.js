import Navbar from "../../components/Navbar";
import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} thickness={4} />
        <h2 style={{ marginTop: "20px" }}>Loading...</h2>
      </div>
    </>
  );
}