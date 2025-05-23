
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Search, Settings, LogOut, ShieldCheck } from 'lucide-react'; // Added Settings
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/participants', label: 'Participants', icon: Users },
  { href: '/admin/dashboard/search', label: 'AI Search', icon: Search },
  // { href: '/admin/dashboard/reports', label: 'Reports', icon: BarChart3 }, // Still commented
  { href: '/admin/dashboard/settings', label: 'Settings', icon: Settings }, // Uncommented and added
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const { setOpenMobile } = useSidebar(); 

  const handleLogout = async () => {
    try {
      await signOut();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/admin/login');
    } catch (error) {
      toast({ title: 'Logout Failed', description: 'Could not log you out. Please try again.', variant: 'destructive' });
    }
  };

  const handleNavigation = () => {
    if (setOpenMobile) { 
        setOpenMobile(false); 
    }
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="items-center justify-center p-4 group-data-[collapsible=icon]:p-2">
        <ShieldCheck className="h-8 w-8 text-primary group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6 transition-all" />
        <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">Admin</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, side: 'right' }}
                  onClick={handleNavigation}
                >
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:items-center">
        <Button 
          variant="ghost" 
          className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:aspect-square" 
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="mr-2 group-data-[collapsible=icon]:mr-0" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
