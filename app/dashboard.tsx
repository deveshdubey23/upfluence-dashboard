'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Users,
  Heart,
  ShieldCheck,
  CalendarDays,
  TrendingUp,
  Sparkles,
  Search,
  ArrowUpDown,
  Star,
  X,
  BarChart3,
  Activity,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from 'recharts';

type Industry = 'Beauty' | 'Fashion' | 'Fitness' | 'Food' | 'Gaming';

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

const INDUSTRIES: Industry[] = ['Beauty', 'Fashion', 'Fitness', 'Food', 'Gaming'];

const INDUSTRY_ACCENTS: Record<Industry, string> = {
  Beauty: 'from-pink-500/20 to-rose-500/10',
  Fashion: 'from-violet-500/20 to-indigo-500/10',
  Fitness: 'from-emerald-500/20 to-teal-500/10',
  Food: 'from-amber-500/20 to-orange-500/10',
  Gaming: 'from-cyan-500/20 to-blue-500/10',
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

function ussColor(uss: number): string {
  if (uss >= 45) return 'hsl(173 70% 50%)';
  if (uss >= 35) return 'hsl(190 80% 55%)';
  if (uss >= 25) return 'hsl(265 80% 65%)';
  return 'hsl(340 75% 60%)';
}

export default function Home() {
  const [industry, setIndustry] = useState<Industry>('Beauty');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<'live' | 'mock'>('mock');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Creator | null>(null);

  const fetchCreators = useCallback(async (ind: Industry) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/creators?industry=${ind}`);
      const data = await res.json();
      setCreators(data.creators ?? []);
      setSource(data.source ?? 'mock');
    } catch {
      setCreators([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCreators(industry);
  }, [industry, fetchCreators]);

  const filtered = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase())
  );

  const avgUss = creators.length
    ? (creators.reduce((s, c) => s + c.uss, 0) / creators.length).toFixed(1)
    : '0';
  const totalReach = creators.reduce((s, c) => s + c.followers, 0);
  const avgEngagement = creators.length
    ? (creators.reduce((s, c) => s + c.engagementRate, 0) / creators.length).toFixed(1)
    : '0';
  const avgAuthenticity = creators.length
    ? Math.round(creators.reduce((s, c) => s + c.authenticity, 0) / creators.length)
    : 0;

  const chartData = creators.slice(0, 10).map((c) => ({
    name: c.name.split(' ')[0],
    uss: c.uss,
    fill: ussColor(c.uss),
  }));

  return (
    <main className="min-h-screen text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-violet-500 shadow-lg shadow-teal-500/20">
              <Activity className="h-5 w-5 text-background" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">InfluencerPulse</h1>
              <p className="text-xs text-muted-foreground">ROI Vetting Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`gap-1.5 border-border/60 ${
                source === 'live' ? 'text-teal-400' : 'text-amber-400'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  source === 'live' ? 'bg-teal-400' : 'bg-amber-400'
                } animate-pulse`}
              />
              {source === 'live' ? 'Live Upfluence' : 'Mock Data'}
            </Badge>
            <Button variant="outline" size="sm" className="gap-2 border-border/60">
              <Sparkles className="h-4 w-4 text-teal-400" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Creator <span className="text-gradient">ROI Vetting</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Unified Scoring System (USS) ranks creators by engagement, authenticity, frequency, and reach.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Reach"
            value={formatNumber(totalReach)}
            sub="across vetted creators"
            accent="teal"
          />
          <StatCard
            icon={<Heart className="h-5 w-5" />}
            label="Avg Engagement"
            value={`${avgEngagement}%`}
            sub="weighted by audience"
            accent="violet"
          />
          <StatCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Avg Authenticity"
            value={`${avgAuthenticity}%`}
            sub="bot & fraud screened"
            accent="teal"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Avg USS Score"
            value={avgUss}
            sub="out of 100"
            accent="violet"
          />
        </div>

        {/* Industry tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setIndustry(ind)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  industry === ind
                    ? 'bg-gradient-to-r from-teal-500 to-violet-500 text-background shadow-lg shadow-teal-500/20'
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border/60 bg-card pl-9"
            />
          </div>
        </div>

        {/* USS chart */}
        <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-teal-400" />
            <h3 className="text-sm font-semibold">USS Distribution — Top 10 {industry} Creators</h3>
          </div>
          <div className="h-56 w-full">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: 'hsl(215 25% 65%)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'hsl(215 25% 65%)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'hsl(222 40% 9% / 0.5)' }}
                    contentStyle={{
                      background: 'hsl(222 40% 9%)',
                      border: '1px solid hsl(222 30% 16%)',
                      borderRadius: '0.75rem',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="uss" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Creator cards grid */}
        <div className="mt-6 flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Sorted by USS (descending) · Top 10 of {industry}
          </p>
        </div>

        {loading ? (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl border border-border/60 bg-card/40"
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((creator, idx) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                rank={idx + 1}
                onClick={() => setSelected(creator)}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted-foreground">
            No creators match your search.
          </div>
        )}
      </div>

      {/* Comparison drawer */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="border-border/60 bg-card/95 backdrop-blur-xl sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${INDUSTRY_ACCENTS[selected.industry]} text-lg font-bold`}
                  >
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <div>{selected.name}</div>
                    <SheetDescription className="text-xs">{selected.handle}</SheetDescription>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-secondary/40 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Unified Score</p>
                    <p className="text-3xl font-bold" style={{ color: ussColor(selected.uss) }}>
                      {selected.uss}
                    </p>
                  </div>
                  <Star className="h-8 w-8" style={{ color: ussColor(selected.uss) }} />
                </div>

                <MetricBar
                  icon={<Heart className="h-4 w-4" />}
                  label="Engagement Rate"
                  value={`${selected.engagementRate}%`}
                  pct={(selected.engagementRate / 10) * 100}
                />
                <MetricBar
                  icon={<ShieldCheck className="h-4 w-4" />}
                  label="Authenticity"
                  value={`${selected.authenticity}%`}
                  pct={selected.authenticity}
                />
                <MetricBar
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Posts / Week"
                  value={`${selected.postsPerWeek}`}
                  pct={(selected.postsPerWeek / 10) * 100}
                />
                <MetricBar
                  icon={<Users className="h-4 w-4" />}
                  label="Reach Score"
                  value={`${selected.reachScore}`}
                  pct={selected.reachScore}
                />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Followers</p>
                    <p className="text-lg font-semibold">{formatNumber(selected.followers)}</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="text-lg font-semibold">{selected.platform}</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-teal-500 to-violet-500 text-background">
                  Add to Campaign
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: 'teal' | 'violet';
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-border">
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-80 ${
          accent === 'teal' ? 'bg-teal-500/20' : 'bg-violet-500/20'
        }`}
      />
      <div className="relative">
        <div
          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
            accent === 'teal'
              ? 'bg-teal-500/10 text-teal-400'
              : 'bg-violet-500/10 text-violet-400'
          }`}
        >
          {icon}
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function CreatorCard({
  creator,
  rank,
  onClick,
}: {
  creator: Creator;
  rank: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 text-left backdrop-blur-sm transition-all hover:border-teal-500/40 hover:bg-card/80"
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${INDUSTRY_ACCENTS[creator.industry]} opacity-60`}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${INDUSTRY_ACCENTS[creator.industry]} text-lg font-bold`}
            >
              {creator.name.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background text-[10px] font-bold text-teal-400 ring-1 ring-border">
              {rank}
            </span>
          </div>
          <div>
            <p className="font-semibold leading-tight">{creator.name}</p>
            <p className="text-xs text-muted-foreground">{creator.handle}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">USS</p>
          <p className="text-xl font-bold" style={{ color: ussColor(creator.uss) }}>
            {creator.uss}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <Metric icon={<Users className="h-3.5 w-3.5" />} label="Followers" value={formatNumber(creator.followers)} />
        <Metric icon={<Heart className="h-3.5 w-3.5" />} label="Engagement" value={`${creator.engagementRate}%`} />
        <Metric icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Authenticity" value={`${creator.authenticity}%`} />
        <Metric icon={<CalendarDays className="h-3.5 w-3.5" />} label="Posts/wk" value={`${creator.postsPerWeek}`} />
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>USS Breakdown</span>
          <span>{creator.uss}/100</span>
        </div>
        <Progress value={creator.uss} className="h-1.5" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Badge variant="outline" className="border-border/60 text-[10px] text-muted-foreground">
          {creator.platform}
        </Badge>
        <span className="text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          View profile →
        </span>
      </div>
    </button>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/40 px-2.5 py-2">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-[10px] text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function MetricBar({
  icon,
  label,
  value,
  pct,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  pct: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          {icon}
          {label}
        </span>
        <span className="font-semibold">{value}</span>
      </div>
      <Progress value={pct} className="h-2" />
    </div>
  );
}
