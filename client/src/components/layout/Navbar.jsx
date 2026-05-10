import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../../components/LoginModal";
import { apiClient } from "../../api/client";
import { setUserData } from "../../redux/userSlice";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await apiClient.get("/api/auth/logout");
      dispatch(setUserData(null));
      setOpenProfile(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-lg font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            NexSite
            <span className="ml-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-500 bg-clip-text text-transparent animate-pulse">
              .ai
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer transition"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </div>

            {userData && (
              <div
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm cursor-pointer hover:bg-purple-500/20 transition"
                onClick={() => navigate("/pricing")}
              >
                <Coins size={13} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span className="font-semibold">{userData.credits}</span>
              </div>
            )}

            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full border border-white/20 object-cover hover:border-purple-500/50 transition"
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
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium truncate">{userData.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{userData.email}</p>
                      </div>
                      <button 
                        className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition"
                        onClick={() => { setOpenProfile(false); navigate("/dashboard"); }}
                      >
                        Dashboard
                      </button>
                      <button
                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 transition"
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
      
      {openLogin && (
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </>
  );
}
