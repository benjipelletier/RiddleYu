'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NOTE_NAMES } from '@jazz/lib/format';

interface PreviewItem {
  title: string;
  composer: string | null;
  style: string | null;
  homeKey: number;
  isMinor: boolean;
  targetBpm: number;
  bpmSource: string;
  timeSignature: string;
  bars: number;
}

interface PreviewResponse {
  playlistName: string | null;
  parsed: number;
  failed: { title: string; reason: string }[];
  preview: PreviewItem[];
}

interface ImportItem {
  title: string;
  composer: string | null;
  status: 'inserted' | 'skipped' | 'failed';
  reason?: string;
}

interface ImportResponse {
  playlistName: string | null;
  parsed: number;
  inserted: number;
  skipped: number;
  failed: number;
  items: ImportItem[];
}

function keyLabel(homeKey: number, isMinor: boolean) {
  return `${NOTE_NAMES[homeKey] ?? '?'}${isMinor ? 'm' : ''}`;
}

export function ImportClient() {
  const [uri, setUri] = useState('');
  const [parsing, setParsing] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [result, setResult] = useState<ImportResponse | null>(null);

  async function handleParse() {
    setError(null);
    setResult(null);
    setPreview(null);
    setParsing(true);
    try {
      const res = await fetch('/api/jazz/import', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uri, dryRun: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setPreview(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setParsing(false);
    }
  }

  async function handleImport() {
    setError(null);
    setImporting(true);
    try {
      const res = await fetch('/api/jazz/import', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uri }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setResult(json);
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setImporting(false);
    }
  }

  function reset() {
    setUri('');
    setPreview(null);
    setResult(null);
    setError(null);
  }

  return (
    <main className="library">
      <div className="import-header">
        <h1 className="import-title">Import charts</h1>
        <p className="import-sub">
          Paste an <code>irealb://</code> URI from iReal Pro. The URI can contain a single song or
          a full playlist. Duplicates (same title + composer) are skipped.
        </p>
      </div>

      <div className="import-form">
        <label className="import-label">
          <span>iReal Pro URI</span>
          <textarea
            className="import-textarea"
            placeholder="irealb://Song%20Title%3DComposer%3D..."
            value={uri}
            onChange={e => setUri(e.target.value)}
            rows={8}
            spellCheck={false}
            disabled={parsing || importing}
          />
        </label>

        <div className="import-actions">
          <button
            className="btn btn-ghost"
            onClick={handleParse}
            disabled={!uri.trim() || parsing || importing}
          >
            {parsing ? 'parsing…' : 'parse'}
          </button>
          {preview && (
            <button
              className="btn btn-primary"
              onClick={handleImport}
              disabled={preview.preview.length === 0 || importing}
            >
              {importing ? 'importing…' : `import ${preview.preview.length} ${preview.preview.length === 1 ? 'chart' : 'charts'}`}
            </button>
          )}
          {(preview || result || uri) && (
            <button className="btn btn-ghost btn-sm" onClick={reset} disabled={parsing || importing}>
              clear
            </button>
          )}
        </div>

        {error && <div className="import-error">{error}</div>}
      </div>

      {preview && !result && (
        <div className="import-section">
          <div className="import-section-head">
            <h2>Preview</h2>
            <span className="import-section-meta">
              {preview.playlistName ? `"${preview.playlistName}" · ` : ''}
              {preview.parsed} parsed
              {preview.failed.length > 0 ? ` · ${preview.failed.length} skipped` : ''}
            </span>
          </div>
          {preview.preview.length === 0 ? (
            <div className="empty">No valid songs found in this URI.</div>
          ) : (
            <table className="import-table">
              <thead>
                <tr>
                  <th>title</th>
                  <th>composer</th>
                  <th>style</th>
                  <th>key</th>
                  <th>bpm</th>
                  <th>bars</th>
                </tr>
              </thead>
              <tbody>
                {preview.preview.map((it, i) => (
                  <tr key={i}>
                    <td>{it.title}</td>
                    <td>{it.composer ?? '—'}</td>
                    <td>{it.style ?? '—'}</td>
                    <td>{keyLabel(it.homeKey, it.isMinor)}</td>
                    <td>
                      {it.targetBpm}{' '}
                      <span className="import-bpm-src">({it.bpmSource})</span>
                    </td>
                    <td>{it.bars}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {preview.failed.length > 0 && (
            <div className="import-failed">
              <strong>Skipped at parse time:</strong>
              <ul>
                {preview.failed.map((f, i) => (
                  <li key={i}>
                    {f.title} — {f.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="import-section">
          <div className="import-section-head">
            <h2>Imported</h2>
            <span className="import-section-meta">
              {result.inserted} inserted · {result.skipped} already in library · {result.failed} failed
            </span>
          </div>
          <table className="import-table">
            <thead>
              <tr>
                <th>title</th>
                <th>composer</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((it, i) => (
                <tr key={i} className={`import-row-${it.status}`}>
                  <td>{it.title}</td>
                  <td>{it.composer ?? '—'}</td>
                  <td>
                    <span className={`import-status import-status-${it.status}`}>{it.status}</span>
                    {it.reason && <span className="import-reason"> — {it.reason}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="import-after">
            <Link href="/jazz/standards" className="btn btn-ghost btn-sm">
              → back to library
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
