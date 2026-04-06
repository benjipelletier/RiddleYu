'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

type GamePhase = 'ready' | 'running' | 'crashed' | 'cleared';

interface Challenge {
  prompt: string;
  options: [string, string, string];
  answer: 0 | 1 | 2;
  note: string;
  tag: string;
}

interface Obstacle {
  id: number;
  challenge: Challenge;
  x: number;
  resolved: boolean;
  chosenLane: number | null;
  outcome: 'correct' | 'wrong' | null;
}

interface GameState {
  phase: GamePhase;
  laneIndex: number;
  laneVisual: number;
  jumpY: number;
  jumpVy: number;
  obstacles: Obstacle[];
  score: number;
  streak: number;
  bestStreak: number;
  clearedCount: number;
  bannerTitle: string;
  bannerBody: string;
  bannerTone: 'gold' | 'green' | 'red' | 'cyan';
  bannerTimer: number;
}

const GAME_W = 1080;
const GAME_H = 560;
const RUNNER_X = 170;
const BASE_SPEED = 215;
const GRAVITY = 1950;
const JUMP_VELOCITY = -760;
const LANE_YS = [168, 286, 404];
const PLATFORM_W = 152;
const PLATFORM_H = 56;

const CHALLENGES: Challenge[] = [
  {
    prompt: 'The rope kept twisting tighter around the post.',
    options: ['扭', '绞', '推'],
    answer: 1,
    note: '绞 carries tighter, harsher constriction. 扭 is more rotational turning.',
    tag: 'physical tension',
  },
  {
    prompt: 'She ___ her head back to look at him.',
    options: ['扭', '绞', '折'],
    answer: 0,
    note: '扭头 is a normal bodily turn. 绞头 sounds violently wrong.',
    tag: 'body motion',
  },
  {
    prompt: 'The argument became sharper and more intense.',
    options: ['尖锐', '温和', '迟缓'],
    answer: 0,
    note: '尖锐 fits escalating verbal intensity; it cuts, not merely grows.',
    tag: 'tone',
  },
  {
    prompt: 'He had to ___ the valve to stop the leak.',
    options: ['打开', '扣', '拧'],
    answer: 2,
    note: '拧 works for turning a valve or cap; the motion is rotational and controlled.',
    tag: 'mechanical action',
  },
  {
    prompt: 'The plan is possible, but still only a maybe.',
    options: ['可能', '确定', '况且'],
    answer: 0,
    note: '可能 is possibility. 确定 is certainty, and 况且 is connective logic.',
    tag: 'modality',
  },
  {
    prompt: 'After the storm, only a small remainder was left.',
    options: ['残余', '巅峰', '综合'],
    answer: 0,
    note: '残余 is remainder or residue. The others are unrelated semantic regions.',
    tag: 'aftermath',
  },
  {
    prompt: 'He kept ___ his brain for an answer all night.',
    options: ['绞尽脑汁', '扭头', '推演'],
    answer: 0,
    note: '绞尽脑汁 is the idiomatic “wring the brain dry” image.',
    tag: 'idiom',
  },
  {
    prompt: 'The translation should interpret meaning, not just swap words.',
    options: ['翻译', '诠释', '调味'],
    answer: 1,
    note: '诠释 leans toward interpretation and unpacking, not literal transfer.',
    tag: 'interpretation',
  },
];

function createObstacles(): Obstacle[] {
  return CHALLENGES.map((challenge, index) => ({
    id: index,
    challenge,
    x: 540 + index * 340,
    resolved: false,
    chosenLane: null,
    outcome: null,
  }));
}

function createInitialState(): GameState {
  return {
    phase: 'ready',
    laneIndex: 1,
    laneVisual: 1,
    jumpY: 0,
    jumpVy: 0,
    obstacles: createObstacles(),
    score: 0,
    streak: 0,
    bestStreak: 0,
    clearedCount: 0,
    bannerTitle: 'Synonym Sprint',
    bannerBody: 'Switch lanes, jump if you want style points, and land on the word that actually fits.',
    bannerTone: 'gold',
    bannerTimer: 999,
  };
}

