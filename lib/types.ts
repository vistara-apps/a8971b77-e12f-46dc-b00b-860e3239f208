// User entity
export interface User {
  userId: string;
  farcasterId: string;
  ensName: string;
  profilePictureUrl?: string;
  skills: string[];
  credentials: Credential[];
}

// Credential entity
export interface Credential {
  credentialId: string;
  skillName: string;
  issuanceDate: string;
  verificationProofUrl?: string;
  issuerId: string;
}

// Challenge entity
export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  skillsRequired: string[];
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  submissionGuidelines: string;
}

// Submission entity
export interface Submission {
  submissionId: string;
  challengeId: string;
  userId: string;
  submissionContentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
}

// Project entity
export interface Project {
  projectId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  creatorId: string;
  teamMembers: string[];
}

// Frame action types
export interface FrameAction {
  type: 'post';
  state: 'challenges-list' | 'submit-challenge' | 'my-credentials';
  action: string;
  description: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
