// Shadcnui
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
// Components
import MainContainer from "../custom/MainContainer";
import { AppSidebar } from "./AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="relative bg-elevation p-2 w-screen h-auto md:h-screen overflow-hidden">
            <AppSidebar />
            <MainContainer>
                <SidebarTrigger className="w-10 h-10 hover:text-primary" />
                {children}
            </MainContainer>
        </SidebarProvider>
    );
}
