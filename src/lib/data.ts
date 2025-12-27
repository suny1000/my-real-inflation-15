// TPII Mock Data & Types

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  currentAmount: number;
  previousAmount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  date: string;
}

export type ExpenseCategory = 
  | 'food' 
  | 'rent' 
  | 'transport' 
  | 'healthcare' 
  | 'education' 
  | 'utilities' 
  | 'discretionary';

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: 'Food & Groceries',
  rent: 'Rent & Housing',
  transport: 'Transportation',
  healthcare: 'Healthcare',
  education: 'Education',
  utilities: 'Utilities',
  discretionary: 'Discretionary',
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  food: 'hsl(var(--chart-1))',
  rent: 'hsl(var(--chart-2))',
  transport: 'hsl(var(--chart-3))',
  healthcare: 'hsl(var(--chart-4))',
  education: 'hsl(var(--chart-5))',
  utilities: 'hsl(var(--chart-6))',
  discretionary: 'hsl(var(--muted-foreground))',
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  food: '🍎',
  rent: '🏠',
  transport: '🚗',
  healthcare: '🏥',
  education: '📚',
  utilities: '💡',
  discretionary: '🛍️',
};

// Sample expenses for demo
export const SAMPLE_EXPENSES: Expense[] = [
  { id: '1', description: 'Weekly groceries', category: 'food', currentAmount: 185, previousAmount: 165, frequency: 'weekly', date: '2025-01-15' },
  { id: '2', description: 'Monthly rent', category: 'rent', currentAmount: 2200, previousAmount: 2100, frequency: 'monthly', date: '2025-01-01' },
  { id: '3', description: 'Gas & fuel', category: 'transport', currentAmount: 220, previousAmount: 180, frequency: 'monthly', date: '2025-01-10' },
  { id: '4', description: 'Health insurance', category: 'healthcare', currentAmount: 450, previousAmount: 420, frequency: 'monthly', date: '2025-01-01' },
  { id: '5', description: 'Electricity bill', category: 'utilities', currentAmount: 145, previousAmount: 125, frequency: 'monthly', date: '2025-01-05' },
  { id: '6', description: 'Internet & phone', category: 'utilities', currentAmount: 120, previousAmount: 110, frequency: 'monthly', date: '2025-01-05' },
  { id: '7', description: 'Restaurant dining', category: 'food', currentAmount: 280, previousAmount: 240, frequency: 'monthly', date: '2025-01-12' },
  { id: '8', description: 'Streaming services', category: 'discretionary', currentAmount: 45, previousAmount: 40, frequency: 'monthly', date: '2025-01-01' },
  { id: '9', description: 'Gym membership', category: 'healthcare', currentAmount: 65, previousAmount: 55, frequency: 'monthly', date: '2025-01-01' },
  { id: '10', description: 'Online courses', category: 'education', currentAmount: 50, previousAmount: 45, frequency: 'monthly', date: '2025-01-08' },
];

// Calculate personal inflation from expenses
export function calculatePersonalInflation(expenses: Expense[]): number {
  if (expenses.length === 0) return 0;
  
  let totalCurrent = 0;
  let totalPrevious = 0;
  
  expenses.forEach(expense => {
    const multiplier = expense.frequency === 'daily' ? 30 : expense.frequency === 'weekly' ? 4 : 1;
    totalCurrent += expense.currentAmount * multiplier;
    totalPrevious += expense.previousAmount * multiplier;
  });
  
  if (totalPrevious === 0) return 0;
  return ((totalCurrent - totalPrevious) / totalPrevious) * 100;
}

// Calculate category breakdown
export function calculateCategoryBreakdown(expenses: Expense[]): { name: string; value: number; category: ExpenseCategory }[] {
  const breakdown: Record<ExpenseCategory, number> = {
    food: 0,
    rent: 0,
    transport: 0,
    healthcare: 0,
    education: 0,
    utilities: 0,
    discretionary: 0,
  };
  
  expenses.forEach(expense => {
    const multiplier = expense.frequency === 'daily' ? 30 : expense.frequency === 'weekly' ? 4 : 1;
    breakdown[expense.category] += expense.currentAmount * multiplier;
  });
  
  return Object.entries(breakdown)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: CATEGORY_LABELS[category as ExpenseCategory],
      value,
      category: category as ExpenseCategory,
    }));
}

