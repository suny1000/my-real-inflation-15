import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureCard, ProcessStep, StatCard } from "@/components/ui/feature-card";
import { KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Target, 
  ArrowRight,
  Calculator,
  Clock,
  Lock,
  PieChart,
  LineChart,
  Wallet,
  GraduationCap,
  Briefcase,
  Home,
  Building2
} from "lucide-react";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-surface to-background overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>
        
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-2 mb-6 rounded-full bg-primary/10 text-primary text-caption font-medium animate-fade-in">
                Patent-Pending Technology
              </span>
              
              <h1 className="text-display-2 lg:text-display-1 text-foreground mb-6 animate-fade-up">
                Your Real Inflation.{" "}
                <span className="text-primary">Built From Your Life.</span>
              </h1>
              
              <p className="text-body-lg text-muted-foreground mb-8 animate-fade-up animation-delay-100">
                The national CPI doesn't reflect your personal reality. TPII measures 
                time-weighted inflation based on your actual spending patterns, giving you 
                personalized financial insights that matter.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-200">
                <Link to="/dashboard">
                  <Button variant="hero" size="xl">
                    Explore Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="hero-secondary" size="xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right: KPI Cards */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 lg:gap-6 stagger-children">
                <KPICard
                  title="Your Personal Inflation"
                  value="7.2"
                  suffix="%"
                  trend="up"
                  trendPositive="down"
                  change={3.8}
                  changeLabel="vs CPI"
                  size="lg"
                  className="col-span-2"
                  icon={<TrendingUp className="w-5 h-5 text-primary" />}
                />
                <KPICard
                  title="National CPI"
                  value="3.4"
                  suffix="%"
                  trend="neutral"
                  changeLabel="Official rate"
                  icon={<BarChart3 className="w-5 h-5 text-primary" />}
                />
                <KPICard
                  title="Savings Impact"
                  value="-$847"
                  trend="down"
                  trendPositive="up"
                  change={-12.3}
                  changeLabel="Monthly"
                  icon={<Wallet className="w-5 h-5 text-primary" />}
                />
              </div>
              
              {/* Floating decoration */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Section background="surface">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatCard value="2.4x" label="More accurate than CPI" />
          <StatCard value="12" label="Expense categories tracked" />
          <StatCard value="90" label="Day trend analysis" />
          <StatCard value="100%" label="Privacy-first design" />
        </div>
      </Section>

      {/* Problem Statement */}
      <Section>
        <SectionHeader
          badge="The Problem"
          title="CPI Doesn't Tell Your Story"
          subtitle="The Consumer Price Index measures average inflation across millions of households. But you're not average. Your spending habits, lifestyle, and location create a unique inflation experience."
        />
        
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Calculator className="w-6 h-6" />}
            title="Generic Basket"
            description="CPI uses a fixed basket of goods that may not match your actual purchases and priorities."
            index={0}
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Outdated Weights"
            description="Official inflation measures use annual weights, missing rapid shifts in your spending patterns."
            index={1}
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="One Size Fits None"
            description="A student's inflation differs vastly from a retiree's, yet both see the same CPI number."
            index={2}
          />
        </div>
      </Section>

      {/* How It Works */}
      <Section background="surface" id="how-it-works">
        <SectionHeader
          badge="How It Works"
          title="From Expenses to Insights"
          subtitle="TPII transforms your spending data into personalized inflation metrics through a sophisticated, privacy-first pipeline."
        />
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-0">
            <ProcessStep
              number={1}
              title="Expense Sources"
              description="Connect bank feeds, upload receipts, or manually enter expenses. Your data stays private and encrypted."
            />
            <ProcessStep
              number={2}
              title="Consent & Privacy Layer"
              description="Granular privacy controls let you choose what to share. TPII never sells your data."
            />
            <ProcessStep
              number={3}
              title="PCDI Processing"
              description="Personal Consumer Data Integration cleanses, categorizes, and encodes your expenses."
            />
            <ProcessStep
              number={4}
              title="TWICE Engine"
              description="Time-Weighted Index Calculation Engine applies recency decay and frequency weights."
            />
            <ProcessStep
              number={5}
              title="FAIM Insights"
              description="Financial Adaptation & Intelligence Module generates personalized recommendations."
              isLast
            />
          </div>
          
          <div className="elevated-card p-8 lg:sticky lg:top-28">
            <h3 className="text-headline text-foreground mb-6">System Architecture</h3>
            <div className="space-y-4">
              {[
                { label: "Data Input", items: ["Bank Feeds", "CSV Import", "Manual Entry"] },
                { label: "Processing", items: ["PCDI Module", "TWICE Engine", "Secure Repository"] },
                { label: "Output", items: ["Personal Dashboard", "FAIM Insights", "Policy Analytics"] },
              ].map((group, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/50">
                  <p className="text-caption font-medium text-muted-foreground mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={j} className="px-3 py-1 rounded-lg bg-background text-caption font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Why TPII */}
      <Section>
        <SectionHeader
          badge="Why TPII"
          title="Inflation That Reflects Reality"
          subtitle="Our patent-pending methodology brings academic rigor and real-world applicability to personal finance."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Time-Weighted Analysis"
            description="Recent expenses matter more. TPII applies exponential decay to reflect your current lifestyle."
            index={0}
          />
          <FeatureCard
            icon={<PieChart className="w-6 h-6" />}
            title="Dynamic Category Weights"
            description="Your personal basket weights update in real-time based on actual spending patterns."
            index={1}
          />
          <FeatureCard
            icon={<LineChart className="w-6 h-6" />}
            title="Trend Detection"
            description="Identify inflation spikes in specific categories before they impact your budget."
            index={2}
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Privacy-First Design"
            description="Local-first processing keeps your financial data under your control."
            index={3}
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Actionable Insights"
            description="FAIM module provides personalized recommendations to adapt your financial strategy."
            index={4}
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Scenario Planning"
            description="Test how lifestyle changes or economic shocks would affect your personal inflation."
            index={5}
          />
        </div>
      </Section>

      {/* Use Cases */}
      <Section background="surface">
        <SectionHeader
          badge="Use Cases"
          title="Built For Everyone"
          subtitle="Whether you're budgeting for college or planning retirement, TPII adapts to your financial reality."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: GraduationCap, title: "Students", desc: "Track education costs and budget for textbooks, housing, and meals." },
            { icon: Briefcase, title: "Professionals", desc: "Understand how commuting, dining, and lifestyle impact your real inflation." },
            { icon: Home, title: "Families", desc: "Monitor childcare, groceries, and household expenses with precision." },
            { icon: Building2, title: "Policymakers", desc: "Access aggregated, anonymized data for evidence-based policy decisions." },
          ].map((item, i) => (
            <div key={i} className="elevated-card p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-title-1 text-foreground mb-2">{item.title}</h3>
              <p className="text-caption text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="relative elevated-card p-10 lg:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-display-3 lg:text-display-2 text-foreground mb-4">
              Ready to Discover Your Real Inflation?
            </h2>
            <p className="text-body-lg text-muted-foreground mb-8">
              Start exploring your personalized inflation metrics today. No signup required for the demo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="hero" size="xl">
                  Open Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
