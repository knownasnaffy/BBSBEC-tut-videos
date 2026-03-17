import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BrowserFrame } from "./BrowserFrame";
import { Cursor } from "./Cursor";
import { GridBackground } from "./GridBackground";

export const tutorialSchema = z.object({
  screenshotSrc: z.string(),
  url: z.string(),
});

// Dimensions of the browser frame content area
const FRAME_W = 1400;
const FRAME_H = 787;
const CHROME_H = 44;

// Where to zoom into (normalized 0-1 within the screenshot)
const FOCUS_X = 0.5; // center-x of the region of interest
const FOCUS_Y = 0.54; // center-y of the region of interest
const ZOOM_SCALE = 2.5;

// Click happens at frame 120
const CLICK_FRAME = 220;

export const TutorialScene: React.FC<z.infer<typeof tutorialSchema>> = ({
  screenshotSrc,
  url,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Zoom animation: starts at frame 40, settles by ~80 ---
  const zoomProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 80, stiffness: 120, mass: 1 },
    durationInFrames: 40,
  });

  const scale = interpolate(zoomProgress, [0, 1], [1, ZOOM_SCALE]);

  // Translate so the focus point stays centered
  const totalW = FRAME_W;
  const totalH = FRAME_H + CHROME_H;
  const tx = interpolate(
    zoomProgress,
    [0, 1],
    [0, (0.5 - FOCUS_X) * totalW * ZOOM_SCALE],
  );
  const ty = interpolate(
    zoomProgress,
    [0, 1],
    [0, (0.5 - FOCUS_Y) * totalH * ZOOM_SCALE],
  );

  // --- Click animation: scale down then up ---
  const clickDown = spring({
    frame: frame - CLICK_FRAME,
    fps,
    config: { damping: 30, stiffness: 400 },
    durationInFrames: 8,
  });
  const clickUp = spring({
    frame: frame - (CLICK_FRAME + 8),
    fps,
    config: { damping: 30, stiffness: 400 },
    durationInFrames: 8,
  });
  const cursorScale =
    1 -
    interpolate(clickDown, [0, 1], [0, 0.25]) +
    interpolate(clickUp, [0, 1], [0, 0.25]);

  // Cursor position (normalized within the frame content area)
  const cursorNX = 0.5;
  const cursorNY = 0.645;
  const cursorX = cursorNX * FRAME_W;
  const cursorY = CHROME_H + cursorNY * FRAME_H;

  // Show click sound exactly at CLICK_FRAME
  const playClick = frame === CLICK_FRAME;

  return (
    <AbsoluteFill>
      <GridBackground />

      {/* Centered, elevated browser frame with zoom */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
            transformOrigin: "center center",
            position: "relative",
          }}
        >
          <BrowserFrame
            url={url}
            screenshotSrc={staticFile(screenshotSrc)}
            width={FRAME_W}
            height={FRAME_H}
          />

          {/* Cursor overlay */}
          <div
            style={{
              position: "absolute",
              left: cursorX,
              top: cursorY,
              pointerEvents: "none",
            }}
          >
            <Cursor type="pointer" scale={cursorScale} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Click sound */}
      {playClick && <Audio src={staticFile("click.mp3")} />}
    </AbsoluteFill>
  );
};
