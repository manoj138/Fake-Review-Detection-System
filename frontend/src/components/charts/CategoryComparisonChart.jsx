import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-xl border border-brand-border shadow-popover text-xs">
        <p className="font-semibold text-brand-dark mb-1">{data.category}</p>
        <p className="text-brand-muted">
          Total Reviews: <strong className="text-brand-dark">{data.total.toLocaleString()}</strong>
        </p>
        <p className="text-brand-muted">
          Suspicious Volume: <strong className="text-rose-600">{data.suspicious.toLocaleString()}</strong>
        </p>
        <p className="text-brand-muted">
          Risk Rate: <strong className="text-rose-600">{data.suspiciousRate}%</strong>
        </p>
      </div>
    );
  }
  return null;
}

export function CategoryComparisonChart({ data = [], height = 280 }) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F4F9" />
          <XAxis
            type="number"
            unit="%"
            domain={[0, 40]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#718096' }}
          />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#172033', fontWeight: 500 }}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="suspiciousRate"
            name="Suspicious Rate %"
            fill="#8B5CF6"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

