import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

function PreviewFrame({ code, isFullscreen, onCloseFullscreen }) {
  const safeCode = typeof code === 'string' ? code : "<!-- No code available -->";

  return (
    <>
      <iframe 
        className='flex-1 w-full bg-white' 
        srcDoc={safeCode} 
        sandbox='allow-scripts allow-forms' 
        title="Live Preview"
      />

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
          >
            <iframe 
              className='w-full h-full bg-white' 
              srcDoc={safeCode} 
              sandbox='allow-scripts allow-forms'
              title="Fullscreen Preview"
            />
            <button 
              onClick={onCloseFullscreen} 
              className='absolute top-4 right-4 p-2 bg-black/70 hover:bg-black/90 transition text-white rounded-lg'
            >
              <X />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(PreviewFrame);
