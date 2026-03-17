import {
  TransitionSeries,
  linearTiming,
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Outro } from "./Outro";
import { TutorialScene } from "./Tutorial/TutorialScene";

// Custom blur-fade presentation
const BlurFadeComponent: React.FC<
  TransitionPresentationComponentProps<Record<string, never>>
> = ({ presentationProgress, presentationDirection, children }) => {
  const isEntering = presentationDirection === "entering";
  // Only fade in the entering scene; exiting scene stays fully opaque beneath it
  const opacity = isEntering ? presentationProgress : 1;
  const blur = isEntering ? 0 : 12 * Math.sin(presentationProgress * Math.PI);

  return (
    <AbsoluteFill
      style={{ opacity, filter: blur ? `blur(${blur}px)` : undefined }}
    >
      {children}
    </AbsoluteFill>
  );
};

function blurFade(): TransitionPresentation<Record<string, never>> {
  return { component: BlurFadeComponent, props: {} };
}

const TRANSITION_FRAMES = 30;

export const Full: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={210}>
        <HelloWorld
          titleText="Setting up Proctor Schedule"
          titleColor="#000000"
        />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={blurFade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />
      <TransitionSeries.Sequence durationInFrames={600}>
        <TutorialScene url="app.example.com" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={blurFade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />
      <TransitionSeries.Sequence durationInFrames={400}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
