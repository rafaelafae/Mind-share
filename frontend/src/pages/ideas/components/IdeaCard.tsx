import { MessageSquare, ThumbsUp } from "lucide-react"
import { Idea } from "@/types"
import { formatRelativeDate } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IdeaCardProps {
    idea: Idea
    onClick: () => void
}

export function IdeaCard({ idea, onClick }: IdeaCardProps) {
    return (
        <Card
            key={idea.id}
            onClick={onClick}
            className="bg-card border-border/80 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-55"
        >
            <CardHeader className="p-0 pb-4">
                <CardTitle>
                    <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                            <AvatarFallback className="bg-foreground text-background text-xs font-semibold">
                                {idea.author?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground line-clamp-1">
                            {idea.author?.name || "Usuário"}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                    <div className="hover:text-primary transition-colors text-lg font-bold line-clamp-1 text-foreground leading-snug">
                        {idea.title}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {idea.description || ""}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-2 text-sm text-foreground py-1.5 px-3 border border-border rounded-lg bg-background">
                            <MessageSquare className="size-4 text-primary" />
                            <span>{idea.comments?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-foreground py-1.5 px-3 border border-border rounded-lg bg-background">
                            <ThumbsUp className="size-4 text-emerald-600" />
                            <span>{idea.countVotes || 0}</span>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatRelativeDate(idea.createdAt)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}