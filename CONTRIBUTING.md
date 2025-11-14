# Contributing Guide

Thank you for your interest in contributing to Knowledge Bank Engine!

## Code of Conduct

- Be respectful and inclusive
- No discrimination or harassment
- Constructive feedback only
- Help each other grow

## How to Contribute

### Report Bugs

1. Use GitHub Issues
2. Describe the problem clearly
3. Include steps to reproduce
4. Add environment details
5. Attach screenshots if applicable

### Suggest Enhancements

1. Open an Issue with "Enhancement" label
2. Describe the feature
3. Explain the use case
4. Add examples or mockups

### Submit Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit clearly: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Development Standards

### Code Style

- Use ESLint configuration
- Format with Prettier
- Follow component naming conventions
- Comment complex logic

### Git Workflow

\`\`\`bash
# Create feature branch
git checkout -b feature/my-feature

# Make commits
git commit -m "descriptive message"

# Keep branch updated
git pull origin main

# Push and create PR
git push origin feature/my-feature
\`\`\`

### Testing

\`\`\`bash
# Run tests
npm test

# Coverage report
npm test -- --coverage
\`\`\`

## File Structure Standards

\`\`\`
components/
├── ComponentName.tsx      # Component file
└── component-name.css     # Styles (if needed)

pages/
└── route-name/
    └── page.tsx           # Page component
\`\`\`

## Component Template

\`\`\`tsx
'use client'

import { useState } from 'react'

interface ComponentNameProps {
  // Define props
}

export default function ComponentName(props: ComponentNameProps) {
  // Component logic
  
  return (
    // JSX
  )
}
\`\`\`

## Documentation

- Update README.md for major changes
- Add comments for complex logic
- Document new environment variables
- Update FEATURES.md for new features

## Review Process

1. Automated tests run
2. Code review by maintainers
3. Approval required
4. Merge to main branch
5. Deployment to staging

---

Thank you for contributing! 🎉
