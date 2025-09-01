# Innerverse - Personal Development App MVP

A React Native/Expo app for personal development with 12 core features including mood journaling, dream tracking, meditation timers, and gamified personal growth.

## 🚀 Features

### Core Screens
- **Home Portal** - Daily dashboard with quick actions and RPG progress
- **Mood Journal** - Emoji-based mood tracking with intensity and tags
- **Dream Catcher** - Dream logging with lucidity tracking
- **Mantra Forest** - Meditation timer with guided sessions
- **Life Game** - RPG-style progression system with XP and levels
- **Digital Library** - Reading progress tracking
- **Memory Palace** - Organized memory techniques
- **AI Art Studio** - Creative expression tools
- **Quest Builder** - Personal challenge tracking
- **Time Capsule** - Future message delivery
- **Mirror Work** - Self-reflection with guided prompts
- **Community** - Safe sharing and support features

### Technical Features
- **SQLite Database** - Local data persistence
- **Navigation** - 5-tab bottom navigation with stacks
- **Theme System** - Complete design system with colors and typography
- **Responsive Design** - Works on phones and tablets
- **TypeScript** - Full type safety
- **Offline First** - Works without internet

## 📱 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation
```bash
# Clone the repository
git clone https://github.com/beka1728/Innverse.git
cd Innverse

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Different Platforms
- **iOS Simulator**: Press `i` in the terminal or scan QR code with Expo Go
- **Android Emulator**: Press `a` in the terminal or scan QR code with Expo Go
- **Physical Device**: Install Expo Go and scan the QR code

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Main card with 14px radius
│   ├── Button.tsx      # Primary button with gradient
│   ├── Chip.tsx        # Tag chips with colors
│   └── Icon.tsx        # Icon system
├── screens/            # All 12 feature screens
├── database/           # SQLite setup and queries
├── navigation/         # React Navigation setup
├── theme/             # Design system (colors, fonts, spacing)
└── types/             # TypeScript definitions
```

## 🎨 Design System

### Colors
- **Home**: Purple/Coral gradient
- **Mood**: Yellow/Orange palette
- **Dream**: Deep blue/Cyan
- **Mantra**: Forest green theme
- **RPG**: Purple/Gold gaming colors

### Components
- **Cards**: 14px border radius with shadows
- **Buttons**: Gradient backgrounds with hover states
- **Navigation**: Bottom tabs with icons
- **Forms**: Consistent input styling

## 💾 Database Schema

### Tables
- `entries` - All user content (mood, dreams, thoughts)
- `rpg_profile` - User level, XP, and streaks
- `future_notes` - Time capsule messages

### Entry Types
- mood, dream, mantra, book, memory, art, quest, time, mirror, share, thought

## 🚀 Next Steps

### Phase 3 - Enhancements
- [ ] Add animations and micro-interactions
- [ ] Implement data export (CSV/JSON)
- [ ] Add streak counters and achievements
- [ ] Create onboarding flow
- [ ] Add push notifications for reminders

### Future Features
- [ ] AI integration for insights
- [ ] Cloud sync and backup
- [ ] Social features and community
- [ ] Advanced visualizations
- [ ] Apple HealthKit integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 About

Innerverse is designed to be a comprehensive personal development companion that gamifies self-improvement while maintaining privacy and personal agency. Built with React Native and Expo for cross-platform compatibility.