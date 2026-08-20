type AppLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

const sizes = {
  small: "size-9 rounded-xl",
  medium: "size-12 rounded-2xl",
  large: "size-16 rounded-[1.35rem]",
};

export function AppLogo({ size = "small", className = "" }: AppLogoProps) {
  return (
    <span
      aria-label="InterviewDesk"
      className={`grid shrink-0 place-items-center bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 shadow-lg shadow-violet-950/40 ${sizes[size]} ${className}`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-[62%] w-[62%]" fill="none">
        <rect x="6" y="7.5" width="20" height="18" rx="4" fill="rgba(255,255,255,.96)" />
        <path d="M10 5.5v4M22 5.5v4M6.5 12.5h19" stroke="#5b5ce2" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M11 17.2h5.2M11 21h3.3" stroke="#6d6eea" strokeWidth="2" strokeLinecap="round" />
        <circle cx="21.2" cy="20.3" r="4.2" fill="#252660" />
        <path d="M21.2 18v2.55l1.75 1" stroke="white" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
