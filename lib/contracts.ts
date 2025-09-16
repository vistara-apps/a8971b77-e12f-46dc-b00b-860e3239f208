import { ethers } from 'ethers';

// Contract ABI (simplified for demo)
export const SKILL_CREDENTIAL_ABI = [
  // Read functions
  "function getCredential(uint256 tokenId) view returns (tuple(string skillName, string issuerName, uint256 issuanceDate, string verificationProofUrl, uint256 difficultyLevel, bool isValid))",
  "function getUserCredentials(address user) view returns (uint256[])",
  "function hasSkill(address user, string skillName) view returns (bool)",
  "function totalCredentials() view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",

  // Write functions
  "function issueCredential(address recipient, string skillName, string issuerName, string verificationProofUrl, uint256 difficultyLevel) returns (uint256)",

  // Events
  "event CredentialIssued(uint256 indexed tokenId, address indexed recipient, string skillName, uint256 difficultyLevel)",
  "event CredentialRevoked(uint256 indexed tokenId)",
];

// Contract configuration
export const CONTRACT_CONFIG = {
  address: process.env.NEXT_PUBLIC_CREDENTIAL_CONTRACT_ADDRESS || '',
  abi: SKILL_CREDENTIAL_ABI,
};

// Difficulty level mappings
export const DIFFICULTY_LEVELS = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced',
} as const;

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;

/**
 * Get contract instance
 */
export function getContract(provider?: any) {
  if (!CONTRACT_CONFIG.address) {
    throw new Error('Contract address not configured');
  }

  const signerOrProvider = provider || getDefaultProvider();
  return new ethers.Contract(
    CONTRACT_CONFIG.address,
    CONTRACT_CONFIG.abi,
    signerOrProvider
  );
}

/**
 * Get default provider for Base
 */
export function getDefaultProvider() {
  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'
  );
}

/**
 * Issue a new credential
 */
export async function issueCredential(
  recipient: string,
  skillName: string,
  issuerName: string,
  verificationProofUrl: string,
  difficultyLevel: DifficultyLevel,
  signer: ethers.Signer
) {
  const contract = getContract(signer);

  try {
    const tx = await contract.issueCredential(
      recipient,
      skillName,
      issuerName,
      verificationProofUrl,
      difficultyLevel
    );

    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error issuing credential:', error);
    throw error;
  }
}

/**
 * Get user's credentials
 */
export async function getUserCredentials(userAddress: string) {
  const contract = getContract();

  try {
    const tokenIds = await contract.getUserCredentials(userAddress);
    const credentials = [];

    for (const tokenId of tokenIds) {
      const credential = await contract.getCredential(tokenId);
      credentials.push({
        tokenId: tokenId.toString(),
        ...credential,
        difficultyLevel: DIFFICULTY_LEVELS[credential.difficultyLevel as DifficultyLevel] || 'Unknown',
      });
    }

    return credentials;
  } catch (error) {
    console.error('Error getting user credentials:', error);
    return [];
  }
}

/**
 * Check if user has a specific skill
 */
export async function hasSkill(userAddress: string, skillName: string) {
  const contract = getContract();

  try {
    return await contract.hasSkill(userAddress, skillName);
  } catch (error) {
    console.error('Error checking skill:', error);
    return false;
  }
}

/**
 * Get credential metadata
 */
export async function getCredentialMetadata(tokenId: string) {
  const contract = getContract();

  try {
    const credential = await contract.getCredential(tokenId);
    const tokenURI = await contract.tokenURI(tokenId);

    return {
      tokenId,
      ...credential,
      difficultyLevel: DIFFICULTY_LEVELS[credential.difficultyLevel as DifficultyLevel] || 'Unknown',
      tokenURI,
    };
  } catch (error) {
    console.error('Error getting credential metadata:', error);
    return null;
  }
}

/**
 * Get total number of credentials issued
 */
export async function getTotalCredentials() {
  const contract = getContract();

  try {
    const total = await contract.totalCredentials();
    return total.toString();
  } catch (error) {
    console.error('Error getting total credentials:', error);
    return '0';
  }
}

