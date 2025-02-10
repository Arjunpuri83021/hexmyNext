import { redirect } from "next/navigation";

export default function IndianRedirectPage() {
  redirect("/popularVideos/1"); // Automatically sends users to page 1
  return null;
}
