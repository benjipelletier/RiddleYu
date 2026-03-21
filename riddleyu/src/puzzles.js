// src/puzzles.js
export const HARDCODED_PUZZLES = [
  {
    date: "2026-03-21",
    chengyu: {
      chars: ["马", "到", "成", "功"],
      pinyin: "mǎ dào chéng gōng",
      meaning: "to achieve immediate success",
    },
    story: "出自元代无名氏的杂剧。形容一到达就立刻取得成功，比喻事情顺利，一开始就取得好成绩。",
    grid: ["马", "达", "赢", "终", "到", "走", "成", "果", "力", "功", "完", "骑", "路", "胜", "至", "进"],
    characters: {
      "马": { zai: true, position: 0, claim: "这个成语描述一个过程：先有行动，然后到达，接着完成，最后取得成果。" },
      "到": { zai: true, position: 1, claim: "我表示具体的到达，到一个确切的地方。跟在我后面的字表示'变成'或'完成'，不是最终的结果本身。" },
      "成": { zai: true, position: 2, claim: "我表示'变成'或'达成'——是转变的过程。我后面的字由两个部分组成，一个代表劳动，一个代表力量。" },
      "功": { zai: true, position: 3, claim: "我由'工'和'力'组成——劳动加上力量等于成就。我不是胜利，我是靠努力获得的成果。" },
      "达": { zai: false, claim: "第二个字可以表示'到达'也可以表示'达到'——两种理解都说得通。" },
      "赢": { zai: false, claim: "最后一个字代表竞争中的胜出——比别人强才能赢。" },
      "终": { zai: false, claim: "第三个字表示一件事走到了尽头——终于结束了。" },
      "走": { zai: false, claim: "第一个字表示行走——用自己的脚一步步前进。" },
      "果": { zai: false, claim: "最后一个字是事情自然产生的结果——像果实从树上长出来一样。" },
      "力": { zai: false, claim: "第四个字单独表示力量——不需要和其他部分结合就能成为成果。" },
      "完": { zai: false, claim: "第三个字标志着结束——过程已经完毕。" },
      "骑": { zai: false, claim: "第一个字描述骑在动物身上的动作——人和动物一起移动。" },
      "路": { zai: false, claim: "这个成语的第一个字描述的是一条道路——通往目的地的路径。" },
      "胜": { zai: false, claim: "最后一个字表示赢——在竞争中胜出。" },
      "至": { zai: false, claim: "第二个字表示到达，但也可以表示'最高'或'极致'——有多重含义。" },
      "进": { zai: false, claim: "第二个字表示前进——强调的是移动的方向，而不是到达的结果。" },
    },
  },
]

export async function getPuzzleForDate(dateStr) {
  if (import.meta.env.DEV) {
    const puzzle = HARDCODED_PUZZLES.find(p => p.date === dateStr) || HARDCODED_PUZZLES[0]
    // Shuffle grid order for dev (Fisher-Yates)
    const shuffled = [...puzzle.grid]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return { ...puzzle, grid: shuffled }
  }
  // Try fetch, fall back to localStorage cache
  try {
    const res = await fetch(`/api/puzzle?date=${dateStr}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const puzzle = await res.json()
    try { localStorage.setItem(`puzzle:${dateStr}`, JSON.stringify(puzzle)) } catch {}
    return puzzle
  } catch (e) {
    // Offline / API error — try localStorage cache
    try {
      const cached = localStorage.getItem(`puzzle:${dateStr}`)
      if (cached) return JSON.parse(cached)
    } catch {}
    throw e // No cache available — let caller handle
  }
}

export function getTodayString() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' })
}
