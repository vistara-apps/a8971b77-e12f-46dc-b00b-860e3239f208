'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { mockChallenges } from '../../../lib/mockData';
import { ArrowLeft, Clock, Users, Trophy, CheckCircle, ExternalLink, FileText, Code } from 'lucide-react';

export default function ChallengeDetailPage() {
  const params = useParams();
  const challengeId = params.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const challenge = mockChallenges.find(c => c.challengeId === challengeId);

  if (!challenge) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-2">Challenge Not Found</h1>
          <p className="text-gray-600 mb-6">
            The challenge you're looking for doesn't exist.
          </p>
          <PrimaryButton onClick={() => window.location.href = '/challenges'}>
            Back to Challenges
          </PrimaryButton>
        </div>
      </AppShell>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'badge-success';
      case 'intermediate':
        return 'badge-warning';
      case 'advanced':
        return 'badge-info';
      default:
        return 'badge-info';
    }
  };

  const handleStartChallenge = () => {
    setIsSubmitting(true);
    // In a real app, this would navigate to a submission form
    setTimeout(() => {
      alert('Challenge submission feature coming soon! This would open a submission form.');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => window.location.href = '/challenges'}
          className="flex items-center space-x-2 text-primary hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges</span>
        </button>

        {/* Challenge Header */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`badge ${getDifficultyColor(challenge.difficultyLevel)}`}>
                  {challenge.difficultyLevel}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>2-4 hours</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>124 completed</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-accent mb-1">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">+50 XP</span>
              </div>
              <div className="text-sm text-gray-600">Reward</div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {challenge.description}
          </p>

          {/* Required Skills */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <PrimaryButton
            onClick={handleStartChallenge}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Starting Challenge...' : 'Start Challenge'}
          </PrimaryButton>
        </div>

        {/* Submission Guidelines */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Submission Guidelines</h2>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="mb-4">{challenge.submissionGuidelines}</p>

            <h3 className="text-lg font-semibold mb-3">Requirements:</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Complete all required functionality</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Include clear documentation and setup instructions</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Provide a working demo or deployment link</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Follow best practices for the technologies used</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Submission Format:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-4 h-4 text-gray-600" />
                <span className="font-medium">GitHub Repository</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Submit a link to a public GitHub repository containing your solution.
              </p>
              <div className="text-sm text-gray-500">
                Include: README.md, package.json, source code, and deployment instructions
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
          <div className="grid gap-3">
            {challenge.skillsRequired.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium">{skill} Documentation</div>
                  <div className="text-sm text-gray-600">Official documentation and guides</div>
                </div>
                <button className="text-primary hover:text-blue-600 transition-colors duration-200">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Community Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">124</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">89%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">U{i}</span>
                  </div>
                  <div>
                    <div className="font-medium">User {i}</div>
                    <div className="text-sm text-gray-600">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600 font-medium">Approved</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

