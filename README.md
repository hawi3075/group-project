🛍️ Efoy Gebya - Premium E-Commerce Frontend

Welcome to the frontend repository for Efoy Gebya. This is a high-fidelity, luxury-focused web application built with a modern tech stack to deliver a cinematic shopping experience. It features a "luxury" aesthetic characterized by glassmorphism, mesh gradients, and real-world commercial photography.

🔗 Live Links
Frontend (Vercel): https://ecommerce-frontend-woad-theta.vercel.app/

🛠️ Tech Stack
Framework: React 18 (Vite)

Styling: Tailwind CSS (Utility-first styling for speed and consistency)

UI Components: Shadcn UI (Built on Radix UI for accessibility and premium feel)

Icons: Lucide React

State Management: React Context API & Axios for data fetching

Routing: React Router v6

✨ Key Features
Luxury Aesthetic: Custom-designed UI utilizing commercial photography and premium typography rather than AI-generated illustrations.

Dynamic Data Fetching: Fully integrated with a Render-hosted backend using environment-aware API routing.

Responsive Design: Cinematic experience across 4K desktops, tablets, and mobile devices.

Secure Authentication: Dedicated login and signup portals with real-time validation.

Performance Optimized: Lightning-fast HMR and optimized builds via Vite.

🚀 Quick Start (Local Development)

Installation
Clone the repository and install dependencies:

git clone https://github.com/hawi3075/efoy-gebya-frontend.git
cd efoy-gebya-frontend
npm install

Environment Configuration
Create a .env file in the root directory:

VITE_API_URL=https://ecommerce-backend-1-87dk.onrender.com

Run Development Server
npm run dev

☁️ Deployment (Vercel)
This application is optimized for Vercel.

Environment Variables: Ensure VITE_API_URL is set in the Vercel Dashboard to your production backend.

SPA Routing: A vercel.json file is included to ensure client-side routing works perfectly on refresh.

Build Command: npm run build.

📸 Project Status


Migrated from hardcoded localhost to dynamic Environment Variables.

Resolved initial CORS and connectivity issues between Vercel and Render.

Implemented a fully responsive Home page, Cart system, and Product Details with dynamic loading.

