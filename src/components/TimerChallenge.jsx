import React, { useRef, useState } from "react";
import ResultModal from "./ResultModal";

const TimerChallenge = ({ title, targetTime }) => {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timeIsActive = timeRemaining >= 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 10);
    }, 10);
  };

  const resetHandler = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        remainingTime={timeRemaining}
        targetTime={targetTime}
        resetTime={resetHandler}
      />
      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : "undefined"}>
          {timeIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
