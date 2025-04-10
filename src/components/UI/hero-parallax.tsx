"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

interface HeroParallaxProps {
  products: Product[];
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 20, bounce: 200 };


  // Detectar tamaño de pantalla
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const initialTranslate = useMotionValue(0);

  const translateX = isMobile
    ? initialTranslate
    : useSpring(useTransform(scrollYProgress, [0, 1], [0, 1200]), { ...springConfig, damping: 70 });
  const translateXReverse = isMobile
    ? initialTranslate
    : useSpring(useTransform(scrollYProgress, [0, 1], [0, -1200]), { ...springConfig, damping: 70 });

  // El resto de la configuración de animaciones permanece igual
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-400, 50]), springConfig);
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [containerHeight, setContainerHeight] = useState<string>("280vh");

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      setContainerHeight(`${windowHeight * 2.4}px`); // Ajusta el factor según tus necesidades
    };

    if (typeof window !== "undefined") {
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:550px] [transform-style:preserve-3d]`}
      style={{ height: containerHeight }}
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
        {isMobile ? (
          <Slider {...sliderSettings}>
            {[...firstRow, ...secondRow, ...thirdRow].map((product) => (
              <ProductCard product={product} translate={initialTranslate} key={product.title} />
            ))}
          </Slider>
        ) : (
          <>
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-4">
              {firstRow.map((product) => (
                <ProductCard product={product} translate={translateX} key={product.title} />
              ))}
            </motion.div>
            <motion.div className="flex flex-row space-x-10 mb-4">
              {secondRow.map((product) => (
                <ProductCard product={product} translate={translateXReverse} key={product.title} />
              ))}
            </motion.div>
            <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 mb-4">
              {thirdRow.map((product) => (
                <ProductCard product={product} translate={translateX} key={product.title} />
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// Componente de ProductCard
interface ProductCardProps {
  product: Product;
  translate: MotionValue<number>;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
        scale: 1.05, // Al hacer hover, se aumenta el tamaño de la tarjeta
        transition: {
          duration: 0.1, // Hacer la animación más rápida

        }
      }}
      key={product.title}
      className="group/product h-[calc(18rem+3vh)] sm:h-[40rem] md:h-[30rem] w-[calc(100% - 2rem)] sm:w-[32rem] relative shrink-0 mb-4 flex justify-center items-center overflow-hidden transition-all"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0 transition-all duration-300"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white transition-opacity duration-300">
        {product.title}
      </h2>
    </motion.div>
  );
};




// Componente de ProfileHeader
export const ProfileHeader = () => {
  return (
    <section className="max-w-8xl relative mx-auto py-5 md:py-40 px-4 w-full left-0 top-0">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_400px] md:gap-12 justify-start">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Bryan Jesus Martinez Perez</h1>
            <p className="text-3xl font-medium text-muted-foreground dark:text-black">
              Software Engineer | Full Stack Developer | Science
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
  );
};
