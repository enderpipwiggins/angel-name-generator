export type Tradition = 'hebrew' | 'christian' | 'islamic' | 'enochian' | 'all';
export type Domain =
  | 'celestial' | 'nature' | 'divine' | 'concepts'
  | 'geography' | 'time' | 'hidden' | 'war' | 'healing' | 'any';
export type SuffixFilter = 'el' | 'iel' | 'on' | 'il' | 'ail' | 'eel' | 'none' | 'any';

export interface AngelRoot {
  root: string;
  meaning: string;
}

export interface AngelSuffix {
  suffix: string;
  label: string;
  tradition: string;
  meaning: string;
}

export interface GeneratedAngel {
  name: string;
  root: string;
  meaning: string;
  domain: Domain;
  suffix: string;
  suffixMeaning: string;
  suffixTradition: string;
}

export interface GeneratorParams {
  tradition?: Tradition;
  domain?: Domain;
  suffixFilter?: SuffixFilter;
  count?: number;
}

// ── Root pools by domain ──────────────────────────────────────────────────────

const ROOTS: Record<Exclude<Domain, 'any'>, AngelRoot[]> = {
  celestial: [
    { root: 'Kokab',   meaning: 'star' },
    { root: 'Shams',   meaning: 'sun' },
    { root: 'Noga',    meaning: 'brightness' },
    { root: 'Levan',   meaning: 'moon' },
    { root: 'Bara',    meaning: 'lightning' },
    { root: 'Shehar',  meaning: 'dawn' },
    { root: 'Layla',   meaning: 'night' },
    { root: 'Shachar', meaning: 'morning star' },
    { root: 'Mazal',   meaning: 'constellation' },
    { root: 'Avar',    meaning: 'comet' },
  ],
  nature: [
    { root: 'Ram',    meaning: 'thunder' },
    { root: 'Araq',   meaning: 'earth' },
    { root: 'Ruach',  meaning: 'wind' },
    { root: 'Mayim',  meaning: 'waters' },
    { root: 'Gesh',   meaning: 'rain' },
    { root: 'Nur',    meaning: 'fire' },
    { root: 'Sadeh',  meaning: 'field' },
    { root: 'Yam',    meaning: 'sea' },
    { root: 'Har',    meaning: 'mountain' },
    { root: 'Aval',   meaning: 'river' },
  ],
  divine: [
    { root: 'Micha',  meaning: 'who is like God' },
    { root: 'Rapha',  meaning: 'healer' },
    { root: 'Uri',    meaning: 'light of God' },
    { root: 'Gabr',   meaning: 'strength of God' },
    { root: 'Azza',   meaning: 'divine power' },
    { root: 'Chesed', meaning: 'grace' },
    { root: 'Shalom', meaning: 'peace' },
    { root: 'Emun',   meaning: 'faithfulness' },
    { root: 'Tzedek', meaning: 'righteousness' },
    { root: 'Emet',   meaning: 'truth' },
  ],
  concepts: [
    { root: 'Tam',    meaning: 'perfection' },
    { root: 'Daan',   meaning: 'judgment' },
    { root: 'Zak',    meaning: 'purity' },
    { root: 'Binah',  meaning: 'understanding' },
    { root: 'Chokm',  meaning: 'wisdom' },
    { root: 'Kavod',  meaning: 'glory' },
    { root: 'Yesod',  meaning: 'foundation' },
    { root: 'Daath',  meaning: 'knowledge' },
    { root: 'Ratzon', meaning: 'will' },
  ],
  geography: [
    { root: 'Batar',  meaning: 'valley' },
    { root: 'Tur',    meaning: 'rock mountain' },
    { root: 'Carmel', meaning: 'garden' },
    { root: 'Hermon', meaning: 'sacred peak' },
    { root: 'Zion',   meaning: 'holy citadel' },
    { root: 'Arav',   meaning: 'desert' },
    { root: 'Golan',  meaning: 'highland' },
    { root: 'Negev',  meaning: 'dry land' },
  ],
  time: [
    { root: 'Yom',    meaning: 'day' },
    { root: 'Layl',   meaning: 'night' },
    { root: 'Erev',   meaning: 'twilight' },
    { root: 'Shavat', meaning: 'rest' },
    { root: 'Olam',   meaning: 'eternity' },
    { root: 'Kedem',  meaning: 'ancient' },
    { root: 'Achrit', meaning: 'last days' },
  ],
  hidden: [
    { root: 'Satar',  meaning: 'hidden' },
    { root: 'Raz',    meaning: 'secret' },
    { root: 'Nistar', meaning: 'concealed' },
    { root: 'Tzafan', meaning: 'veiled' },
    { root: 'Sod',    meaning: 'mystery' },
    { root: 'Tamun',  meaning: 'buried' },
  ],
  war: [
    { root: 'Gibbor', meaning: 'mighty warrior' },
    { root: 'Tzva',   meaning: 'host of heaven' },
    { root: 'Cherev', meaning: 'sword' },
    { root: 'Magen',  meaning: 'shield' },
    { root: 'Netzach',meaning: 'victory' },
    { root: 'Aluf',   meaning: 'champion' },
    { root: 'Gavri',  meaning: 'divine strength' },
    { root: 'Ezuz',   meaning: 'fierce power' },
  ],
  healing: [
    { root: 'Rapha',   meaning: 'healing' },
    { root: 'Marpe',   meaning: 'remedy' },
    { root: 'Aruch',   meaning: 'restoration' },
    { root: 'Chay',    meaning: 'life' },
    { root: 'Nechama', meaning: 'comfort' },
    { root: 'Briah',   meaning: 'creation' },
    { root: 'Shifa',   meaning: 'recovery' },
  ],
};

// ── Suffix pools by tradition ─────────────────────────────────────────────────

