import puppeteer from "puppeteer";
import { mkdirSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const exportsDir = resolve(projectRoot, "public/exports");
const downloadsDir = resolve(process.env.HOME, "Downloads");

mkdirSync(exportsDir, { recursive: true });

const phones = [
  { name: "investor", file: "investor-phone.png" },
  { name: "founder", file: "founder-phone.png" },
];

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  for (const phone of phones) {
    const url = `http://localhost:3000/export-phones?phone=${phone.name}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for animations to settle
    console.log("Waiting 3s for animations...");
    await new Promise((r) => setTimeout(r, 3000));

    // Find the phone element bounding box
    const clip = await page.evaluate(() => {
      const el = document.querySelector(".iphone-outer-shell");
      if (!el) throw new Error("Could not find .iphone-outer-shell");
      const rect = el.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });

    const outPath = resolve(exportsDir, phone.file);
    console.log(`Screenshotting ${phone.name} phone (${clip.width}x${clip.height})...`);

    await page.screenshot({
      path: outPath,
      clip,
      omitBackground: true,
    });

    // Copy to Downloads
    const dlPath = resolve(downloadsDir, phone.file);
    copyFileSync(outPath, dlPath);
    console.log(`Saved: ${outPath}`);
    console.log(`Copied: ${dlPath}`);
  }

  await browser.close();
  console.log("\nDone! Both PNGs exported.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
