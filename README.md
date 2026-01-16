# 🐾 GatoTech Portfolio

A stunning, cat-themed tech portfolio website featuring modern web design techniques including glassmorphism, neon gradients, and smooth animations.

## ✨ Features

- **Modern Design System**: Glassmorphism effects, neon color palette, and premium typography
- **Three Dynamic Pages**:
  - **Home**: Hero section with animated cat mascot and floating stat cards
  - **Portfolio**: Interactive project showcase with hover effects
  - **GatoShop**: E-commerce interface for cat tech gadgets with cart functionality
- **User Authentication**: Secure login/signup with AWS Cognito
- **Two-Factor Authentication (2FA)**: Optional TOTP-based 2FA using authenticator apps
- **User Profile**: Manage account settings and 2FA preferences
- **Responsive Navigation**: Smooth client-side routing with React Router
- **Interactive Elements**: Hover animations, floating effects, and dynamic cart

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Variables
- **Routing**: React Router DOM
- **Authentication**: AWS Amplify + Cognito
- **Fonts**: Google Fonts (Outfit)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd web-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/       # Reusable components (Navbar, MFASetup)
├── pages/           # Page components (Home, Portfolio, Store, Profile, Login)
├── styles/          # Global styles and CSS variables
├── images/          # Image assets
└── App.tsx          # Main application with routing
```

## 🔐 Two-Factor Authentication

This application supports optional TOTP-based two-factor authentication for enhanced security.

### Setting Up 2FA

1. **Sign up or log in** to your account
2. Navigate to your **Profile** page (click the user icon in the navbar)
3. Click **"Enable 2FA"** in the Security Settings section
4. Scan the QR code with your authenticator app:
   - Google Authenticator
   - Authy
   - Microsoft Authenticator
   - Or any TOTP-compatible app
5. Enter the 6-digit code from your app to verify
6. 2FA is now enabled! You'll need to enter a code each time you log in

### Disabling 2FA

1. Go to your **Profile** page
2. Click **"Disable 2FA"** in the Security Settings section
3. Confirm the action

## 🎨 Design Philosophy

This portfolio showcases cutting-edge web design with:
- **Neon Kitty** color palette (Purples, Cyans, Pinks)
- Dark mode base for premium feel
- Glassmorphism for depth and sophistication
- Micro-animations for enhanced UX

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

---

**Built with 💜 by Sokoni Babb**
