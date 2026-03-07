"use client";

import { useState } from "react";
import FormShell, {
  FormLabel,
  TextInput,
  TextArea,
  SelectInput,
  MultiSelect,
  Checkbox,
} from "@/components/apply/FormShell";

const SECTORS = [
  "AI/ML",
  "SaaS",
  "Fintech",
  "Health Tech",
  "Climate Tech",
  "Enterprise",
  "Consumer",
  "Marketplace",
  "Developer Tools",
  "Hardware",
  "Other",
];

const STAGES = ["Pre-Seed", "Seed", "Series A"];

const INVESTMENTS_PER_YEAR = ["1-2", "3-5", "6-10", "10+"];

const SOURCES = [
  "Referral",
  "Twitter/X",
  "LinkedIn",
  "Product Hunt",
  "Event",
  "Search",
  "Other",
];

const ROLES = ["Lead", "Participated", "Advisor"];

export default function InvestorApply() {
  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isIndependent, setIsIndependent] = useState(false);
  const [firmName, setFirmName] = useState("");
  const [role, setRole] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Step 2
  const [thesis, setThesis] = useState("");
  const [sectorPrefs, setSectorPrefs] = useState<string[]>([]);
  const [stagePrefs, setStagePrefs] = useState<string[]>([]);
  const [checkMin, setCheckMin] = useState("50");
  const [checkMax, setCheckMax] = useState("500");
  const [investmentsPerYear, setInvestmentsPerYear] = useState("");

  // Step 3
  const [portfolio, setPortfolio] = useState([
    { company: "", role: "", year: "" },
  ]);
  const [exits, setExits] = useState("");
  const [boardSeats, setBoardSeats] = useState("");

  // Step 4
  const [accredited, setAccredited] = useState(false);
  const [source, setSource] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  const updatePortfolio = (
    index: number,
    field: string,
    value: string
  ) => {
    setPortfolio((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const addPortfolio = () => {
    setPortfolio((prev) => [
      ...prev,
      { company: "", role: "", year: "" },
    ]);
  };

  const removePortfolio = (index: number) => {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  };

  const checkSizes = [
    "$10K",
    "$25K",
    "$50K",
    "$100K",
    "$250K",
    "$500K",
    "$1M",
    "$2M",
    "$5M+",
  ];

  const steps = [
    // Step 1
    <div key="s1">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        About You
      </h3>

      <div className="space-y-5">
        <div>
          <FormLabel required>Full Legal Name</FormLabel>
          <TextInput
            value={fullName}
            onChange={setFullName}
            placeholder="Your full name"
          />
        </div>

        <div>
          <FormLabel required>Email</FormLabel>
          <TextInput
            value={email}
            onChange={setEmail}
            placeholder="you@email.com"
            type="email"
          />
        </div>

        <div>
          <Checkbox
            checked={isIndependent}
            onChange={setIsIndependent}
            label="I invest independently (angel investor)"
          />
        </div>

        {!isIndependent && (
          <div>
            <FormLabel required>Firm or Fund Name</FormLabel>
            <TextInput
              value={firmName}
              onChange={setFirmName}
              placeholder="Your firm name"
            />
          </div>
        )}

        <div>
          <FormLabel required>Your Role / Title</FormLabel>
          <TextInput
            value={role}
            onChange={setRole}
            placeholder={
              isIndependent ? "Angel Investor" : "e.g. Partner, Principal"
            }
          />
        </div>

        <div>
          <FormLabel required>LinkedIn URL</FormLabel>
          <TextInput
            value={linkedin}
            onChange={setLinkedin}
            placeholder="linkedin.com/in/yourname"
          />
        </div>

        <div>
          <FormLabel required>Location</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <TextInput value={city} onChange={setCity} placeholder="City" />
            <TextInput
              value={country}
              onChange={setCountry}
              placeholder="Country"
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 2
    <div key="s2">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Investment Thesis
      </h3>

      <div className="space-y-5">
        <div>
          <FormLabel required>Your Investment Thesis</FormLabel>
          <p className="text-text-muted text-[13px] mb-3">
            Describe what you invest in and why. This helps us match you with
            relevant startups.
          </p>
          <TextArea
            value={thesis}
            onChange={setThesis}
            placeholder="What types of companies do you invest in? What do you look for?"
            maxLength={500}
          />
        </div>

        <div>
          <FormLabel required>Sector Preferences</FormLabel>
          <MultiSelect
            options={SECTORS}
            selected={sectorPrefs}
            onChange={setSectorPrefs}
            placeholder="Select sectors"
          />
        </div>

        <div>
          <FormLabel required>Stage Preferences</FormLabel>
          <MultiSelect
            options={STAGES}
            selected={stagePrefs}
            onChange={setStagePrefs}
            placeholder="Select stages"
          />
        </div>

        <div>
          <FormLabel required>Typical Check Size Range</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-text-muted text-[12px] mb-1">Minimum</p>
              <SelectInput
                options={checkSizes}
                value={checkMin}
                onChange={setCheckMin}
                placeholder="Min"
              />
            </div>
            <div>
              <p className="text-text-muted text-[12px] mb-1">Maximum</p>
              <SelectInput
                options={checkSizes}
                value={checkMax}
                onChange={setCheckMax}
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div>
          <FormLabel required>Investments Per Year</FormLabel>
          <SelectInput
            options={INVESTMENTS_PER_YEAR}
            value={investmentsPerYear}
            onChange={setInvestmentsPerYear}
            placeholder="Select"
          />
        </div>
      </div>
    </div>,

    // Step 3
    <div key="s3">
      <h3
        className="text-[22px] font-normal text-text-primary mb-2"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Track Record
      </h3>
      <p className="text-text-muted text-[13px] mb-6">
        Sharing your portfolio builds credibility with founders. Optional but
        encouraged.
      </p>

      <div className="space-y-5">
        <div>
          <FormLabel>Portfolio Companies</FormLabel>
          <div className="space-y-3">
            {portfolio.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-4 relative"
                style={{
                  background: "rgba(255, 255, 255, 0.25)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                {i > 0 && (
                  <button
                    onClick={() => removePortfolio(i)}
                    className="absolute top-2 right-2 text-text-muted hover:text-text-primary transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
                <div className="grid grid-cols-3 gap-3">
                  <TextInput
                    value={p.company}
                    onChange={(v) => updatePortfolio(i, "company", v)}
                    placeholder="Company"
                  />
                  <SelectInput
                    options={ROLES}
                    value={p.role}
                    onChange={(v) => updatePortfolio(i, "role", v)}
                    placeholder="Role"
                  />
                  <TextInput
                    value={p.year}
                    onChange={(v) => updatePortfolio(i, "year", v)}
                    placeholder="Year"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addPortfolio}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-medium text-text-secondary transition-all duration-200 hover:bg-black/[0.03]"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Another
            </button>
          </div>
        </div>

        <div>
          <FormLabel>Notable Exits or Outcomes</FormLabel>
          <TextArea
            value={exits}
            onChange={setExits}
            placeholder="Any notable exits, IPOs, or outcomes to share"
            maxLength={300}
            rows={3}
          />
        </div>

        <div>
          <FormLabel>Board Seats Currently Held</FormLabel>
          <TextInput
            value={boardSeats}
            onChange={setBoardSeats}
            placeholder="e.g. Acme Inc, Beta Corp (optional)"
          />
        </div>
      </div>
    </div>,

    // Step 4
    <div key="s4">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Verification
      </h3>

      <div className="space-y-6">
        <div
          className="rounded-xl p-5"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Checkbox
            checked={accredited}
            onChange={setAccredited}
            label={
              <span className="text-[14px] leading-[1.6]">
                I certify that I am an accredited investor as defined by SEC
                Rule 501 of Regulation D. I understand that Nexus will verify
                this status through a third-party verification service before
                granting full platform access.
              </span>
            }
          />
        </div>

        <div>
          <FormLabel required>How did you hear about Nexus?</FormLabel>
          <SelectInput
            options={SOURCES}
            value={source}
            onChange={setSource}
            placeholder="Select one"
          />
        </div>

        <div>
          <FormLabel>Anything else you want us to know?</FormLabel>
          <TextArea
            value={anythingElse}
            onChange={setAnythingElse}
            placeholder="Optional"
            maxLength={300}
            rows={3}
          />
        </div>
      </div>
    </div>,
  ];

  const stepLabels = [
    "About You",
    "Investment Thesis",
    "Track Record",
    "Verification",
  ];

  return (
    <FormShell
      steps={steps}
      stepLabels={stepLabels}
      getEmail={() => email}
    />
  );
}
