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
    const url = `http://localhost:3000/export-phones?phone=${phone.name}&static=true`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle0" });

    // Force all backgrounds transparent so omitBackground produces true alpha
    await page.evaluate(() => {
      // Make html and body transparent
      document.documentElement.style.background = "transparent";
      document.body.style.background = "transparent";
      // Walk all ancestors of the phone element and force transparent backgrounds
      const phone = document.querySelector(".iphone-outer-shell");
      if (phone) {
        let el = phone.parentElement;
        while (el && el !== document.documentElement) {
          el.style.background = "transparent";
          el.style.backgroundColor = "transparent";
          el = el.parentElement;
        }
      }
      // Remove any global style tags or elements that set body/html backgrounds
      const allEls = document.querySelectorAll("*");
      allEls.forEach((el) => {
        if (el instanceof HTMLElement) {
          const bg = getComputedStyle(el).backgroundColor;
          // Skip the phone itself and its children
          if (phone && (el === phone || phone.contains(el))) return;
          // If this element has a non-transparent background and is an ancestor or sibling layer
          if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
            // Only clear if it's not inside the phone
            if (!phone || !phone.contains(el)) {
              el.style.backgroundColor = "transparent";
              el.style.background = "transparent";
            }
          }
        }
      });
    });

    // Wait for full render with static values
    console.log("Waiting 5s for full render...");
    await new Promise((r) => setTimeout(r, 5000));

    // Find the outer shell element and get its bounding box
    const el = await page.$(".iphone-outer-shell");
    if (!el) throw new Error("Could not find .iphone-outer-shell element");

    const box = await el.boundingBox();
    if (!box) throw new Error("Could not get bounding box for .iphone-outer-shell");

    const outPath = resolve(exportsDir, phone.file);
    console.log(`Screenshotting ${phone.name} phone (${box.width}x${box.height})...`);

    // Screenshot just the phone element's bounding box with transparent background
    await page.screenshot({
      path: outPath,
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
      omitBackground: true,
    });

    // Copy to Downloads
    const dlPath = resolve(downloadsDir, phone.file);
    copyFileSync(outPath, dlPath);
    console.log(`Saved: ${outPath}`);
    console.log(`Copied: ${dlPath}`);
  }

  await browser.close();
  console.log("\nDone! Both transparent PNGs exported.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
