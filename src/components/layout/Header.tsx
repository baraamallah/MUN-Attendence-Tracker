import Link from 'next/link';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet'; // For mobile sidebar toggle if needed
import { SidebarTrigger } from '@/components/ui/sidebar'; // For desktop sidebar toggle

interface HeaderProps {
  title: string;
  showSidebarToggle?: boolean;
  onLogout?: () => void; // Optional logout handler
  isAdmin?: boolean; // To conditionally show logout
}

export default function Header({ title, showSidebarToggle = false, onLogout, isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      {showSidebarToggle && (
        <>
          {/* Desktop sidebar toggle */}
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          {/* Mobile sidebar toggle - Assuming Sheet is used in AdminLayout */}
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Users className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
        </>
      )}
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Users className="h-6 w-6 text-primary" />
        <span className="sr-only">MUN Tracker</span>
      </Link>
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      {isAdmin && onLogout && (
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      )}
    </header>
  );
}
