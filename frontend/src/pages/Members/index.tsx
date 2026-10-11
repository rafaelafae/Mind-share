import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { useAuthStore } from "@/stores/auth";
import { LIST_MEMBERS } from "@/lib/graphql/queries/Members";
import { User } from "@/types";
import { Crown, Plus, Search, UserIcon } from "lucide-react";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberCard } from "./components/MemberCard";
import { InviteMemberDialog } from "./components/InviteMemberDialog";
import { EditMemberDialog } from "./components/EditMemberDialog";
import { DeleteMemberDialog } from "./components/DeleteMemberDialog";


export function MembersPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [openInviteDialog, setOpenInviteDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditMemberDialog, setOpenEditMemberDialog] = useState(false);
	const [member, setMember] = useState<User | null>(null);

	const currentUserId = useAuthStore((state) => state.user?.id);
	const { data, loading, refetch } = useQuery<{ listUsers: User[] }>(LIST_MEMBERS);

	const handleAddUser = () => {
		setOpenInviteDialog(true)
	};

	const handleEditUser = (editMember: User) => {
		setMember(editMember)
		setOpenEditMemberDialog(true)
	};

	const handleDeleteUser = (deleteMember: User) => {
		setMember(deleteMember)
		setOpenDeleteDialog(true)
	};

	const members = data?.listUsers ?? [];

	const adminCount = members.filter(
		(m) => m.role === "admin" || m.role === "owner"
	).length;
	const memberCount = members.filter(
		(m) => m.role !== "admin" && m.role !== "owner"
	).length;

	const filteredMembers = members.filter((m) => {
		const query = searchQuery.toLowerCase();

		if (!query) return true;

		const nameMatch = m.name.toLowerCase().includes(query) ?? false;
		const emailMatch = m.email.toLowerCase().includes(query) ?? false;

		return nameMatch || emailMatch;
	});

	return (
		<Page>
			<div className="space-y-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold text-purple-600">Usuários</h1>

						<div className="flex items-center gap-2 pt-1">
							<span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-200/80 px-2.5 py-1 text-xs text-slate-800 font-semibold">
								<Crown className="size-4 text-slate-700 font-semibold" />
								<span>
									<strong className="font-semibold text-slate-700">{adminCount}</strong>{" "}
									{adminCount === 1 ? "admin" : "admins"}
								</span>
							</span>

							<span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-200/80 px-2.5 py-1 text-xs text-slate-700 font-semibold">
								<UserIcon className="size-4 text-slate-800 font-semibold" />
								<span>
									<strong className="font-semibold text-slate-700">{memberCount}</strong>{" "}
									{memberCount === 1 ? "membro" : "membros"}
								</span>
							</span>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="flex items-center gap-3">
							<Label htmlFor="search" className="text-sm text-muted-foreground whitespaces-nowrap font-bold">
								Busque membros:
							</Label>

							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
								<Input
									id="search"
									placeholder="Nome ou e-mail"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-9 w-60 bgwhite rounded-lg border-border"
								/>
							</div>
						</div>

						<Button
							onClick={handleAddUser}
							className="h-10 px-4 bg-primary text-primary-foreground"
						>
							<Plus className="mr-1.5 size-4" />
							Novo usuário
						</Button>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{!loading &&
						filteredMembers.map((m) => (
							<MemberCard
								key={m.id}
								member={m}
								isCurrentUser={m.id === currentUserId}
								onEdit={() => handleEditUser(m)}
								onDelete={() => handleDeleteUser(m)}
							/>
						))}

					{!loading && filteredMembers.length === 0 && (
						<p className="col-span-full py-8 text-center text-sm text-muted-foreground">
							Nenhum membro encontrado com "{searchQuery}".
						</p>
					)}
				</div>
			</div>

			<InviteMemberDialog
				open={openInviteDialog}
				onOpenChange={setOpenInviteDialog}
				onCreated={() => refetch()}
			/>

			<EditMemberDialog
				open={openEditMemberDialog}
				onOpenChange={setOpenEditMemberDialog}
				onUpdated={() => refetch()}
				member={member}
			/>

			<DeleteMemberDialog
				open={openDeleteDialog}
				onOpenChange={setOpenDeleteDialog}
				member={member}
			/>
		</Page >
	);
}