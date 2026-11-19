import React from 'react';

const SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm font-semibold',
  lg: 'w-12 h-12 text-base font-semibold',
  xl: 'w-16 h-16 text-xl font-bold',
};

const STATUS_SIZES = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5 ring-2 ring-white',
};

const STATUS_COLORS = {
  online: 'bg-emerald-500',
  busy: 'bg-rose-500',
  offline: 'bg-slate-400',
};

export function UserAvatar({
  name = 'User',
  image,
  size = 'md',
  status,
  className = '',
  onClick,
}) {
  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizeClasses = SIZES[size] || SIZES.md;
  const statusSize = STATUS_SIZES[size] || STATUS_SIZES.md;
  const statusColor = STATUS_COLORS[status] || STATUS_COLORS.online;

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${
        onClick ? 'cursor-pointer hover:opacity-90' : ''
      } ${className}`}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className={`${sizeClasses} rounded-full object-cover border border-brand-border`}
        />
      ) : (
        <div
          className={`${sizeClasses} rounded-full bg-gradient-to-tr from-[#635BFF] to-[#8B5CF6] text-white flex items-center justify-center shadow-xs font-sans tracking-wide`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 rounded-full ring-1 ring-white ${statusSize} ${statusColor}`}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}

export default UserAvatar;

