import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["20%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 bg-brand/30 backdrop-blur-xl border-2 border-brand shadow-[0_0_50px_rgba(14,165,233,0.3)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-brand font-bold text-xl tracking-tighter">CK</span>
        </div>
      </div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-2xl font-bold tracking-widest text-white"
      >
        CK STREAMZ
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="mt-4 h-1 bg-brand rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
      />
    </motion.div>
  );
}
