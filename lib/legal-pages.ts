import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  FileText,
  Globe2,
  Handshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { SITE } from "@/lib/constants";

export type InfoPage = {
  title: string;
  eyebrow: string;
  description: string;
  updated?: string;
  sections: {
    title: string;
    body: string[];
  }[];
  highlights?: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
};

export const ABOUT_PAGE: InfoPage = {
  eyebrow: "会社概要",
  title: "日本の水産物を、誠実に世界へつなぐ輸出パートナー。",
  description:
    "海宝は、日本各地の水産物を海外の外食、卸売、流通バイヤーへ届けるための調達・品質確認・輸出調整を支援します。",
  sections: [
    {
      title: "私たちについて",
      body: [
        "海宝は、旬と品質を大切にする日本の水産物を、海外市場の要件に合わせて提案する輸出支援ブランドです。",
        "商品選定、数量確認、梱包条件、輸出書類、温度管理物流まで、バイヤーが安心して相談できる窓口を目指しています。",
      ],
    },
    {
      title: "大切にしていること",
      body: [
        "水産物は季節や水揚げ状況により品質と供給量が変動します。だからこそ、正確な情報共有と無理のない提案を重視しています。",
        "高級外食、ホテル、卸売、専門小売など、それぞれの用途に合うグレードと形態をご案内します。",
      ],
    },
  ],
  highlights: [
    {
      title: "日本国内ネットワーク",
      description: "産地や商品特性に応じて、輸出に適した供給先を確認します。",
      icon: Globe2,
    },
    {
      title: "品質と温度管理",
      description: "生鮮、チルド、冷凍に合わせた取り扱い条件を大切にします。",
      icon: ShieldCheck,
    },
    {
      title: "B2B対応",
      description: "海外バイヤーの数量、納期、仕向け地条件に合わせて調整します。",
      icon: Handshake,
    },
  ],
};

export const CONTACT_PAGE: InfoPage = {
  eyebrow: "お問い合わせ",
  title: "商品、数量、仕向け地を添えてご相談ください。",
  description:
    "輸出見積もり、在庫確認、取扱商品の相談はメールまたは下記情報からお問い合わせいただけます。",
  sections: [
    {
      title: "お問い合わせ方法",
      body: [
        `メール: ${SITE.email}`,
        "電話: +81-3-0000-0000",
        "所在地: 東京都中央区築地 1-1-1",
      ],
    },
    {
      title: "ご相談時にあると良い情報",
      body: [
        "希望商品、想定数量、仕向け国、希望納期、必要な梱包形態、輸送温度帯をお知らせください。",
        "供給可否や価格は、季節、等級、為替、物流条件により変動します。",
      ],
    },
  ],
  highlights: [
    {
      title: "メール相談",
      description: SITE.email,
      icon: Mail,
    },
    {
      title: "電話",
      description: "+81-3-0000-0000",
      icon: Phone,
    },
    {
      title: "所在地",
      description: "東京都中央区築地 1-1-1",
      icon: MapPin,
    },
  ],
};

export const TERMS_PAGE: InfoPage = {
  eyebrow: "利用規約",
  title: "海宝ウェブサイト利用規約",
  description:
    "本規約は、海宝ウェブサイトの閲覧、お問い合わせ、情報利用に関する基本条件を定めるものです。",
  updated: "最終更新日: 2026年6月16日",
  sections: [
    {
      title: "第1条 適用",
      body: [
        "本規約は、本ウェブサイトを利用するすべての方に適用されます。本サイトを利用した時点で、本規約に同意したものとみなします。",
      ],
    },
    {
      title: "第2条 掲載情報",
      body: [
        "掲載される商品、価格、供給可否、納期、仕様は参考情報であり、確定した契約条件ではありません。",
        "水産物の特性上、供給状況は季節、天候、水揚げ、物流条件により変更される場合があります。",
      ],
    },
    {
      title: "第3条 禁止事項",
      body: [
        "虚偽情報の送信、第三者の権利侵害、不正アクセス、営業妨害、法令に反する利用を禁止します。",
      ],
    },
    {
      title: "第4条 免責",
      body: [
        "当社は、本サイトの情報の正確性維持に努めますが、完全性、最新性、特定目的への適合性を保証するものではありません。",
        "本サイトの利用により発生した損害について、法令上必要な範囲を除き責任を負いません。",
      ],
    },
  ],
  highlights: [
    {
      title: "参考情報",
      description: "正式な取引条件は個別見積もりと合意内容に基づきます。",
      icon: FileText,
    },
    {
      title: "供給変動",
      description: "水産物は季節や物流条件で供給が変わります。",
      icon: BadgeCheck,
    },
  ],
};

export const PRIVACY_PAGE: InfoPage = {
  eyebrow: "プライバシーポリシー",
  title: "個人情報の取り扱いについて",
  description:
    "海宝は、お問い合わせや取引相談で取得する情報を適切に管理し、必要な範囲で利用します。",
  updated: "最終更新日: 2026年6月16日",
  sections: [
    {
      title: "取得する情報",
      body: [
        "氏名、会社名、メールアドレス、電話番号、仕向け国、希望商品、相談内容など、お問い合わせ時に入力または提供された情報を取得します。",
      ],
    },
    {
      title: "利用目的",
      body: [
        "お問い合わせへの回答、見積もり作成、商品提案、取引条件の確認、サービス改善、法令対応のために利用します。",
      ],
    },
    {
      title: "第三者提供",
      body: [
        "法令に基づく場合、本人の同意がある場合、輸出調整に必要な範囲で物流・仕入れ・通関等の関係者へ共有する場合を除き、個人情報を第三者に提供しません。",
      ],
    },
    {
      title: "安全管理",
      body: [
        "取得した情報は、不正アクセス、紛失、漏えいを防ぐため合理的な安全管理措置を講じます。",
      ],
    },
    {
      title: "お問い合わせ窓口",
      body: [`個人情報に関するお問い合わせは ${SITE.email} までご連絡ください。`],
    },
  ],
  highlights: [
    {
      title: "目的を限定",
      description: "お問い合わせ対応と取引相談に必要な範囲で利用します。",
      icon: ShieldCheck,
    },
    {
      title: "適切な管理",
      description: "提供いただいた情報を安全に扱うよう努めます。",
      icon: FileText,
    },
  ],
};
