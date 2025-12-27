import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  FileText,
  Users,
  Globe,
} from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-background py-20 lg:py-28">
        <div className="section-container text-center">
          <span className="inline-block px-4 py-2 mb-6 rounded-full bg-primary/10 text-primary text-caption font-medium">
            Patent-Pending Innovation
          </span>
          <h1 className="text-display-2 lg:text-display-1 text-foreground mb-6 max-w-4xl mx-auto">
            Redefining Personal Inflation Measurement
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            TPII represents a paradigm shift in how individuals understand and respond to 
            inflation—moving from generic population averages to precise, personalized metrics.
          </p>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-small font-medium">
              The Problem
            </span>
            <h2 className="text-display-3 text-foreground mb-6">
              One Number Doesn't Fit All
            </h2>
            <div className="space-y-4 text-body text-muted-foreground">
              <p>
                The Consumer Price Index (CPI) is a crucial economic indicator, but it measures 
                average price changes across millions of households using fixed baskets of goods 
                and outdated weights.
              </p>
              <p>
                A recent graduate living in an urban apartment experiences vastly different 
                inflation than a family of four in the suburbs or a retiree on fixed income. 
                Yet all three see the same CPI number in headlines.
              </p>
              <p>
                This gap between population-level statistics and individual economic reality 
                leads to suboptimal financial decisions, inadequate savings, and misaligned 
                policy responses.
              </p>
            </div>
          </div>
          <div className="elevated-card p-8">
            <h3 className="text-headline text-foreground mb-6">Limitations of Traditional CPI</h3>
            <ul className="space-y-4">
              {[
                "Fixed basket doesn't reflect individual consumption patterns",
                "Annual weight updates miss rapid lifestyle changes",
                "Geographic averaging obscures local price variations",
                "No mechanism for personal financial adaptation",
                "One-size-fits-all approach to diverse populations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-small font-medium text-destructive">{i + 1}</span>
                  </div>
                  <span className="text-body text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section background="surface">
        <SectionHeader
          badge="Our Innovation"
          title="Time-Weighted Personal Inflation Index"
          subtitle="A patent-pending system that calculates individualized, time-sensitive inflation metrics based on actual spending patterns."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Personal Basket"
            description="Your spending patterns define your inflation basket, not generic assumptions."
            index={0}
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Weights"
            description="Dynamic category weights that update as your lifestyle evolves."
            index={1}
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Time Decay"
            description="Recent expenses matter more through exponential time-weighting algorithms."
            index={2}
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Privacy-First"
            description="Local processing keeps your financial data under your complete control."
            index={3}
          />
        </div>
      </Section>

      {/* Technical Innovation */}
      <Section>
        <SectionHeader
          badge="Technical Architecture"
          title="System Components"
          subtitle="The TPII platform consists of five core modules working in concert to deliver personalized inflation intelligence."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "PCDI Module",
              subtitle: "Personal Consumer Data Integration",
              description: "Ingests, cleanses, and categorizes expense data from multiple sources while maintaining data quality and consistency.",
            },
            {
              title: "TWICE Engine",
              subtitle: "Time-Weighted Index Calculation",
              description: "Applies exponential decay functions and frequency-based weights to compute the Real-Time Personal Inflation Rate (RPIR).",
            },
            {
              title: "Secure Repository",
              subtitle: "Encrypted State Storage",
              description: "Maintains historical inflation states with enterprise-grade encryption for trend analysis and comparative studies.",
            },
            {
              title: "FAIM Layer",
              subtitle: "Financial Adaptation Intelligence",
              description: "Generates personalized recommendations for savings, investments, and budget adjustments based on RPIR trends.",
            },
            {
              title: "API Gateway",
              subtitle: "Integration & Analytics",
              description: "Provides secure endpoints for third-party integrations and anonymized data aggregation for policy research.",
            },
            {
              title: "Dashboard Interface",
              subtitle: "User Experience Layer",
              description: "Delivers intuitive visualizations, alerts, and scenario simulations through a premium, accessible interface.",
            },
          ].map((item, i) => (
            <div key={i} className="elevated-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-title-2 text-foreground">{item.title}</h3>
                  <p className="text-small text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
              <p className="text-caption text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Patent & Vision */}
      <Section background="surface">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-small font-medium">
              Intellectual Property
            </span>
            <h2 className="text-display-3 text-foreground mb-6">
              Patent-Pending Technology
            </h2>
            <p className="text-body text-muted-foreground mb-6">
              The Time-Weighted Personal Inflation Index system and method is protected under 
              patent-pending status, representing novel contributions to the fields of personal 
              finance, economic measurement, and financial technology.
            </p>
            <div className="space-y-4">
              {[
                { icon: Award, text: "Novel time-weighted inflation calculation methodology" },
                { icon: FileText, text: "Unique personal basket construction algorithm" },
                { icon: Users, text: "Privacy-preserving aggregation for policy insights" },
                { icon: Globe, text: "Scalable architecture for global deployment" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-body text-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="elevated-card p-8 text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-headline text-foreground mb-4">Research-Backed Innovation</h3>
            <p className="text-body text-muted-foreground mb-6">
              Developed through rigorous academic research and validated against real-world 
              economic data, TPII bridges the gap between theoretical economics and practical 
              personal finance.
            </p>
            <div className="inline-block px-6 py-3 rounded-full bg-primary/10">
              <span className="text-caption font-medium text-primary">Patent Pending • University IPR</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Team/Vision placeholder */}
      <Section>
        <div className="elevated-card p-10 lg:p-16 text-center">
          <h2 className="text-display-3 text-foreground mb-4">
            Democratizing Inflation Intelligence
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our vision is a world where every individual has access to personalized inflation 
            metrics, enabling smarter financial decisions and more equitable economic policy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-full bg-muted">
              <span className="text-caption font-medium">Financial Inclusion</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-muted">
              <span className="text-caption font-medium">Data Privacy</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-muted">
              <span className="text-caption font-medium">Academic Rigor</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-muted">
              <span className="text-caption font-medium">User Empowerment</span>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
