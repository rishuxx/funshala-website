import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

type PageName = string;

type TransitionState = "idle" | "in" | "out";

// Context to provide the function that triggers the transition
const TransitionTriggerContext = createContext<
  ((targetPage: PageName) => void) | undefined
>(undefined);

// Context to provide the current state of the transition ('idle', 'in', 'out')
const TransitionStateContext = createContext<TransitionState>("idle");

export const useTransitionTrigger = () => {
  const context = useContext(TransitionTriggerContext);
  if (context === undefined) {
    throw new Error(
      "useTransitionTrigger must be used within a TransitionProvider"
    );
  }
  return context;
};

export const useTransitionState = () => {
  return useContext(TransitionStateContext);
};

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({
  children,
}) => {
  const [transitionState, setTransitionState] =
    useState<TransitionState>("idle");
  const navigate = useNavigate();

  const triggerTransition = useCallback(
    (targetPath: PageName) => {
      if (transitionState !== "idle") return;

      // Start 'in' animation (wipes screen)
      setTransitionState("in");

      const animationDuration = 600; // Corresponds to the rainbow wipe animation duration in CSS

      // Wait for the 'in' animation to cover the screen, then navigate.
      setTimeout(() => {
        navigate(targetPath);
        window.scrollTo(0, 0);
        // Immediately start the 'out' animation after the route changes
        setTransitionState("out");
      }, animationDuration);

      // After the 'out' animation is complete, reset to 'idle'
      setTimeout(() => {
        setTransitionState("idle");
      }, animationDuration * 2); // Total duration of 'in' + 'out'
    },
    [transitionState, navigate]
  );

  return (
    <TransitionTriggerContext.Provider value={triggerTransition}>
      <TransitionStateContext.Provider value={transitionState}>
        {children}
      </TransitionStateContext.Provider>
    </TransitionTriggerContext.Provider>
  );
};
