# Project Structure Overview

## Directory Layout

\`\`\`
knowledge-bank-engine/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page (/)
│   ├── globals.css                # Global styles and design tokens
│   ├── providers.tsx              # Firebase Auth Context
│   │
│   ├── articles/
│   │   └── page.tsx               # Articles page (/articles)
│   │
│   ├── signin/
│   │   └── page.tsx               # Sign in page (/signin)
│   │
│   ├── signup/
│   │   └── page.tsx               # Sign up page (/signup)
│   │
│   ├── forgot-password/
│   │   └── page.tsx               # Password reset (/forgot-password)
│   │
│   ├── components/                # Reusable components
│   │   ├── client-layout.tsx      # Main client layout wrapper
│   │   ├── navbar.tsx             # Navigation bar (client component)
│   │   ├── chatbot-panel.tsx      # Chatbot interface (client component)
│   │   ├── article-card.tsx       # Article card component
│   │   ├── starfield.tsx          # Starfield animation
│   │   ├── planet-model.tsx       # 3D planet animation
│   │   │
│   │   ├── pages/                 # Page-level components
│   │   │   ├── landing-page.tsx
│   │   │   ├── articles-page.tsx
│   │   │   ├── signin-page.tsx
│   │   │   ├── signup-page.tsx
│   │   │   └── forgot-password-page.tsx
│   │   │
│   │   └── modals/                # Modal components
│   │       ├── article-modal.tsx
│   │       └── signin-modal.tsx
│   │
│   └── styles/                    # Component-specific stylesheets
│       ├── animations.css         # Global animations
│       ├── landing-page.css
│       ├── articles-page.css
│       ├── auth-pages.css
│       ├── navbar.css
│       ├── chatbot-panel.css
│       ├── article-modal.css
│       ├── starfield.css
│       └── planet-model.css
│
├── components/ui/                 # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   └── ... (40+ pre-built components)
│
├── hooks/                         # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                           # Utility functions
│   └── utils.ts
│
├── public/                        # Static assets
│   ├── placeholder.svg
│   ├── placeholder-logo.png
│   └── ... (other assets)
│
├── scripts/                       # Utility scripts
│   └── setup.sh
│
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment variables (not committed)
├── .gitignore
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS config for Tailwind
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
\`\`\`

## Key Files Explained

### app/layout.tsx
- Root layout component
- Sets up providers (Firebase Auth, Theme)
- Imports global styles
- Defines metadata and fonts

### app/providers.tsx
- Firebase initialization
- Auth context creation
- useAuth hook for accessing auth state

### app/globals.css
- Tailwind CSS v4 configuration
- Design tokens (colors, fonts, spacing)
- CSS custom properties for theming
- Base styling

### app/components/client-layout.tsx
- Wraps all pages
- Manages chatbot panel state
- Renders Navbar and ChatbotPanel on all pages

### Authentication Pages
- `signin/page.tsx` - Email/password login
- `signup/page.tsx` - New user registration
- `forgot-password/page.tsx` - Password reset flow

### Article Pages
- `articles/page.tsx` - Browse and search articles
- Uses ArticlesPage component
- Infinite scroll capability
- Tag filtering

## Component Relationships

\`\`\`
layout.tsx (Server)
└── AuthProvider (Client)
    └── ClientLayout (Client)
        ├── Navbar
        │   └── useAuth() hook
        ├── ChatbotPanel
        └── Page Content (Children)
            ├── LandingPage (Home)
            ├── ArticlesPage (Articles)
            ├── SignInPage (Sign In)
            ├── SignUpPage (Sign Up)
            └── ForgotPasswordPage (Reset Password)
\`\`\`

## Data Flow

### Authentication Flow
1. User signs up/in through SignIn/SignUpPage
2. Firebase Auth authenticates the user
3. AuthProvider updates global user state
4. useAuth() hook makes user available to components
5. Protected features check user state

### Article Display Flow
1. ArticlesPage loads mock articles
2. User can search and filter
3. Click article → ArticleModal opens
4. Modal shows full content
5. Authenticated users can download

### Chatbot Flow
1. User clicks chatbot icon in Navbar
2. ChatbotPanel opens (slide-in drawer)
3. User types message
4. API call to backend (mock for now)
5. Response displayed with sources

## Styling Architecture

### Tailwind CSS v4
- Utility-first CSS framework
- Design tokens defined in globals.css
- Responsive prefixes (md:, lg:, etc.)

### CSS Modules & Global CSS
- Global animations in animations.css
- Component-specific styles in component.css files
- Glassmorphism, glow effects, parallax effects

### Design Tokens
\`\`\`css
--color-bg-primary: #0a0e27;
--color-bg-secondary: #16213e;
--color-accent-purple: #7f5af0;
--color-accent-cyan: #f0f0f0;
--color-text-primary: #ffffff;
--color-text-secondary: #a0a0a0;
\`\`\`

## Development Workflow

### Adding a New Feature
1. Create component in `app/components/`
2. Create page in `app/[route]/page.tsx` if needed
3. Add styles in `app/styles/component.css`
4. Import and use in existing components
5. Add route to navbar if needed

### Modifying Styles
1. Edit `app/styles/*.css` files
2. Or update Tailwind classes in components
3. Restart dev server if using new design tokens

### Integrating Backend API
1. Update API endpoints in components
2. Replace mock data with API calls
3. Add error handling and loading states
4. Use `useAuth().getIdToken()` for authenticated requests

## Performance Considerations

### Optimization Strategies
- Image optimization (Vercel's `next/image`)
- Code splitting (automatic with Next.js)
- CSS minification (automatic in production)
- Tree shaking of unused Tailwind utilities
- Lazy loading of components

### Best Practices
- Use `'use client'` only when needed
- Prefer Server Components for data fetching
- Memoize expensive calculations
- Optimize re-renders with proper keys

## Testing

Recommended testing structure:
\`\`\`
__tests__/
├── components/
├── pages/
└── hooks/
\`\`\`

Use Jest + React Testing Library for unit tests.

---

For more details, see individual component files and the README.md
