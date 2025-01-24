// React
import { useEffect, useState } from "react"
// Shadcnui
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
// Icons
import { Command, CalendarCheck2, Settings, ChevronUp, CircleHelp, LogOut, ShoppingCart } from "lucide-react"
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

    const { selectedSection, setSelectedSection, setExitDialogOpen, setSupportDialogOpen, setCreditsDialogOpen, isCreditsUpdate } = useAppContext();
    const [userEmail, setUserEmail] = useState<string>("");
    const [creditsAvabile, setCreditsAvabile] = useState<null | any>(null);

    useEffect(() => {
        const fetchCredits = async () => {
            const data = await checkData();
            if (data === null) {
                setUserEmail('user@email.com');
                setCreditsAvabile('N/A');
            } else {
                setUserEmail(data.email);
                setCreditsAvabile(data.credits);
            }
        }
        fetchCredits();
    }, [isCreditsUpdate]);

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
                {/* TODO
                <SidebarGroupContent>
                    <div className="flex flex-col gap-y-2 p-2 w-full">
                        <p className="font-semibold text-base text-center text-textSecondary">Credits avabile: {creditsAvabile}</p>
                        <Button
                            type="button"
                            className="bg-buttonColor hover:bg-buttonHoverColor py-5 w-full font-bold text-md text-textForeground"
                            onClick={() => setCreditsDialogOpen(true)}>
                            <ShoppingCart />
                            Buy credits
                        </Button>
                    </div>
                </SidebarGroupContent>
                */}
            </SidebarContent>
            {/* FOOTER */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex justify-start items-center bg-elevation2 hover:bg-elevation3 m-0 px-3 py-7 w-full font-semibold text-sm text-textSecondary">
                                    <Avatar className="rounded-lg w-8 h-8">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
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
