"use client";

import { Trash2, AlertTriangle, X } from "lucide-react";
import { cn } from "@/components/ui/utils";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  onConfirmAction: () => void;
  title: string;
  description: string;
  isPending?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onCloseAction,
  onConfirmAction,
  title,
  description,
  isPending,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-2">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-[#E62129]" />
            </div>
            <button 
                onClick={onCloseAction}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
        
        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {description}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onCloseAction}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirmAction}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#E62129] hover:bg-[#c4131a] text-white text-sm font-medium transition-colors shadow-md disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {isPending && (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {isPending ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}
