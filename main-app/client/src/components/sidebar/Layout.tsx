import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="relative h-screen w-screen overflow-hidden p-2 bg-card">
            <AppSidebar />
            <div className="w-full p-2 flex flex-col rounded-lg bg-background shadow-md shadow-gray-300">
                <SidebarTrigger className="w-10 h-10 hover:text-primary" />
                {children}
            </div>
        </SidebarProvider>
    );
}
