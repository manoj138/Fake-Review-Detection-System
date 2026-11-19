import React from 'react';
import { Badge } from '../ui/Badge';
import { RISK_LEVELS } from '../../constants/statuses';

export function RiskBadge({ level = 'Low', className = '', size = 'md' }) {
  const normKey = (level || 'Low').toUpperCase();
  const config = RISK_LEVELS[normKey] || RISK_LEVELS.LOW;

  return (
    <Badge
      variant={config.badgeVariant}
      size={size}
      dot
      className={className}
    >
      {config.label}
    </Badge>
  );
}
