import { CursorType } from "./Cursor";

export interface ScreenshotStep {
  /** Path passed to staticFile() */
  src: string;
  /** Frame at which this screenshot becomes active */
  from: number;
  /** Normalized focus point (0-1) within the screenshot content area */
  focusX: number;
  focusY: number;
  /** Zoom scale (1 = no zoom) */
  zoom: number;
  /** How many frames the zoom-in animation takes */
  zoomDuration: number;
}

export interface CursorStep {
  /** Frame at which cursor starts moving to this position */
  from: number;
  /** How many frames the move takes */
  moveDuration: number;
  /** Normalized position (0-1) within the screenshot content area */
  x: number;
  y: number;
  type: CursorType;
  /** If true, plays a click animation + sound at (from + moveDuration) */
  click?: boolean;
}
