import React from 'react'
import { AnimatePresence, motion } from "framer-motion" 
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import axios from "axios"

function LoginModal({ open, onClose }) {

   
    const handleGoogleAuth=async ()=>{
        try {
            const result=await signInWithPopup(auth,provider)
            const {data}=await axios.post(`${serverUrl}/api/auth/google`,{
                name:result.user.displayName,
                email:result.user.email,
                avatar:result.user.photoURL
            },{withCredentials:true})
            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AnimatePresence>
            {open &&
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >

                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.45 }}
                        className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 overflow-hidden'>

                            <button
                                className='absolute top-5 right-5 text-zinc-400 hover:text-white'
                                onClick={onClose}
                            >
                                X
                            </button>

                            <div className='px-8 pt-14 pb-10 text-center'>

                                <h2 className='text-2xl mb-6'>
                                    Welcome to <span className='text-purple-400'>NexSite.ai</span>
                                </h2>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleGoogleAuth}
                                    className="w-full py-3 rounded-xl bg-white text-black font-semibold"
                                >
                                    Continue with Google
                                </motion.button>

                                <p className='text-xs text-zinc-500 mt-6'>
                                    This is a demo login (no backend).
                                </p>

                            </div>

                        </div>
                    </motion.div>

                </motion.div>}
        </AnimatePresence>
    )
}

export default LoginModal