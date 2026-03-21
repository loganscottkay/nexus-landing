import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const WIDTH = 1080;
const HEIGHT = 1350;

// Phone frame dimensions (scaled up for high-res)
const PHONE_W = 390; // 260 * 1.5
const PHONE_H = 795; // 530 * 1.5

const logoPath = path.join(ROOT, "public", "plejj-logo-transparent.png");
const logoBase64 = fs.readFileSync(logoPath).toString("base64");
const logoDataUri = `data:image/png;base64,${logoBase64}`;

/* ───── Shared HTML pieces ───── */

const statusBar = `
<div style="display:flex;justify-content:space-between;align-items:center;padding:21px 18px 0;height:42px">
  <span style="font-size:10.5px;font-weight:600;color:#F8FAFC;font-family:'DM Sans',sans-serif">9:41</span>
  <div style="display:flex;align-items:center;gap:4.5px">
    <svg width="15" height="10.5" viewBox="0 0 20 14" fill="none">
      <rect x="0" y="10" width="3" height="4" rx="0.5" fill="#F8FAFC"/>
      <rect x="5" y="7" width="3" height="7" rx="0.5" fill="#F8FAFC"/>
      <rect x="10" y="4" width="3" height="10" rx="0.5" fill="#F8FAFC"/>
      <rect x="15" y="0" width="3" height="14" rx="0.5" fill="#F8FAFC"/>
    </svg>
    <svg width="13.5" height="10.5" viewBox="0 0 18 14" fill="#F8FAFC">
      <path d="M9 11a2 2 0 100 4 2 2 0 000-4zM3.5 7.5a8 8 0 0111 0" stroke="#F8FAFC" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M0.5 4.5a12 12 0 0117 0" stroke="#F8FAFC" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>
    <svg width="21" height="10.5" viewBox="0 0 28 14" fill="none">
      <rect x="0.5" y="0.5" width="23" height="13" rx="2" stroke="#F8FAFC" stroke-width="1"/>
      <rect x="2" y="2" width="18" height="10" rx="1" fill="#F8FAFC"/>
      <rect x="25" y="4" width="2" height="6" rx="1" fill="#F8FAFC" opacity="0.4"/>
    </svg>
  </div>
</div>`;

const tabBar = (activeLabel, color, tabs) => `
<div style="display:flex;justify-content:space-around;align-items:center;padding:7.5px 18px 12px;border-top:1px solid rgba(255,255,255,0.04);background:rgba(0,0,0,0.3);flex-shrink:0">
  ${tabs.map(t => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:1.5px;position:relative">
      <div style="position:relative;transform:scale(1.25);transform-origin:center">
        ${t.svg}
      </div>
      ${t.label === activeLabel ? `<span style="font-size:7.5px;font-family:'DM Sans',sans-serif;color:${color};font-weight:600">${t.label}</span>` : ""}
    </div>
  `).join("")}
</div>`;

const homeIndicator = `
<div style="display:flex;justify-content:center;padding-bottom:6px;background:rgba(0,0,0,0.3);flex-shrink:0">
  <div style="width:120px;height:3px;border-radius:9999px;background:rgba(255,255,255,0.2)"></div>
