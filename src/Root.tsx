import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { TutorialScene, tutorialSchema } from "./Tutorial/TutorialScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
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
        id="Tutorial"
        component={TutorialScene}
        durationInFrames={420}
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
