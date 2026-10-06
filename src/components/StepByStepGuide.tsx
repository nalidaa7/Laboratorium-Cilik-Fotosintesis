import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Droplets, Wind, Sun, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface StepByStepGuideProps {
  onStartExperiment: () => void;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ onStartExperiment }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Akar Menyerap Air (H₂O)',
      icon: <Droplets className="w-6 h-6 text-cyan-500" />,
      accent: 'border-cyan-200 bg-cyan-50/50',
      badge: 'Bahan 1: Air Tanah',
      description:
        'Akar tanaman bercabang menembus tanah untuk menyerap air dan mineral. Air kemudian dipompa ke atas batang menuju daun melalui pipa alami berukuran mikro bernama pembuluh Xilem.',
      funFact: '💧 Air dipecah oleh energi cahaya menjadi hidrogen dan oksigen!',
      illustration: (
        <div className="relative w-full h-44 bg-cyan-900/10 rounded-2xl border border-cyan-200 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 140" className="w-48 h-36">
            {/* Ground Soil */}
            <rect x="0" y="40" width="200" height="100" fill="#784d2b" rx="8" />
            <rect x="0" y="36" width="200" height="12" fill="#529944" rx="4" />
            {/* Stem */}
            <rect x="94" y="10" width="12" height="40" fill="#48b856" rx="4" />
            {/* Roots */}
            <path
              d="M100 50 Q100 80 85 110 M100 55 Q115 85 130 115 M90 70 Q60 90 45 115 M110 75 Q140 95 160 115"
              stroke="#ecd2b0"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Water Drops Moving Up */}
            <circle cx="90" cy="95" r="4" fill="#38bdf8" className="animate-ping" />
            <circle cx="100" cy="70" r="4.5" fill="#38bdf8" />
            <circle cx="100" cy="30" r="4.5" fill="#38bdf8" className="animate-bounce" />
          </svg>
        </div>
      ),
    },
    {
      number: '02',
      title: 'Stomata Menghirup Karbon Dioksida (CO₂)',
      icon: <Wind className="w-6 h-6 text-indigo-500" />,
      accent: 'border-indigo-200 bg-indigo-50/50',
      badge: 'Bahan 2: Udara Bersih',
      description:
        'Di permukaan bawah daun terdapat lubang-lubang kecil bernama Stomata (mulut daun). Tanaman membuka stomata untuk menghirup gas Karbon Dioksida (CO₂) yang dikeluarkan manusia dan hewan.',
      funFact: '🌬️ Satu daun berukuran sedang bisa memiliki ribuan stomata!',
      illustration: (
        <div className="relative w-full h-44 bg-indigo-950/10 rounded-2xl border border-indigo-200 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 140" className="w-48 h-36">
            {/* Guard Cells forming a Stoma */}
            <ellipse cx="80" cy="70" rx="35" ry="45" fill="#52b75a" stroke="#2e7c34" strokeWidth="4" />
            <ellipse cx="120" cy="70" rx="35" ry="45" fill="#52b75a" stroke="#2e7c34" strokeWidth="4" />
            {/* Stoma Pore Opening */}
            <ellipse cx="100" cy="70" rx="14" ry="32" fill="#1b381d" />
            {/* Inflowing CO2 Particles */}
            <circle cx="40" cy="40" r="6" fill="#818cf8" />
            <circle cx="100" cy="70" r="7" fill="#6366f1" className="animate-pulse" />
            <text x="100" y="74" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              CO₂
            </text>
          </svg>
        </div>
      ),
    },
    {
      number: '03',
      title: 'Klorofil Menangkap Cahaya Mentari',
      icon: <Sun className="w-6 h-6 text-amber-500" />,
      accent: 'border-amber-200 bg-amber-50/50',
      badge: 'Bahan 3: Energi Matahari',
      description:
        'Zat hijau daun (klorofil) di dalam kloroplas bekerja seperti panel surya alami. Klorofil menyerap spektrum cahaya biru dan merah dari sinar matahari untuk memicu reaksi kimia pembentukan makanan.',
      funFact: '☀️ Klorofil memantulkan cahaya hijau, itulah alasan daun berwarna hijau!',
      illustration: (
        <div className="relative w-full h-44 bg-amber-900/10 rounded-2xl border border-amber-200 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 140" className="w-48 h-36">
            {/* Sun Rays */}
            <circle cx="160" cy="30" r="22" fill="#f59e0b" />
            <path
              d="M140 45 L90 85 M160 55 L110 95 M130 30 L80 75"
              stroke="#fbbf24"
              strokeWidth="3.5"
              strokeDasharray="5 3"
              className="animate-pulse"
            />
            {/* Chloroplast Organelle */}
            <ellipse cx="80" cy="90" rx="45" ry="30" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
            {/* Thylakoids inside */}
            <rect x="55" y="78" width="16" height="6" rx="2" fill="#15803d" />
            <rect x="55" y="88" width="16" height="6" rx="2" fill="#15803d" />
            <rect x="76" y="82" width="16" height="6" rx="2" fill="#15803d" />
            <rect x="96" y="78" width="16" height="6" rx="2" fill="#15803d" />
            <rect x="96" y="88" width="16" height="6" rx="2" fill="#15803d" />
          </svg>
        </div>
      ),
    },
    {
      number: '04',
      title: 'Pabrik Daun Menghasilkan Makanan & O₂',
      icon: <Sparkles className="w-6 h-6 text-emerald-600" />,
      accent: 'border-emerald-200 bg-emerald-50/50',
      badge: 'Hasil: Glukosa & Oksigen',
      description:
        'Melalui keajaiban fotosintesis, air dan karbon dioksida diubah menjadi Gula Glukosa untuk makanan tanaman agar tumbuh besar, serta melepaskan gas Oksigen (O₂) segar untuk bernapas seluruh makhluk hidup!',
      funFact: '🌳 Satu pohon dewasa bisa menyediakan oksigen untuk 2 hingga 4 orang setiap hari!',
      illustration: (
        <div className="relative w-full h-44 bg-emerald-900/10 rounded-2xl border border-emerald-200 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 140" className="w-48 h-36">
            {/* Leaf */}
            <path
              d="M40 70 C70 30 130 30 160 70 C130 110 70 110 40 70 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="4"
            />
            {/* Glucose drop */}
            <circle cx="85" cy="70" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
            <text x="85" y="73" fill="#78350f" fontSize="7" fontWeight="bold" textAnchor="middle">
              Glukosa
            </text>
            {/* Oxygen Bubble floating away */}
            <circle cx="130" cy="50" r="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" className="animate-bounce" />
            <text x="130" y="54" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">
              O₂
            </text>
          </svg>
        </div>
      ),
    },
  ];

  const current = steps[activeStep];

  const handleNext = () => {
    sound.playClick();
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Page Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          🔬 TAHAPAN SAINS
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-emerald-950 mt-2 mb-3">
          Bagaimana Tanaman Memasak Makanan?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Pelajari 4 langkah menakjubkan dari proses fotosintesis yang menjaga kehidupan seluruh makhluk di Bumi.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {steps.map((st, idx) => {
          const isCurrent = idx === activeStep;
          const isDone = idx < activeStep;
          return (
            <button
              key={st.number}
              onClick={() => {
                sound.playClick();
                setActiveStep(idx);
              }}
              className={`p-3 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between ${
                isCurrent
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-md scale-102'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                <span>{st.number}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="text-xs font-bold truncate">{st.badge}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 ${current.accent} shadow-md bg-white transition-all duration-300`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                {current.icon}
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                Langkah {current.number} dari 04
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3">
              {current.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
              {current.description}
            </p>

            <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs font-semibold text-emerald-900 leading-relaxed">
              {current.funFact}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {current.illustration}
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={activeStep === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              activeStep === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === activeStep ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          {activeStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <span>Langkah Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playSuccess();
                onStartExperiment();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-transform hover:scale-105"
            >
              <span>🧪 Langsung Praktek di Lab!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
