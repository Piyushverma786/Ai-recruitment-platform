"use client";

import { Show } from "@clerk/nextjs";
import { GlobalUserProvisioner } from "@/components/GlobalUserProvisioner";
import { RoleRedirector } from "@/components/RoleRedirector";

/** Client-only: server <Show> in root layout caused RSC errors (500) on Vercel. */
export function ClerkSignedInShell() {
  return (
    <Show when="signed-in">
      <GlobalUserProvisioner />
      <RoleRedirector />
    </Show>
  );
}
