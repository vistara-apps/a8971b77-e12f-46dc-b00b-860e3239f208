import { NextRequest } from 'next/server';

export interface FrameData {
  fid: number;
  url: string;
  messageHash: string;
  timestamp: number;
  network: number;
  buttonIndex: number;
  inputText?: string;
  state?: string;
}

export interface FrameResponse {
  image: string;
  buttons?: Array<{
    label: string;
    action?: 'post' | 'post_redirect' | 'link';
    target?: string;
  }>;
  input?: {
    text: string;
  };
  state?: string;
  postUrl?: string;
}

/**
 * Validate and parse Farcaster Frame trusted data
 */
export function validateFrameData(request: NextRequest): FrameData | null {
  try {
    const body = request.body;
    if (!body) return null;

    // In a real implementation, you'd validate the signature here
    // For now, we'll trust the data as provided by Farcaster

    const formData = request.formData();
    const trustedData = formData.get('trustedData') as string;

    if (!trustedData) return null;

    const parsedData = JSON.parse(trustedData);

    return {
      fid: parsedData.fid,
      url: parsedData.url,
      messageHash: parsedData.messageHash,
      timestamp: parsedData.timestamp,
      network: parsedData.network,
      buttonIndex: parsedData.buttonIndex || 1,
      inputText: parsedData.inputText,
      state: parsedData.state,
    };
  } catch (error) {
    console.error('Error validating frame data:', error);
    return null;
  }
}

/**
 * Generate HTML response for Farcaster Frame
 */
export function generateFrameResponse(response: FrameResponse): Response {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${response.image}" />
        ${response.buttons?.map((button, index) => `
          <meta property="fc:frame:button:${index + 1}" content="${button.label}" />
          ${button.action ? `<meta property="fc:frame:button:${index + 1}:action" content="${button.action}" />` : ''}
          ${button.target ? `<meta property="fc:frame:button:${index + 1}:target" content="${button.target}" />` : ''}
        `).join('')}
        ${response.input ? `<meta property="fc:frame:input:text" content="${response.input.text}" />` : ''}
        ${response.state ? `<meta property="fc:frame:state" content="${response.state}" />` : ''}
        ${response.postUrl ? `<meta property="fc:frame:post_url" content="${response.postUrl}" />` : ''}
        <meta property="og:image" content="${response.image}" />
      </head>
      <body>
        <img src="${response.image}" style="max-width: 100%; height: auto;" />
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

/**
 * Generate dynamic OG image URL for frames
 */
export function generateFrameImage(
  title: string,
  description: string,
  type: 'challenges' | 'credentials' | 'projects' | 'matchmaking'
): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const params = new URLSearchParams({
    title: encodeURIComponent(title),
    description: encodeURIComponent(description),
    type,
  });

  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Create frame response for challenges list
 */
export function createChallengesFrame(fid: number): FrameResponse {
  return {
    image: generateFrameImage(
      'SkillBloom Challenges',
      'Choose from our curated skill challenges',
      'challenges'
    ),
    buttons: [
      {
        label: 'View All Challenges',
        action: 'post',
        target: '/api/frame/challenges',
      },
      {
        label: 'My Credentials',
        action: 'post',
        target: '/api/frame/credentials',
      },
      {
        label: 'Start Project',
        action: 'post',
        target: '/api/frame/projects',
      },
    ],
    state: JSON.stringify({ fid, page: 'challenges' }),
  };
}

/**
 * Create frame response for credential viewing
 */
export function createCredentialsFrame(fid: number, credentials: any[]): FrameResponse {
  const credentialCount = credentials.length;
  const title = `Your Credentials (${credentialCount})`;
  const description = credentialCount > 0
    ? `You have earned ${credentialCount} verifiable credential${credentialCount > 1 ? 's' : ''}`
    : 'Complete challenges to earn your first credential!';

  return {
    image: generateFrameImage(title, description, 'credentials'),
    buttons: [
      {
        label: 'View Details',
        action: 'post',
        target: '/api/frame/credentials',
      },
      {
        label: 'Take Challenge',
        action: 'post',
        target: '/api/frame/challenges',
      },
      {
        label: 'Share',
        action: 'link',
        target: `${process.env.NEXT_PUBLIC_BASE_URL}/credentials?fid=${fid}`,
      },
    ],
    state: JSON.stringify({ fid, page: 'credentials' }),
  };
}

