import React from 'react';
import { SimulationState } from '../types';
import { Sun, Droplets, Wind, Thermometer, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface ExperimentControlsProps {
  state: SimulationState;
  onChange: (next: SimulationState) => void;
  onReset: () => void;
  onNextQuiz: () => void;
}

export const ExperimentControls: React.FC<ExperimentControlsProps> = ({
  state,
  onChange,
  onReset,
  onNextQuiz,
}) => {
  const handleLightChange = (val: number) => {
    sound.playSunChime();
    onChange({ ...state, light: val });
  };

  const handleWaterChange = (val: number) => {
    sound.playWaterDrop();
    onChange({ ...state, water: val });
  };

  const handleCO2Toggle = () => {
    sound.playBubblePop();
    onChange({ ...state, co2: !state.co2 });
  };

  const handleTempChange = (val: number) => {
    sound.playClick();
    onChange({ ...state, temperature: val });
  };

  const applyPreset = (presetName: string) => {
    sound.playClick();
    if (presetName === 'ideal') {
      onChange({ light: 100, water: 100, co2: true, temperature: 25 });
    } else if (presetName === 'night') {
      onChange({ light: 0, water: 100, co2: true, temperature: 20 });
    } else if (presetName === 'drought') {
      onChange({ light: 100, water: 0, co2: true, temperature: 32 });
    } else if (presetName === 'no-co2') {
      onChange({ light: 100, water: 100, co2: false, temperature: 25 });
    }
  };

  const lightDescriptor =
    state.light === 0
      ? 'Gelap / Malam (0%)'
      : state.light <= 50
      ? 'Mendung / Redup (' + state.light + '%)'
      : 'Cerah Terik (' + state.light + '%)';

  const waterDescriptor =
    state.water === 0
      ? 'Kering Kerontang (0%)'
      : state.water <= 50
      ? 'Siram Sedang (' + state.water + '%)'
      : 'Cukup & Segar (' + state.water + '%)';

  return (
    <aside className="bg-white/95 rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-display font-bold text-emerald-900">
              🧪 Alat Eksperimen
            </h2>
            <p className="text-xs text-slate-500">
              Atur bahan untuk melihat fotosintesis berlangsung!
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            title="Reset ke pengaturan awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Sunlight Control */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-1.5">
            <span className="flex items-center gap-2 text-amber-700">
              <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Cahaya Matahari</span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-900 tabular-nums">
              {state.light}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={state.light}
            onChange={(e) => handleLightChange(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>{lightDescriptor}</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleLightChange(0)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                0%
              </button>
              <button
                onClick={() => handleLightChange(50)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                50%
              </button>
              <button
                onClick={() => handleLightChange(100)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold"
              >
                100%
              </button>
            </div>
          </div>
        </div>

        {/* 2. Water Control */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-1.5">
            <span className="flex items-center gap-2 text-cyan-700">
              <Droplets className="w-4 h-4 text-cyan-500 fill-cyan-400" />
              <span>Air & Siraman (H₂O)</span>
            </span>
            <span className="text-xs font-mono font-bold text-cyan-900 tabular-nums">
              {state.water}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={state.water}
            onChange={(e) => handleWaterChange(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>{waterDescriptor}</span>
            <div className="flex gap-1">
              <button
                onClick={() => handleWaterChange(0)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                Kering
              </button>
              <button
                onClick={() => handleWaterChange(100)}
                className="text-[10px] px-1.5 py-0.5 rounded-sm bg-cyan-100 hover:bg-cyan-200 text-cyan-800 font-bold"
              >
                Siram Penuh
              </button>
            </div>
          </div>
        </div>

        {/* 3. Carbon Dioxide Control */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-1.5">
            <span className="flex items-center gap-2 text-indigo-700">
              <Wind className="w-4 h-4 text-indigo-500" />
              <span>Karbon Dioksida (CO₂)</span>
            </span>
            <span
              className={`text-xs font-bold ${
                state.co2 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {state.co2 ? 'Tersedia 100%' : 'Kosong 0%'}
            </span>
          </div>

          <button
            onClick={handleCO2Toggle}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              state.co2
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                state.co2 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span>
              {state.co2
                ? '🌬️ Udara Bersih & CO₂ : TERSEDIA (Klik Ubah)'
                : '🚫 Kubah Vakum : TANPA CO₂ (Klik Nyalakan)'}
            </span>
          </button>
        </div>

        {/* 4. Temperature Slider */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-1.5">
            <span className="flex items-center gap-2 text-rose-700">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>Suhu Udara</span>
            </span>
            <span className="text-xs font-mono font-bold text-rose-900 tabular-nums">
              {state.temperature}°C
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            step="5"
            value={state.temperature}
            onChange={(e) => handleTempChange(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-100 rounded-lg"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>
              {state.temperature < 18
                ? 'Dingin (Enzim Lambat)'
                : state.temperature <= 30
                ? 'Suhu Hangat Ideal'
                : 'Terlalu Panas (Layu)'}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">25°C Terbaik</span>
          </div>
        </div>

        {/* Skenario Uji Coba Cepat */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-600 mb-2">
            💡 Coba Skenario Seru:
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => applyPreset('ideal')}
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold border border-emerald-200 text-left transition-colors cursor-pointer"
            >
              🌟 Kondisi Ideal
            </button>
            <button
              onClick={() => applyPreset('night')}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold border border-slate-200 text-left transition-colors cursor-pointer"
            >
              🌙 Malam Hari
            </button>
            <button
              onClick={() => applyPreset('drought')}
              className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold border border-amber-200 text-left transition-colors cursor-pointer"
            >
              🏜️ Kekeringan
            </button>
            <button
              onClick={() => applyPreset('no-co2')}
              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 font-semibold border border-rose-200 text-left transition-colors cursor-pointer"
            >
              🫧 Tanpa CO₂
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={() => {
            sound.playClick();
            onNextQuiz();
          }}
          className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>🧠 Uji Pemahaman & Kuis</span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
