import React from 'react';
import { Phone, Mail, MapPin, Clock, Wrench } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">JVC Hornos</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Más de 30 años de experiencia en reparación, mantenimiento y asesoramiento 
              de hornos profesionales. Brindamos soluciones integrales con la más alta 
              calidad y profesionalismo.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={18} className="text-orange-400" />
                <span>+54 9 2215 68-2664</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail size={18} className="text-orange-400" />
                <span>jvcserviciolaplata@hotmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin size={18} className="text-orange-400" />
                <span> La Plata, Buenos Aires</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-slate-300 hover:text-orange-400 transition-colors">Reparación de hornos</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-orange-400 transition-colors">Mantenimiento preventivo</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-orange-400 transition-colors">Asesoramiento técnico</a></li>
              <li><a href="#parts" className="text-slate-300 hover:text-orange-400 transition-colors">Repuestos originales</a></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock size={18} className="text-orange-400" />
              Horarios
            </h4>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="font-medium">Lunes a Viernes</p>
                <p className="text-sm">8:00 - 18:00</p>
              </div>
              <div>
                <p className="font-medium">Sábados</p>
                <p className="text-sm">9:00 - 13:00</p>
              </div>
              <div>
                <p className="font-medium">Emergencias</p>
                <p className="text-sm text-orange-400">24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 JVC Hornos. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <button
                onClick={scrollToTop}
                className="text-slate-400 hover:text-orange-400 transition-colors text-sm"
              >
                Volver arriba
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;