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
          <circle cx="1" cy="1" r="1.5" fill="#5b8dee" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="#a8c4f5" />
      <rect width="1920" height="1080" fill="url(#dots)" />
    </svg>
  );
};
