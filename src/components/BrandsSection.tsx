import React, { useEffect, useState } from 'react';

const BrandsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  const brands = [
    {
      name: 'Rational',
      logo: 'https://i.postimg.cc/jWcw96r0/Rational.png'
    },
    {
      name: 'BRAFH',
      logo: 'https://i.postimg.cc/hXFd7P0w/Brafh.png'
    },
    {
      name: 'Winterhalter',
      logo: 'https://i.postimg.cc/WFfDp235/winterhalter.png'
    },
    {
      name: 'Irinox',
      logo: 'https://i.postimg.cc/xJdJSk0k/Irinox.png'
    },
    {
      name: 'Argental',
      logo: 'https://i.postimg.cc/RNJtFnwK/Argental.png'
    },
    {
      name: 'Westinghouse',
      logo: 'https://i.postimg.cc/wRy17SRg/Westinghouse.png'
    },
    {
      name: 'BRAFH',
      logo: 'https://i.postimg.cc/hXFd7P0w/Brafh.png'
    },
    {
      name: 'IG',
      logo: 'https://i.postimg.cc/NyB2pJSk/ig.png'
    }
  ];

  // Duplicar las marcas para crear un efecto de loop infinito
  const duplicatedBrands = [...brands, ...brands];

  // Función para detectar el tamaño de pantalla y ajustar slidesToShow
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // Desktop: 4 slides
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(3); // Tablet: 3 slides
      } else {
        setSlidesToShow(2); // Mobile: 2 slides
      }
    };

    handleResize(); // Ejecutar al montar
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular el número total de páginas basado en slidesToShow
  const totalPages = Math.ceil(brands.length / slidesToShow);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // Reiniciar cuando llegue a la última página
        return nextIndex >= totalPages ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  // Reiniciar currentIndex cuando cambie slidesToShow
  useEffect(() => {
    setCurrentIndex(0);
  }, [slidesToShow]);

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Marcas con las que trabajamos
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Somos Partner de las principales marcas del mercado, garantizando 
            repuestos originales y servicio técnico certificado
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              width: `${duplicatedBrands.length * (100 / slidesToShow)}%`
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 px-2 sm:px-3 lg:px-4"
                style={{ width: `${100 / duplicatedBrands.length}%` }}
              >
                <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-4 sm:p-6 border border-slate-100">
                  <div className="flex items-center justify-center h-16 sm:h-20">
                    <img
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                  <div className="text-center mt-3 sm:mt-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-blue-900 transition-colors">
                      {brand.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-600 ${
                index === currentIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Texto adicional */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            ¿No encuentras tu marca? Contáctanos, trabajamos con muchas más marcas y modelos
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;