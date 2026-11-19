import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2.5 rounded-lg border border-brand-border shadow-popover text-xs">
        <p className="font-semibold text-brand-dark flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          {data.name}
        </p>
        <p className="text-brand-muted mt-0.5">
          {data.value.toLocaleString()} reviews ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export function SentimentChart({ data = [], height = 240 }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '100%', height }} className="relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-brand-dark">100%</span>
          <span className="text-[10px] text-brand-muted uppercase tracking-wider font-medium">
            Sentiment
          </span>
        </div>
      </div>

      {/* Clean Legend */}
      <div className="flex items-center justify-center gap-6 mt-2 w-full text-xs">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-brand-muted">{item.name}</span>
            <span className="font-semibold text-brand-dark">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

