import { NextRequest } from 'next/server';
import { validateFrameData, generateFrameResponse, createCredentialsFrame } from '../../../lib/frame-utils';
import { mockCredentials } from '../../../lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const frameData = await validateFrameData(request);

    if (!frameData) {
      return new Response('Invalid frame data', { status: 400 });
    }

    const { fid, buttonIndex, state } = frameData;
    let currentPage = 0;

    // Parse state if it exists
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        currentPage = parsedState.page || 0;
      } catch (error) {
        console.error('Error parsing state:', error);
      }
    }

    // Get user's credentials (in a real app, this would be from database)
    // For demo, we'll simulate some credentials for the user
    const userCredentials = mockCredentials.slice(0, Math.min(3, mockCredentials.length));

    if (buttonIndex === 1) {
      // View Details - show first credential
      if (userCredentials.length === 0) {
        return generateFrameResponse({
          image: `https://via.placeholder.com/1200x630/6B7280/FFFFFF?text=No+Credentials+Yet`,
          buttons: [
            {
              label: 'Take Challenge',
              action: 'post',
              target: '/api/frame/challenges',
            },
            {
              label: 'Start Project',
              action: 'post',
              target: '/api/frame/projects',
            },
          ],
          state: JSON.stringify({ fid, page: 'credentials', hasCredentials: false }),
        });
      }

      const credential = userCredentials[0];
      const title = `Credential: ${credential.skillName}`;
      const description = `Earned on ${new Date(credential.issuanceDate).toLocaleDateString()}`;

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/10B981/FFFFFF?text=${encodeURIComponent(title)}`,
        buttons: [
          {
            label: 'Verify on Chain',
            action: 'link',
            target: `https://basescan.org/token/${process.env.NEXT_PUBLIC_CREDENTIAL_CONTRACT_ADDRESS}`,
          },
          {
            label: 'Next Credential',
            action: 'post',
            target: '/api/frame/credentials',
          },
          {
            label: 'Share',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/credentials?fid=${fid}`,
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'credentials',
          credentialId: credential.credentialId,
          currentIndex: 0
        }),
      });
    }

    if (buttonIndex === 2) {
      // Next Credential or Take Challenge
      if (userCredentials.length === 0) {
        // No credentials, redirect to challenges
        return generateFrameResponse({
          image: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=Start+Earning+Credentials`,
          buttons: [
            {
              label: 'Browse Challenges',
              action: 'post',
              target: '/api/frame/challenges',
            },
            {
              label: 'View Profile',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/profile?fid=${fid}`,
            },
          ],
          state: JSON.stringify({ fid, page: 'credentials', action: 'start-challenge' }),
        });
      }

      // Show next credential
      const nextIndex = (currentPage + 1) % userCredentials.length;
      const credential = userCredentials[nextIndex];
      const title = `Credential: ${credential.skillName}`;
      const description = `Earned on ${new Date(credential.issuanceDate).toLocaleDateString()}`;

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/10B981/FFFFFF?text=${encodeURIComponent(title)}`,
        buttons: [
          {
            label: 'Verify on Chain',
            action: 'link',
            target: `https://basescan.org/token/${process.env.NEXT_PUBLIC_CREDENTIAL_CONTRACT_ADDRESS}`,
          },
          {
            label: 'Next Credential',
            action: 'post',
            target: '/api/frame/credentials',
          },
          {
            label: 'Share',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/credentials?fid=${fid}`,
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'credentials',
          credentialId: credential.credentialId,
          currentIndex: nextIndex
        }),
      });
    }

    if (buttonIndex === 3) {
      // Share or Start Project
      if (userCredentials.length === 0) {
        // Redirect to projects
        return generateFrameResponse({
          image: `https://via.placeholder.com/1200x630/8B5CF6/FFFFFF?text=Start+a+Project`,
          buttons: [
            {
              label: 'Create Project',
              action: 'post',
              target: '/api/frame/projects',
            },
            {
              label: 'Browse Projects',
              action: 'link',
              target: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
            },
          ],
          state: JSON.stringify({ fid, page: 'credentials', action: 'start-project' }),
        });
      }

      // Share current credential
      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/06B6D4/FFFFFF?text=Share+Your+Achievement`,
        buttons: [
          {
            label: 'Share on Farcaster',
            action: 'link',
            target: `https://warpcast.com/compose?text=I%20just%20earned%20a%20${encodeURIComponent(userCredentials[0]?.skillName || 'skill')}%20credential%20on%20SkillBloom!%20🌱&embeds[]=${process.env.NEXT_PUBLIC_BASE_URL}/credentials?fid=${fid}`,
          },
          {
            label: 'View All',
            action: 'post',
            target: '/api/frame/credentials',
          },
          {
            label: 'Back to Challenges',
            action: 'post',
            target: '/api/frame/challenges',
          },
        ],
        state: JSON.stringify({ fid, page: 'credentials', action: 'share' }),
      });
    }

    // Default: show credentials overview
    return generateFrameResponse(createCredentialsFrame(fid, userCredentials));

  } catch (error) {
    console.error('Error in credentials frame:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

