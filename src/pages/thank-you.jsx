import { useEffect, useState,useContext } from "react";
import "../styles/thank-you.css";
import confetti from "canvas-confetti";
import { ReactComponent as Thanks } from "../assets/illustrations/people-clapping-on-balconies-animate.svg";
import "../styles/svg.css";
import { Link } from "react-router-dom";
import { DataContext } from "../controller/state";
import Seo from "../components/seo";

export default function Thankyou() {
  const [runOnce] = useState(null);
  const { state, dispatch } =useContext(DataContext)

  useEffect(() => {
    dispatch({type:'empty-cart'})
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
      <Seo title='thank you' />

        <h1>Your order is on the way..</h1>
        <h6>An email will be sent to you on the email address you provided</h6>
        <div className="svg-wrapper">
          <Thanks />
        </div>
        <Link to={'/shop' } className="button">Shop again</Link>
      </div>
    </>
  );
}
