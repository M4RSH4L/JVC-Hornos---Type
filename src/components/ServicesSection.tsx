import React, { useState } from 'react';
import { Zap, Settings, MessageCircle, ArrowRight } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Reparación de hornos',
      subtitle: 'Eléctricos y a gas',
      description: 'Diagnóstico y reparación profesional de hornos de todas las marcas y modelos. Técnicos especializados con experiencia en sistemas eléctricos y de gas.',
      features: ['Diagnóstico gratuito', 'Reparación en domicilio', 'Garantía extendida', 'Presupuesto sin compromiso']
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Mantenimiento integral',
      subtitle: 'Preventivo y correctivo',
      description: 'Servicios de mantenimiento programado para asegurar el óptimo funcionamiento y prolongar la vida útil de tus equipos de cocina.',
      features: ['Inspección técnica', 'Limpieza profunda', 'Calibración de temperaturas', 'Plan de mantenimiento']
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Asesoramiento técnico',
      subtitle: 'Selección y uso profesional',
      description: 'Consultoría especializada para la selección del horno ideal según tus necesidades, capacitación en uso y mejores prácticas.',
      features: ['Análisis de necesidades', 'Recomendación personalizada', 'Capacitación de uso', 'Soporte post-venta']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Servicios técnicos especializados
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Ofrecemos soluciones completas con la más alta calidad técnica y profesionalismo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex p-4 rounded-2xl transition-all duration-500 ${
                    hoveredService === index 
                      ? 'bg-orange-500 text-white transform scale-110' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-orange-600 font-semibold mb-4">{service.subtitle}</p>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
               <button
  onClick={() => window.open('https://wa.link/a2bxo6', '_blank')}
  className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
    hoveredService === index 
      ? 'text-orange-600 translate-x-2' 
      : 'text-blue-600'
  }`}
>
  Saber más
  <ArrowRight size={16} className="transition-transform duration-300" />
</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;