import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  BarChart3,
  Wallet,
  AlertTriangle,
  Plus,
  Upload,
  Trash2,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  SAMPLE_EXPENSES,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  NATIONAL_CPI,
  calculatePersonalInflation,
  calculateCategoryBreakdown,
  calculateCategoryInflation,
  generateTrendData,
  generateFAIMInsights,
  type Expense,
  type ExpenseCategory,
} from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CHART_COLORS = [
  "hsl(211, 100%, 50%)", // primary blue
  "hsl(142, 71%, 45%)",  // success green
  "hsl(38, 92%, 50%)",   // warning orange
  "hsl(280, 65%, 60%)",  // purple
  "hsl(0, 84%, 60%)",    // destructive red
  "hsl(200, 80%, 55%)",  // light blue
  "hsl(215, 16%, 47%)",  // muted
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(SAMPLE_EXPENSES);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    category: "food" as ExpenseCategory,
    currentAmount: "",
    previousAmount: "",
    frequency: "monthly" as "daily" | "weekly" | "monthly",
  });
  const [timePeriod, setTimePeriod] = useState<30 | 60 | 90>(90);

  const personalInflation = useMemo(() => calculatePersonalInflation(expenses), [expenses]);
  const categoryBreakdown = useMemo(() => calculateCategoryBreakdown(expenses), [expenses]);
  const categoryInflation = useMemo(() => calculateCategoryInflation(expenses), [expenses]);
  const trendData = useMemo(() => generateTrendData(timePeriod), [timePeriod]);
  const faimInsights = useMemo(() => generateFAIMInsights(personalInflation), [personalInflation]);
  const delta = personalInflation - NATIONAL_CPI;

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.currentAmount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      category: newExpense.category,
      currentAmount: parseFloat(newExpense.currentAmount),
      previousAmount: parseFloat(newExpense.previousAmount) || parseFloat(newExpense.currentAmount) * 0.9,
      frequency: newExpense.frequency,
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([...expenses, expense]);
    setNewExpense({
      description: "",
      category: "food",
      currentAmount: "",
      previousAmount: "",
      frequency: "monthly",
    });
    setIsAddExpenseOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-surface">
        <div className="section-container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-display-3 text-foreground mb-2">Personal Inflation Dashboard</h1>
            <p className="text-body-lg text-muted-foreground">
              Real-time insights into your personalized cost-of-living
            </p>
          </div>

          {/* KPI Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KPICard
              title="Personal Inflation Rate (RPIR)"
              value={personalInflation.toFixed(1)}
              suffix="%"
              trend="up"
              trendPositive="down"
              change={delta}
              changeLabel="vs National CPI"
              size="lg"
              variant="primary"
              icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />}
            />
            <KPICard
              title="National CPI"
              value={NATIONAL_CPI.toFixed(1)}
              suffix="%"
              changeLabel="Official Rate"
              icon={<BarChart3 className="w-5 h-5 text-primary" />}
            />
            <KPICard
              title="Monthly Savings Impact"
              value={`-$${Math.round(delta * 100)}`}
              trend="down"
              trendPositive="up"
              change={-delta * 2.5}
              changeLabel="Purchasing power"
              icon={<Wallet className="w-5 h-5 text-primary" />}
            />
            <KPICard
              title="Categories Above CPI"
              value={categoryInflation.filter((c) => c.rate > NATIONAL_CPI).length}
              suffix={`/${categoryInflation.length}`}
              trend={categoryInflation.filter((c) => c.rate > NATIONAL_CPI).length > 3 ? "up" : "neutral"}
              trendPositive="down"
              changeLabel="Need attention"
              icon={<AlertTriangle className="w-5 h-5 text-primary" />}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Expense Calculator */}
            <div className="lg:col-span-1 space-y-6">
              {/* Add Expense Panel */}
              <div className="elevated-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-title-1 text-foreground">Expense Tracker</h2>
                  <div className="flex gap-2">
                    <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4" />
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Expense</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label>Description</Label>
                            <Input
                              placeholder="e.g., Weekly groceries"
                              value={newExpense.description}
                              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Category</Label>
                            <Select
                              value={newExpense.category}
                              onValueChange={(v) => setNewExpense({ ...newExpense, category: v as ExpenseCategory })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                                  <SelectItem key={key} value={key}>
                                    {CATEGORY_ICONS[key as ExpenseCategory]} {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Current Amount ($)</Label>
                              <Input
                                type="number"
                                placeholder="0.00"
                                value={newExpense.currentAmount}
                                onChange={(e) => setNewExpense({ ...newExpense, currentAmount: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Previous Amount ($)</Label>
                              <Input
                                type="number"
                                placeholder="Optional"
                                value={newExpense.previousAmount}
                                onChange={(e) => setNewExpense({ ...newExpense, previousAmount: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Frequency</Label>
                            <Select
                              value={newExpense.frequency}
                              onValueChange={(v) => setNewExpense({ ...newExpense, frequency: v as "daily" | "weekly" | "monthly" })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleAddExpense} className="w-full">
                            Add Expense
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                      CSV
                    </Button>
                  </div>
                </div>

                {/* Expense List */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {expenses.map((expense) => {
                    const inflationRate = ((expense.currentAmount - expense.previousAmount) / expense.previousAmount) * 100;
                    return (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{CATEGORY_ICONS[expense.category]}</span>
                          <div>
                            <p className="text-caption font-medium text-foreground">{expense.description}</p>
                            <p className="text-small text-muted-foreground">
                              ${expense.currentAmount.toFixed(0)}/{expense.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-caption font-medium ${
                              inflationRate > 0 ? "text-destructive" : "text-success"
                            }`}
                          >
                            {inflationRate > 0 ? "+" : ""}
                            {inflationRate.toFixed(1)}%
                          </span>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Breakdown Chart */}
              <div className="elevated-card p-6">
                <h2 className="text-title-1 text-foreground mb-4">Category Breakdown</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(0)}`, "Monthly"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryBreakdown.slice(0, 6).map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                      />
                      <span className="text-small text-muted-foreground truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trend Chart */}
              <div className="elevated-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-title-1 text-foreground">Inflation Trend</h2>
                  <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    {[30, 60, 90].map((period) => (
                      <button
                        key={period}
                        onClick={() => setTimePeriod(period as 30 | 60 | 90)}
                        className={`px-3 py-1.5 rounded-md text-caption font-medium transition-all ${
                          timePeriod === period
                            ? "bg-background text-foreground shadow-apple-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {period}D
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="personalGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(211, 100%, 50%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(211, 100%, 50%)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="cpiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(215, 16%, 47%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(215, 16%, 47%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        interval={Math.floor(trendData.length / 5)}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 10]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                        }}
                        formatter={(value: number) => [`${value.toFixed(2)}%`, ""]}
                        labelFormatter={(label) => new Date(label).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="personal"
                        name="Personal Inflation"
                        stroke="hsl(211, 100%, 50%)"
                        strokeWidth={2}
                        fill="url(#personalGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="cpi"
                        name="National CPI"
                        stroke="hsl(215, 16%, 47%)"
                        strokeWidth={2}
                        fill="url(#cpiGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Inflation Rates */}
              <div className="elevated-card p-6">
                <h2 className="text-title-1 text-foreground mb-4">Category Inflation Rates</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryInflation} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, "dataMax + 5"]}
                      />
                      <YAxis
                        type="category"
                        dataKey="category"
                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                        tickFormatter={(value) => CATEGORY_LABELS[value as ExpenseCategory]?.split(" ")[0] || value}
                        width={80}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "12px",
                        }}
                        formatter={(value: number) => [`${value.toFixed(1)}%`, "Inflation Rate"]}
                        labelFormatter={(label) => CATEGORY_LABELS[label as ExpenseCategory]}
                      />
                      <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                        {categoryInflation.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.rate > NATIONAL_CPI ? "hsl(0, 84%, 60%)" : "hsl(142, 71%, 45%)"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <span className="text-caption text-muted-foreground">Above CPI ({NATIONAL_CPI}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span className="text-caption text-muted-foreground">Below CPI</span>
                  </div>
                </div>
              </div>

              {/* FAIM Insights */}
              <div className="elevated-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-title-1 text-foreground">FAIM Insights</h2>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-small font-medium">
                    Financial Adaptation Module
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {faimInsights.map((insight) => {
                    const Icon = insight.type === "warning" ? AlertTriangle : insight.type === "success" ? CheckCircle : Info;
                    const colorClass = insight.type === "warning" ? "text-warning" : insight.type === "success" ? "text-success" : "text-primary";
                    const bgClass = insight.type === "warning" ? "bg-warning/10" : insight.type === "success" ? "bg-success/10" : "bg-primary/10";

                    return (
                      <div key={insight.id} className={`p-4 rounded-xl ${bgClass}`}>
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 ${colorClass} flex-shrink-0 mt-0.5`} />
                          <div>
                            <h3 className="text-caption font-semibold text-foreground mb-1">{insight.title}</h3>
                            <p className="text-small text-muted-foreground mb-2">{insight.description}</p>
                            {insight.metric && (
                              <span className={`text-small font-medium ${colorClass}`}>{insight.metric}</span>
                            )}
                            {insight.action && (
                              <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-small">
                                {insight.action}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
