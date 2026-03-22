"use client";

import { useState } from "react";

export default function RecommendationsPage() {
  const weakSubjects = [
    { subject: "Data Structures", score: "45%" },
    { subject: "Intro to Computer Science", score: "38.5%" }
  ];

  const recommendedFocus = [
    { subject: "Intro to Computer Science", reason: "Critical prerequisite for upcoming modules. Attend review session on Thursday." },
    { subject: "Data Structures", reason: "Scores are trending slightly downwards. Recommended supplementary reading: Chapter 4 & 5." }
  ];

  const [chatInput, setChatInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I analyze your academic data to give you personalized study plans. What would you like to ask about your weak subjects or study materials?", isHtml: false }
  ]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const input = chatInput;
    const newMsgs = [...messages, { role: "user", text: input, isHtml: false }];
    setMessages(newMsgs);
    setChatInput("");
    setIsLoading(true);

    if (input.toLowerCase().includes("material") || input.toLowerCase().includes("note") || input.toLowerCase().includes("study") || input.toLowerCase().includes("request")) {
      setTimeout(() => {
        setMessages([...newMsgs, { 
          role: "ai", 
          text: `I've checked the repository! You can view recently uploaded course notes or submit a specific request to your faculty directly in the <a href="/materials" class="font-bold underline text-indigo-500 hover:text-indigo-700">Study Materials Menu</a>.`, 
          isHtml: true 
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const prompt = `You are a helpful AI academic advisor for university students. Keep your answers brief, friendly, and use plain text. Do NOT use markdown or asterisks for bolding. The student asks: ${input}`;
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();
      setMessages([...newMsgs, { role: "ai", text: data.text, isHtml: false }]);
    } catch (error: any) {
      setMessages([...newMsgs, { role: "ai", text: `OpenAI Error: ${error.message}`, isHtml: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Recommendations</h1>
        <p className="text-slate-600 mt-0.5">
          Personalized study materials, AI study guide, and academic chatbot.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Weak Subjects Overview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Subjects Needing Attention</h2>
            <div className="space-y-3">
              {weakSubjects.map((s, i) => (
                <div key={i} className="flex justify-between items-center bg-red-50 p-3 rounded-lg border border-red-100">
                  <span className="font-medium text-red-900">{s.subject}</span>
                  <span className="text-red-700 font-bold">{s.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Focus Recommendations */}
          <div className="bg-white p-6 rounded-xl border border-indigo-200 shadow-sm bg-indigo-50/10">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4 border-b border-indigo-100 pb-2 flex items-center gap-2">
              <span className="text-xl">🎯</span> Focus Priorities
            </h2>
            <div className="space-y-4">
              {recommendedFocus.map((rec, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                  <h4 className="font-bold text-slate-800">{rec.subject}</h4>
                  <p className="text-sm text-slate-600 mt-1">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Chatbot */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg text-lg">🤖</span>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Learning Assistant Bot</h2>
              <div className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.isHtml ? <div dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-slate-200 rounded-b-xl">
            <form onSubmit={handleChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about study materials, focus areas, etc..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isLoading ? "Thinking..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
