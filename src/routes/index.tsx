import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hyperliquid Wallet 0x64b7…9da9 | Hyperstats" },
      { name: "description", content: "Live performance, positions and PnL for Hyperliquid wallet 0x64b766b07362405a9cc19c2226490f3015929da9." },
      { property: "og:title", content: "Hyperliquid Wallet | Hyperstats" },
      { property: "og:description", content: "Live performance, positions and PnL for this Hyperliquid wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WalletPage,
});

const ADDR = "0x64b766b07362405a9cc19c2226490f3015929da9";

/* ---------- tiny icons ---------- */
const I = {
  search: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  send: <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  copy: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>,
  ext: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>,
  star: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 2 3 7 7 .6-5.3 4.7L18.5 22 12 18l-6.5 4 1.8-7.7L2 9.6 9 9z"/></svg>,
  refresh: <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M3 21v-5h5"/></svg>,
  chev: <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 6 6 6-6 6"/></svg>,
  x: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2H21l-6.5 7.4L22 22h-6l-4.7-6.1L5.8 22H3l7-8L2 2h6.1l4.3 5.7zm-1 18h1.6L7 3.7H5.3z"/></svg>,
  eyeOff: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 22 12a14 14 0 0 1-3 3.6M6.6 6.6A14 14 0 0 0 2 12s4 7 10 7a9 9 0 0 0 5.4-1.6"/></svg>,
};

/* ---------- top nav ---------- */
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor"><rect x="0" y="4" width="3" height="12" rx="1"/><rect x="5.5" y="0" width="3" height="16" rx="1"/><rect x="11" y="6" width="3" height="6" rx="1"/></svg>
      <span className="text-[17px] font-medium tracking-[-0.01em]">Hyperstats</span>
    </div>
  );
}

