import React from 'react';
import { PlantMood } from '../types';
import { sound } from '../utils/audio';

interface KokoCharacterProps {
  mood?: PlantMood | 'talking' | 'celebrating' | 'thinking';
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const KokoCharacter: React.FC<KokoCharacterProps> = ({
  mood = 'happy',
  speechText,
  size = 'md',
  className = '',
  onClick,
}) => {
  const handleClick = () => {
    sound.playClick();
    if (onClick) onClick();
  };

  const isDroop = mood === 'droop' || mood === 'wilting';
  const isHappy = mood === 'happy' || mood === 'celebrating';

  const sizeClasses = {
    sm: 'w-24 h-28',
    md: 'w-44 h-52 sm:w-56 sm:h-64',
    lg: 'w-64 h-72 sm:w-80 sm:h-96',
  }[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {speechText && (
        <div className="relative mb-3 max-w-md bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm text-slate-800 text-sm sm:text-base leading-relaxed animate-fade-in">
          <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
            <span>🍃 Koko si Daun</span>
            {isDroop && <span className="text-xs text-amber-700">(Butuh Bantuan!)</span>}
            {isHappy && <span className="text-xs text-emerald-700">(Segar Ceria!)</span>}
          </div>
          <p>{speechText}</p>
          <div className="absolute -bottom-2.5 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-emerald-200 transform rotate-45" />
        </div>
      )}

      <div
        onClick={handleClick}
        className={`cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 ${sizeClasses}`}
        title="Klik Koko si Daun!"
      >
        <svg
          viewBox="0 0 330 390"
          className="w-full h-full drop-shadow-md"
          role="img"
          aria-label="Koko si Daun"
        >
          {/* Shadow */}
          <ellipse cx="165" cy="360" rx="90" ry="16" fill="#1b4d27" opacity="0.18" />

          {/* Leaf Body */}
          <path
            d="M165 40 C85 65 58 145 82 240 C98 302 165 320 165 320 C165 320 232 302 248 240 C272 145 245 65 165 40Z"
            fill={isDroop ? '#9bb359' : '#3dbb51'}
            className="transition-colors duration-500"
          />

          {/* Leaf Center Vein */}
          <path
            d="M165 65 C155 140 157 215 165 296"
            stroke={isDroop ? '#c4dc79' : '#aee363'}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />

          {/* Side Veins */}
          <path
            d="M161 125 L112 91 M162 165 L103 145 M166 210 L105 200 M169 125 L216 91 M168 165 L226 145 M166 210 L225 200"
            stroke={isDroop ? '#adc96b' : '#88cb49'}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Little Leaf Sprout on top */}
          <path d="M151 44 Q165 18 180 44" fill={isDroop ? '#788f3a' : '#2b9c3f'} />

          {/* Cute leaf ears */}
          <ellipse
            cx="109"
            cy="95"
            rx="30"
            ry="16"
            transform="rotate(-25 109 95)"
            fill={isDroop ? '#8ea84d' : '#49c55d'}
          />
          <ellipse
            cx="222"
            cy="92"
            rx="30"
            ry="16"
            transform="rotate(28 222 92)"
            fill={isDroop ? '#8ea84d' : '#49c55d'}
          />

          {/* Face Area */}
          <g>
            {/* Eyes White */}
            <ellipse cx="137" cy="160" rx="13" ry="18" fill="#ffffff" />
            <ellipse cx="193" cy="160" rx="13" ry="18" fill="#ffffff" />

            {/* Pupils */}
            {isDroop ? (
              <>
                <circle cx="139" cy="168" r="6" fill="#243c28" />
                <circle cx="191" cy="168" r="6" fill="#243c28" />
                {/* Sad droop eyebrows */}
                <path d="M125 138 Q137 145 149 140" stroke="#243c28" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M181 140 Q193 145 205 138" stroke="#243c28" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="139" cy="161" r="7" fill="#243c28" />
                <circle cx="191" cy="161" r="7" fill="#243c28" />
                <circle cx="141" cy="158" r="2.5" fill="#ffffff" />
                <circle cx="193" cy="158" r="2.5" fill="#ffffff" />
                {/* Cheerful curved eyebrows */}
                <path d="M126 142 Q137 136 148 142" stroke="#243c28" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M182 142 Q193 136 204 142" stroke="#243c28" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            )}

            {/* Rosy Cheeks */}
            <ellipse cx="116" cy="190" rx="12" ry="7" fill="#ff8ba0" opacity={isDroop ? '0.4' : '0.85'} />
            <ellipse cx="214" cy="190" rx="12" ry="7" fill="#ff8ba0" opacity={isDroop ? '0.4' : '0.85'} />

            {/* Mouth */}
            {isDroop ? (
              <path
                d="M152 208 Q165 196 178 208"
                stroke="#632b2b"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M148 195 Q165 218 182 195"
                stroke="#632b2b"
                strokeWidth="5"
                fill="#ff758c"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* Left Arm (Waving) */}
          <g className={isHappy ? 'animate-wave origin-[45px_195px]' : ''}>
            <path
              d="M93 220 Q52 235 45 195"
              stroke="#623f25"
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M45 195 Q29 174 39 151"
              stroke="#623f25"
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
            />
            {/* Hand fingers */}
            <path
              d="M38 150 Q26 134 38 121 M40 149 Q40 126 54 119 M42 151 Q55 132 66 133"
              stroke="#3dbb51"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Right Arm */}
          <path
            d="M237 220 Q278 235 285 195"
            stroke="#623f25"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />

          {/* Little Legs */}
          <path
            d="M74 292 L74 330 M256 292 L256 330"
            stroke="#623f25"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Leaf Shoes */}
          <path d="M52 326 Q74 315 96 326 L99 347 Q74 360 49 347Z" fill="#2b9c3f" />
          <path d="M234 326 Q256 315 278 326 L281 347 Q256 360 231 347Z" fill="#2b9c3f" />
        </svg>
      </div>
    </div>
  );
};
