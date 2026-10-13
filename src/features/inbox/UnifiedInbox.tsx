import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Channel } from '../../types';
import {
  MessageSquare,
  Send,
  UserCheck,
  UserPlus,
  Phone,
  Search,
  CheckCircle2,
  AlertCircle,
  Globe,
  Instagram,
  Facebook,
  Smartphone,
  ChevronDown,
} from 'lucide-react';

export const UnifiedInbox: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    assignConversation,
    convertConversationToLead,
  } = useStore();

  const [channelFilter, setChannelFilter] = useState<'all' | Channel>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'escalated' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const activeConv =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const filteredConversations = conversations.filter((c) => {
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesSearch =
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerPhone.includes(searchQuery) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesStatus && matchesSearch;
  });

  const getChannelIcon = (ch: Channel) => {
    switch (ch) {
      case 'whatsapp':
        return <Smartphone className="w-3.5 h-3.5 text-[#16A34A]" />;
      case 'website':
        return <Globe className="w-3.5 h-3.5 text-[#0EA5B7]" />;
      case 'instagram':
        return <Instagram className="w-3.5 h-3.5 text-[#E5484D]" />;
      case 'facebook':
        return <Facebook className="w-3.5 h-3.5 text-[#6C8CFF]" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-[#5B6170]" />;
    }
  };

  const handleSend = () => {
    if (!replyText.trim() || !activeConv) return;
    sendMessage(activeConv.id, replyText, 'agent');
    setReplyText('');
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9AA0AB]">
            <span>Section A · Customer Communication</span>
            <span>·</span>
            <span>Omnichannel</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif-display font-semibold text-[#14161A] mt-1">
            Unified Omnichannel Inbox
          </h1>
          <p className="text-xs text-[#5B6170] mt-0.5">
            Single stream managing WhatsApp Business, Web Chatbot, Instagram DM, and Messenger
          </p>
        </div>

        {/* Channel Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#ECE8E1] rounded-xl text-xs overflow-x-auto">
          {(['all', 'whatsapp', 'website', 'instagram', 'facebook'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                channelFilter === ch
                  ? 'bg-[#14161A] text-white shadow-xs'
                  : 'text-[#5B6170] hover:text-[#14161A] hover:bg-[#FAF8F5]'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Inbox Container */}
      <div className="flex-1 min-h-0 bg-white border border-[#ECE8E1] rounded-2xl shadow-xs grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left: Conversations List (5 cols) */}
        <div className="md:col-span-5 border-r border-[#ECE8E1] flex flex-col h-full bg-[#FAF8F5]/30">
          {/* Search & Status Filters */}
          <div className="p-3.5 border-b border-[#ECE8E1] space-y-2.5 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#9AA0AB] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations, phones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg text-[#14161A] placeholder-[#9AA0AB] outline-none"
              />
            </div>

            <div className="flex items-center gap-1 text-[11px]">
              {(['all', 'open', 'escalated', 'resolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium ${
                    statusFilter === st
                      ? 'bg-[#14161A] text-white'
                      : 'text-[#5B6170] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#ECE8E1]/60">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`p-3.5 cursor-pointer transition-colors ${
                  activeConv?.id === conv.id
                    ? 'bg-white border-l-3 border-[#0EA5B7] shadow-xs'
                    : 'hover:bg-white/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-[#FAF8F5] border border-[#ECE8E1]">
                      {getChannelIcon(conv.channel)}
                    </span>
                    <span className="text-xs font-semibold text-[#14161A]">{conv.customerName}</span>
                  </div>
                  <span className="text-[10px] text-[#9AA0AB]">{conv.lastMessageTime}</span>
                </div>

                <p className="text-xs text-[#5B6170] mt-1 line-clamp-1 leading-snug">
                  {conv.lastMessage}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2 text-[10px]">
                  <span className="text-[#9AA0AB]">{conv.city} · {conv.equipmentBrand || 'General'}</span>
                  {conv.leadConverted ? (
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                      Qualified Lead
                    </span>
                  ) : conv.status === 'escalated' ? (
                    <span className="text-red-700 font-semibold bg-red-50 px-1.5 py-0.2 rounded">
                      Escalated
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Conversation Thread (7 cols) */}
        {activeConv ? (
          <div className="md:col-span-7 flex flex-col h-full bg-white">
            {/* Thread Header */}
            <div className="p-4 border-b border-[#ECE8E1] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#ECE8E1] flex items-center justify-center text-xs font-semibold text-[#14161A]">
                  {activeConv.customerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-[#14161A]">{activeConv.customerName}</h3>
                    <span className="text-[10px] text-[#5B6170] font-mono">{activeConv.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#9AA0AB]">
                    <span>Channel: {activeConv.channel.toUpperCase()}</span>
                    <span>·</span>
                    <span>Language: {activeConv.language.toUpperCase()}</span>
                    <span>·</span>
                    <span>City: {activeConv.city}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {!activeConv.leadConverted ? (
                  <button
                    onClick={() => convertConversationToLead(activeConv.id)}
                    className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] hover:bg-[#F2EFE9] text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#0EA5B7]" />
                    <span>Convert to Lead</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Lead Created</span>
                  </span>
                )}

                <select
                  value={activeConv.assignedTo || ''}
                  onChange={(e) => assignConversation(activeConv.id, e.target.value)}
                  className="text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-lg px-2 py-1.5 text-[#14161A] outline-none"
                >
                  <option value="">Assign Member</option>
                  <option value="Bandar Al-Khatib">Bandar Al-Khatib</option>
                  <option value="Hani Ba-Rahma">Hani Ba-Rahma</option>
                  <option value="Mansour Al-Ghamdi">Mansour Al-Ghamdi</option>
                </select>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/30">
              {activeConv.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'customer' ? 'items-start' : 'items-end'
                  }`}
                >
                  <div className="text-[10px] text-[#9AA0AB] mb-0.5 px-1">
                    {m.sender === 'customer'
                      ? activeConv.customerName
                      : m.sender === 'bot'
                      ? 'Thermiq Auto-Assistant'
                      : 'Live Agent'}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'customer'
                        ? 'bg-white border border-[#ECE8E1] text-[#14161A] rounded-bl-none shadow-xs'
                        : m.sender === 'bot'
                        ? 'bg-[#FAF8F5] border border-[#ECE8E1] text-[#14161A] rounded-br-none'
                        : 'bg-[#14161A] text-white rounded-br-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#9AA0AB] mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-3.5 border-t border-[#ECE8E1] bg-white flex items-center gap-2">
              <input
                type="text"
                placeholder={`Reply to ${activeConv.customerName} via ${activeConv.channel}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 text-xs bg-[#FAF8F5] border border-[#ECE8E1] rounded-xl px-3.5 py-2.5 text-[#14161A] placeholder-[#9AA0AB] outline-none focus:border-[#0EA5B7]"
              />
              <button
                onClick={handleSend}
                className="p-2.5 bg-thermal-gradient text-white rounded-xl shadow-xs hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="md:col-span-7 flex items-center justify-center p-8 text-[#9AA0AB] text-xs">
            Select a conversation to view thread
          </div>
        )}
      </div>
    </div>
  );
};
