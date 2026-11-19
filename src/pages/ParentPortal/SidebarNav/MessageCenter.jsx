import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./MessageCenter.module.css";

const pad = (n) => String(n).padStart(2, "0");
export const fmtDate = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
export const fmtDateTime = (d) => {
  const h = d.getHours();
  return `${fmtDate(d)} ${pad(h % 12 || 12)}:${pad(d.getMinutes())}${h < 12 ? "AM" : "PM"}`;
};

const initialThreads = [
  {
    id: "1",
    title: "Payment Inquiry",
    category: "Administration",
    status: "Closed",
    openedAt: "17/11/2026",
    closedAt: "18/11/2026",
    messages: [
      { id: "m1", from: "me", name: "Me", at: "17/11/2026 08:00PM", text: "Hello, I have a question about my last invoice." },
      { id: "m2", from: "clinic", name: "Clinic (Amro)", at: "18/11/2026 10:00AM", text: "Hi! Your invoice has been corrected." },
      {id:"m3",from:"me",name:"Me", at:"18/11/2026 10:30AM",text:"Thanks"}
    ],
  },
];

// Layout route for /parent-portal/message-center.
// It holds the shared data and renders whichever of the three screens matches the URL.
export default function MessageCenter() {
  const [threads, setThreads] = useState(initialThreads);

  // returns the new thread's id so the form can open it
  const addThread = ({ title, category, text }) => {
    const id = String(Date.now());
    const now = new Date();
    setThreads((prev) => [
      {
        id, title, category, status: "Open",
        openedAt: fmtDate(now), closedAt: "",
        messages: [{ id: `m-${id}`, from: "me", name: "Me", at: fmtDateTime(now), text }],
      },
      ...prev,
    ]);
    return id;
  };

  const addReply = (threadId, text) => {
    const at = fmtDateTime(new Date());
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, messages: [...t.messages, { id: `m-${Date.now()}`, from: "me", name: "Me", at, text }] }
          : t,
      ),
    );
  };

  return (
    <div className={styles.root}>
      <Outlet context={{ threads, addThread, addReply }} />
    </div>
  );
}