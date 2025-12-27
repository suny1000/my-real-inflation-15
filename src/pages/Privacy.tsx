import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Shield, Eye, Lock, Server, UserCheck, FileText } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "December 27, 2025";

  return (
    <Layout>
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-display-3 text-foreground mb-4">Privacy Policy</h1>
            <p className="text-body text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Privacy Principles */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Lock, title: "Local-First", desc: "Your data stays on your device" },
              { icon: Eye, title: "Transparent", desc: "You control what we see" },
              { icon: UserCheck, title: "User-Owned", desc: "Delete anytime, no questions" },
            ].map((item, i) => (
              <div key={i} className="elevated-card p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-title-2 text-foreground mb-1">{item.title}</h3>
                <p className="text-caption text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-headline text-foreground mb-4">1. Overview</h2>
                <p className="text-body text-muted-foreground">
                  The Time-Weighted Personal Inflation Index ("TPII", "we", "our", or "us") is 
                  committed to protecting your privacy. This Privacy Policy explains how we 
                  collect, use, and safeguard your information when you use our platform.
                </p>
                <p className="text-body text-muted-foreground mt-4">
                  Our core principle is <strong>privacy by design</strong>. TPII operates primarily 
                  as a local-first application, meaning your financial data is processed on your 
                  device and never transmitted to our servers unless you explicitly choose to 
                  enable specific cloud features.
                </p>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="text-title-2 text-foreground mb-2">Data You Provide</h3>
                    <ul className="space-y-2 text-body text-muted-foreground">
                      <li>• Expense data (descriptions, amounts, categories, dates)</li>
                      <li>• Account settings and preferences</li>
                      <li>• Contact information when you reach out to us</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <h3 className="text-title-2 text-foreground mb-2">Automatically Collected</h3>
                    <ul className="space-y-2 text-body text-muted-foreground">
                      <li>• Device type and browser information (for compatibility)</li>
                      <li>• Aggregate usage analytics (no personal data)</li>
                      <li>• Error logs for debugging (anonymized)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">3. How We Use Your Data</h2>
                <p className="text-body text-muted-foreground mb-4">
                  Your expense data is used exclusively to calculate your personal inflation 
                  metrics. We use this data to:
                </p>
                <ul className="space-y-2 text-body text-muted-foreground">
                  <li>• Generate your Real-Time Personal Inflation Rate (RPIR)</li>
                  <li>• Provide category-level inflation breakdowns</li>
                  <li>• Power the FAIM recommendation engine</li>
                  <li>• Enable scenario simulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">4. Data Storage & Security</h2>
                <div className="p-4 rounded-xl bg-success/10 mb-4">
                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-body font-medium text-foreground">Local-First Architecture</p>
                      <p className="text-caption text-muted-foreground mt-1">
                        All expense data and inflation calculations are processed and stored 
                        locally on your device using encrypted browser storage. Your raw 
                        financial data never leaves your device.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-body text-muted-foreground">
                  If you choose to enable optional cloud backup features, data is encrypted 
                  end-to-end using AES-256 encryption before transmission. We cannot access 
                  the unencrypted contents of your data.
                </p>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">5. Data Sharing</h2>
                <p className="text-body text-muted-foreground mb-4">
                  <strong>We do not sell your personal data.</strong> We may share anonymized, 
                  aggregated data for research purposes only under the following conditions:
                </p>
                <ul className="space-y-2 text-body text-muted-foreground">
                  <li>• Data is fully anonymized and cannot identify individuals</li>
                  <li>• Aggregated across minimum thresholds (e.g., 1000+ users)</li>
                  <li>• Used solely for academic research or policy analysis</li>
                  <li>• You can opt-out of aggregated data contribution at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">6. Your Rights</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "Access", desc: "View all data we have about you" },
                    { title: "Export", desc: "Download your data in standard formats" },
                    { title: "Delete", desc: "Permanently remove all your data" },
                    { title: "Correct", desc: "Update inaccurate information" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-muted/50">
                      <h3 className="text-title-2 text-foreground mb-1">{item.title}</h3>
                      <p className="text-caption text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-headline text-foreground mb-4">7. Contact Us</h2>
                <p className="text-body text-muted-foreground mb-4">
                  For privacy-related inquiries, data access requests, or concerns, please contact:
                </p>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-body text-foreground">Privacy Officer</p>
                  <p className="text-caption text-muted-foreground">privacy@tpii.finance</p>
                  <p className="text-caption text-muted-foreground">Response within 48 hours</p>
                </div>
              </section>

              <section>
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-title-2 text-foreground mb-2">Demo Notice</h3>
                      <p className="text-caption text-muted-foreground">
                        This is a demonstration version of TPII. All data entered is stored 
                        locally in your browser and used only for simulation purposes. 
                        No real financial data is collected or transmitted.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
