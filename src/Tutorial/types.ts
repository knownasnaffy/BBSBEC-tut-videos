import { EasingFunction } from "remotion";
import { CursorType } from "./Cursor";

export interface ScreenshotStep {
  src: string;
  from: number;
  focusX: number;
  focusY: number;
  zoom: number;
  zoomDuration: number;
  /** Easing for the zoom scale transition. Defaults to easeOutCubic. */
  zoomEasing?: EasingFunction;
  /** Easing for the focus pan transition. Defaults to easeOutCubic. */
  focusEasing?: EasingFunction;
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
