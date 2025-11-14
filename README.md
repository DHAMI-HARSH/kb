# Knowledge Bank Engine

A space-themed AI-powered knowledge management platform built with Next.js 16, React 19, and Firebase.

## 🚀 Features

- **Landing Page** - Stunning parallax starfield with 3D planet animation
- **Article Explorer** - Browse, search, and filter articles with infinite scroll
- **AI Chatbot** - Real-time chat interface with source attribution
- **Firebase Authentication** - Email/password and Google sign-in
- **Protected Features** - Authenticated-only document downloads
- **Responsive Design** - Mobile-first design with glassmorphism aesthetic
- **Cosmic Theme** - Deep space colors with neon purple and cyan accents

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Firebase project (for authentication)

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd knowledge-bank-engine

# Install dependencies using your preferred package manager
npm install
# or
bun install
# or
yarn install
# or
pnpm install
\`\`\`

### 2. Configure Firebase

Create a `.env.local` file in the project root with your Firebase credentials:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

To get these values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. In Project Settings → General, scroll to "Your apps"
4. Click "Web" and copy the firebaseConfig values

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

\`\`\`
app/
├── layout.tsx              # Root layout with providers
├── page.tsx                # Home page
├── globals.css             # Global styles with design tokens
├── providers.tsx           # Firebase Auth Context
├── articles/
│   └── page.tsx            # Articles page
├── signin/
│   └── page.tsx            # Sign in page
├── signup/
│   └── page.tsx            # Sign up page
├── forgot-password/
│   └── page.tsx            # Password reset page
├── components/
│   ├── client-layout.tsx   # Client-side layout wrapper
│   ├── navbar.tsx          # Navigation bar
│   ├── chatbot-panel.tsx   # Chatbot interface
│   ├── article-card.tsx    # Article card component
│   ├── starfield.tsx       # Starfield background
│   ├── planet-model.tsx    # 3D planet animation
│   ├── pages/              # Page components
│   └── modals/             # Modal components
├── styles/                 # Component-specific CSS
└── styles/animations.css   # Shared animations
\`\`\`

## 🎨 Design System

-- **Colors**: Deep space (#0a0e27), Purple accent (#7f5af0), Accent (white-shade `#f0f0f0`)
- **Typography**: Geist Sans (headings), Geist Mono (code)
- **Layout**: Flexbox-based responsive design
- **Effects**: Glassmorphism, glow effects, smooth transitions

## 🔌 API Integration

The app includes mock API endpoints that should be replaced with your backend:

- `GET /api/articles` - Fetch articles list
- `GET /api/articles/:id` - Fetch single article
- `POST /api/chat` - Send chatbot message
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

Update the API base URL in the environment variables:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## 📦 Available Scripts

\`\`\`bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
\`\`\`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Deploy to Other Platforms

Build the application:

\`\`\`bash
npm run build
\`\`\`

Then deploy the `.next` folder to your hosting platform.

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| NEXT_PUBLIC_FIREBASE_API_KEY | Yes | Firebase API key |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Yes | Firebase auth domain |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Yes | Firebase project ID |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Yes | Firebase storage bucket |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Yes | Firebase messaging sender ID |
| NEXT_PUBLIC_FIREBASE_APP_ID | Yes | Firebase app ID |
| NEXT_PUBLIC_API_URL | No | Backend API URL (default: http://localhost:5000) |

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Animations**: CSS animations + Tailwind CSS

## 📝 Development Notes

### Adding New Pages

1. Create a new folder in `app/` (e.g., `app/new-page/`)
2. Add `page.tsx` with your page component
3. Optionally add a component file in `app/components/pages/`

### Adding New Components

1. Create component file in `app/components/`
2. Add styles in `app/styles/` if needed
3. Use `'use client'` directive for interactive components

### Firebase Setup

The app uses Singleton pattern for Firebase clients. Update credentials in `app/providers.tsx`.

## 🐛 Troubleshooting

### Firebase Import Error
- Ensure Firebase credentials are correctly set in `.env.local`
- Verify Firebase project is active in Firebase Console

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that all environment variables are set

## 📄 License

MIT License - Feel free to use this project as a template!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and React
