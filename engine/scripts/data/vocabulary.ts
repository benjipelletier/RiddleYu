export interface VocabEntry {
  surface_form: string;
  pinyin: string;
  primary_gloss: string;
  unit_type: 'word' | 'collocation' | 'fixed_expression' | 'chengyu';
  hsk_level: number;
  registers: string[];
  complexity_tier: number;
  fields: string[];
}

export const VOCABULARY: VocabEntry[] = [
  {
    "surface_form": "阿姨",
    "pinyin": "āyí",
    "primary_gloss": "maternal aunt",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "啊",
    "pinyin": "a",
    "primary_gloss": "modal particle ending sentence, showing affirmation, approval, or consent",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture",
      "music_arts"
    ]
  },
  {
    "surface_form": "矮",
    "pinyin": "ǎi",
    "primary_gloss": "low",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爱",
    "pinyin": "ài",
    "primary_gloss": "to love",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "爱好",
    "pinyin": "àihào",
    "primary_gloss": "to like",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "安静",
    "pinyin": "ānjìng",
    "primary_gloss": "quiet",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "八",
    "pinyin": "bā",
    "primary_gloss": "eight",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "把",
    "pinyin": "bǎ",
    "primary_gloss": "to hold",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爸爸",
    "pinyin": "bàba",
    "primary_gloss": "(informal) father",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "spoken",
      "informal"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "吧",
    "pinyin": "ba",
    "primary_gloss": "(modal particle indicating polite suggestion)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "白",
    "pinyin": "bái",
    "primary_gloss": "white",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature",
      "politics_law"
    ]
  },
  {
    "surface_form": "百",
    "pinyin": "bǎi",
    "primary_gloss": "hundred",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "班",
    "pinyin": "bān",
    "primary_gloss": "team",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "work_business"
    ]
  },
  {
    "surface_form": "搬",
    "pinyin": "bān",
    "primary_gloss": "to move",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "半",
    "pinyin": "bàn",
    "primary_gloss": "half",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "办法",
    "pinyin": "bànfǎ",
    "primary_gloss": "means",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "办公室",
    "pinyin": "bàngōngshì",
    "primary_gloss": "an office",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "帮忙",
    "pinyin": "bāngmáng",
    "primary_gloss": "to help",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "帮助",
    "pinyin": "bāngzhù",
    "primary_gloss": "assistance",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "包",
    "pinyin": "bāo",
    "primary_gloss": "to cover",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "饱",
    "pinyin": "bǎo",
    "primary_gloss": "to eat till full",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "报纸",
    "pinyin": "bàozhǐ",
    "primary_gloss": "newspaper",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "杯子",
    "pinyin": "bēizi",
    "primary_gloss": "cup",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "北方",
    "pinyin": "běifāng",
    "primary_gloss": "north",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "北京",
    "pinyin": "běijīng",
    "primary_gloss": "Beijing",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "被",
    "pinyin": "bèi",
    "primary_gloss": "by (indicates passive-voice)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "本",
    "pinyin": "běn",
    "primary_gloss": "roots or stems of plants",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "鼻子",
    "pinyin": "bízi",
    "primary_gloss": "nose",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "比",
    "pinyin": "bǐ",
    "primary_gloss": "(particle used for comparison)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "history_culture"
    ]
  },
  {
    "surface_form": "比较",
    "pinyin": "bǐjiào",
    "primary_gloss": "compare",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "比赛",
    "pinyin": "bǐsài",
    "primary_gloss": "competition (sports etc)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "必须",
    "pinyin": "bìxū",
    "primary_gloss": "to have to",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "变化",
    "pinyin": "biànhuà",
    "primary_gloss": "change",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表示",
    "pinyin": "biǎoshì",
    "primary_gloss": "to express",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature",
      "music_arts"
    ]
  },
  {
    "surface_form": "表演",
    "pinyin": "biǎoyǎn",
    "primary_gloss": "play",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "别",
    "pinyin": "bié",
    "primary_gloss": "to leave",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "别人",
    "pinyin": "biérén",
    "primary_gloss": "other people",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "宾馆",
    "pinyin": "bīnguǎn",
    "primary_gloss": "guesthouse",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "冰箱",
    "pinyin": "bīngxiāng",
    "primary_gloss": "icebox",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不客气",
    "pinyin": "búkèqi",
    "primary_gloss": "you're welcome",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "不",
    "pinyin": "bù",
    "primary_gloss": "(negative prefix)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "才",
    "pinyin": "cái",
    "primary_gloss": "ability",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "菜",
    "pinyin": "cài",
    "primary_gloss": "dish (type of food)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "菜单",
    "pinyin": "càidān",
    "primary_gloss": "menu",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "参加",
    "pinyin": "cānjiā",
    "primary_gloss": "to participate",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "草",
    "pinyin": "cǎo",
    "primary_gloss": "grass",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "层",
    "pinyin": "céng",
    "primary_gloss": "layer",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "茶",
    "pinyin": "chá",
    "primary_gloss": "tea",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "差",
    "pinyin": "chà",
    "primary_gloss": "differ from",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "长",
    "pinyin": "cháng",
    "primary_gloss": "length",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "唱歌",
    "pinyin": "chànggē",
    "primary_gloss": "to sing a song",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "music_arts"
    ]
  },
  {
    "surface_form": "超市",
    "pinyin": "chāoshì",
    "primary_gloss": "supermarket",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "衬衫",
    "pinyin": "chènshān",
    "primary_gloss": "shirt",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成绩",
    "pinyin": "chéngjì",
    "primary_gloss": "achievement",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "城市",
    "pinyin": "chéngshì",
    "primary_gloss": "city",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吃",
    "pinyin": "chī",
    "primary_gloss": "to eat",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "迟到",
    "pinyin": "chídào",
    "primary_gloss": "to arrive late",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "出",
    "pinyin": "chū",
    "primary_gloss": "to go out",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "出现",
    "pinyin": "chūxiàn",
    "primary_gloss": "to appear",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "出租车",
    "pinyin": "chūzūchē",
    "primary_gloss": "taxi",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel",
      "politics_law"
    ]
  },
  {
    "surface_form": "厨房",
    "pinyin": "chúfáng",
    "primary_gloss": "kitchen",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "除了",
    "pinyin": "chúle",
    "primary_gloss": "besides",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "穿",
    "pinyin": "chuān",
    "primary_gloss": "to bore through",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "船",
    "pinyin": "chuán",
    "primary_gloss": "a boat",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "春",
    "pinyin": "chūn",
    "primary_gloss": "spring (time)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "词语",
    "pinyin": "cíyǔ",
    "primary_gloss": "word",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "次",
    "pinyin": "cì",
    "primary_gloss": "next in sequence",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "聪明",
    "pinyin": "cōngming",
    "primary_gloss": "clever",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "politics_law",
      "history_culture"
    ]
  },
  {
    "surface_form": "从",
    "pinyin": "cóng",
    "primary_gloss": "from",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "错",
    "pinyin": "cuò",
    "primary_gloss": "mistake",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打电话",
    "pinyin": "dǎdiànhuà",
    "primary_gloss": "to make a telephone call",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "打篮球",
    "pinyin": "dǎlánqiú",
    "primary_gloss": "play basketball",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打扫",
    "pinyin": "dǎsǎo",
    "primary_gloss": "to clean",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打算",
    "pinyin": "dǎsuàn",
    "primary_gloss": "to plan",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "大",
    "pinyin": "dà",
    "primary_gloss": "big",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "大家",
    "pinyin": "dàjiā",
    "primary_gloss": "authority",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "带",
    "pinyin": "dài",
    "primary_gloss": "band",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel",
      "music_arts"
    ]
  },
  {
    "surface_form": "担心",
    "pinyin": "dānxīn",
    "primary_gloss": "anxious",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "蛋糕",
    "pinyin": "dàngāo",
    "primary_gloss": "cake",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "但是",
    "pinyin": "dànshì",
    "primary_gloss": "but",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "当然",
    "pinyin": "dāngrán",
    "primary_gloss": "only natural",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "到",
    "pinyin": "dào",
    "primary_gloss": "to (a place)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地",
    "pinyin": "de",
    "primary_gloss": "-ly",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "的",
    "pinyin": "de",
    "primary_gloss": "of",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "得",
    "pinyin": "de",
    "primary_gloss": "structural particle after a verb",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "灯",
    "pinyin": "dēng",
    "primary_gloss": "lamp",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "等",
    "pinyin": "děng",
    "primary_gloss": "to wait for",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "低",
    "pinyin": "dī",
    "primary_gloss": "low",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "弟弟",
    "pinyin": "dìdi",
    "primary_gloss": "younger brother",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "地方",
    "pinyin": "dìfāng",
    "primary_gloss": "region",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地铁",
    "pinyin": "dìtiě",
    "primary_gloss": "subway",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "地图",
    "pinyin": "dìtú",
    "primary_gloss": "map",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "第一",
    "pinyin": "dìyī",
    "primary_gloss": "first",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "点",
    "pinyin": "diǎn",
    "primary_gloss": "drop (of liquid)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "电脑",
    "pinyin": "diànnǎo",
    "primary_gloss": "computer",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "电视",
    "pinyin": "diànshì",
    "primary_gloss": "television",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "电梯",
    "pinyin": "diàntī",
    "primary_gloss": "elevator",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "电影",
    "pinyin": "diànyǐng",
    "primary_gloss": "movie",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "电子邮件",
    "pinyin": "diànzǐyóujiàn",
    "primary_gloss": "electronic mail",
    "unit_type": "chengyu",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "technology",
      "politics_law"
    ]
  },
  {
    "surface_form": "东",
    "pinyin": "dōng",
    "primary_gloss": "east",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "东西",
    "pinyin": "dōngxi",
    "primary_gloss": "thing",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "冬",
    "pinyin": "dōng",
    "primary_gloss": "winter",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "懂",
    "pinyin": "dǒng",
    "primary_gloss": "to understand",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "动物",
    "pinyin": "dòngwù",
    "primary_gloss": "animal",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "都",
    "pinyin": "dōu",
    "primary_gloss": "all",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "读",
    "pinyin": "dú",
    "primary_gloss": "to read",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "短",
    "pinyin": "duǎn",
    "primary_gloss": "short or brief",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "段",
    "pinyin": "duàn",
    "primary_gloss": "paragraph",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "锻炼",
    "pinyin": "duànliàn",
    "primary_gloss": "to engage in physical exercise",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "对",
    "pinyin": "duì",
    "primary_gloss": "couple",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "对不起",
    "pinyin": "duìbuqǐ",
    "primary_gloss": "I'm sorry",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "多",
    "pinyin": "duō",
    "primary_gloss": "many",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "多么",
    "pinyin": "duōme",
    "primary_gloss": "how (wonderful etc)",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "多少",
    "pinyin": "duōshǎo",
    "primary_gloss": "number",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "饿",
    "pinyin": "è",
    "primary_gloss": "to be hungry",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "而且",
    "pinyin": "érqiě",
    "primary_gloss": "(not only) but also",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "儿子",
    "pinyin": "érzi",
    "primary_gloss": "son",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "耳朵",
    "pinyin": "ěrduo",
    "primary_gloss": "ear",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "二",
    "pinyin": "èr",
    "primary_gloss": "two",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发烧",
    "pinyin": "fāshāo",
    "primary_gloss": "have a fever",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "发现",
    "pinyin": "fāxiàn",
    "primary_gloss": "to find",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "饭馆",
    "pinyin": "fànguǎn",
    "primary_gloss": "restaurant",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "方便",
    "pinyin": "fāngbiàn",
    "primary_gloss": "convenient",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "房间",
    "pinyin": "fángjiān",
    "primary_gloss": "room",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "放",
    "pinyin": "fàng",
    "primary_gloss": "to release",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "放心",
    "pinyin": "fàngxīn",
    "primary_gloss": "to set one's mind at rest",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "非常",
    "pinyin": "fēicháng",
    "primary_gloss": "unusual",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "飞机",
    "pinyin": "fēijī",
    "primary_gloss": "airplane",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "分",
    "pinyin": "fēn",
    "primary_gloss": "to divide",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "分钟",
    "pinyin": "fēnzhōng",
    "primary_gloss": "minute",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "服务员",
    "pinyin": "fúwùyuán",
    "primary_gloss": "waiter",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "附近",
    "pinyin": "fùjìn",
    "primary_gloss": "vicinity",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "复习",
    "pinyin": "fùxí",
    "primary_gloss": "to revise",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "干净",
    "pinyin": "gānjìng",
    "primary_gloss": "clean",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "敢",
    "pinyin": "gǎn",
    "primary_gloss": "to dare",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "感冒",
    "pinyin": "gǎnmào",
    "primary_gloss": "to catch cold",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "刚才",
    "pinyin": "gāngcái",
    "primary_gloss": "just now",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "高",
    "pinyin": "gāo",
    "primary_gloss": "high",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "高兴",
    "pinyin": "gāoxìng",
    "primary_gloss": "happy",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "告诉",
    "pinyin": "gàosu",
    "primary_gloss": "to tell",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "哥哥",
    "pinyin": "gēge",
    "primary_gloss": "older brother",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "个",
    "pinyin": "gè",
    "primary_gloss": "individual",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "给",
    "pinyin": "gěi",
    "primary_gloss": "to",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "跟",
    "pinyin": "gēn",
    "primary_gloss": "heel",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "根据",
    "pinyin": "gēnjù",
    "primary_gloss": "according to",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "更",
    "pinyin": "gēng",
    "primary_gloss": "to change or replace",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公共汽车",
    "pinyin": "gōnggòngqìchē",
    "primary_gloss": "bus",
    "unit_type": "chengyu",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "公斤",
    "pinyin": "gōngjīn",
    "primary_gloss": "kilogram",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公司",
    "pinyin": "gōngsī",
    "primary_gloss": "company",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "公园",
    "pinyin": "gōngyuán",
    "primary_gloss": "public park",
    "unit_type": "word",
    "hsk_level": 1,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 1,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "工作",
    "pinyin": "gōngzuò",
    "primary_gloss": "job",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "狗",
    "pinyin": "gǒu",
    "primary_gloss": "dog",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "故事",
    "pinyin": "gùshì",
    "primary_gloss": "story",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刮风",
    "pinyin": "guāfēng",
    "primary_gloss": "to be windy",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "关",
    "pinyin": "guān",
    "primary_gloss": "to close",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "关系",
    "pinyin": "guānxì",
    "primary_gloss": "relation",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "travel"
    ]
  },
  {
    "surface_form": "关心",
    "pinyin": "guānxīn",
    "primary_gloss": "to care for sth",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "关于",
    "pinyin": "guānyú",
    "primary_gloss": "pertaining to",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贵",
    "pinyin": "guì",
    "primary_gloss": "expensive",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "国家",
    "pinyin": "guójiā",
    "primary_gloss": "country",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "果汁",
    "pinyin": "guǒzhī",
    "primary_gloss": "fruit juice",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "过去",
    "pinyin": "guòqu",
    "primary_gloss": "(in the) past",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "过",
    "pinyin": "guò",
    "primary_gloss": "(experienced action marker)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "还",
    "pinyin": "hái",
    "primary_gloss": "still",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "还是",
    "pinyin": "háishì",
    "primary_gloss": "or",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "孩子",
    "pinyin": "háizi",
    "primary_gloss": "child",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "害怕",
    "pinyin": "hàipà",
    "primary_gloss": "to be afraid",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "emotions",
      "travel"
    ]
  },
  {
    "surface_form": "汉语",
    "pinyin": "hànyǔ",
    "primary_gloss": "Chinese language",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "好",
    "pinyin": "hǎo",
    "primary_gloss": "good",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "好吃",
    "pinyin": "hǎochī",
    "primary_gloss": "tasty",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "号",
    "pinyin": "hào",
    "primary_gloss": "day of a month",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "喝",
    "pinyin": "hē",
    "primary_gloss": "to drink",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "和",
    "pinyin": "hé",
    "primary_gloss": "and",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "河",
    "pinyin": "hé",
    "primary_gloss": "river",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "黑",
    "pinyin": "hēi",
    "primary_gloss": "black",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "黑板",
    "pinyin": "hēibǎn",
    "primary_gloss": "blackboard",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "很",
    "pinyin": "hěn",
    "primary_gloss": "quite",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "红",
    "pinyin": "hóng",
    "primary_gloss": "red",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "后面",
    "pinyin": "hòumian",
    "primary_gloss": "rear",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "护照",
    "pinyin": "hùzhào",
    "primary_gloss": "passport",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "花",
    "pinyin": "huā",
    "primary_gloss": "flower",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "work_business"
    ]
  },
  {
    "surface_form": "花园",
    "pinyin": "huāyuán",
    "primary_gloss": "garden",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "画",
    "pinyin": "huà",
    "primary_gloss": "to draw",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine",
      "history_culture"
    ]
  },
  {
    "surface_form": "坏",
    "pinyin": "huài",
    "primary_gloss": "bad",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "欢迎",
    "pinyin": "huānyíng",
    "primary_gloss": "to welcome",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "环境",
    "pinyin": "huánjìng",
    "primary_gloss": "environment",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "换",
    "pinyin": "huàn",
    "primary_gloss": "change",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "黄",
    "pinyin": "huáng",
    "primary_gloss": "yellow",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "回",
    "pinyin": "huí",
    "primary_gloss": "to go back",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "回答",
    "pinyin": "huídá",
    "primary_gloss": "to reply",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "会",
    "pinyin": "huì",
    "primary_gloss": "can",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "会议",
    "pinyin": "huìyì",
    "primary_gloss": "meeting",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "火车站",
    "pinyin": "huǒchēzhàn",
    "primary_gloss": "train station",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "或者",
    "pinyin": "huòzhě",
    "primary_gloss": "or",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "机场",
    "pinyin": "jīchǎng",
    "primary_gloss": "airport",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "鸡蛋",
    "pinyin": "jīdàn",
    "primary_gloss": "(chicken) egg",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "几乎",
    "pinyin": "jīhū",
    "primary_gloss": "almost",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "机会",
    "pinyin": "jīhuì",
    "primary_gloss": "opportunity",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "极",
    "pinyin": "jí",
    "primary_gloss": "extremely",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "几",
    "pinyin": "jǐ",
    "primary_gloss": "how much",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "记得",
    "pinyin": "jìde",
    "primary_gloss": "to remember",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "季节",
    "pinyin": "jìjié",
    "primary_gloss": "time",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "家",
    "pinyin": "jiā",
    "primary_gloss": "home",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "travel"
    ]
  },
  {
    "surface_form": "检查",
    "pinyin": "jiǎnchá",
    "primary_gloss": "inspection",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "简单",
    "pinyin": "jiǎndān",
    "primary_gloss": "simple",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "件",
    "pinyin": "jiàn",
    "primary_gloss": "item",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "健康",
    "pinyin": "jiànkāng",
    "primary_gloss": "health",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "见面",
    "pinyin": "jiànmiàn",
    "primary_gloss": "to meet",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讲",
    "pinyin": "jiǎng",
    "primary_gloss": "to speak",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "教",
    "pinyin": "jiāo",
    "primary_gloss": "to teach",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "脚",
    "pinyin": "jiǎo",
    "primary_gloss": "foot",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "角",
    "pinyin": "jiǎo",
    "primary_gloss": "angle",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "叫",
    "pinyin": "jiào",
    "primary_gloss": "to shout",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "教室",
    "pinyin": "jiàoshì",
    "primary_gloss": "classroom",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "接",
    "pinyin": "jiē",
    "primary_gloss": "to receive",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "technology",
      "daily_life"
    ]
  },
  {
    "surface_form": "街道",
    "pinyin": "jiēdào",
    "primary_gloss": "street",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "结婚",
    "pinyin": "jiéhūn",
    "primary_gloss": "to marry",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "结束",
    "pinyin": "jiéshù",
    "primary_gloss": "termination",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "节目",
    "pinyin": "jiémù",
    "primary_gloss": "program",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "节日",
    "pinyin": "jiérì",
    "primary_gloss": "holiday",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "姐姐",
    "pinyin": "jiějie",
    "primary_gloss": "older sister",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "解决",
    "pinyin": "jiějué",
    "primary_gloss": "to settle (a dispute)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "借",
    "pinyin": "jiè",
    "primary_gloss": "to lend",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "介绍",
    "pinyin": "jièshào",
    "primary_gloss": "to present",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "今天",
    "pinyin": "jīntiān",
    "primary_gloss": "today",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "进",
    "pinyin": "jìn",
    "primary_gloss": "to advance",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "近",
    "pinyin": "jìn",
    "primary_gloss": "near",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经常",
    "pinyin": "jīngcháng",
    "primary_gloss": "day to day",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经过",
    "pinyin": "jīngguò",
    "primary_gloss": "to pass",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经理",
    "pinyin": "jīnglǐ",
    "primary_gloss": "manager",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "九",
    "pinyin": "jiǔ",
    "primary_gloss": "nine",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "久",
    "pinyin": "jiǔ",
    "primary_gloss": "(long) time",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "旧",
    "pinyin": "jiù",
    "primary_gloss": "old",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "就",
    "pinyin": "jiù",
    "primary_gloss": "at once",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "politics_law",
      "daily_life"
    ]
  },
  {
    "surface_form": "举行",
    "pinyin": "jǔxíng",
    "primary_gloss": "to hold (a meeting, ceremony etc)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "work_business",
      "history_culture"
    ]
  },
  {
    "surface_form": "句子",
    "pinyin": "jùzi",
    "primary_gloss": "sentence",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "觉得",
    "pinyin": "juéde",
    "primary_gloss": "to think",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "决定",
    "pinyin": "juédìng",
    "primary_gloss": "to decide",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "咖啡",
    "pinyin": "kāfēi",
    "primary_gloss": "coffee",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "开",
    "pinyin": "kāi",
    "primary_gloss": "to open",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "开始",
    "pinyin": "kāishǐ",
    "primary_gloss": "to begin",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "看",
    "pinyin": "kàn",
    "primary_gloss": "to see",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "看见",
    "pinyin": "kànjiàn",
    "primary_gloss": "to see",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "考试",
    "pinyin": "kǎoshì",
    "primary_gloss": "exam",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "渴",
    "pinyin": "kě",
    "primary_gloss": "thirsty",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可爱",
    "pinyin": "kěài",
    "primary_gloss": "amiable",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "可能",
    "pinyin": "kěnéng",
    "primary_gloss": "might (happen)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可以",
    "pinyin": "kěyǐ",
    "primary_gloss": "can",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刻",
    "pinyin": "kè",
    "primary_gloss": "quarter (hour)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel",
      "history_culture"
    ]
  },
  {
    "surface_form": "课",
    "pinyin": "kè",
    "primary_gloss": "subject",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "客人",
    "pinyin": "kèrén",
    "primary_gloss": "visitor",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "work_business"
    ]
  },
  {
    "surface_form": "空调",
    "pinyin": "kōngtiáo",
    "primary_gloss": "air conditioning",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "口",
    "pinyin": "kǒu",
    "primary_gloss": "mouth",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "哭",
    "pinyin": "kū",
    "primary_gloss": "to cry",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "裤子",
    "pinyin": "kùzi",
    "primary_gloss": "trousers",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "块",
    "pinyin": "kuài",
    "primary_gloss": "lump",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "快",
    "pinyin": "kuài",
    "primary_gloss": "rapid",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "快乐",
    "pinyin": "kuàilè",
    "primary_gloss": "happy",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "筷子",
    "pinyin": "kuàizi",
    "primary_gloss": "chopsticks",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "来",
    "pinyin": "lái",
    "primary_gloss": "to come",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蓝",
    "pinyin": "lán",
    "primary_gloss": "blue",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "老",
    "pinyin": "lǎo",
    "primary_gloss": "old (of people)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "老师",
    "pinyin": "lǎoshī",
    "primary_gloss": "teacher",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "了",
    "pinyin": "le",
    "primary_gloss": "(modal particle)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "累",
    "pinyin": "lèi",
    "primary_gloss": "tired",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "冷",
    "pinyin": "lěng",
    "primary_gloss": "cold",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "离",
    "pinyin": "lí",
    "primary_gloss": "to leave",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "离开",
    "pinyin": "líkāi",
    "primary_gloss": "to depart",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "里",
    "pinyin": "lǐ",
    "primary_gloss": "lining",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "礼物",
    "pinyin": "lǐwù",
    "primary_gloss": "gift",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "历史",
    "pinyin": "lìshǐ",
    "primary_gloss": "history",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "脸",
    "pinyin": "liǎn",
    "primary_gloss": "face",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "练习",
    "pinyin": "liànxí",
    "primary_gloss": "exercise",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "两",
    "pinyin": "liǎng",
    "primary_gloss": "both",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辆",
    "pinyin": "liàng",
    "primary_gloss": "classifier for vehicles",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "了解",
    "pinyin": "liǎojiě",
    "primary_gloss": "to understand",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "邻居",
    "pinyin": "línjū",
    "primary_gloss": "neighbor",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "零",
    "pinyin": "líng",
    "primary_gloss": "zero",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "六",
    "pinyin": "liù",
    "primary_gloss": "six",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "楼",
    "pinyin": "lóu",
    "primary_gloss": "storied building",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "路",
    "pinyin": "lù",
    "primary_gloss": "road",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "旅游",
    "pinyin": "lǚyóu",
    "primary_gloss": "trip",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "绿",
    "pinyin": "lǜ",
    "primary_gloss": "green",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "妈妈",
    "pinyin": "māma",
    "primary_gloss": "mama",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "马",
    "pinyin": "mǎ",
    "primary_gloss": "horse",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "马上",
    "pinyin": "mǎshàng",
    "primary_gloss": "at once",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "吗",
    "pinyin": "ma",
    "primary_gloss": "(question tag)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "买",
    "pinyin": "mǎi",
    "primary_gloss": "to buy",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "卖",
    "pinyin": "mài",
    "primary_gloss": "to sell",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "满意",
    "pinyin": "mǎnyì",
    "primary_gloss": "satisfied",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "慢",
    "pinyin": "màn",
    "primary_gloss": "slow",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "忙",
    "pinyin": "máng",
    "primary_gloss": "busy",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "猫",
    "pinyin": "māo",
    "primary_gloss": "cat",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "帽子",
    "pinyin": "màozi",
    "primary_gloss": "hat",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "没",
    "pinyin": "méi",
    "primary_gloss": "(negative prefix for verbs)",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "没关系",
    "pinyin": "méiguānxi",
    "primary_gloss": "it doesn't matter",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "每",
    "pinyin": "měi",
    "primary_gloss": "each",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "妹妹",
    "pinyin": "mèimei",
    "primary_gloss": "younger sister",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "门",
    "pinyin": "mén",
    "primary_gloss": "gate",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "米",
    "pinyin": "mǐ",
    "primary_gloss": "rice",
    "unit_type": "word",
    "hsk_level": 2,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 2,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "米饭",
    "pinyin": "mǐfàn",
    "primary_gloss": "(cooked) rice",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "面包",
    "pinyin": "miànbāo",
    "primary_gloss": "bread",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "面条",
    "pinyin": "miàntiáo",
    "primary_gloss": "noodles",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "明白",
    "pinyin": "míngbai",
    "primary_gloss": "clear",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "明天",
    "pinyin": "míngtiān",
    "primary_gloss": "tomorrow",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "名字",
    "pinyin": "míngzi",
    "primary_gloss": "name (of a person or thing)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "拿",
    "pinyin": "ná",
    "primary_gloss": "to hold",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "哪",
    "pinyin": "nǎ",
    "primary_gloss": "how",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "哪儿",
    "pinyin": "nǎr",
    "primary_gloss": "where?",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "那",
    "pinyin": "nà",
    "primary_gloss": "that",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "那儿",
    "pinyin": "nàr",
    "primary_gloss": "there",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "奶奶",
    "pinyin": "nǎinai",
    "primary_gloss": "paternal grandmother",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "南",
    "pinyin": "nán",
    "primary_gloss": "south",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "男人",
    "pinyin": "nánrén",
    "primary_gloss": "a man",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "难",
    "pinyin": "nán",
    "primary_gloss": "difficult",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "难过",
    "pinyin": "nánguò",
    "primary_gloss": "feel sorry",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "呢",
    "pinyin": "ne",
    "primary_gloss": "(question particle)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "能",
    "pinyin": "néng",
    "primary_gloss": "to be able to",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "你",
    "pinyin": "nǐ",
    "primary_gloss": "you (informal)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "spoken",
      "informal"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "年",
    "pinyin": "nián",
    "primary_gloss": "year",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "年级",
    "pinyin": "niánjí",
    "primary_gloss": "grade",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "年轻",
    "pinyin": "niánqīng",
    "primary_gloss": "young",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鸟",
    "pinyin": "niǎo",
    "primary_gloss": "bird",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "您",
    "pinyin": "nín",
    "primary_gloss": "you (polite)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "牛奶",
    "pinyin": "niúnǎi",
    "primary_gloss": "cow's milk",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "努力",
    "pinyin": "nǔlì",
    "primary_gloss": "great effort",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "女儿",
    "pinyin": "nǚér",
    "primary_gloss": "daughter",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "女人",
    "pinyin": "nǚrén",
    "primary_gloss": "woman",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爬山",
    "pinyin": "páshān",
    "primary_gloss": "to climb a mountain",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "盘子",
    "pinyin": "pánzi",
    "primary_gloss": "tray",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "旁边",
    "pinyin": "pángbiān",
    "primary_gloss": "lateral",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胖",
    "pinyin": "pàng",
    "primary_gloss": "fat",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "跑步",
    "pinyin": "pǎobù",
    "primary_gloss": "to walk quickly",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "朋友",
    "pinyin": "péngyou",
    "primary_gloss": "friend",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "啤酒",
    "pinyin": "píjiǔ",
    "primary_gloss": "beer",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "便宜",
    "pinyin": "piányi",
    "primary_gloss": "cheap",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "票",
    "pinyin": "piào",
    "primary_gloss": "ticket",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "漂亮",
    "pinyin": "piàoliang",
    "primary_gloss": "pretty",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "苹果",
    "pinyin": "píngguǒ",
    "primary_gloss": "apple",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "葡萄",
    "pinyin": "pútao",
    "primary_gloss": "grape",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "普通话",
    "pinyin": "pǔtōnghuà",
    "primary_gloss": "Mandarin",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "七",
    "pinyin": "qī",
    "primary_gloss": "seven",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "妻子",
    "pinyin": "qīzi",
    "primary_gloss": "wife",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "其实",
    "pinyin": "qíshí",
    "primary_gloss": "actually",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "其他",
    "pinyin": "qítā",
    "primary_gloss": "other",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "骑",
    "pinyin": "qí",
    "primary_gloss": "to ride (an animal or bike)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "起床",
    "pinyin": "qǐchuáng",
    "primary_gloss": "to get up",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "千",
    "pinyin": "qiān",
    "primary_gloss": "thousand",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "铅笔",
    "pinyin": "qiānbǐ",
    "primary_gloss": "pencil",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "钱",
    "pinyin": "qián",
    "primary_gloss": "coin",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "前面",
    "pinyin": "qiánmiàn",
    "primary_gloss": "ahead",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "清楚",
    "pinyin": "qīngchu",
    "primary_gloss": "clear",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "晴",
    "pinyin": "qíng",
    "primary_gloss": "clear",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "请",
    "pinyin": "qǐng",
    "primary_gloss": "to ask",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "秋",
    "pinyin": "qiū",
    "primary_gloss": "autumn",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "去",
    "pinyin": "qù",
    "primary_gloss": "to go",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "奇怪",
    "pinyin": "qíguài",
    "primary_gloss": "strange",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "去年",
    "pinyin": "qùnián",
    "primary_gloss": "last year",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "裙子",
    "pinyin": "qúnzi",
    "primary_gloss": "skirt",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "然后",
    "pinyin": "ránhòu",
    "primary_gloss": "after",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "让",
    "pinyin": "ràng",
    "primary_gloss": "to yield",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "热",
    "pinyin": "rè",
    "primary_gloss": "heat",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "热情",
    "pinyin": "rèqíng",
    "primary_gloss": "cordial",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "人",
    "pinyin": "rén",
    "primary_gloss": "man",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "认识",
    "pinyin": "rènshi",
    "primary_gloss": "to know",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "认为",
    "pinyin": "rènwéi",
    "primary_gloss": "to believe",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "认真",
    "pinyin": "rènzhēn",
    "primary_gloss": "conscientious",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "日",
    "pinyin": "rì",
    "primary_gloss": "sun",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "容易",
    "pinyin": "róngyì",
    "primary_gloss": "easy",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "如果",
    "pinyin": "rúguǒ",
    "primary_gloss": "if",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "三",
    "pinyin": "sān",
    "primary_gloss": "three",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "伞",
    "pinyin": "sǎn",
    "primary_gloss": "umbrella",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "商店",
    "pinyin": "shāngdiàn",
    "primary_gloss": "store",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上",
    "pinyin": "shàng",
    "primary_gloss": "on",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上班",
    "pinyin": "shàngbān",
    "primary_gloss": "to go to work",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "上网",
    "pinyin": "shàngwǎng",
    "primary_gloss": "to be on the internet",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "上午",
    "pinyin": "shàngwǔ",
    "primary_gloss": "morning",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "少",
    "pinyin": "shǎo",
    "primary_gloss": "few",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谁",
    "pinyin": "shéi",
    "primary_gloss": "who",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "身体",
    "pinyin": "shēntǐ",
    "primary_gloss": "(human) body",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "什么",
    "pinyin": "shénme",
    "primary_gloss": "what?",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "生病",
    "pinyin": "shēngbìng",
    "primary_gloss": "to fall ill",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "生气",
    "pinyin": "shēngqì",
    "primary_gloss": "angry",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "生日",
    "pinyin": "shēngrì",
    "primary_gloss": "birthday",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "声音",
    "pinyin": "shēngyīn",
    "primary_gloss": "voice",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "十",
    "pinyin": "shí",
    "primary_gloss": "ten",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "时候",
    "pinyin": "shíhou",
    "primary_gloss": "time",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "时间",
    "pinyin": "shíjiān",
    "primary_gloss": "time",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "使",
    "pinyin": "shǐ",
    "primary_gloss": "to make",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "是",
    "pinyin": "shì",
    "primary_gloss": "is",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "世界",
    "pinyin": "shìjiè",
    "primary_gloss": "world",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "事情",
    "pinyin": "shìqíng",
    "primary_gloss": "affair",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "手表",
    "pinyin": "shǒubiǎo",
    "primary_gloss": "wrist watch",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "手机",
    "pinyin": "shǒujī",
    "primary_gloss": "cell phone",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "瘦",
    "pinyin": "shòu",
    "primary_gloss": "tight",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "书",
    "pinyin": "shū",
    "primary_gloss": "book",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "舒服",
    "pinyin": "shūfu",
    "primary_gloss": "comfortable",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "叔叔",
    "pinyin": "shūshu",
    "primary_gloss": "uncle (father's younger brother)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "树",
    "pinyin": "shù",
    "primary_gloss": "tree",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "数学",
    "pinyin": "shùxué",
    "primary_gloss": "mathematics",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刷牙",
    "pinyin": "shuāyá",
    "primary_gloss": "to brush teeth",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "双",
    "pinyin": "shuāng",
    "primary_gloss": "two",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "水",
    "pinyin": "shuǐ",
    "primary_gloss": "water",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "水果",
    "pinyin": "shuǐguǒ",
    "primary_gloss": "fruit",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "水平",
    "pinyin": "shuǐpíng",
    "primary_gloss": "level",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "睡觉",
    "pinyin": "shuìjiào",
    "primary_gloss": "to go to bed",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "说话",
    "pinyin": "shuōhuà",
    "primary_gloss": "to speak",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "司机",
    "pinyin": "sījī",
    "primary_gloss": "chauffeur",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "四",
    "pinyin": "sì",
    "primary_gloss": "four",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "送",
    "pinyin": "sòng",
    "primary_gloss": "to deliver",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "虽然",
    "pinyin": "suīrán",
    "primary_gloss": "although",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "岁",
    "pinyin": "suì",
    "primary_gloss": "classifier for years (of age)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "所以",
    "pinyin": "suǒyǐ",
    "primary_gloss": "therefore",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "他",
    "pinyin": "tā",
    "primary_gloss": "he or him",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "她",
    "pinyin": "tā",
    "primary_gloss": "she",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "它",
    "pinyin": "tā",
    "primary_gloss": "it",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "太",
    "pinyin": "tài",
    "primary_gloss": "highest",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "太阳",
    "pinyin": "tàiyáng",
    "primary_gloss": "sun",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "糖",
    "pinyin": "táng",
    "primary_gloss": "sugar",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "特别",
    "pinyin": "tèbié",
    "primary_gloss": "especially",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "疼",
    "pinyin": "téng",
    "primary_gloss": "(it) hurts",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "踢足球",
    "pinyin": "tīzúqiú",
    "primary_gloss": "play soccer",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "题",
    "pinyin": "tí",
    "primary_gloss": "topic",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提高",
    "pinyin": "tígāo",
    "primary_gloss": "to raise",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "体育",
    "pinyin": "tǐyù",
    "primary_gloss": "sports",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "天气",
    "pinyin": "tiānqì",
    "primary_gloss": "weather",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "甜",
    "pinyin": "tián",
    "primary_gloss": "sweet",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "条",
    "pinyin": "tiáo",
    "primary_gloss": "strip",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "travel"
    ]
  },
  {
    "surface_form": "跳舞",
    "pinyin": "tiàowǔ",
    "primary_gloss": "to dance",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "听",
    "pinyin": "tīng",
    "primary_gloss": "to listen",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "同事",
    "pinyin": "tóngshì",
    "primary_gloss": "colleague",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "work_business"
    ]
  },
  {
    "surface_form": "同学",
    "pinyin": "tóngxué",
    "primary_gloss": "classmate",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "同意",
    "pinyin": "tóngyì",
    "primary_gloss": "to agree",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "头发",
    "pinyin": "tóufa",
    "primary_gloss": "hair (on the head)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "突然",
    "pinyin": "tūrán",
    "primary_gloss": "sudden",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "图书馆",
    "pinyin": "túshūguǎn",
    "primary_gloss": "library",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "腿",
    "pinyin": "tuǐ",
    "primary_gloss": "leg",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "外",
    "pinyin": "wài",
    "primary_gloss": "outside",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "完",
    "pinyin": "wán",
    "primary_gloss": "to finish",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "完成",
    "pinyin": "wánchéng",
    "primary_gloss": "complete",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "玩",
    "pinyin": "wán",
    "primary_gloss": "to play",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "碗",
    "pinyin": "wǎn",
    "primary_gloss": "bowl",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "晚上",
    "pinyin": "wǎnshang",
    "primary_gloss": "in the evening",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "万",
    "pinyin": "wàn",
    "primary_gloss": "ten thousand",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "忘记",
    "pinyin": "wàngjì",
    "primary_gloss": "to forget",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "喂",
    "pinyin": "wèi",
    "primary_gloss": "hello (on telephone)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "为",
    "pinyin": "wèi",
    "primary_gloss": "because of",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "为了",
    "pinyin": "wèile",
    "primary_gloss": "in order to",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "为什么",
    "pinyin": "wèishénme",
    "primary_gloss": "why?",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "位",
    "pinyin": "wèi",
    "primary_gloss": "position",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "文化",
    "pinyin": "wénhuà",
    "primary_gloss": "culture",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "问",
    "pinyin": "wèn",
    "primary_gloss": "to ask",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "问题",
    "pinyin": "wèntí",
    "primary_gloss": "question",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "我",
    "pinyin": "wǒ",
    "primary_gloss": "I",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "我们",
    "pinyin": "wǒmen",
    "primary_gloss": "we",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "五",
    "pinyin": "wǔ",
    "primary_gloss": "five",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "西",
    "pinyin": "xī",
    "primary_gloss": "west",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "西瓜",
    "pinyin": "xīguā",
    "primary_gloss": "watermelon",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "希望",
    "pinyin": "xīwàng",
    "primary_gloss": "to wish for",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "习惯",
    "pinyin": "xíguàn",
    "primary_gloss": "habit",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "洗",
    "pinyin": "xǐ",
    "primary_gloss": "to wash",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "洗手间",
    "pinyin": "xǐshǒujiān",
    "primary_gloss": "toilet",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "洗澡",
    "pinyin": "xǐzǎo",
    "primary_gloss": "to bathe",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "喜欢",
    "pinyin": "xǐhuan",
    "primary_gloss": "to like",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "下",
    "pinyin": "xià",
    "primary_gloss": "down",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "下午",
    "pinyin": "xiàwǔ",
    "primary_gloss": "afternoon",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "下雨",
    "pinyin": "xiàyǔ",
    "primary_gloss": "to rain",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "夏",
    "pinyin": "xià",
    "primary_gloss": "summer",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "先",
    "pinyin": "xiān",
    "primary_gloss": "early",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "先生",
    "pinyin": "xiānsheng",
    "primary_gloss": "teacher",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "food_cooking"
    ]
  },
  {
    "surface_form": "现在",
    "pinyin": "xiànzài",
    "primary_gloss": "now",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "香蕉",
    "pinyin": "xiāngjiāo",
    "primary_gloss": "banana",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "相同",
    "pinyin": "xiāngtóng",
    "primary_gloss": "identical",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "相信",
    "pinyin": "xiāngxìn",
    "primary_gloss": "be convinced",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "想",
    "pinyin": "xiǎng",
    "primary_gloss": "to think",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "向",
    "pinyin": "xiàng",
    "primary_gloss": "direction",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "像",
    "pinyin": "xiàng",
    "primary_gloss": "(look) like",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "小",
    "pinyin": "xiǎo",
    "primary_gloss": "small",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "小姐",
    "pinyin": "xiǎojie",
    "primary_gloss": "young lady",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "小时",
    "pinyin": "xiǎoshí",
    "primary_gloss": "hour",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "小心",
    "pinyin": "xiǎoxīn",
    "primary_gloss": "to be careful",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "笑",
    "pinyin": "xiào",
    "primary_gloss": "laugh",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "校长",
    "pinyin": "xiàozhǎng",
    "primary_gloss": "president",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "politics_law"
    ]
  },
  {
    "surface_form": "些",
    "pinyin": "xiē",
    "primary_gloss": "some",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鞋",
    "pinyin": "xié",
    "primary_gloss": "shoe",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "写",
    "pinyin": "xiě",
    "primary_gloss": "to write",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谢谢",
    "pinyin": "xièxie",
    "primary_gloss": "to thank",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "新",
    "pinyin": "xīn",
    "primary_gloss": "new",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "新闻",
    "pinyin": "xīnwén",
    "primary_gloss": "news",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "新鲜",
    "pinyin": "xīnxiān",
    "primary_gloss": "fresh (experience, food etc)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "信",
    "pinyin": "xìn",
    "primary_gloss": "letter",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "星期",
    "pinyin": "xīngqī",
    "primary_gloss": "week",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "行李箱",
    "pinyin": "xínglixiāng",
    "primary_gloss": "suitcase",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "姓",
    "pinyin": "xìng",
    "primary_gloss": "family name",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "兴趣",
    "pinyin": "xìngqu",
    "primary_gloss": "interest in (something)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "熊猫",
    "pinyin": "xióngmāo",
    "primary_gloss": "panda",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "休息",
    "pinyin": "xiūxi",
    "primary_gloss": "rest",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "需要",
    "pinyin": "xūyào",
    "primary_gloss": "to need",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "选择",
    "pinyin": "xuǎnzé",
    "primary_gloss": "to select",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "学生",
    "pinyin": "xuésheng",
    "primary_gloss": "student",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "学习",
    "pinyin": "xuéxí",
    "primary_gloss": "to learn",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "学校",
    "pinyin": "xuéxiào",
    "primary_gloss": "school",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "雪",
    "pinyin": "xuě",
    "primary_gloss": "snow",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "颜色",
    "pinyin": "yánsè",
    "primary_gloss": "color",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "眼镜",
    "pinyin": "yǎnjìng",
    "primary_gloss": "spectacles",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "眼睛",
    "pinyin": "yǎnjing",
    "primary_gloss": "eye",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "羊肉",
    "pinyin": "yángròu",
    "primary_gloss": "mutton",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "要求",
    "pinyin": "yāoqiú",
    "primary_gloss": "to request",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "药",
    "pinyin": "yào",
    "primary_gloss": "medicine",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "要",
    "pinyin": "yào",
    "primary_gloss": "important",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine",
      "work_business"
    ]
  },
  {
    "surface_form": "爷爷",
    "pinyin": "yéye",
    "primary_gloss": "paternal grandfather",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "也",
    "pinyin": "yě",
    "primary_gloss": "also",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一",
    "pinyin": "yī",
    "primary_gloss": "one",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "衣服",
    "pinyin": "yīfu",
    "primary_gloss": "clothes",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "医生",
    "pinyin": "yīshēng",
    "primary_gloss": "doctor",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "医院",
    "pinyin": "yīyuàn",
    "primary_gloss": "hospital",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "一定",
    "pinyin": "yídìng",
    "primary_gloss": "surely",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一共",
    "pinyin": "yígòng",
    "primary_gloss": "altogether",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一会儿",
    "pinyin": "yíhuìr",
    "primary_gloss": "a while",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一样",
    "pinyin": "yíyàng",
    "primary_gloss": "same",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "以后",
    "pinyin": "yǐhòu",
    "primary_gloss": "after",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "以前",
    "pinyin": "yǐqián",
    "primary_gloss": "before",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "以为",
    "pinyin": "yǐwéi",
    "primary_gloss": "to believe",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "已经",
    "pinyin": "yǐjīng",
    "primary_gloss": "already",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "椅子",
    "pinyin": "yǐzi",
    "primary_gloss": "chair",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "一般",
    "pinyin": "yìbān",
    "primary_gloss": "same",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一边",
    "pinyin": "yìbiān",
    "primary_gloss": "one side",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一起",
    "pinyin": "yìqǐ",
    "primary_gloss": "in the same place",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一直",
    "pinyin": "yìzhí",
    "primary_gloss": "straight",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "意思",
    "pinyin": "yìsi",
    "primary_gloss": "idea",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "阴",
    "pinyin": "yīn",
    "primary_gloss": "overcast (weather)",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "因为",
    "pinyin": "yīnwèi",
    "primary_gloss": "because",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "音乐",
    "pinyin": "yīnyuè",
    "primary_gloss": "music",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "银行",
    "pinyin": "yínháng",
    "primary_gloss": "bank",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "应该",
    "pinyin": "yīnggāi",
    "primary_gloss": "ought to",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "影响",
    "pinyin": "yǐngxiǎng",
    "primary_gloss": "an influence",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "用",
    "pinyin": "yòng",
    "primary_gloss": "to use",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "work_business"
    ]
  },
  {
    "surface_form": "游戏",
    "pinyin": "yóuxì",
    "primary_gloss": "game",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "游泳",
    "pinyin": "yóuyǒng",
    "primary_gloss": "swim",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "有",
    "pinyin": "yǒu",
    "primary_gloss": "to have",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "有名",
    "pinyin": "yǒumíng",
    "primary_gloss": "famous",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "又",
    "pinyin": "yòu",
    "primary_gloss": "(once) again",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "右边",
    "pinyin": "yòubian",
    "primary_gloss": "right side",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "鱼",
    "pinyin": "yú",
    "primary_gloss": "fish",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "遇到",
    "pinyin": "yùdào",
    "primary_gloss": "to meet",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "元",
    "pinyin": "yuán",
    "primary_gloss": "Chinese monetary unit",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "远",
    "pinyin": "yuǎn",
    "primary_gloss": "far",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "愿意",
    "pinyin": "yuànyì",
    "primary_gloss": "to wish",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "月",
    "pinyin": "yuè",
    "primary_gloss": "moon",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "月亮",
    "pinyin": "yuèliang",
    "primary_gloss": "moon",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "越",
    "pinyin": "yuè",
    "primary_gloss": "to exceed",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "云",
    "pinyin": "yún",
    "primary_gloss": "cloud",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "运动",
    "pinyin": "yùndòng",
    "primary_gloss": "movement",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "在",
    "pinyin": "zài",
    "primary_gloss": "(located) at",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "再",
    "pinyin": "zài",
    "primary_gloss": "again",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "再见",
    "pinyin": "zàijiàn",
    "primary_gloss": "goodbye",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "早上",
    "pinyin": "zǎoshang",
    "primary_gloss": "early morning",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "怎么",
    "pinyin": "zěnme",
    "primary_gloss": "how?",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "怎么样",
    "pinyin": "zěnmeyàng",
    "primary_gloss": "how?",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "站",
    "pinyin": "zhàn",
    "primary_gloss": "station",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel",
      "daily_life"
    ]
  },
  {
    "surface_form": "张",
    "pinyin": "zhāng",
    "primary_gloss": "to open up",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "丈夫",
    "pinyin": "zhàngfu",
    "primary_gloss": "husband",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "relationships",
      "music_arts"
    ]
  },
  {
    "surface_form": "着急",
    "pinyin": "zháojí",
    "primary_gloss": "to worry",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "找",
    "pinyin": "zhǎo",
    "primary_gloss": "to try to find",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "照顾",
    "pinyin": "zhàogu",
    "primary_gloss": "to take care of",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel",
      "music_arts"
    ]
  },
  {
    "surface_form": "照片",
    "pinyin": "zhàopiàn",
    "primary_gloss": "photo",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "照相机",
    "pinyin": "zhàoxiàngjī",
    "primary_gloss": "camera",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "这",
    "pinyin": "zhè",
    "primary_gloss": "this",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "这儿",
    "pinyin": "zhèr",
    "primary_gloss": "here",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "着",
    "pinyin": "zhe",
    "primary_gloss": "particle indicating action in progress",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "真",
    "pinyin": "zhēn",
    "primary_gloss": "really",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "正在",
    "pinyin": "zhèngzài",
    "primary_gloss": "in the process of",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "知道",
    "pinyin": "zhīdao",
    "primary_gloss": "to know",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "只",
    "pinyin": "zhǐ",
    "primary_gloss": "only",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "中国",
    "pinyin": "zhōngguó",
    "primary_gloss": "China",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "中间",
    "pinyin": "zhōngjiān",
    "primary_gloss": "between",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "中午",
    "pinyin": "zhōngwǔ",
    "primary_gloss": "noon",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "终于",
    "pinyin": "zhōngyú",
    "primary_gloss": "at last",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "种",
    "pinyin": "zhǒng",
    "primary_gloss": "seed",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "重要",
    "pinyin": "zhòngyào",
    "primary_gloss": "important",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "周末",
    "pinyin": "zhōumò",
    "primary_gloss": "weekend",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "主要",
    "pinyin": "zhǔyào",
    "primary_gloss": "main",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "住",
    "pinyin": "zhù",
    "primary_gloss": "to live",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "祝",
    "pinyin": "zhù",
    "primary_gloss": "to wish",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "注意",
    "pinyin": "zhùyì",
    "primary_gloss": "to take note of",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "准备",
    "pinyin": "zhǔnbèi",
    "primary_gloss": "preparation",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "桌子",
    "pinyin": "zhuōzi",
    "primary_gloss": "table",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "字",
    "pinyin": "zì",
    "primary_gloss": "letter",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "字典",
    "pinyin": "zìdiǎn",
    "primary_gloss": "dictionary",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "自己",
    "pinyin": "zìjǐ",
    "primary_gloss": "self",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "自行车",
    "pinyin": "zìxíngchē",
    "primary_gloss": "bicycle",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "总是",
    "pinyin": "zǒngshì",
    "primary_gloss": "always",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "走",
    "pinyin": "zǒu",
    "primary_gloss": "to walk",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "最",
    "pinyin": "zuì",
    "primary_gloss": "most",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "最近",
    "pinyin": "zuìjìn",
    "primary_gloss": "recent",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "昨天",
    "pinyin": "zuótiān",
    "primary_gloss": "yesterday",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "左边",
    "pinyin": "zuǒbian",
    "primary_gloss": "left",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坐",
    "pinyin": "zuò",
    "primary_gloss": "to sit",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "做",
    "pinyin": "zuò",
    "primary_gloss": "to do",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "作业",
    "pinyin": "zuòyè",
    "primary_gloss": "school assignment",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "作用",
    "pinyin": "zuòyòng",
    "primary_gloss": "to act on",
    "unit_type": "word",
    "hsk_level": 3,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 3,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爱情",
    "pinyin": "àiqíng",
    "primary_gloss": "romance",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "安排",
    "pinyin": "ānpái",
    "primary_gloss": "to arrange",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "安全",
    "pinyin": "ānquán",
    "primary_gloss": "safe",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "暗",
    "pinyin": "àn",
    "primary_gloss": "dark",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "按时",
    "pinyin": "ànshí",
    "primary_gloss": "on time",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "按照",
    "pinyin": "ànzhào",
    "primary_gloss": "according to",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "包括",
    "pinyin": "bāokuò",
    "primary_gloss": "to comprise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保护",
    "pinyin": "bǎohù",
    "primary_gloss": "to protect",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保证",
    "pinyin": "bǎozhèng",
    "primary_gloss": "guarantee",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抱",
    "pinyin": "bào",
    "primary_gloss": "to hold",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "抱歉",
    "pinyin": "bàoqiàn",
    "primary_gloss": "sorry",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "报道",
    "pinyin": "bàodào",
    "primary_gloss": "report",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "报名",
    "pinyin": "bàomíng",
    "primary_gloss": "to sign up",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "倍",
    "pinyin": "bèi",
    "primary_gloss": "(two, three etc) -fold",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "本来",
    "pinyin": "běnlái",
    "primary_gloss": "original",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "笨",
    "pinyin": "bèn",
    "primary_gloss": "stupid",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "笔记本",
    "pinyin": "bǐjìběn",
    "primary_gloss": "notebook",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "毕业",
    "pinyin": "bìyè",
    "primary_gloss": "graduation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "遍",
    "pinyin": "biàn",
    "primary_gloss": "a time",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "标准",
    "pinyin": "biāozhǔn",
    "primary_gloss": "(an official) standard",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law",
      "daily_life"
    ]
  },
  {
    "surface_form": "表达",
    "pinyin": "biǎodá",
    "primary_gloss": "to voice (an opinion)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表格",
    "pinyin": "biǎogé",
    "primary_gloss": "form",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表扬",
    "pinyin": "biǎoyáng",
    "primary_gloss": "to praise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "饼干",
    "pinyin": "bǐnggān",
    "primary_gloss": "biscuit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "并且",
    "pinyin": "bìngqiě",
    "primary_gloss": "and",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "博士",
    "pinyin": "bóshì",
    "primary_gloss": "doctor",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "politics_law"
    ]
  },
  {
    "surface_form": "不但",
    "pinyin": "bùdàn",
    "primary_gloss": "not only (... but also...)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不过",
    "pinyin": "bùguò",
    "primary_gloss": "only",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不得不",
    "pinyin": "bùdébù",
    "primary_gloss": "have no choice or option but to",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不管",
    "pinyin": "bùguǎn",
    "primary_gloss": "no matter (what, how)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不仅",
    "pinyin": "bùjǐn",
    "primary_gloss": "not only (this one)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "部分",
    "pinyin": "bùfèn",
    "primary_gloss": "part",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "擦",
    "pinyin": "cā",
    "primary_gloss": "to wipe",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "history_culture"
    ]
  },
  {
    "surface_form": "猜",
    "pinyin": "cāi",
    "primary_gloss": "to guess",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "材料",
    "pinyin": "cáiliào",
    "primary_gloss": "material",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology",
      "history_culture"
    ]
  },
  {
    "surface_form": "参观",
    "pinyin": "cānguān",
    "primary_gloss": "to look around",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "差不多",
    "pinyin": "chàbuduō",
    "primary_gloss": "almost",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尝",
    "pinyin": "cháng",
    "primary_gloss": "to taste",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "长城",
    "pinyin": "chángchéng",
    "primary_gloss": "the Great Wall",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "长江",
    "pinyin": "chángjiāng",
    "primary_gloss": "Changjiang river",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "场",
    "pinyin": "chǎng",
    "primary_gloss": "large place used for a specific purpose",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts",
      "daily_life"
    ]
  },
  {
    "surface_form": "超过",
    "pinyin": "chāoguò",
    "primary_gloss": "to surpass",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "吵",
    "pinyin": "chǎo",
    "primary_gloss": "to quarrel",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "成功",
    "pinyin": "chénggōng",
    "primary_gloss": "success",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成熟",
    "pinyin": "chéngshú",
    "primary_gloss": "mature",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成为",
    "pinyin": "chéngwéi",
    "primary_gloss": "to become",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "诚实",
    "pinyin": "chéngshí",
    "primary_gloss": "honest",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "乘坐",
    "pinyin": "chéngzuò",
    "primary_gloss": "to ride (in a vehicle)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吃惊",
    "pinyin": "chījīng",
    "primary_gloss": "to be startled",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "重新",
    "pinyin": "chóngxīn",
    "primary_gloss": "again",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抽烟",
    "pinyin": "chōuyān",
    "primary_gloss": "to smoke (a cigarette, tobacco)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "出差",
    "pinyin": "chūchāi",
    "primary_gloss": "to go on an official or business trip",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "出发",
    "pinyin": "chūfā",
    "primary_gloss": "to start out",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "出生",
    "pinyin": "chūshēng",
    "primary_gloss": "to be born",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "传真",
    "pinyin": "chuánzhēn",
    "primary_gloss": "fax",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "窗户",
    "pinyin": "chuānghu",
    "primary_gloss": "window",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "词典",
    "pinyin": "cídiǎn",
    "primary_gloss": "dictionary (of Chinese compound words)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "从来",
    "pinyin": "cónglái",
    "primary_gloss": "always",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "粗心",
    "pinyin": "cūxīn",
    "primary_gloss": "careless",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "答案",
    "pinyin": "dáàn",
    "primary_gloss": "answer",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打扮",
    "pinyin": "dǎban",
    "primary_gloss": "to decorate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts",
      "daily_life"
    ]
  },
  {
    "surface_form": "打扰",
    "pinyin": "dǎrǎo",
    "primary_gloss": "to disturb",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打印",
    "pinyin": "dǎyìn",
    "primary_gloss": "to print",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "technology"
    ]
  },
  {
    "surface_form": "打折",
    "pinyin": "dǎzhé",
    "primary_gloss": "to give a discount",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打针",
    "pinyin": "dǎzhēn",
    "primary_gloss": "to give or have an injection",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "大概",
    "pinyin": "dàgài",
    "primary_gloss": "roughly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "大使馆",
    "pinyin": "dàshǐguǎn",
    "primary_gloss": "embassy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "大约",
    "pinyin": "dàyuē",
    "primary_gloss": "approximately",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "戴",
    "pinyin": "dài",
    "primary_gloss": "to put on or wear (glasses, hat, gloves etc)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "relationships"
    ]
  },
  {
    "surface_form": "代表",
    "pinyin": "dàibiǎo",
    "primary_gloss": "representative",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "代替",
    "pinyin": "dàitì",
    "primary_gloss": "instead",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "大夫",
    "pinyin": "dàifu",
    "primary_gloss": "doctor",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "politics_law"
    ]
  },
  {
    "surface_form": "当",
    "pinyin": "dāng",
    "primary_gloss": "to be",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "当地",
    "pinyin": "dāngdì",
    "primary_gloss": "local",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "当时",
    "pinyin": "dāngshí",
    "primary_gloss": "then",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刀",
    "pinyin": "dāo",
    "primary_gloss": "knife",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "导游",
    "pinyin": "dǎoyóu",
    "primary_gloss": "tour guide",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "到处",
    "pinyin": "dàochù",
    "primary_gloss": "in all places",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "到底",
    "pinyin": "dàodǐ",
    "primary_gloss": "finally",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "道歉",
    "pinyin": "dàoqiàn",
    "primary_gloss": "to apologize",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "得意",
    "pinyin": "déyì",
    "primary_gloss": "proud of oneself",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "底",
    "pinyin": "dǐ",
    "primary_gloss": "background",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地球",
    "pinyin": "dìqiú",
    "primary_gloss": "the Earth",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "地址",
    "pinyin": "dìzhǐ",
    "primary_gloss": "address",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "掉",
    "pinyin": "diào",
    "primary_gloss": "to fall",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "food_cooking"
    ]
  },
  {
    "surface_form": "调查",
    "pinyin": "diàochá",
    "primary_gloss": "investigation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "丢",
    "pinyin": "diū",
    "primary_gloss": "to lose",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "动作",
    "pinyin": "dòngzuò",
    "primary_gloss": "movement",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "堵车",
    "pinyin": "dǔchē",
    "primary_gloss": "traffic jam",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "肚子",
    "pinyin": "dùzi",
    "primary_gloss": "belly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "断",
    "pinyin": "duàn",
    "primary_gloss": "to break",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "对话",
    "pinyin": "duìhuà",
    "primary_gloss": "dialog",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "对面",
    "pinyin": "duìmiàn",
    "primary_gloss": "opposite",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "顿",
    "pinyin": "dùn",
    "primary_gloss": "stop",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "朵",
    "pinyin": "duǒ",
    "primary_gloss": "flower",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "而",
    "pinyin": "ér",
    "primary_gloss": "and",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "儿童",
    "pinyin": "értóng",
    "primary_gloss": "child",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "发",
    "pinyin": "fā",
    "primary_gloss": "to send out",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "music_arts"
    ]
  },
  {
    "surface_form": "发生",
    "pinyin": "fāshēng",
    "primary_gloss": "to happen",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发展",
    "pinyin": "fāzhǎn",
    "primary_gloss": "development",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "法律",
    "pinyin": "fǎlǜ",
    "primary_gloss": "law",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "翻译",
    "pinyin": "fānyì",
    "primary_gloss": "to translate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "烦恼",
    "pinyin": "fánnǎo",
    "primary_gloss": "agonize",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "反对",
    "pinyin": "fǎnduì",
    "primary_gloss": "to fight against",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "反应",
    "pinyin": "fǎnyìng",
    "primary_gloss": "to mirror",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "范围",
    "pinyin": "fànwéi",
    "primary_gloss": "range",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "方法",
    "pinyin": "fāngfǎ",
    "primary_gloss": "method",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "方面",
    "pinyin": "fāngmiàn",
    "primary_gloss": "respect",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "方向",
    "pinyin": "fāngxiàng",
    "primary_gloss": "direction",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "访问",
    "pinyin": "fǎngwèn",
    "primary_gloss": "to visit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "放弃",
    "pinyin": "fàngqì",
    "primary_gloss": "to renounce",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "放暑假",
    "pinyin": "fàngshǔjià",
    "primary_gloss": "take summer vacation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "…分之…",
    "pinyin": "fēnzhī",
    "primary_gloss": "used for fractions and percentages, e.g. 四分之一 is 1/4 and 百分之一 is 1%",
    "unit_type": "chengyu",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "份",
    "pinyin": "fèn",
    "primary_gloss": "part",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "丰富",
    "pinyin": "fēngfù",
    "primary_gloss": "rich",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "风景",
    "pinyin": "fēngjǐng",
    "primary_gloss": "scenery",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "否则",
    "pinyin": "fǒuzé",
    "primary_gloss": "if not",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "符合",
    "pinyin": "fúhé",
    "primary_gloss": "in keeping with",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "富",
    "pinyin": "fù",
    "primary_gloss": "rich",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "父亲",
    "pinyin": "fùqīn",
    "primary_gloss": "father",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "health_medicine"
    ]
  },
  {
    "surface_form": "复印",
    "pinyin": "fùyìn",
    "primary_gloss": "to photocopy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "复杂",
    "pinyin": "fùzá",
    "primary_gloss": "complicated",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "负责",
    "pinyin": "fùzé",
    "primary_gloss": "to be in charge of",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "改变",
    "pinyin": "gǎibiàn",
    "primary_gloss": "to change",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "干杯",
    "pinyin": "gānbēi",
    "primary_gloss": "to drink a toast",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "music_arts"
    ]
  },
  {
    "surface_form": "干燥",
    "pinyin": "gānzào",
    "primary_gloss": "to dry (of weather, paint, cement etc)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "感动",
    "pinyin": "gǎndòng",
    "primary_gloss": "to move (sb)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "感觉",
    "pinyin": "gǎnjué",
    "primary_gloss": "to feel",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "感情",
    "pinyin": "gǎnqíng",
    "primary_gloss": "feeling",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "感谢",
    "pinyin": "gǎnxiè",
    "primary_gloss": "(express) thanks",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "干",
    "pinyin": "gān",
    "primary_gloss": "to work",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "刚刚",
    "pinyin": "gānggang",
    "primary_gloss": "just recently",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "高级",
    "pinyin": "gāojí",
    "primary_gloss": "high level",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "各",
    "pinyin": "gè",
    "primary_gloss": "each",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "个子",
    "pinyin": "gèzi",
    "primary_gloss": "height",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公里",
    "pinyin": "gōnglǐ",
    "primary_gloss": "kilometer",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "工具",
    "pinyin": "gōngjù",
    "primary_gloss": "tool",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "工资",
    "pinyin": "gōngzī",
    "primary_gloss": "wages",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "共同",
    "pinyin": "gòngtóng",
    "primary_gloss": "common",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "够",
    "pinyin": "gòu",
    "primary_gloss": "to reach",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "购物",
    "pinyin": "gòuwù",
    "primary_gloss": "shopping",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "孤单",
    "pinyin": "gūdān",
    "primary_gloss": "lone",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "估计",
    "pinyin": "gūjì",
    "primary_gloss": "to estimate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鼓励",
    "pinyin": "gǔlì",
    "primary_gloss": "to encourage",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鼓掌",
    "pinyin": "gǔzhǎng",
    "primary_gloss": "to applaud",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "顾客",
    "pinyin": "gùkè",
    "primary_gloss": "client",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "history_culture"
    ]
  },
  {
    "surface_form": "故意",
    "pinyin": "gùyì",
    "primary_gloss": "deliberately",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "挂",
    "pinyin": "guà",
    "primary_gloss": "to hang or suspend (from a hook etc)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "关键",
    "pinyin": "guānjiàn",
    "primary_gloss": "crucial point",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "观众",
    "pinyin": "guānzhòng",
    "primary_gloss": "spectators",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "管理",
    "pinyin": "guǎnlǐ",
    "primary_gloss": "to supervise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "politics_law"
    ]
  },
  {
    "surface_form": "光",
    "pinyin": "guāng",
    "primary_gloss": "light",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "广播",
    "pinyin": "guǎngbō",
    "primary_gloss": "broadcast",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "daily_life"
    ]
  },
  {
    "surface_form": "广告",
    "pinyin": "guǎnggào",
    "primary_gloss": "to advertise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "逛",
    "pinyin": "guàng",
    "primary_gloss": "to stroll",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "规定",
    "pinyin": "guīdìng",
    "primary_gloss": "provision",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "国际",
    "pinyin": "guójì",
    "primary_gloss": "international",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "果然",
    "pinyin": "guǒrán",
    "primary_gloss": "really",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "过程",
    "pinyin": "guòchéng",
    "primary_gloss": "course of events",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "海洋",
    "pinyin": "hǎiyáng",
    "primary_gloss": "ocean",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "害羞",
    "pinyin": "hàixiū",
    "primary_gloss": "blush",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "寒假",
    "pinyin": "hánjià",
    "primary_gloss": "winter vacation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "汗",
    "pinyin": "hàn",
    "primary_gloss": "perspiration",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "history_culture"
    ]
  },
  {
    "surface_form": "航班",
    "pinyin": "hángbān",
    "primary_gloss": "scheduled flight",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "好处",
    "pinyin": "hǎochu",
    "primary_gloss": "benefit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "好像",
    "pinyin": "hǎoxiàng",
    "primary_gloss": "as if",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "号码",
    "pinyin": "hàomǎ",
    "primary_gloss": "number",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "合格",
    "pinyin": "hégé",
    "primary_gloss": "qualified",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "politics_law"
    ]
  },
  {
    "surface_form": "合适",
    "pinyin": "héshì",
    "primary_gloss": "suitable",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "盒子",
    "pinyin": "hézi",
    "primary_gloss": "case",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "猴子",
    "pinyin": "hóuzi",
    "primary_gloss": "monkey",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "厚",
    "pinyin": "hòu",
    "primary_gloss": "thick",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "后悔",
    "pinyin": "hòuhuǐ",
    "primary_gloss": "to regret",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "后来",
    "pinyin": "hòulái",
    "primary_gloss": "afterwards",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "忽然",
    "pinyin": "hūrán",
    "primary_gloss": "suddenly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "护士",
    "pinyin": "hùshi",
    "primary_gloss": "nurse",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "互相",
    "pinyin": "hùxiāng",
    "primary_gloss": "each other",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "怀疑",
    "pinyin": "huáiyí",
    "primary_gloss": "to doubt",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "回忆",
    "pinyin": "huíyì",
    "primary_gloss": "to recall",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "活动",
    "pinyin": "huódòng",
    "primary_gloss": "to exercise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "music_arts"
    ]
  },
  {
    "surface_form": "活泼",
    "pinyin": "huópo",
    "primary_gloss": "lively",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "火",
    "pinyin": "huǒ",
    "primary_gloss": "fire",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "获得",
    "pinyin": "huòdé",
    "primary_gloss": "to obtain",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "基础",
    "pinyin": "jīchǔ",
    "primary_gloss": "base",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "激动",
    "pinyin": "jīdòng",
    "primary_gloss": "to excite",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "积极",
    "pinyin": "jījí",
    "primary_gloss": "active",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "积累",
    "pinyin": "jīlěi",
    "primary_gloss": "to accumulate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "极其",
    "pinyin": "jíqí",
    "primary_gloss": "extremely",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "集合",
    "pinyin": "jíhé",
    "primary_gloss": "a congregation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "及时",
    "pinyin": "jíshí",
    "primary_gloss": "in time",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "即使",
    "pinyin": "jíshǐ",
    "primary_gloss": "even if",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "寄",
    "pinyin": "jì",
    "primary_gloss": "to live (in a house)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "记者",
    "pinyin": "jìzhě",
    "primary_gloss": "reporter",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "计划",
    "pinyin": "jìhuà",
    "primary_gloss": "plan",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "既然",
    "pinyin": "jìrán",
    "primary_gloss": "since",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "技术",
    "pinyin": "jìshù",
    "primary_gloss": "technology",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "technology"
    ]
  },
  {
    "surface_form": "继续",
    "pinyin": "jìxù",
    "primary_gloss": "to continue",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "家具",
    "pinyin": "jiājù",
    "primary_gloss": "furniture",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "加班",
    "pinyin": "jiābān",
    "primary_gloss": "to work overtime",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "加油站",
    "pinyin": "jiāyóuzhàn",
    "primary_gloss": "gas station",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "假",
    "pinyin": "jiǎ",
    "primary_gloss": "fake",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology",
      "history_culture"
    ]
  },
  {
    "surface_form": "价格",
    "pinyin": "jiàgé",
    "primary_gloss": "price",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "work_business"
    ]
  },
  {
    "surface_form": "坚持",
    "pinyin": "jiānchí",
    "primary_gloss": "to continue upholding",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "减肥",
    "pinyin": "jiǎnféi",
    "primary_gloss": "to lose weight",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "减少",
    "pinyin": "jiǎnshǎo",
    "primary_gloss": "to lessen",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "将来",
    "pinyin": "jiānglái",
    "primary_gloss": "in the future",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "奖金",
    "pinyin": "jiǎngjīn",
    "primary_gloss": "premium",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "降低",
    "pinyin": "jiàngdī",
    "primary_gloss": "to reduce",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "交",
    "pinyin": "jiāo",
    "primary_gloss": "to hand over",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "work_business"
    ]
  },
  {
    "surface_form": "交流",
    "pinyin": "jiāoliú",
    "primary_gloss": "exchange",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "交通",
    "pinyin": "jiāotōng",
    "primary_gloss": "to be connected",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "nature"
    ]
  },
  {
    "surface_form": "骄傲",
    "pinyin": "jiāoào",
    "primary_gloss": "arrogant",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "饺子",
    "pinyin": "jiǎozi",
    "primary_gloss": "dumpling",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "教授",
    "pinyin": "jiàoshòu",
    "primary_gloss": "professor",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "教育",
    "pinyin": "jiàoyù",
    "primary_gloss": "to educate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "接受",
    "pinyin": "jiēshòu",
    "primary_gloss": "to accept",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "结果",
    "pinyin": "jiēguǒ",
    "primary_gloss": "to bear fruit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "节约",
    "pinyin": "jiéyuē",
    "primary_gloss": "to economize",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "work_business"
    ]
  },
  {
    "surface_form": "解释",
    "pinyin": "jiěshì",
    "primary_gloss": "explanation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "尽管",
    "pinyin": "jǐnguǎn",
    "primary_gloss": "despite",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "紧张",
    "pinyin": "jǐnzhāng",
    "primary_gloss": "nervous",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "nature"
    ]
  },
  {
    "surface_form": "进行",
    "pinyin": "jìnxíng",
    "primary_gloss": "to advance",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "禁止",
    "pinyin": "jìnzhǐ",
    "primary_gloss": "to prohibit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "精彩",
    "pinyin": "jīngcǎi",
    "primary_gloss": "brilliant",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "精神",
    "pinyin": "jīngshén",
    "primary_gloss": "spirit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经济",
    "pinyin": "jīngjì",
    "primary_gloss": "economy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "经历",
    "pinyin": "jīnglì",
    "primary_gloss": "experience",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经验",
    "pinyin": "jīngyàn",
    "primary_gloss": "to experience",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "京剧",
    "pinyin": "jīngjù",
    "primary_gloss": "Beijing opera",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "警察",
    "pinyin": "jǐngchá",
    "primary_gloss": "police",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "竟然",
    "pinyin": "jìngrán",
    "primary_gloss": "unexpectedly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "竞争",
    "pinyin": "jìngzhēng",
    "primary_gloss": "to compete",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "镜子",
    "pinyin": "jìngzi",
    "primary_gloss": "mirror",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "究竟",
    "pinyin": "jiūjìng",
    "primary_gloss": "after all (when all is said and done)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "举办",
    "pinyin": "jǔbàn",
    "primary_gloss": "to conduct",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "拒绝",
    "pinyin": "jùjué",
    "primary_gloss": "to refuse",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "距离",
    "pinyin": "jùlí",
    "primary_gloss": "distance",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "开玩笑",
    "pinyin": "kāiwánxiào",
    "primary_gloss": "to play a joke",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "看法",
    "pinyin": "kànfǎ",
    "primary_gloss": "way of looking at a thing",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "history_culture"
    ]
  },
  {
    "surface_form": "考虑",
    "pinyin": "kǎolǜ",
    "primary_gloss": "to think over",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "棵",
    "pinyin": "kē",
    "primary_gloss": "classifier for trees, cabbages, plants etc",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "科学",
    "pinyin": "kēxué",
    "primary_gloss": "science",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "咳嗽",
    "pinyin": "késou",
    "primary_gloss": "to cough",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可怜",
    "pinyin": "kělián",
    "primary_gloss": "pitiful",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "可是",
    "pinyin": "kěshì",
    "primary_gloss": "but",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可惜",
    "pinyin": "kěxī",
    "primary_gloss": "it is a pity",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "肯定",
    "pinyin": "kěndìng",
    "primary_gloss": "to be sure",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "空气",
    "pinyin": "kōngqì",
    "primary_gloss": "air",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "恐怕",
    "pinyin": "kǒngpà",
    "primary_gloss": "fear",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "苦",
    "pinyin": "kǔ",
    "primary_gloss": "bitter",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "宽",
    "pinyin": "kuān",
    "primary_gloss": "lenient",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "困",
    "pinyin": "kùn",
    "primary_gloss": "to trap",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "困难",
    "pinyin": "kùnnan",
    "primary_gloss": "(financial etc) difficulty",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "扩大",
    "pinyin": "kuòdà",
    "primary_gloss": "to expand",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "拉",
    "pinyin": "lā",
    "primary_gloss": "to pull",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "垃圾桶",
    "pinyin": "lājītǒng",
    "primary_gloss": "rubbish bin",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辣",
    "pinyin": "là",
    "primary_gloss": "hot (spicy)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "来不及",
    "pinyin": "láibují",
    "primary_gloss": "there's not enough time (to do sth)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "来得及",
    "pinyin": "láidejí",
    "primary_gloss": "there's still time",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "懒",
    "pinyin": "lǎn",
    "primary_gloss": "lazy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浪费",
    "pinyin": "làngfèi",
    "primary_gloss": "to waste",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浪漫",
    "pinyin": "làngmàn",
    "primary_gloss": "romantic",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "老虎",
    "pinyin": "lǎohǔ",
    "primary_gloss": "tiger",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "冷静",
    "pinyin": "lěngjìng",
    "primary_gloss": "calm",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "理发",
    "pinyin": "lǐfà",
    "primary_gloss": "a barber",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "music_arts"
    ]
  },
  {
    "surface_form": "理解",
    "pinyin": "lǐjiě",
    "primary_gloss": "to comprehend",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "理想",
    "pinyin": "lǐxiǎng",
    "primary_gloss": "a dream",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "礼貌",
    "pinyin": "lǐmào",
    "primary_gloss": "courtesy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "厉害",
    "pinyin": "lìhai",
    "primary_gloss": "difficult to deal with",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "力气",
    "pinyin": "lìqi",
    "primary_gloss": "strength",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "例如",
    "pinyin": "lìrú",
    "primary_gloss": "for example",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "俩",
    "pinyin": "liǎ",
    "primary_gloss": "two (colloquial equivalent of 兩個",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "spoken",
      "informal"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "连",
    "pinyin": "lián",
    "primary_gloss": "to link",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "联系",
    "pinyin": "liánxì",
    "primary_gloss": "connection",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "凉快",
    "pinyin": "liángkuai",
    "primary_gloss": "nice and cold",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亮",
    "pinyin": "liàng",
    "primary_gloss": "bright",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "politics_law"
    ]
  },
  {
    "surface_form": "聊天",
    "pinyin": "liáotiān",
    "primary_gloss": "to chat",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "另外",
    "pinyin": "lìngwài",
    "primary_gloss": "additional",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "留",
    "pinyin": "liú",
    "primary_gloss": "to leave (eg a message)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "留学",
    "pinyin": "liúxué",
    "primary_gloss": "to study abroad",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "daily_life"
    ]
  },
  {
    "surface_form": "流泪",
    "pinyin": "liúlèi",
    "primary_gloss": "to shed tears",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "流利",
    "pinyin": "liúlì",
    "primary_gloss": "fluent",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "流行",
    "pinyin": "liúxíng",
    "primary_gloss": "to spread",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "乱",
    "pinyin": "luàn",
    "primary_gloss": "in confusion or disorder",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "律师",
    "pinyin": "lǜshī",
    "primary_gloss": "lawyer",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "麻烦",
    "pinyin": "máfan",
    "primary_gloss": "inconvenient",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "马虎",
    "pinyin": "mǎhu",
    "primary_gloss": "careless",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "满",
    "pinyin": "mǎn",
    "primary_gloss": "full",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "毛巾",
    "pinyin": "máojīn",
    "primary_gloss": "towel",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "美丽",
    "pinyin": "měilì",
    "primary_gloss": "beautiful",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "梦",
    "pinyin": "mèng",
    "primary_gloss": "dream",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "密码",
    "pinyin": "mìmǎ",
    "primary_gloss": "code",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "免费",
    "pinyin": "miǎnfèi",
    "primary_gloss": "free (of charge)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "民族",
    "pinyin": "mínzú",
    "primary_gloss": "nationality",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "母亲",
    "pinyin": "mǔqīn",
    "primary_gloss": "mother",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "目的",
    "pinyin": "mùdì",
    "primary_gloss": "purpose",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "耐心",
    "pinyin": "nàixīn",
    "primary_gloss": "patient (adjective)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "难道",
    "pinyin": "nándào",
    "primary_gloss": "don't tell me ...",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "难受",
    "pinyin": "nánshòu",
    "primary_gloss": "to feel unwell",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "内",
    "pinyin": "nèi",
    "primary_gloss": "inside",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "内容",
    "pinyin": "nèiróng",
    "primary_gloss": "content",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "能力",
    "pinyin": "nénglì",
    "primary_gloss": "capability",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "年龄",
    "pinyin": "niánlíng",
    "primary_gloss": "(a person's) age",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "农村",
    "pinyin": "nóngcūn",
    "primary_gloss": "rural area",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "弄",
    "pinyin": "nòng",
    "primary_gloss": "to do",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "暖和",
    "pinyin": "nuǎnhuo",
    "primary_gloss": "warm",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "偶尔",
    "pinyin": "ǒuěr",
    "primary_gloss": "occasionally",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "排列",
    "pinyin": "páiliè",
    "primary_gloss": "array",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "判断",
    "pinyin": "pànduàn",
    "primary_gloss": "to decide",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "陪",
    "pinyin": "péi",
    "primary_gloss": "to accompany",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "批评",
    "pinyin": "pīpíng",
    "primary_gloss": "to criticize",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "皮肤",
    "pinyin": "pífū",
    "primary_gloss": "skin",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "脾气",
    "pinyin": "píqì",
    "primary_gloss": "temperament",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "篇",
    "pinyin": "piān",
    "primary_gloss": "sheet",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "骗",
    "pinyin": "piàn",
    "primary_gloss": "to cheat",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "乒乓球",
    "pinyin": "pīngpāngqiú",
    "primary_gloss": "table tennis",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平时",
    "pinyin": "píngshí",
    "primary_gloss": "in normal times",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "瓶子",
    "pinyin": "píngzi",
    "primary_gloss": "bottle",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "破",
    "pinyin": "pò",
    "primary_gloss": "broken",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "普遍",
    "pinyin": "pǔbiàn",
    "primary_gloss": "universal",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "其次",
    "pinyin": "qícì",
    "primary_gloss": "next",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "其中",
    "pinyin": "qízhōng",
    "primary_gloss": "among",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "起飞",
    "pinyin": "qǐfēi",
    "primary_gloss": "to take off (in an airplane)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "起来",
    "pinyin": "qǐlai",
    "primary_gloss": "beginning or continuing an action",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "气候",
    "pinyin": "qìhòu",
    "primary_gloss": "climate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "千万",
    "pinyin": "qiānwàn",
    "primary_gloss": "ten million",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "签证",
    "pinyin": "qiānzhèng",
    "primary_gloss": "visa",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "墙",
    "pinyin": "qiáng",
    "primary_gloss": "wall",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "敲",
    "pinyin": "qiāo",
    "primary_gloss": "extort",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "桥",
    "pinyin": "qiáo",
    "primary_gloss": "bridge",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "巧克力",
    "pinyin": "qiǎokèlì",
    "primary_gloss": "chocolate (loanword)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亲戚",
    "pinyin": "qīnqi",
    "primary_gloss": "a relative (i.e. family relation)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "轻",
    "pinyin": "qīng",
    "primary_gloss": "light",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "轻松",
    "pinyin": "qīngsōng",
    "primary_gloss": "gentle",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "情况",
    "pinyin": "qíngkuàng",
    "primary_gloss": "circumstances",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "请假",
    "pinyin": "qǐngjià",
    "primary_gloss": "ask for time off",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "请客",
    "pinyin": "qǐngkè",
    "primary_gloss": "give a dinner party",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "food_cooking"
    ]
  },
  {
    "surface_form": "穷",
    "pinyin": "qióng",
    "primary_gloss": "exhausted",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "区别",
    "pinyin": "qūbié",
    "primary_gloss": "difference",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "取",
    "pinyin": "qǔ",
    "primary_gloss": "to take",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "全部",
    "pinyin": "quánbù",
    "primary_gloss": "whole",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "缺点",
    "pinyin": "quēdiǎn",
    "primary_gloss": "weak point",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "缺少",
    "pinyin": "quēshǎo",
    "primary_gloss": "lack",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "却",
    "pinyin": "què",
    "primary_gloss": "but",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "确实",
    "pinyin": "quèshí",
    "primary_gloss": "indeed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "群",
    "pinyin": "qún",
    "primary_gloss": "group",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "然而",
    "pinyin": "ránér",
    "primary_gloss": "however",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "热闹",
    "pinyin": "rènao",
    "primary_gloss": "bustling with noise and excitement",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "travel"
    ]
  },
  {
    "surface_form": "人民币",
    "pinyin": "rénmínbì",
    "primary_gloss": "Renminbi (RMB)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "任何",
    "pinyin": "rènhé",
    "primary_gloss": "any",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "任务",
    "pinyin": "rènwu",
    "primary_gloss": "mission",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "扔",
    "pinyin": "rēng",
    "primary_gloss": "to throw",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "仍然",
    "pinyin": "réngrán",
    "primary_gloss": "still",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "日记",
    "pinyin": "rìjì",
    "primary_gloss": "diary",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "入口",
    "pinyin": "rùkǒu",
    "primary_gloss": "entrance",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "软",
    "pinyin": "ruǎn",
    "primary_gloss": "soft",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "散步",
    "pinyin": "sànbù",
    "primary_gloss": "to take a walk",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "森林",
    "pinyin": "sēnlín",
    "primary_gloss": "forest",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "沙发",
    "pinyin": "shāfā",
    "primary_gloss": "sofa",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "商量",
    "pinyin": "shāngliang",
    "primary_gloss": "to consult",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "伤心",
    "pinyin": "shāngxīn",
    "primary_gloss": "to grieve",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "history_culture"
    ]
  },
  {
    "surface_form": "稍微",
    "pinyin": "shāowēi",
    "primary_gloss": "a little bit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "社会",
    "pinyin": "shèhuì",
    "primary_gloss": "society",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "深",
    "pinyin": "shēn",
    "primary_gloss": "close",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "申请",
    "pinyin": "shēnqǐng",
    "primary_gloss": "to apply for sth",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "甚至",
    "pinyin": "shènzhì",
    "primary_gloss": "even",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "生活",
    "pinyin": "shēnghuó",
    "primary_gloss": "life",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "生命",
    "pinyin": "shēngmìng",
    "primary_gloss": "life",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "省",
    "pinyin": "shěng",
    "primary_gloss": "to save",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "剩",
    "pinyin": "shèng",
    "primary_gloss": "to remain",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "失败",
    "pinyin": "shībài",
    "primary_gloss": "to be defeated",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "technology"
    ]
  },
  {
    "surface_form": "失望",
    "pinyin": "shīwàng",
    "primary_gloss": "disappointed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "nature"
    ]
  },
  {
    "surface_form": "师傅",
    "pinyin": "shīfu",
    "primary_gloss": "master",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "work_business"
    ]
  },
  {
    "surface_form": "湿润",
    "pinyin": "shīrùn",
    "primary_gloss": "moist",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "狮子",
    "pinyin": "shīzi",
    "primary_gloss": "lion",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "十分",
    "pinyin": "shífēn",
    "primary_gloss": "to divide into ten equal parts",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "实际",
    "pinyin": "shíjì",
    "primary_gloss": "actual",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "实在",
    "pinyin": "shízài",
    "primary_gloss": "in reality",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "食品",
    "pinyin": "shípǐn",
    "primary_gloss": "foodstuff",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "使用",
    "pinyin": "shǐyòng",
    "primary_gloss": "to use",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "试",
    "pinyin": "shì",
    "primary_gloss": "to test",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology",
      "politics_law"
    ]
  },
  {
    "surface_form": "市场",
    "pinyin": "shìchǎng",
    "primary_gloss": "market place",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "适合",
    "pinyin": "shìhé",
    "primary_gloss": "to fit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "适应",
    "pinyin": "shìyìng",
    "primary_gloss": "to suit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "世纪",
    "pinyin": "shìjì",
    "primary_gloss": "century",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "收",
    "pinyin": "shōu",
    "primary_gloss": "to receive",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "daily_life"
    ]
  },
  {
    "surface_form": "收入",
    "pinyin": "shōurù",
    "primary_gloss": "to take in",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "收拾",
    "pinyin": "shōushi",
    "primary_gloss": "to put in order",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "spoken",
      "informal"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "首都",
    "pinyin": "shǒudū",
    "primary_gloss": "capital (city)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "首先",
    "pinyin": "shǒuxiān",
    "primary_gloss": "first (of all)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "受不了",
    "pinyin": "shòubùliǎo",
    "primary_gloss": "unbearable",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "受到",
    "pinyin": "shòudào",
    "primary_gloss": "to receive",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "售货员",
    "pinyin": "shòuhuòyuán",
    "primary_gloss": "salesperson",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "输",
    "pinyin": "shū",
    "primary_gloss": "to lose",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "熟悉",
    "pinyin": "shúxī",
    "primary_gloss": "to be familiar with",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "数量",
    "pinyin": "shùliàng",
    "primary_gloss": "amount",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "数字",
    "pinyin": "shùzì",
    "primary_gloss": "numeral",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology",
      "politics_law"
    ]
  },
  {
    "surface_form": "帅",
    "pinyin": "shuài",
    "primary_gloss": "handsome",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "顺便",
    "pinyin": "shùnbiàn",
    "primary_gloss": "conveniently",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "顺利",
    "pinyin": "shùnlì",
    "primary_gloss": "smoothly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "顺序",
    "pinyin": "shùnxù",
    "primary_gloss": "sequence",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "说明",
    "pinyin": "shuōmíng",
    "primary_gloss": "to explain",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "travel"
    ]
  },
  {
    "surface_form": "硕士",
    "pinyin": "shuòshì",
    "primary_gloss": "master's degree",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "死",
    "pinyin": "sǐ",
    "primary_gloss": "to die",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "速度",
    "pinyin": "sùdù",
    "primary_gloss": "speed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "塑料袋",
    "pinyin": "sùliàodài",
    "primary_gloss": "plastic bag",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "酸",
    "pinyin": "suān",
    "primary_gloss": "sour",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "算",
    "pinyin": "suàn",
    "primary_gloss": "regard as",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "随便",
    "pinyin": "suíbiàn",
    "primary_gloss": "as one wishes",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "随着",
    "pinyin": "suízhe",
    "primary_gloss": "along with",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "孙子",
    "pinyin": "sūnzi",
    "primary_gloss": "grandson",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "所有",
    "pinyin": "suǒyǒu",
    "primary_gloss": "all",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "台",
    "pinyin": "tái",
    "primary_gloss": "desk",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "music_arts"
    ]
  },
  {
    "surface_form": "抬",
    "pinyin": "tái",
    "primary_gloss": "to lift",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "travel"
    ]
  },
  {
    "surface_form": "态度",
    "pinyin": "tàidu",
    "primary_gloss": "manner",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谈",
    "pinyin": "tán",
    "primary_gloss": "to speak",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "弹钢琴",
    "pinyin": "tángāngqín",
    "primary_gloss": "play the piano",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "汤",
    "pinyin": "tāng",
    "primary_gloss": "soup",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "趟",
    "pinyin": "tāng",
    "primary_gloss": "to wade",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "躺",
    "pinyin": "tǎng",
    "primary_gloss": "to recline",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讨论",
    "pinyin": "tǎolùn",
    "primary_gloss": "to discuss",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讨厌",
    "pinyin": "tǎoyàn",
    "primary_gloss": "disgusting",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "特点",
    "pinyin": "tèdiǎn",
    "primary_gloss": "characteristic (feature)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "提供",
    "pinyin": "tígōng",
    "primary_gloss": "to offer",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提前",
    "pinyin": "tíqián",
    "primary_gloss": "to shift to an earlier date",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提醒",
    "pinyin": "tíxǐng",
    "primary_gloss": "to remind",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "填空",
    "pinyin": "tiánkòng",
    "primary_gloss": "to fill a job vacancy",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "条件",
    "pinyin": "tiáojiàn",
    "primary_gloss": "condition",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "music_arts"
    ]
  },
  {
    "surface_form": "停止",
    "pinyin": "tíngzhǐ",
    "primary_gloss": "to stop",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "挺",
    "pinyin": "tǐng",
    "primary_gloss": "to stick out",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "通过",
    "pinyin": "tōngguò",
    "primary_gloss": "by means of",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通知",
    "pinyin": "tōngzhī",
    "primary_gloss": "to notify",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "同情",
    "pinyin": "tóngqíng",
    "primary_gloss": "compassion",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "travel"
    ]
  },
  {
    "surface_form": "推",
    "pinyin": "tuī",
    "primary_gloss": "to push",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推迟",
    "pinyin": "tuīchí",
    "primary_gloss": "to postpone",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "脱",
    "pinyin": "tuō",
    "primary_gloss": "to shed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "袜子",
    "pinyin": "wàzi",
    "primary_gloss": "socks",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "完全",
    "pinyin": "wánquán",
    "primary_gloss": "complete",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "往",
    "pinyin": "wǎng",
    "primary_gloss": "to go (in a direction)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "往往",
    "pinyin": "wǎngwǎng",
    "primary_gloss": "often",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "网球",
    "pinyin": "wǎngqiú",
    "primary_gloss": "tennis",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "网站",
    "pinyin": "wǎngzhàn",
    "primary_gloss": "website",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "危险",
    "pinyin": "wēixiǎn",
    "primary_gloss": "danger",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "味道",
    "pinyin": "wèidào",
    "primary_gloss": "flavor",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "温度",
    "pinyin": "wēndù",
    "primary_gloss": "temperature",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "文章",
    "pinyin": "wénzhāng",
    "primary_gloss": "article",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "history_culture"
    ]
  },
  {
    "surface_form": "握手",
    "pinyin": "wòshǒu",
    "primary_gloss": "to shake hands",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "污染",
    "pinyin": "wūrǎn",
    "primary_gloss": "pollution",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "无",
    "pinyin": "wú",
    "primary_gloss": "-less",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "无聊",
    "pinyin": "wúliáo",
    "primary_gloss": "nonsense",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "无论",
    "pinyin": "wúlùn",
    "primary_gloss": "no matter what or how",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "误会",
    "pinyin": "wùhuì",
    "primary_gloss": "to misunderstand",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "西红柿",
    "pinyin": "xīhóngshì",
    "primary_gloss": "tomato",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "吸引",
    "pinyin": "xīyǐn",
    "primary_gloss": "to attract (interest, investment etc)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "洗衣机",
    "pinyin": "xǐyījī",
    "primary_gloss": "washer",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "technology",
      "daily_life"
    ]
  },
  {
    "surface_form": "咸",
    "pinyin": "xián",
    "primary_gloss": "salted",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "现代",
    "pinyin": "xiàndài",
    "primary_gloss": "modern times",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "羡慕",
    "pinyin": "xiànmù",
    "primary_gloss": "envious",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "限制",
    "pinyin": "xiànzhì",
    "primary_gloss": "to restrict",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "香",
    "pinyin": "xiāng",
    "primary_gloss": "fragrant",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "相反",
    "pinyin": "xiāngfǎn",
    "primary_gloss": "opposite",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "详细",
    "pinyin": "xiángxì",
    "primary_gloss": "detailed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "响",
    "pinyin": "xiǎng",
    "primary_gloss": "to make a sound",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "消息",
    "pinyin": "xiāoxi",
    "primary_gloss": "news",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "小说",
    "pinyin": "xiǎoshuō",
    "primary_gloss": "novel",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "笑话",
    "pinyin": "xiàohuà",
    "primary_gloss": "joke",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "效果",
    "pinyin": "xiàoguǒ",
    "primary_gloss": "result",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辛苦",
    "pinyin": "xīnkǔ",
    "primary_gloss": "hard",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "心情",
    "pinyin": "xīnqíng",
    "primary_gloss": "mood",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "信任",
    "pinyin": "xìnrèn",
    "primary_gloss": "to trust",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "信心",
    "pinyin": "xìnxīn",
    "primary_gloss": "confidence",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "信用卡",
    "pinyin": "xìnyòngkǎ",
    "primary_gloss": "credit card",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "兴奋",
    "pinyin": "xīngfèn",
    "primary_gloss": "excited",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "行",
    "pinyin": "xíng",
    "primary_gloss": "to walk",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "daily_life"
    ]
  },
  {
    "surface_form": "醒",
    "pinyin": "xǐng",
    "primary_gloss": "to wake up",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "性别",
    "pinyin": "xìngbié",
    "primary_gloss": "gender",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "性格",
    "pinyin": "xìnggé",
    "primary_gloss": "nature",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "幸福",
    "pinyin": "xìngfú",
    "primary_gloss": "blessed",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "修",
    "pinyin": "xiū",
    "primary_gloss": "to decorate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "许多",
    "pinyin": "xǔduō",
    "primary_gloss": "many",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "血",
    "pinyin": "xuè",
    "primary_gloss": "blood",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "spoken",
      "informal"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "压力",
    "pinyin": "yālì",
    "primary_gloss": "pressure",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "牙膏",
    "pinyin": "yágāo",
    "primary_gloss": "toothpaste",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亚洲",
    "pinyin": "yàzhōu",
    "primary_gloss": "Asia",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "呀",
    "pinyin": "ya",
    "primary_gloss": "(particle equivalent to 啊 after a vowel, expressing surprise or doubt)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture",
      "music_arts"
    ]
  },
  {
    "surface_form": "盐",
    "pinyin": "yán",
    "primary_gloss": "salt",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "严格",
    "pinyin": "yángé",
    "primary_gloss": "strict",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "严重",
    "pinyin": "yánzhòng",
    "primary_gloss": "grave",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "研究生",
    "pinyin": "yánjiūshēng",
    "primary_gloss": "graduate student",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "演出",
    "pinyin": "yǎnchū",
    "primary_gloss": "to act (in a play)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "演员",
    "pinyin": "yǎnyuán",
    "primary_gloss": "actor or actress",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "阳光",
    "pinyin": "yángguāng",
    "primary_gloss": "sunshine",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "养成",
    "pinyin": "yǎngchéng",
    "primary_gloss": "to cultivate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "样子",
    "pinyin": "yàngzi",
    "primary_gloss": "manner",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "邀请",
    "pinyin": "yāoqǐng",
    "primary_gloss": "to invite",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "钥匙",
    "pinyin": "yàoshi",
    "primary_gloss": "key",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "也许",
    "pinyin": "yěxǔ",
    "primary_gloss": "perhaps",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "页",
    "pinyin": "yè",
    "primary_gloss": "page",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "叶子",
    "pinyin": "yèzi",
    "primary_gloss": "foliage",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "一切",
    "pinyin": "yíqiè",
    "primary_gloss": "everything",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "以",
    "pinyin": "yǐ",
    "primary_gloss": "to use",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亿",
    "pinyin": "yì",
    "primary_gloss": "a hundred million",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "意见",
    "pinyin": "yìjiàn",
    "primary_gloss": "idea",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "艺术",
    "pinyin": "yìshù",
    "primary_gloss": "art",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "因此",
    "pinyin": "yīncǐ",
    "primary_gloss": "thus",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "饮料",
    "pinyin": "yǐnliào",
    "primary_gloss": "drink",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "引起",
    "pinyin": "yǐnqǐ",
    "primary_gloss": "to give rise to",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "印象",
    "pinyin": "yìnxiàng",
    "primary_gloss": "impression",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "赢",
    "pinyin": "yíng",
    "primary_gloss": "to beat",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "work_business"
    ]
  },
  {
    "surface_form": "硬",
    "pinyin": "yìng",
    "primary_gloss": "hard",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "勇敢",
    "pinyin": "yǒnggǎn",
    "primary_gloss": "brave",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "永远",
    "pinyin": "yǒngyuǎn",
    "primary_gloss": "forever",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "优点",
    "pinyin": "yōudiǎn",
    "primary_gloss": "merit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "优秀",
    "pinyin": "yōuxiù",
    "primary_gloss": "outstanding",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "幽默",
    "pinyin": "yōumò",
    "primary_gloss": "humor",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "由",
    "pinyin": "yóu",
    "primary_gloss": "to follow",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "由于",
    "pinyin": "yóuyú",
    "primary_gloss": "due to",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尤其",
    "pinyin": "yóuqí",
    "primary_gloss": "especially",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "有趣",
    "pinyin": "yǒuqù",
    "primary_gloss": "interesting",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts",
      "daily_life"
    ]
  },
  {
    "surface_form": "友好",
    "pinyin": "yǒuhǎo",
    "primary_gloss": "friendly (relations)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "友谊",
    "pinyin": "yǒuyì",
    "primary_gloss": "companionship",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "travel"
    ]
  },
  {
    "surface_form": "愉快",
    "pinyin": "yúkuài",
    "primary_gloss": "cheerful",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "emotions",
      "music_arts"
    ]
  },
  {
    "surface_form": "于是",
    "pinyin": "yúshì",
    "primary_gloss": "thereupon",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "与",
    "pinyin": "yú",
    "primary_gloss": "(same as 歟",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "语法",
    "pinyin": "yǔfǎ",
    "primary_gloss": "grammar",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "语言",
    "pinyin": "yǔyán",
    "primary_gloss": "language",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "羽毛球",
    "pinyin": "yǔmáoqiú",
    "primary_gloss": "shuttlecock",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "预习",
    "pinyin": "yùxí",
    "primary_gloss": "to prepare a lesson",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "圆",
    "pinyin": "yuán",
    "primary_gloss": "circle",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "原来",
    "pinyin": "yuánlái",
    "primary_gloss": "original",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "原谅",
    "pinyin": "yuánliàng",
    "primary_gloss": "to excuse",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "原因",
    "pinyin": "yuányīn",
    "primary_gloss": "cause",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "约会",
    "pinyin": "yuēhuì",
    "primary_gloss": "appointment",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "阅读",
    "pinyin": "yuèdú",
    "primary_gloss": "to read",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "允许",
    "pinyin": "yǔnxǔ",
    "primary_gloss": "to permit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "杂志",
    "pinyin": "zázhì",
    "primary_gloss": "magazine",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "咱们",
    "pinyin": "zánmen",
    "primary_gloss": "we or us (including both the speaker and the person(s) spoken to)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "暂时",
    "pinyin": "zànshí",
    "primary_gloss": "temporary",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "脏",
    "pinyin": "zàng",
    "primary_gloss": "viscera",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "责任",
    "pinyin": "zérèn",
    "primary_gloss": "responsibility",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "增加",
    "pinyin": "zēngjiā",
    "primary_gloss": "to raise",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "增长",
    "pinyin": "zēngzhǎng",
    "primary_gloss": "to grow",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "窄",
    "pinyin": "zhǎi",
    "primary_gloss": "narrow",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "招聘",
    "pinyin": "zhāopìn",
    "primary_gloss": "recruitment",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature",
      "work_business"
    ]
  },
  {
    "surface_form": "真正",
    "pinyin": "zhēnzhèng",
    "primary_gloss": "genuine",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "整理",
    "pinyin": "zhěnglǐ",
    "primary_gloss": "to arrange",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "整齐",
    "pinyin": "zhěngqí",
    "primary_gloss": "orderly",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "正常",
    "pinyin": "zhèngcháng",
    "primary_gloss": "regular",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "正好",
    "pinyin": "zhènghǎo",
    "primary_gloss": "just (in time)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law",
      "daily_life"
    ]
  },
  {
    "surface_form": "正确",
    "pinyin": "zhèngquè",
    "primary_gloss": "correct",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "正式",
    "pinyin": "zhèngshì",
    "primary_gloss": "formal",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "证明",
    "pinyin": "zhèngmíng",
    "primary_gloss": "proof",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "之",
    "pinyin": "zhī",
    "primary_gloss": "(possessive particle, literary equivalent of 的)",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "支持",
    "pinyin": "zhīchí",
    "primary_gloss": "to be in favor of",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "知识",
    "pinyin": "zhīshi",
    "primary_gloss": "intellectual",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "值得",
    "pinyin": "zhíde",
    "primary_gloss": "to be worth",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "直接",
    "pinyin": "zhíjiē",
    "primary_gloss": "direct",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "植物",
    "pinyin": "zhíwù",
    "primary_gloss": "botanical",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "职业",
    "pinyin": "zhíyè",
    "primary_gloss": "occupation",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "指",
    "pinyin": "zhǐ",
    "primary_gloss": "finger",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "只好",
    "pinyin": "zhǐhǎo",
    "primary_gloss": "without any better option",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "只要",
    "pinyin": "zhǐyào",
    "primary_gloss": "if only",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "质量",
    "pinyin": "zhìliàng",
    "primary_gloss": "quality",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "至少",
    "pinyin": "zhìshǎo",
    "primary_gloss": "at least",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "制造",
    "pinyin": "zhìzào",
    "primary_gloss": "to manufacture",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "中文",
    "pinyin": "zhōngwén",
    "primary_gloss": "Chinese",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "written",
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "重点",
    "pinyin": "zhòngdiǎn",
    "primary_gloss": "emphasis",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "重视",
    "pinyin": "zhòngshì",
    "primary_gloss": "to attach importance to sth",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "周围",
    "pinyin": "zhōuwéi",
    "primary_gloss": "surroundings",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "猪",
    "pinyin": "zhū",
    "primary_gloss": "hog",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "逐渐",
    "pinyin": "zhújiàn",
    "primary_gloss": "gradually",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "主动",
    "pinyin": "zhǔdòng",
    "primary_gloss": "to take the initiative",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "主意",
    "pinyin": "zhǔyi",
    "primary_gloss": "plan",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "祝贺",
    "pinyin": "zhùhè",
    "primary_gloss": "to congratulate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "著名",
    "pinyin": "zhùmíng",
    "primary_gloss": "famous",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "专门",
    "pinyin": "zhuānmén",
    "primary_gloss": "specialist",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "专业",
    "pinyin": "zhuānyè",
    "primary_gloss": "specialty",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business",
      "daily_life"
    ]
  },
  {
    "surface_form": "赚",
    "pinyin": "zhuàn",
    "primary_gloss": "earn",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "撞",
    "pinyin": "zhuàng",
    "primary_gloss": "to hit",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "准确",
    "pinyin": "zhǔnquè",
    "primary_gloss": "accurate",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "准时",
    "pinyin": "zhǔnshí",
    "primary_gloss": "on time",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "仔细",
    "pinyin": "zǐxì",
    "primary_gloss": "careful",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "自然",
    "pinyin": "zìrán",
    "primary_gloss": "nature",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "总结",
    "pinyin": "zǒngjié",
    "primary_gloss": "to sum up",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "租",
    "pinyin": "zū",
    "primary_gloss": "to hire",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "politics_law",
      "history_culture"
    ]
  },
  {
    "surface_form": "组成",
    "pinyin": "zǔchéng",
    "primary_gloss": "component",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "组织",
    "pinyin": "zǔzhī",
    "primary_gloss": "to organize",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "嘴",
    "pinyin": "zuǐ",
    "primary_gloss": "mouth",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "最好",
    "pinyin": "zuìhǎo",
    "primary_gloss": "best",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "最后",
    "pinyin": "zuìhòu",
    "primary_gloss": "final",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尊重",
    "pinyin": "zūnzhòng",
    "primary_gloss": "esteem",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "做生意",
    "pinyin": "zuòshēngyì",
    "primary_gloss": "to do business",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "座",
    "pinyin": "zuò",
    "primary_gloss": "seat",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "座位",
    "pinyin": "zuòwèi",
    "primary_gloss": "seat",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "作者",
    "pinyin": "zuòzhě",
    "primary_gloss": "author",
    "unit_type": "word",
    "hsk_level": 4,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 4,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "唉",
    "pinyin": "āi",
    "primary_gloss": "interjection of agreement",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爱护",
    "pinyin": "àihù",
    "primary_gloss": "to cherish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爱惜",
    "pinyin": "àixī",
    "primary_gloss": "to cherish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "爱心",
    "pinyin": "àixīn",
    "primary_gloss": "compassion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "安慰",
    "pinyin": "ānwèi",
    "primary_gloss": "to comfort",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "安装",
    "pinyin": "ānzhuāng",
    "primary_gloss": "install",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "岸",
    "pinyin": "àn",
    "primary_gloss": "bank",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "把握",
    "pinyin": "bǎwò",
    "primary_gloss": "to grasp",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "摆",
    "pinyin": "bǎi",
    "primary_gloss": "to arrange",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "班主任",
    "pinyin": "bānzhǔrèn",
    "primary_gloss": "class teacher",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "办理",
    "pinyin": "bànlǐ",
    "primary_gloss": "to handle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "棒",
    "pinyin": "bàng",
    "primary_gloss": "stick",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "傍晚",
    "pinyin": "bàngwǎn",
    "primary_gloss": "in the evening",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "包裹",
    "pinyin": "bāoguǒ",
    "primary_gloss": "parcel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "包含",
    "pinyin": "bāohán",
    "primary_gloss": "to contain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "包子",
    "pinyin": "bāozi",
    "primary_gloss": "steamed stuffed bun",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "薄",
    "pinyin": "báo",
    "primary_gloss": "thin",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "宝贝",
    "pinyin": "bǎobèi",
    "primary_gloss": "treasured object",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "宝贵",
    "pinyin": "bǎoguì",
    "primary_gloss": "valuable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保持",
    "pinyin": "bǎochí",
    "primary_gloss": "to keep",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保存",
    "pinyin": "bǎocún",
    "primary_gloss": "to conserve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保留",
    "pinyin": "bǎoliú",
    "primary_gloss": "to retain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "保险",
    "pinyin": "bǎoxiǎn",
    "primary_gloss": "insurance",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "报告",
    "pinyin": "bàogào",
    "primary_gloss": "report",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "悲观",
    "pinyin": "bēiguān",
    "primary_gloss": "pessimistic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "背",
    "pinyin": "bèi",
    "primary_gloss": "back",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "背景",
    "pinyin": "bèijǐng",
    "primary_gloss": "background",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "被子",
    "pinyin": "bèizi",
    "primary_gloss": "quilt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "本科",
    "pinyin": "běnkē",
    "primary_gloss": "undergraduate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "本领",
    "pinyin": "běnlǐng",
    "primary_gloss": "skill",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "本质",
    "pinyin": "běnzhì",
    "primary_gloss": "essence",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "比例",
    "pinyin": "bǐlì",
    "primary_gloss": "proportion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "比如",
    "pinyin": "bǐrú",
    "primary_gloss": "for example",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "彼此",
    "pinyin": "bǐcǐ",
    "primary_gloss": "each other",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "毕竟",
    "pinyin": "bìjìng",
    "primary_gloss": "after all",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "避免",
    "pinyin": "bìmiǎn",
    "primary_gloss": "to avert",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "必然",
    "pinyin": "bìrán",
    "primary_gloss": "inevitable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "必需",
    "pinyin": "bìxū",
    "primary_gloss": "essential",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "必要",
    "pinyin": "bìyào",
    "primary_gloss": "necessary",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "编辑",
    "pinyin": "biānjí",
    "primary_gloss": "to edit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鞭炮",
    "pinyin": "biānpào",
    "primary_gloss": "firecrackers",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "便",
    "pinyin": "biàn",
    "primary_gloss": "convenient",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辩论",
    "pinyin": "biànlùn",
    "primary_gloss": "debate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "标点",
    "pinyin": "biāodiǎn",
    "primary_gloss": "punctuation mark",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "标志",
    "pinyin": "biāozhì",
    "primary_gloss": "sign",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表面",
    "pinyin": "biǎomiàn",
    "primary_gloss": "surface",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表明",
    "pinyin": "biǎomíng",
    "primary_gloss": "to state clearly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表情",
    "pinyin": "biǎoqíng",
    "primary_gloss": "facial expression",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "表现",
    "pinyin": "biǎoxiàn",
    "primary_gloss": "to show",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "丙",
    "pinyin": "bǐng",
    "primary_gloss": "third heavenly stem",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "病毒",
    "pinyin": "bìngdú",
    "primary_gloss": "virus",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "玻璃",
    "pinyin": "bōli",
    "primary_gloss": "glass",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "博物馆",
    "pinyin": "bówùguǎn",
    "primary_gloss": "museum",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "脖子",
    "pinyin": "bózi",
    "primary_gloss": "neck",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不必",
    "pinyin": "búbì",
    "primary_gloss": "need not",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不断",
    "pinyin": "búduàn",
    "primary_gloss": "continuous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不见得",
    "pinyin": "bújiànde",
    "primary_gloss": "not necessarily",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不耐烦",
    "pinyin": "búnàifán",
    "primary_gloss": "impatient",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "不要紧",
    "pinyin": "búyàojǐn",
    "primary_gloss": "doesn't matter",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "补充",
    "pinyin": "bǔchōng",
    "primary_gloss": "to replenish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "布",
    "pinyin": "bù",
    "primary_gloss": "cloth",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不安",
    "pinyin": "bùān",
    "primary_gloss": "uneasy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不得了",
    "pinyin": "bùdéliǎo",
    "primary_gloss": "disastrous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不好意思",
    "pinyin": "bùhǎoyìsi",
    "primary_gloss": "embarrassed",
    "unit_type": "chengyu",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "不免",
    "pinyin": "bùmiǎn",
    "primary_gloss": "unavoidable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不然",
    "pinyin": "búrán",
    "primary_gloss": "or else",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不如",
    "pinyin": "bùrú",
    "primary_gloss": "not as good as",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "不足",
    "pinyin": "bùzú",
    "primary_gloss": "insufficient",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "部门",
    "pinyin": "bùmén",
    "primary_gloss": "department",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "步骤",
    "pinyin": "bùzhòu",
    "primary_gloss": "step",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "财产",
    "pinyin": "cáichǎn",
    "primary_gloss": "property",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "踩",
    "pinyin": "cǎi",
    "primary_gloss": "to step on",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "采访",
    "pinyin": "cǎifǎng",
    "primary_gloss": "to interview",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "采取",
    "pinyin": "cǎiqǔ",
    "primary_gloss": "to adopt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "彩虹",
    "pinyin": "cǎihóng",
    "primary_gloss": "rainbow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "参考",
    "pinyin": "cānkǎo",
    "primary_gloss": "reference",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "参与",
    "pinyin": "cānyù",
    "primary_gloss": "to participate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "餐厅",
    "pinyin": "cāntīng",
    "primary_gloss": "restaurant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "残疾",
    "pinyin": "cánjí",
    "primary_gloss": "disabled",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "惭愧",
    "pinyin": "cánkuì",
    "primary_gloss": "ashamed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "操场",
    "pinyin": "cāochǎng",
    "primary_gloss": "playground",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "操心",
    "pinyin": "cāoxīn",
    "primary_gloss": "to worry about",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "册",
    "pinyin": "cè",
    "primary_gloss": "book",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "厕所",
    "pinyin": "cèsuǒ",
    "primary_gloss": "toilet",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "测验",
    "pinyin": "cèyàn",
    "primary_gloss": "test",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "曾经",
    "pinyin": "céngjīng",
    "primary_gloss": "once",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "插",
    "pinyin": "chā",
    "primary_gloss": "to insert",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "差别",
    "pinyin": "chābié",
    "primary_gloss": "difference",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "叉子",
    "pinyin": "chāzi",
    "primary_gloss": "fork",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "拆",
    "pinyin": "chāi",
    "primary_gloss": "to tear down",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "产品",
    "pinyin": "chǎnpǐn",
    "primary_gloss": "goods",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "产生",
    "pinyin": "chǎnshēng",
    "primary_gloss": "to produce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "长途",
    "pinyin": "chángtú",
    "primary_gloss": "long distance",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "常识",
    "pinyin": "chángshí",
    "primary_gloss": "common sense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抄",
    "pinyin": "chāo",
    "primary_gloss": "to copy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "朝",
    "pinyin": "cháo",
    "primary_gloss": "imperial court",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law",
      "history_culture"
    ]
  },
  {
    "surface_form": "朝代",
    "pinyin": "cháodài",
    "primary_gloss": "dynasty",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "炒",
    "pinyin": "chǎo",
    "primary_gloss": "to fry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "吵架",
    "pinyin": "chǎojià",
    "primary_gloss": "to quarrel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "车库",
    "pinyin": "chēkù",
    "primary_gloss": "garage",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "车厢",
    "pinyin": "chēxiāng",
    "primary_gloss": "carriage",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "彻底",
    "pinyin": "chèdǐ",
    "primary_gloss": "thorough",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "沉默",
    "pinyin": "chénmò",
    "primary_gloss": "silence",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "趁",
    "pinyin": "chèn",
    "primary_gloss": "to take advantage of",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "称",
    "pinyin": "chēng",
    "primary_gloss": "to weigh",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "称呼",
    "pinyin": "chēnghu",
    "primary_gloss": "to call",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "称赞",
    "pinyin": "chēngzàn",
    "primary_gloss": "to praise",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "乘",
    "pinyin": "chéng",
    "primary_gloss": "to ride",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "承担",
    "pinyin": "chéngdān",
    "primary_gloss": "to undertake",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "承认",
    "pinyin": "chéngrèn",
    "primary_gloss": "to admit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "承受",
    "pinyin": "chéngshòu",
    "primary_gloss": "to bear",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "程度",
    "pinyin": "chéngdù",
    "primary_gloss": "degree",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "程序",
    "pinyin": "chéngxù",
    "primary_gloss": "procedure",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成分",
    "pinyin": "chéngfèn",
    "primary_gloss": "composition",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成果",
    "pinyin": "chéngguǒ",
    "primary_gloss": "result",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成就",
    "pinyin": "chéngjiù",
    "primary_gloss": "accomplishment",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成立",
    "pinyin": "chénglì",
    "primary_gloss": "to establish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成语",
    "pinyin": "chéngyǔ",
    "primary_gloss": "Chinese idiom",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "成长",
    "pinyin": "chéngzhǎng",
    "primary_gloss": "to mature",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "诚恳",
    "pinyin": "chéngkěn",
    "primary_gloss": "sincere",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吃亏",
    "pinyin": "chīkuī",
    "primary_gloss": "to suffer losses",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "持续",
    "pinyin": "chíxù",
    "primary_gloss": "to continue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "池子",
    "pinyin": "chízi",
    "primary_gloss": "pond",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尺子",
    "pinyin": "chǐzi",
    "primary_gloss": "ruler",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "翅膀",
    "pinyin": "chìbǎng",
    "primary_gloss": "wing",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "冲",
    "pinyin": "chōng",
    "primary_gloss": "to dash",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "充电器",
    "pinyin": "chōngdiànqì",
    "primary_gloss": "battery charger",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "充分",
    "pinyin": "chōngfèn",
    "primary_gloss": "full",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "充满",
    "pinyin": "chōngmǎn",
    "primary_gloss": "full of",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "重复",
    "pinyin": "chóngfù",
    "primary_gloss": "to repeat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "宠物",
    "pinyin": "chǒngwù",
    "primary_gloss": "house pet",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抽屉",
    "pinyin": "chōuti",
    "primary_gloss": "drawer",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抽象",
    "pinyin": "chōuxiàng",
    "primary_gloss": "abstract",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "丑",
    "pinyin": "chǒu",
    "primary_gloss": "clown",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "臭",
    "pinyin": "chòu",
    "primary_gloss": "stench",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "出版",
    "pinyin": "chūbǎn",
    "primary_gloss": "to publish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "出口",
    "pinyin": "chūkǒu",
    "primary_gloss": "exit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "出色",
    "pinyin": "chūsè",
    "primary_gloss": "remarkable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "出席",
    "pinyin": "chūxí",
    "primary_gloss": "to attend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "初级",
    "pinyin": "chūjí",
    "primary_gloss": "junior",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "除",
    "pinyin": "chú",
    "primary_gloss": "to remove",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "除非",
    "pinyin": "chúfēi",
    "primary_gloss": "unless",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "除夕",
    "pinyin": "chúxī",
    "primary_gloss": "New Year's Eve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "处理",
    "pinyin": "chǔlǐ",
    "primary_gloss": "to handle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "传播",
    "pinyin": "chuánbō",
    "primary_gloss": "to disseminate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "传递",
    "pinyin": "chuándì",
    "primary_gloss": "to transmit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "传染",
    "pinyin": "chuánrǎn",
    "primary_gloss": "to infect",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "传说",
    "pinyin": "chuánshuō",
    "primary_gloss": "legend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "传统",
    "pinyin": "chuántǒng",
    "primary_gloss": "tradition",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "窗帘",
    "pinyin": "chuānglián",
    "primary_gloss": "window curtains",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "闯",
    "pinyin": "chuǎng",
    "primary_gloss": "to rush",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "创造",
    "pinyin": "chuàngzào",
    "primary_gloss": "to create",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "吹",
    "pinyin": "chuī",
    "primary_gloss": "to blow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "music_arts"
    ]
  },
  {
    "surface_form": "磁带",
    "pinyin": "cídài",
    "primary_gloss": "magnetic tape",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辞职",
    "pinyin": "cízhí",
    "primary_gloss": "to resign",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "此外",
    "pinyin": "cǐwài",
    "primary_gloss": "besides",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "次要",
    "pinyin": "cìyào",
    "primary_gloss": "secondary",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刺激",
    "pinyin": "cìjī",
    "primary_gloss": "to provoke",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "匆忙",
    "pinyin": "cōngmáng",
    "primary_gloss": "hasty",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "从此",
    "pinyin": "cóngcǐ",
    "primary_gloss": "from now on",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "从而",
    "pinyin": "cóngér",
    "primary_gloss": "thus",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "从前",
    "pinyin": "cóngqián",
    "primary_gloss": "previously",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "从事",
    "pinyin": "cóngshì",
    "primary_gloss": "to engage in",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "醋",
    "pinyin": "cù",
    "primary_gloss": "vinegar",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "促进",
    "pinyin": "cùjìn",
    "primary_gloss": "to promote",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "促使",
    "pinyin": "cùshǐ",
    "primary_gloss": "to induce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "催",
    "pinyin": "cuī",
    "primary_gloss": "to urge",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "存",
    "pinyin": "cún",
    "primary_gloss": "exist",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "存在",
    "pinyin": "cúnzài",
    "primary_gloss": "to exist",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "错误",
    "pinyin": "cuòwù",
    "primary_gloss": "error",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "措施",
    "pinyin": "cuòshī",
    "primary_gloss": "measure",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "答应",
    "pinyin": "dāying",
    "primary_gloss": "to promise",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "达到",
    "pinyin": "dádào",
    "primary_gloss": "to reach",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打工",
    "pinyin": "dǎgōng",
    "primary_gloss": "to work",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "work_business"
    ]
  },
  {
    "surface_form": "打交道",
    "pinyin": "dǎjiāodào",
    "primary_gloss": "to contact",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打喷嚏",
    "pinyin": "dǎpēntì",
    "primary_gloss": "to sneeze",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打听",
    "pinyin": "dǎting",
    "primary_gloss": "to ask about",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "打招呼",
    "pinyin": "dǎzhāohu",
    "primary_gloss": "to greet",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "大方",
    "pinyin": "dàfāng",
    "primary_gloss": "expert",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "大象",
    "pinyin": "dàxiàng",
    "primary_gloss": "elephant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "大型",
    "pinyin": "dàxíng",
    "primary_gloss": "large scale",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "呆",
    "pinyin": "dāi",
    "primary_gloss": "foolish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贷款",
    "pinyin": "dàikuǎn",
    "primary_gloss": "loan",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "待遇",
    "pinyin": "dàiyù",
    "primary_gloss": "treatment",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "单纯",
    "pinyin": "dānchún",
    "primary_gloss": "simple",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "单调",
    "pinyin": "dāndiào",
    "primary_gloss": "monotonous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "单独",
    "pinyin": "dāndú",
    "primary_gloss": "alone",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "单位",
    "pinyin": "dānwèi",
    "primary_gloss": "unit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "单元",
    "pinyin": "dānyuán",
    "primary_gloss": "unit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "担任",
    "pinyin": "dānrèn",
    "primary_gloss": "to hold office",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "耽误",
    "pinyin": "dānwu",
    "primary_gloss": "delay",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胆小鬼",
    "pinyin": "dǎnxiǎoguǐ",
    "primary_gloss": "coward",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "淡",
    "pinyin": "dàn",
    "primary_gloss": "insipid",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "当代",
    "pinyin": "dāngdài",
    "primary_gloss": "present age",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "挡",
    "pinyin": "dǎng",
    "primary_gloss": "to resist",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "岛",
    "pinyin": "dǎo",
    "primary_gloss": "island",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "倒霉",
    "pinyin": "dǎoméi",
    "primary_gloss": "unlucky",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "导演",
    "pinyin": "dǎoyǎn",
    "primary_gloss": "direct",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "导致",
    "pinyin": "dǎozhì",
    "primary_gloss": "to lead to",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "倒",
    "pinyin": "dào",
    "primary_gloss": "to move backwards",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "到达",
    "pinyin": "dàodá",
    "primary_gloss": "to arrive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "道德",
    "pinyin": "dàodé",
    "primary_gloss": "virtue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "道理",
    "pinyin": "dàolǐ",
    "primary_gloss": "reason",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "登机牌",
    "pinyin": "dēngjīpái",
    "primary_gloss": "boarding pass",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "登记",
    "pinyin": "dēngjì",
    "primary_gloss": "to register",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "等待",
    "pinyin": "děngdài",
    "primary_gloss": "wait for",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "等候",
    "pinyin": "děnghòu",
    "primary_gloss": "waiting",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "等于",
    "pinyin": "děngyú",
    "primary_gloss": "to equal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "滴",
    "pinyin": "dī",
    "primary_gloss": "drop",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "的确",
    "pinyin": "díquè",
    "primary_gloss": "really",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "敌人",
    "pinyin": "dírén",
    "primary_gloss": "enemy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "递",
    "pinyin": "dì",
    "primary_gloss": "to hand over",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地道",
    "pinyin": "dìdao",
    "primary_gloss": "authentic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地理",
    "pinyin": "dìlǐ",
    "primary_gloss": "geography",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地区",
    "pinyin": "dìqū",
    "primary_gloss": "region",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地毯",
    "pinyin": "dìtǎn",
    "primary_gloss": "carpet",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "地位",
    "pinyin": "dìwèi",
    "primary_gloss": "position",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "地震",
    "pinyin": "dìzhèn",
    "primary_gloss": "earthquake",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "点头",
    "pinyin": "diǎntóu",
    "primary_gloss": "to nod",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "点心",
    "pinyin": "diǎnxin",
    "primary_gloss": "light refreshments",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "电池",
    "pinyin": "diànchí",
    "primary_gloss": "battery",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "电台",
    "pinyin": "diàntái",
    "primary_gloss": "broadcasting station",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "钓",
    "pinyin": "diào",
    "primary_gloss": "to fish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "丁",
    "pinyin": "dīng",
    "primary_gloss": "cubes",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "顶",
    "pinyin": "dǐng",
    "primary_gloss": "apex",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "冻",
    "pinyin": "dòng",
    "primary_gloss": "to freeze",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "洞",
    "pinyin": "dòng",
    "primary_gloss": "cave",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "动画片",
    "pinyin": "dònghuàpiān",
    "primary_gloss": "cartoon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "history_culture"
    ]
  },
  {
    "surface_form": "逗",
    "pinyin": "dòu",
    "primary_gloss": "to stay",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "豆腐",
    "pinyin": "dòufu",
    "primary_gloss": "tofu",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "独立",
    "pinyin": "dúlì",
    "primary_gloss": "independent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "独特",
    "pinyin": "dútè",
    "primary_gloss": "unique",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "度过",
    "pinyin": "dùguò",
    "primary_gloss": "spend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "短信",
    "pinyin": "duǎnxìn",
    "primary_gloss": "text message",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "堆",
    "pinyin": "duī",
    "primary_gloss": "pile",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "对比",
    "pinyin": "duìbǐ",
    "primary_gloss": "contrast",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "对待",
    "pinyin": "duìdài",
    "primary_gloss": "to treat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "对方",
    "pinyin": "duìfāng",
    "primary_gloss": "other side",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "对手",
    "pinyin": "duìshǒu",
    "primary_gloss": "opponent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "对象",
    "pinyin": "duìxiàng",
    "primary_gloss": "target",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "对于",
    "pinyin": "duìyú",
    "primary_gloss": "regarding",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吨",
    "pinyin": "dūn",
    "primary_gloss": "ton",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蹲",
    "pinyin": "dūn",
    "primary_gloss": "to crouch",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "多亏",
    "pinyin": "duōkuī",
    "primary_gloss": "thanks to",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "多余",
    "pinyin": "duōyú",
    "primary_gloss": "superfluous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "躲藏",
    "pinyin": "duǒcáng",
    "primary_gloss": "to hide",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "恶劣",
    "pinyin": "èliè",
    "primary_gloss": "vile",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发表",
    "pinyin": "fābiǎo",
    "primary_gloss": "to issue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发愁",
    "pinyin": "fāchóu",
    "primary_gloss": "to worry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "发达",
    "pinyin": "fādá",
    "primary_gloss": "developed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发抖",
    "pinyin": "fādǒu",
    "primary_gloss": "shiver",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发挥",
    "pinyin": "fāhuī",
    "primary_gloss": "to display",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发明",
    "pinyin": "fāmíng",
    "primary_gloss": "to invent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "发票",
    "pinyin": "fāpiào",
    "primary_gloss": "invoice",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "发言",
    "pinyin": "fāyán",
    "primary_gloss": "statement",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "罚款",
    "pinyin": "fákuǎn",
    "primary_gloss": "fine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "法院",
    "pinyin": "fǎyuàn",
    "primary_gloss": "court of law",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "翻",
    "pinyin": "fān",
    "primary_gloss": "to turn over",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "繁荣",
    "pinyin": "fánróng",
    "primary_gloss": "prosperous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "凡是",
    "pinyin": "fánshì",
    "primary_gloss": "every",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "反而",
    "pinyin": "fǎnér",
    "primary_gloss": "instead",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "反复",
    "pinyin": "fǎnfù",
    "primary_gloss": "repeatedly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "反映",
    "pinyin": "fǎnyìng",
    "primary_gloss": "to reflect",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "反正",
    "pinyin": "fǎnzhèng",
    "primary_gloss": "in any event",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "方",
    "pinyin": "fāng",
    "primary_gloss": "square",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "方案",
    "pinyin": "fāngàn",
    "primary_gloss": "plan",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "方式",
    "pinyin": "fāngshì",
    "primary_gloss": "way",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "妨碍",
    "pinyin": "fángài",
    "primary_gloss": "to hinder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "房东",
    "pinyin": "fángdōng",
    "primary_gloss": "landlord",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "仿佛",
    "pinyin": "fǎngfú",
    "primary_gloss": "to seem",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "放松",
    "pinyin": "fàngsōng",
    "primary_gloss": "to loosen",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "非",
    "pinyin": "fēi",
    "primary_gloss": "non-",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "肥皂",
    "pinyin": "féizào",
    "primary_gloss": "soap",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "肺",
    "pinyin": "fèi",
    "primary_gloss": "lung",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "废话",
    "pinyin": "fèihuà",
    "primary_gloss": "nonsense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "费用",
    "pinyin": "fèiyòng",
    "primary_gloss": "cost",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "分别",
    "pinyin": "fēnbié",
    "primary_gloss": "to part",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "分布",
    "pinyin": "fēnbù",
    "primary_gloss": "distributed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "分配",
    "pinyin": "fēnpèi",
    "primary_gloss": "to distribute",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "分析",
    "pinyin": "fēnxī",
    "primary_gloss": "to analyze",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "纷纷",
    "pinyin": "fēnfēn",
    "primary_gloss": "one after another",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "奋斗",
    "pinyin": "fèndòu",
    "primary_gloss": "to strive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "愤怒",
    "pinyin": "fènnù",
    "primary_gloss": "angry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "风格",
    "pinyin": "fēnggé",
    "primary_gloss": "style",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "风俗",
    "pinyin": "fēngsú",
    "primary_gloss": "social custom",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships",
      "history_culture"
    ]
  },
  {
    "surface_form": "风险",
    "pinyin": "fēngxiǎn",
    "primary_gloss": "risk",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "疯狂",
    "pinyin": "fēngkuáng",
    "primary_gloss": "madness",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讽刺",
    "pinyin": "fěngcì",
    "primary_gloss": "to satirize",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "否定",
    "pinyin": "fǒudìng",
    "primary_gloss": "to negate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "否认",
    "pinyin": "fǒurèn",
    "primary_gloss": "to deny",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "扶",
    "pinyin": "fú",
    "primary_gloss": "to support",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "幅",
    "pinyin": "fú",
    "primary_gloss": "width",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "服从",
    "pinyin": "fúcóng",
    "primary_gloss": "to obey",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "服装",
    "pinyin": "fúzhuāng",
    "primary_gloss": "dress",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "辅导",
    "pinyin": "fǔdǎo",
    "primary_gloss": "to coach",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "付款",
    "pinyin": "fùkuǎn",
    "primary_gloss": "payment",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "妇女",
    "pinyin": "fùnǚ",
    "primary_gloss": "woman",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "复制",
    "pinyin": "fùzhì",
    "primary_gloss": "to duplicate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "改革",
    "pinyin": "gǎigé",
    "primary_gloss": "to reform",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "改进",
    "pinyin": "gǎijìn",
    "primary_gloss": "to improve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "改善",
    "pinyin": "gǎishàn",
    "primary_gloss": "to improve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "改正",
    "pinyin": "gǎizhèng",
    "primary_gloss": "to correct",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "盖",
    "pinyin": "gài",
    "primary_gloss": "lid",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "概括",
    "pinyin": "gàikuò",
    "primary_gloss": "to summarize",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "概念",
    "pinyin": "gàiniàn",
    "primary_gloss": "concept",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "干脆",
    "pinyin": "gāncuì",
    "primary_gloss": "straightforward",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "感激",
    "pinyin": "gǎnjī",
    "primary_gloss": "grateful",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "感受",
    "pinyin": "gǎnshòu",
    "primary_gloss": "to sense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "感想",
    "pinyin": "gǎnxiǎng",
    "primary_gloss": "impressions",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "赶紧",
    "pinyin": "gǎnjǐn",
    "primary_gloss": "hurriedly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "赶快",
    "pinyin": "gǎnkuài",
    "primary_gloss": "at once",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "干活儿",
    "pinyin": "gànhuór",
    "primary_gloss": "to work",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "钢铁",
    "pinyin": "gāngtiě",
    "primary_gloss": "steel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "高档",
    "pinyin": "gāodàng",
    "primary_gloss": "superior quality",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "高速公路",
    "pinyin": "gāosùgōnglù",
    "primary_gloss": "expressway",
    "unit_type": "chengyu",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "搞",
    "pinyin": "gǎo",
    "primary_gloss": "to do",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "告别",
    "pinyin": "gàobié",
    "primary_gloss": "to leave",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胳膊",
    "pinyin": "gēbo",
    "primary_gloss": "arm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "鸽子",
    "pinyin": "gēzi",
    "primary_gloss": "pigeon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "隔壁",
    "pinyin": "gébì",
    "primary_gloss": "next door",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "革命",
    "pinyin": "gémìng",
    "primary_gloss": "revolution",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "格外",
    "pinyin": "géwài",
    "primary_gloss": "especially",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "个别",
    "pinyin": "gèbié",
    "primary_gloss": "individual",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "个人",
    "pinyin": "gèrén",
    "primary_gloss": "individual",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "个性",
    "pinyin": "gèxìng",
    "primary_gloss": "individuality",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "各自",
    "pinyin": "gèzi",
    "primary_gloss": "each",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "根",
    "pinyin": "gēn",
    "primary_gloss": "root",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "根本",
    "pinyin": "gēnběn",
    "primary_gloss": "fundamental",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "更加",
    "pinyin": "gèngjiā",
    "primary_gloss": "more",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公布",
    "pinyin": "gōngbù",
    "primary_gloss": "to announce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公开",
    "pinyin": "gōngkāi",
    "primary_gloss": "public",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "公平",
    "pinyin": "gōngpíng",
    "primary_gloss": "fair",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "公寓",
    "pinyin": "gōngyù",
    "primary_gloss": "apartment building",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "公元",
    "pinyin": "gōngyuán",
    "primary_gloss": "AD",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "公主",
    "pinyin": "gōngzhǔ",
    "primary_gloss": "princess",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "工厂",
    "pinyin": "gōngchǎng",
    "primary_gloss": "factory",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business",
      "music_arts"
    ]
  },
  {
    "surface_form": "工程师",
    "pinyin": "gōngchéngshī",
    "primary_gloss": "engineer",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "工人",
    "pinyin": "gōngrén",
    "primary_gloss": "worker",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "工业",
    "pinyin": "gōngyè",
    "primary_gloss": "industry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "功夫",
    "pinyin": "gōngfu",
    "primary_gloss": "skill",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "功能",
    "pinyin": "gōngnéng",
    "primary_gloss": "function",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贡献",
    "pinyin": "gòngxiàn",
    "primary_gloss": "to contribute",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "沟通",
    "pinyin": "gōutōng",
    "primary_gloss": "communicate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "构成",
    "pinyin": "gòuchéng",
    "primary_gloss": "to constitute",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "姑姑",
    "pinyin": "gūgu",
    "primary_gloss": "paternal aunt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "姑娘",
    "pinyin": "gūniang",
    "primary_gloss": "girl",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "古代",
    "pinyin": "gǔdài",
    "primary_gloss": "ancient times",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "古典",
    "pinyin": "gǔdiǎn",
    "primary_gloss": "classical",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "古老",
    "pinyin": "gǔlǎo",
    "primary_gloss": "ancient",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "鼓舞",
    "pinyin": "gǔwǔ",
    "primary_gloss": "heartening",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "股票",
    "pinyin": "gǔpiào",
    "primary_gloss": "share",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "骨头",
    "pinyin": "gǔtou",
    "primary_gloss": "bone",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "固定",
    "pinyin": "gùdìng",
    "primary_gloss": "fixed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "固体",
    "pinyin": "gùtǐ",
    "primary_gloss": "solid",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "雇佣",
    "pinyin": "gùyōng",
    "primary_gloss": "to employ",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "挂号",
    "pinyin": "guàhào",
    "primary_gloss": "to register",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "乖",
    "pinyin": "guāi",
    "primary_gloss": "obedient",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "拐弯",
    "pinyin": "guǎiwān",
    "primary_gloss": "to turn corner",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "怪不得",
    "pinyin": "guàibude",
    "primary_gloss": "no wonder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "官",
    "pinyin": "guān",
    "primary_gloss": "official",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "关闭",
    "pinyin": "guānbì",
    "primary_gloss": "to close",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "关怀",
    "pinyin": "guānhuái",
    "primary_gloss": "care",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "观察",
    "pinyin": "guānchá",
    "primary_gloss": "to observe",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "观点",
    "pinyin": "guāndiǎn",
    "primary_gloss": "point of view",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "观念",
    "pinyin": "guānniàn",
    "primary_gloss": "notion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "管子",
    "pinyin": "guǎnzǐ",
    "primary_gloss": "tube",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "冠军",
    "pinyin": "guànjūn",
    "primary_gloss": "champion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "罐头",
    "pinyin": "guàntou",
    "primary_gloss": "tin",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "光滑",
    "pinyin": "guānghua",
    "primary_gloss": "glossy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "光临",
    "pinyin": "guānglín",
    "primary_gloss": "welcome",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "光明",
    "pinyin": "guāngmíng",
    "primary_gloss": "light",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "光盘",
    "pinyin": "guāngpán",
    "primary_gloss": "compact disc",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "光荣",
    "pinyin": "guāngróng",
    "primary_gloss": "honor",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "广场",
    "pinyin": "guǎngchǎng",
    "primary_gloss": "public square",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "广大",
    "pinyin": "guǎngdà",
    "primary_gloss": "vast",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "广泛",
    "pinyin": "guǎngfàn",
    "primary_gloss": "extensive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "规矩",
    "pinyin": "guīju",
    "primary_gloss": "standard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law",
      "daily_life"
    ]
  },
  {
    "surface_form": "规律",
    "pinyin": "guīlǜ",
    "primary_gloss": "law",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "规模",
    "pinyin": "guīmó",
    "primary_gloss": "scale",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "规则",
    "pinyin": "guīzé",
    "primary_gloss": "rule",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "柜台",
    "pinyin": "guìtái",
    "primary_gloss": "sales counter",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "滚",
    "pinyin": "gǔn",
    "primary_gloss": "to boil",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "锅",
    "pinyin": "guō",
    "primary_gloss": "pot",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "国籍",
    "pinyin": "guójí",
    "primary_gloss": "nationality",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "国庆节",
    "pinyin": "guóqìngjié",
    "primary_gloss": "National Day",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "果实",
    "pinyin": "guǒshí",
    "primary_gloss": "fruit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "过分",
    "pinyin": "guòfèn",
    "primary_gloss": "excessive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "过敏",
    "pinyin": "guòmǐn",
    "primary_gloss": "allergic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "过期",
    "pinyin": "guòqī",
    "primary_gloss": "overdue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "哈",
    "pinyin": "hā",
    "primary_gloss": "laughter",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "海关",
    "pinyin": "hǎiguān",
    "primary_gloss": "customs",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "海鲜",
    "pinyin": "hǎixiān",
    "primary_gloss": "seafood",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "喊",
    "pinyin": "hǎn",
    "primary_gloss": "call",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "行业",
    "pinyin": "hángyè",
    "primary_gloss": "industry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "豪华",
    "pinyin": "háohuá",
    "primary_gloss": "luxurious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "好奇",
    "pinyin": "hàoqí",
    "primary_gloss": "curious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "和平",
    "pinyin": "hépíng",
    "primary_gloss": "peace",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "何必",
    "pinyin": "hébì",
    "primary_gloss": "no need",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "何况",
    "pinyin": "hékuàng",
    "primary_gloss": "much less",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "合法",
    "pinyin": "héfǎ",
    "primary_gloss": "lawful",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "合理",
    "pinyin": "hélǐ",
    "primary_gloss": "rational",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "合同",
    "pinyin": "hétong",
    "primary_gloss": "contract",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "合影",
    "pinyin": "héyǐng",
    "primary_gloss": "joint photo",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "合作",
    "pinyin": "hézuò",
    "primary_gloss": "to cooperate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "核心",
    "pinyin": "héxīn",
    "primary_gloss": "core",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "恨",
    "pinyin": "hèn",
    "primary_gloss": "to hate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "横",
    "pinyin": "héng",
    "primary_gloss": "horizontal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "后果",
    "pinyin": "hòuguǒ",
    "primary_gloss": "consequences",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "忽视",
    "pinyin": "hūshì",
    "primary_gloss": "to neglect",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "呼吸",
    "pinyin": "hūxī",
    "primary_gloss": "to breathe",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "壶",
    "pinyin": "hú",
    "primary_gloss": "pot",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蝴蝶",
    "pinyin": "húdié",
    "primary_gloss": "butterfly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "胡说",
    "pinyin": "húshuō",
    "primary_gloss": "to talk nonsense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胡同",
    "pinyin": "hútòng",
    "primary_gloss": "lane",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胡须",
    "pinyin": "húxū",
    "primary_gloss": "beard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "糊涂",
    "pinyin": "hútu",
    "primary_gloss": "confused",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "花生",
    "pinyin": "huāshēng",
    "primary_gloss": "peanut",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "滑冰",
    "pinyin": "huábīng",
    "primary_gloss": "to skate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "划船",
    "pinyin": "huáchuán",
    "primary_gloss": "to row",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "华裔",
    "pinyin": "huáyì",
    "primary_gloss": "ethnic Chinese",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "话题",
    "pinyin": "huàtí",
    "primary_gloss": "subject",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "化学",
    "pinyin": "huàxué",
    "primary_gloss": "chemistry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "怀念",
    "pinyin": "huáiniàn",
    "primary_gloss": "to cherish memory",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "缓解",
    "pinyin": "huǎnjiě",
    "primary_gloss": "to ease",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "幻想",
    "pinyin": "huànxiǎng",
    "primary_gloss": "fantasy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "慌张",
    "pinyin": "huāngzhāng",
    "primary_gloss": "confused",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "黄瓜",
    "pinyin": "huángguā",
    "primary_gloss": "cucumber",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "黄金",
    "pinyin": "huángjīn",
    "primary_gloss": "gold",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "皇帝",
    "pinyin": "huángdì",
    "primary_gloss": "emperor",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "皇后",
    "pinyin": "huánghòu",
    "primary_gloss": "empress",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "挥",
    "pinyin": "huī",
    "primary_gloss": "to wave",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "灰",
    "pinyin": "huī",
    "primary_gloss": "ash",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "灰尘",
    "pinyin": "huīchén",
    "primary_gloss": "dust",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "灰心",
    "pinyin": "huīxīn",
    "primary_gloss": "lose heart",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "恢复",
    "pinyin": "huīfù",
    "primary_gloss": "to restore",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "汇率",
    "pinyin": "huìlǜ",
    "primary_gloss": "exchange rate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "婚礼",
    "pinyin": "hūnlǐ",
    "primary_gloss": "wedding ceremony",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships",
      "history_culture"
    ]
  },
  {
    "surface_form": "婚姻",
    "pinyin": "hūnyīn",
    "primary_gloss": "marriage",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "活跃",
    "pinyin": "huóyuè",
    "primary_gloss": "active",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "火柴",
    "pinyin": "huǒchái",
    "primary_gloss": "match",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "伙伴",
    "pinyin": "huǒbàn",
    "primary_gloss": "partner",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "基本",
    "pinyin": "jīběn",
    "primary_gloss": "basic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "机器",
    "pinyin": "jīqì",
    "primary_gloss": "machine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "激烈",
    "pinyin": "jīliè",
    "primary_gloss": "intense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "肌肉",
    "pinyin": "jīròu",
    "primary_gloss": "muscle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "及格",
    "pinyin": "jígé",
    "primary_gloss": "to pass test",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "急忙",
    "pinyin": "jímáng",
    "primary_gloss": "hastily",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "集体",
    "pinyin": "jítǐ",
    "primary_gloss": "collective",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "集中",
    "pinyin": "jízhōng",
    "primary_gloss": "to concentrate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "记录",
    "pinyin": "jìlù",
    "primary_gloss": "record",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "记忆",
    "pinyin": "jìyì",
    "primary_gloss": "memory",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "计算",
    "pinyin": "jìsuàn",
    "primary_gloss": "to calculate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "系领带",
    "pinyin": "jìlǐngdài",
    "primary_gloss": "tie necktie",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "纪录",
    "pinyin": "jìlù",
    "primary_gloss": "record",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "纪律",
    "pinyin": "jìlǜ",
    "primary_gloss": "discipline",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "纪念",
    "pinyin": "jìniàn",
    "primary_gloss": "to commemorate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "寂寞",
    "pinyin": "jìmò",
    "primary_gloss": "lonely",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "家庭",
    "pinyin": "jiātíng",
    "primary_gloss": "family",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "家务",
    "pinyin": "jiāwù",
    "primary_gloss": "household duties",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "家乡",
    "pinyin": "jiāxiāng",
    "primary_gloss": "hometown",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "嘉宾",
    "pinyin": "jiābīn",
    "primary_gloss": "honored guest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "夹子",
    "pinyin": "jiāzi",
    "primary_gloss": "clip",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "甲",
    "pinyin": "jiǎ",
    "primary_gloss": "first heavenly stem",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "假如",
    "pinyin": "jiǎrú",
    "primary_gloss": "if",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "假装",
    "pinyin": "jiǎzhuāng",
    "primary_gloss": "to pretend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "嫁",
    "pinyin": "jià",
    "primary_gloss": "to marry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "价值",
    "pinyin": "jiàzhí",
    "primary_gloss": "value",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "驾驶",
    "pinyin": "jiàshǐ",
    "primary_gloss": "to drive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "煎",
    "pinyin": "jiān",
    "primary_gloss": "to pan fry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "肩膀",
    "pinyin": "jiānbǎng",
    "primary_gloss": "shoulder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坚决",
    "pinyin": "jiānjué",
    "primary_gloss": "firm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坚强",
    "pinyin": "jiānqiáng",
    "primary_gloss": "staunch",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "艰巨",
    "pinyin": "jiānjù",
    "primary_gloss": "arduous",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "艰苦",
    "pinyin": "jiānkǔ",
    "primary_gloss": "difficult",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尖锐",
    "pinyin": "jiānruì",
    "primary_gloss": "sharp",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "捡",
    "pinyin": "jiǎn",
    "primary_gloss": "to pick up",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "简历",
    "pinyin": "jiǎnlì",
    "primary_gloss": "resume",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "简直",
    "pinyin": "jiǎnzhí",
    "primary_gloss": "simply",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "剪刀",
    "pinyin": "jiǎndāo",
    "primary_gloss": "scissors",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "健身房",
    "pinyin": "jiànshēnfáng",
    "primary_gloss": "gym",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "建立",
    "pinyin": "jiànlì",
    "primary_gloss": "to establish",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "建设",
    "pinyin": "jiànshè",
    "primary_gloss": "to build",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "建议",
    "pinyin": "jiànyì",
    "primary_gloss": "to suggest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "建筑",
    "pinyin": "jiànzhù",
    "primary_gloss": "building",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "键盘",
    "pinyin": "jiànpán",
    "primary_gloss": "keyboard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "讲究",
    "pinyin": "jiǎngjiu",
    "primary_gloss": "to pay attention to",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讲座",
    "pinyin": "jiǎngzuò",
    "primary_gloss": "course of lectures",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "降落",
    "pinyin": "jiàngluò",
    "primary_gloss": "to land",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "酱油",
    "pinyin": "jiàngyóu",
    "primary_gloss": "soy sauce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浇",
    "pinyin": "jiāo",
    "primary_gloss": "to pour",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "交换",
    "pinyin": "jiāohuàn",
    "primary_gloss": "to exchange",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "交际",
    "pinyin": "jiāojì",
    "primary_gloss": "communication",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "郊区",
    "pinyin": "jiāoqū",
    "primary_gloss": "suburbs",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "胶水",
    "pinyin": "jiāoshuǐ",
    "primary_gloss": "glue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "角度",
    "pinyin": "jiǎodù",
    "primary_gloss": "angle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "狡猾",
    "pinyin": "jiǎohuá",
    "primary_gloss": "crafty",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "教材",
    "pinyin": "jiàocái",
    "primary_gloss": "teaching material",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "教练",
    "pinyin": "jiàoliàn",
    "primary_gloss": "coach",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "教训",
    "pinyin": "jiàoxun",
    "primary_gloss": "lesson",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "接触",
    "pinyin": "jiēchù",
    "primary_gloss": "to contact",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "接待",
    "pinyin": "jiēdài",
    "primary_gloss": "to receive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "接近",
    "pinyin": "jiējìn",
    "primary_gloss": "near",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "接着",
    "pinyin": "jiēzhe",
    "primary_gloss": "then",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "阶段",
    "pinyin": "jiēduàn",
    "primary_gloss": "stage",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "结实",
    "pinyin": "jiēshi",
    "primary_gloss": "sturdy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "节",
    "pinyin": "jié",
    "primary_gloss": "festival",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "节省",
    "pinyin": "jiéshěng",
    "primary_gloss": "to save",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "结构",
    "pinyin": "jiégòu",
    "primary_gloss": "structure",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "结合",
    "pinyin": "jiéhé",
    "primary_gloss": "to combine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "结论",
    "pinyin": "jiélùn",
    "primary_gloss": "conclusion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "结账",
    "pinyin": "jiézhàng",
    "primary_gloss": "to settle account",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "解放",
    "pinyin": "jiěfàng",
    "primary_gloss": "to liberate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "解说员",
    "pinyin": "jiěshuōyuán",
    "primary_gloss": "commentator",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "届",
    "pinyin": "jiè",
    "primary_gloss": "arrive at",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "借口",
    "pinyin": "jièkǒu",
    "primary_gloss": "excuse",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "戒烟",
    "pinyin": "jièyān",
    "primary_gloss": "to quit smoking",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "戒指",
    "pinyin": "jièzhi",
    "primary_gloss": "ring",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "金属",
    "pinyin": "jīnshǔ",
    "primary_gloss": "metal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "紧",
    "pinyin": "jǐn",
    "primary_gloss": "tight",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "紧急",
    "pinyin": "jǐnjí",
    "primary_gloss": "urgent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谨慎",
    "pinyin": "jǐnshèn",
    "primary_gloss": "cautious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "进步",
    "pinyin": "jìnbù",
    "primary_gloss": "progress",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "进口",
    "pinyin": "jìnkǒu",
    "primary_gloss": "to import",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "近代",
    "pinyin": "jìndài",
    "primary_gloss": "modern times",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尽力",
    "pinyin": "jìnlì",
    "primary_gloss": "to strive hard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "尽量",
    "pinyin": "jìnliàng",
    "primary_gloss": "as much as possible",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "精力",
    "pinyin": "jīnglì",
    "primary_gloss": "energy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "经典",
    "pinyin": "jīngdiǎn",
    "primary_gloss": "classics",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "经营",
    "pinyin": "jīngyíng",
    "primary_gloss": "to operate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts",
      "daily_life"
    ]
  },
  {
    "surface_form": "景色",
    "pinyin": "jǐngsè",
    "primary_gloss": "scenery",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "敬爱",
    "pinyin": "jìngài",
    "primary_gloss": "respect",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions",
      "relationships"
    ]
  },
  {
    "surface_form": "酒吧",
    "pinyin": "jiǔbā",
    "primary_gloss": "bar",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "救",
    "pinyin": "jiù",
    "primary_gloss": "to save",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "救护车",
    "pinyin": "jiùhùchē",
    "primary_gloss": "ambulance",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "舅舅",
    "pinyin": "jiùjiu",
    "primary_gloss": "uncle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "居然",
    "pinyin": "jūrán",
    "primary_gloss": "unexpectedly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "桔子",
    "pinyin": "júzi",
    "primary_gloss": "tangerine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "举",
    "pinyin": "jǔ",
    "primary_gloss": "to lift",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "具备",
    "pinyin": "jùbèi",
    "primary_gloss": "to possess",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "具体",
    "pinyin": "jùtǐ",
    "primary_gloss": "concrete",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "巨大",
    "pinyin": "jùdà",
    "primary_gloss": "huge",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "聚会",
    "pinyin": "jùhuì",
    "primary_gloss": "party",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "俱乐部",
    "pinyin": "jùlèbù",
    "primary_gloss": "club",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "据说",
    "pinyin": "jùshuō",
    "primary_gloss": "reportedly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "捐",
    "pinyin": "juān",
    "primary_gloss": "to donate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "卷",
    "pinyin": "juǎn",
    "primary_gloss": "to roll",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "决赛",
    "pinyin": "juésài",
    "primary_gloss": "finals",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "决心",
    "pinyin": "juéxīn",
    "primary_gloss": "determination",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "绝对",
    "pinyin": "juéduì",
    "primary_gloss": "absolute",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "角色",
    "pinyin": "juésè",
    "primary_gloss": "role",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "军事",
    "pinyin": "jūnshì",
    "primary_gloss": "military",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "均匀",
    "pinyin": "jūnyún",
    "primary_gloss": "even",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "卡车",
    "pinyin": "kǎchē",
    "primary_gloss": "truck",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "开发",
    "pinyin": "kāifā",
    "primary_gloss": "to develop",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "开放",
    "pinyin": "kāifàng",
    "primary_gloss": "to open",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "开幕式",
    "pinyin": "kāimùshì",
    "primary_gloss": "opening ceremony",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "开心",
    "pinyin": "kāixīn",
    "primary_gloss": "happy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "砍",
    "pinyin": "kǎn",
    "primary_gloss": "to chop",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "看不起",
    "pinyin": "kànbuqǐ",
    "primary_gloss": "to despise",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "看来",
    "pinyin": "kànlai",
    "primary_gloss": "apparently",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships",
      "daily_life"
    ]
  },
  {
    "surface_form": "抗议",
    "pinyin": "kàngyì",
    "primary_gloss": "protest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "烤鸭",
    "pinyin": "kǎoyā",
    "primary_gloss": "roast duck",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "颗",
    "pinyin": "kē",
    "primary_gloss": "classifier for small objects",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可见",
    "pinyin": "kějiàn",
    "primary_gloss": "it is clear",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可靠",
    "pinyin": "kěkào",
    "primary_gloss": "reliable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "可怕",
    "pinyin": "kěpà",
    "primary_gloss": "terrible",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "课程",
    "pinyin": "kèchéng",
    "primary_gloss": "course",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "克",
    "pinyin": "kè",
    "primary_gloss": "gram",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "克服",
    "pinyin": "kèfú",
    "primary_gloss": "to overcome",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "刻苦",
    "pinyin": "kèkǔ",
    "primary_gloss": "hardworking",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business",
      "history_culture"
    ]
  },
  {
    "surface_form": "客观",
    "pinyin": "kèguān",
    "primary_gloss": "objective",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "客厅",
    "pinyin": "kètīng",
    "primary_gloss": "living room",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "空间",
    "pinyin": "kōngjiān",
    "primary_gloss": "space",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "恐怖",
    "pinyin": "kǒngbù",
    "primary_gloss": "terror",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "空闲",
    "pinyin": "kòngxián",
    "primary_gloss": "idle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "控制",
    "pinyin": "kòngzhì",
    "primary_gloss": "control",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "口味",
    "pinyin": "kǒuwèi",
    "primary_gloss": "taste",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "夸",
    "pinyin": "kuā",
    "primary_gloss": "to boast",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "会计",
    "pinyin": "kuàijì",
    "primary_gloss": "accountant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "矿泉水",
    "pinyin": "kuàngquánshuǐ",
    "primary_gloss": "mineral water",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "辣椒",
    "pinyin": "làjiāo",
    "primary_gloss": "hot pepper",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蜡烛",
    "pinyin": "làzhú",
    "primary_gloss": "candle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "来自",
    "pinyin": "láizì",
    "primary_gloss": "to come from",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "拦",
    "pinyin": "lán",
    "primary_gloss": "to cut off",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "烂",
    "pinyin": "làn",
    "primary_gloss": "rotten",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "狼",
    "pinyin": "láng",
    "primary_gloss": "wolf",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "劳动",
    "pinyin": "láodòng",
    "primary_gloss": "work",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "劳驾",
    "pinyin": "láojià",
    "primary_gloss": "excuse me",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "老百姓",
    "pinyin": "lǎobǎixìng",
    "primary_gloss": "ordinary people",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "老板",
    "pinyin": "lǎobǎn",
    "primary_gloss": "boss",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "老实",
    "pinyin": "lǎoshi",
    "primary_gloss": "honest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "老鼠",
    "pinyin": "lǎoshǔ",
    "primary_gloss": "rat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "姥姥",
    "pinyin": "lǎolao",
    "primary_gloss": "grandmother",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "乐观",
    "pinyin": "lèguān",
    "primary_gloss": "optimistic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "雷",
    "pinyin": "léi",
    "primary_gloss": "thunder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "类",
    "pinyin": "lèi",
    "primary_gloss": "kind",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "梨",
    "pinyin": "lí",
    "primary_gloss": "pear",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "离婚",
    "pinyin": "líhūn",
    "primary_gloss": "to divorce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "厘米",
    "pinyin": "límǐ",
    "primary_gloss": "centimeter",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "礼拜天",
    "pinyin": "lǐbàitiān",
    "primary_gloss": "Sunday",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "理论",
    "pinyin": "lǐlùn",
    "primary_gloss": "theory",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "理由",
    "pinyin": "lǐyóu",
    "primary_gloss": "reason",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "粒",
    "pinyin": "lì",
    "primary_gloss": "grain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "立方",
    "pinyin": "lìfāng",
    "primary_gloss": "cube",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "立即",
    "pinyin": "lìjí",
    "primary_gloss": "immediately",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "立刻",
    "pinyin": "lìkè",
    "primary_gloss": "at once",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "力量",
    "pinyin": "lìliang",
    "primary_gloss": "strength",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "利润",
    "pinyin": "lìrùn",
    "primary_gloss": "profits",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "利息",
    "pinyin": "lìxī",
    "primary_gloss": "interest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "利益",
    "pinyin": "lìyì",
    "primary_gloss": "benefit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "利用",
    "pinyin": "lìyòng",
    "primary_gloss": "to use",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "连忙",
    "pinyin": "liánmáng",
    "primary_gloss": "promptly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "连续剧",
    "pinyin": "liánxùjù",
    "primary_gloss": "drama series",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "联合",
    "pinyin": "liánhé",
    "primary_gloss": "to unite",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "恋爱",
    "pinyin": "liànài",
    "primary_gloss": "romantic love",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "良好",
    "pinyin": "liánghǎo",
    "primary_gloss": "good",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "粮食",
    "pinyin": "liángshi",
    "primary_gloss": "grain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "了不起",
    "pinyin": "liǎobuqǐ",
    "primary_gloss": "amazing",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "临时",
    "pinyin": "línshí",
    "primary_gloss": "temporary",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "铃",
    "pinyin": "líng",
    "primary_gloss": "bell",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "零件",
    "pinyin": "língjiàn",
    "primary_gloss": "part",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "零钱",
    "pinyin": "língqián",
    "primary_gloss": "change",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "零食",
    "pinyin": "língshí",
    "primary_gloss": "snacks",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "灵活",
    "pinyin": "línghuó",
    "primary_gloss": "flexible",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "领导",
    "pinyin": "lǐngdǎo",
    "primary_gloss": "leader",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "领域",
    "pinyin": "lǐngyù",
    "primary_gloss": "field",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "流传",
    "pinyin": "liúchuán",
    "primary_gloss": "to spread",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浏览",
    "pinyin": "liúlǎn",
    "primary_gloss": "to browse",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "龙",
    "pinyin": "lóng",
    "primary_gloss": "dragon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "漏",
    "pinyin": "lòu",
    "primary_gloss": "to leak",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "露",
    "pinyin": "lù",
    "primary_gloss": "dew",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "陆地",
    "pinyin": "lùdì",
    "primary_gloss": "dry land",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "陆续",
    "pinyin": "lùxù",
    "primary_gloss": "successively",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "录取",
    "pinyin": "lùqǔ",
    "primary_gloss": "to enroll",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "录音",
    "pinyin": "lùyīn",
    "primary_gloss": "recording",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "轮流",
    "pinyin": "lúnliú",
    "primary_gloss": "to alternate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "论文",
    "pinyin": "lùnwén",
    "primary_gloss": "paper",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "逻辑",
    "pinyin": "luóji",
    "primary_gloss": "logic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "落后",
    "pinyin": "luòhòu",
    "primary_gloss": "backward",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "骂",
    "pinyin": "mà",
    "primary_gloss": "to scold",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "麦克风",
    "pinyin": "màikèfēng",
    "primary_gloss": "microphone",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "馒头",
    "pinyin": "mántou",
    "primary_gloss": "steamed bun",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "满足",
    "pinyin": "mǎnzú",
    "primary_gloss": "to satisfy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "毛",
    "pinyin": "máo",
    "primary_gloss": "hair",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "nature"
    ]
  },
  {
    "surface_form": "毛病",
    "pinyin": "máobìng",
    "primary_gloss": "fault",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "矛盾",
    "pinyin": "máodùn",
    "primary_gloss": "contradiction",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "冒险",
    "pinyin": "màoxiǎn",
    "primary_gloss": "adventure",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贸易",
    "pinyin": "màoyì",
    "primary_gloss": "trade",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "眉毛",
    "pinyin": "méimao",
    "primary_gloss": "eyebrow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "煤炭",
    "pinyin": "méitàn",
    "primary_gloss": "coal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "美术",
    "pinyin": "měishù",
    "primary_gloss": "art",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "魅力",
    "pinyin": "mèilì",
    "primary_gloss": "charm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "迷路",
    "pinyin": "mílù",
    "primary_gloss": "lost",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谜语",
    "pinyin": "míyǔ",
    "primary_gloss": "riddle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蜜蜂",
    "pinyin": "mìfēng",
    "primary_gloss": "bee",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "密切",
    "pinyin": "mìqiè",
    "primary_gloss": "close",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "秘密",
    "pinyin": "mìmì",
    "primary_gloss": "secret",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "秘书",
    "pinyin": "mìshū",
    "primary_gloss": "secretary",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "棉花",
    "pinyin": "miánhua",
    "primary_gloss": "cotton",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "面对",
    "pinyin": "miànduì",
    "primary_gloss": "to face",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "面积",
    "pinyin": "miànjī",
    "primary_gloss": "area",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "面临",
    "pinyin": "miànlín",
    "primary_gloss": "to face",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "苗条",
    "pinyin": "miáotiáo",
    "primary_gloss": "slim",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "描写",
    "pinyin": "miáoxiě",
    "primary_gloss": "to describe",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "秒",
    "pinyin": "miǎo",
    "primary_gloss": "second",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "民主",
    "pinyin": "mínzhǔ",
    "primary_gloss": "democracy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "明确",
    "pinyin": "míngquè",
    "primary_gloss": "definite",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "明显",
    "pinyin": "míngxiǎn",
    "primary_gloss": "obvious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "明信片",
    "pinyin": "míngxìnpiàn",
    "primary_gloss": "postcard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "明星",
    "pinyin": "míngxīng",
    "primary_gloss": "star",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "名牌",
    "pinyin": "míngpái",
    "primary_gloss": "famous brand",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "名片",
    "pinyin": "míngpiàn",
    "primary_gloss": "business card",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "名胜古迹",
    "pinyin": "míngshènggǔjì",
    "primary_gloss": "historic sites",
    "unit_type": "chengyu",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture",
      "daily_life"
    ]
  },
  {
    "surface_form": "命令",
    "pinyin": "mìnglìng",
    "primary_gloss": "order",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "命运",
    "pinyin": "mìngyùn",
    "primary_gloss": "fate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "摸",
    "pinyin": "mō",
    "primary_gloss": "to feel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "模仿",
    "pinyin": "mófǎng",
    "primary_gloss": "to imitate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "模糊",
    "pinyin": "móhu",
    "primary_gloss": "vague",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "摩托车",
    "pinyin": "mótuōchē",
    "primary_gloss": "motorcycle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "陌生",
    "pinyin": "mòshēng",
    "primary_gloss": "strange",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "某",
    "pinyin": "mǒu",
    "primary_gloss": "some",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "目标",
    "pinyin": "mùbiāo",
    "primary_gloss": "target",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "目录",
    "pinyin": "mùlù",
    "primary_gloss": "catalog",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "目前",
    "pinyin": "mùqián",
    "primary_gloss": "at present",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "木头",
    "pinyin": "mùtou",
    "primary_gloss": "wood",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "哪怕",
    "pinyin": "nǎpà",
    "primary_gloss": "even",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "难怪",
    "pinyin": "nánguài",
    "primary_gloss": "no wonder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "难看",
    "pinyin": "nánkàn",
    "primary_gloss": "ugly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "脑袋",
    "pinyin": "nǎodài",
    "primary_gloss": "head",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "内科",
    "pinyin": "nèikē",
    "primary_gloss": "internal medicine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "嫩",
    "pinyin": "nèn",
    "primary_gloss": "tender",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "能干",
    "pinyin": "nénggàn",
    "primary_gloss": "capable",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "能源",
    "pinyin": "néngyuán",
    "primary_gloss": "energy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "年代",
    "pinyin": "niándài",
    "primary_gloss": "era",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "年纪",
    "pinyin": "niánjì",
    "primary_gloss": "age",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "念",
    "pinyin": "niàn",
    "primary_gloss": "to read",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "宁可",
    "pinyin": "nìngkě",
    "primary_gloss": "preferably",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "牛仔裤",
    "pinyin": "niúzǎikù",
    "primary_gloss": "jeans",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浓",
    "pinyin": "nóng",
    "primary_gloss": "concentrated",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "农民",
    "pinyin": "nóngmín",
    "primary_gloss": "peasant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "农业",
    "pinyin": "nóngyè",
    "primary_gloss": "agriculture",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "女士",
    "pinyin": "nǚshì",
    "primary_gloss": "lady",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "偶然",
    "pinyin": "ǒurán",
    "primary_gloss": "occasional",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "拍",
    "pinyin": "pāi",
    "primary_gloss": "to pat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "排队",
    "pinyin": "páiduì",
    "primary_gloss": "to line up",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "排球",
    "pinyin": "páiqiú",
    "primary_gloss": "volleyball",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "派",
    "pinyin": "pài",
    "primary_gloss": "faction",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "盼望",
    "pinyin": "pànwàng",
    "primary_gloss": "to look forward",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "赔偿",
    "pinyin": "péicháng",
    "primary_gloss": "to compensate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "培养",
    "pinyin": "péiyǎng",
    "primary_gloss": "to cultivate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "travel"
    ]
  },
  {
    "surface_form": "佩服",
    "pinyin": "pèifú",
    "primary_gloss": "to admire",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "配合",
    "pinyin": "pèihé",
    "primary_gloss": "to match",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "盆",
    "pinyin": "pén",
    "primary_gloss": "basin",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "碰见",
    "pinyin": "pèngjiàn",
    "primary_gloss": "to bump into",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "披",
    "pinyin": "pī",
    "primary_gloss": "to drape",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "批",
    "pinyin": "pī",
    "primary_gloss": "to criticize",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "批准",
    "pinyin": "pīzhǔn",
    "primary_gloss": "to approve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "皮鞋",
    "pinyin": "píxié",
    "primary_gloss": "leather shoes",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "daily_life"
    ]
  },
  {
    "surface_form": "疲劳",
    "pinyin": "píláo",
    "primary_gloss": "fatigue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine",
      "daily_life"
    ]
  },
  {
    "surface_form": "匹",
    "pinyin": "pǐ",
    "primary_gloss": "classifier for horses",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "片",
    "pinyin": "piàn",
    "primary_gloss": "slice",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "片面",
    "pinyin": "piànmiàn",
    "primary_gloss": "one-sided",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "飘",
    "pinyin": "piāo",
    "primary_gloss": "to float",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "频道",
    "pinyin": "píndào",
    "primary_gloss": "frequency",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "品种",
    "pinyin": "pǐnzhǒng",
    "primary_gloss": "breed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "凭",
    "pinyin": "píng",
    "primary_gloss": "to lean",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平",
    "pinyin": "píng",
    "primary_gloss": "flat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平常",
    "pinyin": "píngcháng",
    "primary_gloss": "ordinary",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平等",
    "pinyin": "píngděng",
    "primary_gloss": "equal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平方",
    "pinyin": "píngfāng",
    "primary_gloss": "square",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平衡",
    "pinyin": "pínghéng",
    "primary_gloss": "balance",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平静",
    "pinyin": "píngjìng",
    "primary_gloss": "tranquil",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "平均",
    "pinyin": "píngjūn",
    "primary_gloss": "average",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "评价",
    "pinyin": "píngjià",
    "primary_gloss": "to evaluate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "破产",
    "pinyin": "pòchǎn",
    "primary_gloss": "bankruptcy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "破坏",
    "pinyin": "pòhuài",
    "primary_gloss": "destruction",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "迫切",
    "pinyin": "pòqiè",
    "primary_gloss": "urgent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "朴素",
    "pinyin": "pǔsù",
    "primary_gloss": "simple",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "期待",
    "pinyin": "qīdài",
    "primary_gloss": "to anticipate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "期间",
    "pinyin": "qījiān",
    "primary_gloss": "period",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "其余",
    "pinyin": "qíyú",
    "primary_gloss": "the rest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "奇迹",
    "pinyin": "qíjì",
    "primary_gloss": "miracle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "启发",
    "pinyin": "qǐfā",
    "primary_gloss": "to enlighten",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "企图",
    "pinyin": "qǐtú",
    "primary_gloss": "attempt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "企业",
    "pinyin": "qǐyè",
    "primary_gloss": "company",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "气氛",
    "pinyin": "qìfēn",
    "primary_gloss": "atmosphere",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "汽油",
    "pinyin": "qìyóu",
    "primary_gloss": "gasoline",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "牵",
    "pinyin": "qiān",
    "primary_gloss": "to pull",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "谦虚",
    "pinyin": "qiānxū",
    "primary_gloss": "modest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "签字",
    "pinyin": "qiānzì",
    "primary_gloss": "to sign",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "前途",
    "pinyin": "qiántú",
    "primary_gloss": "future",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "浅",
    "pinyin": "qiǎn",
    "primary_gloss": "shallow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "欠",
    "pinyin": "qiàn",
    "primary_gloss": "to owe",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "枪",
    "pinyin": "qiāng",
    "primary_gloss": "gun",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "强调",
    "pinyin": "qiángdiào",
    "primary_gloss": "to emphasize",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "强烈",
    "pinyin": "qiángliè",
    "primary_gloss": "intense",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "抢",
    "pinyin": "qiǎng",
    "primary_gloss": "to grab",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "悄悄",
    "pinyin": "qiāoqiāo",
    "primary_gloss": "quietly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "瞧",
    "pinyin": "qiáo",
    "primary_gloss": "to look at",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "巧妙",
    "pinyin": "qiǎomiào",
    "primary_gloss": "ingenious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "切",
    "pinyin": "qiē",
    "primary_gloss": "to cut",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亲爱",
    "pinyin": "qīnài",
    "primary_gloss": "Dear",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "亲切",
    "pinyin": "qīnqiè",
    "primary_gloss": "cordial",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "亲自",
    "pinyin": "qīnzì",
    "primary_gloss": "personally",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "侵略",
    "pinyin": "qīnlvè",
    "primary_gloss": "invasion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "勤奋",
    "pinyin": "qínfèn",
    "primary_gloss": "hardworking",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business",
      "history_culture"
    ]
  },
  {
    "surface_form": "勤劳",
    "pinyin": "qínláo",
    "primary_gloss": "industrious",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "青",
    "pinyin": "qīng",
    "primary_gloss": "green",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "青少年",
    "pinyin": "qīngshàonián",
    "primary_gloss": "adolescent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "轻视",
    "pinyin": "qīngshì",
    "primary_gloss": "contempt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "青春",
    "pinyin": "qīngchūn",
    "primary_gloss": "youth",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "清淡",
    "pinyin": "qīngdàn",
    "primary_gloss": "light",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "情景",
    "pinyin": "qíngjǐng",
    "primary_gloss": "scene",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "情绪",
    "pinyin": "qíngxù",
    "primary_gloss": "mood",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions"
    ]
  },
  {
    "surface_form": "请求",
    "pinyin": "qǐngqiú",
    "primary_gloss": "request",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "庆祝",
    "pinyin": "qìngzhù",
    "primary_gloss": "to celebrate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "球迷",
    "pinyin": "qiúmí",
    "primary_gloss": "sports fan",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "趋势",
    "pinyin": "qūshì",
    "primary_gloss": "trend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "娶",
    "pinyin": "qǔ",
    "primary_gloss": "take a wife",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "取消",
    "pinyin": "qǔxiāo",
    "primary_gloss": "to cancel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "去世",
    "pinyin": "qùshì",
    "primary_gloss": "to pass away",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "圈",
    "pinyin": "quān",
    "primary_gloss": "circle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "全面",
    "pinyin": "quánmiàn",
    "primary_gloss": "comprehensive",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "权力",
    "pinyin": "quánlì",
    "primary_gloss": "power",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "权利",
    "pinyin": "quánlì",
    "primary_gloss": "right",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "劝",
    "pinyin": "quàn",
    "primary_gloss": "to advise",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "缺乏",
    "pinyin": "quēfá",
    "primary_gloss": "lack",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "确定",
    "pinyin": "quèdìng",
    "primary_gloss": "to determine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "确认",
    "pinyin": "quèrèn",
    "primary_gloss": "to confirm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "燃烧",
    "pinyin": "ránshāo",
    "primary_gloss": "combustion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "绕",
    "pinyin": "rào",
    "primary_gloss": "to wind",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "热烈",
    "pinyin": "rèliè",
    "primary_gloss": "warm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "人口",
    "pinyin": "rénkǒu",
    "primary_gloss": "population",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "人类",
    "pinyin": "rénlèi",
    "primary_gloss": "mankind",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "人生",
    "pinyin": "rénshēng",
    "primary_gloss": "life",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "人物",
    "pinyin": "rénwù",
    "primary_gloss": "character",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "人选",
    "pinyin": "rénxuǎn",
    "primary_gloss": "candidate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "仁慈",
    "pinyin": "rénci",
    "primary_gloss": "merciful",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "认可",
    "pinyin": "rènkě",
    "primary_gloss": "to approve",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "仍",
    "pinyin": "réng",
    "primary_gloss": "still",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "绒",
    "pinyin": "róng",
    "primary_gloss": "velvet",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "容纳",
    "pinyin": "róngnà",
    "primary_gloss": "to contain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "容许",
    "pinyin": "rónghǔ",
    "primary_gloss": "to allow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "荣誉",
    "pinyin": "róngyù",
    "primary_gloss": "honor",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "日期",
    "pinyin": "rìqī",
    "primary_gloss": "date",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "日常",
    "pinyin": "rìcháng",
    "primary_gloss": "daily",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "日益",
    "pinyin": "rìyì",
    "primary_gloss": "increasingly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "music_arts"
    ]
  },
  {
    "surface_form": "如",
    "pinyin": "rú",
    "primary_gloss": "if",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "如此",
    "pinyin": "rúcǐ",
    "primary_gloss": "like this",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "如何",
    "pinyin": "rúhé",
    "primary_gloss": "how",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "如今",
    "pinyin": "rújīn",
    "primary_gloss": "nowadays",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "如同",
    "pinyin": "rútóng",
    "primary_gloss": "like",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "弱",
    "pinyin": "ruò",
    "primary_gloss": "weak",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "撒",
    "pinyin": "sā",
    "primary_gloss": "to scatter",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "daily_life"
    ]
  },
  {
    "surface_form": "洒",
    "pinyin": "sǎ",
    "primary_gloss": "to sprinkle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "赛事",
    "pinyin": "sàishì",
    "primary_gloss": "sporting event",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "塞",
    "pinyin": "sāi",
    "primary_gloss": "to block",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "三角形",
    "pinyin": "sānjiǎoxíng",
    "primary_gloss": "triangle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "散文",
    "pinyin": "sǎnwén",
    "primary_gloss": "prose",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "搔",
    "pinyin": "sāo",
    "primary_gloss": "to scratch",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "扫",
    "pinyin": "sǎo",
    "primary_gloss": "to sweep",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "色",
    "pinyin": "sè",
    "primary_gloss": "color",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "色彩",
    "pinyin": "sècǎi",
    "primary_gloss": "color",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "杀",
    "pinyin": "shā",
    "primary_gloss": "to kill",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "沙漠",
    "pinyin": "shāmò",
    "primary_gloss": "desert",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "沙滩",
    "pinyin": "shātān",
    "primary_gloss": "sandy beach",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "傻",
    "pinyin": "shǎ",
    "primary_gloss": "silly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "晒",
    "pinyin": "shài",
    "primary_gloss": "to sun",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "山",
    "pinyin": "shān",
    "primary_gloss": "mountain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine",
      "nature"
    ]
  },
  {
    "surface_form": "山脉",
    "pinyin": "shānmài",
    "primary_gloss": "mountain range",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "删除",
    "pinyin": "shānchú",
    "primary_gloss": "to delete",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "闪",
    "pinyin": "shǎn",
    "primary_gloss": "to dodge",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "闪电",
    "pinyin": "shǎndiàn",
    "primary_gloss": "lightning",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "伤",
    "pinyin": "shāng",
    "primary_gloss": "to hurt",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "商业",
    "pinyin": "shāngyè",
    "primary_gloss": "commerce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "商人",
    "pinyin": "shāngrén",
    "primary_gloss": "merchant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "商务",
    "pinyin": "shāngwù",
    "primary_gloss": "business",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel",
      "work_business"
    ]
  },
  {
    "surface_form": "伤害",
    "pinyin": "shānghài",
    "primary_gloss": "to harm",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "尚",
    "pinyin": "shàng",
    "primary_gloss": "still",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "上课",
    "pinyin": "shàngkè",
    "primary_gloss": "to attend class",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上来",
    "pinyin": "shànglái",
    "primary_gloss": "to come up",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上升",
    "pinyin": "shàngshēng",
    "primary_gloss": "to go up",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上学",
    "pinyin": "shàngxué",
    "primary_gloss": "to attend school",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上衣",
    "pinyin": "shàngyī",
    "primary_gloss": "jacket",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上面",
    "pinyin": "shàngmiàn",
    "primary_gloss": "above",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上次",
    "pinyin": "shàngcì",
    "primary_gloss": "last time",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "上司",
    "pinyin": "shàngsi",
    "primary_gloss": "boss",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "上汽",
    "pinyin": "shàngqì",
    "primary_gloss": "vehicle",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "伤口",
    "pinyin": "shāngkǒu",
    "primary_gloss": "wound",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "商品",
    "pinyin": "shāngpǐn",
    "primary_gloss": "commodity",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "赏",
    "pinyin": "shǎng",
    "primary_gloss": "to appreciate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "烧",
    "pinyin": "shāo",
    "primary_gloss": "to burn",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "烧烤",
    "pinyin": "shāokǎo",
    "primary_gloss": "grilling",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "稍",
    "pinyin": "shāo",
    "primary_gloss": "slightly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "梢",
    "pinyin": "shāo",
    "primary_gloss": "tip",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "勺",
    "pinyin": "sháo",
    "primary_gloss": "spoon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "绍",
    "pinyin": "shào",
    "primary_gloss": "to introduce",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "少女",
    "pinyin": "shàonǚ",
    "primary_gloss": "young woman",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "少年",
    "pinyin": "shàonián",
    "primary_gloss": "youth",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "稍后",
    "pinyin": "shàohòu",
    "primary_gloss": "later",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "舍",
    "pinyin": "shě",
    "primary_gloss": "house",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "舍不得",
    "pinyin": "shěbude",
    "primary_gloss": "reluctant",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions",
      "daily_life"
    ]
  },
  {
    "surface_form": "舍得",
    "pinyin": "shěde",
    "primary_gloss": "willing to part with",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "emotions",
      "health_medicine"
    ]
  },
  {
    "surface_form": "社团",
    "pinyin": "shètuán",
    "primary_gloss": "association",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "设",
    "pinyin": "shè",
    "primary_gloss": "to set up",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "设施",
    "pinyin": "shèshī",
    "primary_gloss": "facility",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "设想",
    "pinyin": "shèxiǎng",
    "primary_gloss": "to imagine",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "射击",
    "pinyin": "shèjī",
    "primary_gloss": "to shoot",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "蛇",
    "pinyin": "shé",
    "primary_gloss": "snake",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "舌头",
    "pinyin": "shétou",
    "primary_gloss": "tongue",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "慑",
    "pinyin": "shè",
    "primary_gloss": "to intimidate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "摄氏度",
    "pinyin": "shèshìdù",
    "primary_gloss": "degrees Celsius",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "摄像",
    "pinyin": "shèxiàng",
    "primary_gloss": "video recording",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "摄影",
    "pinyin": "shèyǐng",
    "primary_gloss": "photography",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "特",
    "pinyin": "tè",
    "primary_gloss": "special",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "特色",
    "pinyin": "tèsè",
    "primary_gloss": "distinctive feature",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "特殊",
    "pinyin": "tèshū",
    "primary_gloss": "special",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "特征",
    "pinyin": "tèzhēng",
    "primary_gloss": "characteristic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "涕",
    "pinyin": "tì",
    "primary_gloss": "tears",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "替",
    "pinyin": "tì",
    "primary_gloss": "to replace",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "体",
    "pinyin": "tǐ",
    "primary_gloss": "body",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "体会",
    "pinyin": "tǐhuì",
    "primary_gloss": "to experience",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "体操",
    "pinyin": "tǐcāo",
    "primary_gloss": "gymnastics",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "体质",
    "pinyin": "tǐzhì",
    "primary_gloss": "physique",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "体裁",
    "pinyin": "tǐcái",
    "primary_gloss": "literary form",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "formal",
      "written"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "体贴",
    "pinyin": "tǐtiē",
    "primary_gloss": "considerate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "体现",
    "pinyin": "tǐxiàn",
    "primary_gloss": "to embody",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "替代",
    "pinyin": "tìdài",
    "primary_gloss": "replacement",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "膛",
    "pinyin": "táng",
    "primary_gloss": "inside",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "烫",
    "pinyin": "tàng",
    "primary_gloss": "to scald",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "唐",
    "pinyin": "táng",
    "primary_gloss": "Tang Dynasty",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "塘",
    "pinyin": "táng",
    "primary_gloss": "pond",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "堂",
    "pinyin": "táng",
    "primary_gloss": "hall",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "倘若",
    "pinyin": "tǎngruò",
    "primary_gloss": "if",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "倘使",
    "pinyin": "tǎngshǐ",
    "primary_gloss": "if",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坦白",
    "pinyin": "tǎnbai",
    "primary_gloss": "frank",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坦率",
    "pinyin": "tǎnshuài",
    "primary_gloss": "frank",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "叹",
    "pinyin": "tàn",
    "primary_gloss": "to sigh",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "碳",
    "pinyin": "tàn",
    "primary_gloss": "carbon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "炭",
    "pinyin": "tàn",
    "primary_gloss": "charcoal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "滩",
    "pinyin": "tān",
    "primary_gloss": "beach",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贪",
    "pinyin": "tān",
    "primary_gloss": "greedy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "贪心",
    "pinyin": "tānxīn",
    "primary_gloss": "greedy",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "摊",
    "pinyin": "tān",
    "primary_gloss": "stall",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "瘫",
    "pinyin": "tān",
    "primary_gloss": "to be paralyzed",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坦",
    "pinyin": "tǎn",
    "primary_gloss": "level",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "叹气",
    "pinyin": "tànqì",
    "primary_gloss": "to sigh",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "汤匙",
    "pinyin": "tāngsháo",
    "primary_gloss": "spoon",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "套",
    "pinyin": "tào",
    "primary_gloss": "cover",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "逃",
    "pinyin": "táo",
    "primary_gloss": "to escape",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "逃避",
    "pinyin": "táobì",
    "primary_gloss": "to avoid",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "陶",
    "pinyin": "táo",
    "primary_gloss": "pottery",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "陶醉",
    "pinyin": "táozuì",
    "primary_gloss": "intoxicated",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "掏",
    "pinyin": "tāo",
    "primary_gloss": "to dig",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讨",
    "pinyin": "tǎo",
    "primary_gloss": "to ask",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "讨好",
    "pinyin": "tǎohǎo",
    "primary_gloss": "to curry favor",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "淘气",
    "pinyin": "táoqi",
    "primary_gloss": "naughty",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "特意",
    "pinyin": "tèyì",
    "primary_gloss": "specially",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "腾",
    "pinyin": "téng",
    "primary_gloss": "to rise",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "藤",
    "pinyin": "téng",
    "primary_gloss": "rattan",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "梯",
    "pinyin": "tī",
    "primary_gloss": "ladder",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "啼",
    "pinyin": "tí",
    "primary_gloss": "to cry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提",
    "pinyin": "tí",
    "primary_gloss": "to carry",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "提案",
    "pinyin": "tí'àn",
    "primary_gloss": "proposal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提笔",
    "pinyin": "tíbǐ",
    "primary_gloss": "to pick up pen",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提及",
    "pinyin": "tíjí",
    "primary_gloss": "to mention",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提取",
    "pinyin": "tíqǔ",
    "primary_gloss": "to withdraw",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提出",
    "pinyin": "tíchū",
    "primary_gloss": "to put forward",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提议",
    "pinyin": "tíyì",
    "primary_gloss": "to suggest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "提交",
    "pinyin": "tíjiāo",
    "primary_gloss": "to submit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "题目",
    "pinyin": "tímù",
    "primary_gloss": "topic",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "棠",
    "pinyin": "táng",
    "primary_gloss": "wild plum",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "瑭",
    "pinyin": "táng",
    "primary_gloss": "jade-like stone",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "铰",
    "pinyin": "jiǎo",
    "primary_gloss": "hinge",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "淌",
    "pinyin": "tǎng",
    "primary_gloss": "to flow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "磕",
    "pinyin": "kē",
    "primary_gloss": "to bump",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "坑",
    "pinyin": "kēng",
    "primary_gloss": "pit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "铜",
    "pinyin": "tóng",
    "primary_gloss": "copper",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "桶",
    "pinyin": "tǒng",
    "primary_gloss": "barrel",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "童",
    "pinyin": "tóng",
    "primary_gloss": "child",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "瞳",
    "pinyin": "tóng",
    "primary_gloss": "pupil (of eye)",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "统",
    "pinyin": "tǒng",
    "primary_gloss": "to unite",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "统一",
    "pinyin": "tǒngyī",
    "primary_gloss": "unified",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "统计",
    "pinyin": "tǒngjì",
    "primary_gloss": "statistics",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "痛",
    "pinyin": "tòng",
    "primary_gloss": "pain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "痛苦",
    "pinyin": "tòngkǔ",
    "primary_gloss": "pain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "痛快",
    "pinyin": "tòngkuai",
    "primary_gloss": "thoroughly",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通",
    "pinyin": "tōng",
    "primary_gloss": "to pass",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通常",
    "pinyin": "tōngcháng",
    "primary_gloss": "usually",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通道",
    "pinyin": "tōngdào",
    "primary_gloss": "passage",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通俗",
    "pinyin": "tōngsú",
    "primary_gloss": "popular",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通晓",
    "pinyin": "tōngxiǎo",
    "primary_gloss": "to know well",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通话",
    "pinyin": "tōnghuà",
    "primary_gloss": "conversation",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通风",
    "pinyin": "tōngfēng",
    "primary_gloss": "ventilation",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "通行",
    "pinyin": "tōngxíng",
    "primary_gloss": "to pass",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通讯",
    "pinyin": "tōngxùn",
    "primary_gloss": "news",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通电",
    "pinyin": "tōngdiàn",
    "primary_gloss": "to be connected",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "通透",
    "pinyin": "tōngtòu",
    "primary_gloss": "light",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "通宵",
    "pinyin": "tōngxiāo",
    "primary_gloss": "all night",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "统治",
    "pinyin": "tǒngzhì",
    "primary_gloss": "to rule",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "同",
    "pinyin": "tóng",
    "primary_gloss": "same",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "同样",
    "pinyin": "tóngyàng",
    "primary_gloss": "same",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "同伴",
    "pinyin": "tóngbàn",
    "primary_gloss": "companion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "history_culture"
    ]
  },
  {
    "surface_form": "同时",
    "pinyin": "tóngshí",
    "primary_gloss": "at same time",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "同胞",
    "pinyin": "tóngbāo",
    "primary_gloss": "compatriot",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "同步",
    "pinyin": "tóngbù",
    "primary_gloss": "synchronized",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "头",
    "pinyin": "tóu",
    "primary_gloss": "head",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "头脑",
    "pinyin": "tóunǎo",
    "primary_gloss": "mind",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature"
    ]
  },
  {
    "surface_form": "头条",
    "pinyin": "tóutiáo",
    "primary_gloss": "headline",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "投",
    "pinyin": "tóu",
    "primary_gloss": "to throw",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "投资",
    "pinyin": "tóuzī",
    "primary_gloss": "investment",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "work_business"
    ]
  },
  {
    "surface_form": "投诉",
    "pinyin": "tóusù",
    "primary_gloss": "to complain",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "投票",
    "pinyin": "tóupiào",
    "primary_gloss": "to vote",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "投降",
    "pinyin": "tóuxiáng",
    "primary_gloss": "to surrender",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "投掷",
    "pinyin": "tóuzhì",
    "primary_gloss": "to throw",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "投机",
    "pinyin": "tóujī",
    "primary_gloss": "speculation",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "透",
    "pinyin": "tòu",
    "primary_gloss": "to penetrate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "透亮",
    "pinyin": "tòuliàng",
    "primary_gloss": "bright",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "politics_law"
    ]
  },
  {
    "surface_form": "透露",
    "pinyin": "tòulù",
    "primary_gloss": "to reveal",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "透明",
    "pinyin": "tòumíng",
    "primary_gloss": "transparent",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "透视",
    "pinyin": "tòushì",
    "primary_gloss": "perspective",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "土",
    "pinyin": "tǔ",
    "primary_gloss": "earth",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "土地",
    "pinyin": "tǔdì",
    "primary_gloss": "land",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "土豆",
    "pinyin": "tǔdòu",
    "primary_gloss": "potato",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "土壤",
    "pinyin": "tǔrǎng",
    "primary_gloss": "soil",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "history_culture"
    ]
  },
  {
    "surface_form": "吐",
    "pinyin": "tǔ",
    "primary_gloss": "to spit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "兔",
    "pinyin": "tù",
    "primary_gloss": "rabbit",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "图",
    "pinyin": "tú",
    "primary_gloss": "picture",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "图案",
    "pinyin": "túàn",
    "primary_gloss": "design",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "图纸",
    "pinyin": "túzhǐ",
    "primary_gloss": "blueprint",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "technology"
    ]
  },
  {
    "surface_form": "图形",
    "pinyin": "túxíng",
    "primary_gloss": "figure",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "图像",
    "pinyin": "túxiàng",
    "primary_gloss": "image",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "图书",
    "pinyin": "túshū",
    "primary_gloss": "books",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "nature",
      "politics_law"
    ]
  },
  {
    "surface_form": "涂",
    "pinyin": "tú",
    "primary_gloss": "to smear",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine",
      "history_culture"
    ]
  },
  {
    "surface_form": "涂料",
    "pinyin": "túliào",
    "primary_gloss": "coating",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine",
      "history_culture"
    ]
  },
  {
    "surface_form": "退",
    "pinyin": "tuì",
    "primary_gloss": "to retreat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "退休",
    "pinyin": "tuìxiū",
    "primary_gloss": "to retire",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "退出",
    "pinyin": "tuìchū",
    "primary_gloss": "to withdraw",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "退烧",
    "pinyin": "tuìshāo",
    "primary_gloss": "to bring down fever",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "health_medicine"
    ]
  },
  {
    "surface_form": "退步",
    "pinyin": "tuìbù",
    "primary_gloss": "to regress",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "退化",
    "pinyin": "tuìhuà",
    "primary_gloss": "to degenerate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "退缩",
    "pinyin": "tuìsuō",
    "primary_gloss": "to shrink back",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "退避",
    "pinyin": "tuìbì",
    "primary_gloss": "to retreat",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking",
      "health_medicine"
    ]
  },
  {
    "surface_form": "褪",
    "pinyin": "tuì",
    "primary_gloss": "to fade",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吞",
    "pinyin": "tūn",
    "primary_gloss": "to swallow",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吞并",
    "pinyin": "tūnbìng",
    "primary_gloss": "to annex",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "吞噬",
    "pinyin": "tūnshì",
    "primary_gloss": "to devour",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "屯",
    "pinyin": "tún",
    "primary_gloss": "to store",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "沌",
    "pinyin": "dùn",
    "primary_gloss": "turbid",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "囤",
    "pinyin": "tún",
    "primary_gloss": "to hoard",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "臀",
    "pinyin": "tuán",
    "primary_gloss": "buttocks",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "团",
    "pinyin": "tuán",
    "primary_gloss": "group",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "团圆",
    "pinyin": "tuányuán",
    "primary_gloss": "reunion",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "团队",
    "pinyin": "tuánduì",
    "primary_gloss": "team",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "food_cooking"
    ]
  },
  {
    "surface_form": "团结",
    "pinyin": "tuánjié",
    "primary_gloss": "unity",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "团体",
    "pinyin": "tuántǐ",
    "primary_gloss": "organization",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "团聚",
    "pinyin": "tuánjù",
    "primary_gloss": "to reunite",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推广",
    "pinyin": "tuīguǎng",
    "primary_gloss": "to promote",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推荐",
    "pinyin": "tuījiàn",
    "primary_gloss": "to recommend",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推进",
    "pinyin": "tuījìn",
    "primary_gloss": "to promote",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推动",
    "pinyin": "tuīdòng",
    "primary_gloss": "to promote",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "travel"
    ]
  },
  {
    "surface_form": "推销",
    "pinyin": "tuīxiāo",
    "primary_gloss": "to push sales",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推测",
    "pinyin": "tuīcè",
    "primary_gloss": "to infer",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推拉",
    "pinyin": "tuīlā",
    "primary_gloss": "push and pull",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "推理",
    "pinyin": "tuīlǐ",
    "primary_gloss": "deduction",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "relationships"
    ]
  },
  {
    "surface_form": "推算",
    "pinyin": "tuīsuàn",
    "primary_gloss": "to calculate",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "火燎",
    "pinyin": "huǒliáo",
    "primary_gloss": "burned",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  },
  {
    "surface_form": "惇",
    "pinyin": "dūn",
    "primary_gloss": "honest",
    "unit_type": "word",
    "hsk_level": 5,
    "registers": [
      "neutral"
    ],
    "complexity_tier": 5,
    "fields": [
      "daily_life"
    ]
  }
];
