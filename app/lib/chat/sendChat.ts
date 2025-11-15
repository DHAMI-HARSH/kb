import { firebaseDB } from "../firebase.client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const API_URL = "https://udhbhav-2025-hackhathon.onrender.com/chat/";

interface ChatPayload {
  user_id: string;
  doc_id: string;
  query: string;
  idToken?: string | null;
}

export async function sendChatMessage({ user_id, doc_id, query, idToken }: ChatPayload) {
  try {
    // 1️⃣ Save user message
    await addDoc(collection(firebaseDB, "chat_messages"), {
      user_id,
      doc_id,
      role: "user",
      text: query,
      created_at: serverTimestamp(),
    });

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (idToken) headers["Authorization"] = `Bearer ${idToken}`;

    // 2️⃣ Backend call
    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ user_id, doc_id, query }),
    });

    const raw = await response.text();
    console.log("🔥 RAW BACKEND:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("❌ JSON PARSE ERROR — RAW:", raw);
      throw new Error("Invalid JSON from backend");
    }

    console.log("🔥 PARSED:", data);

    // 3️⃣ Extract AI response — STRICT
    const aiReply = data.ai_response;
    if (!aiReply) {
      console.error("❌ ai_response missing:", data);
      throw new Error("Backend missing ai_response");
    }

    // No sources in your backend
    const sources: string[] = [];

    // 4️⃣ Save AI message
    await addDoc(collection(firebaseDB, "chat_messages"), {
      user_id,
      doc_id,
      role: "assistant",
      text: aiReply,
      sources,
      created_at: serverTimestamp(),
    });

    return { reply: aiReply, sources, error: false };
  } catch (err) {
    console.error("❌ Chat send error:", err);
    return {
      reply: "⚠️ AI service unavailable.",
      sources: [],
      error: true,
    };
  }
}
