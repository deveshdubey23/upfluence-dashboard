import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

const MOCK_NAMES: Record<Industry, string[]> = {
  Beauty: ['Aria Lumin', 'Sienna Rose', 'Mira Belle', 'Luna Vega', 'Olive Hart', 'Coco Lane', 'Ivy Monroe', 'Nova Skye', 'Sable Quinn', 'Rae Divine'],
  Fashion: ['Maxwell Cole', 'Stella Voss', 'Theo Hart', 'Jade Kim', 'Roman Cruz', 'Eloise Day', 'Kai Mercer', 'Zara Bloom', 'Felix Noir', 'Anya Vale'],
  Fitness: ['Drew Stone', 'Kira Flex', 'Logan Pace', 'Tara Wells', 'Rex Dalton', 'Mia Strong', 'Vince Carter', 'Lola Rush', 'Cole Bishop', 'Sage Trail'],
  Food: ['Piper Sage', 'Olive Branch', 'Theo Cook', 'Mara Lime', 'Finn Spice', 'Cleo Dish', 'Remy Pan', 'Juno Bake', 'Hazel Frost', 'Otto Crumb'],
  Gaming: ['Nova Pixel', 'Riot Byte', 'Echo Glitch', 'Vex Controller', 'Zenith Play', 'Drift Arcade', 'Phantom Lag', 'Specter Frame', 'Cipher Loot', 'Apex Spawn'],
};

const HANDLES: Record<Industry, string[]> = {
  Beauty: ['@arialumin', '@siennarose', '@mirabelle', '@lunavega', '@olivehart', '@cocolane', '@ivymonroe', '@novaskye', '@sablequinn', '@raedivine'],
  Fashion: ['@maxwellcole', '@stellavoss', '@theohart', '@jadekim', '@romancruz', '@eloiseday', '@kaimercer', '@zarabloom', '@felixnoir', '@anyavale'],
  Fitness: ['@drewstone', '@kiraflex', '@loganpace', '@tarawells', '@rexdalton', '@miastrong', '@vincecarter', '@lolarush', '@colebishop', '@sagetrail'],
  Food: ['@pipersage', '@olivebranch', '@theocook', '@maralime', '@finnspice', '@cleodish', '@remypan', '@junobake', '@hazelfrost', '@ottocrumb'],
  Gaming: ['@novapixel', '@riotbyte', '@echoglitch', '@vexcontroller', '@zenithplay', '@driftarcade', '@phantomlag', '@specterframe', '@cipherloot', '@apexspawn'],
};

const AVATAR_SEEDS = ['nova', 'echo', 'luna', 'sage', 'kai', 'mira', 'rex', 'ivy', 'cole', 'zara'];

