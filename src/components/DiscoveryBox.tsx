import React from 'react';
import { SimulationState } from '../types';
import { Sparkles, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface DiscoveryBoxProps {
  state: SimulationState;
}

export const DiscoveryBox: React.FC<DiscoveryBoxProps> = ({ state }) => {
  const co2Score = state.co2 ? 100 : 0;
  const tempFactor = state.temperature >= 20 && state.temperature <= 30 ? 1 : 0.7;
  const efficiency = Math.round(Math.min(state.light, state.water, co2Score) * tempFactor);

  // Dynamic explanation analysis
  let statusMessage = '';
  let statusColor = 'bg-emerald-50 border-emerald-200 text-emerald-900';

  if (efficiency >= 90) {
    statusMessage =
      '🌟 Luar biasa! Semua bahan tersedia dalam jumlah cukup. Klorofil di daun bekerja maksimal memasak glukosa dan memompa oksigen bersih ke udara!';
    statusColor = 'bg-emerald-50 border-emerald-300 text-emerald-900';
  } else if (efficiency >= 40) {
    const limits = [];
    if (state.light <= 50) limits.push('cahaya matahari redup');
    if (state.water <= 50) limits.push('air tanah terbatas');
    if (!state.co2) limits.push('karbon dioksida habis');
    if (state.temperature < 20 || state.temperature > 30) limits.push('suhu kurang optimal');

    statusMessage = `🙂 Fotosintesis tetap berjalan tetapi melambat karena ${limits.join(
      ' dan '
    )}. Coba naikkan bahan tersebut agar tanaman lebih bertenaga!`;
    statusColor = 'bg-amber-50 border-amber-300 text-amber-900';
  } else {
    let mainMissing = '';
    if (state.light === 0) mainMissing = 'Matahari tidak bersinar (0%). Tanpa cahaya, klorofil tidak memiliki energi!';
    else if (state.water === 0) mainMissing = 'Tanah sangat kering tanpa air (0%). Daun menutup stomata agar tidak dehidrasi!';
    else if (!state.co2) mainMissing = 'Tidak ada karbon dioksida di udara. Tanaman tidak memiliki bahan karbon untuk membuat gula!';
    else mainMissing = 'Bahan-bahan fotosintesis sangat minim.';

    statusMessage = `😟 Fotosintesis terhenti! ${mainMissing} Yuk, bantu tanaman dengan melengkapi kebutuhannya!`;
    statusColor = 'bg-rose-50 border-rose-300 text-rose-900';
  }

  return (
    <aside className="bg-white/95 rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-lg font-display font-bold text-emerald-900 flex items-center gap-2">
            <span>💡 Kotak Penemuan</span>
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Hasil Lab
          </span>
        </div>

        {/* Live Status Callout */}
        <div className={`mt-4 p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${statusColor} transition-colors duration-300`}>
          <div className="font-bold mb-1 flex items-center gap-1.5">
            {efficiency >= 40 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>Status Eksperimen:</span>
          </div>
          <p>{statusMessage}</p>
        </div>

        {/* Production Meters */}
        <div className="mt-5 space-y-4">
          {/* Oxygen Meter */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5 text-cyan-800">
                <span>🫧 Produksi Oksigen (O₂)</span>
              </span>
              <span className="font-mono tabular-nums text-cyan-900">{efficiency}%</span>
            </div>
            <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${efficiency}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (Hampa)</span>
              <span className="text-cyan-700 font-semibold">
                {efficiency >= 80 ? 'Sangat Berlimpah' : efficiency >= 40 ? 'Sedang' : 'Tidak Ada'}
              </span>
              <span>100% (Maksimal)</span>
            </div>
          </div>

          {/* Glucose Meter */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1.5 text-amber-800">
                <span>🍯 Glukosa / Makanan (C₆H₁₂O₆)</span>
              </span>
              <span className="font-mono tabular-nums text-amber-900">{efficiency}%</span>
            </div>
            <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${efficiency}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (Lapar)</span>
              <span className="text-amber-700 font-semibold">
                {efficiency >= 80 ? 'Energi Tersimpan' : efficiency >= 40 ? 'Cukup' : 'Kosong'}
              </span>
              <span>100% (Kenyang)</span>
            </div>
          </div>
        </div>

        {/* Resep Kimiawi Fotosintesis */}
        <div className="mt-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs">
          <div className="font-bold text-amber-900 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Persamaan Fotosintesis:</span>
          </div>
          <div className="font-mono text-[11px] bg-white p-2 rounded-xl border border-amber-200 text-slate-700 text-center tracking-tight leading-relaxed">
            <span className="text-amber-600 font-bold">Cahaya</span> +{' '}
            <span className="text-cyan-600 font-bold">6 H₂O</span> +{' '}
            <span className="text-indigo-600 font-bold">6 CO₂</span>
            <br />
            ➔{' '}
            <span className="text-amber-700 font-bold">C₆H₁₂O₆ (Glukosa)</span> +{' '}
            <span className="text-emerald-600 font-bold">6 O₂ (Oksigen)</span>
          </div>
        </div>
      </div>

      {/* Tahukah Kamu Trivia */}
      <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-700">Tahukah Kamu?</strong> Lebih dari 50% oksigen di Bumi
          dihasilkan oleh fitoplankton (tumbuhan mikroskopis) di lautan melalui fotosintesis!
        </p>
      </div>
    </aside>
  );
};
