import React, { useEffect } from 'react';
import { Bell, X, MessageSquare, ArrowRight } from 'lucide-react';

export interface AdminAlertNotification {
  id: string;
  queryId: string;
  subject: string;
  adminReply: string;
  customerName?: string;
  timestamp: string;
}

interface AdminAlertBannerProps {
  alert: AdminAlertNotification | null;
  onDismiss: () => void;
  onOpenNotifications: () => void;
}

export const AdminAlertBanner: React.FC<AdminAlertBannerProps> = ({
  alert,
  onDismiss,
  onOpenNotifications,
}) => {
  useEffect(() => {
    if (!alert) return;

    // Optional audio chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // Audio context might be restricted before interaction; safe to ignore
    }

    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 10000);

    return () => clearTimeout(timer);
  }, [alert, onDismiss]);

  if (!alert) return null;

  return (
    <div className="fixed top-20 right-3 sm:right-6 z-50 max-w-md w-[calc(100vw-24px)] animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Accent top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FEE500]" />

        <div className="flex items-start gap-3 pt-1">
          <div className="relative w-10 h-10 rounded-xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-xs">
            <Bell className="w-5 h-5 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-black uppercase tracking-wider">
                Store Admin Replied!
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                New Message
              </span>
            </div>

            <p className="text-xs text-zinc-600 font-bold truncate mb-1.5">
              Re: "{alert.subject}"
            </p>

            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs font-black text-amber-950 line-clamp-2 leading-relaxed">
              "{alert.adminReply}"
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => {
                  onDismiss();
                  onOpenNotifications();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black hover:bg-zinc-800 text-[#FEE500] font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer"
              >
                <span>View Message &amp; Replies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onDismiss}
                className="px-2.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="w-7 h-7 rounded-lg border border-black bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-black font-black transition-colors cursor-pointer shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
