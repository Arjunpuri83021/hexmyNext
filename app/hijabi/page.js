import { redirect } from "next/navigation";

export default function IndianRedirectPage() {
  redirect("/hijabi/1"); // Automatically sends users to page 1
  return null;
}
