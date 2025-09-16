// IPFS integration utilities for SkillBloom

export interface IPFSUploadResult {
  cid: string;
  url: string;
  success: boolean;
  error?: string;
}

/**
 * Upload content to IPFS
 * @param content Content to upload (string, File, or Blob)
 * @returns Upload result with CID and URL
 */
export async function uploadToIPFS(content: string | File | Blob): Promise<IPFSUploadResult> {
  try {
    const formData = new FormData();

    if (typeof content === 'string') {
      // For text content, create a blob
      const blob = new Blob([content], { type: 'text/plain' });
      formData.append('file', blob, 'submission.txt');
    } else {
      formData.append('file', content);
    }

    // Using Pinata API (you'll need to set up your API keys)
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`IPFS upload failed: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      cid: result.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      success: true,
    };
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return {
      cid: '',
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Upload JSON metadata to IPFS
 * @param metadata JSON object to upload
 * @returns Upload result
 */
export async function uploadJSONToIPFS(metadata: Record<string, any>): Promise<IPFSUploadResult> {
  try {
    const jsonString = JSON.stringify(metadata, null, 2);
    return await uploadToIPFS(jsonString);
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    return {
      cid: '',
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create and upload credential metadata to IPFS
 * @param credentialData Credential information
 * @returns Upload result with metadata URL
 */
export async function createCredentialMetadata(
  credentialData: {
    skillName: string;
    issuerName: string;
    recipientAddress: string;
    issuanceDate: string;
    difficultyLevel: string;
    submissionUrl?: string;
    description?: string;
  }
): Promise<IPFSUploadResult> {
  const metadata = {
    name: `SkillBloom Credential - ${credentialData.skillName}`,
    description: `Verifiable micro-credential for ${credentialData.skillName} issued by ${credentialData.issuerName}`,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(credentialData.skillName)}&type=credentials`,
    external_url: `${process.env.NEXT_PUBLIC_BASE_URL}/credentials`,
    attributes: [
      {
        trait_type: 'Skill',
        value: credentialData.skillName,
      },
      {
        trait_type: 'Difficulty',
        value: credentialData.difficultyLevel,
      },
      {
        trait_type: 'Issuer',
        value: credentialData.issuerName,
      },
      {
        trait_type: 'Issue Date',
        value: credentialData.issuanceDate,
      },
      {
        trait_type: 'Blockchain',
        value: 'Base',
      },
    ],
    properties: {
      recipient: credentialData.recipientAddress,
      submission_url: credentialData.submissionUrl,
      issuer: credentialData.issuerName,
    },
  };

  return await uploadJSONToIPFS(metadata);
}

/**
 * Create and upload submission metadata to IPFS
 * @param submissionData Submission information
 * @returns Upload result
 */
export async function createSubmissionMetadata(
  submissionData: {
    challengeId: string;
    challengeTitle: string;
    userAddress: string;
    submissionContent: string;
    submissionDate: string;
    files?: File[];
  }
): Promise<IPFSUploadResult> {
  const metadata = {
    name: `SkillBloom Submission - ${submissionData.challengeTitle}`,
    description: `Challenge submission for ${submissionData.challengeTitle}`,
    challenge_id: submissionData.challengeId,
    user_address: submissionData.userAddress,
    submission_date: submissionData.submissionDate,
    content: submissionData.submissionContent,
    files: submissionData.files?.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })),
  };

  return await uploadJSONToIPFS(metadata);
}

/**
 * Fetch content from IPFS
 * @param cidOrUrl IPFS CID or full IPFS URL
 * @returns Fetched content
 */
export async function fetchFromIPFS(cidOrUrl: string): Promise<string> {
  try {
    // Extract CID from URL if full URL is provided
    const cid = cidOrUrl.includes('ipfs://')
      ? cidOrUrl.replace('ipfs://', '')
      : cidOrUrl.includes('/')
      ? cidOrUrl.split('/').pop() || ''
      : cidOrUrl;

    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
}

/**
 * Validate IPFS CID format
 * @param cid CID to validate
 * @returns Whether CID is valid
 */
export function isValidCID(cid: string): boolean {
  // Basic CID validation (this is simplified)
  return cid.length >= 46 && /^[a-zA-Z0-9]+$/.test(cid);
}

/**
 * Get IPFS gateway URL for a CID
 * @param cid IPFS CID
 * @returns Full IPFS gateway URL
 */
export function getIPFSUrl(cid: string): string {
  return `https://gateway.pinata.cloud/ipfs/${cid}`;
}

