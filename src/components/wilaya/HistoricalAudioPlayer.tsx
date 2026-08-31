import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';
import { AudioArchiveItem } from '../../types';

interface HistoricalAudioPlayerProps {
  audio: AudioArchiveItem;
}

const HistoricalAudioPlayer: React.FC<HistoricalAudioPlayerProps> = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Audio autoplay failed or blocked:', err);
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white/[0.04] to-black/40 border border-[#c6a66b]/30 rounded-3xl relative overflow-hidden shadow-2xl" dir="rtl">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#c6a66b]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Hidden Native Audio Element */}
      <audio ref={audioRef} src={audio.url} preload="metadata" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-2xl bg-[#c6a66b] hover:bg-[#b5955a] text-black flex items-center justify-center shadow-[0_0_20px_rgba(198,166,107,0.4)] transition-all cursor-pointer group flex-shrink-0"
            >
              {isPlaying ? (
                <Pause size={22} className="fill-black" />
              ) : (
                <Play size={22} className="fill-black rotate-180 mr-0.5" />
              )}
            </button>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-green border-2 border-black rounded-full animate-ping" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#c6a66b] font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                <Radio size={12} /> أرشيف صوتي تاريخي
              </span>
              {audio.speaker && (
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  {audio.speaker}
                </span>
              )}
            </div>
            <h4 className="text-base font-black text-white">{audio.title}</h4>
            {audio.description && (
              <p className="text-xs text-gray-400 line-clamp-1">{audio.description}</p>
            )}
          </div>
        </div>

        {/* Audio Waveform & Controls */}
        <div className="w-full md:w-80 space-y-2">
          {/* Animated Waveform Visualizer */}
          <div className="flex items-center justify-between gap-1 h-8 px-2 bg-black/40 rounded-xl border border-white/5">
            {[40, 70, 30, 90, 50, 80, 60, 100, 45, 85, 65, 30, 75, 95, 40, 60, 80, 50, 90, 35].map((height, i) => (
              <div 
                key={i} 
                className="w-1 bg-[#c6a66b]/40 rounded-full transition-all duration-300"
                style={{ 
                  height: isPlaying ? `${Math.max(15, (height * (Math.sin(currentTime * 4 + i) + 1.2)) / 2.2)}%` : '20%',
                  backgroundColor: isPlaying ? (i % 2 === 0 ? '#c6a66b' : '#1f5f3a') : '#555'
                }}
              />
            ))}
          </div>

          {/* Scrub Bar & Times */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#c6a66b]"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute} 
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
                <span>{audio.duration || formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAudioPlayer;
