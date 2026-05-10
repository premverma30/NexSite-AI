import React from 'react';
import { Code2, MessageSquare, Monitor, Rocket, Download, Search } from 'lucide-react';
import { exportToZip } from '../../../utils/exportUtils';

function EditorToolbar({ website, onDeploy, onToggleChat, onToggleCode, onTogglePreview, onToggleSeo }) {
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

        <button 
          className='p-2 text-zinc-400 hover:text-white transition-colors' 
          onClick={() => exportToZip(website.title, website.latestCode)}
          title="Download Source (ZIP)"
        >
          <Download size={18} />
        </button>

        <button 
          className='p-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2' 
          onClick={onToggleSeo}
          title="AI SEO Audit"
        >
          <Search size={18} />
          <span className='hidden sm:inline text-[10px] font-bold uppercase tracking-widest'>SEO</span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(EditorToolbar);
