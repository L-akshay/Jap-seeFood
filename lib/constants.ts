export const SITE = {
  name: "Kaiho",
  nameJp: "海宝",
  tagline: "日本の高品質な水産物を世界へ",
  description:
    "旬を見極めた日本の水産物を、品質管理とトレーサビリティを大切に世界へお届けします。",
  email: "export@kaiho.example",
} as const;

export const COLORS = {
  background: "#020617",
  navy: "#061826",
  gold: "#D6A84F",
  goldMuted: "#A77D35",
  pearl: "#F8FAFC",
  softBlue: "#D9EDF7",
  red: "#C1121F",
} as const;

export const NAV_LINKS = [
  { label: "商品", href: "/#showcase" },
  { label: "日本品質", href: "/#why-japan" },
  { label: "輸出の流れ", href: "/#process" },
  { label: "お問い合わせ", href: "/contact" },
] as const;

export const FOOTER_LINKS = [
  { label: "会社概要", href: "/about" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "利用規約", href: "/terms" },
  { label: "プライバシーポリシー", href: "/privacy" },
] as const;

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_IMAGE = unsplash("1565643355044-000fbad87cc5", 2000);
export const WHY_IMAGE = unsplash("1724001637941-3b4e91555c35", 1400);

export type SeafoodItem = {
  slug: string;
  name: string;
  nameJp: string;
  origin: string;
  exportType: string;
  description: string;
  image: string;
};

export const SEAFOOD: SeafoodItem[] = [
  {
    slug: "tuna",
    name: "本まぐろ",
    nameJp: "本鮪",
    origin: "日本",
    exportType: "生鮮 / 冷凍",
    description:
      "寿司、会席、高級レストラン向けに、旨みと脂の質を見極めて選別します。",
    image: unsplash("1490052048947-f6d652c8512a"),
  },
  {
    slug: "scallops",
    name: "北海道ほたて",
    nameJp: "帆立",
    origin: "北海道",
    exportType: "冷凍 / チルド",
    description:
      "北の海で育った、甘みと透明感のある人気の高いほたてをお届けします。",
    image: unsplash("1660457831961-e5a47365796a"),
  },
  {
    slug: "crab",
    name: "ずわい蟹",
    nameJp: "蟹",
    origin: "日本海",
    exportType: "冷凍",
    description:
      "卸売、ホテル、季節メニュー向けに扱いやすく整えた上質な蟹です。",
    image: unsplash("1759306103437-c0984f7bba9d"),
  },
  {
    slug: "uni",
    name: "うに",
    nameJp: "雲丹",
    origin: "日本",
    exportType: "チルド / 冷凍",
    description:
      "繊細な香りと濃厚な甘みを大切に、上質な外食市場向けに選別します。",
    image: unsplash("1541350013829-75d00d6c8578"),
  },
  {
    slug: "ikura",
    name: "いくら",
    nameJp: "いくら",
    origin: "日本",
    exportType: "冷凍 / チルド",
    description:
      "鮮やかな色合いと粒感を保ち、寿司、量販、ホテル向けにご提案します。",
    image: unsplash("1682050152352-56ae4cf1d9a0"),
  },
  {
    slug: "seasonal",
    name: "旬の鮮魚",
    nameJp: "旬の魚",
    origin: "日本",
    exportType: "季節商品",
    description:
      "季節、品質、需要に合わせて、その時期に最適な水産物をご案内します。",
    image: unsplash("1553621042-f6e147245754"),
  },
];
