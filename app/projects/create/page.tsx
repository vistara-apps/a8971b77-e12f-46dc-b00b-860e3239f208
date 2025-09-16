'use client';

import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { ArrowLeft, Plus, X, Lightbulb, Users, Target } from 'lucide-react';

export default function CreateProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: [] as string[],
    currentSkill: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSkill = () => {
    if (formData.currentSkill.trim() && !formData.requiredSkills.includes(formData.currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, prev.currentSkill.trim()],
        currentSkill: '',
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Project created successfully! (This is a demo - in production this would save to a database)');
      setIsSubmitting(false);
      window.location.href = '/projects';
    }, 2000);
  };

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.requiredSkills.length > 0;

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

        {/* Header */}
        <div className="text-center py-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-display mb-2">Create New Project</h1>
          <p className="text-gray-600">
            Share your project idea and find collaborators to bring it to life
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div className="card">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter your project title..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Choose a clear, descriptive title that explains what your project does
            </p>
          </div>

          {/* Project Description */}
          <div className="card">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project idea, goals, and what you're trying to build..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Be specific about what problem you're solving and what technologies you plan to use
            </p>
          </div>

          {/* Required Skills */}
          <div className="card">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <label className="text-sm font-medium text-gray-700">
                Required Skills *
              </label>
            </div>

            {/* Add Skill Input */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={formData.currentSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, currentSkill: e.target.value }))}
                placeholder="e.g., React, Node.js, Python..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                disabled={!formData.currentSkill.trim()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Skills List */}
            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.requiredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600">
              Add the skills you need for your project. This will help match you with the right collaborators.
            </p>
          </div>

          {/* Project Benefits */}
          <div className="card bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Why Create a Project?</h3>
            </div>

            <div className="grid gap-3">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Find Collaborators:</strong> Connect with people who have the skills you need
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Get Feedback:</strong> Share your idea and get valuable input from the community
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Build Together:</strong> Turn your idea into reality with a supportive team
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Earn Recognition:</strong> Successful projects earn community recognition and credentials
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="card">
            <PrimaryButton
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </PrimaryButton>

            {!isFormValid && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Please fill in all required fields and add at least one required skill
              </p>
            )}
          </div>
        </form>

        {/* Tips */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Tips for a Great Project Post</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Be Specific:</strong> Clearly explain what you're building and why it matters
            </p>
            <p>
              <strong>Define Scope:</strong> Break down your project into manageable tasks and milestones
            </p>
            <p>
              <strong>Be Realistic:</strong> Choose skills that match what you're looking for and your project scope
            </p>
            <p>
              <strong>Engage Actively:</strong> Respond to interested collaborators and provide clear next steps
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

