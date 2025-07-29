import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Clock } from "lucide-react";

// Chat flow steps
const steps = {
  start: {
    text: "Which service are you interested in?",
    options: [
      { label: "Staffing & Recruitment", next: "staffing" },
      { label: "IT & Digital Marketing", next: "it" },
      { label: "Business Consulting", next: "consulting" },
      { label: "Semiconductor Imports", next: "semiconductor" },
      { label: "E-commerce & Wholesale", next: "ecommerce" },
      { label: "Corporate Gifting", next: "gifting" },
      { label: "Clothing & Apparel", next: "apparel" },
      { label: "Backpacks & Bags", next: "bags" },
    ],
  },
  staffing: {
    text: "Are you hiring locally or PAN India?",
    options: [
      { label: "Locally", next: "done" },
      { label: "PAN India", next: "done" },
    ],
  },
  it: {
    text: "Are you looking for web, mobile, or digital marketing services?",
    options: [
      { label: "Web", next: "done" },
      { label: "Mobile", next: "done" },
      { label: "Marketing", next: "done" },
    ],
  },
  consulting: {
    text: "What area of business consulting are you interested in?",
    options: [
      { label: "Company Registration", next: "done" },
      { label: "Taxation & Compliance", next: "done" },
    ],
  },
  semiconductor: {
    text: "What support do you need with semiconductors?",
    options: [
      { label: "Import Support", next: "done" },
      { label: "Sourcing", next: "done" },
      { label: "B2B Supply", next: "done" },
    ],
  },
  ecommerce: {
    text: "What are you looking for in e-commerce or wholesale?",
    options: [
      { label: "Retail Support", next: "done" },
      { label: "Bulk Supply", next: "done" },
    ],
  },
  gifting: {
    text: "What type of corporate gifting do you need?",
    options: [
      { label: "Promotional Products", next: "done" },
      { label: "Custom Merchandise", next: "done" },
    ],
  },
  apparel: {
    text: "Are you looking for uniforms, custom t-shirts, or fabric supply?",
    options: [
      { label: "Uniforms", next: "done" },
      { label: "T-Shirts", next: "done" },
      { label: "Bulk Fabric", next: "done" },
    ],
  },
  bags: {
    text: "Please choose your requirement:",
    options: [
      { label: "School Backpacks", next: "done" },
      { label: "Corporate Bags", next: "done" },
      { label: "Custom Branding", next: "done" },
    ],
  },
  done: {
    text: "✅ Thanks! Our team will get back to you shortly. Would you like to leave your contact details?",
    options: [
      { label: "Yes", next: "collectInfo" },
      { label: "No", next: "thankyou" },
    ],
  },
  collectInfo: {
    text: "Please share your Name and Email. Our team will contact you shortly.",
    options: [],
  },
  thankyou: {
    text: "✅ Noted. Have a great day!",
    options: [],
  },
};

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", stepKey: "start", time: formatTime() },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  const containerRef = useRef(null);

  const currentStep = steps[messages[messages.length - 1].stepKey];

  const handleOption = (label, nextStep) => {
    const time = formatTime();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: label, time },
      { role: "bot", stepKey: nextStep, time: formatTime() },
    ]);
  };

  const goBack = () => {
    const lastBotMsgIndex = messages
      .map((m) => m.role)
      .lastIndexOf("bot", messages.length - 2);
    setMessages(messages.slice(0, lastBotMsgIndex + 1));
    setInfoSubmitted(false);
  };

  const reset = () => {
    setMessages([{ role: "bot", stepKey: "start", time: formatTime() }]);
    setName("");
    setEmail("");
    setInfoSubmitted(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-[#1877F2] hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-transform hover:scale-105"
        onClick={() => setOpen(!open)}
        aria-label="Toggle ChatBot"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col animate-fade-in">
          <div className="bg-[#1877F2] text-white text-sm font-semibold px-4 py-3 flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex-1 p-4 space-y-3 text-sm overflow-y-auto max-h-96"
          >
            {messages.map((msg, i) => {
              if (msg.role === "bot") {
                const step = steps[msg.stepKey];
                return (
                  <div key={i} className="text-left">
                    <div className="inline-block bg-gray-100 text-gray-800 p-3 rounded-lg">
                      {step.text}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} /> {msg.time}
                    </div>

                    {i === messages.length - 1 && step.options.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {step.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleOption(opt.label, opt.next)}
                            className="px-3 py-1 text-xs font-medium bg-blue-50 text-[#1877F2] border border-blue-200 rounded-lg hover:bg-blue-100"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.stepKey === "collectInfo" && !infoSubmitted && (
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const time = formatTime();

                          // ✅ Construct the service path from all previous user answers
                          const servicePath = messages
                            .filter((m) => m.role === "user" && m.text)
                            .map((m) => m.text)
                            .join(" → ");

                          try {
                            const res = await fetch("/api/chatcontact", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ name, email, servicePath }),
                            });

                            if (!res.ok) {
                              throw new Error("Failed to submit contact details.");
                            }

                            setMessages((prev) => [
                              ...prev,
                              {
                                role: "user",
                                text: `Name: ${name}, Email: ${email}`,
                                time,
                              },
                              {
                                role: "bot",
                                stepKey: "thankyou",
                                time: formatTime(),
                              },
                            ]);

                            setInfoSubmitted(true);
                            setName("");
                            setEmail("");
                          } catch (err) {
                            console.error("Error submitting contact:", err);
                            alert("Something went wrong. Please try again.");
                          }
                        }}
                        className="mt-3 flex flex-col gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border rounded px-3 py-2 text-sm w-full"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border rounded px-3 py-2 text-sm w-full"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-[#1877F2] text-white text-sm py-2 rounded hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </form>
                    )}

                    {msg.stepKey === "collectInfo" && infoSubmitted && (
                      <div className="mt-2 text-green-600 text-sm">
                        ✅ Details submitted!
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={i} className="text-right">
                  <div className="inline-block bg-blue-100 text-blue-900 p-3 rounded-lg">
                    {msg.text}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 flex justify-end items-center gap-1">
                    <Clock size={12} /> {msg.time}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t text-right">
            {messages.length > 2 &&
              messages[messages.length - 1].stepKey !== "thankyou" &&
              messages[messages.length - 1].stepKey !== "collectInfo" &&
              messages[messages.length - 1].stepKey !== "start" && (
                <button
                  onClick={goBack}
                  className="text-[#1877F2] hover:underline text-sm mr-4"
                >
                  ← Back
                </button>
              )}
            {["thankyou", "collectInfo"].includes(
              messages[messages.length - 1].stepKey
            ) && (
              <button
                onClick={reset}
                className="text-[#1877F2] hover:underline text-sm"
              >
                ↺ Restart
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
