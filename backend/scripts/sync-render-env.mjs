/**
 * Push environment variables to an existing Render Web Service via API.
 *
 * Prerequisites:
 * 1. Create the service (Blueprint from repo root render.yaml, or manual Web Service).
 * 2. Account → API Keys → create key → export RENDER_API_KEY=rnd_...
 * 3. Service → Settings → copy Service ID → export RENDER_SERVICE_ID=srv-...
 *
 * Run from repo root or backend/:
 *   node backend/scripts/sync-render-env.mjs
 *
 * Uses backend/.env (gitignored). BACKEND_URL: set to your Render URL after first deploy,
 * then run this script again or update in the Render dashboard.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.join(__dirname, "..");
const envPath = path.join(backendRoot, ".env");

const RENDER_API_KEY = process.env.RENDER_API_KEY?.trim();
const RENDER_SERVICE_ID = process.env.RENDER_SERVICE_ID?.trim();

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

const KEYS = [
  "NODE_ENV",
  "DATABASE_URL",
  "FRONTEND_URL",
  "BACKEND_URL",
  "CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "OPENAI_API_KEY",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

async function main() {
  if (!RENDER_API_KEY || !RENDER_SERVICE_ID) {
    console.error(
      "Set RENDER_API_KEY and RENDER_SERVICE_ID (see script header comments)."
    );
    process.exit(1);
  }

  if (!fs.existsSync(envPath)) {
    console.error("Missing backend/.env — copy from backend/.env.example and fill values.");
    process.exit(1);
  }

  const fileEnv = parseEnv(fs.readFileSync(envPath, "utf8"));
  const envVars = [];

  for (const key of KEYS) {
    let val = fileEnv[key];
    if (key === "NODE_ENV") val = val || "production";
    if (key === "FRONTEND_URL") val = val || "https://aptiview.vercel.app";
    if (!val) {
      console.warn(`Skipping empty ${key} (add to backend/.env or Render dashboard).`);
      continue;
    }
    envVars.push({ key, value: val });
  }

  if (!envVars.some((e) => e.key === "DATABASE_URL")) {
    console.error("DATABASE_URL is required in backend/.env for the API to accept the payload.");
    process.exit(1);
  }

  const url = `https://api.render.com/v1/services/${RENDER_SERVICE_ID}/env-vars`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${RENDER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(envVars),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("Render API error", res.status, text);
    process.exit(1);
  }

  console.log("Environment variables updated on Render. Trigger a manual deploy if needed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
