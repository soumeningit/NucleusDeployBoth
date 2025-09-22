import useOnScreen from "../../customhooks/useOnScreen";

function AnimatedElement({ children, customClass = "" }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${customClass} transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default AnimatedElement;
