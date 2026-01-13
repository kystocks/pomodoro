# PomoFocus - Session Start Guide

## For Claude Code Sessions

### 1. Read Project Context
```bash
# Claude should read these files at session start:
cat CURRENT_STATE.md
cat VERSION_HISTORY.md
```

### 2. Verify Environment
```bash
# Check current branch
git status

# Verify dependencies
npm list --depth=0

# Check Node version
node --version
```

### 3. Start Development Server
```bash
npm run dev
```
Then open http://localhost:5173/Pomodoro/

## File Structure
```
Pomodoro/
├── public/
├── src/
│   ├── components/
│   │   ├── Timer/
│   │   │   ├── Timer.jsx
│   │   │   └── Timer.module.css
│   │   ├── Controls/
│   │   │   ├── Controls.jsx
│   │   │   └── Controls.module.css
│   │   ├── Settings/
│   │   │   ├── Settings.jsx
│   │   │   └── Settings.module.css
│   │   ├── SessionCounter/
│   │   │   ├── SessionCounter.jsx
│   │   │   └── SessionCounter.module.css
│   │   └── NotificationSound/
│   │       └── NotificationSound.jsx
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   └── index.css
├── CURRENT_STATE.md
├── VERSION_HISTORY.md
├── SESSION_START_GUIDE.md
├── README.md
├── package.json
├── vite.config.js
└── index.html
```

## Development Workflow
1. Read CURRENT_STATE.md for context
2. Make changes locally
3. Test thoroughly with `npm run dev`
4. Update documentation (CURRENT_STATE.md for status, VERSION_HISTORY.md for version bumps)
5. Commit to Git with descriptive message
6. Deploy when ready

## Git Workflow
```bash
# Check status
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Descriptive commit message"

# Push to remote
git push origin main
```

## Deployment Commands
```bash
# Build production version
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Available npm Scripts
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages (runs build first)

## Key Principles
- Test locally before every commit
- Update CURRENT_STATE.md after significant changes
- Update VERSION_HISTORY.md at version milestones
- Follow semantic versioning:
  - 0.1.x: Point releases for bug fixes
  - 0.x.0: Minor version for new features
  - x.0.0: Major version for breaking changes
- Maintain WCAG 2.1 AA accessibility standards
- Design mobile-first, then scale up
- Keep components focused and single-purpose

## Component Responsibilities

### App.jsx
- Main timer state management
- Countdown logic with setInterval
- Mode switching (work → break → work)
- Keyboard shortcuts
- Settings state

### Timer.jsx
- Display time remaining in MM:SS format
- Show current mode (Work/Short Break/Long Break)
- Visual mode indicator with colored dots
- ARIA live region for screen readers

### Controls.jsx
- Start/Pause toggle button
- Reset button (resets to current mode duration)
- Skip button (completes current interval immediately)
- Clear ARIA labels

### Settings.jsx
- Collapsible settings panel
- Three number inputs for durations
- Apply button to save changes
- Reset to defaults button (25/5/15)
- Disabled when timer is active

### SessionCounter.jsx
- Display completed pomodoros count
- Visual progress dots (4 dots, filled based on progress)
- "X until long break" message

### NotificationSound.jsx
- Play audio notification on timer completion
- Request and show browser notification
- Web Audio API for sound generation
- No visible UI

## State Management Notes

All state lives in App.jsx:
- `timeRemaining` (seconds): Current countdown value
- `isActive` (boolean): Is timer running?
- `currentMode` (string): 'work', 'shortBreak', or 'longBreak'
- `completedPomodoros` (number): Total completed work sessions
- `workDuration`, `shortBreakDuration`, `longBreakDuration` (minutes): Customizable intervals

## Keyboard Shortcuts
- **Spacebar**: Start/Pause timer
- **Escape**: Reset timer to current mode duration
- **Enter**: Skip to next interval

(Shortcuts ignored when typing in input fields)

## Styling Approach
- CSS Modules for scoped component styles
- Global styles in `index.css` (reset, CSS variables)
- Dark theme with CSS custom properties
- Mobile-first responsive design
- Breakpoint at 768px

## CSS Custom Properties
```css
--color-primary: #d95550 (Pomodoro red)
--color-background: #1e1e1e (Dark background)
--color-surface: #2a2a2a (Component background)
--color-text: #ffffff
--color-text-secondary: #b8b8b8
--spacing-xs to --spacing-xl (4px to 32px)
```

## Testing Checklist Before Commit
- [ ] Timer counts down correctly
- [ ] All buttons work (Start/Pause/Reset/Skip)
- [ ] Settings panel opens and closes
- [ ] Settings update intervals correctly
- [ ] Settings disabled during active timer
- [ ] Session counter increments after work sessions
- [ ] Progress dots update correctly
- [ ] Modes switch automatically (work → break cycle)
- [ ] Long break triggers after 4 pomodoros
- [ ] Audio notification plays on completion
- [ ] Keyboard shortcuts work (Space, Esc, Enter)
- [ ] Tab order is logical
- [ ] Focus visible on all interactive elements
- [ ] Responsive at 375px, 768px, 1024px widths
- [ ] No console errors

## Common Tasks

### Add a New Feature
1. Update component or create new component
2. Add to App.jsx if needed
3. Add corresponding CSS Module
4. Test locally
5. Update CURRENT_STATE.md "What's Working"
6. Update VERSION_HISTORY.md with version bump
7. Commit with descriptive message

### Fix a Bug
1. Identify bug location (use browser devtools)
2. Fix the issue
3. Test fix thoroughly
4. Update CURRENT_STATE.md if it was a known issue
5. Update VERSION_HISTORY.md with patch version (x.x.X+1)
6. Commit with "fix:" prefix

### Update Styles
1. Modify relevant .module.css file
2. Test on mobile and desktop
3. Ensure accessibility (contrast, focus indicators)
4. Commit with "style:" prefix

## Troubleshooting

### Dev server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
```bash
# Find process on port 5173
lsof -i :5173

# Kill process
kill -9 [PID]
```

### Build fails
```bash
# Check for TypeScript/ESLint errors
npm run build

# Common issue: Missing imports or syntax errors
# Check browser console for details
```

## Future Enhancement Ideas
- localStorage persistence for settings
- Custom audio file upload
- Task list integration
- Statistics dashboard
- Multiple timer profiles
- Dark/light theme toggle
- Custom color themes
- Export session data
- Backend with user accounts
