'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import { CredentialBadge } from '../../components/CredentialBadge';
import { PrimaryButton } from '../../components/PrimaryButton';
import { mockCredentials } from '../../lib/mockData';
import { Trophy, Share2, ExternalLink, Award, TrendingUp, Calendar } from 'lucide-react';

export default function CredentialsPage() {
  const [userCredentials, setUserCredentials] = useState(mockCredentials);
  const [selectedCredential, setSelectedCredential] = useState<typeof mockCredentials[0] | null>(null);

  // Calculate stats
  const totalCredentials = userCredentials.length;
  const recentCredentials = userCredentials.filter(cred => {
    const credDate = new Date(cred.issuanceDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return credDate > thirtyDaysAgo;
  }).length;

  const uniqueSkills = new Set(userCredentials.map(cred => cred.skillName)).size;

  const handleShareCredential = (credential: typeof mockCredentials[0]) => {
    const shareText = `I just earned a ${credential.skillName} credential on SkillBloom! 🌱 #SkillBloom #Web3`;
    const shareUrl = `${window.location.origin}/credentials`;

    if (navigator.share) {
      navigator.share({
        title: 'SkillBloom Credential',
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('Credential link copied to clipboard!');
    }
  };

  const handleVerifyCredential = (credential: typeof mockCredentials[0]) => {
    // In a real app, this would verify on-chain
    window.open(`https://basescan.org/token/${process.env.NEXT_PUBLIC_CREDENTIAL_CONTRACT_ADDRESS}`, '_blank');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-display mb-2">My Credentials</h1>
          <p className="text-gray-600">
            Your earned micro-credentials and skill badges
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card text-center">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{totalCredentials}</div>
            <div className="text-sm text-gray-600">Total Credentials</div>
          </div>
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{uniqueSkills}</div>
            <div className="text-sm text-gray-600">Unique Skills</div>
          </div>
          <div className="card text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">{recentCredentials}</div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
        </div>

        {/* Credentials Grid */}
        {userCredentials.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">No credentials yet</h3>
            <p className="text-gray-600 mb-6">
              Complete your first challenge to earn a verifiable micro-credential
            </p>
            <PrimaryButton onClick={() => window.location.href = '/challenges'}>
              Browse Challenges
            </PrimaryButton>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recent Credentials */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCredentials.slice(0, 6).map((credential) => (
                  <div key={credential.credentialId} className="card">
                    <CredentialBadge
                      credential={credential}
                      variant="display"
                      onClick={() => setSelectedCredential(credential)}
                    />
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleShareCredential(credential)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => handleVerifyCredential(credential)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-white hover:bg-blue-600 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Verify</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* All Credentials List */}
            <section>
              <h2 className="text-xl font-semibold mb-4">All Credentials</h2>
              <div className="space-y-3">
                {userCredentials.map((credential) => (
                  <div key={credential.credentialId} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{credential.skillName}</h3>
                          <p className="text-sm text-gray-600">
                            Issued by {credential.issuerId} on {new Date(credential.issuanceDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleShareCredential(credential)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleVerifyCredential(credential)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Keep Learning!</h3>
            <p className="text-gray-600 mb-4">
              Earn more credentials by completing additional challenges
            </p>
            <PrimaryButton onClick={() => window.location.href = '/challenges'}>
              Browse More Challenges
            </PrimaryButton>
          </div>
        </div>

        {/* Credential Detail Modal */}
        {selectedCredential && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold mb-2">{selectedCredential.skillName}</h2>
                <p className="text-gray-600">
                  Issued on {new Date(selectedCredential.issuanceDate).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Issuer:</span>
                  <span className="font-medium">{selectedCredential.issuerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credential ID:</span>
                  <span className="font-mono text-sm">{selectedCredential.credentialId.slice(0, 8)}...</span>
                </div>
                {selectedCredential.verificationProofUrl && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verification:</span>
                    <a
                      href={selectedCredential.verificationProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-600 font-medium"
                    >
                      View Proof
                    </a>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleShareCredential(selectedCredential)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => handleVerifyCredential(selectedCredential)}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white hover:bg-blue-600 rounded-lg font-medium transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedCredential(null)}
                className="w-full mt-3 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

