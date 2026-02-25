import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CHANNELS } from "../types";
import VideoPlayer from "../components/VideoPlayer";
import { ChevronLeft, Info, Users } from "lucide-react";
import { motion } from "motion/react";
import { io } from "socket.io-client";

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>();
  const channel = CHANNELS.find((c) => c.id === id);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    if (!id) return;

    const socket = io();

    socket.on("connect", () => {
      socket.emit("join-channel", id);
    });

    socket.on("viewer-count", (count: number) => {
      setViewers(count);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  if (!channel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Channel not found</h1>
        <Link to="/" className="px-6 py-2 rounded-full bg-brand text-white font-semibold">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <header className="py-6 px-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <Link to={`/category/${channel.category}`} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-brand/20 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Channels</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-bold tracking-tight">LIVE: {channel.name}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VideoPlayer src={channel.url} title={channel.name} />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-3xl glass">
              <h1 className="text-2xl font-bold text-white mb-2">{channel.name}</h1>
              <div className="flex items-center gap-4 text-zinc-400 text-sm mb-6">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  1080p HD
                </span>
                <span>•</span>
                <span>Sports</span>
                <span>•</span>
                <span>English</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                You are currently watching {channel.name} live on CK STREAMZ. 
                Enjoy high-quality streaming with minimal latency. If you experience any issues, 
                please refresh the page or check your internet connection.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl glass border-brand/20 bg-brand/5">
              <div className="flex items-center gap-2 text-brand mb-4">
                <Info className="w-5 h-5" />
                <h3 className="font-bold">Stream Info</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between text-zinc-400">
                  <span>Status</span>
                  <span className="text-emerald-400 font-medium">Online</span>
                </li>
                <li className="flex justify-between text-zinc-400">
                  <span>Live Viewers</span>
                  <span className="text-white flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand" />
                    {viewers.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between text-zinc-400">
                  <span>Server</span>
                  <span className="text-white">CK STREAMZ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
