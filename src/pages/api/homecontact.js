// src/pages/api/homecontact.js
export const prerender = false;

import { db } from "../../lib/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST({ request }) {
  let body;

  try {
    body = await request.json();
  } catch (e) {
    console.error("❌ Failed to parse JSON:", e.message);
    return new Response(JSON.stringify({ success: false, error: "Invalid JSON" }), {
      status: 400,
    });
  }

  if (!body || typeof body !== "object") {
    console.error("❌ Request body is empty or not an object.");
    return new Response(JSON.stringify({ success: false, error: "Malformed data" }), {
      status: 400,
    });
  }

  const { name, email, phone, company, service, message } = body;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      phone: phone || null,
      company: company || null,
      service: service || null,
      message,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Firestore write error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: "Firestore error" }),
      { status: 500 }
    );
  }
}
