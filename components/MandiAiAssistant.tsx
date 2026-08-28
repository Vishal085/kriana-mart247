'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, RefreshCw, Trash2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function MandiAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste! I am **Vishal**, your KiranaMart247 AI assistant.\n\nAsk me about today's mandi wholesale rates, market trends, cheapest mandis, or grocery shopping!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Today's rice rate in Delhi?",
    "Which commodities are rising today?",
    "Cheapest mandi for mustard oil?",
    "Check my cart items",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (userText?: string) => {
    const messageToSend = userText || input;
    if (!messageToSend.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history,
        }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || "I'm having trouble fetching that rate right now. Please check [Today's Mandi Rates](/mandi-rates).",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Network connection issue. Please try asking again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat cleared! How can I assist you with today's mandi wholesale rates?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 flex h-[520px] w-[370px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all sm:w-[400px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-[#073B6F] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#39A9E8]/20 text-[#39A9E8] border border-[#39A9E8]/30">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  Vishal AI
                  <span className="flex h-2 w-2 rounded-full bg-[#72B82A]" />
                </div>
                <div className="text-[11px] text-[#39A9E8] font-medium">
                  Mandi Intelligence & Grocery
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear Conversation"
                className="rounded-full p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7FAFC]">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#073B6F] text-white rounded-br-none shadow-sm'
                        : 'border border-slate-200 bg-white text-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {m.content.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#0B5FA5] animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-[#39A9E8] animate-bounce [animation-delay:0.2s]" />
                    <span className="h-2 w-2 rounded-full bg-[#72B82A] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-slate-100 bg-white p-2.5">
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 transition hover:border-[#39A9E8] hover:bg-[#EAF5FC] hover:text-[#073B6F]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 bg-white p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Vishal about mandi rates..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#0B5FA5] focus:bg-white"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#073B6F] text-white shadow-sm transition hover:bg-[#0B5FA5] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Circular Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#073B6F] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#0B5FA5] focus:outline-none"
        aria-label="Open Vishal AI Assistant"
        title="Ask Vishal AI - Today's Wholesale Rates"
      >
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-white transition-transform duration-200" />
          ) : (
            <>
              <Bot className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#72B82A] opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#073B6F] bg-[#72B82A]" />
              </span>
            </>
          )}
        </div>

        {/* Hover Tooltip */}
        {!isOpen && (
          <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Ask Vishal AI 💬
          </span>
        )}
      </button>
    </div>
  );
}
