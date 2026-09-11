'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  HelpCircle,
  Milk
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface DairyProduct {
  id: string;
  brand: string;
  name: string;
  variant?: string | null;
  unit: string;
  defaultRate: number;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface DraftItem {
  product: DairyProduct;
  qty: number;
}

interface Props {
  products: DairyProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyToCart?: (cart: Record<string, number>) => void;
}

const HINDI_NUMBER_MAP: Record<string, number> = {
  'ek': 1, 'do': 2, 'teen': 3, 'char': 4, 'chaar': 4, 'paanch': 5, 'panch': 5,
  'chhe': 6, 'chha': 6, 'saat': 7, 'sat': 7, 'aath': 8, 'ath': 8, 'nau': 9, 'no': 9,
  'das': 10, 'dus': 10, 'gyarah': 11, 'barah': 12, 'terah': 13, 'chaudah': 14,
  'pandrah': 15, 'solah': 16, 'satrah': 17, 'atharah': 18, 'unnis': 19,
  'bees': 20, 'bis': 20, 'pachis': 25, 'pachees': 25, 'tees': 30, 'paintees': 35,
  'chalees': 40, 'paintaalees': 45, 'pachaas': 50, 'saath': 60, 'sattar': 70,
  'assi': 80, 'nabbe': 90, 'sau': 100, 'aadha': 0.5, 'half': 0.5, 'dedh': 1.5, 'dhai': 2.5
};

export function AiVoiceDemandAssistant({ products, isOpen, onClose, onApplyToCart }: Props) {
  const router = useRouter();

  // Voice & Chat States
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  // Conversational Flow State
  const [draftItems, setDraftItems] = useState<DraftItem[]>([]);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [promptedProduct, setPromptedProduct] = useState<DairyProduct | null>(null);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial welcome turn when opened
  useEffect(() => {
    if (isOpen) {
      setSubmissionSuccess(null);
      setPendingConfirmation(false);
      const firstProduct = products.find(p => p.name.includes('Full Cream') && p.brand === 'Mother Dairy') || products[0];
      setPromptedProduct(firstProduct || null);

      const welcomeText = firstProduct
        ? `Namaste! 🙏 Main aapka KiranaMart Dairy Demand Assistant hoon.\n\nAap bolkar ya likhkar order bata sakte hain (jaise: "10 litre full cream aur 20 chhach de dena").\n\nBataiye, ${firstProduct.brand} ${firstProduct.name} ${firstProduct.variant ? `(${firstProduct.variant})` : ''} kitna chahiye?`
        : 'Namaste! 🙏 Main aapka KiranaMart Dairy Demand Assistant hoon. Aapko aaj kaun se dairy products aur kitni quantity chahiye?';

      setMessages([
        {
          id: 'welcome-1',
          sender: 'ai',
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (voiceEnabled) {
        speakText(welcomeText);
      }
    } else {
      stopListening();
    }
  }, [isOpen]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // primary Hindi/Hinglish recognition

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          if (transcript.trim()) {
            handleUserUtterance(transcript);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }
  }, [products, draftItems, pendingConfirmation, promptedProduct]);

  // Text-To-Speech function
  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // cancel prior speech

    // Clean markdown bold and emojis for cleaner speech
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/•/g, '')
      .replace(/[🙏🥛🛒✨🎉]/g, '')
      .replace(/₹/g, 'rupaye ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick Hindi voice if present, else default
    const voices = window.speechSynthesis.getVoices();
    const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
    if (hiVoice) utterance.voice = hiVoice;

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current) return;
    try {
      window.speechSynthesis.cancel();
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.warn('Recognition start exception:', e);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch {
      // ignore
    }
  };

  // ── NLP Parsing Engine ─────────────────────────────────────────

  const parseNumber = (str: string): number | null => {
    // 1. Direct digit regex
    const digitMatch = str.match(/\b\d+(\.\d+)?\b/);
    if (digitMatch) {
      const n = parseFloat(digitMatch[0]);
      if (!isNaN(n) && n > 0) return n;
    }
    // 2. Hindi word lookup
    const tokens = str.toLowerCase().split(/\s+/);
    for (const token of tokens) {
      if (HINDI_NUMBER_MAP[token]) {
        return HINDI_NUMBER_MAP[token];
      }
    }
    return null;
  };

  const matchProduct = (text: string): DairyProduct | null => {
    const clean = text.toLowerCase();

    // 1. Exact match attempts
    for (const p of products) {
      const pName = p.name.toLowerCase();
      const pBrand = p.brand.toLowerCase();
      const pVar = (p.variant || '').toLowerCase();

      // Check brand + name + variant
      if (clean.includes(pBrand) && clean.includes(pName)) {
        if (pVar && clean.includes(pVar)) return p;
        return p;
      }
    }

    // 2. Distinct product phrases
    if (clean.includes('full cream') || clean.includes('ful cream')) {
      if (clean.includes('1l') || clean.includes('1 litre') || clean.includes('ek litre')) {
        return products.find(p => p.name === 'Full Cream Milk' && p.variant === '1L') || products.find(p => p.name === 'Full Cream Milk') || null;
      }
      return products.find(p => p.name === 'Full Cream Milk' && p.variant === '500ml') || products.find(p => p.name === 'Full Cream Milk') || null;
    }

    if (clean.includes('cow milk') || clean.includes('cow') || clean.includes('gai ka')) {
      if (clean.includes('1l') || clean.includes('1 litre') || clean.includes('ek litre')) {
        return products.find(p => p.name === 'Cow Milk' && p.variant === '1L') || products.find(p => p.name === 'Cow Milk') || null;
      }
      return products.find(p => p.name === 'Cow Milk' && p.variant === '500ml') || products.find(p => p.name === 'Cow Milk') || null;
    }

    if (clean.includes('taaza') || clean.includes('taza')) {
      return products.find(p => p.name.includes('Taaza')) || null;
    }

    if (clean.includes('gold') || clean.includes('amul gold')) {
      return products.find(p => p.name.includes('Gold')) || null;
    }

    if (clean.includes('masala chhach') || clean.includes('masala chach')) {
      return products.find(p => p.brand === 'Madhusudan' && p.name.includes('Masala')) || null;
    }

    if (clean.includes('plain chhach') || clean.includes('plain chach') || clean.includes('chach plain')) {
      return products.find(p => p.brand === 'Madhusudan' && p.name.includes('Plain')) || null;
    }

    if (clean.includes('chhach') || clean.includes('chach') || clean.includes('chaas') || clean.includes('buttermilk')) {
      if (clean.includes('mother')) return products.find(p => p.brand === 'Mother Dairy' && p.name.includes('Chhach')) || null;
      if (clean.includes('madhusudan')) return products.find(p => p.brand === 'Madhusudan' && p.name.includes('Chhach')) || null;
      if (clean.includes('amul')) return products.find(p => p.brand === 'Amul' && p.name.includes('Chhach')) || null;
      if (clean.includes('arlys')) return products.find(p => p.brand === 'Arlys' && p.name.includes('Chhach')) || null;
      // Default to standard Mother Dairy Chhach
      return products.find(p => p.name.includes('Chhach')) || null;
    }

    if (clean.includes('dahi') || clean.includes('curd')) {
      if (clean.includes('400') || clean.includes('chaar sau')) {
        return products.find(p => p.name === 'Dahi' && (p.variant === '400g' || p.variant === '400ml')) || null;
      }
      if (clean.includes('1kg') || clean.includes('ek kilo') || clean.includes('1 kilo')) {
        return products.find(p => p.name === 'Dahi' && p.variant === '1kg') || null;
      }
      if (clean.includes('200') || clean.includes('do sau')) {
        return products.find(p => p.name === 'Dahi' && p.variant === '200g') || null;
      }
      if (clean.includes('madhusudan')) return products.find(p => p.brand === 'Madhusudan' && p.name === 'Dahi') || null;
      if (clean.includes('amul')) return products.find(p => p.brand === 'Amul' && p.name === 'Dahi') || null;
      if (clean.includes('arlys')) return products.find(p => p.brand === 'Arlys' && p.name === 'Dahi') || null;
      return products.find(p => p.name === 'Dahi') || null;
    }

    if (clean.includes('family milk') || clean.includes('family') || clean.includes('20 wala') || clean.includes('bees wala')) {
      return products.find(p => p.brand === 'Arlys' && p.name.includes('Family')) || null;
    }

    if (clean.includes('pro milk') || clean.includes('pro')) {
      return products.find(p => p.brand === 'Arlys' && p.name.includes('Pro')) || null;
    }

    if (clean.includes('dus wala milk') || clean.includes('10 wala milk') || (clean.includes('milk') && clean.includes('10'))) {
      return products.find(p => p.brand === 'Madhusudan' && p.name === 'Milk' && p.defaultRate === 10) ||
             products.find(p => p.brand === 'Arlys' && p.name === 'Milk' && p.defaultRate === 10) || null;
    }

    return null;
  };

  // Main Conversational Dispatcher
  const handleUserUtterance = (userInput: string) => {
    const raw = userInput.trim();
    if (!raw) return;

    // Add user message to UI
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    const lower = raw.toLowerCase();

    // ── 1. Check for Confirmation / Submission ──
    if (pendingConfirmation) {
      if (
        lower.includes('haan') || lower.includes('ha') || lower.includes('yes') ||
        lower.includes('submit') || lower.includes('kar do') || lower.includes('kardo') ||
        lower.includes('theek hai') || lower.includes('sahi') || lower.includes('confirm')
      ) {
        submitDemandViaAi();
        return;
      }
      if (lower.includes('nahi') || lower.includes('no') || lower.includes('cancel') || lower.includes('ruko')) {
        setPendingConfirmation(false);
        const reply = 'Theek hai, demand submit nahi ki gayi hai. Aap kya badalna chahte hain?';
        addAiMessage(reply);
        return;
      }
    }

    // ── 2. Check for Correction: "remove / hata do" ──
    if (lower.includes('hata do') || lower.includes('hatado') || lower.includes('remove') || lower.includes('delete') || lower.includes('nahi chahiye')) {
      const prodToRemove = matchProduct(lower);
      if (prodToRemove) {
        setDraftItems(prev => prev.filter(i => i.product.id !== prodToRemove.id));
        const reply = `${prodToRemove.brand} ${prodToRemove.name} ko demand se hata diya hai. Aur kuch change karna hai?`;
        addAiMessage(reply);
        return;
      } else {
        // Remove last item if not specified
        if (draftItems.length > 0) {
          const last = draftItems[draftItems.length - 1];
          setDraftItems(prev => prev.slice(0, -1));
          const reply = `${last.product.brand} ${last.product.name} ko hata diya hai.`;
          addAiMessage(reply);
          return;
        }
      }
    }

    // ── 3. Check for Correction: "10 nahi 15 kar do" / "X nahi Y" ──
    const correctionMatch = lower.match(/(?:nahi|ke badle|ki jagah)\s*(\d+|ek|do|teen|char|paanch|chhe|saat|aath|nau|das|pandrah|bees|tees|pachaas)/);
    if (correctionMatch) {
      const newQty = parseNumber(correctionMatch[1]);
      if (newQty && newQty > 0) {
        const prod = matchProduct(lower) || (draftItems.length > 0 ? draftItems[draftItems.length - 1].product : null);
        if (prod) {
          updateOrAddItem(prod, newQty);
          const reply = `Okay, ${prod.brand} ${prod.name} ki quantity update karke **${newQty} ${prod.unit}** kar di hai.\n\nAur koi product add karna hai?`;
          addAiMessage(reply);
          return;
        }
      }
    }

    // ── 4. Check for Final Submit Intent directly ("submit kar do", "bas ho gaya") ──
    if (
      lower === 'nahi' || lower === 'nahi bas' || lower === 'bas' || lower === 'kuch nahi' ||
      lower.includes('bas itna') || lower.includes('submit kar do') || lower.includes('order complete')
    ) {
      if (draftItems.length === 0) {
        addAiMessage('Aapki demand mein abhi koi product nahi hai. Pehle kam se kam 1 dairy product batayein.');
        return;
      }
      promptConfirmation();
      return;
    }

    // ── 5. Check for Multiple Products in one sentence ──
    // e.g. "10 litre full cream, 5 litre cow milk aur 20 chach de dena"
    const clauses = lower.split(/,|\baur\b|\band\b/);
    let matchedAnyCompound = false;

    if (clauses.length > 1) {
      const newAdditions: DraftItem[] = [];
      for (const clause of clauses) {
        const prod = matchProduct(clause);
        const qty = parseNumber(clause);
        if (prod && qty && qty > 0) {
          newAdditions.push({ product: prod, qty });
          matchedAnyCompound = true;
        }
      }

      if (matchedAnyCompound && newAdditions.length > 0) {
        setDraftItems(prev => {
          const map = new Map<string, DraftItem>();
          prev.forEach(item => map.set(item.product.id, { ...item }));
          newAdditions.forEach(item => map.set(item.product.id, item));
          return Array.from(map.values());
        });

        const summaryList = newAdditions
          .map(i => `• ${i.product.brand} ${i.product.name} — **${i.qty} ${i.product.unit}**`)
          .join('\n');

        const reply = `Maine ye products add kar diye hain:\n${summaryList}\n\nAur koi dairy product chahiye ya demand submit kar dein?`;
        addAiMessage(reply);
        return;
      }
    }

    // ── 6. Check for Single Product + Quantity ──
    const matchedProduct = matchProduct(lower);
    const parsedQty = parseNumber(lower);

    if (matchedProduct && parsedQty && parsedQty > 0) {
      updateOrAddItem(matchedProduct, parsedQty);
      suggestNextProduct(matchedProduct, parsedQty);
      return;
    }

    // ── 7. If user just answered quantity for the prompted product ──
    if (promptedProduct && parsedQty && parsedQty > 0 && !matchedProduct) {
      updateOrAddItem(promptedProduct, parsedQty);
      suggestNextProduct(promptedProduct, parsedQty);
      return;
    }

    // ── 8. If user mentioned only a product without quantity ──
    if (matchedProduct && (!parsedQty || parsedQty <= 0)) {
      setPromptedProduct(matchedProduct);
      const reply = `Aapko **${matchedProduct.brand} ${matchedProduct.name}** kitni quantity chahiye?`;
      addAiMessage(reply);
      return;
    }

    // ── 9. Fallback friendly clarification ──
    const fallbackReply = `Mujhe theek se samajh nahi aaya. Kripya product ka naam aur quantity batayein, jaise:\n• *"10 litre Full Cream"* ya\n• *"5 packet Dahi"*`;
    addAiMessage(fallbackReply);
  };

  const updateOrAddItem = (product: DairyProduct, qty: number) => {
    setDraftItems(prev => {
      const existingIdx = prev.findIndex(i => i.product.id === product.id);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx].qty = qty;
        return copy;
      } else {
        return [...prev, { product, qty }];
      }
    });
  };

  const suggestNextProduct = (justAdded: DairyProduct, qty: number) => {
    // Find next unselected popular item
    const unselected = products.filter(p => !draftItems.some(di => di.product.id === p.id) && p.id !== justAdded.id);

    // Prioritize variety: Dahi -> Chhach -> Madhusudan -> Arlys -> Amul
    let nextCandidate = unselected.find(p => p.name.includes('Dahi'));
    if (!nextCandidate) nextCandidate = unselected.find(p => p.name.includes('Chhach'));
    if (!nextCandidate) nextCandidate = unselected.find(p => p.brand !== justAdded.brand);
    if (!nextCandidate) nextCandidate = unselected[0];

    if (nextCandidate) {
      setPromptedProduct(nextCandidate);
      const reply = `Okay! **${justAdded.brand} ${justAdded.name} — ${qty} ${justAdded.unit}** note kar liya.\n\nAb **${nextCandidate.brand} ${nextCandidate.name}** kitna chahiye?`;
      addAiMessage(reply);
    } else {
      promptConfirmation();
    }
  };

  const promptConfirmation = () => {
    setPendingConfirmation(true);
    const list = draftItems
      .map(i => `• ${i.product.brand} ${i.product.name}${i.product.variant ? ` (${i.product.variant})` : ''} — **${i.qty} ${i.product.unit}** (₹${(Number(i.product.defaultRate) * i.qty).toFixed(0)})`)
      .join('\n');

    const totalEst = draftItems.reduce((s, i) => s + Number(i.product.defaultRate) * i.qty, 0);

    const reply = `Ye rahi aapki final demand:\n\n${list}\n\n**Estimated Total: ₹${totalEst.toFixed(2)}**\n\nKya main ise **Submit** kar du? (Haan / Nahi)`;
    addAiMessage(reply);
  };

  const addAiMessage = (text: string) => {
    const msg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, msg]);
    if (voiceEnabled) {
      speakText(text);
    }
  };

  // Real Backend Demand Submission
  const submitDemandViaAi = async () => {
    if (draftItems.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const itemsPayload = draftItems.map(item => ({
        dairyProductId: item.product.id,
        requestedQty: item.qty,
      }));

      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
          notes: 'Created via AI Voice Assistant',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit demand');
      }

      const demandNumber = data.demand?.demandNumber || 'Success';
      setSubmissionSuccess(demandNumber);

      // Also apply to parent cart if available
      if (onApplyToCart) {
        const cartMap: Record<string, number> = {};
        draftItems.forEach(i => { cartMap[i.product.id] = i.qty; });
        onApplyToCart(cartMap);
      }

      const successText = `🎉 Mubarak ho! Demand #${demandNumber} kamyabi se submit ho gayi hai.\n\nStatus: Pending (Admin Review). Ab aap Demand History mein ise track kar sakte hain.`;
      addAiMessage(successText);

      setTimeout(() => {
        router.push('/dashboard/seller/demands');
      }, 2500);
    } catch (err: any) {
      const errMsg = `Submission error: ${err.message || 'Demand create karne mein dikkat aayi.'}`;
      addAiMessage(errMsg);
    } finally {
      setIsSubmitting(false);
      setPendingConfirmation(false);
    }
  };

  if (!isOpen) return null;

  const totalEstAmount = draftItems.reduce((sum, item) => sum + Number(item.product.defaultRate) * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[90vh] max-h-[720px] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#073B6F] via-[#0B5FA5] to-[#1E88E5] text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
              {isListening && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight">AI Voice Demand Assistant</h2>
                <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium">
                Bolkar ya likhkar dairy demand banayein (Hindi / English / Hinglish)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) window.speechSynthesis?.cancel();
              }}
              className={`p-2 rounded-xl border transition ${
                voiceEnabled
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-white/10 border-white/10 text-white/50'
              }`}
              title={voiceEnabled ? 'Voice Responses ON' : 'Voice Responses MUTED'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Draft Demand Tray (Top Ribbon) */}
        {draftItems.length > 0 && (
          <div className="bg-blue-50/80 border-b border-blue-100 p-3 px-4 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#073B6F] shrink-0">
                Draft ({draftItems.length}):
              </span>
              {draftItems.map((item) => (
                <div
                  key={item.product.id}
                  className="inline-flex items-center gap-1.5 bg-white border border-blue-200 px-2.5 py-1 rounded-lg text-xs shrink-0 shadow-2xs"
                >
                  <span className="font-bold text-slate-800 truncate max-w-[120px]">
                    {item.product.name}
                  </span>
                  <span className="font-black text-[#073B6F] bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                    {item.qty} {item.product.unit}
                  </span>
                  <button
                    onClick={() => setDraftItems(prev => prev.filter(i => i.product.id !== item.product.id))}
                    className="text-slate-400 hover:text-red-600 ml-0.5"
                    title="Remove product"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="text-right shrink-0 pl-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total</span>
              <span className="text-xs font-black text-[#073B6F]">₹{totalEstAmount.toFixed(0)}</span>
            </div>
          </div>
        )}

        {/* Chat History Panel */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-2xs whitespace-pre-wrap leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#073B6F] text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isListening && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3 text-xs w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="font-bold">Aapki awaaz sun raha hoon...</span>
              <span className="text-[11px] text-amber-700 italic">&ldquo;10 litre full cream...&rdquo;</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] shrink-0">
          <span className="text-slate-400 font-bold shrink-0">Suggestions:</span>
          <button
            onClick={() => handleUserUtterance('10 litre Mother Dairy Full Cream')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#073B6F] text-slate-600 transition shrink-0 font-medium"
          >
            &ldquo;10L Full Cream&rdquo;
          </button>
          <button
            onClick={() => handleUserUtterance('20 packet Madhusudan Chhach Plain')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#073B6F] text-slate-600 transition shrink-0 font-medium"
          >
            &ldquo;20 Chhach Plain&rdquo;
          </button>
          <button
            onClick={() => handleUserUtterance('5 packet Dahi 400g')}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#073B6F] text-slate-600 transition shrink-0 font-medium"
          >
            &ldquo;5 Dahi 400g&rdquo;
          </button>
          <button
            onClick={() => handleUserUtterance('Haan, submit kar do')}
            className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition shrink-0 font-bold"
          >
            &ldquo;Submit kar do&rdquo;
          </button>
        </div>

        {/* Input Bar with Mic Control */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserUtterance(inputText);
            }}
            className="flex items-center gap-2"
          >
            {speechSupported ? (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-3 rounded-2xl flex items-center justify-center transition shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-100'
                    : 'bg-blue-50 text-[#073B6F] hover:bg-[#073B6F] hover:text-white border border-blue-200'
                }`}
                title={isListening ? 'Stop Listening' : 'Tap to Speak'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            ) : (
              <div
                className="p-3 rounded-2xl bg-slate-100 text-slate-400"
                title="Browser does not support Speech Recognition. Use text input."
              >
                <MicOff className="w-5 h-5" />
              </div>
            )}

            <input
              type="text"
              placeholder={isListening ? 'Listening... Bol sakte hain...' : 'Yahan type karein ya mic dabakar bolein...'}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#073B6F] focus:ring-2 focus:ring-[#073B6F]/10"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#073B6F] hover:bg-[#0B5FA5] text-white disabled:opacity-40 transition shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Confirmation Button if pending */}
          {pendingConfirmation && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold text-slate-600">
                Ready to submit?
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPendingConfirmation(false)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
                >
                  Edit More
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={submitDemandViaAi}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirm &amp; Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AiVoiceDemandAssistant;
