import React, { useState } from 'react';
import { Calendar, Award, Users, Wrench } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const milestones = [
    {
      year: '1990',
      title: 'Fundación de JVC',
      description: 'Iniciamos nuestro camino en el mundo de los hornos profesionales',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      year: '2000',
      title: 'Expansión de servicios',
      description: 'Ampliamos nuestra gama de servicios técnicos especializados',
      icon: <Wrench className="w-6 h-6" />
    },
    {
      year: '2010',
      title: 'Reconocimiento regional',
      description: 'Nos consolidamos como referentes en La Plata y alrededores',
      icon: <Award className="w-6 h-6" />
    },
    {
      year: '2024',
      title: 'Más de 5000 clientes',
      description: 'Continuamos creciendo con la confianza de nuestros clientes',
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Expertos en soluciones para tu cocina
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            En JVC Hornos, somos un equipo de expertos dedicados a ofrecer soluciones integrales para tu cocina. 
            Con más de tres décadas de experiencia, nos especializamos en la reparación, mantenimiento y asesoramiento 
            en hornos profesionales, garantizando siempre la máxima calidad y satisfacción.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } animate-slide-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'} mb-4 md:mb-0`}>
                  <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    activeStep === index ? 'ring-2 ring-orange-500' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        {milestone.icon}
                      </div>
                      <span className="text-2xl font-bold text-blue-900">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-6 h-6 rounded-full ${
                    activeStep === index ? 'bg-orange-500 scale-150' : 'bg-blue-500'
                  } transition-all duration-300 shadow-lg`}></div>
                </div>
                
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;