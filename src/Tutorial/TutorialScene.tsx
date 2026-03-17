import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BrowserFrame } from "./BrowserFrame";
import { Cursor } from "./Cursor";
import { GridBackground } from "./GridBackground";
import { CursorStep, ScreenshotStep } from "./types";

export const tutorialSchema = z.object({
  url: z.string(),
});

const FRAME_W = 1600;
const FRAME_H = 900;
const CHROME_H = 44;
const TOTAL_H = FRAME_H + CHROME_H;

// --- Timeline definition ---
// First entry is the "rest" state (zoom=1, centered). Zoom-in starts at frame 90 (~2s after cursor arrives).
const SCREENSHOTS: ScreenshotStep[] = [
  {
    src: "screenshots/auth.png",
    from: 0,
    focusX: 0.5,
    focusY: 0.5,
    zoom: 1,
    zoomDuration: 1,
  },
  {
    src: "screenshots/auth.png",
    from: 90,
    focusX: 0.5,
    focusY: 0.567,
    zoom: 2.4,
    zoomDuration: 40,
  },
  {
    src: "screenshots/dashboard.png",
    from: 283,
    focusX: 0.5,
    focusY: 0.5,
    zoom: 1,
    zoomDuration: 30,
  },
  {
    src: "screenshots/dashboard.png",
    from: 390,
    focusX: 0.3,
    focusY: 0.3,
    zoom: 2.5,
    zoomDuration: 40,
  },
  {
    src: "screenshots/sidebar.png",
    from: 493,
    focusX: 0.3,
    focusY: 0.3,
    zoom: 2.5,
    zoomDuration: 30,
  },
];

const CURSORS: CursorStep[] = [
  { from: 0, moveDuration: 0, x: -0.2, y: -0.2, type: "default" },
  { from: 30, moveDuration: 40, x: 0.53, y: 0.62, type: "pointer" },
  {
    from: 280,
    moveDuration: 0,
    x: 0.53,
    y: 0.62,
    type: "pointer",
    click: true,
  },
  { from: 283, moveDuration: 0, x: 0.53, y: 0.62, type: "default" },
  { from: 301, moveDuration: 60, x: 1.15, y: 1.1, type: "default" },
  // Second view: cursor comes back in, moves to target, clicks
  { from: 390, moveDuration: 40, x: 0.015, y: 0.015, type: "pointer" },
  {
    from: 490,
    moveDuration: 0,
    x: 0.015,
    y: 0.015,
    type: "pointer",
    click: true,
  },
  { from: 493, moveDuration: 0, x: 0.015, y: 0.015, type: "default" },
  { from: 511, moveDuration: 40, x: 0.15, y: 0.01, type: "default" },
];

// --- Helpers ---

function getActiveStep<T extends { from: number }>(
  steps: T[],
  frame: number,
): T {
  let active = steps[0];
  for (const s of steps) {
    if (frame >= s.from) active = s;
  }
  return active;
}

function easeOutExpo(t: number) {
  return interpolate(t, [0, 1], [0, 1], {
    easing: Easing.out(Easing.exp),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

// --- Component ---

export const TutorialScene: React.FC<z.infer<typeof tutorialSchema>> = ({
  url,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Screenshot / zoom ---
  const shot = getActiveStep(SCREENSHOTS, frame);
  const zoomT = easeOutExpo(
    Math.min(1, (frame - shot.from) / shot.zoomDuration),
  );
  const prevShot = SCREENSHOTS[Math.max(0, SCREENSHOTS.indexOf(shot) - 1)];
  const fromZoom = prevShot.zoom;
  const scale = interpolate(zoomT, [0, 1], [fromZoom, shot.zoom]);
  // Translation: offset is 0 at scale=1, grows with zoom. Uses (scale-1) so window stays centered when unzoomed.
  const tx =
    (0.5 - interpolate(zoomT, [0, 1], [prevShot.focusX, shot.focusX])) *
    FRAME_W *
    (scale - 1);
  const ty =
    (0.5 - interpolate(zoomT, [0, 1], [prevShot.focusY, shot.focusY])) *
    TOTAL_H *
    (scale - 1);

  // --- Cursor position (in browser-frame local space) ---
  const curIdx = (() => {
    let idx = 0;
    for (let i = 0; i < CURSORS.length; i++) {
      if (frame >= CURSORS[i].from) idx = i;
    }
    return idx;
  })();
  const curStep = CURSORS[curIdx];
  const prevCurStep = CURSORS[Math.max(0, curIdx - 1)];
  const moveT =
    curStep.moveDuration === 0
      ? 1
      : easeOutExpo(
          Math.min(
            1,
            Math.max(0, (frame - curStep.from) / curStep.moveDuration),
          ),
        );
  const cursorType = curStep.type;
  const curX = interpolate(moveT, [0, 1], [prevCurStep.x, curStep.x]) * FRAME_W;
  const curY =
    CHROME_H + interpolate(moveT, [0, 1], [prevCurStep.y, curStep.y]) * FRAME_H;

  // --- Click animation (supports multiple clicks) ---
  const clickSteps = CURSORS.filter((s) => s.click);
  const clickFrames = clickSteps.map((s) => s.from + s.moveDuration);
  // Find the most recent click frame that has started
  const activeClickFrame =
    [...clickFrames].reverse().find((f) => frame >= f) ?? -999;
  const clickDown = spring({
    frame: frame - activeClickFrame,
    fps,
    config: { damping: 30, stiffness: 400 },
    durationInFrames: 8,
  });
  const clickUp = spring({
    frame: frame - (activeClickFrame + 8),
    fps,
    config: { damping: 30, stiffness: 400 },
    durationInFrames: 8,
  });
  const cursorScale =
    1 -
    interpolate(clickDown, [0, 1], [0, 0.25]) +
    interpolate(clickUp, [0, 1], [0, 0.25]);

  return (
    <AbsoluteFill>
      <GridBackground />

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
            screenshotSrc={staticFile(shot.src)}
            width={FRAME_W}
            height={FRAME_H}
          />
          {/* Cursor inside scaled div so it inherits the zoom transform */}
          <div
            style={{
              position: "absolute",
              left: curX,
              top: curY,
              pointerEvents: "none",
            }}
          >
            <Cursor type={cursorType} scale={cursorScale} />
          </div>
        </div>
      </AbsoluteFill>

      {/* Click sounds */}
      {clickFrames.map((cf) => (
        <Sequence key={cf} from={cf} durationInFrames={10} premountFor={fps}>
          <Audio src="https://remotion.media/mouse-click.wav" />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
