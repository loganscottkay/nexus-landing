"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";

const ease = [0.25, 0.4, 0.25, 1] as const;

/* ─── Fake Conversation Data (Founder / Luminary AI Perspective) ─── */
interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  firm: string;
  avatar: { initials: string; color: string };
  unread: boolean;
  lastMessageTime: string;
  lastMessagePreview: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Chen",
    firm: "Gradient Ventures",
    avatar: { initials: "SC", color: "#4A6CF7" },
    unread: true,
    lastMessageTime: "2h ago",
    lastMessagePreview: "Perfect. I will send a calendar invite. Talk soon!",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi Alex! I came across Luminary AI on Urgenc and your contract analysis platform is exactly what we have been looking for in our portfolio. Would love to learn more.",
        time: "Mon 10:30 AM",
      },
      {
        id: 2,
        sender: "me",
        text: "Thanks Sarah! Happy to share more. We are seeing incredible traction with legal teams - 180% MoM growth and our NLP pipeline handles contract analysis 10x faster than manual review.",
        time: "Mon 10:45 AM",
      },
      {
        id: 3,
        sender: "them",
        text: "That growth is impressive. How are you handling the enterprise sales cycle?",
        time: "Mon 11:02 AM",
      },
      {
        id: 4,
        sender: "me",
        text: "Great question. Average sales cycle is about 45 days for mid-market. We started a PLG motion where legal teams can try a free tier, which has been our biggest unlock.",
        time: "Mon 11:15 AM",
      },
      {
        id: 5,
        sender: "them",
        text: "Smart approach. I would love to schedule a deeper dive this week. Are you available Thursday?",
        time: "Tue 9:00 AM",
      },
      {
        id: 6,
        sender: "me",
        text: "Thursday at 2pm works perfectly for me. Looking forward to it!",
        time: "Tue 9:45 AM",
      },
      {
        id: 7,
        sender: "them",
        text: "Perfect. I will send a calendar invite. Talk soon!",
        time: "2h ago",
      },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    firm: "Lightspeed Venture Partners",
    avatar: { initials: "PS", color: "#059669" },
    unread: false,
    lastMessageTime: "Yesterday",
    lastMessagePreview:
      "That would be helpful actually. Could you send over your latest investor update and cap table summary?",
    messages: [
      {
        id: 1,
        sender: "me",
        text: "Hi Priya! Great chemistry call yesterday. Really appreciated your questions about our go-to-market.",
        time: "Mar 6",
      },
      {
        id: 2,
        sender: "them",
        text: "Likewise Alex! The product demo was impressive. I am going to share my notes with the team and circle back early next week.",
        time: "Mar 6",
      },
      {
        id: 3,
        sender: "me",
        text: "Sounds great. Happy to provide any additional materials you need for the partner discussion.",
        time: "Yesterday",
      },
      {
        id: 4,
        sender: "them",
        text: "That would be helpful actually. Could you send over your latest investor update and cap table summary?",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Marcus Webb",
    firm: "Founder Collective",
    avatar: { initials: "MW", color: "#7C5CFC" },
    unread: false,
    lastMessageTime: "3d ago",
    lastMessagePreview:
      "Great question Marcus. DocuSign focuses on signature workflows. We are building deep semantic understanding of contract language...",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey Alex, saw your profile on Urgenc. The contract analysis space is interesting. What makes Luminary different from DocuSign's AI features?",
        time: "Mar 3",
      },
      {
        id: 2,
        sender: "me",
        text: "Great question Marcus. DocuSign focuses on signature workflows. We are building deep semantic understanding of contract language - our model can identify risk clauses, compare against market standards, and suggest negotiations. Completely different use case.",
        time: "Mar 3",
      },
    ],
  },
];

