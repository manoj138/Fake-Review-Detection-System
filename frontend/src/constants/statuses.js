export const RISK_LEVELS = {
  LOW: {
    label: 'Low Risk',
    color: '#16A34A',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    badgeVariant: 'success',
  },
  MEDIUM: {
    label: 'Medium Risk',
    color: '#F59E0B',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    badgeVariant: 'warning',
  },
  HIGH: {
    label: 'High Risk',
    color: '#EF6464',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    badgeVariant: 'danger',
  },
  CRITICAL: {
    label: 'Critical Risk',
    color: '#DC2626',
    bg: 'bg-red-100 text-red-800 border-red-300 font-semibold',
    dot: 'bg-red-600',
    badgeVariant: 'critical',
  },
};

export const AUTHENTICITY_STATUS = {
  GENUINE: {
    label: 'Genuine',
    badgeVariant: 'success',
    color: '#16A34A',
  },
  SUSPICIOUS: {
    label: 'Suspicious',
    badgeVariant: 'danger',
    color: '#EF6464',
  },
  UNCERTAIN: {
    label: 'Uncertain',
    badgeVariant: 'warning',
    color: '#F59E0B',
  },
  PENDING: {
    label: 'Pending Review',
    badgeVariant: 'secondary',
    color: '#718096',
  },
};

export const SENTIMENT_TYPES = {
  POSITIVE: {
    label: 'Positive',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconColor: 'text-emerald-500',
  },
  NEUTRAL: {
    label: 'Neutral',
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    iconColor: 'text-slate-500',
  },
  NEGATIVE: {
    label: 'Negative',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    iconColor: 'text-rose-500',
  },
};
