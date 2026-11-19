import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl border border-brand-border shadow-popover text-xs">
        <p className="font-semibold text-brand-dark mb-1.5">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-brand-muted">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-semibold text-brand-dark">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export function ReviewTrendChart({ data = [], height = 300 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="genuineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="suspiciousGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF6464" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#EF6464" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F4F9" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#718096' }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#718096' }}
            dx={-4}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="genuine"
            name="Genuine Reviews"
            stroke="#16A34A"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#genuineGradient)"
          />
          <Area
            type="monotone"
            dataKey="suspicious"
            name="Suspicious Reviews"
            stroke="#EF6464"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#suspiciousGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

