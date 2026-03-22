'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { colors } from '@/styles/theme';
import type { ContentMapResponse, LineAnnotation } from '@/lib/types';
import LineList from '@/components/LineList';
import AnnotationView from '@/components/AnnotationView';

const MOBILE_BREAKPOINT = 640;

export default function ContentWorkspace() {
  const params = useParams();
  const router = useRouter();
  const hash = params.hash as string;

  const [contentData, setContentData] = useState<ContentMapResponse | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [annotations, setAnnotations] = useState<Map<number, LineAnnotation>>(new Map());
  const [annotatedLines, setAnnotatedLines] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem(`content:${hash}`);
    if (stored) {
      setContentData(JSON.parse(stored));
    } else {
      router.push('/');
    }
  }, [hash, router]);

  const handleLineClick = useCallback(
    async (lineIndex: number) => {
      setActiveLineIndex(lineIndex);
      if (isMobile) setShowAnnotation(true);
      if (annotations.has(lineIndex)) return;

      setLoading(true);
      try {
        const res = await fetch('/api/annotate-line', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contentHash: hash, lineIndex }),
        });
        if (!res.ok) throw new Error('Failed to annotate');
        const annotation: LineAnnotation = await res.json();
        setAnnotations((prev) => new Map(prev).set(lineIndex, annotation));
        setAnnotatedLines((prev) => new Set(prev).add(lineIndex));
      } catch (error) {
        console.error('Annotation error:', error);
      } finally {
        setLoading(false);
      }
    },
    [hash, annotations, isMobile],
  );

  const handleLineJump = useCallback(
    (lineIndex: number) => {
      handleLineClick(lineIndex);
    },
    [handleLineClick],
  );

  const handleBack = useCallback(() => {
    setShowAnnotation(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!contentData || activeLineIndex === null) return;
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      const threshold = 80;
      if (diff > threshold && activeLineIndex > 0) {
        handleLineClick(activeLineIndex - 1);
      } else if (diff < -threshold && activeLineIndex < contentData.lines.length - 1) {
        handleLineClick(activeLineIndex + 1);
      }
    },
    [contentData, activeLineIndex, handleLineClick],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!contentData) return;
      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const next = activeLineIndex === null ? 0 : Math.min(activeLineIndex + 1, contentData.lines.length - 1);
        handleLineClick(next);
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const prev = activeLineIndex === null ? 0 : Math.max(activeLineIndex - 1, 0);
        handleLineClick(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [contentData, activeLineIndex, handleLineClick]);

  if (!contentData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: colors.textMuted }}>
        Loading...
      </div>
    );
  }

  if (isMobile) {
    return (
      <div
        style={{ height: '100vh', background: colors.bg }}
        onTouchStart={showAnnotation ? handleTouchStart : undefined}
        onTouchEnd={showAnnotation ? handleTouchEnd : undefined}
      >
        {showAnnotation ? (
          <AnnotationView
            annotation={activeLineIndex !== null ? annotations.get(activeLineIndex) ?? null : null}
            loading={loading}
            lines={contentData.lines}
            isMobile={true}
            onLineJump={handleLineJump}
            onBack={handleBack}
          />
        ) : (
          <div style={{ padding: 16, height: '100%', overflowY: 'auto' }}>
            <LineList
              lines={contentData.lines}
              activeLineIndex={activeLineIndex}
              annotatedLines={annotatedLines}
              onLineClick={handleLineClick}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: colors.bg }}>
      <LineList
        lines={contentData.lines}
        activeLineIndex={activeLineIndex}
        annotatedLines={annotatedLines}
        onLineClick={handleLineClick}
      />
      <AnnotationView
        annotation={activeLineIndex !== null ? annotations.get(activeLineIndex) ?? null : null}
        loading={loading}
        lines={contentData.lines}
        isMobile={false}
        onLineJump={handleLineJump}
      />
    </div>
  );
}
