import React, { useState } from 'react';
import { X, Printer, Award, CheckCircle, Sparkles } from 'lucide-react';
import { CertificateData } from '../types';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CertificateData;
  onUpdateName: (name: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateName,
}) => {
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState(data.studentName || 'Ilmuwan Cilik Hebat');

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleSaveName = () => {
    sound.playClick();
    onUpdateName(tempName.trim() || 'Ilmuwan Cilik Hebat');
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-6">
        {/* Modal Controls Bar (Hidden during printing) */}
        <div className="print:hidden bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Sertifikat Kelulusan Eksperimen Fotosintesis</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-transform hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CANVAS */}
        <div className="p-8 sm:p-12 bg-linear-to-b from-amber-50/60 via-white to-emerald-50/60 relative print:p-8">
          {/* Ornate Frame Border */}
          <div className="border-4 border-amber-400 p-6 sm:p-8 rounded-2xl relative bg-white/90 shadow-inner">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-400 text-xl font-serif">✦</div>
            <div className="absolute top-2 right-2 text-amber-400 text-xl font-serif">✦</div>
            <div className="absolute bottom-2 left-2 text-amber-400 text-xl font-serif">✦</div>
            <div className="absolute bottom-2 right-2 text-amber-400 text-xl font-serif">✦</div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100/70 px-4 py-1 rounded-full border border-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Laboratorium Sains Cilik</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
                SERTIFIKAT PENGHARGAAN
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 italic">
                Diberikan dengan bangga kepada ilmuwan muda berprestasi:
              </p>
            </div>

            {/* Recipient Name Area */}
            <div className="text-center my-6">
              {editing ? (
                <div className="inline-flex items-center gap-2 max-w-sm mx-auto">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Ketik namamu..."
                    className="border-2 border-emerald-500 rounded-xl px-3 py-1.5 text-base font-bold text-center focus:outline-hidden"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <div className="group relative inline-block">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-800 border-b-2 border-dashed border-emerald-400 pb-1 px-6 inline-block">
                    {data.studentName || 'Ilmuwan Cilik Hebat'}
                  </div>
                  <button
                    onClick={() => setEditing(true)}
                    className="print:hidden ml-2 text-xs text-slate-400 hover:text-emerald-700 underline cursor-pointer"
                  >
                    (Ubah Nama)
                  </button>
                </div>
              )}
            </div>

            {/* Commendation Paragraph */}
            <p className="text-center text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
              Telah berhasil menyelesaikan simulasi eksperimen laboratorium dan menjawab kuis
              fotosintesis dengan nilai <strong className="text-emerald-800">{data.score} dari {data.totalQuestions}</strong>. Dinyatakan memahami proses fotosintesis dan peran tumbuhan bagi oksigen di Bumi.
            </p>

            {/* Medal & Seal Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200">
              {/* Left: Date & Verification */}
              <div className="text-left text-xs text-slate-500">
                <div>Tanggal: <strong className="text-slate-800">{data.date}</strong></div>
                <div>Status: <span className="text-emerald-700 font-bold inline-flex items-center gap-1">Lulus Terverifikasi <CheckCircle className="w-3.5 h-3.5" /></span></div>
              </div>

              {/* Center: Gold Medal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-400 to-yellow-200 border-4 border-amber-300 shadow-md flex items-center justify-center text-3xl">
                  🏅
                </div>
                <div className="text-[11px] font-bold text-amber-900 mt-1">
                  {data.badgeTitle}
                </div>
              </div>

              {/* Right: Signature */}
              <div className="text-right text-xs">
                <div className="font-display font-bold text-emerald-800 text-sm italic">
                  🍃 Koko si Daun
                </div>
                <div className="w-32 border-b border-slate-300 my-1 ml-auto" />
                <div className="text-[10px] text-slate-500">Kepala Lab Fotosintesis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
