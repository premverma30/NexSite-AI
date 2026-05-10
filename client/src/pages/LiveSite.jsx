import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'

function LiveSite() {
    const { id } = useParams()  // id is the slug here
    const navigate = useNavigate()
    const [html, setHtml] = useState("")
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!id) {
            setNotFound(true)
            setLoading(false)
            return
        }

        const handleGetWebsite = async () => {
            try {
                setLoading(true)
                setError("")
                
                // Use the correct backend route: /api/website/get-by-slug/:slug
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`)
                
                // Backend wraps in { success: true, data: { ... } }
                const websiteData = result?.data?.data || result?.data
                
                if (!websiteData?.latestCode) {
                    setNotFound(true)
                    return
                }
                
                setHtml(websiteData.latestCode)
            } catch (err) {
                console.error("LiveSite fetch error:", err)
                if (err?.response?.status === 404) {
                    setNotFound(true)
                } else {
                    setError(err?.response?.data?.message || "Failed to load website")
                }
            } finally {
                setLoading(false)
            }
        }

        handleGetWebsite()
    }, [id])

    // Loading state
    if (loading) {
        return (
            <div className='h-screen w-screen flex flex-col items-center justify-center bg-[#050505] text-white'>
                <div className="w-10 h-10 border-4 border-zinc-700 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-400 text-sm">Loading website...</p>
            </div>
        )
    }

    // 404 Not Found state
    if (notFound) {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-[#050505] text-white p-6'>
                <div className="text-center max-w-md">
                    <p className="text-7xl font-bold text-zinc-800 mb-4">404</p>
                    <h1 className="text-2xl font-bold mb-3">Website Not Found</h1>
                    <p className="text-zinc-400 mb-8 text-sm">
                        The website you're looking for doesn't exist or may have been removed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition"
                        >
                            Go Home
                        </button>
                        <button
                            onClick={() => navigate('/generate')}
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition"
                        >
                            Generate New Site
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Network / generic error state
    if (error) {
        return (
            <div className='h-screen w-screen flex items-center justify-center bg-[#050505] text-white p-6'>
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-3 text-red-400">Failed to Load</h1>
                    <p className="text-zinc-400 mb-6 text-sm">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <iframe
            title='Live Site'
            srcDoc={html}
            className='w-screen h-screen border-none'
            // Removed allow-same-origin — scripts could escape sandbox with it
            sandbox='allow-scripts allow-forms'
        />
    )
}

export default LiveSite
