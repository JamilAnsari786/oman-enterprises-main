export const prerender = false;

import { db } from "../../lib/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST({ request }) {
  const body = await request.json();
  const { jobTitle, name, email, resume, reason } = body;

  if (!jobTitle || !name || !email || !resume || !reason) {
    return new Response(JSON.stringify({ success: false, error: "Missing fields" }), { status: 400 });
  }

  // Infer type from job title
  const isInternship = jobTitle.toLowerCase().includes("intern");
  const collectionName = isInternship ? "internship_applications" : "job_applications";

  try {
    await addDoc(collection(db, collectionName), {
      jobTitle,
      name,
      email,
      resume,
      reason,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Firestore error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
