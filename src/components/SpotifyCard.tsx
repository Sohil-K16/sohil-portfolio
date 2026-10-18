import { SiSpotify } from "@icons-pack/react-simple-icons";

export type SpotifyTrackMeta = {
  title: string;
  artist: string;
  image: string;
  audio: string;
  link: string;
};

type SpotifyCardProps = {
  meta: SpotifyTrackMeta | null;
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
};

export function SpotifyCard({
  meta,
  isPlaying,
  onToggle,
  className = "",
}: SpotifyCardProps) {
  if (!meta) {
    return (
      <div
        className={`flex h-[100px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--chip)] p-6 text-[12px] text-[var(--soft)] ${className}`}
        aria-hidden="true"
      >
        Run "npm run songs:sync" to load track data.
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-[100px] w-full items-stretch overflow-hidden rounded-2xl border border-[var(--line)] ${className}`}
    >
      {/* Blurred album-art backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={meta.image}
          alt=""
          className="absolute top-0 left-0 block h-full w-full blur-[50px] brightness-150"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_.8))]" />
      </div>

      {/* Cover + spinning vinyl */}
      <button
        type="button"
        aria-label={isPlaying ? "Pause preview" : "Play preview"}
        onClick={onToggle}
        className="group relative z-[1] w-full max-w-[75px] cursor-pointer self-center"
      >
        <img
          src={meta.image}
          alt={meta.title}
          className={`pointer-events-none relative z-[1] min-h-[75px] min-w-[75px] w-full rounded-lg object-cover shadow-md transition-transform duration-300 ease-out group-hover:-translate-x-0.5 ${
            isPlaying ? "-translate-x-0.5" : ""
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -z-[1] size-[80%] -translate-y-1/2 transition-all duration-300 ${
            isPlaying
              ? "translate-x-[-10%]"
              : "translate-x-[-50%] group-hover:translate-x-[-10%]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 110 110"
            className="size-full animate-spin"
            style={{
              animationDuration: "3s",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
            aria-hidden="true"
          >
            <circle cx="55" cy="55" r="55" fill="#000" />
            <mask
              id="spotify-card-mask"
              width="110"
              height="110"
              x="0"
              y="0"
              maskUnits="userSpaceOnUse"
              style={{ maskType: "alpha" }}
            >
              <circle cx="55" cy="55" r="55" fill="#000" />
            </mask>
            <g mask="url(#spotify-card-mask)">
              <circle cx="55" cy="55" r="51.5" stroke="#fff" strokeOpacity="0.21" />
              <circle cx="55" cy="55" r="47.5" stroke="#fff" strokeOpacity="0.21" />
              <circle cx="55" cy="55" r="45.5" stroke="#fff" strokeOpacity="0.21" />
              <circle cx="55" cy="55" r="43.5" stroke="#fff" strokeOpacity="0.21" />
              <circle cx="55" cy="55" r="37.5" stroke="#fff" strokeOpacity="0.21" />
              <circle cx="55" cy="55" r="34.5" stroke="#fff" strokeOpacity="0.21" />
              <path fill="#fff" d="M-14 38l68 19.579L-14 74V38z" />
              <path fill="#fff" d="M123 38L55 57.579 123 74V38z" />
              <path fill="#fff" d="M36.5 124.5l19.579-68 16.421 68h-36z" />
              <path fill="#fff" d="M36.5-12.5l19.579 68 16.421-68h-36z" />
            </g>
          </svg>
        </div>
      </button>

      {/* Text block */}
      <div className="z-10 flex w-full flex-col justify-between">
        <div className="self-end pr-1">
          <a
            href={meta.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open on Spotify"
            className="cursor-pointer"
          >
            <SiSpotify size={18} className="text-[#BAAEBA]" />
          </a>
        </div>
        <div className="pb-1 pr-2 pl-6 text-right">
          <h2
            className="text-sm font-semibold tracking-[-.006em] whitespace-nowrap text-[#D6D1D4]"
            title={meta.title}
          >
            {meta.title}
          </h2>
          <h2
            className="text-sm font-medium tracking-[-.006em] whitespace-nowrap text-[#BAAEBA]"
            title={meta.artist}
          >
            {meta.artist}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SpotifyCard;
