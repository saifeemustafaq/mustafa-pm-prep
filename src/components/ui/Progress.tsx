import clsx from 'clsx';

interface ProgressProps {
  value: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export default function Progress({ value, label, size = 'md', color, className }: ProgressProps) {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={clsx("w-full group", className)}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
          {label}
        </span>
        <span className="text-xs font-medium text-blue-600 transition-colors duration-200 group-hover:text-blue-700">
          {value}%
        </span>
      </div>
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${heights[size]} transition-all duration-200 group-hover:bg-gray-200`}>
        <div
          className="transition-all duration-500 rounded-full"
          style={{ 
            width: `${value}%`,
            height: '100%',
            background: color || 'linear-gradient(to right, #3b82f6, #2563eb)'
          }}
        />
      </div>
    </div>
  );
} 