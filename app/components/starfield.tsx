"use client"

import { useEffect, useRef } from "react"
import "@/app/styles/starfield.css"

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; size: number; opacity: number }[] = []

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#fff"
      stars.forEach((star) => {
        ctx.globalAlpha = star.opacity
        ctx.fillRect(star.x, star.y, star.size, star.size)
        star.opacity += (Math.random() - 0.5) * 0.02
        if (star.opacity > 1) star.opacity = 1
        if (star.opacity < 0.3) star.opacity = 0.3
      })
      ctx.globalAlpha = 1

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="starfield" />
}
