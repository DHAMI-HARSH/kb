"use client"

import { useEffect, useRef } from "react"
import "@/app/styles/planet-model.css"

export default function PlanetModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 400
    container.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotation = 0

    const drawPlanet = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 100

      // Draw planet glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5)
      gradient.addColorStop(0, "rgba(127, 90, 240, 0.3)")
      gradient.addColorStop(1, "rgba(127, 90, 240, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const orbitRadius = 150
      const numOrbits = 3

      for (let i = 0; i < numOrbits; i++) {
        const angle = rotation * (1 - i * 0.1) + (i * Math.PI * 2) / numOrbits
        const x = centerX + Math.cos(angle) * orbitRadius
        const y = centerY + Math.sin(angle) * orbitRadius

        // Draw orbit line
        if (i === 0) {
          ctx.strokeStyle = "rgba(240, 240, 240, 0.1)"
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Draw small planet
        const smallPlanetRadius = 8 + i * 3
        const smallGradient = ctx.createRadialGradient(x - 2, y - 2, 0, x, y, smallPlanetRadius)
        smallGradient.addColorStop(0, ["#f0f0f0", "#ff6b9d", "#ffd93d"][i])
        smallGradient.addColorStop(1, ["#0a7e9e", "#8b1e3d", "#a68300"][i])
        ctx.fillStyle = smallGradient
        ctx.beginPath()
        ctx.arc(x, y, smallPlanetRadius, 0, Math.PI * 2)
        ctx.fill()

        // Glow around small planets
        ctx.fillStyle = `rgba(${i === 0 ? "240, 240, 240" : i === 1 ? "255, 107, 157" : "255, 217, 61"}, 0.2)`
        ctx.beginPath()
        ctx.arc(x, y, smallPlanetRadius + 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw main planet
      const planetGradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 0, centerX, centerY, radius)
      planetGradient.addColorStop(0, "#7f5af0")
      planetGradient.addColorStop(1, "#2d1b69")
      ctx.fillStyle = planetGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw atmosphere
      ctx.strokeStyle = "rgba(240, 240, 240, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2)
      ctx.stroke()

      // Draw rings
      ctx.strokeStyle = "rgba(240, 240, 240, 0.3)"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, radius + 40, radius / 2, rotation, 0, Math.PI * 2)
      ctx.stroke()

      rotation += 0.003

      requestAnimationFrame(drawPlanet)
    }

    drawPlanet()

    return () => {
      container.removeChild(canvas)
    }
  }, [])

  return <div ref={containerRef} className="planet-model" />
}
