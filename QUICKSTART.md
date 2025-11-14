# Quick Start Guide

Get the Knowledge Bank Engine running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm, yarn, bun, or pnpm

## Step 1: Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd knowledge-bank-engine
\`\`\`

## Step 2: Run Setup Script

\`\`\`bash
# On macOS/Linux
chmod +x scripts/setup.sh
./scripts/setup.sh

# On Windows (PowerShell)
# Just run: npm install
\`\`\`

## Step 3: Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. In Project Settings, find your Firebase config
4. Update `.env.local` with your credentials:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
\`\`\`

## Step 4: Start Development Server

\`\`\`bash
npm run dev
\`\`\`

## Step 5: Open in Browser

Visit `http://localhost:3000` and explore!

## 🎉 You're All Set!

- **Home Page**: See the landing page with 3D planet
- **Articles**: Browse the articles grid
- **Sign In**: Create an account or sign in with email
- **Chatbot**: Click the chatbot icon in the navbar

## Common Issues

### Firebase Error
**Problem**: "Failed to load firebase"
**Solution**: Check `.env.local` has all Firebase credentials

### Port 3000 Already in Use
**Solution**: 
\`\`\`bash
# Use different port
npm run dev -- -p 3001
\`\`\`

### Dependencies Won't Install
**Solution**:
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Next Steps

1. Replace API endpoints with your backend
2. Customize colors in `app/globals.css`
3. Add your articles to the database
4. Deploy to Vercel (see DEPLOYMENT.md)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

Happy coding! 🚀
