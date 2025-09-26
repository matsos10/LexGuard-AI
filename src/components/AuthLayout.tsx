import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
interface AuthLayoutProps {
  children: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <ThemeToggle className="absolute top-4 right-4 z-10" />
      <div className="flex items-center justify-center py-12 animate-fade-in">
        <div className="mx-auto grid w-[350px] gap-6">
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative z-10 flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-display text-primary mb-4">
            <Scale className="h-8 w-8 text-accent" />
            LexGuard AI
          </Link>
          <p className="text-xl font-semibold text-foreground">
            Automated Legal Intelligence
          </p>
          <p className="text-muted-foreground mt-2 max-w-md">
            Streamline your compliance, analyze contracts instantly, and stay ahead of regulatory changes with the power of AI.
          </p>
        </div>
        <div className="absolute bottom-10 text-sm text-muted-foreground">
          Built with ❤�� at Cloudflare
        </div>
      </div>
    </div>
  );
}