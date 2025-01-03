export type CategoryId = 'behavioral' | 'product-design' | 'strategy' | 'execution' | 'estimation';

export interface CategoryConfig {
  color: string;
  gradient: string;
  activeGradient: string;
  textColor: string;
  borderColor: string;
  progressColor: string;
}

export const categoryConfig: Record<CategoryId, CategoryConfig> = {
  behavioral: {
    color: 'purple',
    gradient: 'from-purple-50 to-purple-100',
    activeGradient: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    progressColor: 'linear-gradient(to right, #9333ea, #7e22ce)',
  },
  'product-design': {
    color: 'blue',
    gradient: 'from-blue-50 to-blue-100',
    activeGradient: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    progressColor: 'linear-gradient(to right, #3b82f6, #2563eb)',
  },
  strategy: {
    color: 'emerald',
    gradient: 'from-emerald-50 to-emerald-100',
    activeGradient: 'from-emerald-100 to-emerald-200',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    progressColor: 'linear-gradient(to right, #10b981, #059669)',
  },
  execution: {
    color: 'orange',
    gradient: 'from-orange-50 to-orange-100',
    activeGradient: 'from-orange-100 to-orange-200',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    progressColor: 'linear-gradient(to right, #f97316, #ea580c)',
  },
  estimation: {
    color: 'rose',
    gradient: 'from-rose-50 to-rose-100',
    activeGradient: 'from-rose-100 to-rose-200',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    progressColor: 'linear-gradient(to right, #f43f5e, #e11d48)',
  },
};

export const GA_TRACKING_ID = 'G-SG0P7EWJTS' 