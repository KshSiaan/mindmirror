import { useState } from "react";

export default function MouseTracker() {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  window.addEventListener("mousemove", (e: MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  });

  return (
    <>
      <div
        className="fixed z-10 w-fit  px-1 py-1 rounded-md border"
        style={{
          left: mouseX + 20 + "px",
          top: mouseY + 20 + "px",
        }}
      >
        {mouseX.toString()},{mouseY.toString()}
      </div>
    </>
  );
}
