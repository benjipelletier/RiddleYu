'use client';

import { useRef, useState } from 'react';

const MIN = 20;
const MAX = 400;
const PX_PER_BPM = 8; // matches ScrubBpm — drag feels consistent.

/**
 * Inline slidable target-BPM editor. Drag the number to scrub. Visible
 * "revert" appears when the draft differs from the original, so you can
 * undo any change before saving.
 */
export function BpmEditor({
  value,
  setValue,
  onSave,
  onCancel,
  saving = false,
}: {
  value: number;
  setValue: (v: number) => void; // kept for parity, called on commit
  onSave: (v: number) => void;
  onCancel: () => void;
  saving?: boolean;
}) {
  // Snapshot the original at mount; drives the "revert" affordance.
  const [original] = useState(value);
  const [draft, setDraft] = useState(value);

  const dragRef = useRef<{ startX: number; startValue: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  function clamp(n: number) { return Math.max(MIN, Math.min(MAX, Math.round(n))); }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragRef.current = { startX: e.clientX, startValue: draft, moved: false };
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const delta = Math.round(dx / PX_PER_BPM);
    if (Math.abs(dx) > 3) dragRef.current.moved = true;
    if (delta === 0) return;
    setDraft(clamp(dragRef.current.startValue + delta));
  }
  function onPointerUp() {
    dragRef.current = null;
    setDragging(false);
  }

  function commit() {
    setValue(draft);
    onSave(draft);
  }

  const changed = draft !== original;

  return (
    <div className="bpm-edit">
      <div className={`scrub-bpm ${changed ? 'scrub-bpm-pending' : ''} ${dragging ? 'scrub-bpm-dragging' : ''}`}>
        <div
          className="scrub-bpm-handle"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          title="Drag to adjust"
        >
          <span className="scrub-bpm-num">{draft}</span>
          <span className="scrub-bpm-unit">bpm</span>
        </div>
      </div>
      <button className="bpm-save" disabled={saving} onClick={commit}>save</button>
      <button className="bpm-cancel" onClick={onCancel} title="cancel">×</button>
    </div>
  );
}
