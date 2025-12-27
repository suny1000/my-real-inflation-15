import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { KPICard } from "@/components/ui/kpi-card";
import {
  SAMPLE_EXPENSES,
  NATIONAL_CPI,
  calculatePersonalInflation,
  calculateCategoryInflation,
  generateTrendData,
  CATEGORY_LABELS,
  type ExpenseCategory,
} from "@/lib/data";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { useMemo } from "react";

export default function Insights() {
  const personalInflation = useMemo(() => calculatePersonalInflation(SAMPLE_EXPENSES), []);
  const categoryInflation = useMemo(() => calculateCategoryInflation(SAMPLE_EXPENSES), []);
  const trendData = useMemo(() => generateTrendData(90), []);

  const highestCategory = categoryInflation[0];
  const lowestCategory = categoryInflation[categoryInflation.length - 1];
  const aboveCPICount = categoryInflation.filter((c) => c.rate > NATIONAL_CPI).length;

  const weeklyTrend = trendData.slice(-7);
  const weeklyAvg = weeklyTrend.reduce((sum, d) => sum + d.personal, 0) / weeklyTrend.length;
  const prevWeekAvg = trendData.slice(-14, -7).reduce((sum, d) => sum + d.personal, 0) / 7;
  const weeklyChange = weeklyAvg - prevWeekAvg;

  return (
    <Layout>
      <Section>
        <SectionHeader
          badge="Deep Analysis"
          title="Inflation Insights"
          subtitle="Comprehensive analysis of your personal inflation patterns and actionable recommendations."
        />

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <KPICard
            title="Personal vs National"
            value={`+${(personalInflation - NATIONAL_CPI).toFixed(1)}`}
            suffix="pp"
            trend="up"
            trendPositive="down"
            changeLabel="Above CPI"
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
          />
          <KPICard
            title="Week-over-Week"
            value={weeklyChange > 0 ? `+${weeklyChange.toFixed(2)}` : weeklyChange.toFixed(2)}
            suffix="%"
            trend={weeklyChange > 0 ? "up" : "down"}
            trendPositive="down"
            changeLabel="Change"
            icon={weeklyChange > 0 ? <TrendingUp className="w-5 h-5 text-primary" /> : <TrendingDown className="w-5 h-5 text-primary" />}
          />
          <KPICard
            title="Categories Above CPI"
            value={aboveCPICount}
            suffix={`/${categoryInflation.length}`}
            trend={aboveCPICount > 3 ? "up" : "neutral"}
            trendPositive="down"
            changeLabel="Need attention"
            icon={<AlertTriangle className="w-5 h-5 text-primary" />}
          />
          <KPICard
            title="Best Performing"
            value={lowestCategory?.rate.toFixed(1) || "0"}
            suffix="%"
            trend="down"
            trendPositive="down"
            changeLabel={CATEGORY_LABELS[lowestCategory?.category as ExpenseCategory]?.split(" ")[0] || "N/A"}
            icon={<CheckCircle className="w-5 h-5 text-primary" />}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trend Analysis */}
          <div className="elevated-card p-6">
            <h3 className="text-title-1 text-foreground mb-4">90-Day Trend Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    interval={14}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[2, 9]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value.toFixed(2)}%`,
                      name === "personal" ? "Your Rate" : "National CPI",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="personal"
                    stroke="hsl(211, 100%, 50%)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cpi"
                    stroke="hsl(215, 16%, 47%)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-caption text-muted-foreground">Personal Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-muted-foreground" style={{ borderBottom: "2px dashed" }} />
                <span className="text-caption text-muted-foreground">National CPI</span>
              </div>
            </div>
          </div>

          {/* Category Performance */}
          <div className="elevated-card p-6">
            <h3 className="text-title-1 text-foreground mb-4">Category Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryInflation} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, "dataMax + 5"]}
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(value) => CATEGORY_LABELS[value as ExpenseCategory]?.split(" ")[0] || value}
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Rate"]}
                    labelFormatter={(label) => CATEGORY_LABELS[label as ExpenseCategory]}
                  />
                  <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                    {categoryInflation.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.rate > NATIONAL_CPI * 1.5
                            ? "hsl(0, 84%, 60%)"
                            : entry.rate > NATIONAL_CPI
                            ? "hsl(38, 92%, 50%)"
                            : "hsl(142, 71%, 45%)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="elevated-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-title-2 text-foreground">Highest Pressure</h3>
            </div>
            <p className="text-display-3 font-bold text-foreground mb-1">
              {highestCategory ? CATEGORY_LABELS[highestCategory.category] : "N/A"}
            </p>
            <p className="text-body text-muted-foreground mb-4">
              at {highestCategory?.rate.toFixed(1)}% inflation rate
            </p>
            <p className="text-caption text-muted-foreground">
              This category is experiencing the highest price pressure in your spending profile.
              Consider alternatives or budget adjustments.
            </p>
          </div>

          <div className="elevated-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
              <h3 className="text-title-2 text-foreground">Optimization Target</h3>
            </div>
            <p className="text-display-3 font-bold text-foreground mb-1">
              ${Math.round((personalInflation - NATIONAL_CPI) * 150)}/mo
            </p>
            <p className="text-body text-muted-foreground mb-4">
              potential savings
            </p>
            <p className="text-caption text-muted-foreground">
              By aligning your inflation rate with the national average, you could reclaim this
              amount in monthly purchasing power.
            </p>
          </div>

          <div className="elevated-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-title-2 text-foreground">Key Recommendation</h3>
            </div>
            <p className="text-body font-medium text-foreground mb-4">
              Focus on {highestCategory ? CATEGORY_LABELS[highestCategory.category].toLowerCase() : "high-impact categories"}
            </p>
            <p className="text-caption text-muted-foreground">
              Small changes in your highest-inflation categories can have outsized effects on your
              overall personal inflation rate. Start with weekly planning and price comparison.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
