import { firebaseDB } from "../firebase.client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const API_URL = (process.env.NEXT_PUBLIC_CHAT_API_URL || "https://udhbhav-2025-hackhathon.onrender.com/chat/").replace(/\/$/, "") + "/";

interface ChatPayload {
  user_id: string;
  doc_id: string;
  query: string;
  // optional id token for authenticated backend endpoints
  idToken?: string | null;
}

export async function sendChatMessage({ user_id, doc_id, query, idToken }: ChatPayload) {
  try {
    // ---------------------------------------------------
    // 1️⃣ Save USER message to Firestore
    // ---------------------------------------------------
    await addDoc(collection(firebaseDB, "chat_messages"), {
      user_id,
      doc_id,
      role: "user",
      text: query,
      created_at: serverTimestamp(),
    });

    // ---------------------------------------------------
    // 2️⃣ Send request to your AI backend
    // ---------------------------------------------------
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (idToken) {
      headers["Authorization"] = `Bearer ${idToken}`;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ user_id, doc_id, query }),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    let data: any;
    try {
      data = await response.json();
    } catch {
      throw new Error("Backend did not return valid JSON.");
    }

    const aiReply: string = data.reply ?? "AI did not return a message.";
    const sources: string[] = Array.isArray(data.sources) ? data.sources : [];

    // ---------------------------------------------------
    // 3️⃣ Save AI response to Firestore
    // ---------------------------------------------------
    await addDoc(collection(firebaseDB, "chat_messages"), {
      user_id,
      doc_id,
      role: "assistant",
      text: aiReply,
      sources,
      created_at: serverTimestamp(),
    });

    // ✔ Return strongly typed result
    return {
      reply: aiReply,
      sources,
      error: false,
    };
  } catch (error) {
    console.error("Chat send error:", error);

    return {
      reply: "⚠️ AI service is unavailable right now.",
      sources: [],
      error: true,
    };
  }
}
