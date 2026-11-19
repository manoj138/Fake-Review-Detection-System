# ReviewGuard — AI Review Intelligence & Fake Review Detection Platform

![ReviewGuard Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80)

**ReviewGuard** is a modern, enterprise-grade AI Fake Review Detection and Review Intelligence platform frontend built with **React**, **Vite**, **Tailwind CSS**, **React Router DOM**, **Lucide React**, and **Recharts**.

The application analyzes customer reviews, highlights suspicious syndication patterns, flags malicious competitor bombing, scores fake review probabilities, and monitors review integrity across multi-category product catalogs.

---

## 🚀 Key Features

### 1. Review Intelligence Overview (Dashboard — `/dashboard`)
- **4 Key Stat Cards**: Total Reviews Analyzed (24,856), Genuine Reviews (18,492), Suspicious Reviews (4,218), and Detection Accuracy Benchmark (94.6%).
- **Multi-Period Detection Trends**: Interactive Recharts Area Chart comparing genuine vs suspicious volume across 7d, 30d, and 90d intervals.
- **Sentiment Distribution**: Donut chart detailing Positive (58%), Neutral (23%), and Negative (19%) customer sentiments.
- **Horizontal Risk Distribution**: Visual progress indicators for Low Risk, Medium Risk, High Risk, and Critical Risk.
- **AI Intelligence Alerts**: Automated real-time behavioral insights highlighting bot surges, phrase syndicates, and category anomalies.
- **Recent Suspicious Reviews**: Moderation queue table with 1-click modal inspection.

### 2. AI Review Analyzer (`/analyzer`)
- **Interactive Review Workspace**: Live text evaluation, character counter, star rating selector, product/reviewer metadata.
- **1-Click Test Presets**: Genuine, Suspicious, and Neutral samples ready for instant testing.
- **Client-Side Heuristic AI Engine**: Analyzes excessive punctuation, all-caps yelling, promotional marketing buzzwords, keyword stuffing, and rating vs sentiment dissonance.
- **Authenticity Verdict Gauge**: Circular SVG progress gauge showing Fake Probability %, Risk Level badge, Sentiment, Confidence score, and detailed detection signals.

### 3. Review Explorer (`/reviews`)
- **Review Moderation Repository**: Filterable data table of customer feedback across catalog items.
- **Summary Metrics**: All, Genuine, Suspicious, and Pending Review counters.
- **Multi-Facet Filter Toolbar**: Full-text keyword search, status filter, risk level, sentiment, and star ratings with reset support.
- **Pagination & Sorting**: Paginated data grid with configurable rows per page (5, 8, 15, 25).
- **Inspection Modal**: Comprehensive modal showing full review text, verified buyer badge, circular gauge, and moderation actions.

### 4. Product Intelligence (`/products`)
- **Catalog Risk Monitoring**: Overview of product authenticity, average ratings, and synthetic review density.
- **Category Filters**: Filter across Electronics, Home Appliances, Cosmetics, and Furniture.
- **Product Deep-Dive Modal**: 6-month historical authenticity trend chart, star rating distributions, AI flags, and linked sample reviews.

### 5. Trust & Safety Analytics (`/analytics`)
- **Executive Analytics Suite**: 7d, 30d, and 90d date range toggles.
- **Cross-Category Comparison**: Horizontal bar chart identifying fraud-heavy verticals.
- **Rating Authenticity Breakdown**: Clustered bar chart showing fake review density by star rating.
- **Detection Signal Prevalence**: Frequency distribution of heuristic vectors (buzzwords, duplicate templates, velocity bursts, sentiment dissonance).
- **High Risk Watchlist**: Ranking of products with highest suspicious review percentages.

### 6. Moderation & Flagged Reports (`/reports`)
- **Dispute Resolution Center**: Active dispute queue tracking user complaints, automated bot flags, and merchant inquiries.
- **Status Workflow**: Filter and manage reports across Pending, Reviewed, and Resolved states.
- **Moderation Actions**: "Takedown Review", "Mark Under Review", and "Mark Resolved" with toast notification feedback.

