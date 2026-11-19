import React from 'react';
import { Star } from 'lucide-react';

export function RatingStars({
  rating = 5,
  size = 'sm',
  interactive = false,
  onChange,
  className = '',
}) {
  const sizeStyles = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6',
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {stars.map((starIndex) => {
        const isFilled = rating >= starIndex;
        return (
          <button
            key={starIndex}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starIndex)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default pointer-events-none'}`}
          >
            <Star
              className={`${sizeStyles[size]} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-100 text-slate-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
