# SkillBloom - Base MiniApp

Bloom your skills, get recognized, and collaborate on projects, powered by Base.

## Features

- **Verifiable Micro-Credentials**: Earn on-chain verifiable credentials through skill challenges
- **Practical Skill Challenges**: Curated real-world tasks to practice and showcase skills
- **Skill-Based Matchmaking**: Connect with collaborators based on specific skill requirements
- **Project Incubation Hub**: Post project ideas and find co-founders/contributors

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: MiniKit + OnchainKit
- **Styling**: Tailwind CSS
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

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── loading.tsx        # Loading UI
│   ├── error.tsx          # Error boundary
│   ├── globals.css        # Global styles
│   └── providers.tsx      # MiniKit & OnchainKit providers
├── components/            # Reusable UI components
│   ├── AppShell.tsx       # Main app layout
│   ├── ChallengeCard.tsx  # Challenge display component
│   ├── CredentialBadge.tsx # Credential display component
│   ├── UserAvatar.tsx     # User avatar component
│   └── PrimaryButton.tsx  # Primary button component
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript type definitions
│   ├── utils.ts           # Utility functions
│   ├── constants.ts       # App constants
│   └── mockData.ts        # Mock data for development
└── public/                # Static assets
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
- **Mobile-First**: Optimized for mobile viewing within Base App

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

### State Management

Currently using React's built-in state management. For complex state, consider:
- React Context for global state
- Custom hooks for reusable logic
- Local storage for persistence

## Deployment

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
