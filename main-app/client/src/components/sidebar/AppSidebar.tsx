// Shadcnui
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
// Icons
import { Command, CalendarCheck2, Settings, ChevronUp, CircleHelp, LogOut, ShoppingCart } from "lucide-react"
// Context
import { useAppContext } from "../context/AppContext"

const links = [
    { title: "Dashboard", key: "dashboard", icon: Command },
    { title: "Scheduled post", key: "scheduled-post", icon: CalendarCheck2 },
    { title: "Settings", key: "settings", icon: Settings }
]

export function AppSidebar() {
    const { selectedSection, setSelectedSection, setExitDialogOpen, setSupportDialogOpen, setCreditsDialogOpen } = useAppContext();

    return (
        <Sidebar className="p-2 bg-card border-card">
            {/* Header */}
            <SidebarHeader>
                <h1 className="text-3xl font-bold text-textColor">PostOnReddit</h1>
            </SidebarHeader>
            {/* Content 1 */}
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
                {/* Sidebar group 2 */}
                <SidebarGroupContent className="flex flex-col gap-y-2">
                    <p className="text-base text-center font-semibold text-textSecondary">Credits avabile: 0</p>
                    <Button
                        type="button"
                        className="w-full py-5 text-md font-bold text-textForeground bg-buttonColor hover:bg-buttonHoverColor"
                        onClick={() => setCreditsDialogOpen(true)}>
                        <ShoppingCart />
                        Buy credits
                    </Button>
                </SidebarGroupContent>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full flex items-center justify-start px-3 py-7 text-textSecondary">
                                    <Avatar className="w-8 h-8 rounded-lg">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <p className="w-2/3 overflow-hidden">danilomasi999@gmail.com</p>
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] flex flex-col gap-y-3" >
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
