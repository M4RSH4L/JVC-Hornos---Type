import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      role: 'Chef - Restaurante El Parrón',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Excelente servicio técnico. Repararon nuestro horno industrial en tiempo récord y ahora funciona como nuevo. El equipo de JVC es muy profesional y confiable.'
    },
    {
      id: 2,
      name: 'Carlos Mendez',
      role: 'Propietario - Panadería San Martín',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Llevo más de 10 años confiando en JVC para el mantenimiento de mis hornos. Su experiencia y dedicación son incomparables. Siempre puntuales y eficientes.'
    },
    {
      id: 3,
      name: 'Ana López',
      role: 'Gerente - Hotel Plaza',
      image: 'https://images.pexels.com/photos/3785097/pexels-photo-3785097.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'El asesoramiento que recibimos para renovar la cocina del hotel fue excepcional. Nos ayudaron a elegir los equipos perfectos para nuestras necesidades.'
    },
    {
      id: 4,
      name: 'Roberto Silva',
      role: 'Chef Ejecutivo - Catering Premium',
      image: 'https://images.pexels.com/photos/3777957/pexels-photo-3777957.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'La rapidez en la entrega de repuestos y la calidad del servicio técnico han sido fundamentales para mantener nuestra operación sin interrupciones.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-pattern-dots"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Lo que dicen nuestros clientes
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-12 h-12 text-orange-400" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed max-w-4xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-blue-200">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className="hidden md:flex justify-center gap-4 mt-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white/20 scale-105'
                  : 'bg-white/10 hover:bg-white/15 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-white text-sm font-medium">{testimonial.name}</p>
                <p className="text-blue-200 text-xs">{testimonial.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;