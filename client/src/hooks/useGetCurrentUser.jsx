import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import WebsiteEditor from "./pages/Editor";
import LiveSite from "./pages/LiveSite";
import Pricing from "./pages/Pricing";
import { setUserData } from "./redux/userSlice";

export const serverUrl = import.meta.env.VITE_API_URL || "";

function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        
        const res = await axios.get(`${serverUrl}/api/auth/me`, {
          withCredentials: true,
        });

        if (res.data.user) {
          dispatch(setUserData(res.data.user));
        }
      } catch (error) {
        console.log("Not logged in or session expired");
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[#040404] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Home />} />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route
          path="/editor/:id"
          element={userData ? <WebsiteEditor /> : <Home />}
        />
        <Route path="/site/:id" element={<LiveSite />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;