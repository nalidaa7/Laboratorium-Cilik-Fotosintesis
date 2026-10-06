import React, { useState } from 'react';
import { QuizQuestion, CertificateData } from '../types';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

interface QuizSectionProps {
  onOpenCertificate: (data: CertificateData) => void;
  onBackToLab: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onOpenCertificate,
  onBackToLab,
}) => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Apa saja tiga bahan utama yang dibutuhkan tanaman untuk berfotosintesis?',
      options: [
        {
          text: 'Batu, pasir, dan angin kencang',
          isCorrect: false,
          explanation: 'Batu dan pasir bukan bahan pembentuk gula dalam fotosintesis.',
        },
        {
          text: 'Cahaya matahari, air (H₂O), dan karbon dioksida (CO₂)',
          isCorrect: true,
          explanation: 'Tepat sekali! Ketiganya adalah bahan baku yang diolah di daun.',
        },
        {
          text: 'Pupuk kimia, plastik, dan api unggun',
          isCorrect: false,
          explanation: 'Plastik dan api justru dapat merusak jaringan tanaman.',
        },
      ],
    },
    {
      id: 2,
      question: 'Apa hasil penting dari fotosintesis yang sangat berguna bagi manusia dan hewan?',
      options: [
        {
          text: 'Oksigen (O₂) untuk bernapas dan makanan (Glukosa)',
          isCorrect: true,
          explanation: 'Benar! Oksigen dilepaskan ke udara untuk pernapasan seluruh makhluk hidup.',
        },
        {
          text: 'Minyak tanah dan batu bata merah',
          isCorrect: false,
          explanation: 'Minyak tanah dan batu bata bukan produk biologis tumbuhan.',
        },
        {
          text: 'Asap tebal dan debu jalanan',
          isCorrect: false,
          explanation: 'Fotosintesis justru menyerap karbon dan membersihkan udara.',
        },
      ],
    },
    {
      id: 3,
      question: 'Lewat pintu atau lubang kecil manakah gas karbon dioksida (CO₂) masuk ke dalam daun?',
      options: [
        {
          text: 'Stomata (Mulut Daun)',
          isCorrect: true,
          explanation: 'Hebat! Stomata adalah pori-pori mikroskopis di permukaan bawah daun.',
        },
        {
          text: 'Ujung duri tanaman',
          isCorrect: false,
          explanation: 'Duri berfungsi sebagai pelindung diri tanaman, bukan jalur pernapasan utama.',
        },
        {
          text: 'Kelopak bunga',
          isCorrect: false,
          explanation: 'Kelopak bunga bertugas memikat serangga penyerbuk.',
        },
      ],
    },
    {
      id: 4,
      question: 'Zat hijau apakah di dalam daun yang berfungsi menangkap sinar matahari seperti panel surya?',
      options: [
        {
          text: 'Zat pewarna tekstil',
          isCorrect: false,
          explanation: 'Pewarna tekstil adalah zat sintetis pakaian.',
        },
        {
          text: 'Klorofil (di dalam kloroplas)',
          isCorrect: true,
          explanation: 'Benar! Klorofil adalah pigmen hijau alami penyerap foton cahaya matahari.',
        },
        {
          text: 'Getah karet kental',
          isCorrect: false,
          explanation: 'Getah adalah cairan pelindung pohon saat batang terluka.',
        },
      ],
    },
    {
      id: 5,
      question: 'Apa yang akan terjadi jika tanaman tidak disiram air dalam waktu lama?',
      options: [
        {
          text: 'Tanaman makin cepat berbunga',
          isCorrect: false,
          explanation: 'Kekurangan air justru menghambat pertumbuhan kuncup bunga.',
        },
        {
          text: 'Stomata menutup, fotosintesis terhenti, dan daun menjadi layu',
          isCorrect: true,
          explanation: 'Tepat! Tanpa air (H₂O), bahan baku fotosintesis habis dan sel daun kehilangan tekanan.',
        },
        {
          text: 'Daun berubah menjadi warna emas berkilau',
          isCorrect: false,
          explanation: 'Daun akan menguning kusam dan kering, bukan menjadi emas.',
        },
      ],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [studentName, setStudentName] = useState('Ilmuwan Cilik');

  const handleSelect = (qId: number, optIdx: number, isCorrect: boolean) => {
    if (selectedAnswers[qId] !== undefined) return; // already answered

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playError();
    }

    const nextAnswers = { ...selectedAnswers, [qId]: optIdx };
    setSelectedAnswers(nextAnswers);

    if (Object.keys(nextAnswers).length === questions.length) {
      setCompleted(true);
      fireConfetti(3500);
      sound.playFanfare();
    }
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = questions.find((item) => item.id === Number(qId));
    if (q && q.options[optIdx]?.isCorrect) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleReset = () => {
    sound.playClick();
    setSelectedAnswers({});
    setCompleted(false);
  };

  const handleClaimCertificate = () => {
    sound.playClick();
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    onOpenCertificate({
      studentName,
      date: today,
      score,
      totalQuestions: questions.length,
      badgeTitle:
        score === questions.length
          ? 'Ilmuwan Cilik Kehormatan 🌟'
          : score >= 3
          ? 'Peneliti Tanaman Berbakat 🌿'
          : 'Penyelidik Alam Pemula 🌱',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Quiz Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300">
          🏆 TANTANGAN ILMUWAN CILIK
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-bold text-emerald-950 mt-2 mb-2">
          Sudah Menemukan Rahasia Daun? 🌱
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Buktikan keahlianmu sebagai peneliti sains cilik dengan menjawab pertanyaan di bawah ini!
        </p>

        {/* Live Score Counter */}
        <div className="mt-4 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-xs border border-emerald-100 text-xs font-bold text-slate-700">
          <span>Skor Kamu:</span>
          <span className="font-mono text-emerald-800 text-sm">
            {score} / {questions.length} Benar
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-normal">
            Terjawab: {Object.keys(selectedAnswers).length} dari {questions.length}
          </span>
        </div>
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswerIdx = selectedAnswers[q.id];
          const hasAnswered = userAnswerIdx !== undefined;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-emerald-100 transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {qIndex + 1}
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pl-0 sm:pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswerIdx === optIdx;
                  let btnStyle =
                    'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      btnStyle =
                        'bg-emerald-50 text-emerald-900 border-emerald-400 font-bold ring-2 ring-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle =
                        'bg-rose-50 text-rose-900 border-rose-300 line-through opacity-85';
                    } else {
                      btnStyle = 'bg-slate-50 text-slate-400 border-slate-100 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelect(q.id, optIdx, opt.isCorrect)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span className="pr-2">{opt.text}</span>
                      {hasAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {hasAnswered && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}

                {/* Explanation feedback */}
                {hasAnswered && (
                  <div
                    className={`mt-2 p-3 rounded-xl text-xs leading-relaxed animate-fade-in ${
                      q.options[userAnswerIdx].isCorrect
                        ? 'bg-emerald-100/60 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100/60 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <strong>
                      {q.options[userAnswerIdx].isCorrect ? '🎉 Tepat Sekali: ' : '💭 Penjelasan: '}
                    </strong>
                    {q.options[userAnswerIdx].explanation}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {completed && (
        <div className="mt-8 p-6 bg-linear-to-r from-amber-100 via-amber-50 to-emerald-100 rounded-3xl border-2 border-amber-300 shadow-md text-center animate-fade-in space-y-4">
          <div className="w-16 h-16 rounded-full bg-white shadow-md mx-auto flex items-center justify-center text-3xl">
            🏅
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
              Hebat! Kuis Selesai!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Kamu berhasil menjawab dengan benar <strong className="text-emerald-800">{score} dari {questions.length}</strong> pertanyaan!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 font-semibold">Namamu:</span>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ketik nama..."
                className="font-bold text-slate-800 outline-hidden w-36"
              />
            </div>

            <button
              onClick={handleClaimCertificate}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Buka Sertifikat Penghargaan</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-emerald-100">
        <button
          onClick={() => {
            sound.playClick();
            onBackToLab();
          }}
          className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span>← Kembali ke Laboratorium</span>
        </button>

        {Object.keys(selectedAnswers).length > 0 && (
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi Kuis</span>
          </button>
        )}
      </div>
    </div>
  );
};
