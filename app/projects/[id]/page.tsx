'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '../../../components/AppShell';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { UserAvatar } from '../../../components/UserAvatar';
import { mockProjects, mockUsers } from '../../../lib/mockData';
import { ArrowLeft, Users, Calendar, MessageCircle, Heart, Share2, ExternalLink, CheckCircle } from 'lucide-react';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [isInterested, setIsInterested] = useState(false);
  const [showInterestForm, setShowInterestForm] = useState(false);

  const project = mockProjects.find(p => p.projectId === projectId);
  const creator = mockUsers.find(u => u.userId === project?.creatorId);

  if (!project) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-6">
            The project you're looking for doesn't exist.
          </p>
          <PrimaryButton onClick={() => window.location.href = '/projects'}>
            Back to Projects
          </PrimaryButton>
        </div>
      </AppShell>
    );
  }

  const handleExpressInterest = () => {
    setIsInterested(true);
    setShowInterestForm(false);
    // In a real app, this would send a notification to the project creator
    alert('Interest expressed! The project creator will be notified.');
  };

  const handleShareProject = () => {
    const shareText = `Check out this project on SkillBloom: ${project.title}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'SkillBloom Project',
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Project link copied to clipboard!');
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => window.location.href = '/projects'}
          className="flex items-center space-x-2 text-primary hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        {/* Project Header */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-2">
                  <UserAvatar user={creator} variant="small" />
                  <span className="text-sm text-gray-600">
                    by {creator?.ensName || 'Anonymous'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Posted recently</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsInterested(!isInterested)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isInterested
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isInterested ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShareProject}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Required Skills */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Looking for these skills:</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Current Team</h3>
            <div className="flex items-center space-x-3">
              {project.teamMembers.map((memberId, index) => {
                const member = mockUsers.find(u => u.userId === memberId);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <UserAvatar user={member} variant="small" />
                    <span className="text-sm font-medium">
                      {member?.ensName || 'Anonymous'}
                    </span>
                  </div>
                );
              })}
              <div className="text-sm text-gray-600">
                +{Math.max(0, project.requiredSkills.length - project.teamMembers.length)} more needed
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isInterested ? (
              <PrimaryButton
                onClick={() => setShowInterestForm(true)}
                className="flex-1"
              >
                Express Interest
              </PrimaryButton>
            ) : (
              <div className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Interest Expressed</span>
              </div>
            )}
            <button className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interest Form Modal */}
        {showInterestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">Express Interest</h2>
              <p className="text-gray-600 mb-6">
                Let the project creator know why you're interested in joining this project and what skills you can contribute.
              </p>

              <textarea
                placeholder="Tell us about your relevant experience and why you'd like to join..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInterestForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <PrimaryButton
                  onClick={handleExpressInterest}
                  className="flex-1"
                >
                  Send Interest
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}

        {/* Project Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary">{project.teamMembers.length}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-sm text-gray-600">Interested</div>
          </div>
        </div>

        {/* Similar Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Similar Projects</h2>
          <div className="space-y-3">
            {mockProjects
              .filter(p => p.projectId !== projectId)
              .slice(0, 2)
              .map((similarProject) => (
                <div
                  key={similarProject.projectId}
                  className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => window.location.href = `/projects/${similarProject.projectId}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{similarProject.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {similarProject.description}
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{similarProject.teamMembers.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <div className="card bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <h3 className="text-lg font-semibold mb-3">Community Guidelines</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Be respectful and professional in all communications</p>
            <p>• Clearly communicate your availability and commitment level</p>
            <p>• Honor your commitments to the project and team</p>
            <p>• Give constructive feedback and be open to receiving it</p>
            <p>• Celebrate successes and learn from challenges together</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

