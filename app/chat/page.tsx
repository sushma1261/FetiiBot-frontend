"use client";

import { useState } from "react";
import { authFetch } from "../lib/api";
import { useAuth } from "../utils/AuthContext";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Ask question
  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);

    // Append user question
    setChat((prev) => [...prev, { role: "user", text: question }]);
    const q = question;
    setQuestion("");

    const res = await authFetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, userId: user?.uid }),
    });

    const data = await res.json();

    setChat((prev) => [
      ...prev,
      { role: "bot", text: data.answer || "⚠️ No answer returned" },
    ]);

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl flex flex-col">
        <h1 className="text-xl font-bold mb-4">
          Chat about the trip with Fetii Bot
        </h1>

        {chat.length > 0 && (
          <div className="flex-1 overflow-y-auto border p-4 rounded-lg mb-4 h-96 bg-gray-50">
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p className="text-gray-500">Thinking...</p>}
          </div>
        )}

        <div className="flex gap-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 border rounded-lg px-3 py-2"
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