function TopNav() {
  const items = ["Main", "Top Traders", "Activity", "Favourites", "Analytics", "Terminal", "Guides", "Docs"];
  return (
    <header className="flex h-[68px] items-center px-[18px]">
      <Logo />
      <nav className="ml-[38px] flex items-center gap-1">
        {items.map((t) => (
          <a key={t} className={`rounded-full px-[9px] py-[6px] text-[10.5px] ${t === "Favourites" ? "bg-brand text-foreground" : "text-foreground/90"}`}>{t}</a>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex h-[25px] w-[175px] items-center gap-2 rounded-full border border-line bg-chip px-3 text-[9px] text-muted-foreground">
          {I.search}<span className="flex-1 truncate">Search wallets, tokens, ranks...</span>
          <span className="rounded border border-line px-1 text-[8px]">/</span>
        </div>
        <span className="grid h-[25px] w-[25px] place-items-center rounded-full border border-line bg-chip">{I.x}</span>
        <span className="flex h-[25px] items-center gap-1.5 rounded-full border border-line bg-chip px-3 text-[9px] font-semibold">{I.send}Bots</span>
        <span className="flex h-[25px] items-center gap-1.5 rounded-full border border-brand/60 bg-brand/25 px-3 text-[9px]">{I.send}<b className="font-semibold">Copy</b> on Telegram <span className="ml-0.5">→</span></span>
      </div>
    </header>
  );
}

/* ---------- ticker ---------- */
type Tick = [string, string, string, string, string];
const ticks: Tick[] = [
  ["HYPE", "Increased", "0x3a81…9ab1", "$166.7K", "56s"],
  ["BTC", "Long", "0x5080…9247", "$529.9K", "1m"],
  ["BTC", "Closed", "0x5080…9247", "−$106.6K", "1m"],
  ["BTC", "Long", "0x5080…9247", "$529.9K", "1m"],
  ["BTC", "Closed", "0x5080…9247", "−$106.6K", "1m"],
  ["BTC", "Increased", "0x3947…f3b1", "$51.6K", "3m"],
  ["ETH", "Reduced", "0x51b9…3bc1", "+$2.97K", "4m"],
  ["SOL", "Short", "0x7a26…4f8e", "$88.2K", "5m"],
];
function Coin({ s, size = 14 }: { s: string; size?: number }) {
  const cls: Record<string, string> = { BTC: "bg-[#f7931a]", ETH: "bg-[#627eea]", HYPE: "bg-[#0d2a26] text-gain", SOL: "bg-[#14f195] text-light-foreground" };
  return <span style={{ width: size, height: size, fontSize: size * 0.55 }} className={`grid shrink-0 place-items-center rounded-full font-bold text-foreground ${cls[s] ?? "bg-chip-strong"}`}>{s === "BTC" ? "₿" : s === "HYPE" ? "∞" : s[0]}</span>;
}
function Ticker() {
  const row = [...ticks, ...ticks];
  return (
    <div className="overflow-hidden border-y border-line-soft py-[7px]">
      <div className="flex w-max animate-ticker gap-[22px]">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-[7px] text-[9px] whitespace-nowrap">
            <Coin s={t[0]} />
            <span className="text-[10px] font-semibold">{t[0]}</span>
            <span className={`rounded px-1.5 py-[1px] text-[7.5px] ${t[1] === "Long" ? "bg-gain/15 text-gain" : t[1] === "Short" ? "bg-loss/15 text-loss" : "bg-chip-strong text-muted-foreground"}`}>{t[1]}</span>
            <span className="text-[8.5px] text-muted-foreground">{t[2]}</span>
            <span className={`font-semibold ${t[3].startsWith("−") ? "text-loss" : t[3].startsWith("+") ? "text-gain" : ""}`}>{t[3]}</span>
            <span className="text-dim">{t[4]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- left sidebar ---------- */
function Section({ title, right, children }: { title: string; right?: ReactNode; children: ReactNode }) {
  return (
    <div className="border-b border-line-soft px-4 py-[14px]">
      <div className="mb-[13px] flex justify-between text-[9.5px] font-semibold">{title}{right}</div>
      {children}
    </div>
  );
}
const Row = ({ l, r, c = "" }: { l: ReactNode; r: ReactNode; c?: string }) => (
  <div className="flex items-center justify-between py-[6px] text-[9px]"><span className="text-muted-foreground">{l}</span><span className={`font-medium ${c}`}>{r}</span></div>
);
const Box = ({ l, v, c = "" }: { l: string; v: string; c?: string }) => (
  <div className="rounded-md border border-line bg-chip px-2 py-2 text-[8.5px]"><div className="text-muted-foreground">{l}</div><div className={`mt-1 text-[9px] font-medium ${c}`}>{v}</div></div>
);
const BarRow = ({ l, d, v, c }: { l: string; d: string; v: string; c: string }) => (
  <div className="flex items-center justify-between py-[5px] text-[9px]"><span>{l} <span className="ml-1 text-[7px] text-dim">{d}</span></span><span className={c}>{v}</span></div>
);

function LeftSidebar() {
  return (
    <aside className="border-r border-line-soft">
      <div className="border-b border-line-soft px-4 py-[16px]">
        <div className="text-[11.5px] font-semibold">Wallet Stats</div>
        <div className="mt-0.5 text-[8px] text-muted-foreground">Live performance for the selected wallet</div>
      </div>
      <div className="border-b border-line-soft px-4 py-[14px]">
        <div className="flex justify-between text-[9.5px] font-semibold"><span>Account structure</span><span>$134.76M</span></div>
        <div className="mt-2 h-[3px] rounded-full bg-chip-strong"><div className="h-full w-1/4 rounded-full bg-gain" /></div>
        <div className="mt-2 flex gap-3 text-[7.5px] text-muted-foreground"><span><span className="text-gain">●</span> Spot <b className="text-foreground">25%</b></span><span>● Position <b className="text-foreground">75%</b></span></div>
        <div className="mt-3">
          <Row l="Spot Value" r="$33.77M" />
          <Row l="Position Value" r="$100.98M" />
          <Row l="Positions P&L" r="−$9.86M" c="text-loss" />
        </div>
      </div>
      <Section title="Consistency" right={<span className="text-gain">46%</span>}>
        <div className="flex justify-between text-[8.5px] text-muted-foreground"><span>12 of 26 profitable days</span><span>hit rate</span></div>
        <div className="mt-[18px] h-[3px] rounded-full bg-loss" />
      </Section>
      <Section title="Trade tempo">
        <div className="grid grid-cols-2 gap-2"><Box l="Avg Daily P&L" v="−$41.5K" c="text-loss" /><Box l="Avg Position" v="$544.2K" /></div>
        <div className="mt-2"><Box l="Streaks" v="35W / 76L" /></div>
      </Section>
      <Section title="Best & worst day">
        <div className="border-l-2 border-chip-strong pl-2"><BarRow l="Best" d="Nov 15" v="+$664.7K" c="text-gain" /><BarRow l="Worst" d="Nov 10" v="−$1.07M" c="text-loss" /></div>
      </Section>
      <Section title="Largest trades">
        <div className="border-l-2 border-chip-strong pl-2"><BarRow l="Largest Win" d="PONS" v="+$522.1K" c="text-gain" /><BarRow l="Largest Loss" d="WLD" v="−$404.8K" c="text-loss" /></div>
      </Section>
      <Section title="Execution"><Row l="Execution Pace" r="16.5 / day" /><Row l="Active Exit Days · 30D" r="26 days" /></Section>
      <Section title="Funds"><Row l="Net Deposit" r="+$0.00" c="text-muted-foreground" /><Row l="Transactions" r="3,046" /></Section>
      <Section title="Risk-adjusted">
        <div className="grid grid-cols-2 gap-2"><Box l="Sortino" v="8.78" /><Box l="Profit Factor" v="0.77" /><Box l="Max Drawdown" v="−42.1%" c="text-loss" /><Box l="Gross P&L" v="−$1.24M" c="text-loss" /></div>
      </Section>
    </aside>
  );
}

/* ---------- chart ---------- */
function seeded(n: number) {
  let s = 7;
  const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const pts: number[] = [];
  let v = -0.2;
  for (let i = 0; i < n; i++) {
    const t = i / n;
    let drift = 0;
    if (t > 0.84) drift = 0.09;
    else if (t > 0.8) drift = -0.03;
    v += (r() - 0.5) * 0.16 + drift - (v + 0.4) * 0.02 * (t < 0.8 ? 1 : 0);
    if (t > 0.79 && t < 0.82) v -= r() * 0.12;
    pts.push(v);
  }
  return pts;
}
function PnlChart() {
  const W = 1380, H = 200, X0 = 40, Y = (v: number) => 95 - v * 38;
  const data = seeded(360);
  const xs = (i: number) => X0 + (i / (data.length - 1)) * (W - X0 - 30);
  const line = data.map((v, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)},${Y(v).toFixed(1)}`).join("");
  const area = `${line}L${xs(data.length - 1)},${H}L${X0},${H}Z`;
  const zeroY = Y(0.45);
  const markers: [number, string][] = [[0.08, "42"], [0.1, ""], [0.28, "12"], [0.33, "4"], [0.78, "20"], [0.79, "9"], [0.93, "3"], [0.95, "14"], [0.96, "5"]];
  return (
    <div className="relative h-[250px]">
      <svg viewBox={`0 0 ${W} 250`} preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="lossG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--loss)" stopOpacity=".35"/><stop offset="1" stopColor="var(--loss)" stopOpacity="0"/></linearGradient>
          <linearGradient id="gainG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--gain)" stopOpacity=".3"/><stop offset="1" stopColor="var(--gain)" stopOpacity="0"/></linearGradient>
          <clipPath id="above"><rect x="0" y="0" width={W} height={zeroY} /></clipPath>
          <clipPath id="below"><rect x="0" y={zeroY} width={W} height={H} /></clipPath>
        </defs>
        {markers.map(([p], i) => <line key={i} x1={X0 + p * (W - X0 - 30)} x2={X0 + p * (W - X0 - 30)} y1="15" y2={H} stroke="#ffffff22" strokeWidth="1" />)}
        <line x1={X0} x2={W - 30} y1={zeroY} y2={zeroY} stroke="#ffffff30" strokeDasharray="3 3" />
        <g transform="translate(0,20)">
          <path d={area} fill="url(#lossG)" clipPath="url(#below)" />
          <path d={area} fill="url(#gainG)" clipPath="url(#above)" />
          <path d={line} fill="none" stroke="var(--loss)" strokeWidth="1.3" clipPath="url(#below)" />
          <path d={line} fill="none" stroke="var(--gain)" strokeWidth="1.3" clipPath="url(#above)" />
        </g>
      </svg>
      {markers.map(([p, l], i) => (
        <span key={i} style={{ left: `${((X0 + p * (W - X0 - 30)) / W) * 100}%` }} className="absolute top-[6px] -translate-x-1/2 rounded-full bg-chip-strong px-1.5 text-[7px] font-semibold text-foreground">{l || "●"}</span>
      ))}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-between pb-[60px] pt-[30px] text-[8px] text-dim">
        {["$2M", "$1M", "−$1M", "−$2M", "−$3M"].map((t) => <span key={t}>{t}</span>)}
      </div>
      <span className="absolute right-[1.6%] top-[34px] rounded-full bg-gain px-1.5 text-[7px] font-semibold text-light-foreground">+$2M</span>
      <span className="absolute bottom-[40px] left-[45px] grid h-[22px] w-[22px] place-items-center rounded-full bg-light text-[10px] text-light-foreground">⇆</span>
      <div className="absolute inset-x-[40px] bottom-0 flex justify-between text-[8px] text-muted-foreground">
        {[["22:25", "Nov 24"], ["02:25", "Nov 25"], ["06:25"], ["10:25"], ["14:25"], ["18:25"], ["22:25"]].map(([t, d], i) => (
          <span key={i} className="text-center leading-tight">{t}{d && <span className="block text-[6.5px] text-brand">{d}</span>}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- main ---------- */
const Btn = ({ children }: { children: ReactNode }) => (
  <span className="flex h-[21px] items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 text-[8.5px]">{children}</span>
);
const Stat = ({ l, v, c = "" }: { l: string; v: string; c?: string }) => (
  <span className="flex h-[22px] items-center gap-1.5 rounded-full border border-line bg-chip px-2.5 text-[8.5px]"><span className="text-muted-foreground">{l}</span><b className={`font-semibold ${c}`}>{v}</b></span>
);
function Seg({ items, active, badges }: { items: string[]; active: string; badges?: Record<string, string> }) {
  return (
    <div className="flex items-center rounded-full border border-line bg-chip p-[3px]">
      {items.map((t) => (
        <span key={t} className={`flex items-center gap-1.5 rounded-full px-[11px] py-[5px] text-[9.5px] ${t === active ? "bg-light font-medium text-light-foreground" : "text-muted-foreground"}`}>
          {t}{badges?.[t] && <span className={`rounded-full px-1 text-[7px] ${t === active ? "bg-light-foreground/10" : "bg-chip-strong"}`}>{badges[t]}</span>}
        </span>
      ))}
    </div>
  );
}

type Pos = [string, string, "Long" | "Short", string, string, string, string, string, string, string, string, string];
const positions: Pos[] = [
  ["0G", "Held 60d", "Long", "$91.4K", "$30.5K", "$0.232170", "$0.096900", "▾ 58.26%", "—", "3x", "−$127.6K", "−419.07%"],
  ["AAVE", "Held 1d", "Short", "$514.7K", "$51.4K", "$93.2518", "$95.8330", "▴ 2.77%", "$4,925.31", "10x", "−$13.9K", "−26.96%"],
  ["ADA", "Held 9d", "Short", "$1.06M", "$105.8K", "$0.142569", "$0.147200", "▴ 3.25%", "$3.7471", "10x", "−$33.3K", "−31.51%"],
  ["ARB", "Held 5h", "Short", "$476.2K", "$47.6K", "$0.106030", "$0.112180", "▴ 5.80%", "$6.0402", "10x", "−$26.1K", "−54.87%"],
  ["BERA", "Held 67d", "Long", "$3.2K", "$630.23", "$0.221340", "$0.081050", "▾ 63.38%", "—", "5x", "−$5.5K", "−866.74%"],
  ["BIO", "Held 40d", "Long", "$223.6K", "$74.5K", "$0.027133", "$0.015162", "▾ 44.12%", "—", "3x", "−$176.5K", "−236.91%"],
  ["BTC", "Held 2d", "Short", "$12.4M", "$1.24M", "$86,412.0", "$87,105.0", "▴ 0.80%", "$142,880", "10x", "−$98.4K", "−7.93%"],
  ["DOGE", "Held 12d", "Short", "$2.11M", "$211.0K", "$0.148200", "$0.152410", "▴ 2.84%", "$0.9120", "10x", "−$58.2K", "−27.60%"],
];

function PositionsTable() {
  const heads = ["Asset", "Side", "Notional", "Margin", "Entry", "Mark", "Liq.", "Lev.", "P&L"];
  return (
    <table className="mt-5 w-full text-[9px]">
      <thead>
        <tr className="text-[8.5px] text-foreground/90">
          {heads.map((h, i) => (
            <th key={h} className={`pb-3 font-normal ${i < 2 ? "text-left" : "text-right"} ${i === 0 ? "pl-2.5" : ""}`}>{h}{h !== "Side" && <span className="ml-0.5 text-dim">{h === "P&L" ? "↓" : "⇅"}</span>}</th>
          ))}
          <th />
        </tr>
      </thead>
      <tbody>
        {positions.map((p) => (
          <tr key={p[0]} className="border-t border-line-soft">
            <td className="py-[11px] pl-2.5"><div className="flex items-center gap-2.5"><Coin s={p[0]} size={11} /><div><div className="font-medium">{p[0]}</div><div className="text-[7.5px] text-muted-foreground">{p[1]}</div></div></div></td>
            <td><span className={`flex items-center gap-2 ${p[2] === "Long" ? "text-gain" : "text-loss"}`}><span className={`grid h-[15px] w-[15px] place-items-center rounded text-[8px] ${p[2] === "Long" ? "bg-gain/15" : "bg-loss/15"}`}>{p[2] === "Long" ? "↑" : "↓"}</span><span className="text-[8px]">{p[2]}</span></span></td>
            <td className="text-right text-muted-foreground">{p[3]}</td>
            <td className="text-right">{p[4]}</td>
            <td className="text-right">{p[5]}</td>
            <td className="text-right"><div className="text-loss">{p[6]}</div><div className="text-[7px] text-loss/80">{p[7]}</div></td>
            <td className="text-right">{p[8]}</td>
            <td className="text-right text-gold">{p[9]}</td>
            <td className="text-right"><div className="text-loss">{p[10]}</div><div className="text-[7.5px] text-loss/80">{p[11]}</div></td>
            <td className="w-6 text-right text-muted-foreground">›</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Main() {
  return (
    <main className="min-w-0 px-4 py-[16px]">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[16px] font-medium tracking-[-0.01em]">Hyperliquid Wallet</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[11px] text-muted-foreground">{ADDR}</span>
            <Btn>{I.copy}Copy</Btn><Btn>{I.ext}Open</Btn><Btn>{I.star}Save</Btn>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid h-[25px] w-[25px] place-items-center rounded-full border border-line bg-chip">{I.refresh}</span>
          <span className="flex h-[25px] items-center gap-2 rounded-full border border-line bg-chip px-3 text-[9px]">Hide favourites {I.chev}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-3 text-[8.5px]">
        <span className="rounded bg-chip-strong px-1.5 py-1">Grade C</span>
        <span className="text-muted-foreground">Rank <b className="font-medium text-foreground">#9,490</b></span>
        <span className="text-muted-foreground"><span className="text-gain">●</span> Updated <b className="font-medium text-foreground">just now</b></span>
      </div>
      <div className="mt-[10px] flex gap-[7px]">
        <Stat l="Account" v="$134.76M" /><Stat l="30D Realized" v="−$1.08M" c="text-loss" /><Stat l="Win Rate" v="44.9%" />
        <Stat l="Sharpe" v="4.57" c="text-gain" /><Stat l="Bias" v="Long 71%" c="text-gain" />
      </div>
      <div className="mt-[12px] flex items-center">
        <Seg items={["Period PnL", "Total PnL", "Realized PnL"]} active="Period PnL" />
        <div className="ml-[430px]"><Seg items={["15m", "1H", "24H", "7D", "30D", "3M", "1Y"]} active="24H" /></div>
        <div className="ml-auto flex items-center gap-1 rounded-full border border-line bg-chip p-[3px] text-muted-foreground">
          <span className="grid h-[19px] w-[19px] place-items-center rounded-full bg-light text-light-foreground">★</span>
          <span className="px-1 text-[9px]">···</span>
          <span className="px-1">{I.eyeOff}</span>
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="w-[488px]">
          <div className="text-[8px] text-muted-foreground">Period P&L</div>
          <div className="text-[17px] font-medium text-gain">+$186.7K</div>
          <div className="text-[7.5px] text-gain">▴ <span className="text-muted-foreground"><span className="text-gain">0.1%</span> vs prev 24H</span></div>
        </div>
        <div>
          <div className="text-[8px] text-muted-foreground">Events</div>
          <div className="text-[17px] font-medium">3068</div>
          <div className="flex gap-2 text-[7.5px] text-muted-foreground">
            <span><span className="text-brand">●</span> 65 opens</span><span><span className="text-brand">●</span> 1839 adds</span>
            <span className="ml-2">1149 reduces</span><span><span className="text-gain">●</span> 5 wins</span><span><span className="text-loss">●</span> 10 losses</span>
          </div>
        </div>
      </div>
      <div className="mt-2"><PnlChart /></div>
      <div className="mt-[68px]">
        <div className="inline-flex"><Seg items={["Positions", "Spot", "Orders", "History", "Entries"]} active="Positions" badges={{ Positions: "48", Spot: "2", Orders: "0" }} /></div>
        <div className="mt-[12px] flex gap-[7px]"><Stat l="Total Value" v="$100.98M" /><Stat l="Total Margin" v="$8.16M" /><Stat l="Open P&L" v="−$9.86M" c="text-loss" /></div>
        <PositionsTable />
      </div>
    </main>
  );
}

/* ---------- right sidebar ---------- */
function RightSidebar() {
  return (
    <aside className="border-l border-line-soft">
      <div className="border-b border-line-soft px-[14px] py-[16px]">
        <div className="text-[11.5px] font-semibold">Telegram alerts</div>
        <p className="mt-2 text-[8px] leading-[1.75] text-muted-foreground">Get pinged on every position open, close, and liquidation from your favourites — straight to Telegram.</p>
        <button className="mt-3 flex h-[29px] w-full items-center justify-center gap-2 rounded-full bg-light text-[9px] font-medium text-light-foreground">{I.send}Connect Telegram</button>
      </div>
      <div className="px-[14px] py-[18px]">
        <div className="flex items-center justify-between"><span className="text-[11px] font-semibold">Favourites</span><span className="rounded-full border border-line bg-chip px-2.5 py-1 text-[8.5px]">+ Add</span></div>
        <div className="mt-3 text-[8px] text-muted-foreground"><b className="text-foreground">0</b> wallets tracked</div>
        <div className="mt-3 flex h-[24px] items-center gap-2 rounded-md border border-line bg-chip px-2.5 text-[8.5px] text-muted-foreground">{I.search}Search wallet...</div>
        <div className="mt-3 flex items-center gap-3 text-[7.5px] text-muted-foreground">
          SORT
          <div className="flex flex-1 rounded-full border border-line bg-chip p-[2px]">
            <span className="flex-1 rounded-full bg-chip-strong py-[3px] text-center text-foreground">Recent ↓</span>
            <span className="flex-1 py-[3px] text-center">PnL</span><span className="flex-1 py-[3px] text-center">Value</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line-soft px-[14px] py-[24px] text-center">
        <div className="text-[8.5px] font-semibold">No favourites yet</div>
        <div className="mt-1 text-[7.5px] leading-[1.6] text-muted-foreground">Add wallets from the leaderboard or here to start tracking.</div>
      </div>
    </aside>
  );
}

function WalletPage() {
  return (
    <div className="min-h-screen min-w-[1600px] bg-background">
      <TopNav />
      <Ticker />
      <div className="grid grid-cols-[212px_1fr_214px]">
        <LeftSidebar /><Main /><RightSidebar />
      </div>
    </div>
  );
}
