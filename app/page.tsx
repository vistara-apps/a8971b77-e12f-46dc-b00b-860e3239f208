import { AppShell } from '../components/AppShell';
import { ChallengeCard } from '../components/ChallengeCard';
import { CredentialBadge } from '../components/CredentialBadge';
import { UserAvatar } from '../components/UserAvatar';
import { PrimaryButton } from '../components/PrimaryButton';
import { mockChallenges, mockCredentials } from '../lib/mockData';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <h1 className="text-display mb-2">SkillBloom</h1>
          <p className="text-gray-600 mb-6">
            Bloom your skills, get recognized, and collaborate on projects
          </p>
          <PrimaryButton>
            Get Started
          </PrimaryButton>
        </div>

        {/* Featured Challenges */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Featured Challenges</h2>
            <button className="text-primary text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {mockChallenges.slice(0, 3).map((challenge) => (
              <ChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                variant="interactive"
              />
            ))}
          </div>
        </section>

        {/* Recent Credentials */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Credentials</h2>
            <button className="text-primary text-sm font-medium">View All</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockCredentials.slice(0, 4).map((credential) => (
              <CredentialBadge
                key={credential.credentialId}
                credential={credential}
                variant="display"
              />
            ))}
          </div>
        </section>

        {/* Community Stats */}
        <section className="card">
          <h3 className="font-semibold mb-3">Community Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">1.2K</div>
              <div className="text-sm text-gray-600">Challenges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">5.8K</div>
              <div className="text-sm text-gray-600">Credentials</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-3">
          <button className="card text-center hover:shadow-lg transition-shadow duration-200">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-medium">Take Challenge</div>
            <div className="text-sm text-gray-600">Earn credentials</div>
          </button>
          <button className="card text-center hover:shadow-lg transition-shadow duration-200">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-medium">Start Project</div>
            <div className="text-sm text-gray-600">Find collaborators</div>
          </button>
        </section>
      </div>
    </AppShell>
  );
}
