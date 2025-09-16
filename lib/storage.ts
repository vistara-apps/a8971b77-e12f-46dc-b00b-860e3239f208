// Storage utilities for SkillBloom
// Combines IPFS for production with local storage for development

import { uploadToIPFS, createCredentialMetadata, createSubmissionMetadata, IPFSUploadResult } from './ipfs';

export interface StorageResult {
  success: boolean;
  url?: string;
  cid?: string;
  error?: string;
  localId?: string; // For local development
}

/**
 * Store submission content
 * In production: uploads to IPFS
 * In development: stores locally
 */
export async function storeSubmission(
  submissionData: {
    challengeId: string;
    challengeTitle: string;
    userAddress: string;
    submissionContent: string;
    submissionDate: string;
    files?: File[];
  }
): Promise<StorageResult> {
  try {
    // Check if we're in production (has IPFS keys)
    const isProduction = process.env.PINATA_JWT && process.env.NODE_ENV === 'production';

    if (isProduction) {
      // Production: Upload to IPFS
      const result = await createSubmissionMetadata(submissionData);

      if (result.success) {
        return {
          success: true,
          url: result.url,
          cid: result.cid,
        };
      } else {
        throw new Error(result.error || 'IPFS upload failed');
      }
    } else {
      // Development: Store locally
      const localId = `local_sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store in localStorage (in a real app, you'd use a database)
      const localData = {
        id: localId,
        ...submissionData,
        storedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        const existingSubmissions = JSON.parse(localStorage.getItem('skillbloom_submissions') || '[]');
        existingSubmissions.push(localData);
        localStorage.setItem('skillbloom_submissions', JSON.stringify(existingSubmissions));
      }

      return {
        success: true,
        url: `local://${localId}`,
        localId,
      };
    }
  } catch (error) {
    console.error('Error storing submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
    };
  }
}

/**
 * Store credential metadata
 * In production: uploads to IPFS
 * In development: stores locally
 */
export async function storeCredentialMetadata(
  credentialData: {
    skillName: string;
    issuerName: string;
    recipientAddress: string;
    issuanceDate: string;
    difficultyLevel: string;
    submissionUrl?: string;
    description?: string;
  }
): Promise<StorageResult> {
  try {
    const isProduction = process.env.PINATA_JWT && process.env.NODE_ENV === 'production';

    if (isProduction) {
      const result = await createCredentialMetadata(credentialData);

      if (result.success) {
        return {
          success: true,
          url: result.url,
          cid: result.cid,
        };
      } else {
        throw new Error(result.error || 'IPFS upload failed');
      }
    } else {
      // Development: Store locally
      const localId = `local_cred_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const localData = {
        id: localId,
        ...credentialData,
        storedAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        const existingCredentials = JSON.parse(localStorage.getItem('skillbloom_credentials') || '[]');
        existingCredentials.push(localData);
        localStorage.setItem('skillbloom_credentials', JSON.stringify(existingCredentials));
      }

      return {
        success: true,
        url: `local://${localId}`,
        localId,
      };
    }
  } catch (error) {
    console.error('Error storing credential metadata:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
    };
  }
}

/**
 * Get stored submissions (for development)
 */
export function getLocalSubmissions() {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem('skillbloom_submissions') || '[]');
  } catch (error) {
    console.error('Error getting local submissions:', error);
    return [];
  }
}

/**
 * Get stored credentials (for development)
 */
export function getLocalCredentials() {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem('skillbloom_credentials') || '[]');
  } catch (error) {
    console.error('Error getting local credentials:', error);
    return [];
  }
}

/**
 * Clear local storage (for development/testing)
 */
export function clearLocalStorage() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('skillbloom_submissions');
  localStorage.removeItem('skillbloom_credentials');
  localStorage.removeItem('skillbloom_users');
  localStorage.removeItem('skillbloom_projects');
}

