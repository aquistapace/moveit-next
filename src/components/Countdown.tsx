import { useEffect, useState } from "react";
import styles from "../styles/components/Countdown.module.css";

export function Countdown() {
  const [time, setTime] = useState(1 * 60);
  const [isActive, setIsactive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLef, secondRight] = String(seconds).padStart(2, "0").split("");

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
    setTime(1 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsactive(false);
    }
  }, [isActive, time]);
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLef}</span>
          <span>{secondRight}</span>
        </div>
        <div></div>
      </div>
      {hasFinished ? (
        <button type="button" disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={() => resetCountdown()}
            >
              Abandonar o ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={() => startCountdown()}
            >
              Iniciar o ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
