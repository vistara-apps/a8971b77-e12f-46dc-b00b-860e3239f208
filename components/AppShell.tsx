'use client';

import { ReactNode } from 'react';
import { Home, Search, Bell, User } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface shadow-sm sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className="font-semibold text-lg">SkillBloom</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200">
        <div className="container py-2">
          <div className="flex justify-around">
            <button className="flex flex-col items-center py-2 px-3 text-primary">
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary transition-colors duration-200">
              <Search className="w-5 h-5 mb-1" />
              <span className="text-xs">Explore</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary transition-colors duration-200">
              <Bell className="w-5 h-5 mb-1" />
              <span className="text-xs">Notifications</span>
            </button>
            <button className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary transition-colors duration-200">
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