### 7. Platform Settings (`/settings`)
- **Multi-Tab Preferences**: Profile, Detection Engine, Security & Access, and Alert Channels.
- **Engine Tuning**: Calibrate auto-flag probability threshold slider (50% - 95%) and strict NLP clustering toggle.
- **Feedback System**: Interactive form inputs with toast notification feedback.

---

## 🎨 Theme & Design System

| Element | Color Hex | Role |
| :--- | :--- | :--- |
| **Sidebar Primary** | `#111827` | Premium dark navy sidebar surface |
| **Sidebar Active** | `#1C2638` | Active navigation pill background |
| **Workspace Background** | `#F5F7FB` | Crisp, clean light dashboard workspace |
| **Card Surface** | `#FFFFFF` | Flat white cards with subtle borders |
| **Brand Primary** | `#635BFF` | Modern Stripe-inspired indigo |
| **AI Accent** | `#8B5CF6` | Vibrant violet for AI highlights and insights |
| **Success / Genuine** | `#16A34A` | Green for verified and low-risk reviews |
| **Suspicious / Risk** | `#EF6464` | Coral/red for high-risk flags and bot markers |
| **Warning / Review** | `#F59E0B` | Amber for medium risk and pending items |
| **Borders & Dividers** | `#E6EAF2` | Subtle borders for clean visual structure |

---

## 📁 Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── app/
    │   ├── App.jsx
    │   ├── router.jsx
    │   └── providers.jsx
    ├── components/
    │   ├── layout/
    │   │   ├── AppLayout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Header.jsx
    │   │   ├── PageHeader.jsx
    │   │   └── ResponsiveDrawer.jsx
    │   ├── ui/
    │   │   ├── Button.jsx
    │   │   ├── IconButton.jsx
    │   │   ├── Card.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Modal.jsx
    │   │   ├── Drawer.jsx
    │   │   ├── Tabs.jsx
    │   │   ├── SearchInput.jsx
    │   │   ├── Select.jsx
    │   │   ├── Toggle.jsx
    │   │   ├── Pagination.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── DataTable.jsx
    │   │   └── Toast.jsx
    │   ├── dashboard/
    │   │   ├── StatCard.jsx
    │   │   ├── ChartCard.jsx
    │   │   ├── AIInsightCard.jsx
    │   │   ├── RiskDistribution.jsx
    │   │   └── RecentSuspiciousReviews.jsx
    │   ├── reviews/
    │   │   ├── ReviewCard.jsx
    │   │   ├── RatingStars.jsx
    │   │   ├── RiskBadge.jsx
    │   │   ├── SentimentBadge.jsx
    │   │   ├── RiskScoreGauge.jsx
    │   │   ├── DetectionReasonList.jsx
    │   │   └── ReviewDetailsModal.jsx
    │   └── charts/
    │       ├── ReviewTrendChart.jsx
    │       ├── SentimentChart.jsx
    │       ├── RiskDistributionChart.jsx
    │       ├── RatingChart.jsx
    │       └── CategoryComparisonChart.jsx
    ├── pages/
    │   ├── dashboard/Dashboard.jsx
    │   ├── analyzer/ReviewAnalyzer.jsx
    │   ├── reviews/ReviewExplorer.jsx
    │   ├── products/Products.jsx
    │   ├── analytics/TrustAnalytics.jsx
    │   ├── reports/Reports.jsx
    │   └── settings/Settings.jsx
    ├── data/
    │   ├── dashboardData.js
    │   ├── reviewsData.js
    │   ├── productsData.js
    │   ├── analyticsData.js
    │   └── reportsData.js
    ├── hooks/
    │   ├── useFilters.js
    │   ├── usePagination.js
    │   └── useToast.js
    ├── utils/
    │   ├── formatDate.js
    │   ├── formatNumber.js
    │   └── reviewAnalysis.js
    └── constants/
        ├── navigation.js
        └── statuses.js
```

---

## 🛠️ Running Locally

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
