'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Shirt, 
  Dumbbell, 
  Utensils, 
  Gamepad2, 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  CheckCircle2, 
  Users, 
  Settings, 
  LogOut,
  Clock,
  Download,
  Search,
  X,
  Sliders,
  ShieldCheck,
  RefreshCw,
  ArrowUpDown,
  Heart,
  GitCompare,
  SlidersHorizontal,
  BookmarkCheck,
  Info,
  Check,
  Sparkle
} from 'lucide-react';

type Industry = 'Beauty' | 'Fashion' | 'Fitness' | 'Food' | 'Gaming' | 'Favorites';
type SortField = 'uss' | 'followers' | 'engagementRate' | 'authenticity' | 'postsPerWeek';
type SortOrder = 'asc' | 'desc';

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  industry: Industry;
  followers: number;
  engagementRate: number;
  authenticity: number;
  postsPerWeek: number;
  reachScore: number;
  uss: number;
  platform: string;
}

const INDUSTRIES = [
  { id: 'Beauty' as Industry, label: 'Beauty & Cosmetics', icon: Sparkles },
  { id: 'Fashion' as Industry, label: 'Fashion & Apparel', icon: Shirt },
  { id: 'Fitness' as Industry, label: 'Fitness & Wellness', icon: Dumbbell },
  { id: 'Food' as Industry, label: 'Food & Culinary Arts', icon: Utensils },
  { id: 'Gaming' as Industry, label: 'Gaming & Esports', icon: Gamepad2 },
];

const STRATEGIC_INSIGHTS: Record<Exclude<Industry, 'Favorites'>, {
  guide: string;
  engagement: string;
  cpm: string;
  peakSeason: string;
  tips: string[];
}> = {
  Beauty: {
    guide: 'Beauty audiences are highly visual and trust-driven. Micro-influencers (50K–500K) often outperform mega-influencers on conversion rates by 3–5x due to perceived authenticity.',
    engagement: '3.8%',
    cpm: '$12.50',
    peakSeason: 'Q4 (Holiday Gift Guides)',
    tips: [
      'Prioritize YouTube shorts and Instagram Reels for video tutorial conversions.',
      'Always request authenticity metrics; screen for bot followers prior to contracting.',
      'Structure agreements around 90-day organic advocacy intervals instead of one-offs.'
    ]
  },
  Fashion: {
    guide: 'Fashion partnerships thrive on high styling frequency and visual trend alignment. Lookbooks, dynamic transition clips, and seasonal collection releases drive the highest save rates.',
    engagement: '4.5%',
    cpm: '$15.00',
    peakSeason: 'Q3 (Autumn/Fall Launches)',
    tips: [
      'Prioritize Instagram and TikTok over other networks for high apparel styling saves.',
      'Leverage Multi-Item Transition videos to boost product listing page click-throughs.',
      'Ensure standard usage rights include organic repurposing for target retargeting ads.'
    ]
  },
  Fitness: {
    guide: 'Fitness and Wellness creators derive authority from proven transformations and consistent workout structures. Conversions scale directly with the creator\'s scientific credibility.',
    engagement: '5.2%',
    cpm: '$10.00',
    peakSeason: 'Q1 (New Year Resolutions)',
    tips: [
      'Partner on long-form workout vlogs to allow complete product demonstration cycles.',
      'Integrate workout routines with single-link discount trackers for high conversion attribution.',
      'Prioritize creators with dedicated certification badges visible on social biographies.'
    ]
  },
  Food: {
    guide: 'Culinary content scales when centering on highly engaging step-by-step recipe steps, satisfying ASMR, and close-up texturization. Saves and shares are the key KPI metrics here.',
    engagement: '3.1%',
    cpm: '$11.00',
    peakSeason: 'Q4 (Thanksgiving & Holidays)',
    tips: [
      'Request that recipe ingredients are pinned directly inside the video comments.',
      'Co-create kitchen hack tutorials to leverage organic viral culinary loops.',
      'Focus strictly on high-definition recipe reels for Pinterest cross-syndication.'
    ]
  },
  Gaming: {
    guide: 'Gaming and Esports requires high active immersion and chat engagement. Live stream overlays, gameplay integration showcases, and hardware sponsorships yield high return margins.',
    engagement: '6.4%',
    cpm: '$8.50',
    peakSeason: 'Q3 (Summer & Convention Seasons)',
    tips: [
      'Focus video sponsorships on Twitch live broadcasts and YouTube stream integrations.',
      'Structure giveaways directly tied to live viewer chat triggers for high engagement.',
      'Utilize interactive discord server channel pinning to drive digital code acquisitions.'
    ]
  }
};

