import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Channel } from "../types";
import { Link } from "react-router-dom";

interface ChannelCardProps {
  channel: Channel;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <Link to={`/player/${channel.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, x: 5 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center gap-4 p-3 rounded-2xl liquid-glass glass-hover cursor-pointer"
      >
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-inner">
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="text-white w-6 h-6 fill-current" />
          </div>
        </div>
        
        <div className="flex flex-col flex-grow">
          <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors line-clamp-1">
            {channel.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-wider">Live Now</span>
          </div>
        </div>

        {/* Liquid effect background element */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/10 blur-[40px] animate-liquid" />
        </div>
      </motion.div>
    </Link>
  );
}
