export interface FieldDef {
  name: string;
  name_zh: string;
  description: string;
}

export const FIELDS: FieldDef[] = [
  { name: 'emotions', name_zh: '情感', description: 'Feelings, moods, emotional states, psychological vocabulary' },
  { name: 'daily_life', name_zh: '日常生活', description: 'Everyday activities, household items, routines, common actions' },
  { name: 'relationships', name_zh: '人际关系', description: 'Family, friends, social interactions, interpersonal dynamics' },
  { name: 'music_arts', name_zh: '音乐艺术', description: 'Music, lyrics, performance, creative arts, entertainment' },
  { name: 'food_cooking', name_zh: '饮食', description: 'Food, cooking, restaurants, flavors, ingredients' },
  { name: 'nature', name_zh: '自然', description: 'Nature, weather, animals, plants, environment, geography' },
  { name: 'travel', name_zh: '旅行', description: 'Travel, transportation, directions, places, tourism' },
  { name: 'history_culture', name_zh: '历史文化', description: 'History, traditions, cultural concepts, literature, philosophy' },
  { name: 'work_business', name_zh: '工作商务', description: 'Work, career, business, economy, professional contexts' },
  { name: 'technology', name_zh: '科技', description: 'Technology, internet, computers, science, innovation' },
  { name: 'politics_law', name_zh: '政治法律', description: 'Politics, government, law, society, public affairs' },
  { name: 'health_medicine', name_zh: '健康医疗', description: 'Health, body, medicine, fitness, wellness' },
];
