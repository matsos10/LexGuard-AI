import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Shield, Zap, Bot, BarChart, CheckCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThemeToggle } from '@/components/ThemeToggle';
const Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg font-display">
        <Scale className="h-6 w-6 text-accent" />
        LexGuard AI
      </Link>
      <nav className="hidden md:flex gap-6 items-center">
        <a href="#features" className="text-sm font-medium hover:text-accent transition-colors">Features</a>
        <a href="#pricing" className="text-sm font-medium hover:text-accent transition-colors">Pricing</a>
        <a href="#faq" className="text-sm font-medium hover:text-accent transition-colors">FAQ</a>
      </nav>
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/login">Log In</Link>
        </Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </header>
);
const Hero = () => (
  <section className="w-full pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] dark:bg-grid-slate-700/40"></div>
    <div className="container mx-auto px-4 md:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-display text-balance">
          Automate Legal Compliance with AI
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-6 text-balance">
          LexGuard AI streamlines legal monitoring, contract analysis, and GDPR compliance, freeing your team to focus on strategic work.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/signup">Start 14-Day Free Trial</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);
const features = [
  { icon: Bot, title: "Automated Regulatory Watch", description: "Our AI continuously scans legal sources for updates relevant to your industry, providing real-time, summarized alerts." },
  { icon: BarChart, title: "Intelligent Contract Analysis", description: "Upload contracts to automatically identify key clauses, risks, and obligations. Never miss a renewal date again." },
  { icon: Shield, title: "Automated Compliance Audits", description: "Perform automated checks against regulations like GDPR, generating reports that highlight non-compliance areas." },
  { icon: Zap, title: "AI-Powered Document Management", description: "A secure repository with smart search. Find information in legal documents using natural language queries." },
];
const Features = () => (
  <section id="features" className="w-full py-16 md:py-24 bg-muted/50">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-display">A Smarter Way to Manage Legal Risk</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          LexGuard AI provides a powerful suite of tools to automate your most tedious legal and compliance tasks.
        </p>
      </div>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="bg-accent/20 text-accent p-3 rounded-full">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
const pricingTiers = [
  { name: "Starter", price: "29", features: ["Automated Watch (1 Jurisdiction)", "5 Contract Analyses/mo", "Basic Compliance Audit", "Email Support"] },
  { name: "Pro", price: "79", features: ["Automated Watch (5 Jurisdictions)", "25 Contract Analyses/mo", "Advanced Compliance Audits", "AI Document Search", "Priority Email Support"], popular: true },
  { name: "Enterprise", price: "Contact Us", features: ["Unlimited Jurisdictions", "Unlimited Contract Analyses", "Custom Audit Frameworks", "API Access", "Dedicated Account Manager"] },
];
const Pricing = () => (
  <section id="pricing" className="w-full py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-display">Transparent Pricing for Teams of All Sizes</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            className="h-full"
          >
            <Card className={`flex flex-col h-full ${tier.popular ? 'border-accent ring-2 ring-accent' : ''}`}>
              <CardHeader className="relative">
                {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 text-sm font-semibold rounded-full">Most Popular</div>}
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <div className="text-4xl font-bold mb-4">
                  {tier.price.startsWith('Contact') ? tier.price : <>${tier.price}<span className="text-lg font-normal text-muted-foreground">/mo</span></>}
                </div>
                <ul className="space-y-3 text-muted-foreground flex-grow">
                  {tier.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full mt-6 ${tier.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}>
                  <Link to="/signup">{tier.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
const faqItems = [
    { q: "What is LexGuard AI?", a: "LexGuard AI is a SaaS platform that uses artificial intelligence to automate legal and compliance tasks like regulatory monitoring, contract analysis, and compliance audits." },
    { q: "Who is this platform for?", a: "Our platform is designed for in-house legal teams, compliance officers, and law firms looking to increase efficiency and reduce risk." },
    { q: "Is my data secure?", a: "Yes, we use industry-standard encryption for data at rest and in transit. Our infrastructure is built on Cloudflare, providing world-class security." },
    { q: "What regulations do you track?", a: "We track a wide range of regulations across multiple jurisdictions and industries. Our Enterprise plan allows for custom tracking based on your specific needs." },
];
const FAQ = () => (
    <section id="faq" className="w-full py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-display">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
                {faqItems.map((item, i) => (
                    <AccordionItem value={`item-${i}`} key={i}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </section>
);
const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 font-bold">
        <Scale className="h-5 w-5 text-accent" />
        LexGuard AI
      </div>
      <p className="text-sm text-muted-foreground mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} LexGuard AI. All rights reserved.
      </p>
      <p className="text-sm text-muted-foreground mt-4 md:mt-0">
        Built with ❤️ at Cloudflare
      </p>
    </div>
  </footer>
);
export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}