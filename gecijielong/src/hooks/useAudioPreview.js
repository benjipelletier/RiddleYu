import { useState, useRef, useEffect } from "react";

export default function useAudioPreview() {
  const [playingUrl, setPlayingUrl] = useState(null);
  const audioRef = useRef(null);

  const toggle = (previewUrl, timestampMs = 0) => {
    if (!previewUrl) return;

    if (playingUrl === previewUrl) {
      audioRef.current?.pause();
      setPlayingUrl(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    const audio = new Audio(previewUrl);
    // Try to seek to the lyric's position in the song.
    // The preview is 30s — if timestamp falls within it, seek there.
    const seekSec = (timestampMs || 0) / 1000;
    audio.addEventListener("loadedmetadata", () => {
      if (seekSec > 0 && seekSec < audio.duration) {
        audio.currentTime = seekSec;
      }
    });
    audio.play().catch(() => {});
    audio.onended = () => setPlayingUrl(null);
    audioRef.current = audio;
    setPlayingUrl(previewUrl);
  };

  const stop = () => {
    audioRef.current?.pause();
    setPlayingUrl(null);
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return { playingUrl, toggle, stop };
}
