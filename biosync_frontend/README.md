# BioSync - AI Drug Response Digital Twin

A modern React application showcasing BioSync's AI-powered digital twin technology for drug response prediction. This application features a responsive design with three main pages: Home, Technology, and Applications.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Animations**: Starfield background with parallax scrolling
- **Modern UI Components**: Glassmorphism effects and neon glows
- **Multi-page Navigation**: Seamless routing between different sections
- **Custom Styling**: Custom CSS animations and effects

## Pages

1. **Home Page**: Landing page with hero section, problem statement, innovation overview, and applications preview
2. **Technology Page**: Detailed view of BioSync's AI technology with interactive visualizations
3. **Applications Page**: Comprehensive overview of use cases and beneficiaries

## Technologies Used

- React 19
- Vite
- Custom CSS (no external CSS frameworks)
- Custom CSS animations and effects
- Google Fonts (Orbitron, Poppins)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL (usually http://localhost:5173)

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation component with page-specific styling
│   ├── Hero.jsx            # Landing page hero section
│   ├── Problem.jsx         # Problem statement section
│   ├── Innovation.jsx      # Innovation overview section
│   ├── Applications.jsx    # Applications preview cards
│   ├── ApplicationsPage.jsx # Full applications page
│   ├── Technology.jsx      # Technology page
│   └── Starfield.jsx       # Animated background stars
├── App.jsx                 # Main application component
├── App.css                 # Global styles and animations
└── main.jsx               # Application entry point
```

## Customization

The application uses a custom color palette defined in CSS variables in `src/App.css`:
- Primary: #8C52FF (Purple)
- Accent: #00E5FF (Cyan)
- Secondary: #FF4FC3 (Pink)
- Background: #060910 (Dark blue-black)

Font families are configured for both display (Orbitron) and body (Poppins) text. All styling is done with custom CSS classes that replicate Tailwind-like utility classes.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint