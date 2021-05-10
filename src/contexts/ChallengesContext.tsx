import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

interface ChallengeProviderProps {
  children: ReactNode;
}
interface Challenges {
  type: " body" | "eye";
  description: string;
  amount: number;
}
interface ChallengeContextDataProps {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  challengeCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  // activeChallenge: object;
  activeChallenge: Challenges;
  experienceToNextLevel: number;
  completedChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextDataProps);

export function ChallengesProvider<ChallengeProviderProps>({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    new Audio("/notification.mp3").play();

    setActiveChallenge(challenge);

    if (Notification.permission === "granted") {
      new Notification("Novo Desafio", {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }
  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completedChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }
  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengeCompleted,
        startNewChallenge,
        resetChallenge,
        completedChallenge,
        activeChallenge,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
