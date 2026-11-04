export type ShapeType = 'square' | 'heart' | 'daisy' | 'lined' | 'checklist' | 'pennant' | 'bubble';

export type PatternType = 'none' | 'ruled' | 'grid' | 'dots';

export type CornerType = 'none' | 'tl' | 'tr';

export type SectionType = 'notes' | 'weekly' | 'daily' | 'diary' | 'habits';

export type ViewMode = 'both' | 'left' | 'right';

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface NoteItem {
  id: string;
  page: 'left' | 'right';
  shape: ShapeType;
  color: string;
  fontFamily: string;
  fontSize: string;
  fontColor: string;
  textAlign: 'left' | 'center' | 'right';
  corner: CornerType;
  pattern: PatternType;
  mascot?: string | null;
  text?: string;
  title?: string;
  checklist?: ChecklistItem[];
}

export interface DayPlan {
  name: string;
  date: string;
  notes: string;
}

export interface WeeklyData {
  month: string;
  range: string;
  days: DayPlan[];
  goals: ChecklistItem[];
}

export interface GoalStep {
  id: string;
  text: string;
  done: boolean;
}

export interface HabitItem {
  id: string;
  name: string;
  checks: boolean[];
}

export interface PlannerData {
  gratitudeTitle: string;
  gratitudeText: string;
  priority1: string;
  priority2: string;
  priority3: string;
  dailyDayName: string;
  dailyDayNum: string;
  dailyMonth: string;
  activeMood: string;
  activeWeather: string;
  timeline: Record<string, string>;
  diaryDate: string;
  diaryLeftText: string;
  diaryRightText: string;
  diaryPrompts: string[];
  habitMonth: string;
  goalTitle: string;
  goalDesc: string;
  goalSteps: GoalStep[];
  booksText: string;
  wishlistText: string;
  habits: HabitItem[];
}
