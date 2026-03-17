export const GridBackground: React.FC = () => {
  return (
    <svg
      style={{ position: "absolute", inset: 0 }}
      width="1920"
      height="1080"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1.5" fill="#7aaaf5" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="#2a5fe1" />
      <rect width="1920" height="1080" fill="url(#dots)" />
    </svg>
  );
};
