"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"

export default function TitleFadeUp() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.5 })
  const mainControls = useAnimation()
  const subtitleControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
      subtitleControls.start("visible")
    } else {
      mainControls.start("hidden")
      subtitleControls.start("hidden")
    }
  }, [isInView, mainControls, subtitleControls])

  return (
    <div ref={ref} className="min-h-[300px] flex flex-col items-center justify-center text-center relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Fade Up con Delay
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={subtitleControls}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl text-gray-600 max-w-lg"
        >
          Este título y subtítulo aparecen con un efecto de fade desde abajo cuando entran en la pantalla, y desaparecen
          cuando salen.
        </motion.p>
      </div>
    </div>
  )
}

