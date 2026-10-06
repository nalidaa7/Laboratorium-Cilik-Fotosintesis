import React, { useState } from 'react';
import { X, ZoomIn, Info, Check, Eye } from 'lucide-react';
import { sound } from '../utils/audio';

interface MicroscopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWatered: boolean;
  hasLight: boolean;
}

export const MicroscopeModal: React.FC<MicroscopeModalProps> = ({
  isOpen,
  onClose,
  isWatered,
  hasLight,
}) => {
  const [zoomLevel, setZoomLevel] = useState<'400x' | '1000x'>('400x');
  const [activePart, setActivePart] = useState<'chloroplast' | 'stoma' | 'cellwall'>('chloroplast');
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  const partDetails = {
    chloroplast: {
      name: 'Kloroplas & Klorofil',
      color: 'text-emerald-700',
      description:
        'Kloroplas adalah "dapur mini" di dalam sel daun. Di dalamnya ada zat hijau bernama klorofil yang bertugas menangkap sinar matahari seperti panel surya alami!',
      fact: hasLight
        ? '☀️ Sedang aktif menangkap foton cahaya!'
        : '🌙 Klorofil sedang istirahat karena tidak ada cahaya.',
    },
    stoma: {
      name: 'Stomata (Mulut Daun)',
      color: 'text-cyan-700',
      description:
        'Stomata adalah lubang-lubang kecil berukuran mikroskopis di permukaan bawah daun. Lubang ini berfungsi menghirup gas CO₂ dan melepas oksigen segar ke udara.',
      fact: isWatered
        ? '💧 Stomata TERBUKA lebar karena tanaman cukup air!'
        : '🏜️ Stomata TERTUTUP rapat untuk mencegah tanaman kehilangan air.',
    },
    cellwall: {
      name: 'Dinding Sel & Vakuola',
      color: 'text-amber-800',
      description:
        'Dinding kokoh terbuat dari selulosa yang melindungi sel tanaman, serta vakuola yang menyimpan cadangan air agar daun tetap tegak dan tidak layu.',
      fact: '🛡️ Memberikan bentuk kotak yang kokoh pada sel tumbuhan.',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔬</span>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Mikroskop Ajaib: Mengintip Sel Daun
              </h3>
              <p className="text-xs text-emerald-200">
                Lihat langsung organel pembuat makanan di dalam sehelai daun!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            aria-label="Tutup Mikroskop"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Microscope Viewport Frame */}
          <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-slate-900 overflow-hidden border-4 border-slate-700 shadow-inner flex items-center justify-center">
            {/* Specimen Texture with Fallback */}
            {!imgError ? (
              <img
                src="/src/assets/images/microscope_plant_cell_texture_1790647503007.jpg"
                alt="Tekstur Sel Tanaman di Bawah Mikroskop"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  zoomLevel === '1000x' ? 'scale-150' : 'scale-100'
                }`}
              />
            ) : (
              <div className="w-full h-full bg-linear-to-tr from-emerald-950 via-emerald-800 to-green-900 flex items-center justify-center">
                <div className="text-emerald-200 text-xs">Simulasi Sel Kloroplas</div>
              </div>
            )}

            {/* Circular Vignette Overlay to simulate Microscope eyepiece */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] border-[16px] border-slate-900/60" />

            {/* Crosshairs & Grid */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
              <div className="w-full h-[1px] bg-emerald-400" />
              <div className="h-full w-[1px] bg-emerald-400 absolute" />
              <div className="w-24 h-24 rounded-full border border-emerald-400 absolute" />
            </div>

            {/* Interactive Hotspots */}
            {/* Hotspot 1: Chloroplast */}
            <button
              onClick={() => {
                sound.playClick();
                setActivePart('chloroplast');
              }}
              className={`absolute top-1/3 left-1/4 px-2.5 py-1 rounded-full text-xs font-bold transition-transform cursor-pointer flex items-center gap-1 shadow-lg ${
                activePart === 'chloroplast'
                  ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-300/60'
                  : 'bg-white/90 text-emerald-900 hover:scale-105'
              }`}
            >
              <span>🍃 Kloroplas</span>
            </button>

            {/* Hotspot 2: Stoma */}
            <button
              onClick={() => {
                sound.playClick();
                setActivePart('stoma');
              }}
              className={`absolute bottom-1/4 right-1/4 px-2.5 py-1 rounded-full text-xs font-bold transition-transform cursor-pointer flex items-center gap-1 shadow-lg ${
                activePart === 'stoma'
                  ? 'bg-cyan-500 text-white scale-110 ring-4 ring-cyan-300/60'
                  : 'bg-white/90 text-cyan-900 hover:scale-105'
              }`}
            >
              <span>👄 Stomata ({isWatered ? 'Terbuka' : 'Tertutup'})</span>
            </button>

            {/* Hotspot 3: Cell Wall */}
            <button
              onClick={() => {
                sound.playClick();
                setActivePart('cellwall');
              }}
              className={`absolute top-1/4 right-1/3 px-2.5 py-1 rounded-full text-xs font-bold transition-transform cursor-pointer flex items-center gap-1 shadow-lg ${
                activePart === 'cellwall'
                  ? 'bg-amber-500 text-white scale-110 ring-4 ring-amber-300/60'
                  : 'bg-white/90 text-amber-900 hover:scale-105'
              }`}
            >
              <span>🧱 Dinding Sel</span>
            </button>

            {/* Lens Magnification Badge */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-md border border-white/20">
              Lensa: {zoomLevel}
            </div>
          </div>

          {/* Zoom Level Switcher */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4 text-emerald-600" />
              <span>Perbesaran Lensa:</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setZoomLevel('400x');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  zoomLevel === '400x'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                400x (Jaringan Daun)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setZoomLevel('1000x');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  zoomLevel === '1000x'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                1000x (Detail Organel)
              </button>
            </div>
          </div>

          {/* Active Organelle Explanation Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className={`font-bold text-base ${partDetails[activePart].color} flex items-center gap-1.5`}>
                <Eye className="w-4 h-4" />
                <span>{partDetails[activePart].name}</span>
              </h4>
              <span className="text-[11px] font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Organel Daun
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2.5">
              {partDetails[activePart].description}
            </p>
            <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{partDetails[activePart].fact}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Kembali ke Lab Eksperimen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
