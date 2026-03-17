import { Img, staticFile } from "remotion";

export type CursorType = "default" | "pointer" | "text";

interface CursorProps {
  type?: CursorType;
  /** Scale factor for click animation (1 = normal, <1 = pressed) */
  scale?: number;
}

const cursorFile: Record<CursorType, string> = {
  default: staticFile("cursors/default.svg"),
  pointer: staticFile("cursors/handpointing.svg"),
  text: staticFile("cursors/textcursor.svg"),
};

export const Cursor: React.FC<CursorProps> = ({ type = "default", scale = 1 }) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        display: "inline-block",
        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
        pointerEvents: "none",
      }}
    >
      <Img src={cursorFile[type]} style={{ width: 80, height: 80 }} />
    </div>
  );
};
