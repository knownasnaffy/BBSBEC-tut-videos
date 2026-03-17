import "./index.css";
import { Composition } from "remotion";
import { Full } from "./Full";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Outro } from "./Outro";
import { TutorialScene, tutorialSchema } from "./Tutorial/TutorialScene";

// Total: 270 + 600 + 600 - 30 - 30 = 1410 frames
const FULL_DURATION = 210 + 600 + 400 - 30 - 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Full"
        component={Full}
        durationInFrames={FULL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Setting up Proctor Schedule",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="Outro"
        component={Outro}
        durationInFrames={400}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Tutorial"
        component={TutorialScene}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        schema={tutorialSchema}
        defaultProps={{
          url: "app.example.com",
        }}
      />
    </>
  );
};
