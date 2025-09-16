'use client';

import { User } from '../lib/types';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const userAvatarVariants = cva(
  'rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold',
  {
    variants: {
      variant: {
        small: 'w-8 h-8 text-sm',
        large: 'w-16 h-16 text-xl',
      },
    },
    defaultVariants: {
      variant: 'small',
    },
  }
);

interface UserAvatarProps {
  user?: Partial<User>;
  variant?: 'small' | 'large';
  className?: string;
}

export function UserAvatar({ 
  user, 
  variant = 'small',
  className 
}: UserAvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (user?.profilePictureUrl) {
    return (
      <img
        src={user.profilePictureUrl}
        alt={user.ensName || 'User avatar'}
        className={cn(userAvatarVariants({ variant }), className)}
      />
    );
  }

  return (
    <div className={cn(userAvatarVariants({ variant }), className)}>
      {getInitials(user?.ensName)}
    </div>
  );
}
