# Complete Installation Guide

## System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn/bun/pnpm)
- **Operating System**: Windows, macOS, or Linux
- **RAM**: 2GB minimum
- **Disk Space**: 500MB minimum

Check your versions:
\`\`\`bash
node --version
npm --version
\`\`\`

## Step-by-Step Installation

### Option 1: Automated Setup (Recommended)

\`\`\`bash
# Clone repository
git clone <repo-url>
cd knowledge-bank-engine

# Make setup script executable (macOS/Linux)
chmod +x scripts/setup.sh

# Run setup script
./scripts/setup.sh

# For Windows PowerShell
npm install
\`\`\`

### Option 2: Manual Setup

\`\`\`bash
# Clone repository
git clone <repo-url>
cd knowledge-bank-engine

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
# Then start the dev server
npm run dev
\`\`\`

### Option 3: Using Alternative Package Managers

**Using Yarn:**
\`\`\`bash
yarn install
yarn dev
\`\`\`

**Using Bun:**
\`\`\`bash
bun install
bun run dev
\`\`\`

**Using pnpm:**
\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Firebase Setup

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Enter project name (e.g., "knowledge-bank")
4. Follow the setup wizard
5. Click "Continue" to finish

### Enable Authentication

1. In Firebase Console, go to "Authentication"
2. Click "Get Started"
3. Enable "Email/Password" provider
4. Enable "Google" provider
5. Add authorized domain (e.g., localhost:3000 for development)

### Get Firebase Credentials

1. In Firebase Console, go to "Project Settings" (gear icon)
2. Scroll to "Your apps" section
3. Click Web app icon (</>) if not already created
4. Copy the config object
5. Update `.env.local` with these values:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
\`\`\`

## Verify Installation

\`\`\`bash
# Check Node.js and npm
node -v && npm -v

# Check Firebase config is loaded
grep NEXT_PUBLIC_FIREBASE .env.local

# Start dev server
npm run dev

# Visit http://localhost:3000
# You should see the landing page
\`\`\`

## Troubleshooting Installation

### Issue: "command not found: node"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: "npm ERR! ERESOLVE unable to resolve dependency tree"
**Solution**:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Issue: "Failed to load firebase"
**Solution**: 
- Check `.env.local` has all Firebase variables
- Verify values are correct from Firebase Console
- Restart dev server: `npm run dev`

### Issue: Port 3000 already in use
**Solution**:
\`\`\`bash
# Use different port
npm run dev -- -p 3001

# Or kill process using port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
\`\`\`

### Issue: "Module not found"
**Solution**:
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue: TypeScript errors
**Solution**:
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run dev
\`\`\`

## Development Environment Setup

### IDE Recommendation

**Visual Studio Code** (Recommended)

Install extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Firebase
- Next.js
- Thunder Client (for API testing)

### Git Setup

\`\`\`bash
# Initialize git repo
git init

# Add remote
git remote add origin <your-repo-url>

# Configure git
git config user.name "Your Name"
git config user.email "your@email.com"

# Create .gitignore (already included)
# First commit
git add .
git commit -m "Initial commit"
git push -u origin main
\`\`\`

## Build & Deploy Setup

### Local Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

# Visit http://localhost:3000
\`\`\`

### Pre-deployment Checklist

- [ ] All environment variables set
- [ ] Firebase project configured
- [ ] Build completes without errors
- [ ] No console errors in dev server
- [ ] Authentication working
- [ ] All pages accessible

### Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables in Vercel Dashboard
# Redeploy
vercel --prod
\`\`\`

## Performance Tuning

### Optimize for Development

\`\`\`bash
# Use next dev with faster refresh
npm run dev
\`\`\`

### Optimize for Production

\`\`\`bash
# Build with optimizations
npm run build

# Analyze bundle size
npm install --save-dev @next/bundle-analyzer
\`\`\`

## Security Setup

### Secure Firebase Config

1. Never commit `.env.local`
2. Use `NEXT_PUBLIC_` prefix only for public values
3. Server secrets in `.env` (not in repo)
4. Use Vercel Environment Variables for production

### Security Rules

For Firebase Firestore (if added later):
\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
  }
}
\`\`\`

## Next Steps After Installation

1. **Customize Branding**: Update logo and colors
2. **Connect Backend**: Replace mock APIs
3. **Add Content**: Add your articles/data
4. **Configure Analytics**: Set up tracking
5. **Deploy**: Push to production

## Getting Help

- **Documentation**: See README.md and other .md files
- **Firebase Help**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Next.js Help**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind Help**: [tailwindcss.com](https://tailwindcss.com)

---

Installation complete! Ready to develop? Start with `npm run dev` 🚀