</div>`;

/* ───── Investor Screen ───── */

const investorScreen = `
<div style="width:100%;height:100%;display:flex;flex-direction:column;background:linear-gradient(145deg,#0B1120 0%,#0E1A2E 30%,#122035 50%,#0D1B30 70%,#0A1222 100%);font-size:0;position:relative">
  <div style="position:absolute;top:0;left:0;right:0;height:60%;background:radial-gradient(ellipse at 50% 0%,rgba(6,182,212,0.08) 0%,transparent 70%);pointer-events:none;z-index:0"></div>

  ${statusBar}

  <!-- Greeting -->
  <div style="padding:9px 15px 4.5px;position:relative;z-index:1">
    <div style="font-size:15px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;letter-spacing:-0.3px">
      Good afternoon, Jordan 👋
    </div>
    <div style="margin-top:4.5px;display:inline-flex;align-items:center;gap:4.5px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.2);border-radius:9999px;padding:3px 10.5px">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
      <span style="font-size:8.25px;color:#22D3EE;font-weight:600;font-family:'DM Sans',sans-serif">Investor</span>
      <span style="font-size:8.25px;color:rgba(255,255,255,0.4)">·</span>
      <span style="font-size:8.25px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif">AI/ML, Fintech</span>
    </div>
  </div>

  <!-- Stats card -->
  <div style="margin:9px 15px 15px;padding:15px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);border-radius:15px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);backdrop-filter:blur(8px);position:relative;z-index:1">
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:10.5px">
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="font-size:30px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;line-height:1">14</div>
        <div style="font-size:7.5px;color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:0.75px;margin-top:3px">New Startups</div>
        <span style="font-size:6px;color:#34D399;background:rgba(52,211,153,0.1);border-radius:4.5px;padding:1.5px 4.5px;font-weight:600;font-family:'DM Sans',sans-serif;display:inline-block;margin-top:1.5px">▲ +3</span>
      </div>
      <svg width="60" height="27" viewBox="0 0 40 18" fill="none" style="margin-top:-6px">
        <polyline points="0,16 7,13 14,10 20,12 26,7 33,4 40,1" stroke="#22D3EE" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="0,16 7,13 14,10 20,12 26,7 33,4 40,1 40,18 0,18" fill="url(#tealFade)"/>
        <defs><linearGradient id="tealFade" x1="0" y1="0" x2="0" y2="18"><stop offset="0%" stop-color="#22D3EE" stop-opacity="0.15"/><stop offset="100%" stop-color="#22D3EE" stop-opacity="0"/></linearGradient></defs>
      </svg>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;text-align:center">
      ${[{n:"5",l:"MATCHES",t:"+2"},{n:"3",l:"MEETINGS",t:"+1"},{n:"2",l:"SAVED",t:"New"}].map(s=>`
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="font-size:19.5px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;line-height:1">${s.n}</div>
          <div style="font-size:7.5px;color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:0.75px;margin-top:3px">${s.l}</div>
          <span style="font-size:6px;color:#34D399;background:rgba(52,211,153,0.1);border-radius:4.5px;padding:1.5px 4.5px;font-weight:600;font-family:'DM Sans',sans-serif;display:inline-block;margin-top:1.5px">▲ ${s.t}</span>
        </div>
      `).join("")}
    </div>
    <div style="display:flex;align-items:center;gap:7.5px;margin-top:9px;padding-top:9px;border-top:1px solid rgba(255,255,255,0.06)">
      <span style="font-size:9px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif;white-space:nowrap">Engagement</span>
      <div style="flex:1;height:4.5px;border-radius:9999px;background:rgba(255,255,255,0.08);overflow:hidden">
        <div style="width:84%;height:100%;border-radius:9999px;background:linear-gradient(90deg,#06B6D4,#22D3EE)"></div>
      </div>
      <span style="font-size:9.75px;color:#22D3EE;font-weight:700;font-family:'DM Sans',sans-serif">84%</span>
    </div>
  </div>

  <!-- Separator -->
  <div style="height:0.75px;background:rgba(255,255,255,0.04);margin:0 15px 7.5px"></div>

  <!-- Feed -->
  <div style="flex:1;padding:4.5px 15px 3px;display:flex;flex-direction:column;min-height:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:7.5px">
      <span style="font-size:12.75px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif">Your Feed</span>
      <span style="font-size:8.25px;color:#22D3EE;background:rgba(6,182,212,0.18);border-radius:9999px;padding:3px 10.5px;font-weight:600;font-family:'DM Sans',sans-serif;border:0.75px solid rgba(34,211,238,0.2)">New</span>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:3%;overflow:hidden">
      ${[
        {i:"V",n:"VaultSync",d:"Decentralized data infrastructure",s:"Review",sc:"#FBBF24",sb:"rgba(251,191,36,0.18)",g:"linear-gradient(135deg,#1E3A5F,#3B82F6)",a:"#3B82F6"},
        {i:"N",n:"NovaBridge",d:"AI-powered lending platform",s:"Matched",sc:"#34D399",sb:"rgba(52,211,153,0.18)",g:"linear-gradient(135deg,#164E63,#0E7490)",a:"#0E7490"},
        {i:"P",n:"Patchwork",d:"Urban goods marketplace",s:"New",sc:"#22D3EE",sb:"rgba(6,182,212,0.18)",g:"linear-gradient(135deg,#312E81,#6366F1)",a:"#6366F1"},
      ].map(c=>`
        <div style="display:flex;align-items:center;gap:9px;padding:3% 4%;background:rgba(255,255,255,0.07);border-radius:15px;border:1px solid rgba(255,255,255,0.10);border-left:3px solid ${c.a};box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);backdrop-filter:blur(8px);flex:1;min-height:0">
          <div style="width:27px;height:27px;border-radius:50%;background:${c.g};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:9.75px;font-weight:700;color:#fff;font-family:'DM Sans',sans-serif;border:2.25px solid ${c.a}4D">${c.i}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;color:#F1F5F9;font-family:'DM Sans',sans-serif;font-weight:700">${c.n}</div>
            <div style="font-size:9.75px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.d}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
            <span style="font-size:8.25px;color:${c.sc};background:${c.sb};border-radius:9999px;padding:3px 10.5px;font-family:'DM Sans',sans-serif;font-weight:600;border:0.75px solid ${c.sc}33">${c.s}</span>
          </div>
        </div>
      `).join("")}
    </div>
  </div>

  <!-- Separator -->
  <div style="height:0.75px;background:rgba(255,255,255,0.04);margin:6px 15px 0"></div>

  <!-- Meeting Queue -->
  <div style="padding:9px 15px 6px;position:relative;z-index:1">
    <div style="height:3px;border-radius:9999px;background:linear-gradient(90deg,#06B6D4,#22D3EE,transparent);margin-bottom:7.5px"></div>
    <div style="display:flex;align-items:center;gap:4.5px;margin-bottom:7.5px">
      <span style="font-size:12.75px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif">Meeting Queue</span>
      <svg width="10.5" height="10.5" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    </div>
    ${[
      {p:"1",n:"Luminary AI",active:true,t:"47m",m:"92%",av:"linear-gradient(135deg,#0E7490,#06B6D4)",pb:"linear-gradient(135deg,#06B6D4,#22D3EE)"},
      {p:"2",n:"Terraform Health",active:false,t:"2h",m:"87%",av:"linear-gradient(135deg,#1E3A5F,#3B82F6)",pb:"rgba(255,255,255,0.1)"},
    ].map(q=>`
      <div style="display:flex;align-items:center;gap:7.5px;margin-bottom:3%;padding:3% 4%;background:${q.active?"rgba(6,182,212,0.08)":"rgba(255,255,255,0.07)"};border-radius:15px;border:${q.active?"1px solid rgba(6,182,212,0.15)":"1px solid rgba(255,255,255,0.10)"};box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);backdrop-filter:blur(8px)">
        <div style="width:24px;height:24px;border-radius:50%;background:${q.pb};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:${q.active?"#fff":"rgba(255,255,255,0.5)"};font-family:'DM Sans',sans-serif">${q.p}</div>
        <div style="width:21px;height:21px;border-radius:50%;background:${q.av};flex-shrink:0;border:2.25px solid rgba(6,182,212,0.3)"></div>
        <span style="font-size:12px;color:#F1F5F9;font-family:'DM Sans',sans-serif;font-weight:600;flex:1">${q.n}</span>
        <span style="font-size:8.25px;color:${q.active?"#22D3EE":"rgba(255,255,255,0.55)"};background:${q.active?"rgba(6,182,212,0.18)":"rgba(255,255,255,0.08)"};border-radius:9999px;padding:3px 10.5px;font-weight:600;font-family:'DM Sans',sans-serif;border:${q.active?"0.75px solid rgba(34,211,238,0.2)":"0.75px solid rgba(255,255,255,0.08)"}">${q.t}</span>
        <span style="font-size:8.25px;color:#34D399;background:rgba(52,211,153,0.18);border-radius:9999px;padding:3px 10.5px;font-weight:600;font-family:'DM Sans',sans-serif;border:0.75px solid rgba(52,211,153,0.2)">${q.m}</span>
      </div>
    `).join("")}
  </div>

  <!-- Tab bar -->
  ${tabBar("Home", "#22D3EE", [
    {label:"Home",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="#22D3EE" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`},
    {label:"Search",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`},
    {label:"Matches",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`},
    {label:"Profile",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`},
  ])}

  ${homeIndicator}
