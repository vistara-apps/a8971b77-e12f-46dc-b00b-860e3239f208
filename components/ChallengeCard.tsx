'use client';

import { Challenge } from '../lib/types';
import { Clock, Users, Trophy } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const challengeCardVariants = cva(
  'card transition-all duration-200',
  {
    variants: {
      variant: {
        interactive: 'hover:shadow-lg cursor-pointer hover:scale-[1.02]',
      },
    },
  }
);

interface ChallengeCardProps {
  challenge: Challenge;
  variant?: 'interactive';
  onClick?: () => void;
}

export function ChallengeCard({ 
  challenge, 
  variant,
  onClick 
}: ChallengeCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'badge-success';
      case 'intermediate':
        return 'badge-warning';
      case 'advanced':
        return 'badge-info';
      default:
        return 'badge-info';
    }
  };

  return (
    <div 
      className={cn(challengeCardVariants({ variant }))}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 flex-1 pr-2">
          {challenge.title}
        </h3>
        <span className={cn('badge', getDifficultyColor(challenge.difficultyLevel))}>
          {challenge.difficultyLevel}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {challenge.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>2-4 hrs</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>124</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-accent">
          <Trophy className="w-4 h-4" />
          <span className="font-medium">+50 XP</span>
        </div>
      </div>
      
      {challenge.skillsRequired.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {challenge.skillsRequired.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-sm"
            >
              {skill}
            </span>
          ))}
          {challenge.skillsRequired.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-sm">
              +{challenge.skillsRequired.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
