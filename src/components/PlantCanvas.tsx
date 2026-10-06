import React, { useMemo } from 'react';
import { SimulationState, PlantMood } from '../types';
import { Microscope, Sun, Droplets, Wind, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface PlantCanvasProps {
  state: SimulationState;
  onOpenMicroscope: () => void;
  onWaterSplash: () => void;
}

export const PlantCanvas: React.FC<PlantCanvasProps> = ({
  state,
  onOpenMicroscope,
  onWaterSplash,
}) => {
  // Photosynthesis efficiency calculation:
  // Limited by Liebig's law of the minimum: min(light, water, co2? 100:0)
  const co2Score = state.co2 ? 100 : 0;
  const tempFactor = state.temperature >= 20 && state.temperature <= 30 ? 1 : 0.7;
  const efficiency = Math.round(Math.min(state.light, state.water, co2Score) * tempFactor);

  const plantMood: PlantMood = useMemo(() => {
    if (efficiency >= 70) return 'happy';
    if (efficiency >= 35) return 'neutral';
    if (efficiency >= 1) return 'droop';
    return 'wilting';
  }, [efficiency]);

  // Visual sky style based on light
  const skyBackground = useMemo(() => {
    if (state.light <= 10) {
      return 'from-slate-900 via-indigo-950 to-slate-800';
    }
    if (state.light <= 50) {
      return 'from-sky-300 via-amber-100 to-emerald-100';
    }
    return 'from-sky-400 via-sky-200 to-emerald-100';
  }, [state.light]);

  const isDark = state.light <= 10;

  // Active photosynthesis indicators
  const isActive = efficiency > 0;
  const bubbleCount = Math.min(8, Math.max(1, Math.round(efficiency / 15)));

  return (
    <div className={`relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden shadow-md border-4 border-white transition-colors duration-700 bg-linear-to-b ${skyBackground} flex flex-col justify-between`}>
      {/* Background Ambience: Stars or Clouds */}
      {isDark ? (
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-10 left-12 text-yellow-100 text-xs animate-pulse">★</div>
          <div className="absolute top-16 left-1/3 text-yellow-100 text-xs animate-pulse delay-100">✦</div>
          <div className="absolute top-8 right-1/4 text-yellow-100 text-xs animate-pulse delay-300">★</div>
          <div className="absolute top-24 right-16 text-yellow-100 text-xs animate-pulse delay-200">✦</div>
          {/* Crescent Moon */}
          <div className="absolute top-8 right-10 w-16 h-16 rounded-full shadow-[inset_14px_-6px_0_0_#fef08a] filter drop-shadow-[0_0_12px_rgba(254,240,138,0.5)]" />
        </div>
      ) : (
        <div className="absolute inset-0 pointer-events-none">
          {/* Gentle Clouds */}
          <div className="absolute top-8 left-6 w-28 h-8 bg-white/70 rounded-full blur-[1px]" />
          <div className="absolute top-6 left-12 w-16 h-16 bg-white/70 rounded-full blur-[1px]" />
          <div className="absolute top-14 right-1/3 w-36 h-9 bg-white/50 rounded-full blur-[1px]" />

          {/* Dynamic Sun */}
          <div
            className="absolute top-6 right-6 sm:right-10 flex items-center justify-center transition-all duration-500"
            style={{
              opacity: Math.max(0.2, state.light / 100),
              transform: `scale(${0.6 + (state.light / 100) * 0.6})`,
            }}
          >
            <div className="absolute w-36 h-36 rounded-full bg-yellow-300/30 animate-ping opacity-40 duration-1000" />
            <div className="absolute w-28 h-28 rounded-full bg-amber-400/30 filter blur-md" />
            <div className="relative w-20 h-20 rounded-full bg-linear-to-tr from-amber-400 to-yellow-200 shadow-[0_0_35px_rgba(251,191,36,0.85)] flex items-center justify-center">
              <Sun className="w-12 h-12 text-amber-700/80 animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>
      )}

      {/* Sunlight Beams pointing down toward plant */}
      {state.light > 15 && (
        <div
          className="absolute top-24 right-16 w-48 h-80 pointer-events-none origin-top-right transition-opacity duration-500"
          style={{
            opacity: (state.light / 100) * 0.45,
            background: 'linear-gradient(135deg, rgba(254,240,138,0.5) 0%, rgba(254,240,138,0) 80%)',
            clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
          }}
        />
      )}

      {/* Top Floating Badges: Quick Status & Microscope Shortcut */}
      <div className="relative z-10 p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-white/60 text-xs font-bold text-slate-700 flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                efficiency >= 70
                  ? 'bg-emerald-500 animate-pulse'
                  : efficiency >= 30
                  ? 'bg-amber-500'
                  : 'bg-rose-400'
              }`}
            />
            <span>
              {efficiency >= 70
                ? 'Fotosintesis Berjalan Sangat Baik'
                : efficiency >= 30
                ? 'Fotosintesis Terbatas'
                : 'Fotosintesis Terhenti'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onOpenMicroscope();
          }}
          className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-emerald-50 text-emerald-800 text-xs font-bold shadow-xs border border-emerald-200 flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Microscope className="w-4 h-4 text-emerald-600" />
          <span>Intip Sel Daun</span>
        </button>
      </div>

      {/* Middle Interactive Plant & Floating Gas Dynamics */}
      <div className="relative flex-1 flex items-end justify-center pb-4 z-10">
        {/* Floating CO2 Inflow from left */}
        {state.co2 && (
          <div className="absolute left-4 sm:left-12 top-28 sm:top-36 flex flex-col gap-3 pointer-events-none">
            <div className="animate-[bounce_3s_ease-in-out_infinite] flex items-center gap-1.5 bg-slate-800/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              <Wind className="w-3.5 h-3.5 text-cyan-300" />
              <span>CO₂ masuk ➔</span>
            </div>
            <div className="text-slate-600/70 text-[10px] font-semibold tracking-wide pl-2">
              (Lewat Mulut Daun / Stoma)
            </div>
          </div>
        )}

        {/* Rising Oxygen (O2) Bubbles on right */}
        {isActive && (
          <div className="absolute right-6 sm:right-16 top-24 sm:top-32 pointer-events-none flex flex-col items-center">
            <div className="flex items-center gap-1 text-emerald-800 text-xs font-bold bg-white/90 px-2.5 py-1 rounded-full shadow-xs border border-emerald-100 mb-2 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>O₂ Segar Dihasilkan!</span>
            </div>
            <div className="relative w-24 h-40">
              {Array.from({ length: bubbleCount }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border-2 border-cyan-400 bg-cyan-100/70 text-cyan-800 font-bold text-[10px] flex items-center justify-center shadow-xs animate-rise"
                  style={{
                    width: `${26 + (i % 3) * 6}px`,
                    height: `${26 + (i % 3) * 6}px`,
                    left: `${15 + (i * 24) % 60}px`,
                    bottom: `${10 + i * 20}px`,
                    animationDelay: `${i * 0.45}s`,
                    animationDuration: `${2.2 - (efficiency / 100) * 0.8}s`,
                  }}
                >
                  O₂
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THE LIVING PLANT SVG ILLUSTRATION */}
        <div className="relative w-72 h-88 sm:w-84 sm:h-96 flex flex-col items-center justify-end select-none">
          <svg viewBox="0 0 320 380" className="w-full h-full drop-shadow-lg">
            {/* Roots inside Soil Section */}
            <g>
              {/* Soil Pot Body */}
              <path
                d="M70 240 L250 240 L225 355 L95 355 Z"
                fill="#b85d39"
                stroke="#8f4325"
                strokeWidth="4"
              />
              {/* Pot Rim */}
              <rect
                x="60"
                y="225"
                width="200"
                height="22"
                rx="8"
                fill="#c86b45"
                stroke="#8f4325"
                strokeWidth="3.5"
              />

              {/* Pot Soil Surface */}
              <ellipse cx="160" cy="235" rx="90" ry="12" fill="#543822" />

              {/* Roots System inside translucent cutaway */}
              <path
                d="M160 245 Q160 280 145 320 M160 255 Q180 290 195 330 M150 270 Q120 290 110 320 M170 275 Q200 300 215 325 M140 300 Q125 330 120 345"
                stroke="#e2c8a2"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Water Droplets Absorbed by Roots */}
              {state.water > 0 && (
                <g className="animate-pulse">
                  <circle cx="135" cy="310" r="4.5" fill="#38bdf8" />
                  <circle cx="155" cy="285" r="4.5" fill="#38bdf8" />
                  <circle cx="185" cy="300" r="4.5" fill="#38bdf8" />
                  <circle cx="160" cy="255" r="5" fill="#38bdf8" />
                </g>
              )}
            </g>

            {/* Central Stem */}
            <path
              d="M160 235 Q160 140 160 90"
              stroke={plantMood === 'wilting' ? '#92a356' : '#3da84f'}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* Internal Xylem Water Transport Stream (blue pulse when watered) */}
            {state.water > 0 && (
              <path
                d="M160 230 L160 95"
                stroke="#60a5fa"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
                strokeLinecap="round"
                className="animate-[dash_1s_linear_infinite]"
              />
            )}

            {/* Left Leaf 1 (Lower) */}
            <g
              className="transition-transform duration-500 origin-[160px_190px]"
              style={{
                transform:
                  plantMood === 'wilting'
                    ? 'rotate(35deg) scaleY(0.85)'
                    : plantMood === 'droop'
                    ? 'rotate(15deg)'
                    : 'rotate(-5deg)',
              }}
            >
              <path
                d="M160 190 C100 190 60 160 50 130 C75 110 130 140 160 190 Z"
                fill={plantMood === 'wilting' ? '#8ea04a' : '#41ba58'}
                stroke="#2f8e42"
                strokeWidth="3"
              />
              <path d="M160 190 Q110 155 55 133" stroke="#b4e470" strokeWidth="3" fill="none" />
            </g>

            {/* Right Leaf 1 (Lower) */}
            <g
              className="transition-transform duration-500 origin-[160px_175px]"
              style={{
                transform:
                  plantMood === 'wilting'
                    ? 'rotate(-35deg) scaleY(0.85)'
                    : plantMood === 'droop'
                    ? 'rotate(-15deg)'
                    : 'rotate(5deg)',
              }}
            >
              <path
                d="M160 175 C220 175 260 145 270 115 C245 95 190 125 160 175 Z"
                fill={plantMood === 'wilting' ? '#8ea04a' : '#41ba58'}
                stroke="#2f8e42"
                strokeWidth="3"
              />
              <path d="M160 175 Q210 140 265 118" stroke="#b4e470" strokeWidth="3" fill="none" />
            </g>

            {/* Left Leaf 2 (Upper) */}
            <g
              className="transition-transform duration-500 origin-[160px_130px]"
              style={{
                transform:
                  plantMood === 'wilting'
                    ? 'rotate(40deg)'
                    : plantMood === 'droop'
                    ? 'rotate(18deg)'
                    : 'rotate(-8deg)',
              }}
            >
              <path
                d="M160 130 C110 120 80 85 75 55 C105 45 145 80 160 130 Z"
                fill={plantMood === 'wilting' ? '#9ab052' : '#49cc62'}
                stroke="#2f8e42"
                strokeWidth="3"
              />
              <path d="M160 130 Q120 90 78 58" stroke="#b4e470" strokeWidth="2.5" fill="none" />
            </g>

            {/* Right Leaf 2 (Upper) */}
            <g
              className="transition-transform duration-500 origin-[160px_120px]"
              style={{
                transform:
                  plantMood === 'wilting'
                    ? 'rotate(-40deg)'
                    : plantMood === 'droop'
                    ? 'rotate(-18deg)'
                    : 'rotate(8deg)',
              }}
            >
              <path
                d="M160 120 C210 110 240 75 245 45 C215 35 175 70 160 120 Z"
                fill={plantMood === 'wilting' ? '#9ab052' : '#49cc62'}
                stroke="#2f8e42"
                strokeWidth="3"
              />
              <path d="M160 120 Q200 80 242 48" stroke="#b4e470" strokeWidth="2.5" fill="none" />
            </g>

            {/* Central Top Bud / Face Leaf */}
            <g className="transition-transform duration-300">
              <path
                d="M160 90 C125 65 130 15 160 10 C190 15 195 65 160 90 Z"
                fill={plantMood === 'wilting' ? '#8ca047' : '#3bb752'}
                stroke="#277e39"
                strokeWidth="3"
              />

              {/* Expressive Face */}
              {plantMood === 'happy' ? (
                <>
                  {/* Cheerful happy eyes */}
                  <circle cx="150" cy="46" r="4.5" fill="#1e3a24" />
                  <circle cx="170" cy="46" r="4.5" fill="#1e3a24" />
                  <circle cx="151.5" cy="44.5" r="1.5" fill="#ffffff" />
                  <circle cx="171.5" cy="44.5" r="1.5" fill="#ffffff" />
                  {/* Cheeks */}
                  <ellipse cx="143" cy="54" rx="4.5" ry="3" fill="#ff758f" />
                  <ellipse cx="177" cy="54" rx="4.5" ry="3" fill="#ff758f" />
                  {/* Big smile */}
                  <path
                    d="M152 53 Q160 63 168 53"
                    stroke="#1e3a24"
                    strokeWidth="3"
                    fill="#ff4d6d"
                    strokeLinecap="round"
                  />
                </>
              ) : plantMood === 'neutral' ? (
                <>
                  <circle cx="150" cy="46" r="4" fill="#1e3a24" />
                  <circle cx="170" cy="46" r="4" fill="#1e3a24" />
                  <path
                    d="M152 55 L168 55"
                    stroke="#1e3a24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  {/* Sad wilt eyes */}
                  <path d="M146 45 Q151 49 155 46" stroke="#1e3a24" strokeWidth="2.5" fill="none" />
                  <path d="M165 46 Q169 49 174 45" stroke="#1e3a24" strokeWidth="2.5" fill="none" />
                  {/* Sad curved mouth */}
                  <path
                    d="M153 58 Q160 51 167 58"
                    stroke="#1e3a24"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>
          </svg>

          {/* Quick Water Splash Trigger */}
          <button
            onClick={() => {
              sound.playWaterDrop();
              onWaterSplash();
            }}
            className="absolute bottom-2 -right-4 sm:right-2 p-2.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-md border-2 border-white transition-transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center group"
            title="Siram Air Sekarang!"
          >
            <Droplets className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Soil Floor & Storage Jar */}
      <div className="relative z-10 bg-linear-to-r from-emerald-800 via-emerald-700 to-emerald-900 border-t-4 border-emerald-600 px-4 py-3 flex items-center justify-between text-white text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/80 flex items-center justify-center font-bold text-base">
            🌱
          </div>
          <div>
            <div className="font-bold text-emerald-100">Kondisi Tanaman</div>
            <div className="text-[11px] text-emerald-200">
              {plantMood === 'happy'
                ? 'Sangat Subur & Memasak Makanan'
                : plantMood === 'neutral'
                ? 'Cukup Baik Namun Melambat'
                : 'Layu Karena Kurang Bahan'}
            </div>
          </div>
        </div>

        {/* Glucose Storage Indicator */}
        <div className="flex items-center gap-2 bg-emerald-900/60 px-3 py-1.5 rounded-xl border border-emerald-500/40">
          <div className="text-right">
            <div className="text-[10px] text-emerald-200 font-semibold">Gula Glukosa (Makanan)</div>
            <div className="text-xs font-bold text-amber-300">
              {isActive ? `${efficiency}% Dihasilkan` : '0% Belum Terbentuk'}
            </div>
          </div>
          <div className="w-7 h-9 rounded-md border border-amber-300/60 bg-amber-400/20 relative overflow-hidden flex items-end justify-center">
            <div
              className="w-full bg-amber-400 transition-all duration-500 rounded-b-sm"
              style={{ height: `${efficiency}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px]">🍯</span>
          </div>
        </div>
      </div>
    </div>
  );
};
