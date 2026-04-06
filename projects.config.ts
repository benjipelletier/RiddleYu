export interface ProjectConfig {
  name: string
  displayName: string
  icon: string
  accent: string
  accentRgb: string
  tagline: string
  description: string
  tags: string[]
  enabled: boolean
}

export const projects: ProjectConfig[] = [
  {
    name: 'riddleyu',
    displayName: '谜语日',
    icon: '谜',
    accent: '#c0392b',
    accentRgb: '192, 57, 43',
    tagline: 'riddleyu',
    description: 'A daily 成语 puzzle. Decode the ancient four-character idiom from cryptic clues — one chance each day.',
    tags: ['成语', 'daily', 'puzzle'],
    enabled: true,
  },
  {
    name: 'gecijielong',
    displayName: '歌词接龙',
    icon: '龙',
    accent: '#c9a96e',
    accentRgb: '201, 169, 110',
    tagline: 'gecijielong',
    description: 'Chain Mandarin song lyrics together. Each player continues where the last left off — a flowing dragon of verse.',
    tags: ['lyrics', 'chain', 'music'],
    enabled: true,
  },
  {
    name: 'gumai',
    displayName: '古脉',
    icon: '脉',
    accent: '#C23B22',
    accentRgb: '194, 59, 34',
    tagline: 'gumai',
    description: 'Trace the pulse of classical Chinese. Explore the living network of ancient texts and their echoes through time.',
    tags: ['classical', 'texts', 'history'],
    enabled: false,
  },
  {
    name: 'tongyizuo',
    displayName: '同义词星图',
    icon: '星',
    accent: '#d9a441',
    accentRgb: '217, 164, 65',
    tagline: 'synonyms',
    description: 'Visualize the constellation of Mandarin synonyms. See how words cluster and orbit each other in semantic space.',
    tags: ['vocab', 'graph', 'visual'],
    enabled: false,
  },
  {
    name: 'geciqiao',
    displayName: '歌词桥',
    icon: '桥',
    accent: '#4fc3c3',
    accentRgb: '79, 195, 195',
    tagline: 'geciqiao',
    description: 'A bridge between songs and language learning. Study Mandarin through the lyrics of artists you love.',
    tags: ['lyrics', 'learning', 'Spotify'],
    enabled: true,
  },
  {
    name: 'zhujie',
    displayName: '注解',
    icon: '注',
    accent: '#7c6fb0',
    accentRgb: '124, 111, 176',
    tagline: 'zhujie',
    description: 'Paste any Chinese text and get rich, contextual annotations — vocabulary, grammar, culture, and cross-references.',
    tags: ['annotation', 'reading', 'AI'],
    enabled: false,
  },
  {
    name: 'jazz',
    displayName: '爵士和弦',
    icon: '♫',
    accent: '#5b8a72',
    accentRgb: '91, 138, 114',
    tagline: 'jazz',
    description: 'Explore jazz chord progressions through interactive real book analysis and harmonic visualization.',
    tags: ['jazz', 'music', 'chords'],
    enabled: false,
  },
  {
    name: 'engine',
    displayName: '知识引擎',
    icon: '引',
    accent: '#D4A853',
    accentRgb: '212, 168, 83',
    tagline: 'engine',
    description: 'A knowledge graph dashboard visualizing Chinese language learning progress across vocabulary, grammar, and semantics.',
    tags: ['dashboard', 'graph', 'analytics'],
    enabled: false,
  },
]
