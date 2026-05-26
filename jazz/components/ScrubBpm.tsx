'use client';

import { useRef, useState } from 'react';

const MIN = 20;
const MAX = 400;
const PX_PER_BPM = 8; // 8px of drag = 1 BPM. Tuned to feel deliberate, not jumpy.

/**
 * Slidable-only BPM control. Drag horizontally to scrub; tap (no drag) to
 * toggle "include in this commit" at the displayed value.
 */
export function ScrubBpm({
  value,
  defaultValue,
  onChange,
  pending,
  onClear,
  onToggle,
}: {
  value: number;
  defaultValue: number;
  onChange: (v: number, becamePending: boolean) => void;
  pending: boolean;
  onClear: () => void;
  onToggle?: () => void;
}) {
  const dragRef = useRef<{ startX: number; startValue: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  function clamp(n: number) { return Math.max(MIN, Math.min(MAX, Math.round(n))); }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { startX: e.clientX, startValue: value, moved: false };
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const delta = Math.round(dx / PX_PER_BPM);
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    if (delta === 0) return;
    const next = clamp(dragRef.current.startValue + delta);
    if (next !== value) onChange(next, true);
  }
  function onPointerUp() {
    if (dragRef.current && !dragRef.current.moved) onToggle?.();
    dragRef.current = null;
    setDragging(false);
  }

  // Suppress unused-var warnings for the (now-unused) onClear/defaultValue:
  void onClear;
  void defaultValue;

  return (
    <div className={`scrub-bpm ${pending ? 'scrub-bpm-pending' : ''} ${dragging ? 'scrub-bpm-dragging' : ''}`}>
      <div
        className="scrub-bpm-handle"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        title="Drag to adjust · click to toggle pending"
      >
        <span className="scrub-bpm-num">{value}</span>
        <span className="scrub-bpm-unit">bpm</span>
      </div>
    </div>
  );
}
