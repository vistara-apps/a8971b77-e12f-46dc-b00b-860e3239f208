// App configuration constants
export const APP_CONFIG = {
  name: 'SkillBloom',
  tagline: 'Bloom your skills, get recognized, and collaborate on projects',
  version: '1.0.0',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;

// Skill categories
export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'UI/UX Design',
  'Product Management',
  'Marketing',
  'Writing',
  'Photography',
  'Video Editing',
] as const;

// Challenge difficulty levels
export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const;

// Submission statuses
export const SUBMISSION_STATUSES = [
  'pending',
  'approved',
  'rejected',
] as const;

// Frame action states
export const FRAME_STATES = [
  'challenges-list',
  'submit-challenge',
  'my-credentials',
] as const;

// API endpoints
export const API_ENDPOINTS = {
  challenges: '/api/challenges',
  credentials: '/api/credentials',
  projects: '/api/projects',
  submissions: '/api/submissions',
  users: '/api/users',
  frame: '/api/frame',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  user: 'skillbloom_user',
  theme: 'skillbloom_theme',
  onboarding: 'skillbloom_onboarding_complete',
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  fast: 100,
  base: 200,
  slow: 300,
} as const;

// Color palette
export const COLORS = {
  background: 'hsl(220, 24%, 96%)',
  accent: 'hsl(173, 74%, 53%)',
  primary: 'hsl(204, 94%, 50%)',
  surface: 'hsl(0, 0%, 100%)',
} as const;

// Spacing values
export const SPACING = {
  sm: '4px',
  md: '8px',
  lg: '16px',
} as const;

// Border radius values
export const RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
} as const;
