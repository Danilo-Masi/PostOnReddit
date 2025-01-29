// Shadcnui
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
// Components
import MainContainer from "../custom/MainContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="relative bg-elevation p-2 w-screen h-screen overflow-hidden">
            <AppSidebar />
            <MainContainer>
                {/* Trigger per mobile */}
                <SidebarTrigger
                    aria-label="Apri la barra laterale"
                    className="w-10 h-10 hover:text-primary md:hidden"
                />
                {children}
            </MainContainer>
        </SidebarProvider>
    );
}