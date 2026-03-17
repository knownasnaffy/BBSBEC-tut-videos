import "./index.css";
import { Composition } from "remotion";
import { Full } from "./Full";
import { Intro, introSchema } from "./Intro";
import { Outro } from "./Outro";
import { TutorialScene, tutorialSchema } from "./Tutorial/TutorialScene";

const INTRO_FRAMES = 210;
const TUTORIAL_FRAMES = 600;
const OUTRO_FRAMES = 400;
const TRANSITION_FRAMES = 30;
const FULL_DURATION =
  INTRO_FRAMES + TUTORIAL_FRAMES + OUTRO_FRAMES - TRANSITION_FRAMES * 2;

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
        id="Intro"
        component={Intro}
        durationInFrames={INTRO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
        schema={introSchema}
        defaultProps={{
          titleText: "Setting up Proctor Schedule",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="Outro"
        component={Outro}
        durationInFrames={OUTRO_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Tutorial"
        component={TutorialScene}
        durationInFrames={TUTORIAL_FRAMES}
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
