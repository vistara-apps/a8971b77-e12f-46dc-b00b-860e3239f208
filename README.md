# SkillBloom - Base MiniApp

Bloom your skills, get recognized, and collaborate on projects, powered by Base.

## Features

- **Verifiable Micro-Credentials**: Earn on-chain verifiable credentials through skill challenges
- **Practical Skill Challenges**: Curated real-world tasks to practice and showcase skills
- **Skill-Based Matchmaking**: Connect with collaborators based on specific skill requirements
- **Project Incubation Hub**: Post project ideas and find co-founders/contributors
- **Farcaster Frame Integration**: Social discovery and interaction through Farcaster frames
- **IPFS Storage**: Decentralized storage for submissions and metadata

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Smart Contracts**: Solidity with OpenZeppelin
- **Storage**: IPFS (Pinata) for decentralized content
- **Styling**: Tailwind CSS with custom design system
- **Language**: TypeScript
- **Components**: Custom component library with class-variance-authority

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillbloom-miniapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL
   - `PINATA_JWT`: Pinata JWT for IPFS storage (optional for development)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── api/                    # API Routes
│   │   ├── frame/             # Farcaster Frame endpoints
│   │   │   ├── challenges/    # Challenge frame interactions
│   │   │   ├── submit/        # Submission frame interactions
│   │   │   └── credentials/   # Credential frame interactions
│   │   └── og/                # Dynamic OG image generation
│   ├── challenges/            # Challenge pages
│   ├── credentials/           # Credentials dashboard
│   ├── projects/              # Project incubation hub
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page
│   ├── loading.tsx            # Loading UI
│   ├── error.tsx              # Error boundary
│   ├── globals.css            # Global styles
│   └── providers.tsx          # MiniKit & OnchainKit providers
├── components/                # Reusable UI components
│   ├── AppShell.tsx           # Main app layout
│   ├── ChallengeCard.tsx      # Challenge display component
│   ├── CredentialBadge.tsx    # Credential display component
│   ├── UserAvatar.tsx         # User avatar component
│   └── PrimaryButton.tsx      # Primary button component
├── contracts/                 # Smart contracts
│   └── SkillCredential.sol    # ERC721 credential contract
├── lib/                       # Utilities and types
│   ├── types.ts               # TypeScript type definitions
│   ├── utils.ts               # Utility functions
│   ├── constants.ts           # App constants
│   ├── mockData.ts            # Mock data for development
│   ├── contracts.ts           # Smart contract utilities
│   ├── ipfs.ts                # IPFS integration utilities
│   └── storage.ts             # Storage abstraction layer
└── public/                    # Static assets
```

## Key Components

### AppShell
Main application layout with header, navigation, and content area.

### ChallengeCard
Displays skill challenges with difficulty levels, required skills, and engagement metrics.

### CredentialBadge
Shows earned credentials with verification links and issuance dates.

### UserAvatar
User profile picture or initials with customizable sizes.

## Base MiniApp Integration

This app is designed to work seamlessly within the Base ecosystem:

- **MiniKit Provider**: Handles wallet connections and Base chain interactions
- **OnchainKit Integration**: Provides identity and wallet components
- **Frame Actions**: Supports Farcaster frame interactions for social discovery
- **Smart Contracts**: ERC721 credentials minted on Base
- **IPFS Storage**: Decentralized storage for submissions and metadata
- **Mobile-First**: Optimized for mobile viewing within Base App

## API Routes

### Farcaster Frame Endpoints

- `POST /api/frame/challenges` - Challenge browsing and selection
- `POST /api/frame/submit` - Challenge submission workflow
- `POST /api/frame/credentials` - Credential viewing and verification

### Dynamic OG Images

- `GET /api/og` - Generates dynamic Open Graph images for frames

## Smart Contract

The `SkillCredential.sol` contract provides:

- ERC721 token standard for verifiable credentials
- Skill tracking and verification
- On-chain credential metadata
- Owner-only minting functionality

## Development

### Adding New Components

1. Create component in `components/` directory
2. Use TypeScript interfaces from `lib/types.ts`
3. Follow the design system tokens in `lib/constants.ts`
4. Use `class-variance-authority` for component variants

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the design system colors and spacing
- Implement mobile-first responsive design
- Use the provided CSS custom properties for consistency

### Smart Contract Development

1. Contract located in `contracts/SkillCredential.sol`
2. Use Hardhat for testing and deployment
3. Deploy to Base testnet for development
4. Update contract address in environment variables

### IPFS Integration

- Uses Pinata for IPFS pinning in production
- Falls back to local storage in development
- Handles credential metadata and submission storage

## Deployment

### Prerequisites

1. **Smart Contract Deployment**
   ```bash
   # Install Hardhat dependencies
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

   # Deploy to Base testnet
   npx hardhat run scripts/deploy.js --network baseTestnet
   ```

2. **Environment Setup**
   - Set up MiniKit API key
   - Configure OnchainKit API key
   - Set up Pinata for IPFS (optional)
   - Update contract address

### Deployment Steps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Your own server

3. **Configure environment variables** in your deployment platform

4. **Update Farcaster Frame metadata** with production URLs

## Testing

### Local Development
- Use mock data for development testing
- Test Farcaster frame interactions locally
- Verify smart contract interactions on testnet

### Production Testing
- Test wallet connections
- Verify credential minting
- Test IPFS storage functionality
- Validate frame metadata

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Business Model

- **Micro-transactions**: Pay-per-challenge submission
- **Premium Features**: Advanced matchmaking and project incubation
- **Tokenized Rewards**: Future integration for community incentives

## Roadmap

- [ ] User authentication and profiles
- [ ] Advanced matchmaking algorithm
- [ ] Notification system
- [ ] Project collaboration tools
- [ ] Mobile app optimization
- [ ] Multi-chain support

## License

MIT License - see LICENSE file for details

