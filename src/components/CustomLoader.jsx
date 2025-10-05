// File: src/components/CustomLoader.jsx
import React from "react";

const CustomLoader = ({ name = "Jahid's Portfolio", type = "typing" }) => { 
  if (type === "typing") {
    return (
      <div style={styles.wrapper}>
        <span style={{ ...styles.typing, ...styles.animationTyping }}>
          Loading {name}
        </span>
        <span style={{ ...styles.cursor, ...styles.animationBlink }} />
        <ExtraStyles />
      </div>
    );
  }

  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative w-28 h-28">
          {/* Outer slow spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 animate-spin-slow"></div>
          {/* Fast spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
          {/* Name inside */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold tracking-wide">{name}</span>
          </div>
        </div>

        {/* Inline CSS for slow spin */}
        <style>
          {`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
          `}
        </style>
      </div>
    );
  }

  return null;
};

// Inline styles for Typing Loader
const styles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    fontSize: "1.25rem",
    gap: "8px",
    color: "#111827",
  },
  typing: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    display: "inline-block",
  },
  cursor: {
    width: "2px",
    height: "1.2rem",
    background: "currentColor",
    display: "inline-block",
    marginLeft: "2px",
  },
  animationTyping: {
    animation: "typing 2.2s steps(20,end) infinite",
  },
  animationBlink: {
    animation: "blink 1s step-end infinite",
  },
};

// Extra animations injected via <style>
const ExtraStyles = () => (
  <style>
    {`
      @keyframes typing {
        0% { max-width: 0; }
        60% { max-width: 100%; }
        100% { max-width: 100%; opacity: 0.6; }
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
    `}
  </style>
);

export default CustomLoader;
