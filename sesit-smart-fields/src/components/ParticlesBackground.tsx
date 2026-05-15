import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

let engineReady = false;
let engineInitPromise: Promise<void> | null = null;

interface ParticlesBackgroundProps {
  className?: string;
  id?: string;
}

const ParticlesBackground = ({
  className = "",
  id = "tsparticles",
}: ParticlesBackgroundProps) => {
  const [init, setInit] = useState(engineReady);

  useEffect(() => {
    if (engineReady) {
      setInit(true);
      return;
    }
    if (!engineInitPromise) {
      engineInitPromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        engineReady = true;
      });
    }
    engineInitPromise.then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 200,
            links: {
              opacity: 0.65,
              color: "#058800",
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      particles: {
        color: {
          value: ["#25eb56", "#05851a", "#0cb937", "#41fa69", "#48ac50"],
        },
        links: {
          color: "#059100",
          distance: 160,
          enable: true,
          opacity: 0.35,
          width: 1.2,
          warp: true,
        },
        move: {
          enable: true,
          speed: { min: 0.6, max: 1.8 },
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: {
            default: "out" as const,
          },
          attract: {
            enable: true,
            rotateX: 800,
            rotateY: 1200,
          },
          trail: {
            enable: false,
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: { min: 0.15, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.4,
            sync: false,
            startValue: "random" as const,
          },
        },
        shape: {
          type: ["circle", "triangle"],
        },
        size: {
          value: { min: 1, max: 5 },
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
            startValue: "random" as const,
            destroy: "none" as const,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.04,
            opacity: 1,
            color: {
              value: ["#00a531", "#65ff93"],
            },
          },
          lines: {
            enable: true,
            frequency: 0.008,
            opacity: 0.4,
            color: {
              value: "#04da5d",
            },
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id={id}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      options={options}
      style={{ position: "absolute", zIndex: 1 }}
    />
  );
};

export default ParticlesBackground;
