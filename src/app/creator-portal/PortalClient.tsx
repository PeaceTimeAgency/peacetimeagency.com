'use client';

import { useState } from 'react';
import { Creator } from '@/lib/creators';
import { Button } from '@/components/ui/Button';
import { updateCreatorAction } from '@/app/actions/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Layout, 
  Share2, 
  Settings, 
  Video, 
  Music, 
  Type, 
  Zap, 
  Search, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Globe,
  Timer,
  BarChart3
} from 'lucide-react';

interface PortalClientProps {
  initialCreator: Creator;
}

type TabType = 'general' | 'media' | 'design' | 'advanced';

export function PortalClient({ initialCreator }: PortalClientProps) {
  const [creator, setCreator] = useState<Creator>(initialCreator);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [newLink, setNewLink] = useState({ label: '', url: '' });
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const result = await updateCreatorAction(creator);
    if (result.success && result.creator) {
      setCreator(result.creator);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      router.refresh();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }
    setSaving(false);
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  }

  const addCustomLink = () => {
    if (!newLink.label || !newLink.url) return;
    const links = creator.customLinks || [];
    setCreator({
      ...creator,
      customLinks: [...links, { ...newLink }]
    });
    setNewLink({ label: '', url: '' });
  };

  const removeCustomLink = (index: number) => {
    const links = [...(creator.customLinks || [])];
    links.splice(index, 1);
    setCreator({ ...creator, customLinks: links });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'media', label: 'Media & Links', icon: Share2 },
    { id: 'design', label: 'Design', icon: Layout },
    { id: 'advanced', label: 'Advanced', icon: Settings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Portal Console</h1>
          <p className="text-white/40 font-medium">Configure your presence across the Peace Time Network.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatePresence>
            {message && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`text-sm font-bold px-4 py-2 rounded-full border ${
                  message.type === 'success' 
                    ? 'text-green-400 bg-green-400/10 border-green-400/20' 
                    : 'text-red-400 bg-red-400/10 border-red-400/20'
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            glow 
            size="lg"
            className="min-w-[160px]"
          >
            {saving ? 'Synchronizing...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}

          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Network Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/30">ID</span>
                <span className="text-white/60 font-mono">{creator.id}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/30">Connectivity</span>
                <span className="text-green-500 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {activeTab === 'general' && (
                <>
                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <User className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Identity Profile</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Display Name</label>
                        <input
                          type="text"
                          value={creator.name}
                          onChange={(e) => setCreator({ ...creator, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Professional Title</label>
                        <input
                          type="text"
                          value={creator.title || ''}
                          onChange={(e) => setCreator({ ...creator, title: e.target.value })}
                          placeholder="e.g. Variety Streamer"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Transmission Bio</label>
                      <textarea
                        value={creator.description}
                        onChange={(e) => setCreator({ ...creator, description: e.target.value })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none font-medium leading-relaxed"
                      />
                    </div>
                  </section>

                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Share2 className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Social Grid</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { label: 'TikTok URL', key: 'tiktok' },
                        { label: 'Instagram URL', key: 'instagram' },
                        { label: 'YouTube URL', key: 'youtube' },
                        { label: 'Twitch URL', key: 'twitch' },
                        { label: 'Discord Handle', key: 'discord' },
                        { label: 'X (Twitter) URL', key: 'x' },
                      ].map((social) => (
                        <div key={social.key} className="space-y-2">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.1em]">{social.label}</label>
                          <input
                            type="text"
                            value={(creator.socials as any)[social.key] || ''}
                            onChange={(e) => setCreator({ 
                              ...creator, 
                              socials: { ...creator.socials, [social.key]: e.target.value }
                            })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'media' && (
                <>
                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Video className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Media Embeds</h2>
                    </div>
                    <p className="text-sm text-white/40 font-medium italic">Native players for fans to consume content without leaving your card.</p>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                            <Video size={12} /> YouTube Video URL
                          </label>
                          <input
                            type="text"
                            value={creator.embeds?.youtube || ''}
                            onChange={(e) => setCreator({ 
                              ...creator, 
                              embeds: { ...creator.embeds, youtube: e.target.value } 
                            })}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                            <Music size={12} /> Spotify Playlist/Track URL
                          </label>
                          <input
                            type="text"
                            value={creator.embeds?.spotify || ''}
                            onChange={(e) => setCreator({ 
                              ...creator, 
                              embeds: { ...creator.embeds, spotify: e.target.value } 
                            })}
                            placeholder="https://open.spotify.com/..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <LinkIcon className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Unlimited Custom Links</h2>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="text"
                        value={newLink.label}
                        onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                        placeholder="Link Label (e.g. My Merch Store)"
                        className="flex-[2] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                      />
                      <input
                        type="text"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        placeholder="https://..."
                        className="flex-[3] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                      />
                      <Button onClick={addCustomLink} variant="secondary" className="px-8 font-black">
                        <Plus className="mr-2" size={18} /> Add Link
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(creator.customLinks || []).map((link, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-primary/50 transition-all">
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-wider">{link.label}</p>
                            <p className="text-xs text-white/30 truncate max-w-[200px]">{link.url}</p>
                          </div>
                          <button 
                            onClick={() => removeCustomLink(i)}
                            className="text-red-400/40 hover:text-red-400 transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'design' && (
                <>
                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Type className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Visual Customization</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Accent Theme Color</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            value={creator.customization?.themeColor || '#6C5CE7'}
                            onChange={(e) => setCreator({ 
                              ...creator, 
                              customization: { ...creator.customization, themeColor: e.target.value } 
                            })}
                            className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer overflow-hidden p-0"
                          />
                          <input
                            type="text"
                            value={creator.customization?.themeColor || '#6C5CE7'}
                            onChange={(e) => setCreator({ 
                              ...creator, 
                              customization: { ...creator.customization, themeColor: e.target.value } 
                            })}
                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono uppercase"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Global Typography</label>
                        <select
                          value={creator.customization?.fontFamily || 'Inter'}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            customization: { ...creator.customization, fontFamily: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                        >
                          <option value="Inter">Standard Inter</option>
                          <option value="Outfit">Modern Outfit</option>
                          <option value="Space Grotesk">Technical Space Grotesk</option>
                          <option value="Syncopate">Cyber Syncopate</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Dynamic Environment Effects</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['none', 'stars', 'bubbles', 'waves'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setCreator({ 
                              ...creator, 
                              customization: { ...creator.customization, bgAnimation: type as any } 
                            })}
                            className={`px-4 py-4 rounded-2xl border font-black uppercase text-[10px] tracking-widest transition-all ${
                              creator.customization?.bgAnimation === type 
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-white/5 border-white/10 text-white/40 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Layout className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Background Atmos</h2>
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Background Image/GIF Assets</label>
                      <input
                        type="text"
                        value={creator.backgroundUrl || ''}
                        onChange={(e) => setCreator({ ...creator, backgroundUrl: e.target.value })}
                        placeholder="https://... (Direct image/gif link)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all font-medium"
                      />
                      
                      <div className="space-y-4 mt-6">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Master Contrast ({creator.backgroundContrast ?? 100}%)</label>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={creator.backgroundContrast ?? 100}
                          onChange={(e) => setCreator({ ...creator, backgroundContrast: parseInt(e.target.value) })}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                      </div>
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'advanced' && (
                <>
                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Zap className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">Smart Automation</h2>
                    </div>
                    <p className="text-sm text-white/40 font-medium italic">Automatically pull your latest platform content into position.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">YouTube Channel ID</label>
                        <input
                          type="text"
                          value={creator.automation?.youtubeChannelId || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            automation: { ...creator.automation, youtubeChannelId: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Instagram Username</label>
                        <input
                          type="text"
                          value={creator.automation?.instagramUsername || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            automation: { ...creator.automation, instagramUsername: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <div>
                        <p className="text-sm font-black text-white uppercase tracking-wider">Auto-Pull Content</p>
                        <p className="text-xs text-white/40">Continuously update with latest posts/videos</p>
                      </div>
                      <button
                        onClick={() => setCreator({ 
                          ...creator, 
                          automation: { ...creator.automation, autoUpdateContent: !creator.automation?.autoUpdateContent } 
                        })}
                        className={`w-12 h-6 rounded-full transition-all relative ${
                          creator.automation?.autoUpdateContent ? 'bg-primary' : 'bg-white/10'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                          creator.automation?.autoUpdateContent ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  </section>

                  <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <Search className="text-primary" size={24} />
                      <h2 className="text-xl font-bold text-white tracking-tight">SEO Engine</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Meta Title</label>
                        <input
                          type="text"
                          value={creator.seo?.metaTitle || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            seo: { ...creator.seo, metaTitle: e.target.value } 
                          })}
                          placeholder={`${creator.name} | Peace Time Network`}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-white/40 uppercase tracking-wider">Meta Description</label>
                        <input
                          type="text"
                          value={creator.seo?.metaDescription || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            seo: { ...creator.seo, metaDescription: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <Timer className="text-primary" size={24} />
                        <h2 className="text-xl font-bold text-white tracking-tight">Countdown Timer</h2>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={creator.countdown?.label || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            countdown: { ...creator.countdown, label: e.target.value } 
                          })}
                          placeholder="Event Label (e.g. Next Big Drop)"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                        />
                        <input
                          type="datetime-local"
                          value={creator.countdown?.targetDate || ''}
                          onChange={(e) => setCreator({ 
                            ...creator, 
                            countdown: { ...creator.countdown, targetDate: e.target.value } 
                          })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white color-scheme-dark"
                        />
                      </div>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <BarChart3 className="text-primary" size={24} />
                        <h2 className="text-xl font-bold text-white tracking-tight">Deployment Strategy</h2>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                          <div>
                            <p className="text-sm font-black text-white uppercase tracking-wider">A/B Traffic Testing</p>
                            <p className="text-xs text-white/40">Test alternate versions of bio and image</p>
                          </div>
                          <button
                            onClick={() => setCreator({ 
                              ...creator, 
                              abTest: { ...creator.abTest, enabled: !creator.abTest?.enabled } 
                            })}
                            className={`w-12 h-6 rounded-full transition-all relative ${
                              creator.abTest?.enabled ? 'bg-primary' : 'bg-white/10'
                            }`}
                          >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              creator.abTest?.enabled ? 'left-7' : 'left-1'
                            }`} />
                          </button>
                        </div>

                        {creator.abTest?.enabled && (
                          <div className="space-y-4 animate-fade-in">
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Variant B Bio</label>
                              <textarea
                                value={creator.abTest?.altBio || ''}
                                onChange={(e) => setCreator({ 
                                  ...creator, 
                                  abTest: { ...creator.abTest, altBio: e.target.value } 
                                })}
                                placeholder="A different version of your bio..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[100px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Variant B Image URL</label>
                              <input
                                type="text"
                                value={creator.abTest?.altImage || ''}
                                onChange={(e) => setCreator({ 
                                  ...creator, 
                                  abTest: { ...creator.abTest, altImage: e.target.value } 
                                })}
                                placeholder="https://example.com/other-image.jpg"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
