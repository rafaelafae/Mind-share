import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";
import icon from "@/assets/icon.svg";
import { Button } from "./ui/button";
import { Lightbulb, LogOut, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";


export function Header() {
    const { user, logout, isAuthenticated } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();
    const isIdeaPage = location.pathname === "/";
    const isMembersPage = location.pathname === "/members";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <div className="w-full px-16 pt-6">
            {isAuthenticated &&
                <div className="flex justify-between w-full">
                    <div className="min-w-48">
                        <img src={icon} alt="Icon" />
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <Button
                                size="sm"
                                className="gap-2"
                                variant={isIdeaPage ? "default" : "ghost"}
                            >
                                <Lightbulb className="size-4" />
                                Ideias
                            </Button>
                        </Link>

                        <Link to="/members">
                            <Button
                                size="sm"
                                className="gap-2"
                                variant={isMembersPage ? "default" : "ghost"}
                            >
                                <Users className="size-4" />
                                Membros
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback className="bg-zinc-950 text-primary-foreground">
                                    {user?.name?.charAt(0).toUpperCase() || "?"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    {user?.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {user?.email}
                                </span>
                            </div>
                        </div>

                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                            <LogOut className="size-5" />
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}