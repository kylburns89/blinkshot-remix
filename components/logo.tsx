import { ComponentProps } from "react";

export default function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      width={228}
      height={24}
      viewBox="0 0 228 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
      <rect
        x="0"
        y="0"
        width="228"
        height="24"
        rx="12"
        fill="var(--primary)"
        className="animate-pulse"
      />
      <text
        x="114"
        y="17"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="var(--primary-foreground)"
        textAnchor="middle"
      >
        Blinkshot Remix
      </text>
    </svg>
  );
}
