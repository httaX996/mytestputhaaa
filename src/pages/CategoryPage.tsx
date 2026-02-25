import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CHANNELS, CATEGORIES } from "../types";
import ChannelCard from "../components/ChannelCard";
import { ChevronLeft, Search, Trophy, Film, BookOpen, Music, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

const iconMap: Record<string, any> = {
  Trophy,
  Film,
  BookOpen,
  Music,
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const category = CATEGORIES.find(c => c.id === categoryId);
  const Icon = category ? iconMap[category.icon] : Trophy;

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Category not found</h1>
        <Link to="/" className="px-6 py-2 rounded-full bg-brand text-white font-semibold">
          Go Back Home
        </Link>
      </div>
    );
  }

  const categoryChannels = CHANNELS.filter(c => c.category === categoryId);
  const filteredChannels = categoryChannels.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <header className="py-8 px-4 border-b border-white/5 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 rounded-xl bg-white/5 hover:bg-brand/20 text-zinc-400 hover:text-white transition-all">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand/10 border border-brand/20">
                <Icon className="w-6 h-6 text-brand" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase">
                {category.name}
              </h1>
            </div>
          </div>

          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder={`Search in ${category.name}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand/50 transition-all"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        {categoryChannels.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border border-white/5">
              <AlertCircle className="w-12 h-12 text-zinc-700" />
            </div>
            <h2 className="text-4xl font-black text-zinc-800 uppercase tracking-tighter mb-2">Coming Soon...</h2>
            <p className="text-zinc-600 max-w-md">
              We are working hard to bring the best {category.name.toLowerCase()} channels to CK STREAMZ. Stay tuned!
            </p>
          </motion.div>
        ) : (
          <>
            {filteredChannels.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">No channels found matching "{searchQuery}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredChannels.map((channel, index) => (
                  <motion.div
                    key={channel.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChannelCard channel={channel} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
