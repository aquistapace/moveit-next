import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsactive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let countdownTimeOut: NodeJS.Timeout;

  function startCountdown() {
    setIsactive(true);
  }
  function stopCountdown() {
    clearInterval(countdownTimeOut);
    setIsactive(false);
  }

  function resetCountdown() {
    clearInterval(countdownTimeOut);
    setIsactive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsactive(false);
      startNewChallenge();
    }
  }, [isActive, time]);
  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
function startNewChallenge() {
  throw new Error("Function not implemented.");
}
