import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "./constants";

const title: React.CSSProperties = {
  fontFamily: FONT_FAMILY,
  fontWeight: "bold",
  fontSize: 80,
  textAlign: "center",
  position: "absolute",
  bottom: 300,
  width: "100%",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const Title: React.FC<{
  readonly titleText: string;
  readonly titleColor: string;
}> = ({ titleText, titleColor }) => {
  const frame = useCurrentFrame();

  const words = titleText.split(" ");

  return (
    <h1 style={title}>
      {words.map((t, i) => {
        const delay = i * 5;
        const progress = interpolate(frame - delay, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const eased = 1 - Math.pow(1 - progress, 3);

        return (
          <span
            key={t}
            style={{
              ...word,
              color: titleColor,
              opacity: eased,
              transform: `translateY(${(1 - eased) * 40}px)`,
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
};
