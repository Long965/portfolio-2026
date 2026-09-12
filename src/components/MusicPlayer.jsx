import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    // Auto-play softly upon first user tap or click anywhere
    const handleFirstGesture = () => {
      if (audio.paused && !isPlaying) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.warn('Playback error:', err));
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/vet-mua-piano.webm" type="audio/webm" />
        <source src="/audio/vet-mua-piano.m4a" type="audio/mp4" />
        <source src="/audio/vet-mua-acoustic.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Glassmorphism Music Pill */}
      <div className="fixed bottom-4 right-4 md:bottom-7 md:right-8 z-50 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-2.5 sm:gap-3 bg-black/85 backdrop-blur-xl border border-white/20 text-white rounded-full p-2 pl-3 pr-2 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${
            isPlaying ? 'ring-2 ring-orange-500/50 shadow-orange-500/20' : ''
          }`}
        >
          {/* Rotating Disc / Play button */}
          <button
            onClick={togglePlay}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-gradient-to-tr from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/50 animate-[spin_4s_linear_infinite]'
                : 'bg-white/15 text-white hover:bg-orange-500 hover:text-white'
            }`}
            aria-label={isPlaying ? 'Tạm dừng nhạc' : 'Bật nhạc'}
            title={isPlaying ? 'Tạm dừng nhạc' : 'Bật nhạc Vết Mưa (Piano)'}
          >
            {isPlaying ? (
              <Music size={17} className="animate-pulse" />
            ) : (
              <Play size={16} className="ml-0.5" fill="currentColor" />
            )}
          </button>

          {/* Song Info */}
          <div 
            onClick={togglePlay}
            className="flex flex-col cursor-pointer select-none max-w-[130px] sm:max-w-[190px]"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                Vết Mưa (Piano)
              </span>
              {isPlaying && (
                <div className="flex items-end gap-[2px] h-3 ml-0.5">
                  <span className="w-[2.5px] bg-orange-400 rounded-full animate-pulse h-2"></span>
                  <span className="w-[2.5px] bg-orange-400 rounded-full animate-bounce h-3.5"></span>
                  <span className="w-[2.5px] bg-orange-400 rounded-full animate-pulse h-2.5"></span>
                </div>
              )}
            </div>
            <span className="text-[10px] sm:text-xs text-white/65 truncate">
              Vũ Cát Tường
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1 pl-1 border-l border-white/15">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/15 text-white/80 hover:text-white transition-colors"
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX size={15} className="text-red-400" /> : <Volume2 size={15} />}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MusicPlayer;
