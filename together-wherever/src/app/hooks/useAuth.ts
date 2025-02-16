"use client";

import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null; // Prevents hydration errors

  // Redirect immediately if no token
  if (!token) {
      router.replace("/signin"); // Use `replace` to prevent going back to the protected page
      return false;
  }

  return true;
}