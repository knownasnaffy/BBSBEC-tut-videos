import { zColor } from "@remotion/zod-types";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({
  titleText: propOne,
  titleColor: propTwo,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Animate from 0 to 1 after 25 frames
  const logoTranslationProgress = spring({
    frame: frame - 48,
    fps,
    config: {
      damping: 100,
    },
  });

  // Move the logo up by 150 pixels once the transition starts
  const logoTranslation = interpolate(
    logoTranslationProgress,
    [0, 1],
    [0, -90],
  );

  // Slide-fade out: elements move up and fade out
  const outProgress = interpolate(
    frame,
    [durationInFrames - 50, durationInFrames - 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const outEased = 1 - Math.pow(1 - outProgress, 3);
  const opacity = 1 - outEased;
  const slideOut = interpolate(outEased, [0, 1], [0, -60]);

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill style={{ opacity, transform: `translateY(${slideOut}px)` }}>
        <AbsoluteFill style={{ transform: `translateY(${logoTranslation}px)` }}>
          <Logo />
        </AbsoluteFill>
        <Sequence from={65}>
          <Title titleText={propOne} titleColor={propTwo} />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
