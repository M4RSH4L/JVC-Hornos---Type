import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-900">JVC Hornos</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('hero')} className="text-slate-600 hover:text-blue-900 transition-colors">Inicio</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-600 hover:text-blue-900 transition-colors">Nosotros</button>
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-blue-900 transition-colors">Servicios</button>
            <button onClick={() => scrollToSection('parts')} className="text-slate-600 hover:text-blue-900 transition-colors">Repuestos</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-slate-600 hover:text-blue-900 transition-colors">Testimonios</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-600 hover:text-blue-900 transition-colors">Contacto</button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:text-blue-900"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('hero')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Inicio</button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Nosotros</button>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Servicios</button>
              <button onClick={() => scrollToSection('parts')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Repuestos</button>
              <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Testimonios</button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-slate-600 hover:text-blue-900 w-full text-left">Contacto</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;