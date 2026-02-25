import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const initPlayer = () => {
      setError(null);
      setIsBuffering(true);

      // Use internal proxy to bypass Mixed Content and CORS
      const proxyUrl = `/proxy/${src.replace(/^https?:\/\//, "")}`;

      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          // Handle relative paths in m3u8 by providing a custom loader or base URL
          // But since we use a path-based proxy, relative paths should work automatically
        });
        hls.loadSource(proxyUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            // Autoplay might be blocked, show play button or handle silently
            console.log("Autoplay blocked");
          });
          setIsBuffering(false);
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError("Network error: Check your connection or the stream URL.");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError("Media error: Trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                setError("An unrecoverable error occurred.");
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // For Safari which has native HLS support
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play();
          setIsBuffering(false);
        });
        video.addEventListener('error', () => {
          setError("Native playback error occurred.");
        });
      } else {
        setError("Your browser does not support HLS playback.");
      }
    };

    initPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        playsInline
      />
      
      {/* Watermark */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
          <span className="text-brand font-bold text-sm tracking-tighter drop-shadow-lg">
            CK STREAMZ
          </span>
        </div>
      </div>

      {/* Loading Overlay */}
      {isBuffering && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
            <span className="text-white font-medium animate-pulse">Loading Stream...</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 backdrop-blur-md z-30 p-6">
          <div className="flex flex-col items-center text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Playback Error</h3>
            <p className="text-zinc-400 mb-6 text-sm">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-2 bg-brand hover:bg-brand/80 text-white rounded-full font-bold transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Stream
            </button>
            <p className="mt-4 text-xs text-zinc-500 leading-relaxed">
              <span className="text-brand font-bold">Status:</span> Streaming via secure internal proxy. 
              If the stream still doesn't load, the source server might be temporarily down.
            </p>
          </div>
        </div>
      )}

      {/* Channel Title Overlay */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <h2 className="text-white font-medium text-lg drop-shadow-md bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/5">
          {title}
        </h2>
      </div>
    </div>
  );
}
