import { useRef, useEffect } from "react";

export default function Silk({
  speed = 2,
  scale = 0.8,
  color = "#0c0c0d",
  noiseIntensity = 0,
  rotation = 0,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      t += 0.01 * speed;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < canvas.height; i += 2) {
        const wave =
          Math.sin(i * 0.01 * scale + t) * 20 +
          Math.cos(i * 0.02 * scale + t) * 10;

        ctx.fillStyle = `rgba(255,255,255,0.02)`;
        ctx.fillRect(wave, i, canvas.width, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, scale, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20"
    />
  );
}