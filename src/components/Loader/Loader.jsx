import { useEffect, useState } from "react";
import { TbArrowBigDownLines } from "react-icons/tb";
import "./Loader.css";

const steps = [
  "Sending request to server",
  "DNS resolved IP address",
  "Server processing request",
  "Server sent response",
  "Browser rendering content",
];

const Loader = () => {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < steps.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loaderScreen">
      {/* Spinner */}
      <div className="spinner"></div>

      <h1>Loading GPN Portfolio...</h1>

      {/* Steps */}
      <div className="loaderSteps">
        {steps.map((step, index) => {
          if (index >= completedSteps) return null;

          return (
            <div key={index}>
              <div className="loaderStep">
                <span>{step}</span>
                <span className="tick">✔</span>
              </div>

              {/* Arrow only between steps */}
              {index < steps.length - 1 && (
                <TbArrowBigDownLines className="arrIcon" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loader;