const SUFFIXES: Record<Tradition, AngelSuffix[]> = {
  hebrew: [
    { suffix: 'el',  label: '-el',  tradition: 'Hebrew',           meaning: 'God' },
    { suffix: 'iel', label: '-iel', tradition: 'Hebrew',           meaning: 'of God' },
    { suffix: 'on',  label: '-on',  tradition: 'Hebrew honorific', meaning: 'great one / exalted' },
  ],
  christian: [
    { suffix: 'el',  label: '-el',  tradition: 'Hebrew',    meaning: 'God' },
    { suffix: 'iel', label: '-iel', tradition: 'Hebrew',    meaning: 'of God' },
    { suffix: 'on',  label: '-on',  tradition: 'Honorific', meaning: 'great one / exalted' },
    { suffix: 'us',  label: '-us',  tradition: 'Latin',     meaning: 'divine being (Latinized)' },
  ],
  islamic: [
    { suffix: 'il',  label: '-il',  tradition: 'Arabic',      meaning: 'God (Arabic form of El)' },
    { suffix: 'ail', label: '-ail', tradition: 'Arabic',      meaning: 'of God (Arabic form of El)' },
    { suffix: '',    label: 'none', tradition: 'Arabic bare', meaning: 'root meaning stands alone' },
  ],
  enochian: [
    { suffix: 'el',   label: '-el',   tradition: 'Hebrew',   meaning: 'God' },
    { suffix: 'iel',  label: '-iel',  tradition: 'Hebrew',   meaning: 'of God' },
    { suffix: 'eel',  label: '-eel',  tradition: 'Enochian', meaning: 'emanation of the divine light' },
    { suffix: 'qiel', label: '-qiel', tradition: 'Enochian', meaning: 'voice / breath of God' },
  ],
  all: [
    { suffix: 'el',   label: '-el',   tradition: 'Hebrew',      meaning: 'God' },
    { suffix: 'iel',  label: '-iel',  tradition: 'Hebrew',      meaning: 'of God' },
    { suffix: 'on',   label: '-on',   tradition: 'Honorific',   meaning: 'great one / exalted' },
    { suffix: 'il',   label: '-il',   tradition: 'Arabic',      meaning: 'God (Arabic form of El)' },
    { suffix: 'ail',  label: '-ail',  tradition: 'Arabic',      meaning: 'of God (Arabic form of El)' },
    { suffix: 'eel',  label: '-eel',  tradition: 'Enochian',    meaning: 'emanation of the divine light' },
    { suffix: 'us',   label: '-us',   tradition: 'Latin',       meaning: 'divine being (Latinized)' },
    { suffix: '',     label: 'none',  tradition: 'Bare form',   meaning: 'root meaning stands alone' },
  ],
};

// ── Service ───────────────────────────────────────────────────────────────────

export class AngelNameGeneratorService {

  private getRootPool(domain: Domain): (AngelRoot & { domain: Domain })[] {
    if (domain === 'any') {
      return (Object.entries(ROOTS) as [Domain, AngelRoot[]][])
        .flatMap(([d, arr]) => arr.map(r => ({ ...r, domain: d })));
    }
    return ROOTS[domain].map(r => ({ ...r, domain }));
  }

  private getSuffixPool(tradition: Tradition, filter: SuffixFilter): AngelSuffix[] {
    let pool = SUFFIXES[tradition];

    if (filter === 'any') return pool;

    const target = filter === 'none' ? '' : filter;
    const filtered = pool.filter(s => s.suffix === target);

    // Fall back to full pool if filter yields nothing for this tradition
    return filtered.length > 0 ? filtered : SUFFIXES.all.filter(s => s.suffix === target);
  }

  private cleanRoot(root: string, suffix: string): string {
    const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
    if (suffix && VOWELS.has(root[root.length - 1].toLowerCase()) && VOWELS.has(suffix[0].toLowerCase())) {
      return root.slice(0, -1);
    }
    return root;
  }

  private titleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  generate(params: GeneratorParams = {}): GeneratedAngel[] {
    const {
      tradition    = 'all',
      domain       = 'any',
      suffixFilter = 'any',
      count        = 9,
    } = params;

    const safeCount = Math.min(48, Math.max(1, count));
    const rootPool   = this.getRootPool(domain);
    const suffixPool = this.getSuffixPool(tradition, suffixFilter);

    if (!rootPool.length || !suffixPool.length) return [];

    const results: GeneratedAngel[] = [];
    const seen = new Set<string>();
    let attempts = 0;

    while (results.length < safeCount && attempts < 1000) {
      attempts++;

      const rootObj   = this.pick(rootPool);
      const suffixObj = this.pick(suffixPool);
      const cleaned   = this.cleanRoot(rootObj.root, suffixObj.suffix);
      const name      = this.titleCase(cleaned + suffixObj.suffix);
      const key       = name.toLowerCase();

      if (seen.has(key)) continue;
      seen.add(key);

      results.push({
        name,
        root:            rootObj.root,
        meaning:         rootObj.meaning,
        domain:          rootObj.domain,
        suffix:          suffixObj.label,
        suffixMeaning:   suffixObj.meaning,
        suffixTradition: suffixObj.tradition,
      });
    }

    return results;
  }
}

// ── Usage example ─────────────────────────────────────────────────────────────
//
// const svc = new AngelNameGeneratorService();
//
// // Generate 5 Enochian war angels
// const warAngels = svc.generate({ tradition: 'enochian', domain: 'war', count: 5 });
//
// // Generate 10 names from any tradition with -el suffix
// const elAngels = svc.generate({ suffixFilter: 'el', count: 10 });
//
// // Generate 3 Islamic healing angels
// const healers = svc.generate({ tradition: 'islamic', domain: 'healing', count: 3 });