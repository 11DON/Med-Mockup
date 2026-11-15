import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./MessageCenter.module.css";

const CATEGORIES = ["Administration", "Medical", "Scheduling", "Other"];

// Screen 2: new message form
export default function NewMessage() {
  const { addThread } = useOutletContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: CATEGORIES[0], text: "" });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

const send = () => {
  if (!form.title.trim() || !form.text.trim()) {
    setError("Please enter a title and a message.");
    return;
  }
  addThread(form);
  navigate("..");
};

  return (
    <div className={styles.form}>
      <label htmlFor="msg-title">Title:</label>
      <input id="msg-title" value={form.title} onChange={update("title")} />

      <label htmlFor="msg-cat">Category:</label>
      <select id="msg-cat" value={form.category} onChange={update("category")}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>

      <label htmlFor="msg-text">Message:</label>
      <textarea id="msg-text" rows={9} placeholder="The message" value={form.text} onChange={update("text")} />

      <label htmlFor="msg-file">File:</label>
      <input id="msg-file" type="file" onChange={(e) => setFile(e.target.files[0] ?? null)} />

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.formButtons}>
        <button type="button" className={styles.send} onClick={send}>Send</button>
      </div>
    </div>
  );
}