</div>`;

/* ───── Founder/Startup Screen ───── */

const founderScreen = `
<div style="width:100%;height:100%;display:flex;flex-direction:column;background:linear-gradient(145deg,#0E0B1F 0%,#150E2A 30%,#1A1235 50%,#140F2C 70%,#0D0A1E 100%);font-size:0;position:relative">
  <div style="position:absolute;top:0;left:0;right:0;height:60%;background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,0.08) 0%,transparent 70%);pointer-events:none;z-index:0"></div>

  ${statusBar}

  <!-- Greeting -->
  <div style="padding:9px 15px 4.5px;position:relative;z-index:1">
    <div style="font-size:15px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;letter-spacing:-0.3px">
      Good afternoon, Alex
    </div>
    <div style="margin-top:4.5px;display:inline-flex;align-items:center;gap:4.5px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.2);border-radius:9999px;padding:3px 10.5px">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>
      <span style="font-size:8.25px;color:#A78BFA;font-weight:600;font-family:'DM Sans',sans-serif">Founder</span>
      <span style="font-size:8.25px;color:rgba(255,255,255,0.4)">·</span>
      <span style="font-size:8.25px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif">Luminary AI</span>
    </div>
  </div>

  <!-- Stats card -->
  <div style="margin:9px 15px 15px;padding:15px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.10);border-radius:15px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);backdrop-filter:blur(8px);position:relative;z-index:1">
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:10.5px">
      <div style="display:flex;flex-direction:column;align-items:center">
        <div style="font-size:30px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;line-height:1">47</div>
        <div style="font-size:7.5px;color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:0.75px;margin-top:3px">Views</div>
        <span style="font-size:6px;color:#A78BFA;background:rgba(167,139,250,0.1);border-radius:4.5px;padding:1.5px 4.5px;font-weight:600;font-family:'DM Sans',sans-serif;display:inline-block;margin-top:1.5px">▲ +12</span>
      </div>
      <svg width="60" height="27" viewBox="0 0 40 18" fill="none" style="margin-top:-6px">
        <polyline points="0,17 5,14 10,12 16,13 22,8 28,9 34,4 37,3 40,0" stroke="#A78BFA" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="0,17 5,14 10,12 16,13 22,8 28,9 34,4 37,3 40,0 40,18 0,18" fill="url(#violetFade)"/>
        <defs><linearGradient id="violetFade" x1="0" y1="0" x2="0" y2="18"><stop offset="0%" stop-color="#A78BFA" stop-opacity="0.15"/><stop offset="100%" stop-color="#A78BFA" stop-opacity="0"/></linearGradient></defs>
      </svg>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;text-align:center">
      ${[{n:"8",l:"INTERESTED",t:"+3"},{n:"2",l:"MEETINGS",t:"+1"},{n:"12",l:"SCORE",t:"+5"}].map(s=>`
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="font-size:19.5px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif;line-height:1">${s.n}</div>
          <div style="font-size:7.5px;color:rgba(255,255,255,0.4);font-family:'DM Sans',sans-serif;text-transform:uppercase;letter-spacing:0.75px;margin-top:3px">${s.l}</div>
          <span style="font-size:6px;color:#A78BFA;background:rgba(167,139,250,0.1);border-radius:4.5px;padding:1.5px 4.5px;font-weight:600;font-family:'DM Sans',sans-serif;display:inline-block;margin-top:1.5px">▲ ${s.t}</span>
        </div>
      `).join("")}
    </div>
    <div style="display:flex;align-items:center;gap:7.5px;margin-top:9px;padding-top:9px;border-top:1px solid rgba(255,255,255,0.06)">
      <span style="font-size:9px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif;white-space:nowrap">Profile Strength</span>
      <div style="flex:1;height:4.5px;border-radius:9999px;background:rgba(255,255,255,0.08);overflow:hidden">
        <div style="width:78%;height:100%;border-radius:9999px;background:linear-gradient(90deg,#8B5CF6,#A78BFA)"></div>
      </div>
      <span style="font-size:9.75px;color:#A78BFA;font-weight:700;font-family:'DM Sans',sans-serif">78%</span>
    </div>
  </div>

  <!-- Separator -->
  <div style="height:0.75px;background:rgba(255,255,255,0.04);margin:0 15px 7.5px"></div>

  <!-- Investor Queue -->
  <div style="flex:1;padding:4.5px 15px 3px;display:flex;flex-direction:column;min-height:0;position:relative;z-index:1">
    <div style="display:flex;align-items:center;gap:4.5px;margin-bottom:3px">
      <span style="font-size:12.75px;font-weight:700;color:#F1F5F9;font-family:'DM Sans',sans-serif">Investor Queue</span>
    </div>
    <div style="font-size:8.25px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;font-style:italic;margin-bottom:7.5px">
      One at a time · 72h windows
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:3%;overflow:hidden">
      ${[
        {p:"1",ini:"SC",n:"Sarah Chen",f:"Stratton Ventures",s:"Active",sc:"#34D399",sb:"rgba(52,211,153,0.18)",active:true,av:"linear-gradient(135deg,#4C1D95,#7C3AED)",pb:"linear-gradient(135deg,#8B5CF6,#A78BFA)"},
        {p:"2",ini:"MW",n:"Marcus Webb",f:"Founder Collective",s:"Waiting",sc:"#FBBF24",sb:"rgba(251,191,36,0.18)",active:false,av:"linear-gradient(135deg,#312E81,#6366F1)",pb:"rgba(255,255,255,0.1)"},
        {p:"3",ini:"ER",n:"Elena Rodriguez",f:"Elevation",s:"Waiting",sc:"#FBBF24",sb:"rgba(251,191,36,0.18)",active:false,av:"linear-gradient(135deg,#581C87,#9333EA)",pb:"rgba(255,255,255,0.1)"},
        {p:"4",ini:"JP",n:"James Park",f:"Root Ventures",s:"New",sc:"#A78BFA",sb:"rgba(139,92,246,0.18)",active:false,av:"linear-gradient(135deg,#1E3A5F,#6366F1)",pb:"rgba(255,255,255,0.1)"},
      ].map(q=>`
        <div style="display:flex;align-items:center;gap:7.5px;padding:3% 4%;background:${q.active?"rgba(139,92,246,0.08)":"rgba(255,255,255,0.07)"};border-radius:15px;border:${q.active?"1px solid rgba(139,92,246,0.15)":"1px solid rgba(255,255,255,0.10)"};${q.active?"border-left:3px solid #8B5CF6;":""}flex:1;min-height:0;box-shadow:${q.active?"0 0 18px rgba(139,92,246,0.08),inset 0 1px 0 rgba(255,255,255,0.08)":"inset 0 1px 0 rgba(255,255,255,0.08)"};backdrop-filter:blur(8px)">
          <div style="width:24px;height:24px;border-radius:50%;background:${q.pb};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:${q.active?"#fff":"rgba(255,255,255,0.5)"};font-family:'DM Sans',sans-serif">${q.p}</div>
          <div style="width:24px;height:24px;border-radius:50%;background:${q.av};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:6.75px;font-weight:700;color:#fff;font-family:'DM Sans',sans-serif;border:2.25px solid rgba(139,92,246,0.3)">${q.ini}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;color:#F1F5F9;font-family:'DM Sans',sans-serif;font-weight:600">${q.n}</div>
            <div style="font-size:9.75px;color:rgba(255,255,255,0.55);font-family:'DM Sans',sans-serif">${q.f}</div>
          </div>
          ${q.active?`<span style="font-size:5.25px;color:#fff;background:#22C55E;border-radius:3px;padding:1.5px 4.5px;font-weight:700;font-family:'DM Sans',sans-serif;letter-spacing:0.45px;line-height:1.2">LIVE</span>`:""}
          <span style="font-size:8.25px;color:${q.sc};background:${q.sb};border-radius:9999px;padding:3px 10.5px;font-weight:600;font-family:'DM Sans',sans-serif;border:0.75px solid ${q.sc}33">${q.s}</span>
        </div>
      `).join("")}
    </div>
  </div>

  <!-- Separator -->
  <div style="height:0.75px;background:rgba(255,255,255,0.04);margin:6px 15px 0"></div>

  <!-- CTA Button -->
  <div style="padding:9px 15px 6px;flex-shrink:0;position:relative;z-index:1">
    <div style="background:linear-gradient(135deg,#8B5CF6,#A78BFA);border-radius:15px;padding:12px;text-align:center;box-shadow:0 6px 22.5px rgba(139,92,246,0.3);position:relative;overflow:hidden">
      <span style="font-size:11.25px;color:#fff;font-weight:700;font-family:'DM Sans',sans-serif;position:relative;z-index:1">Schedule Meeting →</span>
    </div>
  </div>

  <!-- Tab bar -->
  ${tabBar("Dashboard", "#A78BFA", [
    {label:"Home",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`},
    {label:"Dashboard",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" fill="#A78BFA"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`},
    {label:"Matches",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`},
    {label:"Profile",svg:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`},
  ])}

  ${homeIndicator}
