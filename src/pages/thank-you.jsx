import { useEffect, useState } from "react";
import "../styles/thank-you.css";
import confetti from "canvas-confetti";
import { ReactComponent as Thanks } from "../assets/illustrations/people-clapping-on-balconies-animate.svg";
import "../styles/svg.css";

export default function Thankyou() {
  const [runOnce] = useState(null);

  useEffect(() => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => {};
  }, [runOnce]);
  return (
    <>
      <div className="thank-you-page">
        <h1>Thank you for shopping with us</h1>
        <div className="svg-wrapper">
          <Thanks />
        </div>
        <div className="button">Shop again</div>
      </div>
    </>
  );
}
