// import React, { useEffect, useState } from 'react'
// import { AnimatePresence, motion } from "motion/react"
// import LoginModal from '../components/LoginModal'
// import { useDispatch, useSelector } from 'react-redux'
// import { Coins } from "lucide-react"
// import { serverUrl } from '../App'
// import axios from 'axios'
// import { setUserData } from '../redux/userSlice'
// import { useNavigate } from 'react-router-dom'
// function Home() {

//     const highlights = [
//         "AI Generated Code",
//         "Fully Responsive Layouts",
//         "Production Ready Output",
//     ]

//     const [openLogin, setOpenLogin] = useState(false)
//     const { userData } = useSelector(state => state.user)
//     const [openProfile, setOpenProfile] = useState(false)
//     const [websites, setWebsites] = useState(null)
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const handleLogOut = async () => {
//         console.log("logout click")
//         try {
//             await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
//             dispatch(setUserData(null))
//             setOpenProfile(false)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const result = await axios.get(`${serverUrl}/api/auth/me`, { withCredentials: true })
//                 dispatch(setUserData(result.data))
//             } catch (error) {
//                 dispatch(setUserData(null))
//             }
//         }
//         checkAuth()
//     }, [dispatch])

//     useEffect(() => {
//         if (!userData) return;
//         const handleGetAllWebsites = async () => {

//             try {

//                 const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
//                 setWebsites(result.data || [])

//             } catch (error) {
//                 console.log(error)

//             }
//         }
//         handleGetAllWebsites()
//     }, [userData])
//     return (

//         <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
//             <motion.div
//                 initial={{ y: -40, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
//             >
//                 <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
//                     <div className='text-lg font-semibold'>
//                         NexSite.ai
//                     </div>
//                     <div className='flex items-center gap-5'>
//                         <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer' onClick={() => navigate("/pricing")}>
//                             Pricing
//                         </div>
//                         {userData && <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition' onClick={() => navigate("/pricing")}>
//                             <Coins size={14} className='text-yellow-400' />
//                             <span className='text-zinc-300'>Credits</span>
//                             <span>{userData.credits}</span>
//                             <span className='font-semibold'>+</span>
//                         </div>}


//                         {!userData ? <button className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm'
//                             onClick={() => setOpenLogin(true)}
//                         >

                            

//                             Get Started
//                         </button>
//                             :
//                             <div className='relative'>
//                                 <button className='flex items-center' onClick={() => setOpenProfile(!openProfile)}>
//                                     <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="" referrerPolicy='no-referrer' className='w-9 h-9 rounded-full border border-white/20 object-cover' />
//                                 </button>
//                                 <AnimatePresence>
//                                     {openProfile && (
//                                         <>
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                                                 className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
//                                             >
//                                                 <div className='px-4 py-3 border-b border-white/10'>
//                                                     <p className='text-sm font-medium truncate'>{userData.name}</p>
//                                                     <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
//                                                 </div>

//                                                 <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
//                                                     <Coins size={14} className='text-yellow-400' />
//                                                     <span className='text-zinc-300'>Credits</span>
//                                                     <span>{userData.credits}</span>
//                                                     <span className='font-semibold'>+</span>
//                                                 </button>

//                                                 <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={() => navigate("/dashboard")}>Dashboard</button>
//                                                 <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handleLogOut}>Logout</button>

//                                             </motion.div>
//                                         </>

//                                     )}

//                                 </AnimatePresence>

//                             </div>

//                         }

//                     </div>
//                 </div>
//             </motion.div>

//             <section className='pt-44 pb-32 px-6 text-center'>
//                 <motion.h1
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-5xl md:text-7xl font-bold tracking-tight"
//                 >
//                     Build Stunning Websites <br />
//                     <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI</span>
//                 </motion.h1>

//                 <motion.p
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'
//                 >
//                     Describe your idea and let AI generate a modern,
//                     responsive, production-ready website.
//                 </motion.p>


//                 <button className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12" onClick={() =>userData? navigate("/dashboard"):setOpenLogin(true)}>{userData ? "Go to dashboard" : "Get Started"}</button>

//             </section>
//             {!userData && <section className='max-w-7xl mx-auto px-6 pb-32'>
//                 <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
//                     {highlights.map((h, i) => (
//                         <motion.div
//                             key={i}
//                             initial={{ opacity: 0, y: 40 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="rounded-2xl bg-white/5 border border-white/10 p-8"
//                         >
//                             <h1 className='text-xl font-semibold mb-3'>{h}</h1>
//                             <p className='text-sm text-zinc-400'>
//                                 NexSite.ai builds real websites — clean code,
//                                 animations, responsiveness and scalable structure.
//                             </p>

//                         </motion.div>
//                     ))}
//                 </div>
//             </section>}


//             {userData && websites?.length > 0 && (
//                 <section className='max-w-7xl mx-auto px-6 pb-32'>
//                     <h3 className='text-2xl font-semibold mb-6'>Your Websites</h3>

//                     <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//                         {websites.slice(0, 3).map((w, i) => (
//                             <motion.div
//                                 key={w._id}
//                                 whileHover={{ y: -6 }}
//                                 onClick={() => navigate(`/editor/${w._id}`)}
//                                 className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
//                             >
//                                 <div className='h-40 bg-black'>
//                                     <iframe
//                                         srcDoc={w.latestCode}
//                                         className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
//                                     />
//                                 </div>
//                                 <div className='p-4'>
//                                     <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
//                                     <p className='text-xs text-zinc-400'>Last Updated {""}
//                                         {new Date(w.updatedAt).toLocaleDateString()}
//                                     </p>
//                                 </div>


//                             </motion.div>
//                         ))}

//                     </div>
//                 </section>

//             )}



//             <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
//                 &copy; {new Date().getFullYear()} NexSite.ai
//             </footer>

//             {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

//         </div>



//     )
// }

// export default Home










import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins, ArrowRight, Play, Zap, Code2, Smartphone, Sparkles, RotateCcw, Download, Shield } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const features = [
        { icon: <Code2 size={18} />, title: "Production-ready code", desc: "Clean, semantic HTML and CSS with proper structure, accessibility, and scalable architecture.", tag: "No boilerplate", tagColor: "purple" },
        { icon: <Smartphone size={18} />, title: "Fully responsive", desc: "Every site looks perfect on any screen — mobile, tablet, or desktop — from the first generation.", tag: "Mobile-first", tagColor: "blue" },
        { icon: <Sparkles size={18} />, title: "Smooth animations", desc: "Scroll reveals, hover states, and micro-interactions are built in automatically.", tag: "60fps", tagColor: "green" },
        { icon: <RotateCcw size={18} />, title: "Iterative editing", desc: "Ask NexSite to change the hero, tweak colors, or restructure any section. It understands context.", tag: "Conversational", tagColor: "purple" },
        { icon: <Download size={18} />, title: "One-click export", desc: "Download your site as a clean HTML file or deploy directly to a custom URL in seconds.", tag: "Deploy instantly", tagColor: "blue" },
        { icon: <Shield size={18} />, title: "Version history", desc: "Every generation is saved. Jump back to any previous version of your site with a single click.", tag: "Auto-saved", tagColor: "green" },
    ]

    const stats = [
        { num: "12K+", label: "Websites Generated" },
        { num: "<2 min", label: "Avg Generation Time" },
        { num: "98%", label: "User Satisfaction" },
        { num: "4K+", label: "Active Builders" },
    ]

    const tagColors = {
        purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
        blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        green: "bg-green-500/10 text-green-400 border border-green-500/20",
    }

    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) return;
        const handleGetAllWebsites = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])
            } catch (error) {
                console.log(error)
            }
        }
        handleGetAllWebsites()
    }, [userData])

    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>

            {/* Ambient glow orbs */}
            <div className='fixed top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full pointer-events-none z-0'
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className='fixed bottom-0 right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0'
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />

            {/* ---- NAV ---- */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    <div className='text-lg font-semibold'>
                        NexSite.ai
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer transition' onClick={() => navigate("/pricing")}>
                            Pricing
                        </div>

                        {userData && (
                            <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm cursor-pointer hover:bg-purple-500/20 transition' onClick={() => navigate("/pricing")}>
                                <Coins size={13} className='text-yellow-400' />
                                <span className='text-zinc-300'>Credits</span>
                                <span className='font-semibold'>{userData.credits}</span>
                            </div>
                        )}

                        {!userData ? (
                            <button
                                className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition'
                                onClick={() => setOpenLogin(true)}
                            >
                                Get Started
                            </button>
                        ) : (
                            <div className='relative'>
                                <button className='flex items-center' onClick={() => setOpenProfile(!openProfile)}>
                                    <img
                                        src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`}
                                        alt=""
                                        referrerPolicy='no-referrer'
                                        className='w-9 h-9 rounded-full border border-white/20 object-cover hover:border-purple-500/50 transition'
                                    />
                                </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                                        >
                                            <div className='px-4 py-3 border-b border-white/10'>
                                                <p className='text-sm font-medium truncate'>{userData.name}</p>
                                                <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                            </div>
                                            <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
                                                <Coins size={14} className='text-yellow-400' />
                                                <span className='text-zinc-300'>Credits</span>
                                                <span>{userData.credits}</span>
                                            </button>
                                            <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition' onClick={() => navigate("/dashboard")}>Dashboard</button>
                                            <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 transition' onClick={handleLogOut}>Logout</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* ---- HERO ---- */}
            <section className='relative z-10 pt-52 pb-24 px-6 text-center'>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                >
                    Build Stunning Websites <br />
                    <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='mt-6 max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed'
                >
                    Describe your idea and let AI generate a modern,
                    responsive, production-ready website in seconds.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex items-center justify-center gap-4 mt-12 flex-wrap'
                >
                    <button
                        className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all flex items-center gap-2"
                        onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}
                    >
                        {userData ? "Go to Dashboard" : "Start Building Free"}
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </section>

            {/* ---- BROWSER MOCKUP ---- */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className='relative z-10 max-w-4xl mx-auto px-6 mb-32'
            >
                <div className='rounded-2xl border border-white/10 bg-[#0e0e12] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)]'>
                    {/* Browser bar */}
                    <div className='flex items-center gap-2 px-4 h-10 bg-[#141418] border-b border-white/5'>
                        <div className='w-3 h-3 rounded-full bg-[#ff5f57]' />
                        <div className='w-3 h-3 rounded-full bg-[#febc2e]' />
                        <div className='w-3 h-3 rounded-full bg-[#28c840]' />
                        <div className='flex-1 mx-3 h-5 rounded-md bg-white/5 flex items-center justify-center'>
                            <span className='text-[11px] text-zinc-600'>nexsite.ai/editor</span>
                        </div>
                    </div>
                    {/* Preview content */}
                    <div className='h-72 relative flex items-center justify-center overflow-hidden'
                        style={{
                            background: 'linear-gradient(160deg, #0c0c14 0%, #08080f 100%)',
                            backgroundImage: `linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    >
                        <div className='flex flex-col items-center gap-4 z-10'>
                            <div className='text-2xl font-bold text-white'>
                                My <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>Startup</span> Site
                            </div>
                            <div className='flex gap-3'>
                                {[0, 1, 2].map(i => (
                                    <div key={i} className={`w-24 h-14 rounded-xl border ${i === 1 ? 'bg-purple-500/10 border-purple-500/20' : 'bg-white/3 border-white/8'}`} />
                                ))}
                            </div>
                            <div className='px-5 py-2 rounded-lg bg-white text-black text-xs font-semibold'>
                                Get Started →
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ---- STATS ---- */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='relative z-10 max-w-3xl mx-auto px-6 mb-32'
            >
                <div className='grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10 border border-white/10 rounded-2xl bg-[#0e0e12] overflow-hidden'>
                    {stats.map((s, i) => (
                        <div key={i} className='py-7 px-6 text-center'>
                            <div className='text-3xl font-bold tracking-tight text-white mb-1'>
                                {s.num.includes('<') ? (
                                    <><span className='text-purple-400'>&lt;</span>{s.num.replace('<', '')}</>
                                ) : s.num.includes('+') ? (
                                    <>{s.num.replace('+', '')}<span className='text-purple-400'>+</span></>
                                ) : s.num.includes('%') ? (
                                    <>{s.num.replace('%', '')}<span className='text-purple-400'>%</span></>
                                ) : s.num}
                            </div>
                            <div className='text-xs text-zinc-500'>{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ---- HOW IT WORKS ---- */}
            <section className='relative z-10 max-w-5xl mx-auto px-6 mb-32'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className='text-xs uppercase tracking-widest text-purple-400 mb-3 font-medium'>How it works</p>
                    <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-14'>Three steps to live</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border border-white/10 rounded-2xl bg-[#0e0e12] overflow-hidden'>
                        {[
                            { step: "01", icon: "✏️", title: "Describe your vision", desc: "Type what you want — a portfolio, SaaS page, or product showcase. Be as brief or detailed as you like." },
                            { step: "02", icon: "⚡", title: "AI generates instantly", desc: "NexSite crafts clean, semantic HTML with modern animations, full responsiveness, and polished hierarchy." },
                            { step: "03", icon: "🚀", title: "Edit and publish", desc: "Tweak in the live editor, iterate with follow-up prompts, then export or deploy with one click." },
                        ].map((s, i) => (
                            <div key={i} className='p-8 hover:bg-white/[0.02] transition group'>
                                <p className='text-xs font-semibold text-purple-400 tracking-widest uppercase mb-5'>Step {s.step}</p>
                                <div className='w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl mb-5'>
                                    {s.icon}
                                </div>
                                <h3 className='text-base font-semibold mb-3'>{s.title}</h3>
                                <p className='text-sm text-zinc-500 leading-relaxed'>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ---- FEATURES ---- */}
            <section className='relative z-10 max-w-5xl mx-auto px-6 mb-32'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
                        <div>
                            <p className='text-xs uppercase tracking-widest text-purple-400 mb-3 font-medium'>Why NexSite</p>
                            <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>Everything you need,<br />nothing you don't</h2>
                        </div>
                        <p className='text-zinc-500 text-sm max-w-xs leading-relaxed'>
                            Production-grade output with real code, real animations, and real responsiveness — not mockups.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className='rounded-2xl bg-white/[0.03] border border-white/8 p-7 hover:bg-white/[0.05] hover:border-purple-500/20 transition-all group relative overflow-hidden'
                            >
                                <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                                <div className='w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center text-purple-400 mb-5'>
                                    {f.icon}
                                </div>
                                <h3 className='text-sm font-semibold mb-2'>{f.title}</h3>
                                <p className='text-xs text-zinc-500 leading-relaxed mb-4'>{f.desc}</p>
                                <span className={`text-xs px-2.5 py-1 rounded-md ${tagColors[f.tagColor]}`}>{f.tag}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ---- HIGHLIGHTS (logged out only) ---- */}
            {!userData && (
                <section className='relative z-10 max-w-5xl mx-auto px-6 mb-32'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-purple-500/20 transition"
                            >
                                <div className='w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4'>
                                    <Zap size={14} className='text-purple-400' />
                                </div>
                                <h3 className='text-base font-semibold mb-3'>{h}</h3>
                                <p className='text-sm text-zinc-400 leading-relaxed'>
                                    NexSite.ai builds real websites — clean code, animations, responsiveness and scalable structure.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ---- YOUR WEBSITES (logged in) ---- */}
            {userData && websites?.length > 0 && (
                <section className='relative z-10 max-w-5xl mx-auto px-6 mb-32'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-2xl font-bold tracking-tight'>Your Websites</h2>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className='text-sm text-zinc-400 hover:text-white transition flex items-center gap-1'
                        >
                            View all <ArrowRight size={13} />
                        </button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {websites.slice(0, 3).map((w) => (
                            <motion.div
                                key={w._id}
                                whileHover={{ y: -5 }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="cursor-pointer rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-purple-500/25 transition-all group"
                            >
                                <div className='h-44 bg-black relative overflow-hidden'>
                                    <iframe
                                        srcDoc={w.latestCode}
                                        className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-[#0e0e12]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3'>
                                        <span className='text-xs text-white bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/15'>Open →</span>
                                    </div>
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-sm font-semibold line-clamp-1 mb-1'>{w.title}</h3>
                                    <p className='text-xs text-zinc-500'>
                                        Updated {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* ---- CTA SECTION ---- */}
            <section className='relative z-10 max-w-3xl mx-auto px-6 mb-32'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='relative rounded-3xl border border-white/10 bg-[#0e0e12] p-16 text-center overflow-hidden'
                >
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent' />
                    <div className='absolute top-[-80px] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }} />
                    <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4 relative z-10'>
                        Ready to build<br />something beautiful?
                    </h2>
                    <p className='text-zinc-400 mb-10 leading-relaxed relative z-10'>
                        Join thousands of creators, founders, and developers<br className='hidden md:block' />
                        who ship stunning websites in minutes.
                    </p>
                    <button
                        className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] transition-all relative z-10 flex items-center gap-2 mx-auto"
                        onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}
                    >
                        {userData ? "Go to Dashboard" : "Get Started Free"}
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            </section>

            {/* ---- FOOTER ---- */}
            <footer className='relative z-10 border-t border-white/10 py-8 px-6'>
                <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='text-sm font-semibold text-zinc-400'>NexSite.ai</div>
                    <div className='flex items-center gap-6 text-xs text-zinc-600'>
                        <span className='hover:text-zinc-400 cursor-pointer transition'>Privacy</span>
                        <span className='hover:text-zinc-400 cursor-pointer transition'>Terms</span>
                        <span className='hover:text-zinc-400 cursor-pointer transition'>Blog</span>
                        <span className='hover:text-zinc-400 cursor-pointer transition'>Contact</span>
                    </div>
                    <div className='text-xs text-zinc-600'>&copy; {new Date().getFullYear()} NexSite.ai</div>
                </div>
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
        </div>
    )
}

export default Home