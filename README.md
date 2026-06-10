# Pranav Portfolio

A modern personal portfolio frontend built with React, Vite, and Tailwind CSS. The project provides a polished portfolio foundation with responsive navigation, dark mode support, animated UI effects, and a clean styling system ready for portfolio sections, case studies, writing, and contact content.

## Overview

This repository contains a single-page portfolio application designed for fast development and easy customization. It uses Vite for the development workflow, React for the UI layer, and Tailwind CSS for utility-first styling.

The current implementation includes:

- Responsive desktop and mobile navigation
- Light and dark theme switching with persisted preference
- Preloader and toast notification behavior
- Scroll-based navigation state and reveal animations
- Project modal logic for future portfolio items
- Custom Tailwind theme colors, fonts, and animations
- Profile image asset support through the `public/images` directory

## Tech Stack

- React 
- Vite 
- Tailwind CSS 
- PostCSS
- Font Awesome classes for icon usage
- Google Fonts configured through Tailwind font families

## Getting Started

### Prerequisites

Install Node.js and npm before running the project locally.

Recommended:

- Node.js 20 or newer
- npm 10 or newer

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

After starting the development server, open the local URL shown in the terminal.

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally for testing. |

## Project Structure

```text
Portfolio_2/
  public/
    images/
      photo.jpeg
  src/
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  package-lock.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
  README.md
```

## Key Files

- `src/App.jsx` contains the main React component and portfolio interaction logic.
- `src/index.css` imports Tailwind layers and defines custom visual effects, animations, and utility classes.
- `src/main.jsx` mounts the React application.
- `tailwind.config.js` defines the custom theme, fonts, colors, dark mode strategy, and animations.
- `public/images/photo.jpeg` stores the current profile image asset.

## Customization

Update portfolio content in `src/App.jsx`, including navigation labels, section links, project data, contact behavior, and personal branding.

Adjust visual styling in:

- `tailwind.config.js` for theme-level colors, fonts, and animation tokens
- `src/index.css` for custom effects such as reveal animations, toast transitions, spotlight cards, and background patterns

Replace the profile image by adding assets to `public/images` and referencing them from the React component.

## Deployment

The app can be deployed to any static hosting platform that supports Vite builds, such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

Typical deployment flow:

```bash
npm install
npm run build
```

Deploy the generated `dist/` directory.

## Repository Notes

Generated folders and local artifacts such as `node_modules/`, `dist/`, and development logs should remain untracked. Keep personal content, project details, and production assets updated before publishing the portfolio.