</div>`;

/* ───── Build full page HTML ───── */

function buildPage(screenHtml, label) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: linear-gradient(165deg, #FAF8FF 0%, #F3F0FA 25%, #EDE8F5 50%, #F5F0FA 75%, #FBF9FF 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
  }
  .phone-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
</head>
<body>
  <div class="phone-container">
    <!-- Phone frame -->
    <div style="
      width: ${PHONE_W}px;
      height: ${PHONE_H}px;
      border-radius: 72px;
      background: linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 15%, #2A2A2C 50%, #1C1C1E 85%, #2C2C2E 100%);
      padding: 15px;
      position: relative;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03), 0 25px 50px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04);
    ">
      <!-- Metallic sheen top -->
      <div style="position:absolute;top:0;left:30px;right:30px;height:1.5px;background:rgba(255,255,255,0.12);border-radius:1px;z-index:5;pointer-events:none"></div>
      <!-- Bottom edge -->
      <div style="position:absolute;bottom:0;left:30px;right:30px;height:1.5px;background:rgba(255,255,255,0.05);border-radius:1px;z-index:5;pointer-events:none"></div>

      <!-- Side buttons -->
      <div style="position:absolute;left:-4.5px;top:150px;width:4.5px;height:21px;background:#2C2C2E;border-radius:3px 0 0 3px"></div>
      <div style="position:absolute;left:-4.5px;top:183px;width:4.5px;height:42px;background:#2C2C2E;border-radius:3px 0 0 3px"></div>
      <div style="position:absolute;left:-4.5px;top:231px;width:4.5px;height:42px;background:#2C2C2E;border-radius:3px 0 0 3px"></div>
      <div style="position:absolute;right:-4.5px;top:217.5px;width:4.5px;height:54px;background:#2C2C2E;border-radius:0 3px 3px 0"></div>

      <!-- Screen area -->
      <div style="width:100%;height:100%;border-radius:57px;overflow:hidden;position:relative;background:#0A0E1A">
        <!-- Dynamic Island -->
        <div style="position:absolute;top:15px;left:50%;transform:translateX(-50%);width:114px;height:36px;border-radius:9999px;background:#000;z-index:10">
          <div style="position:absolute;top:50%;left:30px;transform:translateY(-50%);width:4.5px;height:4.5px;border-radius:50%;background:#1A1A1A"></div>
        </div>
        <!-- Screen content -->
        <div style="height:100%;overflow:hidden">
          ${screenHtml}
        </div>
      </div>
    </div>

    <!-- Logo -->
    <img src="${logoDataUri}" style="width:120px;margin-top:40px" />

    <!-- Label -->
    <div style="font-size:20px;font-weight:600;color:#0F172A;font-family:'DM Sans',sans-serif;margin-top:12px">${label}</div>
  </div>
</body>
</html>`;
}

/* ───── Generate PNGs ───── */

async function main() {
  const browser = await puppeteer.launch({ headless: true });

  const configs = [
    { html: buildPage(investorScreen, "Investor Dashboard"), out: "plejj-investor-phone-ig.png" },
    { html: buildPage(founderScreen, "Startup Dashboard"), out: "plejj-startup-phone-ig.png" },
  ];

  for (const { html, out } of configs) {
    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    // Wait for font to load
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join(ROOT, "public", out),
      type: "png",
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    console.log(`✓ Generated ${out}`);
    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
