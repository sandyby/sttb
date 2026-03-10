"use client";

import { ElementType, useState } from "react";
import { Plus, Search, Edit2, Trash2, Shield, ShieldCheck, UserCheck, UserX, Mail, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

type UserRole = "super_admin" | "admin" | "editor" | "viewer";
type UserStatus = "active" | "inactive";

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    lastLogin: string;
    createdAt: string;
    avatar: string;
}

const roleConfig: Record<UserRole, { label: string; color: string; bg: string; icon: ElementType }> = {
    super_admin: { label: "Super Admin", color: "#E62129", bg: "bg-red-50 dark:bg-red-900/20", icon: ShieldCheck },
    admin: { label: "Admin", color: "#0A2C74", bg: "bg-blue-50 dark:bg-blue-900/20", icon: Shield },
    editor: { label: "Editor", color: "#0570CD", bg: "bg-sky-50 dark:bg-sky-900/20", icon: UserCheck },
    viewer: { label: "Viewer", color: "#059669", bg: "bg-green-50 dark:bg-green-900/20", icon: UserCheck },
};

const rolePermissions: Record<UserRole, string[]> = {
    super_admin: ["Semua akses termasuk manajemen pengguna & pengaturan sistem"],
    admin: ["Kelola berita, kegiatan, media, dan halaman", "Tidak bisa mengelola pengguna"],
    editor: ["Buat dan edit konten (berita, kegiatan)", "Tidak bisa mempublikasikan atau menghapus"],
    viewer: ["Hanya melihat dashboard dan statistik"],
};

const initialUsers: User[] = [
    { id: "1", name: "Sutrisna Harjanto", email: "rektor@sttb.ac.id", role: "super_admin", status: "active", lastLogin: "2026-03-09", createdAt: "2022-01-01", avatar: "SH" },
    { id: "2", name: "Admisi STTB", email: "admisi@sttb.ac.id", role: "admin", status: "active", lastLogin: "2026-03-08", createdAt: "2022-06-15", avatar: "AS" },
    { id: "3", name: "Media STTB", email: "media@sttb.ac.id", role: "editor", status: "active", lastLogin: "2026-03-07", createdAt: "2023-01-10", avatar: "MS" },
    { id: "4", name: "Perpustakaan STTB", email: "perpustakaan@sttb.ac.id", role: "editor", status: "active", lastLogin: "2026-03-05", createdAt: "2023-03-20", avatar: "PS" },
    { id: "5", name: "Alumni Relations", email: "alumni@sttb.ac.id", role: "viewer", status: "inactive", lastLogin: "2026-01-15", createdAt: "2023-07-01", avatar: "AR" },
];

