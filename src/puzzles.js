// Puzzle shape:
// {
//   date: "YYYY-MM-DD",
//   chengyu: ["字","字","字","字"],
//   pinyin: "...",
//   meaning: "...",
//   origin: "...",
//   riddles: [ { text: "...", hint: "..." }, x4 ],
//   grid: ["字", ...16 chars shuffled]
//   // grid contains the 4 real chars + 3 imposters per slot, all shuffled
// }

export const HARDCODED_PUZZLES = [
  {
    date: "2026-02-26",
    chengyu: ["马", "到", "成", "功"],
    pinyin: "mǎ dào chéng gōng",
    meaning: "Immediate success upon arrival — achieving your goal the moment you begin.",
    origin: "A Song dynasty phrase describing a cavalry charge so swift and decisive that victory came the instant the horses arrived.",
    riddles: [
      {
        text: "我是一种动物，力量强大，奔跑如风。我是十二生肖之一，也是古代战场上的伙伴。",
        hint: "Think: powerful animals, especially ones associated with war and speed",
      },
      {
        text: "我是一个动词，表示从某处来到这里。旅行结束时，你做了我。",
        hint: "Think: verbs meaning 'to arrive' or 'to reach a place'",
      },
      {
        text: "我表示某事变成现实，从无到有。「完」加上我，就是「完成」。",
        hint: "Think: characters meaning 'to become' or 'to accomplish' — you see me in the word 完成",
      },
      {
        text: "我与成就和胜利有关。努力之后得到了我，就是没有白费。",
        hint: "Think: characters meaning 'achievement', 'merit', or 'success'",
      },
    ],
    // 4 real chars + 3 imposters each, shuffled together (16 total)
    // Slot 0 (马): imposters 龙,虎,牛
    // Slot 1 (到): imposters 来,去,行
    // Slot 2 (成): imposters 为,变,做
    // Slot 3 (功): imposters 果,绩,效
    grid: ["龙", "来", "成", "果", "马", "为", "去", "绩", "虎", "到", "变", "行", "牛", "做", "功", "效"],
    // which slot each grid char belongs to (for game logic)
    // slotMap[i] = slot index (0-3) that grid[i] is an answer/imposter for
    slotMap: [0, 1, 2, 3, 0, 2, 1, 3, 0, 1, 2, 1, 0, 2, 3, 3],
  },
  {
    date: "2026-02-27",
    chengyu: ["一", "石", "二", "鸟"],
    pinyin: "yī shí èr niǎo",
    meaning: "Kill two birds with one stone — achieving two goals with a single action.",
    origin: "A universal idiom describing elegant efficiency, found across many cultures. In Chinese it paints a vivid image of a single thrown stone felling two birds.",
    riddles: [
      {
        text: "我是最小的数字，也是万物的起点。「第」加上我，就是第一。",
        hint: "Think: characters for small numbers, especially the number one",
      },
      {
        text: "我是一种自然界的固体，在山上和河边都能找到我。建筑和雕塑也用我。",
        hint: "Think: natural solid materials — things you might find on the ground",
      },
      {
        text: "我比一多一，比三少一。我是个数字。",
        hint: "Think: the number two and characters that sound or look similar",
      },
      {
        text: "我是一种动物，有翅膀，会飞，会唱歌。春天你常常能听到我。",
        hint: "Think: flying animals — birds and winged creatures",
      },
    ],
    grid: ["一", "石", "二", "鸟", "三", "木", "三", "鱼", "七", "土", "两", "蝶", "万", "水", "双", "虫"],
    slotMap: [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
  },
]

export async function getPuzzleForDate(dateStr) {
  if (import.meta.env.DEV) {
    return HARDCODED_PUZZLES.find(p => p.date === dateStr) || HARDCODED_PUZZLES[0]
  }
  const res = await fetch(`/api/puzzle?date=${dateStr}`)
  return res.json()
}

export function getTodayString() {
  return new Date().toISOString().slice(0, 10)
}
