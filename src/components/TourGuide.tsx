import React, { useEffect, useState, useRef } from "react";
import Overlay from "./Overlay";
import "./TourGuide.css";
import { ITourGuideProps } from "../types/app.types";

export const TourGuide: React.FC<ITourGuideProps> = ({
  steps,
  isTourActive,
  onClose,
  handleCompleted
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
    position?: "top" | "bottom" | "left" | "right"|"absoulte";
    arrowOffset: number;
  } | null>(null);

  const targetElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (steps.length && isTourActive) {
      setIsVisible(true);
      setCurrentStep(0);
    } else {
      setIsVisible(false);
    }
  }, [steps, isTourActive]);

  useEffect(() => {
    if (isVisible && steps[currentStep]?.id) {
      const target = document.getElementById(steps[currentStep].id);
      if (target) {
        targetElementRef.current = target;

        // Ensure the target is in view
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        const { top, left, width, height } = target.getBoundingClientRect();
        const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

        const positionData = calculatePopupPosition({
          top,
          left,
          width,
          height,
          viewportWidth,
          viewportHeight,
        });

        setPopupPosition({
          top: positionData.top + window.scrollY,
          left: positionData.left + window.scrollX,
          position: positionData.position,
          arrowOffset: positionData.arrowOffset,
        });

        // Highlight the target element
        target.style.zIndex = "1001";
        target.style.position = "relative";
      }
    }

    return () => {
      if (targetElementRef.current) {
        targetElementRef.current.style.zIndex = "";
        targetElementRef.current.style.position = "";
      }
    };
  }, [isVisible, currentStep, steps]);

  const calculatePopupPosition = ({
    top,
    left,
    width,
    height,
    viewportWidth,
    viewportHeight,
  }: {
    top: number;
    left: number;
    width: number;
    height: number;
    viewportWidth: number;
    viewportHeight: number;
  }) => {
    const spaceAbove = top;
    const spaceBelow = viewportHeight - (top + height);
    const spaceLeft = left;
    const spaceRight = viewportWidth - (left + width);

    let position: "top" | "bottom" | "left" | "right" = "bottom";
    let adjustedTop = 0;
    let adjustedLeft = 0;
    let arrowOffset = 0;

    if (spaceBelow >= 150) {
      position = "bottom";
      adjustedTop = top + height + 10;
      adjustedLeft = clamp(left + width / 2 - 125, 10, viewportWidth - 250);
      arrowOffset = left + width / 2 - adjustedLeft;
    } else if (spaceAbove >= 150) {
      position = "top";
      adjustedTop = top - 85;
      adjustedLeft = clamp(left + width / 2 - 125, 10, viewportWidth - 250);
      arrowOffset = left + width / 2 - adjustedLeft;
    } else if (spaceRight >= 160) {
      position = "right";
      adjustedTop = top + height / 2 - 30;
      adjustedLeft = left + width + 10;
      arrowOffset = top + height / 2 - adjustedTop;
    } else if (spaceLeft >= 160) {
      position = "left";
      adjustedTop = top + height / 2 - 30;
      adjustedLeft = left - 160;
      arrowOffset = top + height / 2 - adjustedTop;
    } else {
      position = "bottom";
      adjustedTop = Math.min(top + height + 10, viewportHeight - 60);
      adjustedLeft = clamp(left + width / 2 - 125, 10, viewportWidth - 250);
      arrowOffset = left + width / 2 - adjustedLeft;
    }

    return { top: adjustedTop, left: adjustedLeft, position, arrowOffset };
  };

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      handleCompleted();
      handleClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleClose = () => {
    setIsVisible(false);
    setCurrentStep(0);
    onClose();
  };

  if (!isVisible || !popupPosition) return null;

  return (
    <>
      <Overlay
        activeElementId={steps[currentStep]?.id}
        totalElements={steps.map((step) => step.id)}
      />
      <div className="tour-guide-popup" style={{
       top : popupPosition.top,
       left: popupPosition.left,
      }
      }>
        <button
          onClick={handleClose}
          className="button-close"
          aria-label="Close"
        >
          &times;
        </button>
        <div
          className={`popup-arrow popup-arrow-${popupPosition.position}`}
          style={
            {
              "--arrow-offset": `${popupPosition.arrowOffset}px`,
            } as React.CSSProperties
          }
        />
        <div className="popup-content">
          <p>{steps[currentStep]?.content}</p>
          <div className="popup-buttons">
            <div className="left-buttons">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="button-previous"
              >
                Previous
              </button>
              <button onClick={handleClose} className="button-skip">
                Skip
              </button>
            </div>
            <div className="right-buttons">
              <button onClick={handleNext} className="button-next">
                {`Next (${currentStep + 1}/${steps.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
