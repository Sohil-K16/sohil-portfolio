import { useEffect, useRef, useState } from "react";
import { Music, X, Play, Pause, ChevronDown, Volume2 } from "lucide-react";
import { site } from "@/config/site";

const songs = site.songs.filter((s) => s.src);

function fmt(seconds: number) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = songs.length > 0 ? songs : site.songs;
  const active = current !== null ? playlist[current] : null;

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      audio?.pause();
    };
  }, []);

  const playIndex = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (current === index) return;

    setCurrent(index);
    setPlaying(true);
    audio.src = playlist[index].src;
    audio.volume = 0.7;
    setTime(0);
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false);
        console.error("Song playback failed:", playlist[index].title);
      });
  };

  const handleToggle = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (current === index) {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play().catch(() => setPlaying(false));
        setPlaying(true);
      }
    } else {
      setCurrent(index);
      setPlaying(true);
      setTime(0);
      audio.src = playlist[index].src;
      audio.volume = 0.7;
      audio.play().catch(() => setPlaying(false));
    }
  };

  const handleMain = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (current === null) {
      playIndex(0);
    } else if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  const toggleOpen = () => setOpen((v) => !v);

  return (
    <div className="fixed right-2 bottom-2 z-50 hidden xl:block">
      {/* Popup panel */}
      {open && (
        <div className="absolute right-0 bottom-full mb-3 w-72 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--chip)] px-4 py-3">
            <div className="flex items-center gap-2">
              <Music className="size-4 text-[var(--soft)]" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--fg)]">
                Playlist
              </span>
            </div>
            <button
              type="button"
              aria-label="Close playlist"
              onClick={toggleOpen}
              className="rounded p-1 text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)]"
            >
              <X className="size-4" />
            </button>
          </div>

          <ul className="max-h-64 divide-y divide-[var(--line)] overflow-y-auto">
            {playlist.map((song, i) => {
              const isActive = current === i && playing;
              return (
                <li key={`${song.title}-${i}`}>
                  <button
                    type="button"
                    onClick={() => handleToggle(i)}
                    disabled={!song.src}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      !song.src
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-[var(--hover)]"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] ${
                        isActive ? "text-[var(--fg)]" : "text-[var(--muted)]"
                      }`}
                    >
                      {isActive ? (
                        <Pause className="size-3.5" />
                      ) : (
                        <Play className="size-3.5" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[13px] font-medium ${
                          isActive ? "text-[var(--fg)]" : "text-[var(--muted)]"
                        }`}
                      >
                        {song.title}
                      </span>
                      <span className="block truncate font-mono text-[10px] text-[var(--soft)]">
                        {song.artist}
                      </span>
                    </span>

                    {isActive && (
                      <span className="flex h-4 items-end gap-0.5">
                        {[0, 1, 2].map((bar) => (
                          <span
                            key={bar}
                            className="w-0.5 animate-pulse rounded-full bg-emerald-500"
                            style={{
                              height: `${8 + (bar % 2) * 4}px`,
                              animationDelay: `${bar * 150}ms`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {active && songHasSrc(active.src) && (
            <div className="border-t border-[var(--line)] bg-[var(--chip)] px-4 py-3">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                  Now playing · {active.title}
                </span>
                <Volume2 className="size-3.5 shrink-0 text-[var(--soft)]" />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={time}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setTime(next);
                  if (audioRef.current) audioRef.current.currentTime = next;
                }}
                className="w-full accent-emerald-500"
                aria-label="Seek"
              />
              <div className="mt-0.5 flex justify-between font-mono text-[10px] text-[var(--soft)]">
                <span>{fmt(time)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Corner launcher */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        className={`ml-auto flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] font-semibold transition-all duration-200 ${
          open || (current !== null && playing)
            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
            : "border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--fg)]"
        }`}
      >
        {open ? (
          <ChevronDown className="size-4" />
        ) : current !== null && playing ? (
          <span className="flex h-4 items-end gap-0.5">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className="w-0.5 animate-pulse rounded-full bg-emerald-400"
                style={{
                  height: `${6 + (bar % 2) * 4}px`,
                  animationDelay: `${bar * 150}ms`,
                }}
              />
            ))}
          </span>
        ) : (
          <Play className="size-3.5" />
        )}
        {open ? "Close" : "Play Song"}
      </button>

      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => {
          const audio = audioRef.current;
          if (!audio) return;
          const next = current !== null ? (current + 1) % playlist.length : 0;
          setCurrent(next);
          setPlaying(true);
          setTime(0);
          audio.src = playlist[next].src;
          audio.play().catch(() => setPlaying(false));
        }}
      />
    </div>
  );
}

function songHasSrc(src: string) {
  return !!src;
}

export default MusicPlayer;
