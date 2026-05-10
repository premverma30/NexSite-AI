import React from 'react';
import { Code2, MessageSquare, Monitor, Rocket } from 'lucide-react';

function EditorToolbar({ website, onDeploy, onToggleChat, onToggleCode, onTogglePreview }) {
  if (!website) return null;

  return (
    <div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80'>
      <span className='text-xs text-zinc-400'>Live Preview</span>
      <div className='flex gap-2'>
        {!website.deployed && (
          <button 
            className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition'
            onClick={onDeploy}
          >
            <Rocket size={14} /> Deploy
          </button>
        )}
        
        <button className='p-2 lg:hidden' onClick={onToggleChat}>
          <MessageSquare size={18} />
        </button>

        <button className='p-2' onClick={onToggleCode}>
          <Code2 size={18} />
        </button>
        
        <button className='p-2' onClick={onTogglePreview}>
          <Monitor size={18} />
        </button>
      </div>
    </div>
  );
}

export default React.memo(EditorToolbar);
