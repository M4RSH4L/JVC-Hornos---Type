import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserInterests } from '../../types';
import { database } from '../../utils/database';

const InterestForm: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [interests, setInterests] = useState<UserInterests>({
    eventTypes: [],
    updateFrequency: '',
    industries: []
  });

  const questions = [
    {
      title: "1. ¿Qué tipo de negocio tenés actualmente?",
      subtitle: "Selecciona todas las opciones que apliquen",
      type: "multiple",
      options: [
        "Tienda física",
        "Tienda online / eCommerce",
        "Vendo por redes sociales o WhatsApp",
        "Hago ventas mayoristas o por catálogo",
        "Estoy arrancando / validando una idea",
        "Tienda Fisica y online",
       
      ],
      key: "eventTypes" as keyof UserInterests
    },
    {
      title: "2. ¿Dónde realizás la mayoría de tus ventas hoy?",
      subtitle: "Selecciona una opción",
      type: "single",
      options: [
        "En mi local o showroom",
        "A través de una tienda online",
        "Por redes sociales (Instagram, Facebook, etc.)",
        "Por WhatsApp u otros chats",
        "No tengo un canal principal todavía",
        "onlyfans",
      ],
      key: "updateFrequency" as keyof UserInterests
    },
    {
      title: "5. ¿Qué te gustaría mejorar en tu negocio?",
      subtitle: "Selecciona las áreas que te interesan",
      type: "multiple",
      options: [
        "Tener más ventas en fechas clave",
        "Planificar mejor mis promociones",
        "Mejorar mi presencia online / redes sociales",
        "Automatizar procesos (cobros, envíos, campañas)",
        "No estoy seguro, pero quiero crecer",
      ],
      key: "industries" as keyof UserInterests
    }
  ];

  const handleOptionSelect = (option: string) => {
    const question = questions[currentStep];
    const key = question.key;

    if (question.type === "multiple") {
      const currentValues = interests[key] as string[];
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option];
      
      setInterests(prev => ({ ...prev, [key]: newValues }));
    } else {
      setInterests(prev => ({ ...prev, [key]: option }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await database.updateUserInterests(user.id, interests);
      const updatedUser = { ...user, interests, hasCompletedSegmentation: true };
      updateUser(updatedUser);
    } catch (error) {
      console.error('Error updating user interests:', error);
    }
  };

  const isStepValid = () => {
    const question = questions[currentStep];
    const value = interests[question.key];
    
    if (question.type === "multiple") {
      return Array.isArray(value) && value.length > 0;
    } else {
      return value && value.length > 0;
    }
  };

  const currentQuestion = questions[currentStep];
  const selectedValues = interests[currentQuestion.key];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Personalize Your Experience
            </h1>
            <p className="text-gray-300">
              Help us tailor events and updates to your interests
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-purple-400">
                Step {currentStep + 1} of {questions.length}
              </span>
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-400">{currentQuestion.subtitle}</p>
          </div>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.type === "multiple"
                ? Array.isArray(selectedValues) && selectedValues.includes(option)
                : selectedValues === option;

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-black/30 border-white/20 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="w-5 h-5 text-purple-400" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>
              {currentStep === questions.length - 1 ? 'Complete Setup' : 'Next'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestForm;