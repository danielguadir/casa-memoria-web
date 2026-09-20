'use client';

import React, { useState, useEffect } from 'react';

export default function AnimatedMemoryLogo() {
  const [key, setKey] = useState(0);

  // Cycle animation every 11 seconds (3.6s draw + 5.4s hold + 2s fade reset)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 11000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed right-5 bottom-5 z-30 pointer-events-none select-none bg-transparent flex items-center justify-center transition-all duration-300"
    >
      <div className="w-[68px] h-[68px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] relative">
        <svg
          key={key}
          viewBox="0 0 200 200"
          className="w-full h-full block overflow-visible"
          style={{
            filter: 'drop-shadow(0px 2px 8px rgba(40, 30, 82, 0.15))',
          }}
        >
          <style>{`
            /* Cycle Animation Duration: 11s Total */
            
            /* Stage 1: Círculo Exterior (0s -> 1.1s) */
            .logo-circle {
              stroke-dasharray: 560;
              stroke-dashoffset: 560;
              animation: drawStroke 1.1s cubic-bezier(0.42, 0, 0.58, 1) 0.1s forwards, fadeOutCycle 11s ease-in-out infinite;
            }

            /* Stage 2: Eje Vertical Central (0.6s -> 1.6s) */
            .logo-axis {
              stroke-dasharray: 180;
              stroke-dashoffset: 180;
              animation: drawStroke 1.0s cubic-bezier(0.42, 0, 0.58, 1) 0.6s forwards, fadeOutCycle 11s ease-in-out infinite;
            }

            /* Stage 3: Estructura Superior (De arriba hacia abajo) (1.2s -> 2.5s) */
            .logo-top-struct {
              stroke-dasharray: 220;
              stroke-dashoffset: 220;
              animation: drawStroke 1.3s cubic-bezier(0.42, 0, 0.58, 1) 1.2s forwards, fadeOutCycle 11s ease-in-out infinite;
            }

            /* Stage 3: Estructura Inferior (De abajo hacia arriba) (1.2s -> 2.5s) */
            .logo-bottom-struct {
              stroke-dasharray: 220;
              stroke-dashoffset: 220;
              animation: drawStroke 1.3s cubic-bezier(0.42, 0, 0.58, 1) 1.2s forwards, fadeOutCycle 11s ease-in-out infinite;
            }

            /* Stage 4: Espirales Geométricas Internas / Churros (2.2s -> 3.6s) */
            .logo-spiral {
              stroke-dasharray: 240;
              stroke-dashoffset: 240;
              animation: drawStroke 1.4s cubic-bezier(0.42, 0, 0.58, 1) 2.2s forwards, fadeOutCycle 11s ease-in-out infinite;
            }

            @keyframes drawStroke {
              to {
                stroke-dashoffset: 0;
              }
            }

            /* Fade out and reset smoothly at the end of 11s cycle */
            @keyframes fadeOutCycle {
              0%, 82% {
                opacity: 1;
              }
              92% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            /* Respect prefers-reduced-motion */
            @media (prefers-reduced-motion: reduce) {
              .logo-circle, .logo-axis, .logo-top-struct, .logo-bottom-struct, .logo-spiral {
                animation: none !important;
                stroke-dashoffset: 0 !important;
                opacity: 1 !important;
              }
            }
          `}</style>

          {/* 1. Círculo Exterior */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="#281E52"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="logo-circle"
          />

          {/* 2. Eje Vertical Central */}
          <line
            x1="100"
            y1="14"
            x2="100"
            y2="186"
            stroke="#281E52"
            strokeWidth="5"
            strokeLinecap="round"
            className="logo-axis"
          />

          {/* 3. Estructura Superior (Progresiva de arriba hacia abajo) */}
          <path
            d="M 100,26 C 55,26 32,52 32,92 H 100"
            fill="none"
            stroke="#281E52"
            strokeWidth="5"
            strokeLinecap="round"
            className="logo-top-struct"
          />
          <path
            d="M 100,26 C 145,26 168,52 168,92 H 100"
            fill="none"
            stroke="#281E52"
            strokeWidth="5"
            strokeLinecap="round"
            className="logo-top-struct"
          />

          {/* 3. Estructura Inferior (Progresiva de abajo hacia arriba) */}
          <path
            d="M 100,174 C 55,174 32,148 32,108 H 100"
            fill="none"
            stroke="#281E52"
            strokeWidth="5"
            strokeLinecap="round"
            className="logo-bottom-struct"
          />
          <path
            d="M 100,174 C 145,174 168,148 168,108 H 100"
            fill="none"
            stroke="#281E52"
            strokeWidth="5"
            strokeLinecap="round"
            className="logo-bottom-struct"
          />

          {/* 4. Espirales e Íconos Internos Geométricos (Churros Ancestrales Pasto) */}
          {/* Cuadrante Superior Izquierdo */}
          <path
            d="M 82,44 H 50 V 76 H 82 V 58 H 64 V 68"
            fill="none"
            stroke="#281E52"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-spiral"
          />

          {/* Cuadrante Superior Derecho */}
          <path
            d="M 118,44 H 150 V 76 H 118 V 58 H 136 V 68"
            fill="none"
            stroke="#281E52"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-spiral"
          />

          {/* Cuadrante Inferior Izquierdo */}
          <path
            d="M 82,156 H 50 V 124 H 82 V 142 H 64 V 132"
            fill="none"
            stroke="#281E52"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-spiral"
          />

          {/* Cuadrante Inferior Derecho */}
          <path
            d="M 118,156 H 150 V 124 H 118 V 142 H 136 V 132"
            fill="none"
            stroke="#281E52"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-spiral"
          />
        </svg>
      </div>
    </div>
  );
}
