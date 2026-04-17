# Public Tracking System

> **Civic Chain**: A modern civic engagement platform built with cutting-edge web technologies for transparency, performance, and community-driven project tracking.

## 📋 Background & Problem Statement

When government development happens around us—like building a road in a city or local neighborhood—the main issue isn't *what* is developing, but *how* it's happening. The local residents / main consumers of these services rarely contribute, give suggestions, or even know about the details of projects being built with their tax money. 

Current issues include:
- **Lack of Transparency**: Citizens are kept in the dark regarding budgets and timelines.
- **High Chance of Corruption**: Without public oversight, tracking where funds go is difficult.
- **No Public Contributions**: The actual consumers of the projects have no mechanism to voice their needs or vote on priorities.
- **Lack of Information**: General unavailability of actionable data regarding active public developments.

## 💡 Our Solution

**Public Tracking System** bridges the gap between local citizens, contractors, and administrators. It introduces a cohesive system to solve these problems by tracking the flow of public money from *vote* to *pavement*. Through distinct portals and dynamic workflows, the platform facilitates a seamless lifecycle for community projects—from initial wish-lists and proposals, to competitive bidding, to final milestone tracking and escrow payments. 

Built on a robust, modern stack leveraging **React 18**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**, it places high emphasis on responsive design, accessibility, and modern data visualization techniques.

---

## ✨ Key Features

### 🏢 Role-Based Access Control
- **Citizen Portal**: Voice needs, propose projects to the Community Wishlist, and track public expenditure with intuitive charts.
- **Contractor Portal**: Browse open tenders, submit multi-metric bids, and manage assigned projects.
- **Administrator Dashboard**: Oversee project lifecycles, vet contractor bids, and authorize the release of funds based on verified milestones.

### 📊 Transparent Data & Visualizations
- Interactive maps utilizing **Leaflet** to geographically locate public projects.
- Comprehensive charts using **Recharts** for visualizing budget distribution, sentiment analysis, and project timelines.
- Immutable, transparent milestone logs ensuring strict accountability.

### 🤖 Smart & Interactive Elements
- Integrated **Real-time Chatbot** serving pre-programmed FAQ responses to guide users.
- Automated tag recommendations and theoretical AI-scored bid evaluations for contractors.
- Clean and responsive component-based UI constructed using **shadcn/ui**.

---

## 🛠️ Technology Stack

We've selected an industry-standard, strongly-typed tech stack to guarantee stability and performance:

- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Lucide Icons)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [React-Leaflet](https://react-leaflet.js.org/)

*(For an in-depth breakdown of the project architecture, file structure, and design system, please read the [Technology Stack Documentation](./src/app/TECH_STACK.md)).*

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have Node.js and a package manager installed (npm, yarn, pnpm, or bun).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jatin-raksaniya/public-tracking-system.git
   cd public-tracking-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. **Navigate to** `http://localhost:5173` to view the application in your browser.

> **Note on Authentication:** The platform showcases role-based authentication natively. For debugging the local build, you can use the built-in dropdown selector located in the navigation header to seamlessly switch roles (Citizen, Contractor, Admin).

---

## 🏗️ Building for Production

To create a strongly-typed, optimized production build:

```bash
npm run build
```
This triggers the strict TypeScript compiler (`tsc -b`) followed by Vite's production bundler. The compiled artifacts will be securely bundled into the `/dist` directory, ready to be deployed to any static host (e.g., Vercel, Netlify, or AWS S3).

---

**SPECIAL THANKS TO MY PROJECT PARTNERS**
*ANKIT*
*AYUSH*
*ASHMIT*
*IRFAN*

## 🤝 Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
This project is proprietary and intended for demonstration purposes. Distributed 'as is' for civic tech research and innovation.
