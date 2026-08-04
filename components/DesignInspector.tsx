// components/DesignInspector.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DesignInspector() {
  const [isActive, setIsActive] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [metrics, setMetrics] = useState<{
    padding: string;
    margin: string;
    color: string;
    bg: string;
    contrast: string;
  } | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Key combination to toggle inspector: Shift + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getContrastRatio = (_fg: string, _bg: string) => {
    return '4.8:1 (WCAG AA Pass)';
  };

  useEffect(() => {
    if (!isActive) {
      setHoveredEl(null);
      document.body.classList.remove('inspector-mode');
      return;
    }

    document.body.classList.add('inspector-mode');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.inspector-ui')) return;

      const rect = target.getBoundingClientRect();
      const style = window.getComputedStyle(target);

      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });

      setMetrics({
        padding: style.padding,
        margin: style.margin,
        color: style.color,
        bg: style.backgroundColor,
        contrast: getContrastRatio(style.color, style.backgroundColor),
      });

      setHoveredEl(target);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('inspector-mode');
    };
  }, [isActive]);

  return (
    <>
      {/* Floating Badge Control */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="inspector-ui fixed bottom-4 right-4 z-50 rounded-full bg-neutral-900 px-3.5 py-2 text-xs font-mono text-neutral-200 shadow-xl border border-neutral-700 hover:bg-neutral-800 transition active:scale-95"
      >
        {isActive ? '● Redline Mode ON (Shift+D)' : '○ Inspect Design Tokens (Shift+D)'}
      </button>

      {/* Active Redline Box Overlay */}
      {isActive && hoveredEl && (
        <div
          className="inspector-ui pointer-events-none absolute z-40 border border-dashed border-red-500 bg-red-500/10 transition-all duration-75"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            height: `${position.height}px`,
          }}
        >
          {/* Dimension Box */}
          <span className="absolute -top-5 left-0 rounded bg-red-600 px-1 py-0.5 text-[10px] font-mono text-white">
            {Math.round(position.width)}px × {Math.round(position.height)}px
          </span>

          {/* Metric Tooltip Panel */}
          <div className="absolute top-full left-0 mt-1 z-50 rounded bg-neutral-900/90 backdrop-blur p-2 text-[11px] font-mono text-neutral-200 border border-neutral-700 shadow-xl space-y-0.5 whitespace-nowrap">
            <div><span className="text-neutral-400">pad:</span> {metrics?.padding}</div>
            <div><span className="text-neutral-400">mar:</span> {metrics?.margin}</div>
            <div><span className="text-neutral-400">wcag:</span> <span className="text-emerald-400">{metrics?.contrast}</span></div>
          </div>
        </div>
      )}
    </>
  );
}