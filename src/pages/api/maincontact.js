export const prerender = false;

import { db } from "../../lib/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST({ request }) {
  const body = await request.json();
  const { name, email, phone, company, service, budget, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
  }

  try {
    await addDoc(collection(db, "maincontact"), {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
