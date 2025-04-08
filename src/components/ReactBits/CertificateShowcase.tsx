import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  credential: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    date: "dic. 2024",
    imageUrl: "https://cdnapisec.kaltura.com/p/1773841/sp/177384100/thumbnail/entry_id/1_os08v8jb/width/560",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1734106692040/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 2,
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "dic. 2024",
    imageUrl: "https://alln-extcloud-storage.cisco.com/Cisco_Blogs:blogs/100/2020/07/Logo-NetAcad.jpg",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1734106325622/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 3,
    title: "Aprende análisis de datos: fundamentos",
    issuer: "LinkedIn",
    date: "abr. 2024",
    imageUrl: "https://dtdxsaqq5q4.cloudfront.net/sites/biologicalsciences/files/styles/max_width_full/public/2022-12/linkedin-learning.jpg?itok=KZ9JM9di",
    credential: "https://www.linkedin.com/learning/certificates/9e93f31afa4dc7ba6260b97db62b2c0132910c6e7c495bd934d2e7f22879e8fc"
  },
  {
    id: 4,
    title: "HTML5 y CSS3_2",
    issuer: "Oracle+Alura",
    date: "mar. 2024",
    imageUrl: "https://i0.wp.com/pcformat.mx/www/wp-content/uploads/2022/03/Oracle-ONE.jpg?fit=1000%2C611&ssl=1",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1719367575374/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 5,
    title: "HTML5 y CSS3_3",
    issuer: "Oracle+Alura",
    date: "mar. 2024",
    imageUrl: "https://i0.wp.com/pcformat.mx/www/wp-content/uploads/2022/03/Oracle-ONE.jpg?fit=1000%2C611&ssl=1",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1719367734269/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 6,
    title: "HTML5 y CSS3_4",
    issuer: "Oracle+Alura",
    date: "mar. 2024",
    imageUrl: "https://i0.wp.com/pcformat.mx/www/wp-content/uploads/2022/03/Oracle-ONE.jpg?fit=1000%2C611&ssl=1",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1719367877465/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 7,
    title: "GIT Y GITHUB: REPOSITORIO, COMMIT Y VERSIONES",
    issuer: "Alura Latam",
    date: "mar. 2024",
    imageUrl: "https://www.aluracursos.com/assets/img/alura-share.1730889068.png",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1717778164969/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 8,
    title: "Introducción a las habilidades profesionales en análisis de datos",
    issuer: "LinkedIn",
    date: "mar. 2024",
    imageUrl: "https://dtdxsaqq5q4.cloudfront.net/sites/biologicalsciences/files/styles/max_width_full/public/2022-12/linkedin-learning.jpg?itok=KZ9JM9di",
    credential: "https://www.linkedin.com/learning/certificates/9326df98eaceed69193fd674c422f7ad158b4fc624ec82df049e38804f501b6d"
  },
  {
    id: 9,
    title: "HTML5 y CSS3_1",
    issuer: "Oracle+Alura",
    date: "feb. 2024",
    imageUrl: "https://i0.wp.com/pcformat.mx/www/wp-content/uploads/2022/03/Oracle-ONE.jpg?fit=1000%2C611&ssl=1",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1719367443575/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 10,
    title: "PROGRAMACIÓN CON JAVASCRIPT",
    issuer: "Oracle",
    date: "ene. 2024",
    imageUrl: "https://datascientest.com/en/files/2024/10/oracle_certification_datascientest.webp",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1719367984106/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 11,
    title: "VISUALIZACIÓN DE DATOS CON PYTHON",
    issuer: "Universidad Autónoma de Querétaro",
    date: "ene. 2024",
    imageUrl: "https://ingenieria.uaq.mx/cartelera/img/logos/uaq.jpg",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1717777965798/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 12,
    title: "Base de Datos",
    issuer: "Universidad Autónoma de Querétaro",
    date: "mar. 2023",
    imageUrl: "https://ingenieria.uaq.mx/cartelera/img/logos/uaq.jpg",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1717777866186/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  },
  {
    id: 13,
    title: "PL/SQL Database Programming",
    issuer: "Oracle",
    date: "ene. 2023",
    imageUrl: "https://habrastorage.org/webt/wc/z5/e0/wcz5e0wbfm88s6pize3z3lz3bcw.png",
    credential: "https://www.linkedin.com/in/bryan-jesus-martínez-perez-382826271/details/certifications/1717778237274/single-media-viewer/?profileId=ACoAAEKB_JIBcn34F_ms4q2ztmrGvl_DZW2CQBM"
  }
];

export const CertificateShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
        setTimeout(() => setDirection(null), 500);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const nextCertificate = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
    setTimeout(() => setDirection(null), 500);
  };

  const previousCertificate = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    setTimeout(() => setDirection(null), 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Award className="w-6 h-6 text-indigo-600 animate-spin-slow" />
        <h2 className="text-2xl font-bold text-gray-800">Certificaciones</h2>
      </div>

      <div className="relative"
        onMouseEnter={() => {
          setIsHovered(true);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPaused(false);
        }}
      >
        <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl aspect-video">
          <img
            src={certificates[currentIndex].imageUrl}
            alt={certificates[currentIndex].title}
            className={`w-full h-full object-cover transition-all duration-500 ${
              direction === 'right' ? 'animate-slide-left' :
              direction === 'left' ? 'animate-slide-right' :
              'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className={`text-xl font-bold mb-1 transition-all duration-500 ${
              direction ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {certificates[currentIndex].title}
            </h3>
            <div className={`flex items-center justify-between transition-all duration-500 ${
              direction ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              <div className="flex-1">
                <p className="text-sm text-gray-300">{certificates[currentIndex].issuer}</p>
                <p className="text-xs text-gray-400">{certificates[currentIndex].date}</p>
              </div>
              <a
                href={certificates[currentIndex].credential}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-3 py-1.5 text-sm rounded-lg hover:scale-105 hover:shadow-lg group"
              >
                Ver
                <ExternalLink className="w-3 h-3 animate-bounce-slow group-hover:animate-none" />
              </a>
            </div>
          </div>
        </div>

        <button
          onClick={previousCertificate}
          className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={nextCertificate}
          className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        <div className="flex justify-center gap-1.5 mt-3">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'right' : 'left');
                setCurrentIndex(index);
                setTimeout(() => setDirection(null), 500);
              }}
              className={`transition-all duration-300 rounded-full transform hover:scale-125 ${
                index === currentIndex
                  ? 'bg-indigo-600 w-3 h-1.5'
                  : 'bg-gray-300 hover:bg-gray-400 w-1.5 h-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};