// High-fidelity details helper metadata for Creator Profile overlay
const CREATOR_DETAILS_SHEET = {
  bio: 'Professional content creator specializing in data-driven campaign performance and visually arresting digital reviews. Renowned for authentic conversion rates and deep, active community engagement.',
  sponsors: ['Gymshark', 'NordVPN', 'HelloFresh', 'Audible', 'ASOS', 'L\'Oreal'],
  interests: ['Lifestyle & Fashion', 'Tech Ecosystems', 'Digital Design', 'Sustainable Wellness'],
  posts: [
    { image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', likes: '14.2K', comments: '412', caption: 'Pushing past boundaries with this weeks custom showcase. Consistency is your only superpower! ✨' },
    { image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', likes: '11.8K', comments: '289', caption: 'Behind-the-scenes workflow config. What are your setup must-haves? 💻 Let me know below!' }
  ]
};

// Tooltips content mapping
const METRIC_TOOLTIPS_DATA: Record<string, { measures: string, matters: string, average: string }> = {
  uss: {
    measures: 'Upfluence Synergy Score (USS) calculated dynamically.',
    matters: 'Enables quick comparative analysis on a unified baseline.',
    average: '35 - 45 (Out of 100)'
  },
  followers: {
    measures: 'Total raw follower count across active platforms.',
    matters: 'Defines the baseline target size and reach footprint.',
    average: '350K - 500K'
  },
  engagement: {
    measures: 'Likes, Comments, Shares divided by aggregate impressions.',
    matters: 'A true predictor of audience interest and buy conversions.',
    average: '3.5%'
  },
  authenticity: {
    measures: 'Verified human accounts screening ratio.',
    matters: 'Prevents investment waste on botted profiles and fake engagement.',
    average: '82%'
  },
  postsPerWeek: {
    measures: 'Volume of publishing posts per week.',
    matters: 'Sustains brand top-of-mind recall and organic engagement.',
    average: '4.2 Posts/wk'
  }
};

export default function App() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>('Beauty');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTipsExpanded, setIsTipsExpanded] = useState<boolean>(false);
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<string>('live');

  // Interactive feature states
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [showComparisonModal, setShowCompareModal] = useState<boolean>(false);

  // New interactive UX states
  const [activeCreatorDetail, setActiveCreatorDetail] = useState<Creator | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState<boolean>(false);
  const [showComparisonNotification, setShowComparisonNotification] = useState<boolean>(false);

  // Advanced Filter Parameters
  const [followerPreset, setFollowerPreset] = useState<string>('all');
  const [minEngagement, setMinEngagement] = useState<number>(0);
  const [minAuthenticity, setMinAuthenticity] = useState<number>(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'TikTok', 'YouTube']);

  // Interactive sorting states
  const [sortField, setSortField] = useState<SortField>('uss');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Interactive settings and logout modal state management
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  // Dynamic USS weighting configuration states
  const [weights, setWeights] = useState({
    engagement: 40,
    authenticity: 30,
    postsPerWeek: 20,
    reachScore: 10,
  });

  // Load favorites from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('upfluence_saved_lists');
      if (stored) {
        setSavedCreatorIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  }, []);

  useEffect(() => {
    async function loadCreators() {
      setLoading(true);
      try {
        const fetchIndustry = activeIndustry === 'Favorites' ? 'Beauty' : activeIndustry;
        const res = await fetch(`/api/creators?industry=${fetchIndustry}`);
        const data = await res.json();
        setCreators(data.creators ?? []);
        setDataSource(data.source ?? 'live');
      } catch (err) {
        console.error('Failed to load creators:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCreators();
  }, [activeIndustry]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleSelectCreator = (id: string) => {
    setSelectedCreatorIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCreatorIds.length === filteredCreators.length) {
      setSelectedCreatorIds([]);
    } else {
      setSelectedCreatorIds(filteredCreators.map(c => c.id));
    }
  };

  const toggleSaveCreator = (id: string) => {
    setSavedCreatorIds(prev => {
      const next = prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id];
      localStorage.setItem('upfluence_saved_lists', JSON.stringify(next));
      return next;
    });
  };

  const clearAdvancedFilters = () => {
    setFollowerPreset('all');
    setMinEngagement(0);
    setMinAuthenticity(0);
    setSelectedPlatforms(['Instagram', 'TikTok', 'YouTube']);
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  // Helper calculating relative percentile standing against loaded industry pool
  const getCohortPercentile = (field: 'followers' | 'engagementRate' | 'authenticity' | 'postsPerWeek' | 'uss', value: number): number => {
    if (creators.length === 0) return 0;
    const allValues = creators.map(c => c[field] || 0);
    const belowCount = allValues.filter(val => val < value).length;
    return Math.round((belowCount / creators.length) * 100);
  };

  const handleEverPresentCompare = () => {
    if (selectedCreatorIds.length < 2) {
      setShowComparisonNotification(true);
      setTimeout(() => setShowComparisonNotification(false), 6000);
    } else {
      setShowCompareModal(true);
    }
  };

  const exportCSV = () => {
    const listToExport = filteredCreators.filter(c => selectedCreatorIds.length === 0 || selectedCreatorIds.includes(c.id));
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Handle,Platform,Followers,Engagement,Authenticity,USS Score",
         ...listToExport.map(c => `"${c.name}","${c.handle}","${c.platform}",${c.followers},${c.engagementRate}%,${c.authenticity}%,${c.uss}`)
        ].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `influencer_pulse_${activeIndustry.toLowerCase()}_creators.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFollowers = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return String(num);
  };

  // Perform dynamic real-time local USS recalculations and apply global filter sorts
  const computedCreators = creators.map(c => {
    const recalculatedUss = Math.round(
      (weights.engagement / 100) * c.engagementRate +
      (weights.authenticity / 100) * c.authenticity +
      (weights.postsPerWeek / 100) * c.postsPerWeek +
      (weights.reachScore / 100) * c.reachScore
    );

    return {
      ...c,
      uss: recalculatedUss
    };
  }).sort((a, b) => {
    const factor = sortOrder === 'asc' ? 1 : -1;
    return (a[sortField] - b[sortField]) * factor;
  });

  const filteredCreators = computedCreators.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.handle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeIndustry === 'Favorites') {
      if (!savedCreatorIds.includes(c.id)) return false;
    }

    if (!selectedPlatforms.includes(c.platform)) return false;

    if (c.engagementRate < minEngagement) return false;

    if (c.authenticity < minAuthenticity) return false;

    if (followerPreset === 'micro' && c.followers >= 100000) return false;
    if (followerPreset === 'mid' && (c.followers < 100000 || c.followers > 500000)) return false;
    if (followerPreset === 'macro' && (c.followers < 500000 || c.followers > 1000000)) return false;
    if (followerPreset === 'mega' && c.followers < 1000000) return false;

    return true;
  });

  const activeInsight = activeIndustry !== 'Favorites' ? STRATEGIC_INSIGHTS[activeIndustry as Exclude<Industry, 'Favorites'>] : null;

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  };

  const resetWeights = () => {
    setWeights({
      engagement: 40,
      authenticity: 30,
      postsPerWeek: 20,
      reachScore: 10,
    });
  };

  const executeLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      setSelectedCreatorIds([]);
      setSearchQuery('');
      setActiveIndustry('Beauty');
    }, 1500);
  };

  const executeCreatorBooking = () => {
    setShowBookingSuccess(true);
    setTimeout(() => {
      setShowBookingSuccess(false);
    }, 4000);
  };

  // Extract selected creators for Comparison Drawer
  const compareCreators = creators
    .map(c => ({
      ...c,
      uss: Math.round(
        (weights.engagement / 100) * c.engagementRate +
        (weights.authenticity / 100) * c.authenticity +
        (weights.postsPerWeek / 100) * c.postsPerWeek +
        (weights.reachScore / 100) * c.reachScore
      )
    }))
    .filter(c => selectedCreatorIds.includes(c.id));

  // Determine winners among all selected compare creators
  const maxCompareUss = compareCreators.length > 0 ? Math.max(...compareCreators.map(c => c.uss)) : 0;
  const maxCompareFollowers = compareCreators.length > 0 ? Math.max(...compareCreators.map(c => c.followers)) : 0;
  const maxCompareEngagement = compareCreators.length > 0 ? Math.max(...compareCreators.map(c => c.engagementRate)) : 0;
  const maxCompareAuthenticity = compareCreators.length > 0 ? Math.max(...compareCreators.map(c => c.authenticity)) : 0;

  return (
    <div className="bg-[#ffffff] min-h-screen text-[#0f172a] font-sans antialiased pb-20 relative">
      
      {/* HEADER BAR with restored native asset file path */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden">
              <img 
                src="/upfluence-logo.png" 
                alt="Upfluence Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none text-slate-900">Upfluence</h1>
              <p className="text-xs text-slate-500 font-semibold tracking-wider mt-1 uppercase">Influencer Pulse</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 ${
              dataSource === 'sandbox_limit_exhausted' || dataSource === 'mock'
                ? 'bg-amber-550 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                dataSource === 'sandbox_limit_exhausted' || dataSource === 'mock' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-550 animate-pulse'
              }`} />
              {dataSource === 'sandbox_limit_exhausted' || dataSource === 'mock' ? 'Cached Dataset' : 'Live Gateway Active'}
            </span>
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-[#1610e6] transition-all duration-200 hover:border-[#1610e6] hover:bg-slate-50 shadow-sm"
              title="System Engine Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowLogoutModal(true)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 shadow-sm"
              title="Disconnect Session"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* HERO TITLE */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Influencer ROI Vetting</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl font-medium">
            Analyze top creators across industries using the Upfluence Synergy Score
          </p>
        </div>

        {/* INDUSTRY PILLS NAVIGATION */}
        <div className="flex flex-wrap gap-2 mb-8">
          {INDUSTRIES.map(ind => {
            const Icon = ind.icon;
            const isActive = activeIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveIndustry(ind.id);
                  setSelectedCreatorIds([]);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                  isActive 
                    ? 'bg-[#1610e6] text-white shadow-lg shadow-[#1610e6]/30 border-[#1610e6]' 
                    : 'bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-slate-200 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                {ind.label}
              </button>
            );
          })}

          {/* Saved Lists Favorites Tab */}
          <button
            onClick={() => {
              setActiveIndustry('Favorites');
              setSelectedCreatorIds([]);
            }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
              activeIndustry === 'Favorites'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border-rose-600'
                : 'bg-white text-slate-500 hover:text-rose-600 hover:bg-slate-50 border-slate-200 shadow-sm'
            }`}
          >
            <Heart className={`w-4 h-4 ${activeIndustry === 'Favorites' ? 'fill-current' : 'text-rose-500'}`} />
            Saved Lists ({savedCreatorIds.length})
          </button>
        </div>

        {/* STRATEGIC INSIGHT GUIDE CARD */}
        {activeInsight ? (
          <div className="bg-[#1610e6]/5 rounded-2xl border border-[#1610e6]/10 p-6 mb-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1610e6]/5 rounded-full blur-3xl -z-10" />
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1610e6]/10 border border-[#1610e6]/20 flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-[#1610e6]" />
              </div>
              <div className="w-full">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1610e6] mb-1">Strategic Insight Guide</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium max-w-4xl">{activeInsight.guide}</p>
                
                {/* Inside Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg Engagement</p>
                      <p className="text-lg font-black text-slate-900 mt-1">{activeInsight.engagement}</p>
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-500 bg-emerald-50 p-1 rounded" />
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Avg CPM</p>
                      <p className="text-lg font-black text-slate-900 mt-1">{activeInsight.cpm}</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-amber-500 bg-amber-50 p-1 rounded" />
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Peak Season</p>
                      <p className="text-lg font-black text-slate-900 mt-1 text-sm md:text-base">{activeInsight.peakSeason}</p>
                    </div>
                    <Calendar className="w-5 h-5 text-cyan-600 bg-cyan-50 p-1 rounded" />
                  </div>
                </div>

                {/* Collapsible Advice tips block */}
                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  <button 
                    onClick={() => setIsTipsExpanded(!isTipsExpanded)}
                    className="flex items-center gap-2 text-xs font-bold text-[#1610e6] hover:text-[#1610e6]/80 transition"
                  >
                    {isTipsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {isTipsExpanded ? 'Hide Actionable Tips' : 'View Actionable Tips'}
                  </button>

                  {isTipsExpanded && (
                    <ul className="mt-4 space-y-2">
                      {activeInsight.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed font-medium">
                          <span className="text-[#1610e6] font-bold">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-6 mb-8 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-900">Custom Campaign Bookmarks</h3>
                <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                  Displaying your curated favorites across all available creator rosters. Use the heart icons inside candidate cards to add or remove items from this list dynamically.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SEARCH BAR, ADVANCED FILTERS TOGGLE, EXPORT INTERACTION */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto items-stretch">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#1610e6] focus:ring-1 focus:ring-[#1610e6] transition shadow-sm"
              />
            </div>

            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                showAdvancedFilters || followerPreset !== 'all' || minEngagement > 0 || minAuthenticity > 0 || selectedPlatforms.length < 3
                  ? 'bg-[#1610e6]/10 text-[#1610e6] border-[#1610e6]' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Ever-present Comparison Button */}
            <button
              onClick={handleEverPresentCompare}
              className="flex-1 sm:flex-initial flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-200 transition-all justify-center shadow-sm animate-fade-in"
              title="Click here to trigger side-by-side comparative analysis of selected accounts"
            >
              <GitCompare className="w-4 h-4 text-[#1610e6]" />
              Compare
            </button>

            <button 
              onClick={exportCSV}
              className="flex-1 sm:flex-initial flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm border border-slate-200 transition-all justify-center shadow-sm"
            >
              <Download className="w-4 h-4 text-[#1610e6]" />
              Export Report
            </button>
          </div>
        </div>

        {/* NOTIFICATION OVERLAY (For when ever-present compare has < 2 selected) */}
        {showComparisonNotification && (
          <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
            <Info className="w-5 h-5 shrink-0 text-amber-600" />
            <div className="text-xs font-semibold">
              To launch the comparative analyzer, please select <strong>2 or more creators</strong> using the candidate list checkboxes below.
            </div>
            <button onClick={() => setShowComparisonNotification(false)} className="ml-auto text-amber-500 hover:text-amber-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* EXPANDABLE ADVANCED FILTERS PANEL */}
        {showAdvancedFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 shadow-inner grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top duration-200">
            {/* Follower Range Presets */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Reach Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Range' },
                  { id: 'micro', label: 'Micro (<100K)' },
                  { id: 'mid', label: 'Mid (100K-500K)' },
                  { id: 'macro', label: 'Macro (500K-1M)' },
                  { id: 'mega', label: 'Mega (1M+)' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setFollowerPreset(p.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border text-left transition ${
                      followerPreset === p.id
                        ? 'bg-[#1610e6] text-white border-[#1610e6]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement Rate Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Min Engagement</label>
                <span className="text-xs font-bold text-[#1610e6] bg-[#1610e6]/5 px-2 py-0.5 rounded">{minEngagement}%+</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minEngagement}
                onChange={(e) => setMinEngagement(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0%</span>
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>

            {/* Authenticity Minimum Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Min Authenticity</label>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{minAuthenticity}%+</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minAuthenticity}
                onChange={(e) => setMinAuthenticity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Platform Selection Checklist */}
            <div className="space-y-3 flex flex-col justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Publishing Channels</label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram', 'TikTok', 'YouTube'].map(p => {
                    const isSelected = selectedPlatforms.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                          isSelected
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clear Filter Triggers */}
              <button
                onClick={clearAdvancedFilters}
                className="w-full text-center py-2 text-xs font-extrabold text-[#1610e6] hover:text-[#1610e6]/80 transition flex items-center justify-center gap-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Advanced Filters
              </button>
            </div>
          </div>
        )}

        {/* TOP 10 CREATORS DECOUPLED HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Top 10 Creators</h3>
            <p className="text-xs text-slate-500 mt-1 font-semibold">
              Ranked by {sortField === 'uss' ? 'Upfluence Synergy Score (USS)' : `${sortField.replace(/^\w/, (c) => c.toUpperCase())} (${sortOrder.toUpperCase()})`}
            </p>
          </div>
          
          <button 
            onClick={toggleSelectAll}
            className="text-xs font-extrabold text-[#1610e6] hover:text-[#1610e6]/80 transition"
          >
            {selectedCreatorIds.length === filteredCreators.length ? 'Deselect All' : 'Select All on Page'}
          </button>
        </div>

        {/* INTERACTIVE DATA SORT FILTER CHIPS ROW */}
        <div className="flex flex-wrap items-center gap-2 mb-4 bg-slate-50 border border-slate-200 p-3 rounded-xl shadow-sm text-xs">
          <span className="font-bold text-slate-500 mr-2 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#1610e6]" /> Sort Layout By:
          </span>
          
          <button
            onClick={() => handleSort('uss')}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              sortField === 'uss' 
                ? 'bg-[#1610e6] text-white border-[#1610e6]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Core USS Score {sortField === 'uss' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => handleSort('followers')}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              sortField === 'followers' 
                ? 'bg-[#1610e6] text-white border-[#1610e6]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Followers {sortField === 'followers' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => handleSort('engagementRate')}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              sortField === 'engagementRate' 
                ? 'bg-[#1610e6] text-white border-[#1610e6]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Engagement {sortField === 'engagementRate' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => handleSort('authenticity')}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              sortField === 'authenticity' 
                ? 'bg-[#1610e6] text-white border-[#1610e6]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Authenticity {sortField === 'authenticity' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>

          <button
            onClick={() => handleSort('postsPerWeek')}
            className={`px-3 py-1.5 rounded-lg font-bold border transition ${
              sortField === 'postsPerWeek' 
                ? 'bg-[#1610e6] text-white border-[#1610e6]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Posts/Week {sortField === 'postsPerWeek' && (sortOrder === 'desc' ? '↓' : '↑')}
          </button>
        </div>

        {/* LIST CONTAINER WRAPPING FLOATING SEPARATED ROW CARDS */}
        {loading ? (
          <div className="bg-[#1610e6]/5 rounded-2xl border border-[#1610e6]/10 p-12 text-center text-slate-400 space-y-4 shadow-sm">
            <div className="w-10 h-10 border-4 border-t-[#1610e6] border-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium">Fetching real-time candidates from Upfluence Matches...</p>
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="bg-[#1610e6]/5 rounded-2xl border border-[#1610e6]/10 p-12 text-center text-slate-400 shadow-sm">
            <p className="text-sm font-medium">No vetting profiles found matching your query criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCreators.map((creator, index) => {
              const isSelected = selectedCreatorIds.includes(creator.id);
              const isSaved = savedCreatorIds.includes(creator.id);
              const isInstagram = creator.platform?.toLowerCase() === 'instagram';
              const isTikTok = creator.platform?.toLowerCase() === 'tiktok';

              // USS Ring color determination matching image specification
              let scoreColor = '#1610e6'; // Blue default
              if (creator.uss >= 90) {
                scoreColor = '#10b981'; // Emerald
              } else if (creator.uss >= 70 && creator.uss < 80) {
                scoreColor = '#f59e0b'; // Amber
              } else if (creator.uss < 70) {
                scoreColor = '#f43f5e'; // Rose
              }
              
              return (
                <div 
                  key={creator.id}
                  onClick={() => setActiveCreatorDetail(creator)}
                  className={`flex flex-col lg:flex-row lg:items-center justify-between p-5 gap-6 border rounded-xl hover:bg-[#1610e6]/10 cursor-pointer transition-all duration-300 shadow-sm ${
                    isSelected 
                      ? 'bg-[#1610e6]/10 border-[#1610e6]/30' 
                      : 'bg-[#1610e6]/5 border-[#1610e6]/10'
                  }`}
                >
                  
                  {/* Left Side: Checkbox + Rank + Avatar + Name Details */}
                  <div className="flex items-center gap-4 shrink-0">
                    
                    {/* Clean Styled Light Theme Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => toggleSelectCreator(creator.id)}
                      className="w-5 h-5 rounded border-[#1610e6]/20 bg-white text-[#1610e6] focus:ring-0 focus:ring-offset-0 cursor-pointer transition-all duration-200"
                    />
                    
                    {/* Rank Index */}
                    <span className="text-sm font-bold text-slate-400 w-4 text-center">
                      {index + 1}
                    </span>

                    {/* Avatar with Halo Indicator */}
                    <div className="relative">
                      <img 
                        src={creator.avatar} 
                        alt={creator.name}
                        className="w-12 h-12 rounded-full border border-[#1610e6]/20 object-cover bg-white"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    {/* Creator Identifiers & Platform Badges */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 leading-snug text-base">{creator.name}</h4>
                        {/* Interactive Save/Heart Icon (High Contrast Slate-500 Darker Shade) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveCreator(creator.id);
                          }}
                          className="text-slate-505 hover:text-rose-500 text-slate-500 transition-colors p-0.5"
                          title={isSaved ? 'Remove from Saved Lists' : 'Add to Saved Lists'}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-current' : 'stroke-current'}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-slate-500 font-bold">{creator.handle}</span>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-black ${
                          isInstagram 
                            ? 'bg-pink-50 text-pink-600 border border-pink-100' 
                            : isTikTok 
                              ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' 
                              : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {creator.platform}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Side: Analytical Columns Grid with Informational Metric Tooltips (UX Feature B) */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 w-full lg:w-auto" onClick={(e) => e.stopPropagation()}>
                    
                    {/* Core Metrics Block */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-600 w-full sm:w-auto">
                      
                      {/* Metric 1: Followers with hover tooltip */}
                      <div className="flex items-center gap-2 relative group cursor-help">
                        <Users className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Followers</p>
                          <p className="text-sm font-extrabold text-slate-800 mt-1">{formatFollowers(creator.followers)}</p>
                        </div>
                        {/* Hover Information Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-60 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100">
                          <p className="font-extrabold border-b border-slate-700 pb-1 mb-1 text-slate-200">Gross Followers</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Measures:</strong> {METRIC_TOOLTIPS_DATA.followers.measures}</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Why it matters:</strong> {METRIC_TOOLTIPS_DATA.followers.matters}</p>
                          <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Industry Avg: {METRIC_TOOLTIPS_DATA.followers.average}</span>
                            <span>Percentile: {getCohortPercentile('followers', creator.followers)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Metric 2: Engagement (Color Highlighted) with hover tooltip */}
                      <div className="flex items-center gap-2 relative group cursor-help">
                        <Zap className="w-4 h-4 text-[#f59e0b]" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Engage</p>
                          <p className="text-sm font-extrabold text-[#f59e0b] mt-1">{creator.engagementRate}%</p>
                        </div>
                        {/* Hover Information Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-60 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100">
                          <p className="font-extrabold border-b border-slate-700 pb-1 mb-1 text-slate-200">Engagement Rate</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Measures:</strong> {METRIC_TOOLTIPS_DATA.engagement.measures}</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Why it matters:</strong> {METRIC_TOOLTIPS_DATA.engagement.matters}</p>
                          <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Industry Avg: {METRIC_TOOLTIPS_DATA.engagement.average}</span>
                            <span>Percentile: {getCohortPercentile('engagementRate', creator.engagementRate)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Metric 3: Authenticity (Color Highlighted) with hover tooltip */}
                      <div className="flex items-center gap-2 relative group cursor-help">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Auth</p>
                          <p className="text-sm font-extrabold text-[#10b981] mt-1">{creator.authenticity}%</p>
                        </div>
                        {/* Hover Information Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-60 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100">
                          <p className="font-extrabold border-b border-slate-700 pb-1 mb-1 text-slate-200">Account Authenticity</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Measures:</strong> {METRIC_TOOLTIPS_DATA.authenticity.measures}</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Why it matters:</strong> {METRIC_TOOLTIPS_DATA.authenticity.matters}</p>
                          <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Industry Avg: {METRIC_TOOLTIPS_DATA.authenticity.average}</span>
                            <span>Percentile: {getCohortPercentile('authenticity', creator.authenticity)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Metric 4: Frequency (Color Highlighted) with hover tooltip */}
                      <div className="flex items-center gap-2 relative group cursor-help">
                        <Clock className="w-4 h-4 text-[#38bdf8]" />
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Posts/wk</p>
                          <p className="text-sm font-extrabold text-[#0284c7] mt-1">{creator.postsPerWeek}</p>
                        </div>
                        {/* Hover Information Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-60 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100">
                          <p className="font-extrabold border-b border-slate-700 pb-1 mb-1 text-slate-200">Posting Frequency</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Measures:</strong> {METRIC_TOOLTIPS_DATA.postsPerWeek.measures}</p>
                          <p className="text-slate-300 leading-normal mb-1"><strong>Why it matters:</strong> {METRIC_TOOLTIPS_DATA.postsPerWeek.matters}</p>
                          <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Industry Avg: {METRIC_TOOLTIPS_DATA.postsPerWeek.average}</span>
                            <span>Percentile: {getCohortPercentile('postsPerWeek', creator.postsPerWeek)}%</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Synergy Score Radial Ring (USS) - Color Dynamic with hover tooltip */}
                    <div className="flex items-center justify-center shrink-0 ml-4 relative group cursor-help">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="absolute w-full h-full transform -rotate-90">
                          <circle 
                            cx="24" 
                            cy="24" 
                            r="19" 
                            stroke="rgba(22, 16, 230, 0.08)" 
                            strokeWidth="2.5" 
                            fill="transparent" 
                          />
                          <circle 
                            cx="24" 
                            cy="24" 
                            r="19" 
                            stroke={scoreColor} 
                            strokeWidth="2.5" 
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 19}`}
                            strokeDashoffset={`${2 * Math.PI * 19 * (1 - creator.uss / 100)}`}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-out"
                          />
                        </svg>
                        <span className="text-xs font-black tracking-tight text-slate-800">{creator.uss}</span>
                      </div>
                      {/* USS Informational Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block w-60 bg-slate-900 text-white text-[11px] p-3 rounded-xl shadow-xl z-50 pointer-events-none transition-all animate-in fade-in zoom-in-95 duration-100">
                        <p className="font-extrabold border-b border-slate-700 pb-1 mb-1 text-slate-200">Upfluence Synergy Score</p>
                        <p className="text-slate-300 leading-normal mb-1"><strong>Measures:</strong> {METRIC_TOOLTIPS_DATA.uss.measures}</p>
                        <p className="text-slate-300 leading-normal mb-1"><strong>Why it matters:</strong> {METRIC_TOOLTIPS_DATA.uss.matters}</p>
                        <div className="mt-2 pt-1 border-t border-slate-700 flex justify-between text-[9px] text-slate-400 font-bold">
                          <span>Industry Avg: {METRIC_TOOLTIPS_DATA.uss.average}</span>
                          <span>Percentile: {getCohortPercentile('uss', creator.uss)}%</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* FLOATING ACTION COMPARISON BAR TRIGGER (Support 2 or more selected) */}
      {selectedCreatorIds.length >= 2 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl rounded-full px-6 py-4 flex items-center gap-4 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-[#1610e6]" />
            <span className="text-xs font-bold text-slate-700">
              {selectedCreatorIds.length} creators selected for comparison
            </span>
          </div>
          <button
            onClick={() => setShowCompareModal(true)}
            className="bg-[#1610e6] hover:bg-[#1610e6]/90 text-white font-bold text-xs px-4 py-2 rounded-full transition shadow-md shadow-[#1610e6]/25"
          >
            Compare Side-by-Side
          </button>
        </div>
      )}

      {/* DETAILED CREATOR PROFILE MODAL (UX Feature A) */}
      {activeCreatorDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[120] overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 animate-in zoom-in-95 duration-200 text-[#0f172a]">
            {/* Header / Cover decoration */}
            <div className="bg-[#1610e6]/5 h-32 relative flex items-end p-6 border-b border-slate-100">
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => toggleSaveCreator(activeCreatorDetail.id)}
                  className="p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${savedCreatorIds.includes(activeCreatorDetail.id) ? 'text-rose-500 fill-current' : 'stroke-current'}`} />
                </button>
                <button 
                  onClick={() => setActiveCreatorDetail(null)}
                  className="p-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Creator Intro Section */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={activeCreatorDetail.avatar} 
                    alt={activeCreatorDetail.name} 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-slate-50 -mt-10"
                  />
                  <div>
                    <h3 className="text-lg font-bold tracking-tight leading-none text-slate-900">{activeCreatorDetail.name}</h3>
                    <p className="text-xs text-slate-500 font-bold mt-1.5">{activeCreatorDetail.handle}</p>
                    <span className="inline-block text-[10px] tracking-wider uppercase font-black px-2 py-0.5 mt-2 bg-slate-100 rounded text-slate-600">{activeCreatorDetail.platform}</span>
                  </div>
                </div>

                <button 
                  onClick={executeCreatorBooking}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#1610e6] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#1610e6]/25 hover:bg-[#1610e6]/90 transition"
                >
                  Book This Creator
                </button>
              </div>

              {/* Booking success notification banner inside modal */}
              {showBookingSuccess && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 flex items-center gap-2 animate-in slide-in-from-top duration-300">
                  <Check className="w-4 h-4 text-emerald-600 bg-emerald-100 p-0.5 rounded-full" />
                  <span className="text-xs font-bold">Vetting Reservation Initiated! Upfluence campaign managers are preparing your briefs for {activeCreatorDetail.name}.</span>
                </div>
              )}

              {/* Core Analytics Grid Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Synergy Score</p>
                  <p className="text-xl font-black text-[#1610e6] mt-1">{activeCreatorDetail.uss}</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Followers</p>
                  <p className="text-xl font-black text-slate-800 mt-1">{formatFollowers(activeCreatorDetail.followers)}</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Engagement</p>
                  <p className="text-xl font-black text-[#f59e0b] mt-1">{activeCreatorDetail.engagementRate}%</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center shadow-sm">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Authenticity</p>
                  <p className="text-xl font-black text-emerald-600 mt-1">{activeCreatorDetail.authenticity}%</p>
                </div>
              </div>

              {/* Secondary Details split column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                {/* Left Side: Bio & Sponsor Highlights */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Bio</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                      {CREATOR_DETAILS_SHEET.bio} Custom matching metrics derived dynamically via the Upfluence Synergy system.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Recent Sponsors</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {CREATOR_DETAILS_SHEET.sponsors.map(sponsor => (
                        <span key={sponsor} className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md">
                          {sponsor}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Growth Trend (Line SVG graph representation) */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Growth Trend (Last 30 Days)</h4>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <TrendingUp className="w-4 h-4 text-emerald-500 bg-emerald-50 p-0.5 rounded" />
                        <span>+6.2% Subscriber Growth</span>
                      </div>
                      {/* Simple custom SVG Sparkline chart representing growth trend */}
                      <svg className="w-24 h-8 text-emerald-500 stroke-current stroke-2 fill-none">
                        <path d="M 0 25 Q 10 15, 20 20 T 40 10 T 60 18 T 80 5 T 100 2" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Side: Audience Breakdown */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Audience Profile</h4>
                  
                  {/* Demographics Bar Breakdown (Age) */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Age Distribution</p>
                    <div className="space-y-1.5">
                      {Object.entries({ '18-24': '42%', '25-34': '38%', '35+': '20%' }).map(([age, pct]) => (
                        <div key={age} className="text-xs">
                          <div className="flex justify-between font-semibold text-slate-700 text-[10px] mb-0.5">
                            <span>{age} years</span>
                            <span>{pct}</span>
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#1610e6] rounded-full" style={{ width: pct }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender Split Pie/Row */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/50">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none">Gender Segment</p>
                    <div className="flex gap-4 text-xs font-bold text-slate-700">
                      <div>👩 Female <span className="text-[#1610e6] font-black">54%</span></div>
                      <div>👨 Male <span className="text-slate-500 font-black">38%</span></div>
                      <div>🌈 Non-Binary <span className="text-slate-500 font-black">8%</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Content Showcase */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">Recent Engagement Samples</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CREATOR_DETAILS_SHEET.posts.map((post, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex shadow-sm">
                      <img src={post.image} alt="" className="w-20 h-24 object-cover shrink-0" />
                      <div className="p-3 flex flex-col justify-between overflow-hidden">
                        <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed font-semibold italic">"{post.caption}"</p>
                        <div className="flex gap-3 text-[10px] text-slate-400 font-bold mt-2">
                          <span className="flex items-center gap-0.5 text-rose-500">❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setActiveCreatorDetail(null)}
                className="px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDE-BY-SIDE COMPARISON MODAL (Dynamic Grid mapping for any number of selected items) */}
      {showComparisonModal && compareCreators.length >= 2 && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[110] overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl my-8 animate-in zoom-in-95 duration-200 text-[#0f172a]">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-[#1610e6]" />
                <h3 className="text-lg font-extrabold">Creator Matchup Comparison</h3>
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Side-by-Side Deck */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className={`grid gap-6 border-b border-slate-100 pb-6 text-center ${
                compareCreators.length === 2 
                  ? 'grid-cols-2' 
                  : compareCreators.length === 3 
                    ? 'grid-cols-3' 
                    : 'grid-cols-2 md:grid-cols-4'
              }`}>
                {compareCreators.map((creator, i) => (
                  <div key={creator.id} className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-100 relative">
                    <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#1610e6] text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="relative w-16 h-16 mx-auto">
                      <img src={creator.avatar} alt="" className="w-full h-full rounded-full border-2 border-[#1610e6] object-cover bg-white" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm truncate">{creator.name}</h4>
                      <p className="text-xs text-slate-500 font-bold mt-0.5 truncate">{creator.handle}</p>
                      <span className="inline-block text-[10px] tracking-wider uppercase font-black px-2 py-0.5 mt-2 bg-white border border-slate-200 rounded text-slate-600">
                        {creator.platform}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparative Metrics Bars */}
              <div className="space-y-6">
                
                {/* 1. USS Synergy Score Matchup */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Upfluence Synergy Score (USS)</h5>
                  <div className="space-y-2">
                    {compareCreators.map(creator => {
                      const isWinner = creator.uss === maxCompareUss;
                      return (
                        <div key={creator.id} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold px-1">
                            <span className="text-slate-700 font-bold">{creator.name}</span>
                            <span className={isWinner ? 'text-emerald-600 font-black' : 'text-slate-500'}>
                              {creator.uss} USS {isWinner && '🏆'}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWinner ? 'bg-emerald-500' : 'bg-[#1610e6]'}`}
                              style={{ width: `${(creator.uss / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Followers Matchup */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Gross Followers</h5>
                  <div className="space-y-2">
                    {compareCreators.map(creator => {
                      const isWinner = creator.followers === maxCompareFollowers;
                      const maxPossibleFollowers = Math.max(...creators.map(c => c.followers), 1000000);
                      return (
                        <div key={creator.id} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700 px-1">
                            <span>{creator.name}</span>
                            <span className={isWinner ? 'text-emerald-600 font-black' : 'text-slate-500'}>
                              {formatFollowers(creator.followers)} {isWinner && '🏆'}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWinner ? 'bg-emerald-500' : 'bg-[#1610e6]'}`}
                              style={{ width: `${(creator.followers / maxPossibleFollowers) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Engagement Rate Matchup */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Audience Engagement</h5>
                  <div className="space-y-2">
                    {compareCreators.map(creator => {
                      const isWinner = creator.engagementRate === maxCompareEngagement;
                      return (
                        <div key={creator.id} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700 px-1">
                            <span>{creator.name}</span>
                            <span className={isWinner ? 'text-emerald-600 font-black' : 'text-slate-500'}>
                              {creator.engagementRate}% {isWinner && '🏆'}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWinner ? 'bg-emerald-500' : 'bg-[#1610e6]'}`}
                              style={{ width: `${(creator.engagementRate / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Authenticity Matchup */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Account Authenticity</h5>
                  <div className="space-y-2">
                    {compareCreators.map(creator => {
                      const isWinner = creator.authenticity === maxCompareAuthenticity;
                      return (
                        <div key={creator.id} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-700 px-1">
                            <span>{creator.name}</span>
                            <span className={isWinner ? 'text-emerald-600 font-black' : 'text-slate-500'}>
                              {creator.authenticity}% {isWinner && '🏆'}
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWinner ? 'bg-emerald-500' : 'bg-[#1610e6]'}`}
                              style={{ width: `${creator.authenticity}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => {
                  setShowCompareModal(false);
                  setSelectedCreatorIds([]);
                }}
                className="px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 transition"
              >
                Clear Vetting Selections
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SYSTEM ENGINE SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl shadow-slate-900/10 animate-in zoom-in-95 duration-200 text-slate-900">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#1610e6]" />
                <h3 className="text-lg font-extrabold">Formula Engine Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-900 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3 bg-[#1610e6]/5 border border-[#1610e6]/10 p-4 rounded-xl text-xs text-slate-700 leading-normal">
                <ShieldCheck className="w-5 h-5 text-[#1610e6] shrink-0" />
                <p>
                  Customize formula weighting parameters. Re-weighting immediately adjusts the <strong>USS (Upfluence Synergy Score)</strong> index values across active candidate grids.
                </p>
              </div>

              <div className="space-y-4">
                {/* Engagement Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Engagement Weight</span>
                    <span className="text-[#1610e6] font-bold">{weights.engagement}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={weights.engagement}
                    onChange={(e) => handleWeightChange('engagement', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
                  />
                </div>

                {/* Authenticity Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Authenticity Weight</span>
                    <span className="text-[#1610e6] font-bold">{weights.authenticity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={weights.authenticity}
                    onChange={(e) => handleWeightChange('authenticity', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
                  />
                </div>

                {/* Post Frequency Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Post Frequency Weight</span>
                    <span className="text-[#1610e6] font-bold">{weights.postsPerWeek}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={weights.postsPerWeek}
                    onChange={(e) => handleWeightChange('postsPerWeek', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
                  />
                </div>

                {/* Reach Score Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Reach Score Weight</span>
                    <span className="text-[#1610e6] font-bold">{weights.reachScore}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={weights.reachScore}
                    onChange={(e) => handleWeightChange('reachScore', Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#1610e6]"
                  />
                </div>
              </div>

              {/* Display Total Sum to check Calibration */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-semibold text-slate-500">Sum Validation (Recommended: 100%)</span>
                <span className={`font-black ${
                  weights.engagement + weights.authenticity + weights.postsPerWeek + weights.reachScore === 100 
                    ? 'text-emerald-600' 
                    : 'text-amber-600'
                }`}>
                  {weights.engagement + weights.authenticity + weights.postsPerWeek + weights.reachScore}%
                </span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <button 
                onClick={resetWeights}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#1610e6]" />
                Reset Defaults
              </button>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="px-5 py-2.5 rounded-lg bg-[#1610e6] hover:bg-[#1610e6]/90 text-xs font-bold text-white transition shadow-md shadow-[#1610e6]/20"
              >
                Apply Framework Weights
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCONNECT SESSION (LOG OUT) MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-sm w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-slate-900">
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-500">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Disconnect Campaign Session?</h3>
                <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                  Are you sure you want to log out? Doing so will clear the active cached analytics dashboard scope.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
              <button 
                disabled={isLoggingOut}
                onClick={executeLogout}
                className="w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-t-white border-transparent rounded-full animate-spin" />
                    Clearing Session Keys...
                  </>
                ) : (
                  'Confirm Disconnect'
                )}
              </button>
              <button 
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




