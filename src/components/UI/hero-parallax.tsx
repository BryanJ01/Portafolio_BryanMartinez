"use client"

import React from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react"


export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    link: string
    thumbnail: string
  }[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 150, damping: 40, bounce: 200 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1200]), springConfig)
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1200]), springConfig)
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-400, 50]), springConfig)

  return (
    <div
      ref={ref}
      className="h-[250vh] py-100 overflow-hidden antialiased relative flex flex-col self-auto [perspective:550px] [transform-style:preserve-3d] border-dashed border-3 border-red-500"
    >
      <ProfileHeader />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="mt-5"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-10"> {/* Cambio de mb-10 a mb-4 */}
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-10 space-x-10"> {/* Cambio de mb-20 a mb-4 */}
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-4"> {/* Cambio de mb-10 a mb-4 */}
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const ProfileHeader = () => {
  return (
    <section className="max-w-8xl relative mx-auto py-5 md:py-40 px-4 w-full left-0 top-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_400px] md:gap-12 justify-start">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold dark:text-black">Bryan Jesus Martinez Perez</h1>
            <p className="text-3xl font-medium text-muted-foreground dark:text-black">
              Software Engineer | Full Stack Developer | Sciencie
            </p>
            <p className="text-muted-foreground dark:text-black font-bold opacity-90">
              I’m Bryan Jesús Martínez Pérez, a Software Engineering student with over three years of experience in Full-Stack development, specializing in data analysis and database management. Throughout my academic and professional journey, I have worked with technologies such as TypeScript, JavaScript, Java, React, Next.js, Astro, and MariaDB, developing efficient and scalable solutions.
            </p>
            <p className="text-muted-foreground dark:text-black font-bold opacity-90">
              I am passionate about creating software that makes a positive impact, especially in projects that promote accessibility, innovation, and efficiency across different sectors. My approach focuses on continuous improvement, constant learning, and exploring new technologies to optimize processes and solve complex problems.
            </p>
            <p className="text-muted-foreground dark:text-black font-bold justify-start opacity-90">
              Beyond programming, I excel in problem-solving, leading multidisciplinary teams, and staying resilient in the face of technical challenges. I enjoy collaborating on projects that require creativity and analytical thinking, always aiming to build high-impact solutions and continuously enhance my skill set.
            </p>
          </div>
          <div className="flex justify-center mt-0">
            <img
              src="/1711911026757.jpeg"
              width="380"
              height="300"
              alt="Profile Picture"
              className="rounded-full border-4"
              style={{
                aspectRatio: "300 / 300",
                objectFit: "cover",
                borderColor: "rgb(86, 23, 86)",
                opacity: 1,
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">{product.title}</h2>
    </motion.div>
  )
}
