import { spawn } from "node:child_process";
import { mkdir, rm, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputDir = path.join(process.cwd(), "public", "work-screenshots");

const projects = [
  ["fractal-pay", "Fractal Pay", "app.fractalpay.com.au"],
  ["zeebrix", "Zeebrix", "zeebrix.com"],
  ["devinnovo", "Devinnovo", "devinnovo.com"],
  ["matter-capture", "Matter Capture", "capture.matter.city"],
  ["halo-skin", "Halo Skin", "haloskin.au"],
  ["soozal", "Soozal", "soozal.com.au"],
  ["united-way", "United Way", "www.unitedway.org"],
  ["crystals-solution", "Crystals Solution", "crystalssolution.com"],
  ["golrah-traders", "Golrah Traders", "golrahtraders.pk"],
  ["offshore-dedi", "Offshore Dedi", "offshorededi.com"],
  ["kissan-ghar", "Kissan Ghar", "kissanghar.pk"],
  ["mcgovern-company", "McGovern & Company", "www.mcgovernandcompany.com"],
  ["akita-tek", "Akita Tek", "akitatek.fr"],
  ["mobikey", "Mobikey", "mobikey.se"],
  ["joco-cups", "Joco Cups", "jococups.com"],
  ["the-izzara", "The Izzara", "theizzara.com"],
  ["citra-raya", "Citra Raya", "citraraya.com"],
  ["deviate-labs", "Deviate Labs", "deviatelabs.com"],
  ["holifya", "Holifya", "www.holifya.com"],
  ["faith-2-fellicity", "Faith 2 Fellicity", "faith2fellicity.com"],
  ["romeo-lugan", "Romeo Lugan", "romeolugan.com"],
  ["woodarq", "Woodarq", "woodarq.com"],
  ["ejil-enterprises", "EJIL Enterprises", "ejil-enterprises.netlify.app"],
  ["structura-surveying", "Structura Surveying", "structurasurveying.com"],
  ["company-in-good", "Company in Good", "www.companyingood.net"],
  ["clem-jones-centre", "Clem Jones Centre", "clemjonescentre.com.au"],
  ["moonlit-supports", "Moonlit Supports", "www.moonlitsupports.com.au"],
  ["perfex-painting", "Perfex Painting", "perfexpainting.com.au"],
  ["ellipses-audio", "Ellipses Audio", "naitch69.wixsite.com/ellipses-audio", "https://naitch69.wixsite.com/ellipses-audio"],
  ["governance-central", "Governance Central", "www.governancecentral.com"],
  ["emperius", "Emperius", "www.emperius.io"],
  ["tech-vision-365", "Tech Vision 365", "techvision365.netlify.app"],
  ["captive-power-solutions", "Captive Power Solutions", "captivepowersolutions.org"],
];

const args = process.argv.slice(2);
const slowMode = args.includes("--slow");
const requestedSlugs = new Set(args.filter((arg) => !arg.startsWith("--")));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const forceFallback = new Set(["matter-capture"]);

function escapeSvg(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function waitForFile(file, timeoutMs = slowMode ? 70000 : 26000) {
  const start = Date.now();
  let lastSize = 0;
  while (Date.now() - start < timeoutMs) {
    if (existsSync(file)) {
      const { size } = await stat(file);
      if (size > 1000 && size === lastSize) return true;
      lastSize = size;
    }
    await sleep(700);
  }
  return existsSync(file);
}

async function terminate(child) {
  if (child.exitCode !== null || child.signalCode) return;
  child.kill("SIGTERM");
  await sleep(800);
  if (child.exitCode === null && !child.signalCode) child.kill("SIGKILL");
}

async function makeFallback({ name, domain, slug }) {
  const svg = `
    <svg width="1100" height="700" viewBox="0 0 1100 700" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1100" height="700" fill="#110904"/>
      <circle cx="200" cy="120" r="260" fill="#ff5e1f" opacity="0.2"/>
      <circle cx="980" cy="580" r="320" fill="#ff8a3d" opacity="0.14"/>
      <rect x="78" y="76" width="944" height="548" rx="34" fill="rgba(255,255,255,0.06)" stroke="rgba(255,205,160,0.24)" stroke-width="2"/>
      <circle cx="122" cy="120" r="10" fill="#ff5e1f"/>
      <circle cx="154" cy="120" r="10" fill="rgba(255,179,107,0.45)"/>
      <circle cx="186" cy="120" r="10" fill="rgba(255,179,107,0.28)"/>
      <text x="96" y="342" fill="#fff3e9" font-size="58" font-weight="700" font-family="Inter, Arial, sans-serif">${escapeSvg(name)}</text>
      <text x="96" y="410" fill="rgba(255,243,233,0.62)" font-size="30" font-family="Inter, Arial, sans-serif">${escapeSvg(domain)}</text>
      <text x="96" y="516" fill="#ff8a3d" font-size="22" letter-spacing="6" font-weight="700" font-family="Inter, Arial, sans-serif">PREVIOUS WORK</text>
    </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 78 }).toFile(path.join(outputDir, `${slug}.webp`));
}

async function capture(project) {
  const [slug, name, domain, explicitUrl] = project;
  if (forceFallback.has(slug)) {
    await makeFallback({ slug, name, domain });
    return { slug, status: "fallback", reason: "forced fallback" };
  }

  const url = explicitUrl || `https://${domain}`;
  const profile = path.join("/private/tmp", `devibi-shot-${slug}-${Date.now()}`);
  const png = path.join(outputDir, `${slug}.png`);
  const webp = path.join(outputDir, `${slug}.webp`);

  await rm(profile, { recursive: true, force: true });
  await unlink(png).catch(() => {});

  const child = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-sync",
    "--hide-scrollbars",
    ...(slowMode ? ["--timeout=45000", "--virtual-time-budget=45000"] : []),
    "--window-size=1365,860",
    `--user-data-dir=${profile}`,
    `--screenshot=${png}`,
    url,
  ], { stdio: "ignore" });

  const wroteFile = await waitForFile(png);
  await terminate(child);
  await rm(profile, { recursive: true, force: true });

  if (!wroteFile) {
    await makeFallback({ slug, name, domain });
    return { slug, status: "fallback", reason: "no screenshot" };
  }

  await sharp(png)
    .resize(1100, 700, { fit: "cover", position: "top" })
    .webp({ quality: 76 })
    .toFile(webp);
  await unlink(png).catch(() => {});
  const { size } = await stat(webp);
  return { slug, status: "captured", size };
}

await mkdir(outputDir, { recursive: true });

const projectsToCapture = requestedSlugs.size
  ? projects.filter(([slug]) => requestedSlugs.has(slug))
  : projects;

const results = [];
for (const project of projectsToCapture) {
  const [slug, name] = project;
  process.stdout.write(`Capturing ${name}... `);
  try {
    const result = await capture(project);
    results.push(result);
    process.stdout.write(`${result.status}\n`);
  } catch (error) {
    await makeFallback({ slug, name, domain: project[2] });
    const result = { slug, status: "fallback", reason: error.message };
    results.push(result);
    process.stdout.write(`fallback (${error.message})\n`);
  }
}

const captured = results.filter((result) => result.status === "captured").length;
const fallback = results.length - captured;
console.log(JSON.stringify({ captured, fallback, total: results.length, results }, null, 2));
