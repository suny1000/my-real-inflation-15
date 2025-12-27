import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { KPICard } from "@/components/ui/kpi-card";
import {
  SCENARIO_PRESETS,
  SAMPLE_EXPENSES,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  NATIONAL_CPI,
  calculatePersonalInflation,
  type ExpenseCategory,
  type ScenarioPreset,
} from "@/lib/data";
import {
  TrendingUp,
  RefreshCw,
  GraduationCap,
  Briefcase,
  Home,
  Flame,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PRESET_ICONS: Record<string, React.ElementType> = {
  student: GraduationCap,
  professional: Briefcase,
  family: Home,
  "inflation-shock": Flame,
};

export default function Scenarios() {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<Partial<Record<ExpenseCategory, number>>>({
    food: 0,
    rent: 0,
    transport: 0,
    healthcare: 0,
    education: 0,
    utilities: 0,
    discretionary: 0,
  });

  const baseInflation = useMemo(() => calculatePersonalInflation(SAMPLE_EXPENSES), []);

  const adjustedExpenses = useMemo(() => {
    return SAMPLE_EXPENSES.map((expense) => {
      const adjustment = adjustments[expense.category] || 0;
      const multiplier = 1 + adjustment / 100;
      return {
        ...expense,
        currentAmount: expense.currentAmount * multiplier,
      };
    });
  }, [adjustments]);

  const adjustedInflation = useMemo(() => calculatePersonalInflation(adjustedExpenses), [adjustedExpenses]);
  const inflationDelta = adjustedInflation - baseInflation;

  const handlePresetSelect = (preset: ScenarioPreset) => {
    setSelectedPreset(preset.id);
    setAdjustments({
      food: preset.adjustments.food || 0,
      rent: preset.adjustments.rent || 0,
      transport: preset.adjustments.transport || 0,
      healthcare: preset.adjustments.healthcare || 0,
      education: preset.adjustments.education || 0,
      utilities: preset.adjustments.utilities || 0,
      discretionary: preset.adjustments.discretionary || 0,
    });
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setAdjustments({
      food: 0,
      rent: 0,
      transport: 0,
      healthcare: 0,
      education: 0,
      utilities: 0,
      discretionary: 0,
    });
  };

  const radarData = Object.entries(adjustments).map(([category, value]) => ({
    category: CATEGORY_LABELS[category as ExpenseCategory].split(" ")[0],
    baseline: 100,
    adjusted: 100 + (value || 0),
    fullMark: 200,
  }));

  return (
    <Layout>
      <Section>
        <SectionHeader
          badge="Scenario Simulator"
          title="What-If Analysis"
          subtitle="Explore how lifestyle changes or economic shocks would affect your personal inflation rate."
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Preset Scenarios */}
            <div className="elevated-card p-6">
              <h3 className="text-title-1 text-foreground mb-4">Quick Scenarios</h3>
              <div className="space-y-3">
                {SCENARIO_PRESETS.map((preset) => {
                  const Icon = PRESET_ICONS[preset.id] || TrendingUp;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className={`w-full p-4 rounded-xl border transition-all text-left ${
                        selectedPreset === preset.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            selectedPreset === preset.id ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-caption font-semibold text-foreground">{preset.name}</h4>
                      </div>
                      <p className="text-small text-muted-foreground">{preset.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Adjustments */}
            <div className="elevated-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-title-1 text-foreground">Custom Adjustments</h3>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
              <div className="space-y-6">
                {(Object.keys(adjustments) as ExpenseCategory[]).map((category) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-caption font-medium text-foreground">
                        {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]}
                      </span>
                      <span
                        className={`text-caption font-semibold ${
                          (adjustments[category] || 0) > 0
                            ? "text-destructive"
                            : (adjustments[category] || 0) < 0
                            ? "text-success"
                            : "text-muted-foreground"
                        }`}
                      >
                        {(adjustments[category] || 0) > 0 ? "+" : ""}
                        {adjustments[category] || 0}%
                      </span>
                    </div>
                    <Slider
                      value={[adjustments[category] || 0]}
                      onValueChange={([value]) =>
                        setAdjustments((prev) => ({ ...prev, [category]: value }))
                      }
                      min={-50}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* KPIs */}
            <div className="grid md:grid-cols-3 gap-4">
              <KPICard
                title="Baseline RPIR"
                value={baseInflation.toFixed(1)}
                suffix="%"
                changeLabel="Current rate"
                icon={<TrendingUp className="w-5 h-5 text-primary" />}
              />
              <KPICard
                title="Adjusted RPIR"
                value={adjustedInflation.toFixed(1)}
                suffix="%"
                trend={inflationDelta > 0 ? "up" : inflationDelta < 0 ? "down" : "neutral"}
                trendPositive="down"
                change={inflationDelta}
                changeLabel="vs baseline"
                variant="primary"
                icon={<TrendingUp className="w-5 h-5 text-primary-foreground" />}
              />
              <KPICard
                title="Annual Impact"
                value={`$${Math.abs(Math.round(inflationDelta * 500))}`}
                prefix={inflationDelta > 0 ? "-" : "+"}
                trend={inflationDelta > 0 ? "down" : "up"}
                trendPositive="up"
                changeLabel="On savings"
              />
            </div>

            {/* Radar Chart */}
            <div className="elevated-card p-6">
              <h3 className="text-title-1 text-foreground mb-4">Category Impact Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 200]}
                      tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Radar
                      name="Baseline"
                      dataKey="baseline"
                      stroke="hsl(215, 16%, 47%)"
                      fill="hsl(215, 16%, 47%)"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="Adjusted"
                      dataKey="adjusted"
                      stroke="hsl(211, 100%, 50%)"
                      fill="hsl(211, 100%, 50%)"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insights */}
            <div className="elevated-card p-6">
              <h3 className="text-title-1 text-foreground mb-4">Scenario Analysis</h3>
              <div className="space-y-4">
                {inflationDelta > 2 && (
                  <div className="p-4 rounded-xl bg-destructive/10">
                    <p className="text-caption text-foreground">
                      <strong>High Impact Warning:</strong> This scenario would significantly increase your personal
                      inflation rate. Consider reviewing discretionary spending or seeking lower-cost alternatives
                      in affected categories.
                    </p>
                  </div>
                )}
                {inflationDelta < -1 && (
                  <div className="p-4 rounded-xl bg-success/10">
                    <p className="text-caption text-foreground">
                      <strong>Positive Outlook:</strong> This scenario would reduce your personal inflation rate,
                      potentially improving your purchasing power and savings capacity.
                    </p>
                  </div>
                )}
                {Math.abs(inflationDelta) <= 2 && Math.abs(inflationDelta) > 0 && (
                  <div className="p-4 rounded-xl bg-primary/10">
                    <p className="text-caption text-foreground">
                      <strong>Moderate Change:</strong> This scenario shows a moderate impact on your inflation rate.
                      Monitor these categories for potential long-term effects.
                    </p>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-caption text-muted-foreground">
                    <strong>Methodology:</strong> Adjustments are applied as percentage changes to current spending
                    levels. The TWICE engine then recalculates your time-weighted personal inflation rate based on
                    the modified expense profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
