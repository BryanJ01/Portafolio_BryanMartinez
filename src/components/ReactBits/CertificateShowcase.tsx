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
    title: "Full Stack Development",
    issuer: "Example Academy",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1496469888073-80de7e952517?w=800&auto=format&fit=crop",
    credential: "https://example.com/credential/123"
  },
  {
    id: 2,
    title: "Advanced React & TypeScript",
    issuer: "Tech Institute",
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    credential: "https://example.com/credential/456"
  },
  // Add your actual certificates here
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
      }, 5000);

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