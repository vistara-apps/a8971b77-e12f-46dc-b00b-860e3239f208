'use client';

import { Credential } from '../lib/types';
import { Award, ExternalLink } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const credentialBadgeVariants = cva(
  'inline-flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200',
  {
    variants: {
      variant: {
        display: 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:shadow-md cursor-pointer',
      },
    },
  }
);

interface CredentialBadgeProps {
  credential: Credential;
  variant?: 'display';
  onClick?: () => void;
}

export function CredentialBadge({ 
  credential, 
  variant = 'display',
  onClick 
}: CredentialBadgeProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={cn(credentialBadgeVariants({ variant }))}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <Award className="w-3 h-3 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {credential.skillName}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(credential.issuanceDate)}
          </span>
        </div>
      </div>
      
      {credential.verificationProofUrl && (
        <button className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors duration-200">
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </button>
      )}
    </div>
  );
}
