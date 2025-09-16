import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'SkillBloom';
    const description = searchParams.get('description') || 'Bloom your skills, get recognized';
    const type = searchParams.get('type') || 'default';

    // Define colors based on type
    const colors = {
      challenges: { primary: '#4F46E5', accent: '#6366F1' },
      credentials: { primary: '#10B981', accent: '#34D399' },
      projects: { primary: '#8B5CF6', accent: '#A78BFA' },
      matchmaking: { primary: '#F59E0B', accent: '#FCD34D' },
      default: { primary: '#4F46E5', accent: '#6366F1' },
    };

    const colorScheme = colors[type as keyof typeof colors] || colors.default;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorScheme.primary,
            backgroundImage: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.accent} 100%)`,
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
            padding: '40px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              fontSize: '80px',
              marginBottom: '20px',
            }}
          >
            🌱
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '16px',
              maxWidth: '800px',
              lineHeight: '1.2',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              textAlign: 'center',
              opacity: 0.9,
              maxWidth: '600px',
              lineHeight: '1.4',
            }}
          >
            {description}
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '18px',
              opacity: 0.7,
            }}
          >
            SkillBloom • Powered by Base
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);

    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#4F46E5',
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
          }}
        >
          SkillBloom
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}

