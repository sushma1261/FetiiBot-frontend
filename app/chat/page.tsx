"use client";

import axios from "axios";
import { useState } from "react";

type Snippet = { id: string; text: string; score?: number; metadata?: unknown };
type Msg = { role: "user" | "assistant"; text: string; snippets?: Snippet[] };

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const form = new FormData();
    form.append("file", e.target.files[0]);
    const resp = await axios.post("http://localhost:8080/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSessionId(resp.data.sessionId);
    alert("File uploaded and indexed!");
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    const userMsg: Msg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const resp = await axios.post("http://localhost:8080/chat", {
      sessionId,
      message: input,
    });

    const ans = resp.data.answer ?? "[no answer]";
    const snippets = resp.data.snippets ?? [];
    setMessages((m) => [...m, { role: "assistant", text: ans, snippets }]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Fetii AI Chatbot</h1>

      {!sessionId && <input type="file" onChange={uploadFile} />}

      {sessionId && (
        <>
          <div
            style={{
              border: "1px solid #ccc",
              padding: 10,
              height: 400,
              overflowY: "auto",
              marginBottom: 10,
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ margin: "8px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background: m.role === "user" ? "#0070f3" : "#f1f1f1",
                      color: m.role === "user" ? "#fff" : "#000",
                      padding: "8px 12px",
                      borderRadius: 12,
                      maxWidth: "80%",
                    }}
                  >
                    {m.text}
                  </div>
                </div>

                {m.role === "assistant" &&
                  m.snippets &&
                  m.snippets.length > 0 && (
                    <div
                      style={{
                        marginTop: 4,
                        marginLeft: "1rem",
                        fontSize: "0.85rem",
                        color: "#555",
                      }}
                    >
                      <strong>Context used:</strong>
                      <ul style={{ paddingLeft: "1.2rem" }}>
                        {m.snippets.map((s) => (
                          <li key={s.id}>
                            <code>{s.text.slice(0, 120)}...</code>
                            {s.score && (
                              <span style={{ color: "#999" }}>
                                {" "}
                                ({s.score.toFixed(2)})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1 }}
              placeholder="Ask a question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}
