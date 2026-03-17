import { Img, staticFile } from "remotion";

export type CursorType = "default" | "pointer" | "text";

interface CursorProps {
  type?: CursorType;
  scale?: number;
}

const cursorFile: Record<CursorType, string> = {
  default: staticFile("cursors/default.svg"),
  pointer: staticFile("cursors/handpointing.svg"),
  text: staticFile("cursors/textcursor.svg"),
};

// Hotspot as fraction of the 80px rendered size — offsets the image so the
// active point aligns with the position coordinate.
// default: tip is top-left corner → (0, 0)
// pointer: tip of index finger is ~40% from left, ~12% from top in the 32×32 SVG
// text: center-top → (50%, 0)
const hotspot: Record<CursorType, { x: number; y: number }> = {
  default: { x: 0.2, y: 0 },
  pointer: { x: 0.4, y: 0.12 },
  text: { x: 0.5, y: 0 },
};

const SIZE = 80;

export const Cursor: React.FC<CursorProps> = ({
  type = "default",
  scale = 1,
}) => {
  const hs = hotspot[type];
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        display: "inline-block",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
        pointerEvents: "none",
        marginLeft: -hs.x * SIZE,
        marginTop: -hs.y * SIZE,
      }}
    >
      <Img src={cursorFile[type]} style={{ width: SIZE, height: SIZE }} />
    </div>
  );
};
