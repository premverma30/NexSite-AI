import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, Star } from 'lucide-react';

function SeoAuditSidebar({ isOpen, onClose, auditData, loading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Star size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">AI SEO Audit</h2>
                  <p className="text-xs text-zinc-400">Powered by NexSite Intelligence</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 py-20">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star size={24} className="text-indigo-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">Scanning Code...</p>
                    <p className="text-xs text-zinc-500 mt-1">Our AI is analyzing your SEO structure</p>
                  </div>
                </div>
              ) : auditData ? (
                <>
                  {/* Score Circle */}
                  <div className="flex flex-col items-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-white/5"
                        />
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="58"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={364.4}
                          initial={{ strokeDashoffset: 364.4 }}
                          animate={{ strokeDashoffset: 364.4 - (364.4 * auditData.score) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={
                            auditData.score >= 80 ? "text-emerald-500" :
                            auditData.score >= 50 ? "text-amber-500" : "text-rose-500"
                          }
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{auditData.score}</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Score</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm font-medium text-zinc-300">
                      {auditData.score >= 80 ? "Excellent SEO Health" :
                       auditData.score >= 50 ? "Needs Improvement" : "Critical SEO Issues"}
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    {/* Critical */}
                    {auditData.critical?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                          <AlertCircle size={14} /> Critical Issues
                        </h3>
                        <div className="space-y-2">
                          {auditData.critical.map((item, i) => (
                            <div key={i} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-sm text-rose-200">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Warnings */}
                    {auditData.warnings?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                          <HelpCircle size={14} /> Warnings
                        </h3>
                        <div className="space-y-2">
                          {auditData.warnings.map((item, i) => (
                            <div key={i} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-sm text-amber-200">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {auditData.suggestions?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                          <ArrowRight size={14} /> AI Recommendations
                        </h3>
                        <div className="space-y-2">
                          {auditData.suggestions.map((item, i) => (
                            <div key={i} className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-sm text-zinc-300">
                              <span className="text-indigo-400 font-bold mr-2">{i + 1}.</span> {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Passed */}
                    {auditData.passed?.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 size={14} /> Passed Checks
                        </h3>
                        <div className="space-y-2 opacity-60">
                          {auditData.passed.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-emerald-200 px-1">
                              <CheckCircle2 size={12} className="shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-zinc-500">No audit data available. Click scan to begin.</p>
                </div>
              )}
            </div>

            <div className="p-6 bg-black/40 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:scale-[1.02] transition-transform"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SeoAuditSidebar;
