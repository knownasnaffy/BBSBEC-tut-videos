import { Img } from "remotion";

interface BrowserFrameProps {
  url: string;
  screenshotSrc: string;
  width: number;
  height: number;
}

const CHROME_HEIGHT = 44;
const RADIUS = 12;

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  url,
  screenshotSrc,
  width,
  height,
}) => {
  return (
    <div
      style={{
        width,
        height: height + CHROME_HEIGHT,
        borderRadius: RADIUS,
        overflow: "hidden",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      {/* Safari-style chrome bar */}
      <div
        style={{
          height: CHROME_HEIGHT,
          background: "linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
          flexShrink: 0,
        }}
      >
        {/* Traffic lights */}
        {(["#ff5f57", "#febc2e", "#28c840"] as const).map((color) => (
          <div
            key={color}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              backgroundColor: color,
              flexShrink: 0,
            }}
          />
        ))}

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            margin: "0 12px",
            height: 26,
            borderRadius: 6,
            backgroundColor: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: 0.2,
            }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <Img
        src={screenshotSrc}
        style={{ width, height, display: "block", objectFit: "cover" }}
      />
    </div>
  );
};
