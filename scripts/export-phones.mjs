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

    console.log("Waiting 5s for full render...");
    await new Promise((r) => setTimeout(r, 5000));

    // Nuclear option: rip the phone element out of the DOM, replace the entire
    // body with just it, and kill every stylesheet rule that could paint a background
    await page.evaluate(() => {
      const phone = document.querySelector(".iphone-outer-shell");
      if (!phone) throw new Error("No .iphone-outer-shell found");

      // Clone the phone so we keep it
      const clone = phone.cloneNode(true);

      // Wipe the entire body
      document.body.innerHTML = "";

      // Remove all non-essential stylesheets and style tags that might affect body/html
      // Keep only the ones we need for the phone
      document.body.style.cssText = "margin:0;padding:0;background:transparent!important;display:flex;align-items:center;justify-content:center;min-height:100vh;";
      document.documentElement.style.cssText = "background:transparent!important;";

      // Inject a nuke stylesheet that kills html/body backgrounds from any source
      const nuke = document.createElement("style");
      nuke.textContent = `
        html, body { background: transparent !important; background-color: transparent !important; background-image: none !important; }
        html::before, html::after, body::before, body::after { display: none !important; }
      `;
      document.head.appendChild(nuke);

      // Add the phone back
      document.body.appendChild(clone);
    });

    // Small delay for re-render after DOM manipulation
    await new Promise((r) => setTimeout(r, 500));

    const el = await page.$(".iphone-outer-shell");
    if (!el) throw new Error("Could not find .iphone-outer-shell after DOM rebuild");

    const outPath = resolve(exportsDir, phone.file);
    console.log(`Screenshotting ${phone.name} phone...`);

    await el.screenshot({
      path: outPath,
      omitBackground: true,
    });

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
