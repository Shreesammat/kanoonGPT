import { useRouter } from "next/navigation"
import { ModeToggle } from "../ToggleTheme/toggleTheme"
import { Button } from "../ui/button"
import { Ellipsis, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Navbar = () => {
    const router = useRouter()
    return (<header className="bg-card border-b border-border flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-background rounded-full"></div>
                    </div>
                    <span className="text-xl font-semibold">KanoonGPT</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {["Home", "About", "Services", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-muted-foreground hover:text-foreground font-medium"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Sign Up Button */}
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    </header>)
}

export const ProfileNavbar = ({ imageSrc, userName, email }: { imageSrc: string | undefined, userName: string | undefined, email: string | undefined }) => {
    const router = useRouter()
    return (<header className="bg-card border-b border-border flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

                <div
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-background rounded-full"></div>
                    </div>
                    <span className="text-xl font-semibold">KanoonGPT</span>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Avatar>
                        <AvatarImage src={imageSrc} />
                        <AvatarFallback>{userName?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex justify-between">
                                <p>Settings</p> <Settings />
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="flex justify-between"><p>Logout</p>
                                <LogOut />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    </header>)
}