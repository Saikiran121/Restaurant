# Restaurant Management System

A beautiful, functional frontend prototype for a modern Restaurant Management System, featuring a Waiter/Floor Staff application and an Admin/Owner Dashboard.

## Features

- **Waiter / Floor Staff View**:
  - Interactive Digital Floor Layout with real-time table statuses.
  - POS Order System with interactive menu grid, dynamic cart, and auto-calculating totals.
  - Kitchen Display System (KDS) for syncing with the kitchen.
- **Admin / Owner Dashboard**:
  - Analytics Dashboard with animated CSS-based charts and summary metric cards.
  - Inventory Management table with stock level indicators and threshold alerts.
  - Menu Management interface with item toggles.
- **Modern UI**:
  - "Midnight Neon" theme using Vanilla CSS.
  - Glassmorphic panels, vibrant gradients, and smooth micro-animations.
  - Fully responsive layout and sidebar navigation.

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (Node Package Manager)

## Getting Started

1. **Install dependencies**:
   Run the following command in the project root directory to install all required packages (including `lucide-react` for icons):
   ```bash
   npm install
   ```

2. **Run the development server**:
   Start the Vite development server to view the application in your browser:
   ```bash
   npm run dev
   ```
   *The application will typically be available at `http://localhost:5173/` or `http://localhost:5174/`. Check your terminal output for the exact local URL.*

## Scripts

- `npm run dev` - Starts the fast Vite development server with Hot Module Replacement (HMR).
- `npm run build` - Builds the application for production inside the `dist` folder.
- `npm run lint` - Runs ESLint to identify and report on patterns or errors in the TypeScript and TSX files. Use this to check your code quality.
- `npm run preview` - Boots up a local static web server that serves the files from the `dist` folder created by the build command.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Vanilla CSS (Global Variables, CSS Modules)
- **Icons**: Lucide React
- **Data**: Mock data layer simulating real-time operations
