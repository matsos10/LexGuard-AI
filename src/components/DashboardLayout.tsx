import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Bell,
  FileText,
  Gavel,
  Home,
  Menu,
  Scale,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/hooks/use-auth-store';
import { cn } from '@/lib/utils';
const navItems = [
  { href: '/dashboard', icon: Home, label: 'Overview' },
  { href: '/dashboard/regulatory-watch', icon: Gavel, label: 'Regulatory Watch' },
  { href: '/dashboard/contracts', icon: FileText, label: 'Contracts' },
  { href: '/dashboard/compliance', icon: ShieldCheck, label: 'Compliance' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ href, icon: Icon, label, onClick }: NavItemProps) => (
    <NavLink
      to={href}
      end={href === '/dashboard'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
          isActive && 'bg-muted text-primary'
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );

export function DashboardLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const MobileNav = () => {
    const handleLinkClick = () => setMobileMenuOpen(false);
    return (
      <nav className="grid gap-2 text-lg font-medium">
        <Link to="/dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4" onClick={handleLinkClick}>
          <Scale className="h-6 w-6 text-accent" />
          <span className="font-display">LexGuard AI</span>
        </Link>
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} onClick={handleLinkClick} />
        ))}
      </nav>
    );
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
              <Scale className="h-6 w-6 text-accent" />
              <span className="font-display text-lg">LexGuard AI</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <MobileNav />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}