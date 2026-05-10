import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const thinkingSteps = [
    "Understanding your request…",
    "Planning layout changes…",
    "Improving responsiveness…",
    "Applying animations…",
    "Finalizing update…",
];

function Header({ title, onClose }) {
  return (
    <div className='h-14 px-4 flex items-center justify-between border-b border-white/10'>
        <span className='font-semibold truncate text-white'>{title || "Website"}</span>
        {onClose && <button onClick={onClose}><X size={18} color='white'/></button>}
    </div>
  );
}

function ChatContent({ messages, updateLoading, prompt, setPrompt, handleUpdate, thinkingIndex }) {
  const safeMessages = Array.isArray(messages) ? messages : [];

  return (
    <>
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
        {safeMessages.map((m, i) => (
            <div
                key={i}
                className={`max-w-[85%] ${m?.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
                <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m?.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 border border-white/10 text-zinc-200"
                        }`}
                >
                    {m?.content || ""}
                </div>
            </div>
        ))}

        {updateLoading && (
            <div className='max-w-[85%] mr-auto'>
                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
                  {thinkingSteps[thinkingIndex]}
                </div>
            </div>
        )}
      </div>
      <div className='p-3 border-t border-white/10'>
          <div className='flex gap-2'>
              <input 
                placeholder='Describe Changes...' 
                className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm text-white outline-none focus:ring-1 focus:ring-white/20 transition' 
                onChange={(e) => setPrompt(e.target.value)} 
                value={prompt} 
                onKeyDown={(e) => e.key === 'Enter' && !updateLoading && handleUpdate()}
              />
              <button 
                className='px-4 py-3 rounded-2xl bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition' 
                disabled={updateLoading || !prompt.trim()} 
                onClick={handleUpdate}
              >
                <Send size={14} />
              </button>
          </div>
      </div>
    </>
  );
}

function ChatPanel({ website, messages, updateLoading, prompt, setPrompt, handleUpdate, thinkingIndex, isMobileMode, showChat, setShowChat }) {
  if (isMobileMode) {
    return (
      <AnimatePresence>
          {showChat && (
              <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className="fixed inset-0 z-[9999] bg-black flex flex-col"
              >
                  <Header title={website?.title} onClose={() => setShowChat(false)} />
                  <ChatContent 
                    messages={messages} 
                    updateLoading={updateLoading} 
                    prompt={prompt} 
                    setPrompt={setPrompt} 
                    handleUpdate={handleUpdate} 
                    thinkingIndex={thinkingIndex} 
                  />
              </motion.div>
          )}
      </AnimatePresence>
    );
  }

  // Desktop mode
  return (
    <aside className='hidden lg:flex w-95 flex-col border-r border-white/10 bg-black/80'>
        <Header title={website?.title} />
        <ChatContent 
          messages={messages} 
          updateLoading={updateLoading} 
          prompt={prompt} 
          setPrompt={setPrompt} 
          handleUpdate={handleUpdate} 
          thinkingIndex={thinkingIndex} 
        />
    </aside>
  );
}

export default ChatPanel;
