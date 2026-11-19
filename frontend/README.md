# ReviewGuard — AI Review Intelligence & Fake Review Detection Platform

![ReviewGuard Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

**ReviewGuard** is an enterprise-grade AI Fake Review Detection and Review Intelligence platform frontend built with **React**, **Vite**, **Tailwind CSS (@tailwindcss/vite native without PostCSS)**, **React Router DOM v6**, **Lucide React**, and **Recharts**.

The application analyzes customer reviews, highlights suspicious syndication patterns, flags malicious competitor bombing, scores fake review probabilities, and monitors review integrity across multi-category product catalogs.

---

## 🚀 Key Modules & Architecture

### 1. High-Converting Public SaaS Landing Page (`/`)
- **Modern Sticky Navbar**: Glassmorphism navbar with smooth anchor links, "Sign In" link, and "Start Free Trial" CTA.
- **Hero Section**: High-impact headline, neural auditor preview badge, and dual conversion triggers.
- **Problem & Solution**: Highlights the $152B review manipulation crisis (bot bursts, review bombing) vs ReviewGuard's multi-signal neural heuristics.
- **Interactive Live Demo Sandbox**: Prospective buyers can paste any customer review or test pre-loaded presets directly on the landing page with instant circular gauge feedback.
- **Core Capability Grid**: 6 enterprise feature cards (NLP heuristics, duplicate syndication clustering, sentiment inversion, multi-facet explorer, product trajectories, and dispute workflows).
- **3-Step How It Works Flow**: Ingest & Sync -> Heuristic Detection -> Autonomous Moderation.
- **Transparent Pricing**: Starter ($0 Trial), Professional ($79/mo), Enterprise (Custom).
- **Enterprise Social Proof & Testimonials**: Real-world feedback from VP of Trust & Safety and Head of QA.
- **Interactive FAQ Accordion**: Expandable questions and answers.
- **Dark Luxury Footer**: Brand credentials, platform links, and security compliance badges.

### 2. Mandatory Authentication System (Section 13)
- **Split-Screen Design**:
  - **Left Section**: Deep navy surface (`#111827`) featuring the glowing gradient ReviewGuard logo, AI trust illustrations, 94.6% accuracy validation metric, and key quote: *"Trust every review. Make smarter decisions."*
  - **Right Section**: Clean light workspace with centered form container, sharp typography, and full mobile responsiveness.
- **Authentication Pages**:
  - **Login (`/login`)**: Email, password with show/hide eye toggle, remember me checkbox, forgot password link, login button with loading spinner, Google SSO simulation, inline error validation, and redirection to `/dashboard`.
  - **Register (`/register`)**: Full name, email, password, confirm password, 4-stage dynamic `PasswordStrengthIndicator` (Weak, Fair, Good, Strong), terms checkbox, and instant account provisioning.
  - **Forgot Password (`/forgot-password`)**: Validated email submission with an interactive dispatched state and return to login.
- **Route Protection & Session Management**:
  - `AuthContext`: Isolated authentication state (`user`, `isAuthenticated`, `login`, `register`, `logout`) with persistent localStorage session.
  - `ProtectedRoute`: Automatically guards dashboard routes (`/dashboard`, `/analyzer`, `/reviews`, `/products`, `/analytics`, `/reports`, `/settings`). Unauthenticated visitors are redirected to `/login`, while authenticated users visiting `/login` or `/register` are redirected to `/dashboard`.

### 3. Review Intelligence Overview (Dashboard — `/dashboard`)
- **4 Key Stat Cards**: Total Reviews Analyzed (24,856), Genuine Reviews (18,492), Suspicious Reviews (4,218), and Detection Accuracy Benchmark (94.6%).
- **Multi-Period Detection Trends**: Interactive Recharts Area Chart comparing genuine vs suspicious volume across 7d, 30d, and 90d intervals.
- **Sentiment Distribution**: Donut chart detailing Positive (58%), Neutral (23%), and Negative (19%) customer sentiments.
- **Horizontal Risk Distribution**: Visual progress indicators for Low Risk, Medium Risk, High Risk, and Critical Risk.
- **AI Intelligence Alerts**: Automated real-time behavioral insights highlighting bot surges, phrase syndicates, and category anomalies.
- **Recent Suspicious Reviews**: Moderation queue table with 1-click modal inspection.

### 4. AI Review Analyzer (`/analyzer`)
- **Interactive Review Workspace**: Live text evaluation, character counter, star rating selector, product/reviewer metadata.
- **1-Click Test Presets**: Genuine, Suspicious, and Neutral samples ready for instant testing.
- **Client-Side Heuristic AI Engine**: Analyzes excessive punctuation, all-caps yelling, promotional marketing buzzwords, keyword stuffing, and rating vs sentiment dissonance.
- **Authenticity Verdict Gauge**: Circular SVG progress gauge showing Fake Probability %, Risk Level badge, Sentiment, Confidence score, and detailed detection signals.

### 5. Review Explorer (`/reviews`)
- **Review Moderation Repository**: Filterable data table of customer feedback across catalog items.
- **Summary Metrics**: All, Genuine, Suspicious, and Pending Review counters.
- **Multi-Facet Filter Toolbar**: Full-text keyword search, status filter, risk level, sentiment, and star ratings with reset support.
- **Pagination & Sorting**: Paginated data grid with configurable rows per page (5, 8, 15, 25).
- **Inspection Modal**: Comprehensive modal showing full review text, verified buyer badge, circular gauge, and moderation actions.

### 6. Product Intelligence (`/products`)
- **Catalog Risk Monitoring**: Overview of product authenticity, average ratings, and synthetic review density.
- **Category Filters**: Filter across Electronics, Home Appliances, Cosmetics, and Furniture.
- **Product Deep-Dive Modal**: 6-month historical authenticity trend chart, star rating distributions, AI flags, and linked sample reviews.

### 7. Trust & Safety Analytics (`/analytics`)
- **Executive Analytics Suite**: 7d, 30d, and 90d date range toggles.
- **Cross-Category Comparison**: Horizontal bar chart identifying fraud-heavy verticals.
- **Rating Authenticity Breakdown**: Clustered bar chart showing fake review density by star rating.
- **Detection Signal Prevalence**: Frequency distribution of heuristic vectors.
- **High Risk Watchlist**: Ranking of products with highest suspicious review percentages.

### 8. Moderation & Flagged Reports (`/reports`)
- **Dispute Resolution Center**: Active dispute queue tracking user complaints, automated bot flags, and merchant inquiries.
- **Status Workflow**: Filter and manage reports across Pending, Reviewed, and Resolved states with toast notifications.

### 9. Platform Settings (`/settings`)
- **Multi-Tab Preferences**: Profile, Detection Engine (adjustable auto-flag probability threshold slider & strict NLP toggle), Security credentials, and Alert Channels.

---

## 🎨 Styling: Tailwind CSS via Vite (No PostCSS)

Tailwind CSS is integrated directly via `@tailwindcss/vite` in `vite.config.js` without any `postcss.config.js`:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ...
});
```

All design tokens and colors are specified in `src/index.css`:
- **Workspace Background**: `#F5F7FB`
- **Sidebar Surface**: `#111827`
- **Sidebar Hover**: `#1C2638`
- **Brand Primary**: `#635BFF`
- **AI Accent**: `#8B5CF6`
- **Genuine / Success**: `#16A34A`
- **Suspicious / Risk**: `#EF6464`
- **Warning / Review**: `#F59E0B`
- **Border**: `#E6EAF2`

---

## 🛠️ How to Run Locally

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Compile for production**:
   ```bash
   npm run build
   ```