export default function FounderMessagesPage() {
  const [activeId, setActiveId] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeId)!;

  /* Auto-resize textarea */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 96) + "px";
    }
  }, [messageText]);

  /* Scroll to bottom on conversation change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId]);

  const filtered = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.firm.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-base text-text-primary relative">
      <div className="noise-overlay" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-blue animate-blob-1 top-[5%] right-[15%]" />
        <div className="blob blob-lavender animate-blob-2 bottom-[20%] left-[8%]" />
        <div className="blob blob-peach animate-blob-3 top-[50%] right-[25%]" />
      </div>

      <Sidebar role="founder" activeLabel="Messages" />

      {/* Main content area */}
      <div className="flex-1 md:ml-[240px] relative z-10 flex h-screen">
        {/* ─── Left Panel: Conversations List ─── */}
        <div
          className="hidden md:flex w-[320px] flex-col border-r border-black/[0.06] shrink-0"
          style={{
            background: "rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(20px) saturate(1.2)",
            WebkitBackdropFilter: "blur(20px) saturate(1.2)",
          }}
        >
          {/* Header + Search */}
          <div className="p-5 pb-3">
            <h2
              className="text-[20px] font-semibold text-text-primary mb-3"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Messages
            </h2>
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full h-[40px] rounded-xl text-[14px] text-text-primary placeholder:text-text-muted outline-none pl-9 pr-3"
                style={{
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                }}
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((conv) => (
              <motion.button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 ${
                  activeId === conv.id
                    ? "bg-[#7C5CFC]/5 border-l-[3px]"
                    : "border-l-[3px] border-l-transparent hover:bg-black/[0.02]"
                }`}
                style={
                  activeId === conv.id
                    ? {
                        borderImage:
                          "linear-gradient(to bottom, #7C5CFC, #4A6CF7) 1",
                      }
                    : undefined
                }
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: conv.avatar.color }}
                  >
                    {conv.avatar.initials}
                  </div>
                  {conv.unread && (
                    <div
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#7C5CFC] ring-2 ring-white"
                      style={{
                        animation: "pulse-gentle 1.5s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[15px] leading-tight ${
                      conv.unread
                        ? "font-bold text-text-primary"
                        : "font-semibold text-text-primary"
                    }`}
                  >
                    {conv.name}
                  </p>
                  <p className="text-[12px] text-text-muted mt-0.5">
                    {conv.firm}
                  </p>
                  <p className="text-[13px] text-text-muted truncate mt-0.5">
                    {conv.lastMessagePreview}
                  </p>
                </div>
                {/* Timestamp */}
                <span className="text-[12px] text-text-muted shrink-0 self-start mt-0.5">
                  {conv.lastMessageTime}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ─── Right Panel: Active Conversation ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="flex items-center gap-3 px-6 py-4 border-b border-black/[0.06] shrink-0"
            style={{
              background: "rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(16px) saturate(1.2)",
              WebkitBackdropFilter: "blur(16px) saturate(1.2)",
            }}
          >
            {/* Mobile back button */}
            <button className="md:hidden mr-1" onClick={() => {}}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
              style={{ backgroundColor: activeConversation.avatar.color }}
            >
              {activeConversation.avatar.initials}
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-text-primary leading-tight">
                {activeConversation.name}
              </p>
              <p className="text-[13px] text-text-muted">
                {activeConversation.firm}
              </p>
            </div>
            <a
              href="#"
              className="ml-auto text-[14px] text-[#7C5CFC] hover:underline shrink-0"
            >
              View Profile
            </a>
          </motion.div>

          {/* Messages thread */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="max-w-[720px] mx-auto space-y-3">
              {activeConversation.messages.map((msg, i) => {
                const showTimestamp =
                  i === 0 ||
                  activeConversation.messages[i - 1].time !== msg.time;

                return (
                  <div key={msg.id}>
                    {showTimestamp && (
                      <p className="text-[12px] text-text-muted text-center my-4">
                        {msg.time}
                      </p>
                    )}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: i * 0.05,
                        ease,
                      }}
                      className={`flex ${
                        msg.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "me" ? (
                        <div
                          className="max-w-[70%] px-4 py-3 rounded-2xl rounded-br-md text-white text-[15px] leading-[1.6]"
                          style={{
                            background:
                              "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                          }}
                        >
                          {msg.text}
                        </div>
                      ) : (
                        <div
                          className="max-w-[70%] px-4 py-3 rounded-2xl rounded-bl-md text-text-primary text-[15px] leading-[1.6]"
                          style={{
                            background: "rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255, 255, 255, 0.5)",
                          }}
                        >
                          {msg.text}
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input bar */}
          <div className="px-4 pb-4 pt-2 shrink-0">
            <div
              className="flex items-end gap-3 rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255, 255, 255, 0.4)",
                backdropFilter: "blur(12px) saturate(1.2)",
                WebkitBackdropFilter: "blur(12px) saturate(1.2)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
              }}
            >
              <textarea
                ref={textareaRef}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setMessageText("");
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className="flex-1 bg-transparent outline-none resize-none text-[15px] text-text-primary placeholder:text-text-muted leading-[1.6] py-1"
                style={{ maxHeight: "96px" }}
              />
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 transition-shadow duration-250"
                style={{
                  background: "linear-gradient(135deg, #7C5CFC, #4A6CF7)",
                  boxShadow: messageText.trim()
                    ? "0 0 20px rgba(124, 92, 252, 0.45)"
                    : "0 2px 8px rgba(124, 92, 252, 0.2)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: conversation selector overlay */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-20 px-3 pb-2">
        <div
          className="flex gap-2 overflow-x-auto py-2 px-1 rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
          }}
        >
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl shrink-0 transition-colors ${
                activeId === conv.id
                  ? "bg-[#7C5CFC]/10"
                  : "bg-transparent"
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold relative"
                style={{ backgroundColor: conv.avatar.color }}
              >
                {conv.avatar.initials}
                {conv.unread && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#7C5CFC]" />
                )}
              </div>
              <span className="text-[13px] font-medium text-text-primary">
                {conv.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
