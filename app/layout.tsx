import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillBloom - Bloom your skills, get recognized',
  description: 'Bloom your skills, get recognized, and collaborate on projects, powered by Base.',
  openGraph: {
    title: 'SkillBloom',
    description: 'Bloom your skills, get recognized, and collaborate on projects, powered by Base.',
    type: 'website',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/api/og',
    'fc:frame:button:1': 'View Challenges',
    'fc:frame:button:1:action': 'post',
    'fc:frame:button:1:target': '/api/frame/challenges',
    'fc:frame:button:2': 'My Credentials',
    'fc:frame:button:2:action': 'post',
    'fc:frame:button:2:target': '/api/frame/credentials',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