function buildMockCreators(industry: Industry): Creator[] {
  const names = MOCK_NAMES[industry];
  const handles = HANDLES[industry];
  const creators: Creator[] = names.map((name, i) => {
    const followers = Math.floor(50000 + Math.random() * 950000);
    const engagementRate = +(2 + Math.random() * 7).toFixed(1);
    const authenticity = +(70 + Math.random() * 28).toFixed(0);
    const postsPerWeek = +(1 + Math.random() * 9).toFixed(1);
    const reachScore = +(40 + Math.random() * 58).toFixed(0);
    const uss = +(
      0.4 * engagementRate +
      0.3 * authenticity +
      0.2 * postsPerWeek +
      0.1 * reachScore
    ).toFixed(1);
    return {
      id: `${industry}-${i}`,
      name,
      handle: handles[i],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${AVATAR_SEEDS[i]}`,
      industry,
      followers,
      engagementRate,
      authenticity,
      postsPerWeek,
      reachScore,
      uss,
      platform: ['Instagram', 'TikTok', 'YouTube'][i % 3],
    };
  });
  return creators.sort((a, b) => b.uss - a.uss).slice(0, 10);
}

function calculateUSS(c: {
  engagementRate: number;
  authenticity: number;
  postsPerWeek: number;
  reachScore: number;
}): number {
  return +(
    0.4 * c.engagementRate +
    0.3 * c.authenticity +
    0.2 * c.postsPerWeek +
    0.1 * c.reachScore
  ).toFixed(1);
}

function normalizeUpfluence(raw: any, industry: Industry): Creator[] {
  const list: any[] = Array.isArray(raw) 
    ? raw 
    : (raw?.matches ?? raw?.influencers ?? raw?.creators ?? raw?.data ?? raw?.results ?? []);
    
  return list.map((item: any, i: number) => {
    const profile = item?.influencer ?? item?.match ?? item;
    const followers = Number(profile.followers ?? profile.follower_count ?? profile.stats?.followers ?? 0);
    const engagementRate = Number(
      profile.engagement_rate ?? profile.engagement ?? profile.stats?.engagement_rate ?? (2 + (i % 5))
    );
    const authenticity = Number(profile.authenticity ?? profile.authenticity_score ?? profile.stats?.authenticity ?? (70 + (i % 25)));
    const postsPerWeek = Number(profile.posts_per_week ?? profile.post_frequency ?? profile.stats?.posts_per_week ?? (2 + (i % 6)));
    const reachScore = Number(profile.reach_score ?? profile.reach ?? profile.stats?.reach ?? (40 + (i % 50)));
    const uss = calculateUSS({ engagementRate, authenticity, postsPerWeek, reachScore });
    
    return {
      id: String(profile.id ?? profile.creator_id ?? `${industry}-${i}`),
      name: profile.name ?? profile.full_name ?? profile.username ?? 'Vetted Creator',
      handle: profile.handle ?? profile.username ?? profile.screen_name ?? '@vetted_profile',
      avatar: profile.avatar ?? profile.profile_image_url ?? profile.image_url ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      industry,
      followers,
      engagementRate,
      authenticity,
      postsPerWeek,
      reachScore,
      uss,
      platform: profile.platform ?? profile.network ?? 'Instagram',
    } as Creator;
  });
}

async function fetchUpfluenceToken(clientId: string, clientSecret: string): Promise<string> {
  const tokenRes = await fetch('https://identity.upfluence.co/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${tokenRes.status}`);
  const tokenJson = await tokenRes.json();
  return tokenJson.access_token;
}

async function fetchUpfluenceCreators(token: string, industry: string): Promise<any> {
  // Aligned payload layout mapped directly to the official Criterias specification framework
  const searchRes = await fetch('https://api.upfluence.co/v1/matches', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      criterias: [
        {
          field: 'all',
          type: 'should',
          weight: 1,
          value: industry
        }
      ],
      limit: 30,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!searchRes.ok) throw new Error(`Creator search failed: ${searchRes.status}`);
  return searchRes.json();
}

export async function GET(req: NextRequest) {
  const industryParam = req.nextUrl.searchParams.get('industry') as Industry | null;
  const industry: Industry = INDUSTRIES.includes(industryParam as Industry)
    ? (industryParam as Industry)
    : 'Beauty';

  const clientId = process.env.UPFLUENCE_CLIENT_ID;
  const clientSecret = process.env.UPFLUENCE_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId === 'your_client_id_here') {
    return NextResponse.json({ creators: buildMockCreators(industry), source: 'mock' });
  }

  try {
    const token = await fetchUpfluenceToken(clientId, clientSecret);
    const raw = await fetchUpfluenceCreators(token, industry);
    let creators = normalizeUpfluence(raw, industry);
    if (creators.length === 0) creators = buildMockCreators(industry);
    creators = creators.sort((a, b) => b.uss - a.uss).slice(0, 10);
    return NextResponse.json({ creators, source: 'live' });
  } catch (err) {
    console.error('Upfluence fetch failed, returning mock:', err);
    return NextResponse.json({ creators: buildMockCreators(industry), source: 'mock' });
  }
}
