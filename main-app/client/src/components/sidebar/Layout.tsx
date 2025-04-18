import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import MainContainer from "../custom/MainContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="w-full h-svh">
            <AppSidebar />
            <MainContainer>
                <SidebarTrigger
                    aria-label="Open the sidebar"
                    className="w-10 h-10 hover:text-primary md:hidden" />
                {children}
            </MainContainer>
        </SidebarProvider>
    );
}