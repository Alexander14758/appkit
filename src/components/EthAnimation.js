import { Player } from "@lottiefiles/react-lottie-player";
import { useInView } from "react-intersection-observer";
import animationData from "./ethereum_rotate_animation.json"; // path to your JSON file

function EthAnimation() {
  const { ref, inView } = useInView({
    triggerOnce: false, // Play every time it comes into view
    threshold: 0.5, // 50% of the animation must be visible
  });

  return (
    <div ref={ref} style={{ width: 300, height: 300, margin: "0 auto" }}>
      {inView && (
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "100%", width: "100%" }}
        />
      )}
    </div>
  );
}

export default EthAnimation;
