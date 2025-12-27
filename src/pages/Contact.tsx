import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Section>
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-display-3 text-foreground mb-4">Message Sent</h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Thank you for reaching out. Our team will review your message and respond within 
              1-2 business days.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-small font-medium">
              Get in Touch
            </span>
            <h1 className="text-display-3 text-foreground mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8">
              Whether you're interested in research collaboration, investment opportunities, 
              licensing, or simply learning more about TPII—we'd love to hear from you.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Mail, label: "Email", value: "contact@tpii.finance", href: "mailto:contact@tpii.finance" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
                { icon: MapPin, label: "Location", value: "Innovation Hub, University Campus", href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-caption text-muted-foreground">{item.label}</p>
                    <p className="text-body font-medium text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="elevated-card p-6">
              <h3 className="text-title-2 text-foreground mb-3">Interested in Partnership?</h3>
              <p className="text-caption text-muted-foreground mb-4">
                We're actively seeking collaborations with financial institutions, research 
                universities, and policy organizations to expand the impact of personalized 
                inflation measurement.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-small">Research</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-small">Licensing</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-small">Investment</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-small">API Access</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="elevated-card p-8">
            <h2 className="text-headline text-foreground mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    placeholder="Company or institution"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
              
              <p className="text-small text-muted-foreground text-center">
                By submitting, you agree to our Privacy Policy. We'll never share your information.
              </p>
            </form>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
