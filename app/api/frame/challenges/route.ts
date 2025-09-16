import { NextRequest } from 'next/server';
import { validateFrameData, generateFrameResponse, createChallengesFrame } from '../../../lib/frame-utils';
import { mockChallenges } from '../../../lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const frameData = await validateFrameData(request);

    if (!frameData) {
      return new Response('Invalid frame data', { status: 400 });
    }

    const { fid, buttonIndex, state } = frameData;
    let currentPage = 0;
    let selectedChallengeId = null;

    // Parse state if it exists
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        currentPage = parsedState.page || 0;
        selectedChallengeId = parsedState.challengeId;
      } catch (error) {
        console.error('Error parsing state:', error);
      }
    }

    // Handle different button actions
    if (buttonIndex === 1) {
      // View All Challenges - show first challenge
      const challenge = mockChallenges[0];
      const title = `${challenge.title} (${challenge.difficultyLevel})`;
      const description = `${challenge.description.substring(0, 100)}...`;

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=${encodeURIComponent(title)}`,
        buttons: [
          {
            label: 'Take Challenge',
            action: 'post',
            target: '/api/frame/submit',
          },
          {
            label: 'Next Challenge',
            action: 'post',
            target: '/api/frame/challenges',
          },
          {
            label: 'My Credentials',
            action: 'post',
            target: '/api/frame/credentials',
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'challenges',
          challengeId: challenge.challengeId,
          currentIndex: 0
        }),
      });
    }

    if (buttonIndex === 2) {
      // Next Challenge
      const nextIndex = (currentPage + 1) % mockChallenges.length;
      const challenge = mockChallenges[nextIndex];
      const title = `${challenge.title} (${challenge.difficultyLevel})`;
      const description = `${challenge.description.substring(0, 100)}...`;

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=${encodeURIComponent(title)}`,
        buttons: [
          {
            label: 'Take Challenge',
            action: 'post',
            target: '/api/frame/submit',
          },
          {
            label: 'Next Challenge',
            action: 'post',
            target: '/api/frame/challenges',
          },
          {
            label: 'My Credentials',
            action: 'post',
            target: '/api/frame/credentials',
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'challenges',
          challengeId: challenge.challengeId,
          currentIndex: nextIndex
        }),
      });
    }

    if (buttonIndex === 3) {
      // My Credentials
      return generateFrameResponse(createCredentialsFrame(fid, []));
    }

    // Default: show challenges overview
    const totalChallenges = mockChallenges.length;
    const title = `SkillBloom Challenges`;
    const description = `Explore ${totalChallenges} skill challenges across different difficulty levels`;

    return generateFrameResponse({
      image: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=${encodeURIComponent(title)}`,
      buttons: [
        {
          label: 'Browse Challenges',
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
      state: JSON.stringify({ fid, page: 'challenges-overview' }),
    });

  } catch (error) {
    console.error('Error in challenges frame:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

