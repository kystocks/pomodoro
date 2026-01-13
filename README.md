# PomoFocus

A clean, accessible Pomodoro timer that helps you manage focused work sessions using the Pomodoro Technique.

## About This Project

PomoFocus is a web-based Pomodoro timer built to help users maintain focus and productivity through time-boxed work sessions. This project demonstrates professional web development practices including full keyboard accessibility (WCAG 2.1 AA compliant), responsive mobile-first design, and industry-standard deployment workflows.

## Features

- ⏱️ **Standard Pomodoro Timer** - 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- ⚙️ **Customizable Intervals** - Adjust work and break durations to fit your workflow (1-60 minutes)
- 🎮 **Full Controls** - Start, Pause, Reset, and Skip buttons for complete timer control
- 🔔 **Audio Notifications** - Pleasant sound alert when timer completes (Web Audio API)
- 📊 **Session Tracking** - Track completed pomodoros with visual progress indicators
- ⌨️ **Keyboard Shortcuts** - Full keyboard accessibility:
  - `Space` - Start/Pause
  - `Esc` - Reset
  - `Enter` - Skip to next interval
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- ♿ **WCAG 2.1 AA Compliant** - Semantic HTML, ARIA labels, screen reader compatible
- 🌙 **Professional Dark Theme** - Reduces eye strain during focused work

## Tech Stack

**Frontend:**
- React 19.2.3
- Vite 7.3.1
- CSS Modules (scoped styling)
- Web Audio API (notifications)

**Development:**
- Node.js 22.14.0
- npm 10.9.2
- ESLint (code quality)

**Deployment:**
- GitHub Pages (via gh-pages)

## Live Demo

🚀 **[https://kystocks.github.io/pomodoro/](https://kystocks.github.io/pomodoro/)**

## Local Development

### Prerequisites
- Node.js 22.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/kystocks/pomodoro.git

# Navigate to project directory
cd Pomodoro

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173/Pomodoro/`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

## How It Works

### The Pomodoro Technique

1. Choose a task to work on
2. Start a 25-minute work session (Pomodoro)
3. Work until the timer rings
4. Take a 5-minute short break
5. After 4 Pomodoros, take a 15-minute long break

### Using PomoFocus

1. Click **Start** or press `Space` to begin a work session
2. Focus on your task until the timer completes
3. Receive an audio notification when time is up
4. Timer automatically switches to break mode
5. Track your progress with the session counter
6. Customize interval durations in **Settings** (if needed)

## Accessibility Features

- **Keyboard Navigation**: Complete functionality without a mouse
- **Screen Reader Support**: ARIA live regions announce timer changes
- **Semantic HTML**: Proper heading hierarchy and element usage
- **High Contrast**: Professional dark theme with excellent readability
- **Focus Indicators**: Clear visual focus on all interactive elements
- **Touch Targets**: Minimum 44x44px (48px on mobile) for easy tapping

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Audio notifications require user interaction to work (browser security policy). Starting the timer counts as interaction.

## Project Background

Developed by Kyle Stocksdale, University of Michigan student applying knowledge from:
- **SI 664**: Database Application Development (Django/Backend) - Perfect Score
- **SI 579**: Web Application Development (React/Frontend) - Perfect Score

This project demonstrates:
- Professional React component architecture
- Accessible web design (WCAG 2.1 AA)
- Responsive mobile-first design
- Industry-standard workflows (Git, semantic versioning, comprehensive documentation)
- Clean, maintainable code

## Project Structure

```
Pomodoro/
├── src/
│   ├── components/
│   │   ├── Timer/          # Display countdown and mode
│   │   ├── Controls/       # Start/Pause/Reset/Skip buttons
│   │   ├── Settings/       # Customizable intervals
│   │   ├── SessionCounter/ # Track completed pomodoros
│   │   └── NotificationSound/ # Audio notifications
│   ├── App.jsx            # Main state management
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── CURRENT_STATE.md       # Project status tracking
├── VERSION_HISTORY.md     # Comprehensive changelog
├── SESSION_START_GUIDE.md # Development guide
└── README.md              # This file
```

## Roadmap

### V1 (Current)
- ✅ Core Pomodoro timer functionality
- ✅ Customizable intervals
- ✅ Session tracking
- ✅ Audio notifications
- ✅ Keyboard accessibility
- ✅ Responsive design

### Future Versions
- localStorage persistence (remember settings)
- Custom audio file uploads
- Task list integration
- Statistics dashboard
- Multiple timer profiles
- Dark/light theme toggle
- Export session data
- Backend with user accounts

## Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Report bugs via GitHub Issues
- Suggest features
- Share your Pomodoro productivity tips

## License

MIT License - See LICENSE file for details

## Acknowledgments

- **Pomodoro Technique®** - Developed by Francesco Cirillo
- **React Team** - For the excellent framework and documentation
- **Vite Team** - For the blazing fast build tool
- **University of Michigan UMSI** - For the comprehensive web development education

---

**Built with ❤️ and ☕ using the Pomodoro Technique**
