# SATX Bounce House Rental Website

A full-featured web application for a bounce house rental business in San Antonio, built with React and Vite. The application provides product listings, booking management, blog functionality, and an admin dashboard.

## Features

- 🏠 Product catalog with detailed bounce house listings
- 💳 Integrated PayPal payment processing
- 📱 Responsive design for all devices
- 📝 Blog system for content management
- 👩‍💼 Admin dashboard for inventory and contact management
- 🗺️ Google Maps integration
- 📊 Google Analytics integration
- 🖥️ Server-side rendering for optimal performance

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Server-Side Rendering:** vite-plugin-ssr
- **UI Components:**
  - Headless UI
  - Hero Icons
  - React Modal
  - React Quill (rich text editor)
- **Date Handling:** date-fns, moment
- **Analytics:** React GA4
- **Payment Processing:** PayPal React Components
- **Maps:** Google Maps React API

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone [repository-url]
cd bounce-v1
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on `.env.sample`

```bash
cp .env.sample .env
```

4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Project Structure

```
bounce-v1/
├── api/              # API endpoints
├── components/       # Reusable React components
├── pages/           # Route components and page layouts
├── public/          # Static assets
├── renderer/        # SSR configuration
└── vite.config.js   # Vite configuration
```

### Key Directories

- `components/`: Contains all reusable React components
- `pages/`: Page components and routing structure
- `public/`: Static assets including images and icons
- `renderer/`: Server-side rendering setup and configuration

## Development

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run test`: Run tests

## Deployment

The application is configured for deployment on Vercel:

1. The `vercel-build` script handles the production build
2. Static files are served from `dist/client/`
3. Server-side rendering is handled through the `/api` directory

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

[License Type] - See LICENSE file for details
