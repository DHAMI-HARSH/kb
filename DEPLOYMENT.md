# Deployment Guide

## Quick Start - Deploy to Vercel

Vercel is the official hosting platform for Next.js and requires no configuration.

### 1. Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/knowledge-bank-engine.git
git push -u origin main
\`\`\`

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add Environment Variables:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
5. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## Deploy to Other Platforms

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify UI

### Docker

Create `Dockerfile`:

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

Build and run:

\`\`\`bash
docker build -t knowledge-bank-engine .
docker run -p 3000:3000 -e NEXT_PUBLIC_FIREBASE_API_KEY=xxx knowledge-bank-engine
\`\`\`

### AWS Amplify

1. Push code to GitHub
2. Connect to AWS Amplify
3. Set build settings (auto-detects Next.js)
4. Add environment variables
5. Deploy

### Railway

\`\`\`bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
\`\`\`

## Environment Variables in Production

Always use Vercel Dashboard, Netlify UI, or your hosting platform's UI to manage sensitive environment variables. Never commit `.env.local` to version control.

## Performance Optimization

After deployment, optimize performance:

1. Enable Image Optimization in Next.js
2. Use CDN for static assets
3. Monitor Core Web Vitals in Vercel Analytics
4. Enable compression and caching

## Monitoring

### Vercel Analytics

Built-in monitoring available in Vercel Dashboard:
- Page performance
- Core Web Vitals
- Error tracking

### Firebase Console

Monitor:
- Authentication events
- User sign-ups and sign-ins
- Error logs

---

For detailed Next.js deployment guide, see [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
