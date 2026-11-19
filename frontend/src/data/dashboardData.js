export const DASHBOARD_STATS = [
  {
    id: 'total-reviews',
    title: 'Total Reviews Analyzed',
    value: 24856,
    growth: '+12.8%',
    isPositive: true,
    accent: 'primary',
    icon: 'FileText',
    comparisonLabel: 'vs. previous 30 days',
  },
  {
    id: 'genuine-reviews',
    title: 'Genuine Reviews',
    value: 18492,
    growth: '+8.4%',
    isPositive: true,
    accent: 'success',
    icon: 'CheckCircle2',
    comparisonLabel: 'vs. previous 30 days',
  },
  {
    id: 'suspicious-reviews',
    title: 'Suspicious Reviews',
    value: 4218,
    growth: '+18.2%',
    isPositive: false,
    accent: 'danger',
    icon: 'AlertTriangle',
    comparisonLabel: 'vs. previous 30 days',
  },
  {
    id: 'detection-accuracy',
    title: 'Detection Accuracy',
    value: '94.6%',
    growth: '+2.3%',
    isPositive: true,
    accent: 'ai',
    icon: 'Target',
    comparisonLabel: 'model validation benchmark',
  },
];

export const DETECTION_TRENDS = {
  '7d': [
    { date: 'Nov 13', genuine: 620, suspicious: 110, total: 730 },
    { date: 'Nov 14', genuine: 680, suspicious: 145, total: 825 },
    { date: 'Nov 15', genuine: 710, suspicious: 180, total: 890 },
    { date: 'Nov 16', genuine: 640, suspicious: 195, total: 835 },
    { date: 'Nov 17', genuine: 790, suspicious: 160, total: 950 },
    { date: 'Nov 18', genuine: 830, suspicious: 220, total: 1050 },
    { date: 'Nov 19', genuine: 890, suspicious: 240, total: 1130 },
  ],
  '30d': [
    { date: 'Oct 21', genuine: 540, suspicious: 95, total: 635 },
    { date: 'Oct 26', genuine: 590, suspicious: 120, total: 710 },
    { date: 'Oct 31', genuine: 630, suspicious: 140, total: 770 },
    { date: 'Nov 05', genuine: 680, suspicious: 165, total: 845 },
    { date: 'Nov 10', genuine: 720, suspicious: 190, total: 910 },
    { date: 'Nov 15', genuine: 780, suspicious: 210, total: 990 },
    { date: 'Nov 19', genuine: 890, suspicious: 240, total: 1130 },
  ],
  '90d': [
    { date: 'Sep 01', genuine: 4200, suspicious: 720, total: 4920 },
    { date: 'Sep 15', genuine: 4600, suspicious: 840, total: 5440 },
    { date: 'Oct 01', genuine: 5100, suspicious: 980, total: 6080 },
    { date: 'Oct 15', genuine: 5500, suspicious: 1120, total: 6620 },
    { date: 'Nov 01', genuine: 6100, suspicious: 1350, total: 7450 },
    { date: 'Nov 19', genuine: 6800, suspicious: 1620, total: 8420 },
  ],
};

export const SENTIMENT_DISTRIBUTION = [
  { name: 'Positive', value: 14416, percentage: 58, color: '#16A34A' },
  { name: 'Neutral', value: 5716, percentage: 23, color: '#64748B' },
  { name: 'Negative', value: 4724, percentage: 19, color: '#EF6464' },
];

export const RISK_DISTRIBUTION = [
  { level: 'Low Risk', count: 18492, percentage: 74.4, color: '#16A34A', bgClass: 'bg-emerald-500' },
  { level: 'Medium Risk', count: 2146, percentage: 8.6, color: '#F59E0B', bgClass: 'bg-amber-500' },
  { level: 'High Risk', count: 2894, percentage: 11.6, color: '#EF6464', bgClass: 'bg-rose-500' },
  { level: 'Critical Risk', count: 1324, percentage: 5.4, color: '#DC2626', bgClass: 'bg-red-600' },
];

export const AI_INSIGHTS = [
  {
    id: 'ins-1',
    category: 'Activity Surge',
    text: 'Suspicious review activity increased by 18% this week, concentrated heavily in Electronics accessories.',
    level: 'warning',
    tag: 'Surge Alert',
  },
  {
    id: 'ins-2',
    category: 'Pattern Match',
    text: '42 reviews share unusually similar wording ("BEST PRODUCT EVER!! BUY NOW!!") across 3 separate seller stores.',
    level: 'danger',
    tag: 'Syndicate Detected',
  },
  {
    id: 'ins-3',
    category: 'Category Risk',
    text: 'Electronics category shows the highest suspicious activity at 28.1% of all submitted feedback.',
    level: 'info',
    tag: 'Sector Risk',
  },
  {
    id: 'ins-4',
    category: 'Sentiment Divergence',
    text: '128 reviews have 5-star ratings accompanied by negative phrase sentiment, suggesting bot inversion error.',
    level: 'warning',
    tag: 'Anomaly',
  },
];
