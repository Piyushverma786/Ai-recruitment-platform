/**
 * Push required env from .env to linked Vercel project (Production only).
 * Run from frontend/: node scripts/sync-vercel-env.mjs
 * (Preview can be added manually in the Vercel dashboard if needed.)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env");

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

function run(cmd) {
  execSync(cmd, {
    cwd: root,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, CI: "1" },
  });
}

const text = fs.readFileSync(envPath, "utf8");
const env = parseEnv(text);

const sk = env.CLERK_SECRET_KEY;
const pk = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || env.CLERK_PUBLISHABLE_KEY;
const backend = env.NEXT_PUBLIC_BACKEND_URL?.trim() || "https://aptiview.onrender.com";

if (!sk || !pk) {
  console.error("Missing CLERK_SECRET_KEY or NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in .env");
  process.exit(1);
}

function add(name, value, sensitive) {
  const sens = sensitive ? " --sensitive" : "";
  const quoted = JSON.stringify(value);
  run(
    `npx vercel env add ${name} production --value ${quoted} --yes${sens} --force --non-interactive`
  );
}

add("CLERK_SECRET_KEY", sk, true);
add("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", pk, false);
add("NEXT_PUBLIC_BACKEND_URL", backend, false);

console.log("Done. Run: npx vercel deploy --prod --yes");
