import { useEffect, useRef } from 'react';

interface InteractiveGridProps {
  dotDistance?: number;
  dotRadius?: number;
  minProximity?: number;
}

export function InteractiveGrid({
  dotDistance = 45,
  dotRadius = 5,
  minProximity = 150,
}: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const minProxSquared = minProximity * minProximity;
    const revealRadius = minProximity * 2.5;
    const revealSquared = revealRadius * revealRadius;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Ignore the pointer entirely when it's outside the section's bounds.
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mouseRef.current = { x: -9999, y: -9999 };
        return;
      }
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    let frameId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      for (let x = 0; x < canvas.width; x += dotDistance) {
        for (let y = 0; y < canvas.height; y += dotDistance) {
          const dX = x - mouse.x;
          const dY = y - mouse.y;
          const distSquared = dX * dX + dY * dY;

          if (distSquared <= minProxSquared) {
            const alpha = 1 - (distSquared / minProxSquared) * 0.8;
            const color = `rgba(20, 95, 96, ${alpha})`;

            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          } else if (distSquared <= revealSquared) {
            const greyAlpha = (1 - distSquared / revealSquared) * 0.25;
            ctx.fillStyle = `rgba(34, 34, 34, ${greyAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    let running = false;
    const start = () => {
      if (running) {
        return;
      }
      running = true;
      window.addEventListener('mousemove', handleMouseMove);
      animate();
    };
    const stop = () => {
      if (!running) {
        return;
      }
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Only animate and track the pointer while the section is in the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    observer.observe(container);

    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener('resize', resize);
    };
  }, [dotDistance, dotRadius, minProximity]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0"
        style={{ display: 'block', background: 'transparent' }}
      />
    </div>
  );
}
