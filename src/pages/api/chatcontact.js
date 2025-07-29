export const prerender = false;

import { db } from "../../lib/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST({ request }) {
  const { name, email, servicePath } = await request.json();

  if (!name || !email || !servicePath) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing name, email, or servicePath" }),
      { status: 400 }
    );
  }

  try {
    await addDoc(collection(db, "chatcontact"), {
      name,
      email,
      servicePath, 
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
