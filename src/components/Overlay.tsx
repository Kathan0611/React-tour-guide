import React, { useEffect, useState } from "react";
import "./Overlay.css"; // Assuming you have your CSS styles here
import { IOverlayProps } from "../types/app.types";

const Overlay: React.FC<IOverlayProps> = ({
  activeElementId,
  totalElements,
}) => {
  const [elementsRect, setElementsRect] = useState<{ [key: string]: DOMRect }>(
    {}
  );

  // Update the bounding rect of all elements when the component is mounted or steps change
  useEffect(() => {
    const newRects: { [key: string]: DOMRect } = {};
    totalElements.forEach((elementId) => {
      const element = document.getElementById(elementId) as HTMLElement;
      if (element) {
        newRects[elementId] = element.getBoundingClientRect();
      }
    });

    setElementsRect(newRects);
  }, [totalElements]);

  return (
    <div className="overlay-container">
      {totalElements.map((elementId, index) => {
        const isActive = elementId === activeElementId;
        const rect = elementsRect[elementId];

        // Position inactive elements using bounding box
        const overlayStyle = rect
          ? {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
            }
          : {};

        return (
          <div
            key={index}
            className={`overlay-element ${isActive ? "active" : "dimmed"}`}
            style={isActive ? {} : overlayStyle}
            id={elementId}
          />
        );
      })}
    </div>
  );
};

export default Overlay;
