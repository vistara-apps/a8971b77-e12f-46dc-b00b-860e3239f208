import { Challenge, Credential, Project, User } from './types';

// Mock challenges data
export const mockChallenges: Challenge[] = [
  {
    challengeId: 'ch1',
    title: 'Build a React Todo App',
    description: 'Create a fully functional todo application using React hooks and local storage. Include add, edit, delete, and filter functionality.',
    skillsRequired: ['React', 'JavaScript', 'CSS'],
    difficultyLevel: 'Beginner',
    submissionGuidelines: 'Submit a GitHub repository link with a working demo and README file.',
  },
  {
    challengeId: 'ch2',
    title: 'API Design Challenge',
    description: 'Design and implement a RESTful API for a blog platform with authentication, CRUD operations, and proper error handling.',
    skillsRequired: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    difficultyLevel: 'Intermediate',
    submissionGuidelines: 'Provide API documentation, test cases, and deployment instructions.',
  },
  {
    challengeId: 'ch3',
    title: 'Machine Learning Model',
    description: 'Build a machine learning model to predict house prices using the Boston Housing dataset. Include data preprocessing and model evaluation.',
    skillsRequired: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    difficultyLevel: 'Advanced',
    submissionGuidelines: 'Submit a Jupyter notebook with detailed analysis and model performance metrics.',
  },
  {
    challengeId: 'ch4',
    title: 'Mobile App UI Design',
    description: 'Design a complete mobile app interface for a fitness tracking application with modern UI/UX principles.',
    skillsRequired: ['Figma', 'UI Design', 'UX Research'],
    difficultyLevel: 'Intermediate',
    submissionGuidelines: 'Provide Figma file with interactive prototypes and design system documentation.',
  },
  {
    challengeId: 'ch5',
    title: 'Smart Contract Development',
    description: 'Create a smart contract for a decentralized voting system with proper security measures and gas optimization.',
    skillsRequired: ['Solidity', 'Web3', 'Ethereum'],
    difficultyLevel: 'Advanced',
    submissionGuidelines: 'Submit contract code, test suite, and deployment scripts with security audit report.',
  },
];

// Mock credentials data
export const mockCredentials: Credential[] = [
  {
    credentialId: 'cred1',
    skillName: 'React Development',
    issuanceDate: '2024-01-15',
    verificationProofUrl: 'https://ipfs.io/ipfs/QmExample1',
    issuerId: 'skillbloom',
  },
  {
    credentialId: 'cred2',
    skillName: 'API Design',
    issuanceDate: '2024-01-10',
    verificationProofUrl: 'https://ipfs.io/ipfs/QmExample2',
    issuerId: 'skillbloom',
  },
  {
    credentialId: 'cred3',
    skillName: 'UI/UX Design',
    issuanceDate: '2024-01-05',
    verificationProofUrl: 'https://ipfs.io/ipfs/QmExample3',
    issuerId: 'skillbloom',
  },
  {
    credentialId: 'cred4',
    skillName: 'Smart Contracts',
    issuanceDate: '2023-12-20',
    verificationProofUrl: 'https://ipfs.io/ipfs/QmExample4',
    issuerId: 'skillbloom',
  },
  {
    credentialId: 'cred5',
    skillName: 'Data Analysis',
    issuanceDate: '2023-12-15',
    verificationProofUrl: 'https://ipfs.io/ipfs/QmExample5',
    issuerId: 'skillbloom',
  },
];

// Mock projects data
export const mockProjects: Project[] = [
  {
    projectId: 'proj1',
    title: 'DeFi Dashboard',
    description: 'A comprehensive dashboard for tracking DeFi investments across multiple protocols with real-time data and portfolio analytics.',
    requiredSkills: ['React', 'Web3', 'TypeScript', 'Chart.js'],
    creatorId: 'user1',
    teamMembers: ['user1', 'user2'],
  },
  {
    projectId: 'proj2',
    title: 'AI Content Generator',
    description: 'An AI-powered tool for generating marketing content, blog posts, and social media captions with customizable tone and style.',
    requiredSkills: ['Python', 'OpenAI API', 'Flask', 'React'],
    creatorId: 'user3',
    teamMembers: ['user3'],
  },
  {
    projectId: 'proj3',
    title: 'Sustainable Living App',
    description: 'A mobile app that helps users track their carbon footprint and provides personalized recommendations for sustainable living.',
    requiredSkills: ['React Native', 'Node.js', 'MongoDB', 'UI Design'],
    creatorId: 'user4',
    teamMembers: ['user4', 'user5', 'user6'],
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    userId: 'user1',
    farcasterId: 'fc123',
    ensName: 'alice.eth',
    profilePictureUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    skills: ['React', 'TypeScript', 'Web3'],
    credentials: [mockCredentials[0], mockCredentials[2]],
  },
  {
    userId: 'user2',
    farcasterId: 'fc456',
    ensName: 'bob.eth',
    profilePictureUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
    skills: ['Node.js', 'Python', 'API Design'],
    credentials: [mockCredentials[1], mockCredentials[4]],
  },
  {
    userId: 'user3',
    farcasterId: 'fc789',
    ensName: 'charlie.eth',
    skills: ['Machine Learning', 'Python', 'Data Science'],
    credentials: [mockCredentials[4]],
  },
];
