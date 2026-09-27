import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = false }) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const iconSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20`}>
        {/* Crisp Educational OS Logo Mark */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3/5 h-3/5"
        >
          {/* Graduation Mortarboard cap top */}
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          {/* Mortarboard lower curve */}
          <path d="M4.5 9.25v5.5c0 2.2 3.36 4 7.5 4s7.5-1.8 7.5-4v-5.5" />
          {/* Smart Chip / OS circuit node */}
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <path d="M12 15.5V17" />
          {/* Graduation tassel */}
          <path d="M22 10v6" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-extrabold tracking-tight text-slate-900 leading-none text-lg">
            Tuition<span className="text-blue-600">OS</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
            Android Edition
          </span>
        </div>
      )}
    </div>
  );
};
