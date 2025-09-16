'use client';

import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PrimaryButton } from '../../components/PrimaryButton';
import { mockProjects } from '../../lib/mockData';
import { Plus, Search, Users, Calendar, Target, Lightbulb } from 'lucide-react';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Get unique skills from projects
  const allSkills = Array.from(
    new Set(mockProjects.flatMap(project => project.requiredSkills))
  );

  // Filter projects based on search and filters
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === 'all' || project.requiredSkills.includes(selectedSkill);

    return matchesSearch && matchesSkill;
  });

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-display mb-2">Project Incubation Hub</h1>
          <p className="text-gray-600 mb-6">
            Discover projects, find collaborators, and bring your ideas to life
          </p>
          <PrimaryButton onClick={() => window.location.href = '/projects/create'}>
            <Plus className="w-4 h-4 mr-2" />
            Start New Project
          </PrimaryButton>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Skills Needed:</span>
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
            <Lightbulb className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{mockProjects.length}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
          <div className="card text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">25</div>
            <div className="text-sm text-gray-600">Collaborators</div>
          </div>
          <div className="card text-center">
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-gray-600">Launched This Month</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
            </h2>
            <div className="text-sm text-gray-600">
              {selectedSkill !== 'all' && `Looking for ${selectedSkill}`}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <PrimaryButton
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSkill('all');
                }}
              >
                Clear Filters
              </PrimaryButton>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.projectId}
                  className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => window.location.href = `/projects/${project.projectId}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex-1 pr-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{project.teamMembers.length}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.requiredSkills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.requiredSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-sm">
                          +{project.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      {project.creatorId === 'user1' ? 'You' : 'Community'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Have a project idea?</h3>
            <p className="text-gray-600 mb-4">
              Share your vision and find collaborators to bring it to life
            </p>
            <PrimaryButton onClick={() => window.location.href = '/projects/create'}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </PrimaryButton>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

