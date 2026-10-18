import { useEffect, useRef, useState } from "react";
import { Music, X, ChevronDown } from "lucide-react";
import { site } from "@/config/site";
import { spotifyMeta } from "@/config/spotify-meta.generated";
import SpotifyCard from "@/components/SpotifyCard";

const metaByTrack = new Map(
  spotifyMeta.map((meta) => [meta.spotify, meta]),
);

// Only tracks whose metadata was baked in by `npm run songs:sync` are
// playable; the rest show up greyed out until they're synced.
const tracks = site.songs.flatMap((song) => {
  const meta = metaByTrack.get(
    song.spotify.replace(/\/intl-[a-z]{2}\//, "/"),
  );
  if (!meta || !meta.title) return [];
  return [{ ...meta, link: song.spotify }];
});

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const activeIndex = Math.min(current, Math.max(tracks.length - 1, 0));
  const activeTrack = tracks[activeIndex] ?? null;

  const playTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio || !tracks[index]?.audio) return;
    if (current === index && playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (current === index && !playing) {
      audio.play().catch(() => setPlaying(false));
      setPlaying(true);
      return;
    }
    setCurrent(index);
    setPlaying(true);
    audio.src = tracks[index].audio;
    audio.volume = 0.7;
    audio.play().catch(() => {
      setPlaying(false);
      console.error("Song playback failed:", tracks[index].title);
    });
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="fixed right-2 bottom-2 z-50 hidden xl:block">
      {/* Popup panel */}
      {open && (
        <div className="absolute right-0 bottom-full mb-3 w-80 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--chip)] px-4 py-3">
            <div className="flex items-center gap-2">
              <Music className="size-4 text-[var(--soft)]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--fg)] uppercase">
                Playlist
              </span>
            </div>
            <button
              type="button"
              aria-label="Close playlist"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)]"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Spotify-style card for the selected track */}
          <div className="p-3">
            <SpotifyCard
              meta={
                activeTrack
                  ? {
                      title: activeTrack.title,
                      artist: activeTrack.artist,
                      image: activeTrack.image,
                      audio: activeTrack.audio,
                      link: activeTrack.link,
                    }
                  : null
              }
              isPlaying={playing}
              onToggle={() =>
                activeTrack ? playTrack(activeIndex) : undefined
              }
              className={
                activeTrack ? "" : "p-3"
              }
            />
          </div>

          {/* Track list */}
          <ul className="max-h-56 divide-y divide-[var(--line)] overflow-y-auto border-t border-[var(--line)]">
            {tracks.map((track, i) => {
              const isActive = current === i;
              return (
                <li key={`${track.link}-${i}`}>
                  <button
                    type="button"
                    onClick={() => playTrack(i)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-[var(--hover)]"
                        : "hover:bg-[var(--hover)]"
                    }`}
                  >
                    <span
                      className="size-8 shrink-0 overflow-hidden rounded-md border border-[var(--line)]"
                      aria-hidden="true"
                    >
                      <img
                        src={track.image}
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block truncate text-[13px] font-medium ${
                          isActive
                            ? "text-[var(--fg)]"
                            : "text-[var(--muted)]"
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="block truncate font-mono text-[10px] text-[var(--soft)]">
                        {track.artist}
                      </span>
                    </span>
                    {isActive && playing && (
                      <span className="flex h-4 shrink-0 items-end gap-0.5">
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
        </div>
      )}

      {/* Corner launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-2.5 cursor-pointer rounded-xl border-2 px-5 py-3 font-mono text-sm tracking-widest uppercase font-bold transition-all duration-200 ${
          open || playing
            ? "border-emerald-500 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 hover:-translate-y-0.5"
            : "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 hover:bg-[var(--bg)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
        }`}
      >
        {open ? (
          <ChevronDown className="size-5" />
        ) : playing ? (
          <span className="flex h-5 items-end gap-1">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className="w-1 animate-pulse rounded-full bg-emerald-400"
                style={{
                  height: `${8 + (bar % 2) * 5}px`,
                  animationDelay: `${bar * 150}ms`,
                }}
              />
            ))}
          </span>
        ) : (
          <Music className="size-5" />
        )}
        {open ? "Close" : "Play Song"}
      </button>

      <audio
        ref={audioRef}
        onEnded={() => {
          if (tracks.length === 0) return;
          playTrack((activeIndex + 1) % tracks.length);
        }}
      />
    </div>
  );
}

export default MusicPlayer;
