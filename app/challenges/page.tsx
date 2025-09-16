'use client';

import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { ChallengeCard } from '../../components/ChallengeCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { mockChallenges } from '../../lib/mockData';
import { Search, Filter, Trophy, Clock, Users } from 'lucide-react';

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Get unique skills from challenges
  const allSkills = Array.from(
    new Set(mockChallenges.flatMap(challenge => challenge.skillsRequired))
  );

  // Filter challenges based on search and filters
  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficultyLevel === selectedDifficulty;
    const matchesSkill = selectedSkill === 'all' || challenge.skillsRequired.includes(selectedSkill);

    return matchesSearch && matchesDifficulty && matchesSkill;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-display mb-2">Skill Challenges</h1>
          <p className="text-gray-600 mb-6">
            Complete practical challenges to earn verifiable micro-credentials
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Difficulty:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Skill:</span>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-md text-sm"
              >
                <option value="all">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card text-center">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{mockChallenges.length}</div>
            <div className="text-sm text-gray-600">Total Challenges</div>
          </div>
          <div className="card text-center">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">2-4 hrs</div>
            <div className="text-sm text-gray-600">Avg. Completion Time</div>
          </div>
          <div className="card text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-gray-600">Active Learners</div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredChallenges.length} Challenge{filteredChallenges.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-sm text-gray-600">
              {selectedDifficulty !== 'all' && `${selectedDifficulty} • `}
              {selectedSkill !== 'all' && `${selectedSkill}`}
            </div>
          </div>

          {filteredChallenges.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <PrimaryButton
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDifficulty('all');
                  setSelectedSkill('all');
                }}
              >
                Clear Filters
              </PrimaryButton>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.challengeId}
                  challenge={challenge}
                  variant="interactive"
                  onClick={() => {
                    // Navigate to challenge detail page
                    window.location.href = `/challenges/${challenge.challengeId}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to start learning?</h3>
            <p className="text-gray-600 mb-4">
              Choose a challenge that matches your skill level and start earning credentials
            </p>
            <PrimaryButton>
              Browse All Challenges
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

