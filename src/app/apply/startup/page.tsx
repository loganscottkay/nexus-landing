"use client";

import { useState } from "react";
import FormShell, {
  FormLabel,
  TextInput,
  TextArea,
  SelectInput,
  MultiSelect,
  FileUpload,
  Checkbox,
} from "@/components/apply/FormShell";

const VERTICALS = [
  "AI/ML",
  "SaaS",
  "Fintech",
  "HealthTech",
  "Climate Tech",
  "EdTech",
  "Marketplace",
  "Consumer",
  "Hardware",
  "Other",
];

const STAGES = ["Pre-Seed", "Seed", "Series A"];

const TEAM_SIZES = ["1", "2-3", "4-6", "7-10", "10+"];

const INVESTOR_TIERS = [
  "Micro ($1K-$10K)",
  "Small ($10K-$50K)",
  "Growth ($50K-$250K)",
  "Institutional ($250K+)",
  "Open to All",
];

const SOURCES = [
  "Referral",
  "Twitter/X",
  "LinkedIn",
  "Product Hunt",
  "Event",
  "Search",
  "Other",
];

export default function StartupApply() {
  // Step 1 — Company Basics
  const [companyName, setCompanyName] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedMonth, setFoundedMonth] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [vertical, setVertical] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // Step 2 — Your Vision
  const [problemSolving, setProblemSolving] = useState("");
  const [unfairAdvantage, setUnfairAdvantage] = useState("");
  const [threeYearVision, setThreeYearVision] = useState("");

  // Step 3 — Traction & Metrics
  const [mrr, setMrr] = useState("");
  const [users, setUsers] = useState("");
  const [growth, setGrowth] = useState("");
  const [pipeline, setPipeline] = useState("");
  const [otherMetricLabel, setOtherMetricLabel] = useState("");
  const [otherMetricValue, setOtherMetricValue] = useState("");
  const [biggestMilestone, setBiggestMilestone] = useState("");

  // Step 4 — Your Team
  const [teamMembers, setTeamMembers] = useState([
    { name: "", title: "", linkedin: "", bio: "", isFounder: true },
  ]);
  const [whyThisTeam, setWhyThisTeam] = useState("");

  // Step 5 — Pitch Materials
  const [videoUrl, setVideoUrl] = useState("");

  // Step 6 — Investment Preferences
  const [raiseAmount, setRaiseAmount] = useState("");
  const [previousRaise, setPreviousRaise] = useState("");
  const [previousInvestors, setPreviousInvestors] = useState("");
  const [idealInvestor, setIdealInvestor] = useState("");
  const [investorTier, setInvestorTier] = useState("");
  const [source, setSource] = useState("");
  const [acceptAccountability, setAcceptAccountability] = useState(false);

  const hasMetric = !!(mrr || users || growth || pipeline || otherMetricValue);

  const updateTeamMember = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setTeamMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const addTeamMember = () => {
    if (teamMembers.length < 6) {
      setTeamMembers((prev) => [
        ...prev,
        { name: "", title: "", linkedin: "", bio: "", isFounder: false },
      ]);
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const oneLineColor =
    oneLiner.length >= 80
      ? "#EF4444"
      : oneLiner.length >= 70
      ? "#D97706"
      : "#94A3B8";

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, i) =>
    String(2026 - i)
  );

  const steps = [
    // Step 1 — Company Basics
    <div key="s1">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Company Basics
      </h3>

      <div className="space-y-5">
        <div>
          <FormLabel required>Company Name</FormLabel>
          <TextInput
            value={companyName}
            onChange={setCompanyName}
            placeholder="Your company name"
          />
        </div>

        <div>
          <FormLabel required>One-Line Description</FormLabel>
          <div className="relative">
            <TextInput
              value={oneLiner}
              onChange={(v) => setOneLiner(v.slice(0, 80))}
              placeholder="What does your company do?"
              maxLength={80}
            />
            <span
              className="absolute -bottom-5 right-0 text-[12px]"
              style={{ color: oneLineColor }}
            >
              {oneLiner.length}/80
            </span>
          </div>
        </div>

        <div>
          <FormLabel>Website</FormLabel>
          <TextInput
            value={website}
            onChange={setWebsite}
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <FormLabel required>Founded</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <SelectInput
              options={months}
              value={foundedMonth}
              onChange={setFoundedMonth}
              placeholder="Month"
            />
            <SelectInput
              options={years}
              value={foundedYear}
              onChange={setFoundedYear}
              placeholder="Year"
            />
          </div>
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

        <div>
          <FormLabel required>Sector</FormLabel>
          <MultiSelect
            options={VERTICALS}
            selected={sectors}
            onChange={setSectors}
            placeholder="Select sectors"
          />
        </div>

        <div>
          <FormLabel required>Industry Vertical</FormLabel>
          <SelectInput
            options={VERTICALS}
            value={vertical}
            onChange={setVertical}
            placeholder="Select your primary vertical"
          />
        </div>

        <div>
          <FormLabel required>Stage</FormLabel>
          <SelectInput
            options={STAGES}
            value={stage}
            onChange={setStage}
            placeholder="Select stage"
          />
        </div>

        <div>
          <FormLabel required>Full-Time Team Members</FormLabel>
          <SelectInput
            options={TEAM_SIZES}
            value={teamSize}
            onChange={setTeamSize}
            placeholder="Select team size"
          />
        </div>
      </div>
    </div>,

    // Step 2 — Your Vision
    <div key="s2">
      <h3
        className="text-[22px] font-normal text-text-primary mb-2"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Your Vision
      </h3>
      <p className="text-text-muted text-[15px] italic mb-6">
        This is the most important part of your application. Revenue is one
        factor. Vision, timing, and conviction matter just as much.
      </p>

      <div className="space-y-5">
        <div>
          <FormLabel required>
            What problem are you solving and why now?
          </FormLabel>
          <TextArea
            value={problemSolving}
            onChange={(v) => setProblemSolving(v.slice(0, 500))}
            placeholder="Describe the problem, why it matters, and why the timing is right..."
            maxLength={500}
          />
        </div>

        <div>
          <FormLabel>What is your unfair advantage?</FormLabel>
          <TextArea
            value={unfairAdvantage}
            onChange={(v) => setUnfairAdvantage(v.slice(0, 300))}
            placeholder="What do you have that competitors do not? Proprietary tech, unique insight, team background..."
            maxLength={300}
            rows={3}
          />
        </div>

        <div>
          <FormLabel>Where do you see this company in 3 years?</FormLabel>
          <TextArea
            value={threeYearVision}
            onChange={(v) => setThreeYearVision(v.slice(0, 300))}
            placeholder="Describe the scale, impact, and position you are building toward..."
            maxLength={300}
            rows={3}
          />
        </div>
      </div>
    </div>,

    // Step 3 — Traction & Metrics
    <div key="s3">
      <h3
        className="text-[22px] font-normal text-text-primary mb-2"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Traction & Metrics
      </h3>
      <p className="text-text-muted text-[15px] italic mb-6">
        Share what you have. Pre-revenue? That is fine. We evaluate momentum at
        every stage.
      </p>

      <div className="space-y-5">
        <div>
          <FormLabel>Monthly Recurring Revenue</FormLabel>
          <TextInput
            value={mrr}
            onChange={setMrr}
            placeholder="e.g. 45000"
            prefix="$"
          />
        </div>

        <div>
          <FormLabel>Number of Users/Customers</FormLabel>
          <TextInput
            value={users}
            onChange={setUsers}
            placeholder="e.g. 2400"
          />
        </div>

        <div>
          <FormLabel>Month-over-Month Growth Rate</FormLabel>
          <TextInput
            value={growth}
            onChange={setGrowth}
            placeholder="e.g. 15"
            suffix="%"
          />
        </div>

        <div>
          <FormLabel>Pipeline Value</FormLabel>
          <TextInput
            value={pipeline}
            onChange={setPipeline}
            placeholder="e.g. 2000000"
            prefix="$"
          />
        </div>

        <div>
          <FormLabel>Other Key Metric</FormLabel>
          <div className="grid grid-cols-2 gap-3">
            <TextInput
              value={otherMetricLabel}
              onChange={setOtherMetricLabel}
              placeholder="Metric name"
            />
            <TextInput
              value={otherMetricValue}
              onChange={setOtherMetricValue}
              placeholder="Value"
            />
          </div>
        </div>

        <div>
          <FormLabel required>
            What is your biggest traction milestone to date?
          </FormLabel>
          <TextArea
            value={biggestMilestone}
            onChange={(v) => setBiggestMilestone(v.slice(0, 200))}
            placeholder="LOIs signed, waitlist size, key partnerships, press coverage, pilot results..."
            maxLength={200}
            rows={3}
          />
        </div>

        <div
          className={`flex items-center gap-2 text-[13px] transition-colors ${
            hasMetric ? "text-[#059669]" : "text-text-muted"
          }`}
        >
          {hasMetric ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full border border-current" />
          )}
          At least one metric is required
        </div>
      </div>
    </div>,

    // Step 4 — Your Team
    <div key="s4">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Your Team
      </h3>

      <div className="space-y-4">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 relative"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            {i > 0 && (
              <button
                onClick={() => removeTeamMember(i)}
                className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
              >
                <svg
                  width="16"
                  height="16"
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
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FormLabel required>Full Name</FormLabel>
                  <TextInput
                    value={member.name}
                    onChange={(v) => updateTeamMember(i, "name", v)}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <FormLabel required>Title / Role</FormLabel>
                  <TextInput
                    value={member.title}
                    onChange={(v) => updateTeamMember(i, "title", v)}
                    placeholder="e.g. CEO"
                  />
                </div>
              </div>
              <div>
                <FormLabel>LinkedIn URL</FormLabel>
                <TextInput
                  value={member.linkedin}
                  onChange={(v) => updateTeamMember(i, "linkedin", v)}
                  placeholder="linkedin.com/in/..."
                />
              </div>
              <div>
                <FormLabel>Short Bio</FormLabel>
                <TextArea
                  value={member.bio}
                  onChange={(v) => updateTeamMember(i, "bio", v)}
                  placeholder="Brief background"
                  maxLength={200}
                  rows={2}
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: member.isFounder
                      ? "linear-gradient(135deg, #4A6CF7, #7C5CFC)"
                      : "rgba(255, 255, 255, 0.3)",
                    border: member.isFounder
                      ? "none"
                      : "2px solid rgba(0, 0, 0, 0.15)",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    updateTeamMember(i, "isFounder", !member.isFounder);
                  }}
                >
                  {member.isFounder && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-[14px] text-text-secondary"
                  onClick={() =>
                    updateTeamMember(i, "isFounder", !member.isFounder)
                  }
                >
                  This is a founder
                </span>
              </label>
            </div>
          </div>
        ))}

        {teamMembers.length < 6 && (
          <button
            onClick={addTeamMember}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[15px] font-medium text-text-secondary transition-all duration-200 hover:bg-black/[0.03]"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <svg
              width="16"
              height="16"
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
            Add Team Member
          </button>
        )}

        <div className="mt-2">
          <FormLabel required>
            Why is this the right team to build this?
          </FormLabel>
          <TextArea
            value={whyThisTeam}
            onChange={(v) => setWhyThisTeam(v.slice(0, 300))}
            placeholder="What about your backgrounds, skills, and experiences makes this team uniquely positioned..."
            maxLength={300}
            rows={3}
          />
        </div>
      </div>
    </div>,

    // Step 5 — Pitch Materials
    <div key="s5">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Pitch Materials
      </h3>

      <div className="space-y-6">
        <div>
          <FormLabel required>Pitch Deck</FormLabel>
          <p className="text-text-muted text-[13px] mb-3">
            Your pitch deck will only be shown to matched investors who accept
            our NDA.
          </p>
          <FileUpload accept=".pdf" maxSizeMB={20} label="Drag and drop or click to upload PDF" />
        </div>

        <div>
          <FormLabel required>Video Pitch</FormLabel>
          <p className="text-text-muted text-[13px] mb-3">
            Your 60-second video pitch is required. This is how investors
            evaluate you on Nexus. Record yourself explaining your company as if
            you had one minute with a potential investor. Loom, YouTube, or Vimeo
            links accepted.
          </p>
          <TextInput
            value={videoUrl}
            onChange={setVideoUrl}
            placeholder="Loom, YouTube, or Vimeo URL"
          />
        </div>
      </div>
    </div>,

    // Step 6 — Investment Preferences
    <div key="s6">
      <h3
        className="text-[22px] font-normal text-text-primary mb-6"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Investment Preferences
      </h3>

      <div className="space-y-5">
        <div>
          <FormLabel required>Target Raise Amount</FormLabel>
          <TextInput
            value={raiseAmount}
            onChange={setRaiseAmount}
            placeholder="e.g. 1500000"
            prefix="$"
          />
        </div>

        <div>
          <FormLabel>Previously Raised</FormLabel>
          <TextInput
            value={previousRaise}
            onChange={setPreviousRaise}
            placeholder="e.g. 500000 or None"
            prefix="$"
          />
        </div>

        <div>
          <FormLabel>Previous Investors</FormLabel>
          <TextInput
            value={previousInvestors}
            onChange={setPreviousInvestors}
            placeholder="Comma separated (optional)"
          />
        </div>

        <div>
          <FormLabel required>
            What are you looking for in an investor?
          </FormLabel>
          <TextArea
            value={idealInvestor}
            onChange={setIdealInvestor}
            placeholder="Describe your ideal investor..."
            maxLength={300}
          />
        </div>

        <div>
          <FormLabel required>
            What tier of investor are you looking for?
          </FormLabel>
          <SelectInput
            options={INVESTOR_TIERS}
            value={investorTier}
            onChange={setInvestorTier}
            placeholder="Select investor tier"
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

        <div
          className="rounded-xl p-5"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Checkbox
            checked={acceptAccountability}
            onChange={setAcceptAccountability}
            label={
              <span className="text-[14px] leading-[1.6]">
                I understand that if my startup does not demonstrate meaningful
                traction within 30 days of acceptance, my profile may be removed
                from the platform.
              </span>
            }
          />
        </div>
      </div>
    </div>,
  ];

  const stepLabels = [
    "Company Basics",
    "Your Vision",
    "Traction & Metrics",
    "Your Team",
    "Pitch Materials",
    "Investment Preferences",
  ];

  return (
    <FormShell
      steps={steps}
      stepLabels={stepLabels}
      getEmail={() => website || "your address"}
    />
  );
}