function UserModal({ user, onClose, onSave }: { user: User | null; onClose: () => void; onSave: (u: User) => void }) {
    const isEdit = !!user;
    const [form, setForm] = useState<Partial<User>>(user ?? { name: "", email: "", role: "editor", status: "active", avatar: "", lastLogin: "", createdAt: new Date().toISOString().split("T")[0] });

    const handleSave = () => {
        if (!form.name?.trim()) { toast.error("Nama wajib diisi"); return; }
        if (!form.email?.includes("@")) { toast.error("Email tidak valid"); return; }
        const initials = (form.name ?? "?").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
        onSave({ ...form, id: user?.id ?? String(Date.now()), avatar: initials, lastLogin: user?.lastLogin ?? "—", createdAt: user?.createdAt ?? new Date().toISOString().split("T")[0] } as User);
        toast.success(isEdit ? "Pengguna berhasil diperbarui" : "Pengguna berhasil ditambahkan");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-4">
                    <h2 className="text-gray-900 dark:text-white font-bold">{isEdit ? "Edit Pengguna" : "Tambah Pengguna"}</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Nama Lengkap *</label>
                        <input className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.name ?? ""} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nama pengguna" />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Email *</label>
                        <input type="email" className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.email ?? ""} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="email@sttb.ac.id" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Peran</label>
                            <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.role ?? "editor"} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}>
                                <option value="super_admin">Super Admin</option>
                                <option value="admin">Admin</option>
                                <option value="editor">Editor</option>
                                <option value="viewer">Viewer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">Status</label>
                            <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" value={form.status ?? "active"} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as UserStatus }))}>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>
                    </div>
                    {/* Role permissions preview */}
                    {form.role && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Hak Akses</p>
                            {rolePermissions[form.role as UserRole].map((p, i) => (
                                <p key={i} className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">• {p}</p>
                            ))}
                        </div>
                    )}
                    {!isEdit && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-blue-700 dark:text-blue-400 text-xs">Undangan dan kata sandi sementara akan dikirim ke email pengguna.</p>
                        </div>
                    )}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex gap-3 justify-end">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
                    <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">
                        {isEdit ? "Simpan" : "Tambah"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminPenggunaPage() {
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<User | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const filtered = users.filter((u) => search === "" || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    const handleSave = (u: User) => {
        setUsers((prev) => {
            const idx = prev.findIndex((x) => x.id === u.id);
            if (idx >= 0) { const next = [...prev]; next[idx] = u; return next; }
            return [...prev, u];
        });
    };

    const handleDelete = (id: string) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirm(null);
        toast.success("Pengguna berhasil dihapus");
    };

    const handleToggleStatus = (id: string) => {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
        const u = users.find((x) => x.id === id);
        toast.success(u?.status === "active" ? "Pengguna dinonaktifkan" : "Pengguna diaktifkan kembali");
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-gray-900 dark:text-white font-bold text-2xl">Pengguna</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Kelola akun pengguna admin STTB</p>
                </div>
                <button onClick={() => { setEditing(null); setShowModal(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors">
                    <Plus className="w-4 h-4" /> Tambah Pengguna
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(Object.entries(roleConfig) as [UserRole, typeof roleConfig[UserRole]][]).map(([role, cfg]) => {
                    const count = users.filter((u) => u.role === role).length;
                    const Icon = cfg.icon;
                    return (
                        <div key={role} className={`${cfg.bg} rounded-xl border p-4`} style={{ borderColor: `${cfg.color}25` }}>
                            <Icon className="w-5 h-5 mb-2" style={{ color: cfg.color }} />
                            <p className="text-gray-900 dark:text-white font-bold text-xl">{count}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{cfg.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari pengguna..." className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E62129]" />
                </div>
            </div>

            {/* User list */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800/50">
                {filtered.map((u) => {
                    const roleCfg = roleConfig[u.role];
                    const RoleIcon = roleCfg.icon;
                    return (
                        <div key={u.id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: roleCfg.color }}>
                                {u.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-900 dark:text-white font-medium text-sm">{u.name}</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Mail className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-400 text-xs">{u.email}</span>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${roleCfg.bg}`} style={{ color: roleCfg.color }}>
                                    <RoleIcon className="w-3 h-3" /> {roleCfg.label}
                                </span>
                            </div>
                            <div className="hidden lg:block text-gray-400 text-xs text-right">
                                <p>Login terakhir</p>
                                <p>{u.lastLogin === "—" ? "—" : new Date(u.lastLogin).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleToggleStatus(u.id)}
                                    className={`p-1.5 rounded-lg transition-colors ${u.status === "active" ? "text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                                    title={u.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                                >
                                    {u.status === "active" ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                </button>
                                <button onClick={() => { setEditing(u); setShowModal(true); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-[#0A2C74] transition-colors opacity-0 group-hover:opacity-100">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setDeleteConfirm(u.id)} disabled={u.role === "super_admin"} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-[#E62129] transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {showModal && <UserModal user={editing} onClose={() => setShowModal(false)} onSave={handleSave} />}
                {deleteConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl max-w-sm w-full">
                            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Hapus Pengguna?</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Tindakan ini tidak dapat dibatalkan.</p>
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">Batal</button>
                                <button onClick={() => handleDelete(deleteConfirm!)} className="px-4 py-2 rounded-lg bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium">Hapus</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
