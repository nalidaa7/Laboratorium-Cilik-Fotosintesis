/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, SimulationState, CertificateData } from './types';
import { TopNavigation } from './components/TopNavigation';
import { KokoCharacter } from './components/KokoCharacter';
import { PlantCanvas } from './components/PlantCanvas';
import { ExperimentControls } from './components/ExperimentControls';
import { DiscoveryBox } from './components/DiscoveryBox';
import { StepByStepGuide } from './components/StepByStepGuide';
import { QuizSection } from './components/QuizSection';
import { MicroscopeModal } from './components/MicroscopeModal';
import { CertificateModal } from './components/CertificateModal';
import { sound } from './utils/audio';
import { Sparkles, ArrowRight, Sun, Droplets, Wind, Microscope } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('welcome');
  const [isMuted, setIsMuted] = useState(false);
  const [isMicroscopeOpen, setIsMicroscopeOpen] = useState(false);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [certData, setCertData] = useState<CertificateData | null>(null);

  const [simState, setSimState] = useState<SimulationState>({
    light: 100,
    water: 100,
    co2: true,
    temperature: 25,
  });

  const [kokoGreetingIdx, setKokoGreetingIdx] = useState(0);
  const kokoGreetings = [
    '“Halo, Teman-Teman! Tanaman di kebun sedang lapar, nih. Yuk, bantu aku membuat makanan dengan mencampurkan cahaya matahari, air, dan udara bersih!”',
    '“Klik tombol ‘Intip Sel Daun’ untuk melihat klorofil yang bekerja seperti panel surya alami!”',
    '“Kalau air atau matahari habis, aku bisa layu lho. Coba kamu atur di panel eksperimen!”',
  ];

  const handleKokoClick = () => {
    setKokoGreetingIdx((prev) => (prev + 1) % kokoGreetings.length);
  };

  const handleWaterSplash = () => {
    setSimState((prev) => ({
      ...prev,
      water: Math.min(100, prev.water + 30),
    }));
  };

  const handleResetLab = () => {
    setSimState({
      light: 100,
      water: 100,
      co2: true,
      temperature: 25,
    });
  };

  const handleOpenCertificate = (data: CertificateData) => {
    setCertData(data);
    setIsCertOpen(true);
  };

  const handleUpdateStudentName = (name: string) => {
    if (certData) {
      setCertData({ ...certData, studentName: name });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Bar Contract (Strict 3 zones) */}
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenMicroscope={() => setIsMicroscopeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ================= 1. WELCOME SCREEN ================= */}
        {activeTab === 'welcome' && (
          <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8 bg-linear-to-b from-sky-100 via-emerald-50 to-green-100 overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-12 left-10 w-36 h-10 bg-white/70 rounded-full blur-[1px] pointer-events-none" />
            <div className="absolute top-20 right-20 w-44 h-12 bg-white/60 rounded-full blur-[1px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-200/40 blur-2xl pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
              {/* Left Column: Title & Mission */}
              <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-lg border-4 border-white">
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>LABORATORIUM SAINS CILIK</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-emerald-950 mt-4 mb-3 tracking-tight leading-[1.15]">
                  Petualangan Fotosintesis:<br />
                  <span className="text-emerald-700">Bantu Tanaman</span>{' '}
                  <span className="text-amber-500">Membuat Makanan!</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Siap menjadi ilmuwan cilik? Pelajari rahasia bagaimana sehelai daun hijau mengolah sinar matahari, air tanah, dan udara bersih menjadi makanan manis serta oksigen segar untuk kita bernapas!
                </p>

                {/* 3 Core Ingredients Badges */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-xs font-bold">
                  <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-center text-center">
                    <Sun className="w-5 h-5 text-amber-500 mb-1" />
                    <span>Cahaya Surya</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-900 flex flex-col items-center text-center">
                    <Droplets className="w-5 h-5 text-cyan-500 mb-1" />
                    <span>Air Tanah (H₂O)</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex flex-col items-center text-center">
                    <Wind className="w-5 h-5 text-indigo-500 mb-1" />
                    <span>Gas CO₂ Udara</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('simulator');
                    }}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🌱 Mulai Eksperimen Lab</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('guide');
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Pelajari Tahapan Sains
                  </button>
                </div>
              </div>

              {/* Right Column: Animated Koko Mascot */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <KokoCharacter
                  mood="happy"
                  speechText={kokoGreetings[kokoGreetingIdx]}
                  size="lg"
                  onClick={handleKokoClick}
                />
                <div className="text-center mt-3">
                  <div className="text-xs font-bold text-emerald-900">
                    Koko si Daun 🍃
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Klik Koko untuk mendengarkan tips sains!
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= 2. SIMULATOR SCREEN ================= */}
        {activeTab === 'simulator' && (
          <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Simulator Header / Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs">
              <div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  Laboratorium Sains Interaktif
                </div>
                <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  Simulasi Proses Fotosintesis
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsMicroscopeOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Microscope className="w-4 h-4 text-emerald-600" />
                  <span>Intip Kloroplas (Mikroskop)</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('quiz');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
                >
                  Kuis & Tantangan →
                </button>
              </div>
            </div>

            {/* Main 3-Column / Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Parameter Controls (4 Cols) */}
              <div className="lg:col-span-4 flex">
                <ExperimentControls
                  state={simState}
                  onChange={setSimState}
                  onReset={handleResetLab}
                  onNextQuiz={() => setActiveTab('quiz')}
                />
              </div>

              {/* Middle Column: Interactive Living Plant Stage (5 Cols) */}
              <div className="lg:col-span-5 flex">
                <PlantCanvas
                  state={simState}
                  onOpenMicroscope={() => setIsMicroscopeOpen(true)}
                  onWaterSplash={handleWaterSplash}
                />
              </div>

              {/* Right Column: Discovery Box & Equations (3 Cols) */}
              <div className="lg:col-span-3 flex">
                <DiscoveryBox state={simState} />
              </div>
            </div>
          </section>
        )}

        {/* ================= 3. GUIDE SCREEN ================= */}
        {activeTab === 'guide' && (
          <StepByStepGuide onStartExperiment={() => setActiveTab('simulator')} />
        )}

        {/* ================= 4. QUIZ SCREEN ================= */}
        {activeTab === 'quiz' && (
          <QuizSection
            onOpenCertificate={handleOpenCertificate}
            onBackToLab={() => setActiveTab('simulator')}
          />
        )}
      </main>

      {/* Microscope Modal */}
      <MicroscopeModal
        isOpen={isMicroscopeOpen}
        onClose={() => setIsMicroscopeOpen(false)}
        isWatered={simState.water > 20}
        hasLight={simState.light > 10}
      />

      {/* Certificate Modal */}
      {certData && (
        <CertificateModal
          isOpen={isCertOpen}
          onClose={() => setIsCertOpen(false)}
          data={certData}
          onUpdateName={handleUpdateStudentName}
        />
      )}

      {/* Quiet, Human-Designed Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-semibold text-slate-700">
            🍃 Laboratorium Cilik — Petualangan Fotosintesis
          </div>
          <div className="text-slate-400">
            Dibuat untuk pembelajaran sains anak-anak & sekolah dasar · Hak Cipta Edukasi
          </div>
          <div className="flex gap-4 font-semibold text-slate-600">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('simulator');
              }}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Simulasi
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('guide');
              }}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Tahapan
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('quiz');
              }}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Kuis
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
