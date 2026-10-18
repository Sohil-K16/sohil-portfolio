import { useEffect, useRef, useState } from "react";

export function Lightsaber() {
  const [ignited, setIgnited] = useState(false);
  const saberAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = saberAudio.current;

    return () => {
      audio?.pause();
    };
  }, []);

  const handleToggle = () => {
    const nextIgnited = !ignited;
    setIgnited(nextIgnited);

    // Fired from a click, so playback is allowed; ignored when it is not.
    if (!nextIgnited) return;
    const audio = saberAudio.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  return (
    <div className="absolute right-full top-10 z-40 mr-4 hidden justify-center px-6 py-6 xl:flex">
      <button
        type="button"
        aria-label="Toggle lightsaber"
        aria-pressed={ignited}
        onClick={handleToggle}
        className="group flex flex-col items-center gap-2 rounded-lg px-6 py-3 text-[var(--soft)] outline-none hover:text-[var(--fg)] focus-visible:ring-2 focus-visible:ring-[var(--fg)]/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
      >
        <svg
          viewBox="0 0 48 48"
          aria-hidden="true"
          focusable="false"
          className="size-[6.5rem] overflow-visible transition-transform duration-200 group-hover:rotate-9 group-active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
          shapeRendering="crispEdges"
        >
          <path d="M10 44h28v1H10z" fill="#9a9aa2" fillOpacity="0.35" />

          {/* Cape, boots, and shoulders. */}
          <path
            d="M14 24h18v4h3v7h2v7H10v-7h2v-7h2z"
            fill="#1a1a1e"
            stroke="#9a9aa2"
            strokeWidth="0.5"
          />
          <path d="M14 29h2v11h-2zM31 29h2v11h-2z" fill="#9a9aa2" fillOpacity="0.4" />
          <path d="M18 38h5v5h-7v-2h2zM25 38h5v3h2v2h-7z" fill="#1a1a1e" />

          {/* Helmet and the stepped brow. */}
          <path
            d="M20 5h8v2h3v3h2v9h2v4h-5v2H18v-2h-5v-4h2v-9h2V7h3z"
            fill="#1a1a1e"
            stroke="#9a9aa2"
            strokeWidth="0.5"
          />
          <path d="M20 8h3v2h-3v3h-2v5h-2v-7h2V9h2zM24 7h2v8h-2z" fill="#9a9aa2" fillOpacity="0.6" />
          <path d="M18 15h5v3h-2v-1h-3zM25 15h5v2h-3v1h-2z" fill="#9a9aa2" />
          <path d="M23 18h2v2h2v3h-6v-3h2z" fill="#9a9aa2" />
          <path d="M22 21h1v3h-1zM24 20h1v4h-1zM26 21h1v3h-1z" fill="#0a0a0a" />
          <path d="M17 20h2v2h-2zM29 20h2v2h-2z" fill="#9a9aa2" />

          {/* Chest panel and belt. */}
          <path d="M19 27h10v7H19z" fill="#9a9aa2" fillOpacity="0.5" />
          <path d="M20 28h2v2h-2z" fill="#e5484d" />
          <path d="M23 28h2v2h-2zM26 28h2v2h-2zM20 31h8v1h-8zM16 36h16v2H16z" fill="#9a9aa2" />
          <path d="M22 35h4v4h-4z" fill="#52525b" />

          {/* Center the hilt through the fist, with both ends visible behind the hand. */}
          <g transform="translate(-3.5 0) rotate(-135 39 32)">
            <g
              style={{
                transform: `scaleY(${ignited ? 1 : 0})`,
                transformOrigin: "39px 26px",
                filter: ignited ? "drop-shadow(0 0 2px #e5484d)" : "none",
              }}
              className="transition-transform duration-200 motion-reduce:transition-none"
            >
              <path d="M38 5h2v21h-2z" fill="#e5484d" />
              <path d="M38.75 6h0.5v20h-0.5z" fill="#ffffff" />
            </g>
            <path d="M37 26h4v2h-1v9h-2v-9h-1z" fill="#9a9aa2" />
          </g>
          <path
            d="M32 30h7v4h-7z"
            fill="#1a1a1e"
            stroke="#9a9aa2"
            strokeWidth="0.5"
          />
        </svg>
        <span className="font-mono text-[10px]">
          {ignited ? "Power down" : "Ignite lightsaber"}
        </span>
      </button>

      <audio src="/lightsader.mp3" ref={saberAudio} preload="none" />
    </div>
  );
}

export default Lightsaber;
