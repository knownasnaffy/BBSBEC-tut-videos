import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "./HelloWorld/constants";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const DELAY = 30;
  const subtitleProgress = Math.min(1, Math.max(0, (frame - DELAY) / 20));
  const subtitleEased = 1 - Math.pow(1 - subtitleProgress, 3);

  const titleProgress = Math.min(1, Math.max(0, (frame - DELAY - 15) / 20));
  const titleEased = 1 - Math.pow(1 - titleProgress, 3);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      <p
        style={{
          fontSize: 36,
          color: "#09090B",
          margin: 0,
          marginBottom: 16,
          opacity: subtitleEased,
          transform: `translateY(${interpolate(subtitleEased, [0, 1], [20, 0])}px)`,
        }}
      >
        Read the documentation at:
      </p>
      <p
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color: "#155DFC",
          margin: 0,
          opacity: titleEased,
          transform: `translateY(${interpolate(titleEased, [0, 1], [20, 0])}px)`,
        }}
      >
        docs.bbsbec.edu.in
      </p>
    </AbsoluteFill>
  );
};
