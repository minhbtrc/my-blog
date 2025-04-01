'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

/**
 * A minimal particle background component that creates a subtle, professional background effect
 * Inspired by Linear/Vercel style
 */
export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Initialize component
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle particle initialization
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine)
  }, [])

  // Configure particles based on current theme
  const options = useMemo(() => {
    return {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: isDark ? '#334155' : '#e2e8f0'
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.1,
          random: true,
        },
        size: {
          value: 2,
          random: true,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: isDark ? '#334155' : '#e2e8f0',
          opacity: 0.05,
          width: 1
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: false
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.1
            }
          }
        }
      },
      retina_detect: true,
      background: {
        color: {
          value: isDark ? "#0f172a" : "#ffffff"
        }
      }
    }
  }, [isDark])

  if (!mounted) return null

  return (
    <div className={cn(
      "fixed inset-0 -z-10",
      "pointer-events-none"
    )}>
      <Particles
        id="tsparticles"
        options={options}
        init={particlesInit}
      />
    </div>
  )
} 