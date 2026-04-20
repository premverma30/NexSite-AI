import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Coins } from "lucide-react"
import { useNavigate } from 'react-router-dom'

function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [userData, setUserData] = useState({
        name: "Prem",
        email: "prem@gmail.com",
        credits: 10,
        avatar: ""
    })

    const [openLogin, setOpenLogin] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const websites = [
        {
            _id: "1",
            title: "Portfolio Website",
            updatedAt: new Date(),
            latestCode: "<h1>Hello World</h1>"
        },
        {
            _id: "2",
            title: "E-commerce UI",
            updatedAt: new Date(),
            latestCode: "<h1>Shop Page</h1>"
        },
        {
            _id: "3",
            title: "Blog Website",
            updatedAt: new Date(),
            latestCode: "<h1>Blog Page</h1>"
        }
    ]

    const navigate = useNavigate()

    const handleLogOut = () => {
        console.log("logout click")
        setUserData(null) 
        setOpenProfile(false)
    }

    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>

                    <div className='text-lg font-semibold'>NexSite.ai</div>

                    <div className='flex items-center gap-5'>

                        <div
                            className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'
                            onClick={() => navigate("/pricing")}
                        >
                            Pricing
                        </div>

                        {userData && (
                            <div
                                className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10'
                                onClick={() => navigate("/pricing")}
                            >
                                <Coins size={14} className='text-yellow-400' />
                                <span>Credits</span>
                                <span>{userData.credits}</span>
                                <span>+</span>
                            </div>
                        )}

                        {!userData ? (
                            <button
                                className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm'
                                onClick={() => setOpenLogin(true)}
                            >
                                Get Started
                            </button>
                        ) : (
                            <div className='relative'>
                                <button onClick={() => setOpenProfile(!openProfile)}>
                                    <img
                                        src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`}
                                        className='w-9 h-9 rounded-full border border-white/20'
                                    />
                                </button>

                                <AnimatePresence>
                                    {openProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-3 w-60 rounded-xl bg-[#0b0b0b] border border-white/10"
                                        >
                                            <div className='px-4 py-3 border-b border-white/10'>
                                                <p>{userData.name}</p>
                                                <p className='text-xs text-zinc-400'>{userData.email}</p>
                                            </div>

                                            <button
                                                className='w-full px-4 py-3 text-left hover:bg-white/5'
                                                onClick={() => navigate("/dashboard")}
                                            >
                                                Dashboard
                                            </button>

                                            <button
                                                className='w-full px-4 py-3 text-left text-red-400 hover:bg-white/5'
                                                onClick={handleLogOut}
                                            >
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Hero */}
            <section className='pt-44 pb-32 px-6 text-center'>
                <h1 className="text-5xl md:text-7xl font-bold">
                    Build Stunning Websites <br />
                    <span className='text-purple-400'>with AI</span>
                </h1>

                <p className='mt-6 text-zinc-400'>
                    Describe your idea and let AI build your website.
                </p>

                <button
                    className="px-10 py-4 mt-10 bg-white text-black rounded-xl"
                    onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}
                >
                    {userData ? "Go to dashboard" : "Get Started"}
                </button>
            </section>

            {/* Highlights */}
            {!userData && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <div className='grid md:grid-cols-3 gap-10'>
                        {highlights.map((h, i) => (
                            <div key={i} className="p-6 border rounded-xl">
                                <h1 className='text-xl mb-2'>{h}</h1>
                                <p className='text-sm text-zinc-400'>
                                    Clean UI, animations, and scalable code.
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

           
            {userData && websites.length > 0 && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <h3 className='text-2xl mb-6'>Your Websites</h3>

                    <div className='grid md:grid-cols-3 gap-6'>
                        {websites.map((w) => (
                            <div
                                key={w._id}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="cursor-pointer border rounded-xl overflow-hidden"
                            >
                                <div className='h-32 bg-white text-black flex items-center justify-center'>
                                    Preview
                                </div>

                                <div className='p-4'>
                                    <h3>{w.title}</h3>
                                    <p className='text-xs text-zinc-400'>
                                        {new Date(w.updatedAt).toDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            
            <footer className='border-t border-white/10 py-6 text-center text-sm text-zinc-500'>
                © {new Date().getFullYear()} NexSite.ai
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
        </div>
    )
}

export default Home