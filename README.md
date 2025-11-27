# HerdLinx Website

Professional single-page website for HerdLinx, a cattle tracking and monitoring technology company.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/components/` - React components for each section
- `src/styles/` - CSS variables and design system
- `src/App.jsx` - Main application component
- `src/App.css` - Global styles

## Content Editing

All placeholder content is clearly marked with comments in the component files:

- `/* EDITABLE CONTENT START */` - Marks the beginning of editable content
- `/* EDITABLE CONTENT END */` - Marks the end of editable content
- `/* TODO: Replace this content... */` - Specific instructions for content replacement

### Key Files to Edit:

- `src/components/InformativeSection.jsx` - Company information
- `src/components/ProductSection.jsx` - Product details
- `src/components/BackgroundSection.jsx` - Company background
- `src/components/TeamSection.jsx` - Team member information
- `src/components/ContactForm.jsx` - Contact form and submission logic

## Design System

The website uses an earth-tone color palette defined in `src/styles/variables.css`. Colors can be customized there to maintain consistency across the site.

## Technologies

- React 18
- Vite
- CSS Modules






