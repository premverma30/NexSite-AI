import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Hero({ onOpenLogin }) {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <section className="relative z-10 pt-52 pb-24 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
      >
        Build Stunning Websites <br />
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          with AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed"
      >
        Describe your idea and let AI generate a modern, responsive,
        production-ready website in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-4 mt-12 flex-wrap"
      >
        <button
          className="px-8 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition-all flex items-center gap-2"
          onClick={() => (userData ? navigate("/dashboard") : onOpenLogin())}
        >
          {userData ? "Go to Dashboard" : "Start Building Free"}
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}
