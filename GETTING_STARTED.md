# Getting Started with Knowledge Bank Engine

Welcome! This guide will help you get up and running in just a few minutes.

## 📦 What's Included

- ✅ Full Next.js 16 application with App Router
- ✅ React 19 components with TypeScript
- ✅ Firebase Authentication ready to go
- ✅ Stunning space-themed UI with animations
- ✅ Responsive design for all devices
- ✅ 40+ pre-built shadcn/ui components
- ✅ Tailwind CSS v4 with design tokens
- ✅ Complete documentation

## ⚡ 5-Minute Quick Start

### 1. Download and Setup

\`\`\`bash
# Clone or download the project
git clone <repo-url> && cd knowledge-bank-engine

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
\`\`\`

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Copy your config from Project Settings
4. Update `.env.local` with your credentials

### 3. Start the App

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` - you're done! 🎉

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Project overview and setup |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute quick start guide |
| [INSTALLATION.md](./INSTALLATION.md) | Detailed installation guide |
| [FEATURES.md](./FEATURES.md) | Complete feature list |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Codebase architecture |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to production |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |

## 🎯 Key Features

### 🌌 Landing Page
- Parallax starfield animation
- 3D planet visualization
- Smooth scrolling effects
- Feature highlights

### 📖 Articles
- Browse all articles
- Real-time search
- Filter by tags
- Infinite scroll
- Download articles (authenticated)

### 🤖 AI Chatbot
- Real-time messaging
- Source attribution
- Conversation history
- Smart responses

### 🔐 Authentication
- Email/password signup
- Google OAuth integration
- Password reset flow
- Secure user profiles

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with SSR |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Firebase | Authentication |
| shadcn/ui | UI components |
| React Hook Form | Form management |

## 📁 Project Structure

\`\`\`
app/                       # Next.js app directory
├── page.tsx              # Home page
├── articles/             # Articles section
├── signin/               # Sign in page
├── signup/               # Sign up page
├── components/           # Reusable components
└── styles/               # CSS files

components/ui/            # Pre-built UI components
hooks/                     # Custom hooks
lib/                       # Utilities
public/                    # Static files
\`\`\`

## 🚀 Common Tasks

### Add a New Page

1. Create `app/new-page/page.tsx`
2. Export default component
3. It's automatically routed!

\`\`\`tsx
export const metadata = {
  title: "My Page",
}

export default function Page() {
  return <h1>Welcome!</h1>
}
\`\`\`

### Customize Colors

Edit `app/globals.css`:

\`\`\`css
@theme inline {
  --color-bg-primary: #your-color;
  --color-accent: #your-accent;
}
\`\`\`

### Connect Your Backend

Update API calls in components:

\`\`\`tsx
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/articles`
)
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm i -g vercel
vercel
# Follow the prompts
\`\`\`

## ⚠️ Important Notes

### Environment Variables

Never share your `.env.local` file! It contains sensitive credentials.

Always use `NEXT_PUBLIC_` prefix for public variables:
\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=public_value
# This is only for client-side use
\`\`\`

### Firebase Setup

You MUST configure Firebase before the app works:
1. Create a Firebase project
2. Enable Email/Password and Google authentication
3. Get your config credentials
4. Update `.env.local`

### Building for Production

\`\`\`bash
npm run build    # Creates optimized build
npm start        # Runs production server
\`\`\`

## 🐛 Troubleshooting

### App won't start
\`\`\`bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install && npm run dev
\`\`\`

### Firebase errors
- Check `.env.local` has all variables
- Verify Firebase project is active
- Restart dev server

### Port 3000 in use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)

## 🎓 Next Steps

1. ✅ Complete [QUICKSTART.md](./QUICKSTART.md)
2. 📖 Read [FEATURES.md](./FEATURES.md) to understand capabilities
3. 🏗️ Study [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
4. 🚀 Deploy with [DEPLOYMENT.md](./DEPLOYMENT.md)
5. 🤝 Contribute with [CONTRIBUTING.md](./CONTRIBUTING.md)

## 💡 Pro Tips

- Use TypeScript for type safety
- Leverage shadcn/ui components
- Check Tailwind documentation for styling
- Read Next.js docs for advanced features
- Join Next.js community for help

## ❓ FAQ

**Q: Can I use this in production?**
A: Yes! It's production-ready. Just configure Firebase and deploy.

**Q: Can I customize the design?**
A: All colors, fonts, and layouts are customizable.

**Q: How do I add my own articles?**
A: Replace mock API endpoints with your backend database.

**Q: Is it mobile-friendly?**
A: Yes! Built with mobile-first responsive design.

**Q: Can I deploy for free?**
A: Yes! Vercel, Netlify, and Firebase offer free tiers.

## 🎉 You're All Set!

Start coding with:
\`\`\`bash
npm run dev
\`\`\`

Happy coding! 🚀

---

**Questions?** Check the documentation files above or visit our [GitHub Issues](https://github.com/yourrepo/issues)
