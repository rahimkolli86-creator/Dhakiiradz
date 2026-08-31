import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Square, RefreshCcw, Radio, Clock, ShieldCheck, Music, Sparkles } from 'lucide-react';
import { LibraryItem } from '../../data/libraryData';

interface AudioPlayerProps {
  activeTrack: LibraryItem | null;
  onCloseTrack?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ activeTrack, onCloseTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Restart audio when activeTrack changes
  useEffect(() => {
    if (activeTrack && audioRef.current) {
      setIsPlaying(false);
      setCurrentTime(0);
      setIsConnecting(true);
      
      // Simulate slow retro tuning radio frequency connection for high-end movie-like feeling
      const timer = setTimeout(() => {
        setIsConnecting(false);
        audioRef.current?.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log("Audio play failed:", err);
        });
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [activeTrack]);

  // Handle playing state
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  // Scrubber slide
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  // Time formatting Helper
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = Math.floor(secs % 60);
    return `${mins}:${remainSecs < 10 ? '0' : ''}${remainSecs}`;
  };

  // On audio metadata loaded
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // On audio updates
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Adjust volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
  };

  const restartTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!activeTrack) {
    // Elegant closed static state representing "إذاعة الثورة"
    return (
      <div id="audio-player-idle" className="relative p-6 sm:p-8 rounded-3xl border border-white/5 bg-[#080808] text-right flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden max-w-4xl mx-auto mb-10" dir="rtl">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4.5 shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center text-gray-500 relative shrink-0">
            <Radio size={28} className="text-gray-600" />
            <span className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-gray-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600 block" />
              <h4 className="text-sm font-black text-gray-400">إذاعة صوت الجزائر الحرة المكافحة</h4>
            </div>
            <p className="text-[11px] text-gray-500 font-bold leading-relaxed max-w-md mt-1">
              اختر أي تسجيل صوتي نادر أو نشيد عسكري متاح في القائمة أدناه، واستمع للتسجيل التاريخي المباشر كما تم بثه سرياً من معاقل جيش التحرير.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-500 font-bold leading-tight flex items-center gap-1.5">
            <Radio size={12} className="text-yellow-600 animate-pulse" />
            <span>نطاق الصوت غير متصل</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="custom-audio-player-container"
      className="relative p-6 sm:p-8 rounded-3xl border border-[#c6a66b]/20 bg-[#0a0a0a] text-right flex flex-col items-stretch gap-6 overflow-hidden max-w-4xl mx-auto shadow-[0_15px_50px_rgba(0,0,0,0.8)] mb-10 transition-all duration-300" 
      dir="rtl"
    >
      {/* Audio hidden element */}
      <audio
        ref={audioRef}
        src={activeTrack.audio_url}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onAudioEnded}
      />

      {/* Futuristic radio frequencies scanning matrix */}
      <div className="absolute inset-0 bg-[#c6a66b]/[0.01] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#c6a66b]/5 blur-3xl pointer-events-none" />

      {/* Header Info area */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 justify-between border-b border-white/5 pb-5">
        <div className="flex items-center gap-4.5 text-right w-full sm:w-auto">
          {/* Cover Art */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-black/80 border border-white/10 shrink-0 group">
            <img 
              src={activeTrack.thumbnail} 
              alt={activeTrack.title} 
              className={`w-full h-full object-cover grayscale transition-all duration-700 ${isPlaying ? 'scale-105 rotate-1 grayscale-0' : ''}`}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Music size={16} className={`text-[#c6a66b] ${isPlaying ? 'animate-bounce' : ''}`} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full block ${isConnecting ? 'bg-yellow-500 animate-ping' : isPlaying ? 'bg-green-500 animate-pulse' : 'bg-orange-600'}`} />
              <span className="text-[10px] text-gray-500 font-mono tracking-widest">{activeTrack.year} م | تسجيل ثوري نادر</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white line-clamp-1">{activeTrack.title}</h4>
            <p className="text-[11px] text-[#c6a66b] font-bold line-clamp-1 flex items-center gap-1.5-reverse">
              <Sparkles size={11} />
              <span>المصدر: {activeTrack.source}</span>
            </p>
          </div>
        </div>

        {/* Action tags and controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-gray-400">
            نقاء البث: سري ومحمي
          </span>
          {onCloseTrack && (
            <button
              onClick={onCloseTrack}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold border border-rose-500/10 hover:border-rose-500/20 transition-all cursor-pointer"
            >
              إلغاء التشغيل
            </button>
          )}
        </div>
      </div>

      {/* Sound Waves & Frequency Analyzer visualizer simulator */}
      <div className="relative z-10 w-full bg-black/60 rounded-xl px-4 py-3 border border-white/5 flex items-center justify-center gap-0.5 h-12 overflow-hidden">
        {isConnecting ? (
          <span className="text-[10px] text-yellow-500 font-bold animate-pulse font-mono flex items-center gap-2">
            [[ جاري استرجاع ذبذبة البث وتوليف موجة الراديو ... ]]
          </span>
        ) : (
          <div className="flex items-end gap-[3px] h-full">
            {Array.from({ length: 48 }).map((_, i) => {
              // Generate beautiful symmetrical retro audio wave bars
              const heightMultiplier = Math.sin(i * 0.3) * 0.4 + 0.6;
              const randomFactor = isPlaying ? Math.random() * 0.5 + 0.5 : 0.05;
              const heightPercent = Math.max(10, Math.floor(heightMultiplier * randomFactor * 100));
              
              return (
                <div
                  key={i}
                  className={`w-[4px] rounded-full transition-all duration-150 ${isPlaying ? 'bg-gradient-to-t from-brand-green via-[#c6a66b] to-yellow-600' : 'bg-gray-800'}`}
                  style={{ height: `${heightPercent}%` }}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Progress timeline and duration bars */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 font-bold">
          <span>{formatTime(currentTime)}</span>
         <span>{formatTime(duration || 225)}</span> {/* hardcodes fallback in min:sec */}
        </div>

        <input
          type="range"
          min="0"
          max={duration || 225}
          value={currentTime}
          onChange={handleScrubChange}
          className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#c6a66b] focus:outline-none"
          style={{
            background: `linear-gradient(to left, #c6a66b ${((currentTime / (duration || 225)) * 100)}%, rgba(255,255,255,0.05) ${((currentTime / (duration || 225)) * 100)}%)`
          }}
        />
      </div>

      {/* Micro-Controls: Buttons block */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 justify-between">
        {/* Play control buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={isConnecting}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isConnecting ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-[#c6a66b] hover:bg-[#b09159] text-black hover:scale-105'
            }`}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="mr-1" />}
          </button>

          <button
            onClick={restartTrack}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="إعادة التثبيت"
          >
            <RefreshCcw size={13} />
          </button>
        </div>

        {/* Text descriptions */}
        <p className="text-[10px] text-gray-400 font-bold max-w-sm text-center sm:text-right leading-relaxed hidden sm:block">
          {activeTrack.description.slice(0, 110)}...
        </p>

        {/* Volume & sound parameters */}
        <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2 w-full sm:w-auto">
          <button onClick={toggleMute} className="text-gray-400 hover:text-[#c6a66b] transition-colors cursor-pointer">
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-[#c6a66b] h-1 rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
