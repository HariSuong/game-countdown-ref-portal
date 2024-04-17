import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(
  ({ remainingTime, targetTime, resetTime }, ref) => {
    const dialog = useRef();

    const useLost = remainingTime <= 0;

    const fomattedTimeRemaining = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    return createPortal(
      <dialog className="result-modal" ref={dialog}>
        {useLost && <h2>You Lost</h2>}
        {!useLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{fomattedTimeRemaining} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={resetTime}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
