import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const ChatBot = ({ onActionComplete = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Campus360 Assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    // Add user message
    setMessages((prev) => [...prev, {
      id: prev.length + 1,
      text: userMessage,
      sender: "user"
    }]);
    setInput("");
    setIsLoading(true);

    try {
      const baseURL = import.meta.env.VITE_CHATBOT_URL || "http://localhost:8001";
      const response = await fetch(`${baseURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          message: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        text: data.reply,
        sender: "bot"
      }]);

      // Trigger frontend update if action was successful
      if (onActionComplete && data.reply.includes("✅")) {
        if (userMessage.toLowerCase().includes("library")) {
          onActionComplete("library_booking");
        } else if (userMessage.toLowerCase().includes("washroom")) {
          onActionComplete("washroom_report");
        } else if (userMessage.toLowerCase().includes("sports")) {
          onActionComplete("sports_booking");
        }
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        text: "Sorry, I'm having trouble responding. Please try again.",
        sender: "bot"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 z-40 hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-h-96 bg-slate-900 rounded-lg shadow-2xl border border-slate-700 flex flex-col z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Campus360 Assistant</h3>
            <p className="text-xs opacity-90">Always here to help!</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                    message.sender === "user"
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-slate-800 text-slate-100 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-100 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-600 text-white rounded-lg p-2 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