function toneColor(tone: GameState['bannerTone']): string {
  if (tone === 'green') return '#41d972';
  if (tone === 'red') return '#ff6b6b';
  if (tone === 'cyan') return '#41b8d9';
  return '#d9a441';
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function advanceGame(state: GameState, dt: number): GameState {
  if (state.phase !== 'running') {
    return state;
  }

  let laneVisual = state.laneVisual + (state.laneIndex - state.laneVisual) * Math.min(1, dt * 10);
  let jumpY = state.jumpY;
  let jumpVy = state.jumpVy;

  if (jumpY < 0 || jumpVy !== 0) {
    jumpVy += GRAVITY * dt;
    jumpY += jumpVy * dt;
    if (jumpY > 0) {
      jumpY = 0;
      jumpVy = 0;
    }
  }

  const speed = BASE_SPEED + state.clearedCount * 12;
  const runnerZone = RUNNER_X + 34;
  let score = state.score;
  let streak = state.streak;
  let bestStreak = state.bestStreak;
  let clearedCount = state.clearedCount;
  let phase: GamePhase = state.phase;
  let bannerTitle = state.bannerTitle;
  let bannerBody = state.bannerBody;
  let bannerTone = state.bannerTone;
  let bannerTimer = Math.max(0, state.bannerTimer - dt);

  if (bannerTimer === 0) {
    bannerTitle = '';
    bannerBody = '';
  }

  const obstacles = state.obstacles.map((obstacle) => ({ ...obstacle, x: obstacle.x - speed * dt }));

  for (const obstacle of obstacles) {
    if (obstacle.resolved) continue;
    if (obstacle.x > runnerZone) break;

    obstacle.resolved = true;
    obstacle.chosenLane = state.laneIndex;

    if (state.laneIndex === obstacle.challenge.answer) {
      obstacle.outcome = 'correct';
      clearedCount += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      const airtimeBonus = jumpY < -18 ? 35 : 0;
      score += 120 + streak * 18 + airtimeBonus;
      bannerTitle = `${obstacle.challenge.options[obstacle.challenge.answer]} holds`;
      bannerBody = airtimeBonus > 0
        ? `${obstacle.challenge.note} Jump bonus +${airtimeBonus}.`
        : obstacle.challenge.note;
      bannerTone = airtimeBonus > 0 ? 'cyan' : 'green';
      bannerTimer = 2.8;
    } else {
      obstacle.outcome = 'wrong';
      streak = 0;
      phase = 'crashed';
      bannerTitle = `${obstacle.challenge.options[state.laneIndex]} breaks`;
      bannerBody = `${obstacle.challenge.options[obstacle.challenge.answer]} was the safe platform. ${obstacle.challenge.note}`;
      bannerTone = 'red';
      bannerTimer = 999;
      break;
    }
  }

  const liveObstacles = obstacles.filter((obstacle) => obstacle.x > -240);
  if (phase === 'running' && clearedCount === CHALLENGES.length && liveObstacles.every((obstacle) => obstacle.resolved)) {
    phase = 'cleared';
    bannerTitle = 'Stage Clear';
    bannerBody = 'You made it through the distinction gauntlet. This is the exact mechanic scaled up to a full game.';
    bannerTone = 'cyan';
    bannerTimer = 999;
  }

  return {
    ...state,
    phase,
    laneVisual,
    jumpY,
    jumpVy,
    obstacles: liveObstacles,
    score,
    streak,
    bestStreak,
    clearedCount,
    bannerTitle,
    bannerBody,
    bannerTone,
    bannerTimer,
  };
}

export default function SynonymSprintDemo() {
  const [game, setGame] = useState<GameState>(createInitialState);

  const stars = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        left: (index * 83) % GAME_W,
        top: 22 + ((index * 57) % 170),
        size: 2 + (index % 3),
        alpha: 0.18 + (index % 4) * 0.12,
      })),
    []
  );

  const nextObstacle = game.obstacles.find((obstacle) => !obstacle.resolved) ?? null;
  const progress = `${game.clearedCount}/${CHALLENGES.length}`;

  const setLane = useCallback((laneIndex: number) => {
    setGame((prev) => {
      if (prev.phase !== 'running' && prev.phase !== 'ready') return prev;
      return { ...prev, laneIndex: clamp(laneIndex, 0, 2) };
    });
  }, []);

  const jump = useCallback(() => {
    setGame((prev) => {
      if (prev.phase !== 'running') return prev;
      if (prev.jumpY !== 0 || prev.jumpVy !== 0) return prev;
      return { ...prev, jumpVy: JUMP_VELOCITY };
    });
  }, []);

  const startRun = useCallback(() => {
    setGame((prev) => {
      const fresh = createInitialState();
      return {
        ...fresh,
        phase: 'running',
        bannerTitle: 'Run',
        bannerBody: 'Pick the right platform before the wrong one turns to spikes.',
        bannerTone: 'gold',
        bannerTimer: 2.2,
      };
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w' || event.key === '1') {
        event.preventDefault();
        setLane(0);
        return;
      }
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's' || event.key === '3') {
        event.preventDefault();
        setLane(2);
        return;
      }
      if (event.key === 'ArrowRight' || event.key === '2') {
        event.preventDefault();
        setLane(1);
        return;
      }
      if (event.key === ' ' || event.key.toLowerCase() === 'j') {
        event.preventDefault();
        if (game.phase === 'ready' || game.phase === 'crashed' || game.phase === 'cleared') {
          startRun();
        } else {
          jump();
        }
        return;
      }
      if (event.key === 'Enter' && (game.phase === 'ready' || game.phase === 'crashed' || game.phase === 'cleared')) {
        event.preventDefault();
        startRun();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game.phase, jump, setLane, startRun]);

  useEffect(() => {
    if (game.phase !== 'running') return;

    let frame = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      setGame((prev) => advanceGame(prev, dt));
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [game.phase]);

  const runnerY = LANE_YS[0] + (LANE_YS[2] - LANE_YS[0]) * (game.laneVisual / 2) + game.jumpY;

  return (
    <div style={s.page}>
      <style>{`
        @keyframes sprintPulse {
          0%, 100% { opacity: 0.65; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-1px); }
        }
        @keyframes sprintScan {
          from { transform: translateY(0); }
          to { transform: translateY(12px); }
        }
        @keyframes sprintBlink {
          0%, 92%, 100% { opacity: 0.22; }
          94%, 98% { opacity: 0.54; }
        }
      `}</style>

      <div style={s.topBar}>
        <div>
          <p style={s.eyebrow}>experimental route</p>
          <h1 style={s.title}><span className="zh">词语冲刺</span> / Synonym Sprint</h1>
        </div>
        <div style={s.topActions}>
          <Link href="/" style={s.backLink}>← back to map</Link>
          <button onClick={startRun} style={s.startBtn}>
            {game.phase === 'running' ? 'restart run' : 'start run'}
          </button>
        </div>
      </div>

      <div style={s.hudRow}>
        <div style={s.statCard}>
          <span style={s.statLabel}>score</span>
          <span style={s.statValue}>{game.score}</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statLabel}>streak</span>
          <span style={s.statValue}>{game.streak}</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statLabel}>progress</span>
          <span style={s.statValue}>{progress}</span>
        </div>
        <div style={{ ...s.statCard, minWidth: '220px' }}>
          <span style={s.statLabel}>current cue</span>
          <span style={{ ...s.statValue, fontSize: '13px', color: '#fff8eb' }}>
            {nextObstacle ? nextObstacle.challenge.tag : 'finish line'}
          </span>
        </div>
      </div>

      <div style={s.arcadeFrame}>
        <div style={s.world}>
          <div style={s.scanlines} />
          <div style={s.vignette} />

          {stars.map((star, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${(star.left / GAME_W) * 100}%`,
                top: `${(star.top / GAME_H) * 100}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                background: `rgba(255,248,235,${star.alpha})`,
                boxShadow: `0 0 ${star.size * 5}px rgba(217,164,65,${star.alpha * 0.6})`,
              }}
            />
          ))}

          <div style={s.mountainBack} />
          <div style={s.mountainFront} />

          {[0, 1, 2].map((lane) => (
            <div
              key={lane}
              style={{
                ...s.laneLine,
                top: `${(LANE_YS[lane] / GAME_H) * 100}%`,
              }}
            />
          ))}

          {nextObstacle && (
            <div style={s.promptCard}>
              <p style={s.promptTag}>{nextObstacle.challenge.tag}</p>
              <p style={s.promptText}>{nextObstacle.challenge.prompt}</p>
              <p style={s.promptHint}>`1 / 2 / 3` or `W / → / S` to switch lanes. `Space` to jump.</p>
            </div>
          )}

          {game.bannerTitle && (
            <div style={{ ...s.banner, borderColor: `${toneColor(game.bannerTone)}66` }}>
              <p style={{ ...s.bannerTitle, color: toneColor(game.bannerTone) }}>{game.bannerTitle}</p>
              <p style={s.bannerBody}>{game.bannerBody}</p>
            </div>
          )}

          {game.obstacles.map((obstacle) => (
            <div key={obstacle.id}>
              <div
                style={{
                  ...s.gateRail,
                  left: `${(obstacle.x / GAME_W) * 100}%`,
                  opacity: obstacle.resolved ? 0.22 : 0.9,
                }}
              />

              {obstacle.challenge.options.map((word, laneIndex) => {
                const isAnswer = laneIndex === obstacle.challenge.answer;
                const isChosen = obstacle.chosenLane === laneIndex;
                const resolved = obstacle.resolved;
                const bg = !resolved
                  ? 'rgba(10,8,6,0.78)'
                  : isAnswer
                    ? 'rgba(65,217,114,0.18)'
                    : isChosen
                      ? 'rgba(255,107,107,0.18)'
                      : 'rgba(10,8,6,0.38)';
                const border = !resolved
                  ? 'rgba(217,164,65,0.45)'
                  : isAnswer
                    ? 'rgba(65,217,114,0.8)'
                    : isChosen
                      ? 'rgba(255,107,107,0.9)'
                      : 'rgba(217,164,65,0.12)';

                return (
                  <div
                    key={`${obstacle.id}-${word}`}
                    style={{
                      ...s.platform,
                      left: `${(obstacle.x / GAME_W) * 100}%`,
                      top: `${(LANE_YS[laneIndex] / GAME_H) * 100}%`,
                      width: `${(PLATFORM_W / GAME_W) * 100}%`,
                      height: `${(PLATFORM_H / GAME_H) * 100}%`,
                      background: bg,
                      borderColor: border,
                      boxShadow: resolved && isAnswer ? '0 0 34px rgba(65,217,114,0.24)' : 'none',
                      opacity: obstacle.x < -140 ? 0 : 1,
                    }}
                  >
                    <span style={s.platformBadge}>{laneIndex + 1}</span>
                    <span className="zh" style={s.platformWord}>{word}</span>
                    {resolved && isAnswer && <span style={s.platformMark}>SAFE</span>}
                    {resolved && isChosen && !isAnswer && <span style={{ ...s.platformMark, color: '#ff6b6b' }}>FAIL</span>}
                  </div>
                );
              })}
            </div>
          ))}

          <div
            style={{
              ...s.runnerShadow,
              left: `${(RUNNER_X / GAME_W) * 100}%`,
              top: `${((LANE_YS[0] + (LANE_YS[2] - LANE_YS[0]) * (game.laneVisual / 2)) / GAME_H) * 100}%`,
            }}
          />
          <div
            style={{
              ...s.runner,
              left: `${(RUNNER_X / GAME_W) * 100}%`,
              top: `${(runnerY / GAME_H) * 100}%`,
              animation: game.phase === 'running' ? 'sprintPulse 0.38s steps(2,end) infinite' : 'none',
            }}
          >
            <div style={s.runnerBody} />
            <div style={s.runnerHead} />
            <div style={s.runnerEye} />
            <div style={s.runnerGlyph}><span className="zh">词</span></div>
          </div>

          {(game.phase === 'ready' || game.phase === 'crashed' || game.phase === 'cleared') && (
            <div style={s.overlay}>
              <div style={s.overlayCard}>
                <p style={s.overlayKicker}>
                  {game.phase === 'ready' ? 'prototype lane-runner' : game.phase === 'crashed' ? 'run over' : 'demo clear'}
                </p>
                <h2 style={s.overlayTitle}>
                  {game.phase === 'ready' && 'Choose the word or eat floor.'}
                  {game.phase === 'crashed' && 'Wrong platform.'}
                  {game.phase === 'cleared' && 'You survived the cluster.'}
                </h2>
                <p style={s.overlayBody}>
                  {game.phase === 'ready' && 'This is the mechanic in playable form: auto-run, switch lanes, jump for style, survive by choosing the word that actually fits.'}
                  {game.phase === 'crashed' && game.bannerBody}
                  {game.phase === 'cleared' && 'The full game version would chain these micro-decisions into worlds, bosses, and confusion-set campaigns.'}
                </p>
                <div style={s.controlsRow}>
                  <span style={s.controlChip}>`1` top lane</span>
                  <span style={s.controlChip}>`2` middle</span>
                  <span style={s.controlChip}>`3` bottom</span>
                  <span style={s.controlChip}>`Space` jump</span>
                </div>
                <button onClick={startRun} style={s.bigButton}>
                  {game.phase === 'ready' ? 'launch demo' : 'run again'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={s.mobilePad}>
        <button style={s.padButton} onClick={() => setLane(0)}>1</button>
        <button style={s.padButton} onClick={() => setLane(1)}>2</button>
        <button style={s.padButton} onClick={() => setLane(2)}>3</button>
        <button style={{ ...s.padButton, minWidth: '112px' }} onClick={jump}>jump</button>
      </div>

      <div style={s.footerGrid}>
        <div style={s.footerCard}>
          <p style={s.footerLabel}>why this works</p>
          <p style={s.footerText}>
            It turns synonym distinction into a pressure mechanic. You do not answer a quiz. You stay alive by reading nuance fast.
          </p>
        </div>
        <div style={s.footerCard}>
          <p style={s.footerLabel}>next obvious extension</p>
          <p style={s.footerText}>
            Pull real challenge rows from cluster data, add world map progression, and make polysemy words like <span className="zh">调</span> into boss fights.
          </p>
        </div>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: '22px 18px 28px',
    background: 'radial-gradient(circle at top, rgba(217,164,65,0.12) 0%, rgba(10,8,6,0) 36%), #0a0806',
    color: '#e8d5b0',
  },
  topBar: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: '16px',
    flexWrap: 'wrap',
    maxWidth: '1180px',
    margin: '0 auto 14px',
  },
  eyebrow: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'rgba(217,164,65,0.55)',
    marginBottom: '8px',
  },
  title: {
    fontSize: 'clamp(26px, 4vw, 48px)',
    lineHeight: 1.02,
    color: '#fff8eb',
    fontWeight: 400,
  },
  topActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backLink: {
    color: 'rgba(232,213,176,0.64)',
    textDecoration: 'none',
    border: '1px solid rgba(217,164,65,0.16)',
    padding: '10px 12px',
    borderRadius: '999px',
    background: 'rgba(10,8,6,0.44)',
  },
  startBtn: {
    background: 'linear-gradient(180deg, rgba(217,164,65,0.22) 0%, rgba(217,164,65,0.12) 100%)',
    border: '1px solid rgba(217,164,65,0.45)',
    color: '#d9a441',
    padding: '10px 14px',
    borderRadius: '999px',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  hudRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    maxWidth: '1180px',
    margin: '0 auto 14px',
  },
  statCard: {
    minWidth: '120px',
    background: 'rgba(10,8,6,0.62)',
    border: '1px solid rgba(217,164,65,0.18)',
    borderRadius: '12px',
    padding: '10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    backdropFilter: 'blur(10px)',
  },
  statLabel: {
    fontSize: '10px',
    color: 'rgba(217,164,65,0.52)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },
  statValue: {
    fontSize: '18px',
    color: '#d9a441',
  },
  arcadeFrame: {
    maxWidth: '1180px',
    margin: '0 auto',
    borderRadius: '22px',
    padding: '14px',
    border: '1px solid rgba(217,164,65,0.16)',
    background: 'linear-gradient(180deg, rgba(40,28,12,0.55) 0%, rgba(10,8,6,0.88) 100%)',
    boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
  },
  world: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1080 / 560',
    overflow: 'hidden',
    borderRadius: '16px',
    background: 'linear-gradient(180deg, #110d08 0%, #120d09 42%, #0b0907 100%)',
    border: '1px solid rgba(217,164,65,0.08)',
  },
  scanlines: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0) 1px)',
    backgroundSize: '100% 6px',
    mixBlendMode: 'screen',
    opacity: 0.22,
    animation: 'sprintScan 1.4s linear infinite',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    background: 'radial-gradient(circle at center, rgba(0,0,0,0) 44%, rgba(0,0,0,0.42) 100%)',
  },
  mountainBack: {
    position: 'absolute',
    inset: '44% 0 18% 0',
    background: 'linear-gradient(180deg, rgba(25,20,14,0) 0%, rgba(25,20,14,0.2) 100%), polygon(0 100%, 8% 68%, 15% 82%, 28% 45%, 40% 88%, 54% 58%, 63% 72%, 74% 38%, 90% 86%, 100% 62%, 100% 100%)',
    clipPath: 'polygon(0 100%, 8% 68%, 15% 82%, 28% 45%, 40% 88%, 54% 58%, 63% 72%, 74% 38%, 90% 86%, 100% 62%, 100% 100%)',
    backgroundColor: 'rgba(217,164,65,0.06)',
  },
  mountainFront: {
    position: 'absolute',
    inset: '56% 0 0 0',
    clipPath: 'polygon(0 100%, 0 62%, 10% 72%, 20% 66%, 28% 78%, 36% 70%, 48% 80%, 60% 64%, 72% 76%, 84% 66%, 100% 76%, 100% 100%)',
    background: 'linear-gradient(180deg, rgba(217,164,65,0.08) 0%, rgba(10,8,6,0.86) 100%)',
  },
  laneLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, rgba(217,164,65,0) 0%, rgba(217,164,65,0.14) 14%, rgba(217,164,65,0.24) 50%, rgba(217,164,65,0.14) 86%, rgba(217,164,65,0) 100%)',
  },
  promptCard: {
    position: 'absolute',
    top: '5.5%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'min(72%, 760px)',
    background: 'rgba(10,8,6,0.84)',
    border: '1px solid rgba(217,164,65,0.22)',
    borderRadius: '14px',
    padding: '14px 16px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
  },
  promptTag: {
    fontSize: '10px',
    color: 'rgba(217,164,65,0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
  },
  promptText: {
    fontSize: '16px',
    lineHeight: 1.45,
    color: '#fff8eb',
    marginBottom: '6px',
  },
  promptHint: {
    fontSize: '11px',
    color: 'rgba(232,213,176,0.48)',
  },
  banner: {
    position: 'absolute',
    left: '24px',
    bottom: '20px',
    maxWidth: '420px',
    background: 'rgba(10,8,6,0.82)',
    border: '1px solid rgba(217,164,65,0.22)',
    borderRadius: '14px',
    padding: '14px 16px',
    backdropFilter: 'blur(10px)',
  },
  bannerTitle: {
    fontSize: '14px',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  bannerBody: {
    fontSize: '12px',
    color: 'rgba(232,213,176,0.72)',
    lineHeight: 1.5,
  },
  gateRail: {
    position: 'absolute',
    top: '20%',
    width: '1px',
    height: '56%',
    background: 'linear-gradient(180deg, rgba(217,164,65,0.08) 0%, rgba(217,164,65,0.32) 44%, rgba(217,164,65,0.08) 100%)',
  },
  platform: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgba(217,164,65,0.3)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '6px 8px',
  },
  platformBadge: {
    position: 'absolute',
    top: '6px',
    left: '8px',
    fontSize: '10px',
    color: 'rgba(217,164,65,0.55)',
  },
  platformWord: {
    fontSize: '28px',
    color: '#fff8eb',
    lineHeight: 1,
  },
  platformMark: {
    fontSize: '10px',
    color: '#41d972',
    letterSpacing: '0.12em',
  },
  runnerShadow: {
    position: 'absolute',
    width: '5.5%',
    height: '2.1%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '999px',
    background: 'radial-gradient(circle, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 72%)',
  },
  runner: {
    position: 'absolute',
    width: '5%',
    height: '14%',
    transform: 'translate(-50%, -50%)',
  },
  runnerBody: {
    position: 'absolute',
    left: '18%',
    top: '32%',
    width: '42%',
    height: '34%',
    background: '#d9a441',
    border: '3px solid #fff2cf',
    boxShadow: '0 0 18px rgba(217,164,65,0.28)',
  },
  runnerHead: {
    position: 'absolute',
    left: '28%',
    top: '4%',
    width: '28%',
    height: '26%',
    background: '#fff2cf',
    border: '3px solid #d9a441',
  },
  runnerEye: {
    position: 'absolute',
    left: '44%',
    top: '14%',
    width: '6%',
    height: '6%',
    background: '#0a0806',
    animation: 'sprintBlink 2s linear infinite',
  },
  runnerGlyph: {
    position: 'absolute',
    right: '-8%',
    top: '18%',
    fontSize: '18px',
    color: '#fff8eb',
    textShadow: '0 0 14px rgba(217,164,65,0.45)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10,8,6,0.62)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  overlayCard: {
    width: 'min(92%, 700px)',
    background: 'rgba(10,8,6,0.92)',
    border: '1px solid rgba(217,164,65,0.25)',
    borderRadius: '18px',
    padding: '24px 24px 20px',
    textAlign: 'center',
    boxShadow: '0 20px 70px rgba(0,0,0,0.5)',
  },
  overlayKicker: {
    fontSize: '10px',
    color: 'rgba(217,164,65,0.55)',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    marginBottom: '10px',
  },
  overlayTitle: {
    fontSize: 'clamp(24px, 3.4vw, 38px)',
    lineHeight: 1.05,
    color: '#fff8eb',
    fontWeight: 400,
    marginBottom: '12px',
  },
  overlayBody: {
    fontSize: '14px',
    lineHeight: 1.65,
    color: 'rgba(232,213,176,0.72)',
    maxWidth: '620px',
    margin: '0 auto 14px',
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  controlChip: {
    padding: '8px 10px',
    borderRadius: '999px',
    border: '1px solid rgba(217,164,65,0.16)',
    background: 'rgba(217,164,65,0.06)',
    fontSize: '11px',
    color: 'rgba(232,213,176,0.66)',
  },
  bigButton: {
    background: 'linear-gradient(180deg, rgba(217,164,65,0.24) 0%, rgba(217,164,65,0.14) 100%)',
    border: '1px solid rgba(217,164,65,0.45)',
    color: '#d9a441',
    padding: '12px 18px',
    borderRadius: '999px',
    fontFamily: 'inherit',
    fontSize: '14px',
    cursor: 'pointer',
  },
  mobilePad: {
    maxWidth: '1180px',
    margin: '12px auto 0',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  padButton: {
    minWidth: '72px',
    borderRadius: '12px',
    border: '1px solid rgba(217,164,65,0.24)',
    background: 'rgba(10,8,6,0.7)',
    color: '#d9a441',
    padding: '12px 14px',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  footerGrid: {
    maxWidth: '1180px',
    margin: '16px auto 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '12px',
  },
  footerCard: {
    background: 'rgba(10,8,6,0.55)',
    border: '1px solid rgba(217,164,65,0.14)',
    borderRadius: '14px',
    padding: '14px 16px',
  },
  footerLabel: {
    fontSize: '10px',
    color: 'rgba(217,164,65,0.55)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
  },
  footerText: {
    fontSize: '13px',
    color: 'rgba(232,213,176,0.7)',
    lineHeight: 1.6,
  },
};
