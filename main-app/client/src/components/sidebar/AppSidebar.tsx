// React
import { useEffect, useState } from "react"
// Shadcnui
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
// Icons
import { Command, CalendarCheck2, Settings, ChevronUp, CircleHelp, LogOut, MessageSquareText } from "lucide-react"
// Context
import { useAppContext } from "../context/AppContext"
// Components
import Logo from "../custom/Logo"
// Hook
import { checkData } from "@/hooks/use-retrieve-data"

const links = [
    { title: "Dashboard", key: "dashboard", icon: Command },
    { title: "Scheduled post", key: "scheduled-post", icon: CalendarCheck2 },
    { title: "Feedback", key: "feedback", icon: MessageSquareText },
    { title: "Settings", key: "settings", icon: Settings }
]

export function AppSidebar() {

    const { selectedSection, setSelectedSection, setExitDialogOpen, setSupportDialogOpen } = useAppContext();
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const fetchInfo = async () => {
            const email = await checkData();
            if (!email) {
                setUserEmail('user@email.com');
            } else {
                setUserEmail(email);
            }
        };

        fetchInfo();
    }, []);

    const handleSelection = (linkKey: string) => {
        if (linkKey !== "feedback") {
            setSelectedSection(linkKey);
        } else {
            window.open("https://insigh.to/b/postonreddit", "_blank");
        }
    }

    return (

        <Sidebar
            className={`md:py-2 bg-zinc-100 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 z-50`}>
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
                                    <SidebarMenuButton asChild isActive={selectedSection === link.key} className={`hover:bg-zinc-200 dark:hover:bg-zinc-700 ${selectedSection === link.key && 'bg-zinc-200 dark:bg-zinc-700'}`}>
                                        <Button
                                            className={`flex items-center justify-start text-zinc-700 dark:text-zinc-50`}
                                            variant="ghost"
                                            //onClick={() => setSelectedSection(link.key)}
                                            onClick={() => handleSelection(link.key)}>
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
                                <SidebarMenuButton className="w-full flex justify-start items-center m-0 px-3 py-7 font-semibold text-sm rounded-lg bg-zinc-200 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-300">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-400 dark:bg-zinc-400 text-zinc-50">
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
                                className="flex flex-col gap-y-3 w-[--radix-popper-anchor-width] dark:bg-zinc-700" >
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
