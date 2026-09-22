import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { CustomerQuery, UserProfile } from '../types';
import { formatShortDate } from '../utils/formatters';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  queries: CustomerQuery[];
  readReplyIds: string[];
  onMarkAsRead: (queryId: string) => void;
  onMarkAllAsRead: () => void;
  currentUser?: UserProfile | null;
  onOpenAskModal?: () => void;
  onSimulateReply?: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  queries,
  readReplyIds,
  onMarkAsRead,
  onMarkAllAsRead,
  currentUser,
  onOpenAskModal,
  onSimulateReply,
}) => {
  if (!isOpen) return null;

  // Filter queries that have an admin reply
  const repliedQueries = queries.filter((q) => q.status === 'replied' && q.adminReply);
  
  // Also check if any open queries exist for reference
  const pendingQueries = queries.filter((q) => q.status === 'open');

  const unreadCount = repliedQueries.filter((q) => !readReplyIds.includes(q.id)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-black bg-zinc-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-[#FEE500] border-2 border-black flex items-center justify-center text-black shadow-xs shrink-0">
              <Bell className="w-5 h-5 stroke-[2.5]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border border-black animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-black tracking-tight">
                  Store Notifications &amp; Replies
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] border border-black">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 font-medium">
                Live alert messages and replies from Om Mobile staff
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-black text-xs font-black border border-black transition-all cursor-pointer"
                title="Mark all notifications as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl border-2 border-black bg-white hover:bg-zinc-100 flex items-center justify-center text-black font-black transition-colors cursor-pointer shadow-xs active:scale-95"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Quick action bar for testing / asking inquiries */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-300 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="text-amber-950 font-bold">
                {currentUser ? `Notifications for ${currentUser.name}` : 'Direct Customer Support Desk'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onSimulateReply && (
                <button
                  type="button"
                  onClick={onSimulateReply}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-amber-900 border border-amber-400 font-black text-[11px] cursor-pointer shadow-xs active:scale-95"
                  title="Simulate an instant admin response to see live alert"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Simulate Admin Reply</span>
                </button>
              )}
              {onOpenAskModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAskModal();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black hover:bg-zinc-800 text-[#FEE500] font-black text-[11px] cursor-pointer shadow-xs active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  <span>Ask New Question</span>
                </button>
              )}
            </div>
          </div>

          {/* List of Replied Queries & Alerts */}
          {repliedQueries.length === 0 ? (
            <div className="p-8 text-center bg-zinc-50 rounded-2xl border-2 border-dashed border-zinc-300 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-zinc-200 border-2 border-black flex items-center justify-center mx-auto text-zinc-500">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-black text-sm">No Store Admin Replies Yet</h4>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                  When you submit an inquiry regarding phones, prices, or doorstep delivery, our counter team replies directly and you will receive an alert notification right here.
                </p>
              </div>
              {onSimulateReply && (
                <button
                  type="button"
                  onClick={onSimulateReply}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FEE500] hover:bg-[#ebd300] text-black font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trigger Demo Admin Reply Notification</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold px-1">
                <span>Recent Admin Replies ({repliedQueries.length})</span>
                {unreadCount > 0 && (
                  <span className="text-rose-600 font-black">{unreadCount} Unread Alert{unreadCount > 1 ? 's' : ''}</span>
                )}
              </div>

              {repliedQueries.map((query) => {
                const isUnread = !readReplyIds.includes(query.id);

                return (
                  <div
                    key={query.id}
                    className={`p-4 rounded-2xl border-2 border-black transition-all ${
                      isUnread 
                        ? 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ring-2 ring-amber-400/40' 
                        : 'bg-zinc-50/80 shadow-xs opacity-90'
                    }`}
                  >
                    {/* Top ticket header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-black text-[#FEE500] flex items-center justify-center font-black text-xs border border-black shrink-0">
                          OM
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs text-black">Om Mobile Store Staff</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider border border-emerald-300">
                              Verified Reply
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 font-medium">Ticket: {query.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isUnread && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" title="Unread notification" />
                        )}
                        <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {query.replyTimestamp ? formatShortDate(query.replyTimestamp) : 'Recently'}
                        </span>
                      </div>
                    </div>

                    {/* Customer Inquiry Summary */}
                    <div className="mb-2.5 px-3 py-2 rounded-xl bg-zinc-100 border border-zinc-200 text-xs">
                      <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400 block mb-0.5">
                        Your Inquiry: {query.productName ? `(${query.productName})` : ''}
                      </span>
                      <p className="font-bold text-zinc-800 line-clamp-2">
                        "{query.subject || query.message}"
                      </p>
                    </div>

                    {/* Admin Reply Highlighted Box */}
                    <div className="p-3.5 rounded-2xl bg-[#FEE500]/25 border-2 border-black space-y-1 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Official Store Response:
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-black leading-relaxed">
                        {query.adminReply}
                      </p>
                    </div>

                    {/* Actions footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/918013040486?text=${encodeURIComponent(
                            `Hello Om Mobile Store, in reference to my inquiry (${query.id} - ${query.subject}), I received your reply: "${query.adminReply}". I would like to proceed.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-xs border border-emerald-400 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Follow up on WhatsApp</span>
                        </a>

                        <a
                          href="tel:+919274305279"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs border border-zinc-300 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Shop</span>
                        </a>
                      </div>

                      {isUnread ? (
                        <button
                          type="button"
                          onClick={() => onMarkAsRead(query.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-black text-white hover:bg-zinc-800 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5 text-zinc-400" />
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pending Inquiries Section if any */}
          {pendingQueries.length > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-200">
              <span className="text-xs font-black text-zinc-500 uppercase tracking-wider block mb-2">
                Awaiting Admin Reply ({pendingQueries.length})
              </span>
              <div className="space-y-2">
                {pendingQueries.map((pq) => (
                  <div key={pq.id} className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-zinc-800 block truncate max-w-sm sm:max-w-md">{pq.subject}</span>
                      <span className="text-[10px] text-zinc-400">Submitted {formatShortDate(pq.timestamp)}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] border border-amber-300">
                      In Queue
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3.5 sm:p-4 border-t-2 border-black bg-zinc-50 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
            Counter Desk Hotline: <strong className="text-black font-black">+91 92743 05279</strong>
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-black text-[#FEE500] font-black text-xs border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer ml-auto"
          >
            Close Notifications
          </button>
        </div>

      </div>
    </div>
  );
};
