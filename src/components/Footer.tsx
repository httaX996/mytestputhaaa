import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-10 mt-auto border-t border-white/5 bg-zinc-950/50 backdrop-blur-md">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <a 
          href="https://t.me/CK_STREAMZ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#24A1DE]/10 border border-[#24A1DE]/20 text-[#24A1DE] font-bold text-sm uppercase tracking-widest hover:bg-[#24A1DE] hover:text-white transition-all duration-300 mb-8"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-3.903 16.323-3.903 16.323s-.12.48-.6.48c-.36 0-.72-.24-.72-.24l-5.4-4.08-2.52 2.4s-.24.24-.48.24c-.24 0-.36-.12-.36-.36V18.6l10.2-9.6c.12-.12.12-.36 0-.48-.12-.12-.36-.12-.48 0l-12.6 7.92-3.84-1.2s-.36-.12-.36-.48c0-.36.36-.48.36-.48l18.36-7.08s.48-.12.72.12c.24.24.24.6.12.84z"/>
          </svg>
          Follow us on Telegram
          
          <div className="absolute -z-10 inset-0 bg-[#24A1DE]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>

        <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium tracking-wide">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current animate-heart-blink" />
          <span>by</span>
          <span className="text-zinc-100 font-bold hover:text-brand transition-colors cursor-default">
            CHETHMINA KAVISHAN
          </span>
        </div>
        <p className="mt-2 text-zinc-600 text-[10px] uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} CK STREAMZ • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
