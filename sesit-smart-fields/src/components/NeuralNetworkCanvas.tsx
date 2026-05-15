import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "neuron" | "leaf" | "data";
  pulsePhase: number;
  layer: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  signalPos: number;
  signalSpeed: number;
  active: boolean;
}

const NeuralNetworkCanvas = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const nodes: Node[] = [];
      const nodeCount = Math.min(Math.floor((w * h) / 18000), 80);
      const layers = 5;

      for (let i = 0; i < nodeCount; i++) {
        const layer = Math.floor(Math.random() * layers);
        const types: Node["type"][] = ["neuron", "leaf", "data"];
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 3,
          type: types[Math.floor(Math.random() * types.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
      nodesRef.current = nodes;

      // Build connections between nearby nodes (neural network style)
      const conns: Connection[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.min(w, h) * 0.2;
          if (dist < maxDist && Math.random() < 0.4) {
            conns.push({
              from: i,
              to: j,
              strength: 1 - dist / maxDist,
              signalPos: Math.random(),
              signalSpeed: 0.002 + Math.random() * 0.005,
              active: Math.random() < 0.3,
            });
          }
        }
      }
      connectionsRef.current = conns;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const drawLeafShape = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(timeRef.current * 0.001 + x) * 0.3);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.8, -size * 0.3, 0, size);
      ctx.quadraticCurveTo(-size * 0.8, -size * 0.3, 0, -size);
      ctx.fillStyle = `hsla(161, 96%, 43%, ${alpha * 0.6})`;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 16;

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const mouse = mouseRef.current;

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Mouse interaction - subtle attraction
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200 && mDist > 0) {
          node.vx += (mdx / mDist) * 0.01;
          node.vy += (mdy / mDist) * 0.01;
        }

        // Damping
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Bounds
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      });

      // Draw connections
      connections.forEach((conn) => {
        const a = nodes[conn.from];
        const b = nodes[conn.to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(w, h) * 0.2;

        if (dist > maxDist) return;

        const alpha = (1 - dist / maxDist) * 0.15;

        // Connection line
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(189, 100%, 50%, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Traveling signal (neural impulse)
        if (conn.active) {
          conn.signalPos += conn.signalSpeed;
          if (conn.signalPos > 1) {
            conn.signalPos = 0;
            conn.active = Math.random() < 0.3;
          }

          const sx = a.x + dx * conn.signalPos;
          const sy = a.y + dy * conn.signalPos;

          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, 6);
          gradient.addColorStop(0, `hsla(161, 96%, 43%, ${alpha * 4})`);
          gradient.addColorStop(1, `hsla(189, 100%, 50%, 0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, 6, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else if (Math.random() < 0.001) {
          conn.active = true;
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse =
          Math.sin(timeRef.current * 0.002 + node.pulsePhase) * 0.5 + 0.5;
        const r = node.radius + pulse * 1.5;

        if (node.type === "leaf") {
          drawLeafShape(ctx, node.x, node.y, r * 2.5, 0.3 + pulse * 0.3);
        } else if (node.type === "data") {
          // Data node - diamond shape
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(Math.PI / 4 + timeRef.current * 0.0005);
          ctx.beginPath();
          ctx.rect(-r, -r, r * 2, r * 2);
          ctx.fillStyle = `hsla(189, 100%, 50%, ${0.2 + pulse * 0.3})`;
          ctx.fill();
          ctx.restore();
        } else {
          // Neuron node - circle with glow
          const glow = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            r * 3
          );
          glow.addColorStop(
            0,
            `hsla(161, 96%, 43%, ${0.4 + pulse * 0.3})`
          );
          glow.addColorStop(1, `hsla(161, 96%, 43%, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(161, 96%, 43%, ${0.5 + pulse * 0.3})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};

export default NeuralNetworkCanvas;
