export const CATEGORY_COMPARISON = [
  { category: 'Electronics', total: 9940, genuine: 7630, suspicious: 2310, suspiciousRate: 23.2 },
  { category: 'Cosmetics', total: 6120, genuine: 4210, suspicious: 1910, suspiciousRate: 31.2 },
  { category: 'Home Appliances', total: 4890, genuine: 4240, suspicious: 650, suspiciousRate: 13.3 },
  { category: 'Furniture', total: 2450, genuine: 2280, suspicious: 170, suspiciousRate: 6.9 },
  { category: 'Sports & Outdoors', total: 1456, genuine: 1350, suspicious: 106, suspiciousRate: 7.3 },
];

export const RATING_AUTHENTICITY = [
  { rating: '5 Stars', genuine: 10200, suspicious: 3200, fakeRate: 23.8 },
  { rating: '4 Stars', genuine: 4500, suspicious: 420, fakeRate: 8.5 },
  { rating: '3 Stars', genuine: 1900, suspicious: 210, fakeRate: 9.9 },
  { rating: '2 Stars', genuine: 980, suspicious: 140, fakeRate: 12.5 },
  { rating: '1 Star', genuine: 912, suspicious: 480, fakeRate: 34.5 },
];

export const DETECTION_REASONS_BREAKDOWN = [
  { reason: 'Excessive Promotional Buzzwords', count: 1840, percentage: 43.6, color: '#EF6464' },
  { reason: 'Syntactic Duplication & Bot Templates', count: 1220, percentage: 28.9, color: '#F59E0B' },
  { reason: 'Burst Submission Velocity (IP Cluster)', count: 910, percentage: 21.5, color: '#8B5CF6' },
  { reason: 'Sentiment vs Rating Dissonance', count: 480, percentage: 11.4, color: '#635BFF' },
  { reason: 'Unverified New Account Clustering', count: 340, percentage: 8.1, color: '#64748B' },
];

export const HOURLY_SUSPICIOUS_HEAT = [
  { hour: '00:00', normal: 120, botBursts: 85 },
  { hour: '04:00', normal: 60, botBursts: 140 },
  { hour: '08:00', normal: 340, botBursts: 50 },
  { hour: '12:00', normal: 580, botBursts: 90 },
  { hour: '16:00', normal: 640, botBursts: 110 },
  { hour: '20:00', normal: 490, botBursts: 195 },
];

