"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

function resolveBackendUrl() {
  const configured = (process.env.NEXT_PUBLIC_BACKEND_URL || "").trim();
  const fallback =
    process.env.NODE_ENV === "production"
      ? "https://aptiview-backend.onrender.com"
      : "http://localhost:4000";
  const base = configured || fallback;
  const normalized = /^https?:\/\//i.test(base) ? base : `https://${base}`;
  return normalized.replace(/\/+$/, "");
}

export function GlobalUserProvisioner() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;
    let cancelled = false;
    async function provision() {
      try {
        const token = await getToken();
        if (!token) {
          console.log("No token available");
          return;
        }
        const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses[0]?.emailAddress;
        const backendUrl = resolveBackendUrl();
        const body = { email };
        const res = await fetch(`${backendUrl}/api/users/provision`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const errText = await res.text();
          if (!cancelled) console.error("Provisioning failed:", errText);
        }
      } catch (err) {
        if (!cancelled) console.error("Provisioning error:", err);
      }
    }
    provision();
    return () => { cancelled = true; };
  }, [isSignedIn, user, getToken]);
  return null;
} 