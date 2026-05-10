import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

import ChatPanel from '../features/editor/components/ChatPanel';
import CodeEditor from '../features/editor/components/CodeEditor';
import PreviewFrame from '../features/editor/components/PreviewFrame';
import EditorToolbar from '../features/editor/components/EditorToolbar';

// Function to format HTML code safely
const formatHtmlCode = (html) => {
    if (!html || typeof html !== 'string') return "";
    try {
        let formatted = html;
        formatted = formatted.replace(/></g, ">\n<");
        formatted = formatted.replace(/{/g, "{\n");
        formatted = formatted.replace(/}/g, "\n}");
        
        let indent = 0;
        const lines = formatted.split("\n");
        const indented = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith("</") || trimmed.startsWith("}")) {
                indent = Math.max(0, indent - 1);
            }
            const result = "  ".repeat(indent) + trimmed;
            if ((trimmed.startsWith("<") && !trimmed.endsWith("/>") && !trimmed.startsWith("</")) || trimmed.startsWith("{")) {
                indent++;
            }
            return result;
        });
        return indented.join("\n").replace(/\n\n+/g, "\n"); 
    } catch (e) {
        return html;
    }
}

function WebsiteEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // 1. Initial React State - Safe defaults
    const [website, setWebsite] = useState(null); // null means loading, but internal structures will be safe
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [showCode, setShowCode] = useState(false);
    const [showFullPreview, setShowFullPreview] = useState(false);
    const [showChat, setShowChat] = useState(false);

    // 2. Safely extract nested data from backend response contract
    const extractData = (response) => {
        // Handle standardized nested { success: true, data: { ... } } or flat
        return response?.data?.data || response?.data || {};
    };

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true });
                const data = extractData(result);
                
                setWebsite(data);
                
                const safeCode = data?.latestCode || "<!-- No code available -->";
                setCode(formatHtmlCode(safeCode));
                
                // Defensive array fallback
                setMessages(Array.isArray(data?.conversation) ? data.conversation : []);
            } catch (error) {
                console.error("Editor Load Error:", error);
                setError(error?.response?.data?.message || "Failed to load website. It may have been deleted or you don't have access.");
            }
        };
        if (id) {
            handleGetWebsite();
        }
    }, [id]);

    useEffect(() => {
        if (!updateLoading) return;
        const i = setInterval(() => {
            setThinkingIndex((prev) => (prev + 1) % 5);
        }, 1200);
        return () => clearInterval(i);
    }, [updateLoading]);

    const handleUpdate = useCallback(async () => {
        const text = prompt;
        if (!text || !text.trim()) return;
        
        setUpdateLoading(true);
        setPrompt("");
        
        // Optimistic UI update safely
        setMessages((prev) => Array.isArray(prev) ? [...prev, { role: "user", content: text }] : [{ role: "user", content: text }]);
        
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt: text }, { withCredentials: true });
            const data = extractData(result);
            
            setUpdateLoading(false);
            setError(""); 
            
            setMessages((prev) => Array.isArray(prev) ? [...prev, { role: "ai", content: data?.message || "Update applied." }] : [{ role: "ai", content: data?.message || "Update applied." }]);
            
            const safeCode = data?.code || "<!-- No code returned -->";
            setCode(formatHtmlCode(safeCode));
            
        } catch (error) {
            setUpdateLoading(false);
            console.error("Update Error:", error);
            const errMsg = error?.response?.data?.message || "Failed to update website. Please try again.";
            setError(errMsg);
            setMessages((prev) => Array.isArray(prev) ? [...prev, { role: "ai", content: `Error: ${errMsg}` }] : [{ role: "ai", content: `Error: ${errMsg}` }]);
        }
    }, [prompt, id]);

    const handleDeploy = useCallback(async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true });
            const data = extractData(result);
            
            if (data?.url) {
                window.open(data.url, "_blank");
                setError(""); 
            } else {
                throw new Error("Missing deploy URL in response");
            }
        } catch (error) {
            console.error("Deploy Error:", error);
            setError(error?.response?.data?.message || "Failed to deploy website.");
        }
    }, [id]);

    const handleCodeChange = useCallback((v) => {
        setCode(v);
    }, []);

    // 3. Fallback UI states
    if (error && !website) {
        return (
            <div className='h-screen flex flex-col items-center justify-center bg-black text-red-400 p-6'>
                <p className="mb-4 text-center">{error}</p>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition"
                >
                  Back to Dashboard
                </button>
            </div>
        );
    }
    
    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-zinc-600 border-t-white rounded-full animate-spin"></div>
                  <p>Loading Editor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden relative'>
            {/* Desktop Chat Panel */}
            <ChatPanel 
              website={website}
              messages={messages}
              updateLoading={updateLoading}
              prompt={prompt}
              setPrompt={setPrompt}
              handleUpdate={handleUpdate}
              thinkingIndex={thinkingIndex}
              isMobileMode={false}
            />

            <div className='flex-1 flex flex-col min-w-0'>
                <EditorToolbar 
                  website={website}
                  onDeploy={handleDeploy}
                  onToggleChat={() => setShowChat(true)}
                  onToggleCode={() => setShowCode(true)}
                  onTogglePreview={() => setShowFullPreview(true)}
                />

                <PreviewFrame 
                  code={code}
                  isFullscreen={showFullPreview}
                  onCloseFullscreen={() => setShowFullPreview(false)}
                />
            </div>

            {/* Mobile Chat Panel Modal */}
            <ChatPanel 
              website={website}
              messages={messages}
              updateLoading={updateLoading}
              prompt={prompt}
              setPrompt={setPrompt}
              handleUpdate={handleUpdate}
              thinkingIndex={thinkingIndex}
              isMobileMode={true}
              showChat={showChat}
              setShowChat={setShowChat}
            />

            <CodeEditor 
              code={code}
              showCode={showCode}
              onClose={() => setShowCode(false)}
              onCodeChange={handleCodeChange}
            />
            
            {/* Floating Error Toast */}
            {error && website && (
              <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg z-[9999] max-w-sm flex items-start gap-2 backdrop-blur-md">
                <p className="text-sm flex-1">{error}</p>
                <button onClick={() => setError("")} className="mt-0.5 opacity-80 hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )}
        </div>
    );
}

export default WebsiteEditor;
