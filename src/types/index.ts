export interface Entry {
  id: number;
  type: EntryType;
  title?: string;
  content?: string;
  tags?: string[];
  data?: any;
  created_at: string;
}

export type EntryType = 
  | 'mood' 
  | 'dream' 
  | 'mantra' 
  | 'book' 
  | 'memory' 
  | 'art' 
  | 'quest' 
  | 'time' 
  | 'mirror' 
  | 'share'
  | 'thought';

export interface RPGProfile {
  id: number;
  level: number;
  xp: number;
  streak: number;
}

export interface FutureNote {
  id: number;
  title: string;
  body: string;
  deliver_at: string;
  delivered: boolean;
}

export interface MoodEntry {
  emoji: string;
  intensity: number;
  tags: string[];
  note?: string;
}

export interface DreamEntry {
  title: string;
  description: string;
  tags: string[];
  lucid: boolean;
  vividness: number;
}

export interface MantraSession {
  mantra: string;
  duration: number; // in seconds
  completed: boolean;
  focus_level: number;
}

export interface RootStackParamList {
  Home: undefined;
  Mood: undefined;
  Dream: undefined;
  Mantra: undefined;
  LifeGame: undefined;
  Book: undefined;
  Memory: undefined;
  Art: undefined;
  Quest: undefined;
  Time: undefined;
  Mirror: undefined;
  Share: undefined;
  [key: string]: undefined;
}

export interface TabParamList {
  Home: undefined;
  Capture: undefined;
  Forest: undefined;
  RPG: undefined;
  More: undefined;
  [key: string]: undefined;
}