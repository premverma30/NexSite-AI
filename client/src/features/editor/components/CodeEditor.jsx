import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, showCode, onClose, onCodeChange }) {
  return (
    <AnimatePresence>
      {showCode && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
        >
          <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
            <span className='text-sm font-medium text-white'>index.html</span>
            <button onClick={onClose} className="text-zinc-400 hover:text-white transition">
              <X size={18} />
            </button>
          </div>
          <Editor
            theme='vs-dark'
            value={code}
            language='html'
            onChange={onCodeChange}
            options={{
              wordWrap: 'on',
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              formatOnPaste: true,
              autoIndent: 'full',
              scrollBeyondLastLine: false,
              padding: { top: 16, bottom: 16 }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Memoize to prevent Monaco re-renders on every keystroke in chat
export default React.memo(CodeEditor);
