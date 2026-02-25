import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CATEGORIES, CHANNELS } from "../types";
import { Tv, Trophy, Film, BookOpen, Music, Search, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Trophy,
  Film,
  BookOpen,
  Music,
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand/10 border border-brand/20 mb-6"
          >
            <Tv className="text-brand w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4"
          >
            CK <span className="text-brand">STREAMZ</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto mb-12"
          >
            Choose your favorite category and start streaming premium content.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 pl-14 pr-6 text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-brand/50 transition-all shadow-2xl"
            />
          </motion.div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {filteredCategories.map((category, index) => {
            const Icon = iconMap[category.icon];
            const channelCount = CHANNELS.filter(c => c.category === category.id).length;
            
            return (
              <motion.div
                key={category.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={`/category/${category.id}`}>
                  <div className="group relative p-5 rounded-3xl liquid-glass glass-hover h-full flex flex-col items-center text-center">
                    <div className="p-3 rounded-2xl bg-brand/10 border border-brand/20 mb-3 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-brand" />
                    </div>
                    
                    <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tighter">
                      {category.name}
                    </h3>
                    
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
                      {channelCount > 0 ? `${channelCount} Channels` : 'Soon'}
                    </p>

                    {/* Liquid background effect */}
                    <div className="absolute -z-10 top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand/10 blur-[40px] animate-liquid" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
