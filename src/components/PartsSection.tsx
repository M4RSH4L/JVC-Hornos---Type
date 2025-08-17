import React, { useState } from 'react';
import { Search, Package } from 'lucide-react';


const PartsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'todos', name: 'Todos los productos', count: 6 },
    { id: 'Mesas', name: 'Mesas', count: 2 },
    { id: 'Campanas', name: 'Campanas', count: 2 },
    { id: 'Carros', name: 'Carros', count: 2 },
    { id: 'accesorios', name: 'Parrillas', count: 2 }
  ];

  const products = [
    { id: 1, name: 'Mesa  UG II P/ Mod. XS 6-2/3 8', brand: 'Rational', category: 'Mesas', price: '', image:'https://i.postimg.cc/d1BCNF6M/mesa-ugi.jpg' },
    { id: 2, name: 'Campanas y Extractora de Vapores', brand: 'Rational', category: 'Campanas', price: '', image: 'https://i.postimg.cc/wMDj4Qg1/camapana-extractor.jpg' },
    { id: 3, name: 'Carros Gastronomicos', brand: 'Rational', category: 'Carros', price: '', image: 'https://i.postimg.cc/7YCVhCXf/carro.jpg' },
    { id: 4, name: 'Parrilla', brand: 'Rational', category: 'Parrilla', price: '', image: 'https://i.postimg.cc/xc1HS41x/bandeja.jpg' },
    { id: 5, name: 'Bandejas', brand: 'Rational', category: 'Parrilla', price: '', image: 'https://i.postimg.cc/PPVDfQLt/bandejas.jpg' },
    { id: 6, name: 'Lavavajillas', brand: 'Winterhalter Serie U50', category: 'Lavavajillas', price: '', image: 'https://i.postimg.cc/0N6MdmMw/lavavajillas.jpg' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'todos' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="parts" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Repuestos originales para tu horno
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Disponemos de un amplio stock de repuestos y accesorios originales para diversas marcas de hornos. 
            Desde Mesas hasta Campanas, tenemos todo lo que necesitas para mantener tu equipo en perfecto estado.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar repuestos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-slate-600">{product.brand}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Package size={16} />
                    <span className="text-xs">En stock</span>
                  </div>
                </div>
                <button  onClick={() => window.open('https://wa.link/a2bxo6', '_blank')} 
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 group-hover:bg-orange-500">
                  Consultar disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto text-slate-400 mb-4" size={64} />
            <p className="text-slate-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartsSection;