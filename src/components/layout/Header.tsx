
"use client"; // Added client directive for hooks

import Link from 'next/link';
import { Users, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation'; // Added hooks

interface HeaderProps {
  title: string;
  showSidebarToggle?: boolean;
  onLogout?: () => void;
  isAdmin?: boolean;
}

export default function Header({ title, showSidebarToggle = false, onLogout, isAdmin = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminSubPage = pathname.startsWith('/admin/dashboard/') && pathname !== '/admin/dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
      {showSidebarToggle && (
        <>
          {/* Desktop sidebar toggle */}
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          {/* Mobile sidebar toggle */}
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
      
      <div className="flex-1 flex items-center gap-2"> {/* Adjusted gap for back button */}
        {isAdminSubPage && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/admin/dashboard')} 
            aria-label="Back to Dashboard"
            className="h-8 w-8" // Smaller back button
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{title}</h1>
      </div>

      {isAdmin && onLogout && (
        <Button variant="outline" onClick={onLogout}>
          Logout
        </Button>
      )}
    </header>
  );
}