// Calculate category inflation rates
export function calculateCategoryInflation(expenses: Expense[]): { category: ExpenseCategory; rate: number }[] {
  const categoryTotals: Record<ExpenseCategory, { current: number; previous: number }> = {
    food: { current: 0, previous: 0 },
    rent: { current: 0, previous: 0 },
    transport: { current: 0, previous: 0 },
    healthcare: { current: 0, previous: 0 },
    education: { current: 0, previous: 0 },
    utilities: { current: 0, previous: 0 },
    discretionary: { current: 0, previous: 0 },
  };
  
  expenses.forEach(expense => {
    const multiplier = expense.frequency === 'daily' ? 30 : expense.frequency === 'weekly' ? 4 : 1;
    categoryTotals[expense.category].current += expense.currentAmount * multiplier;
    categoryTotals[expense.category].previous += expense.previousAmount * multiplier;
  });
  
  return Object.entries(categoryTotals)
    .filter(([_, totals]) => totals.previous > 0)
    .map(([category, totals]) => ({
      category: category as ExpenseCategory,
      rate: ((totals.current - totals.previous) / totals.previous) * 100,
    }))
    .sort((a, b) => b.rate - a.rate);
}

// Generate trend data for charts
export function generateTrendData(days: number = 90): { date: string; personal: number; cpi: number }[] {
  const data: { date: string; personal: number; cpi: number }[] = [];
  const basePersonal = 7.2;
  const baseCPI = 3.4;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some variance
    const variance = Math.sin(i * 0.1) * 0.5 + Math.random() * 0.3;
    const trendUp = (days - i) * 0.01;
    
    data.push({
      date: date.toISOString().split('T')[0],
      personal: +(basePersonal + variance + trendUp).toFixed(2),
      cpi: +(baseCPI + variance * 0.3).toFixed(2),
    });
  }
  
  return data;
}

// Generate heatmap data
export function generateHeatmapData(): { day: string; category: string; value: number }[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const categories = ['Food', 'Transport', 'Utilities', 'Discretionary'];
  const data: { day: string; category: string; value: number }[] = [];
  
  days.forEach(day => {
    categories.forEach(category => {
      let baseValue = Math.random() * 50 + 20;
      
      // Weekend spending patterns
      if ((day === 'Sat' || day === 'Sun') && category === 'Discretionary') {
        baseValue *= 1.5;
      }
      if ((day === 'Sat' || day === 'Sun') && category === 'Food') {
        baseValue *= 1.3;
      }
      
      data.push({ day, category, value: Math.round(baseValue) });
    });
  });
  
  return data;
}

// Scenario presets
export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  adjustments: Partial<Record<ExpenseCategory, number>>;
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'student',
    name: 'Student Life',
    description: 'Lower housing costs, higher education expenses, budget-conscious food choices',
    adjustments: { rent: -30, education: 50, food: -20, discretionary: -40 },
  },
  {
    id: 'professional',
    name: 'Working Professional',
    description: 'Higher transport costs, premium healthcare, moderate discretionary spending',
    adjustments: { transport: 40, healthcare: 25, discretionary: 30, rent: 20 },
  },
  {
    id: 'family',
    name: 'Family with Kids',
    description: 'Higher food costs, education expenses, healthcare needs',
    adjustments: { food: 60, education: 80, healthcare: 40, utilities: 25 },
  },
  {
    id: 'inflation-shock',
    name: 'Inflation Shock',
    description: 'Simulate 20% increase in food and fuel prices',
    adjustments: { food: 20, transport: 20, utilities: 15 },
  },
];

// FAIM insights
export interface FAIMInsight {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  metric?: string;
  action?: string;
}

export function generateFAIMInsights(personalInflation: number): FAIMInsight[] {
  const insights: FAIMInsight[] = [];
  
  if (personalInflation > 5) {
    insights.push({
      id: '1',
      type: 'warning',
      title: 'Savings Adjustment Required',
      description: 'Your personal inflation rate is significantly above the national average. Consider increasing your monthly savings target.',
      metric: `+${((personalInflation - 3.4) * 100).toFixed(0)} basis points above CPI`,
      action: 'Increase savings by 15%',
    });
  }
  
  if (personalInflation > 7) {
    insights.push({
      id: '2',
      type: 'warning',
      title: 'Retirement Impact Alert',
      description: 'At your current inflation rate, your retirement timeline may be affected. Consider reviewing investment allocations.',
      metric: `${(personalInflation * 0.8).toFixed(1)} years earlier depletion`,
    });
  }
  
  insights.push({
    id: '3',
    type: 'info',
    title: 'Food Category Pressure',
    description: 'Food prices are rising faster than other categories in your spending profile.',
    metric: '+12.1% over 12 months',
    action: 'Review grocery alternatives',
  });
  
  insights.push({
    id: '4',
    type: 'success',
    title: 'Utility Costs Stable',
    description: 'Your utility costs have remained relatively stable compared to national trends.',
    metric: '-2.3% below average',
  });
  
  return insights;
}

// National CPI reference
export const NATIONAL_CPI = 3.4;
