import { Sidebar, SidebarContent, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MainNav } from '@/components/app/main-nav';
import { UserNav } from '@/components/app/user-nav';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
        <Sidebar collapsible="icon" className="group/sidebar">
          <SidebarHeader className="h-14 items-center justify-center p-4 transition-all group-data-[collapsible=icon]/sidebar:justify-center group-data-[collapsible=icon]/sidebar:p-2">
            <div className="transition-all group-data-[collapsible=icon]/sidebar:hidden">
              <Logo className="fill-sidebar-foreground" />
            </div>
            <div className="hidden size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all group-data-[collapsible=icon]/sidebar:flex">
              <span className="font-bold">AP</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="sm:group-data-[collapsible=offcanvas]/sidebar:flex" />
                <h1 className="font-headline text-xl font-semibold">AdMan Pro</h1>
            </div>
            
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  )
}
