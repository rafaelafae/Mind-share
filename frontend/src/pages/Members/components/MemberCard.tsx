import { User } from "@/types"
import { Crown, Edit, Trash, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


interface MemberCardProps {
	member: User
	isCurrentUser: boolean
	onEdit: () => void
	onDelete: () => void
}

export function MemberCard({
	member,
	isCurrentUser,
	onEdit,
	onDelete,
}: MemberCardProps) {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2)
	}

	const isAdmin = member.role === "admin" || member.role === "owner"

	return (
		<Card className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:shadow-md">
			<CardContent className="p-0">
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-start gap-3.5 min-w-0">
						<Avatar className="size-11 shrink-0">
							<AvatarFallback className="bg-slate-950 text-sm font-semibold text-white">
								{getInitials(member.name)}
							</AvatarFallback>
						</Avatar>

						<div className="space-y-0.5 min-w-0 pt-0.5">
							<p className="text-x font-semibold text-slate-900 truncate">
								{member.name}
							</p>
							<p className="text-xs text-slate-500 truncate">
								{member.email}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-1.5 shrink-0">
						<Button
							type="button"
							onClick={onDelete}
							disabled={isCurrentUser}
							title="Excluir usuário"
							className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 disabled:pointer-events-none"
						>
							<Trash className="size-4" />
						</Button>
						<Button
							type="button"
							onClick={onEdit}
							title="Editar usuário"
							className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
						>
							<Edit className="size-4" />
						</Button>
					</div>
				</div>

				<div className="mt-4 flex items-center gap-2 pt-1">
					{isAdmin ? (
						<span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-white px-2 py-0.5 text-xs font-medium text-slate-800">
							<Crown className="size-3.5 text-indigo-600" />
							Admin
						</span>
					) : (
						<span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-white px-2 py-0.5 text-xs font-medium text-slate-800">
							<UserIcon className="size-3.5 text-purple-600" />
							Membro
						</span>
					)}

					{isCurrentUser && (
						<span className="inline-flex items-center rounded-md border border-slate-200/70 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-700">
							Você
						</span>
					)}
				</div>
			</CardContent>
		</Card>
	);
}