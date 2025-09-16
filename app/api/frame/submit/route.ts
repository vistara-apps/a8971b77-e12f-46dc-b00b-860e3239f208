import { NextRequest } from 'next/server';
import { validateFrameData, generateFrameResponse } from '../../../lib/frame-utils';
import { mockChallenges } from '../../../lib/mockData';

export async function POST(request: NextRequest) {
  try {
    const frameData = await validateFrameData(request);

    if (!frameData) {
      return new Response('Invalid frame data', { status: 400 });
    }

    const { fid, buttonIndex, state, inputText } = frameData;
    let challengeId = null;
    let submissionStep = 'select-challenge';

    // Parse state if it exists
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        challengeId = parsedState.challengeId;
        submissionStep = parsedState.step || 'select-challenge';
      } catch (error) {
        console.error('Error parsing state:', error);
      }
    }

    // Handle different submission steps
    if (submissionStep === 'select-challenge' || !challengeId) {
      // Show challenge selection
      const challenge = mockChallenges[0]; // Default to first challenge
      const title = `Submit: ${challenge.title}`;
      const description = 'Provide your solution or link to your submission';

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/10B981/FFFFFF?text=${encodeURIComponent(title)}`,
        input: {
          text: 'Enter your solution URL or description...',
        },
        buttons: [
          {
            label: 'Submit Solution',
            action: 'post',
            target: '/api/frame/submit',
          },
          {
            label: 'Choose Different Challenge',
            action: 'post',
            target: '/api/frame/challenges',
          },
          {
            label: 'Cancel',
            action: 'post',
            target: '/api/frame/challenges',
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'submit',
          step: 'enter-solution',
          challengeId: challenge.challengeId
        }),
      });
    }

    if (submissionStep === 'enter-solution' && buttonIndex === 1) {
      // Process submission
      if (!inputText || inputText.trim().length === 0) {
        return generateFrameResponse({
          image: `https://via.placeholder.com/1200x630/EF4444/FFFFFF?text=Invalid+Submission`,
          buttons: [
            {
              label: 'Try Again',
              action: 'post',
              target: '/api/frame/submit',
            },
            {
              label: 'Back to Challenges',
              action: 'post',
              target: '/api/frame/challenges',
            },
          ],
          state: JSON.stringify({
            fid,
            page: 'submit',
            step: 'enter-solution',
            challengeId,
            error: 'empty-submission'
          }),
        });
      }

      // Simulate submission processing
      const submissionId = `sub_${Date.now()}_${fid}`;
      const challenge = mockChallenges.find(c => c.challengeId === challengeId);

      const title = 'Submission Received!';
      const description = `Your solution for "${challenge?.title}" has been submitted and is under review.`;

      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/10B981/FFFFFF?text=${encodeURIComponent(title)}`,
        buttons: [
          {
            label: 'View Status',
            action: 'post',
            target: '/api/frame/credentials',
          },
          {
            label: 'Submit Another',
            action: 'post',
            target: '/api/frame/challenges',
          },
          {
            label: 'Share Progress',
            action: 'link',
            target: `${process.env.NEXT_PUBLIC_BASE_URL}/credentials?fid=${fid}`,
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'submit',
          step: 'submitted',
          challengeId,
          submissionId,
          status: 'pending'
        }),
      });
    }

    if (buttonIndex === 2) {
      // Choose different challenge
      return generateFrameResponse({
        image: `https://via.placeholder.com/1200x630/4F46E5/FFFFFF?text=Choose+Challenge`,
        buttons: [
          {
            label: 'React Challenge',
            action: 'post',
            target: '/api/frame/submit',
          },
          {
            label: 'API Challenge',
            action: 'post',
            target: '/api/frame/submit',
          },
          {
            label: 'Back',
            action: 'post',
            target: '/api/frame/challenges',
          },
        ],
        state: JSON.stringify({
          fid,
          page: 'submit',
          step: 'select-challenge'
        }),
      });
    }

    // Default fallback
    return generateFrameResponse({
      image: `https://via.placeholder.com/1200x630/6B7280/FFFFFF?text=SkillBloom+Submit`,
      buttons: [
        {
          label: 'Start Submission',
          action: 'post',
          target: '/api/frame/submit',
        },
        {
          label: 'Back to Challenges',
          action: 'post',
          target: '/api/frame/challenges',
        },
      ],
      state: JSON.stringify({ fid, page: 'submit' }),
    });

  } catch (error) {
    console.error('Error in submit frame:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

