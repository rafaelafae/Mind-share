import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, } from "@/components/ui/drawer";
import { GET_IDEA } from "@/lib/graphql/queries/Ideas";
import { Idea } from "@/types";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentsList } from "./CommentsList";
import { CommentArea } from "./CommentArea";
import { toast } from "sonner";
import { CREATE_COMMENT } from "@/lib/graphql/mutations/Comment";
import { TOGGLE_VOTE } from "@/lib/graphql/mutations/Vote";


interface IdeaDetailDrawerProps {
    ideaId: string | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function IdeaDetailDrawer({
    open,
    onOpenChange,
    ideaId,
}: IdeaDetailDrawerProps) {
    const [getIdeaQuery, { data, loading }] = useLazyQuery<{ getIdea: Idea }>(GET_IDEA);

    const [commentContent, setCommentContent] = useState("");

    const [createCommentMutation] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{ query: GET_IDEA, variables: { id: ideaId } }],
        onCompleted: () => {
            setCommentContent("");
        },
    });

    const [toggleVoteMutation] = useMutation(TOGGLE_VOTE, {
        refetchQueries: [{ query: GET_IDEA, variables: { id: ideaId } }],
    });

    const handleAddComment = () => {
        if (!commentContent) toast.error("Por favor insira um comentário.");

        createCommentMutation({
            variables: {
                ideaId,
                data: {
                    content: commentContent
                },
            },
        });
    };

    const handleVote = () => {
        toggleVoteMutation({
            variables: {
                ideaId,
            },
        });
    };

    useEffect(() => {

        if (open && ideaId) {
            getIdeaQuery({
                variables: {
                    id: ideaId,
                },
            });
        }
    }, [open, ideaId, getIdeaQuery]);

    const { getIdea: idea } = data || {};

    return (
        <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
            <DrawerContent className="flex flex-col rounded-l-2xl">
                <div className="shrink-0 p-6 bg-slate-100 rounded-l-2xl">
                    <div className="flex items-start justify-between">
                        <h2 className="text-2xl font-semibold pr-4 flex-1">
                            {idea?.title || "Carregando..."}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="shrink-0"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    {idea && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {idea.description || ""}
                        </p>
                    )}
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-8">
                    <CommentsList
                        comments={idea?.comments || []}
                        loading={loading}
                    />
                </div>
                <CommentArea
                    commentContent={commentContent || ""}
                    setCommentContent={setCommentContent}
                    handleAddComment={handleAddComment}
                    handleVote={handleVote}
                    idea={idea}
                />
            </DrawerContent>
        </Drawer >
    );
}