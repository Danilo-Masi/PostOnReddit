// Shadcnui
import MainContainer from "../custom/MainContainer";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
// Components
import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="relative h-auto md:h-screen w-screen overflow-hidden p-2 bg-elevation">
            <AppSidebar />
            <MainContainer>
                <SidebarTrigger className="w-10 h-10 hover:text-primary" />
                {children}
            </MainContainer>
        </SidebarProvider>
    );
}
