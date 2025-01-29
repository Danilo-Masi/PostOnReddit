// React
import { useEffect, useState } from "react"
// Shadcnui
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
// Icons
import { Command, CalendarCheck2, Settings, ChevronUp, CircleHelp, LogOut } from "lucide-react"
// Context
import { useAppContext } from "../context/AppContext"
// Components
import Logo from "../custom/Logo"
// Hook
import { checkData } from "@/hooks/use-retrieve-data"

const links = [
    { title: "Dashboard", key: "dashboard", icon: Command },
    { title: "Scheduled post", key: "scheduled-post", icon: CalendarCheck2 },
    { title: "Settings", key: "settings", icon: Settings }
]

export function AppSidebar() {

    const { selectedSection, setSelectedSection, setExitDialogOpen, setSupportDialogOpen } = useAppContext();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await checkData();
            if (data === null) {
                setUserEmail('user@email.com');
            } else {
                setUserEmail(data.email);
            }
        }
        fetchInfo();
    }, []);

    return (
        <Sidebar className="md:border-sidebar-background bg-sidebar-background p-2">
            {/* HEADER */}
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            {/* SIDEBAR CONTENT */}
            <SidebarContent className="flex flex-col justify-between">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm text-textSecondary">
                        Platform
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {links.map((link) => (
                                <SidebarMenuItem key={link.title}>
                                    <SidebarMenuButton asChild isActive={selectedSection === link.key}>
                                        <Button
                                            className={`flex items-center justify-start text-textPrimary hover:text-textColor ${selectedSection === link.key && 'text-textColor font-bold'}`}
                                            variant="ghost"
                                            onClick={() => setSelectedSection(link.key)}>
                                            <link.icon />
                                            <span>{link.title}</span>
                                        </Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* SIDEBAR FOOTER */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex justify-start items-center bg-elevation2 hover:bg-elevation3 m-0 px-3 py-7 w-full font-semibold text-sm text-textSecondary rounded-lg">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-400 text-zinc-50">
                                        {userEmail.slice(0, 2).toUpperCase()}
                                    </div>
                                    <p className="w-2/3 overflow-hidden">
                                        {userEmail}
                                    </p>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="flex flex-col gap-y-3 w-[--radix-popper-anchor-width]" >
                                <DropdownMenuItem onClick={() => setSelectedSection(links[0].key)}>
                                    <Command />
                                    <span>Dashboard</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSupportDialogOpen(true)}>
                                    <CircleHelp />
                                    <span>Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setExitDialogOpen(true)}>
                                    <LogOut />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
