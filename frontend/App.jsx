import { useState } from "react";
import {
  Home, Thermometer, ScanLine, Bell, Map,
  Eye, ChevronDown, ChevronLeft, ChevronRight,
  AlertTriangle, CheckCircle, Wifi, Battery, Signal,
  Lock, Mail, User, ArrowRight, X, Activity
} from "lucide-react";

type Screen = "login" | "signup" | "dashboard" | "thermal" | "frost" | "scanner" | "integrity";

// ─── Shared ───────────────────────────────────────────────────────────────────

function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? "text-white/70" : "text-[#64748B]";
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-1">
      <span className={`text-[11px] font-semibold ${light ? "text-white/80" : "text-[#0F172A]"}`} style={{ fontFamily: "Inter, sans-serif" }}>
        9:41
      </span>
      <div className={`flex items-center gap-1.5 ${c}`}>
        <Signal size={11} />
        <Wifi size={11} />
        <Battery size={11} />
      </div>
    </div>
  );
}

function BottomNav({ active, onNavigate }: { active: Screen; onNavigate: (s: Screen) => void }) {
  const items = [
    { id: "dashboard" as Screen, Icon: Home, label: "Home" },
    { id: "thermal" as Screen, Icon: Thermometer, label: "Thermal" },
    { id: "scanner" as Screen, Icon: ScanLine, label: "Scanner" },
    { id: "frost" as Screen, Icon: Bell, label: "Alarms" },
    { id: "integrity" as Screen, Icon: Map, label: "Map" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] pt-3 pb-5">
      <div className="flex items-center justify-around px-2">
        {items.map(({ id, Icon, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="flex flex-col items-center gap-1 relative min-w-[56px] min-h-[56px] justify-center"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#0F172A] rounded-full" />
              )}
              <Icon
                size={20}
                className={isActive ? "text-[#0F172A]" : "text-[#94A3B8]"}
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span
                className="text-[10px] leading-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: isActive ? "#0F172A" : "#94A3B8",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <button
      onClick={onPress}
      className="flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] transition-colors"
    >
      <ChevronLeft size={16} />
      <span className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Back</span>
    </button>
  );
}

// ─── Screen 1: Login ──────────────────────────────────────────────────────────

function LoginScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <StatusBar />
      <div className="flex-1 flex flex-col px-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col items-center mt-12 mb-10">
          <div className="w-[64px] h-[64px] mb-5 flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="29" stroke="#CBD5E1" strokeWidth="1.25" />
              <circle cx="30" cy="30" r="20" stroke="#CBD5E1" strokeWidth="1.25" />
              <circle cx="30" cy="30" r="10" stroke="#0F172A" strokeWidth="1.5" />
              <circle cx="30" cy="30" r="3" fill="#0F172A" />
              <line x1="30" y1="0" x2="30" y2="10" stroke="#CBD5E1" strokeWidth="1.25" />
              <line x1="30" y1="50" x2="30" y2="60" stroke="#CBD5E1" strokeWidth="1.25" />
              <line x1="0" y1="30" x2="10" y2="30" stroke="#CBD5E1" strokeWidth="1.25" />
              <line x1="50" y1="30" x2="60" y2="30" stroke="#CBD5E1" strokeWidth="1.25" />
            </svg>
          </div>
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
            ColdChain Drone-Ops
          </h1>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Logistics Verification Node
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
              Gmail Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@coldchain.io"
                className="w-full h-14 bg-white border border-[#CBD5E1] rounded-xl pl-11 pr-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/8 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.08em]" style={{ fontFamily: "Inter, sans-serif" }}>
                Password
              </label>
              <button className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-14 bg-white border border-[#CBD5E1] rounded-xl pl-11 pr-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/8 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate("dashboard")}
          className="w-full h-14 bg-[#0F172A] text-white rounded-xl font-semibold text-[13px] tracking-[0.12em] mt-8 hover:bg-[#1E293B] active:scale-[0.99] transition-all"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          LOG IN TO DASHBOARD
        </button>

        <p className="text-center text-sm text-[#64748B] mt-6 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
          {"Don't have an account? "}
          <button
            onClick={() => onNavigate("signup")}
            className="text-[#0F172A] font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Screen 2: Sign Up ────────────────────────────────────────────────────────

function SignUpScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [accepted, setAccepted] = useState(false);

  const fields = [
    { label: "Full Name", placeholder: "Nguyen Van An", Icon: User, type: "text" },
    { label: "Choose Username", placeholder: "drone_op_001", Icon: User, type: "text" },
    { label: "Gmail Address", placeholder: "operator@coldchain.io", Icon: Mail, type: "email" },
    { label: "Create Password", placeholder: "••••••••••••", Icon: Lock, type: "password" },
    { label: "Confirm Final Password", placeholder: "••••••••••••", Icon: Lock, type: "password" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <StatusBar />
      <div className="flex-1 flex flex-col px-6 overflow-y-auto">
        <div className="mt-4">
          <BackButton onPress={() => onNavigate("login")} />
        </div>

        <div className="mt-6 mb-7">
          <h1 className="text-[22px] font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
            Create Operator Profile
          </h1>
          <p className="text-sm text-[#64748B] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            Register new hardware node and pilot credentials
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {fields.map(({ label, placeholder, Icon, type }) => (
            <div key={label}>
              <label className="block text-[11px] font-semibold text-[#0F172A] uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                {label}
              </label>
              <div className="relative">
                <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full h-14 bg-white border border-[#CBD5E1] rounded-xl pl-11 pr-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/8 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>
            </div>
          ))}

          {/* Terms checkbox — immediately below confirm password */}
          <div className="flex items-start gap-3 pt-1">
            <div
              onClick={() => setAccepted(!accepted)}
              className={`w-5 h-5 mt-0.5 border-2 rounded flex items-center justify-center cursor-pointer flex-shrink-0 transition-colors ${
                accepted ? "bg-[#0F172A] border-[#0F172A]" : "bg-white border-[#CBD5E1] hover:border-[#94A3B8]"
              }`}
            >
              {accepted && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p className="text-sm text-[#64748B] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              I accept the operational terms and data privacy conditions
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate("dashboard")}
          className="w-full h-14 bg-[#0F172A] text-white rounded-xl font-semibold text-[13px] tracking-[0.1em] mt-6 mb-8 hover:bg-[#1E293B] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          INITIALIZE PROFILE
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Dashboard ──────────────────────────────────────────────────────

function DashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const cards = [
    { title: "Thermal Profile", value: "-25.2°C", sub: "Baseline", nav: "thermal" as Screen },
    { title: "Frost Monitor", value: "100%", sub: "Node Sync", nav: "frost" as Screen },
    { title: "Automated OCR", value: "99.4%", sub: "Success Rate", nav: "scanner" as Screen },
    { title: "Structural Integrity", value: "0", sub: "Active Breaches", nav: "integrity" as Screen },
  ];

  const icons = [
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#94A3B8" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3C7 3 5 6 5 8.5c0 1.5.5 3 2 4l3 3 3-3c1.5-1 2-2.5 2-4C15 6 13 3 10 3z" stroke="#94A3B8" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#94A3B8" strokeWidth="1.5"/><circle cx="10" cy="10" r="2.5" stroke="#94A3B8" strokeWidth="1.5"/></svg>,
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="4" width="12" height="12" rx="2" stroke="#94A3B8" strokeWidth="1.5"/><path d="M7 10h6M10 7v6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto pb-[76px]">
        <StatusBar />

        {/* Status strip */}
        <div className="mx-4 mt-3 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-[12px] font-semibold text-[#10B981]" style={{ fontFamily: "Inter, sans-serif" }}>
                Drone Node: Online
              </span>
            </div>
            <span className="text-[12px] font-semibold text-[#0F172A]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              -25°C
            </span>
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-[#10B981]" />
              <span className="text-[12px] text-[#64748B]" style={{ fontFamily: "Inter, sans-serif" }}>
                0 Active Faults
              </span>
            </div>
          </div>
        </div>

        {/* Page header */}
        <div className="px-5 mt-6 mb-4">
          <h1 className="text-[20px] font-bold text-[#0F172A] tracking-tight" style={{ fontFamily: "Inter, sans-serif" }}>
            Operations Gateway
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            Mekong Export Hub · Node Active
          </p>
        </div>

        {/* 4-card grid */}
        <div className="px-4 grid grid-cols-2 gap-3">
          {cards.map((card, i) => (
            <button
              key={card.title}
              onClick={() => onNavigate(card.nav)}
              className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#CBD5E1] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] active:scale-[0.98] transition-all"
            >
              <div className="mb-3">{icons[i]}</div>
              <p className="text-[11px] text-[#64748B] font-medium leading-none mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                {card.title}
              </p>
              <p className="text-[22px] font-bold text-[#0F172A] leading-none" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                {card.value}
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                {card.sub}
              </p>
            </button>
          ))}
        </div>

        {/* Recent activity */}
        <div className="px-5 mt-6">
          <h2 className="text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.1em] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Recent Activity
          </h2>
          <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
            {[
              { text: "Drone D-07 completed scan of Zone A", time: "2m ago", dot: "#10B981" },
              { text: "Thermal anomaly flagged: Row 14, Tier 3", time: "14m ago", dot: "#F59E0B" },
              { text: "Batch VN-2026-99X verified & committed to WMS", time: "31m ago", dot: "#10B981" },
              { text: "HCMC Processing Hub: frost alert dispatched", time: "1h ago", dot: "#EF4444" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3.5 border-b border-[#F1F5F9] last:border-0">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.dot }} />
                <p className="text-[13px] text-[#0F172A] flex-1 leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item.text}
                </p>
                <span className="text-[11px] text-[#94A3B8] flex-shrink-0 mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Thermal Profiling ──────────────────────────────────────────────

function ThermalScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <StatusBar />
      <div className="flex items-center gap-3 px-5 mt-3 mb-4">
        <BackButton onPress={() => onNavigate("dashboard")} />
        <h1 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
          Thermal Profiling
        </h1>
      </div>

      {/* Zone selector */}
      <div className="mx-4 mb-4">
        <div className="bg-white border border-[#E2E8F0] rounded-xl px-4 h-12 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[13px] font-medium text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Chamber Zone: Zone A — Mekong Export Hub
          </span>
          <ChevronDown size={15} className="text-[#64748B] flex-shrink-0" />
        </div>
      </div>

      {/* Rack matrix card */}
      <div className="mx-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex-1 flex flex-col" style={{ maxHeight: "calc(100% - 260px)" }}>
        <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-[0.1em]" style={{ fontFamily: "Inter, sans-serif" }}>
            Storage Matrix — Zone A
          </span>
          <span className="text-[11px] font-semibold text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-md" style={{ fontFamily: "Inter, sans-serif" }}>
            1 Anomaly
          </span>
        </div>
        <div className="flex-1 overflow-hidden p-3">
          <svg width="100%" height="100%" viewBox="0 0 310 260" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="rack-grid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#F1F5F9" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="310" height="260" fill="url(#rack-grid)" />

            {/* Tier header labels */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((t) => (
              <text key={t} x={32 + t * 23 + 10} y={11} fontSize="7" fill="#94A3B8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
                T{t + 1}
              </text>
            ))}

            {/* Rack rows */}
            {Array.from({ length: 16 }, (_, r) => (
              <g key={r} transform={`translate(0, ${14 + r * 15})`}>
                <text x={26} y={11} fontSize="7" fill="#94A3B8" textAnchor="end" fontFamily="JetBrains Mono, monospace">
                  R{r + 1}
                </text>
                {Array.from({ length: 12 }, (_, t) => {
                  const isAnomaly = r === 13 && t === 2;
                  return (
                    <rect
                      key={t}
                      x={32 + t * 23}
                      y={2}
                      width={19}
                      height={11}
                      rx={2}
                      fill={isAnomaly ? "#FEF3C7" : "#F8FAFC"}
                      stroke={isAnomaly ? "#F59E0B" : "#E2E8F0"}
                      strokeWidth={isAnomaly ? 1.5 : 0.75}
                    />
                  );
                })}
              </g>
            ))}

            {/* Anomaly bounding box */}
            <rect
              x={30 + 2 * 23}
              y={14 + 13 * 15}
              width={23}
              height={15}
              rx={3}
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth={2}
            />

            {/* Anomaly callout */}
            <line x1={32 + 2 * 23 + 10} y1={14 + 13 * 15 + 16} x2={32 + 2 * 23 + 10} y2={248} stroke="#F59E0B" strokeWidth={0.75} strokeDasharray="2 2" />
            <text x={32 + 2 * 23 + 10} y={256} fontSize="7.5" fill="#F59E0B" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600">
              ⚠ Row 14, Tier 3
            </text>
          </svg>
        </div>
      </div>

      {/* Anomaly drawer */}
      <div className="mx-4 mt-3 mb-[84px] bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
        <button
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-[#F59E0B]" />
            <span className="text-[13px] font-semibold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
              Anomalous Thermal Drift Detected
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`text-[#64748B] transition-transform duration-200 ${drawerOpen ? "rotate-180" : ""}`}
          />
        </button>
        {drawerOpen && (
          <div className="px-4 pb-4 border-t border-[#F1F5F9]">
            <div className="flex gap-6 my-3">
              <div>
                <p className="text-[11px] text-[#64748B] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Current</p>
                <p className="text-[22px] font-bold text-[#EF4444]" style={{ fontFamily: "JetBrains Mono, monospace" }}>-15°C</p>
              </div>
              <div className="w-px bg-[#E2E8F0]" />
              <div>
                <p className="text-[11px] text-[#64748B] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Baseline Target</p>
                <p className="text-[22px] font-bold text-[#0F172A]" style={{ fontFamily: "JetBrains Mono, monospace" }}>-25°C</p>
              </div>
            </div>
            <button className="w-full h-12 bg-[#F59E0B] text-white rounded-xl font-semibold text-[13px] tracking-wide hover:bg-[#D97706] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
              Deploy Audit Drone
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 5: Frost & Ice Detection ─────────────────────────────────────────

function FrostScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const facilities = [
    { name: "Hanoi Central Depot", sync: "09:14:22", status: "Compliant", critical: false },
    { name: "Da Nang Hub #4", sync: "09:12:05", status: "Compliant", critical: false },
    { name: "HCMC Processing Hub", sync: "08:58:31", status: "Critical Frost", critical: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <div className="flex-1 overflow-y-auto pb-[76px]">
        <StatusBar />
        <div className="flex items-start gap-3 px-5 mt-3 mb-5">
          <BackButton onPress={() => onNavigate("dashboard")} />
          <div>
            <h1 className="text-[18px] font-bold text-[#0F172A] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
              Cryogenic Asset Health Monitoring
            </h1>
            <p className="text-[12px] text-[#64748B] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              National vaccine storage infrastructure oversight
            </p>
          </div>
        </div>

        {/* Thermal envelope */}
        <div className="mx-4 mb-4 bg-white border border-[#E2E8F0] rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <span className="text-[12px] text-[#64748B]" style={{ fontFamily: "Inter, sans-serif" }}>
            Thermal Envelope
          </span>
          <span className="text-[13px] font-bold text-[#0F172A]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            -25°C → -15°C
          </span>
        </div>

        {/* Table */}
        <div className="mx-4 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="flex items-center px-4 py-2.5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em] flex-1" style={{ fontFamily: "Inter, sans-serif" }}>
              Facility
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.1em]" style={{ fontFamily: "Inter, sans-serif" }}>
              Health Status
            </span>
          </div>

          {facilities.map((f, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center px-4 py-4 border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC] transition-colors text-left"
                onClick={() => setExpanded(expanded === f.name ? null : f.name)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {f.name}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Sync: {f.sync}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {f.critical ? (
                    <span className="text-[11px] font-semibold text-white bg-[#EF4444] px-2.5 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
                      Critical Frost
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
                      Compliant
                    </span>
                  )}
                  <ChevronDown size={13} className={`text-[#94A3B8] transition-transform duration-200 ${expanded === f.name ? "rotate-180" : ""}`} />
                </div>
              </button>

              {expanded === f.name && f.critical && (
                <div className="px-4 pb-4 bg-[#FFF5F5] border-b border-[#F1F5F9]">
                  <div className="flex items-start gap-2.5 pt-3">
                    <AlertTriangle size={14} className="text-[#EF4444] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-semibold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
                        Evaporator coil ice build-up detected.
                      </p>
                      <p className="text-[12px] text-[#64748B] mt-1 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        Airflow velocity degraded by 22%. Predictive maintenance ticket auto-dispatched.
                      </p>
                      <span className="inline-block mt-2.5 text-[11px] font-semibold text-[#EF4444] border border-[#EF4444]/25 bg-white rounded-lg px-2.5 py-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        Ticket #MT-2026-04811
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mx-4 mt-4 grid grid-cols-3 gap-2.5">
          {[
            { label: "Total Nodes", value: "3" },
            { label: "Compliant", value: "2", color: "#10B981" },
            { label: "Critical", value: "1", color: "#EF4444" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E2E8F0] rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-[22px] font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: s.color ?? "#0F172A" }}>
                {s.value}
              </p>
              <p className="text-[11px] text-[#64748B] mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: OCR Scanner ────────────────────────────────────────────────────

function ScannerScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [committed, setCommitted] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0D1117] relative overflow-hidden">
      <div className="px-5 flex-shrink-0">
        <StatusBar light />
        <div className="flex items-center justify-between py-2">
          <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
            Edge-AI OCR Scanner
          </span>
          <button onClick={() => onNavigate("dashboard")} className="text-white/50 hover:text-white/80 transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Camera viewfinder */}
      <div className="flex-1 relative mx-3 mb-3">
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[#1E293B]">
          {/* Simulated iced-over pallet backdrop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <div className="space-y-3 w-[240px]">
              {["▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "▓▓▓  ▓▓▓▓▓  ▓▓▓▓▓▓▓", "▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓", "▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓"].map((l, i) => (
                <div key={i} className="text-white/40 text-center font-mono text-sm tracking-[0.2em]">{l}</div>
              ))}
            </div>
          </div>

          {/* Scanning frame brackets */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[220px] h-[110px]">
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 border-[#6EE7B7] ${cls}`} />
              ))}

              {/* Animated scan line */}
              <div
                className="absolute inset-x-2 h-[1.5px] bg-gradient-to-r from-transparent via-[#6EE7B7] to-transparent"
                style={{ animation: "scanline 2s ease-in-out infinite" }}
              />

              {/* Frosted text being scanned */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <p className="text-[9px] text-white/25 font-mono tracking-[0.15em]">BATCH ID: VN-2026-99X</p>
                <p className="text-[9px] text-white/25 font-mono tracking-[0.15em]">EXPIRY: 12/2028</p>
                <p className="text-[9px] text-white/20 font-mono tracking-[0.15em]">MFG: BIOPACK VN</p>
              </div>
            </div>
          </div>

          {/* HUD overlays */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div>
              <p className="text-[9px] text-[#6EE7B7]/60 font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>LENS: 4.2mm f/1.8</p>
              <p className="text-[9px] text-white/30 font-mono mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>RES: 4K / 30fps</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#6EE7B7]/60 font-mono" style={{ fontFamily: "JetBrains Mono, monospace" }}>AI-OCR: ACTIVE</p>
              <p className="text-[9px] text-white/30 font-mono mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>CONF: 99.4%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data transcription panel */}
      <div className="mx-3 mb-3 bg-white rounded-2xl shadow-2xl overflow-hidden flex-shrink-0">
        <div className="px-4 pt-4 pb-3 border-b border-[#F1F5F9]">
          <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-[0.14em]" style={{ fontFamily: "Inter, sans-serif" }}>
            Logistics Compliance Transcription
          </p>
        </div>
        <div className="px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Batch ID</p>
              <p className="text-[14px] font-bold text-[#0F172A]" style={{ fontFamily: "JetBrains Mono, monospace" }}>VN-2026-99X</p>
            </div>
            <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
              VERIFIED
            </span>
          </div>
          <div className="h-px bg-[#F1F5F9]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase tracking-wide mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Expiry Date</p>
              <p className="text-[14px] font-bold text-[#0F172A]" style={{ fontFamily: "JetBrains Mono, monospace" }}>12/2028</p>
            </div>
            <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
              EXPORT COMPLIANT
            </span>
          </div>
        </div>
        <div className="px-4 pb-4">
          <button
            onClick={() => setCommitted(true)}
            className={`w-full h-12 rounded-xl font-semibold text-[12px] tracking-[0.1em] transition-all active:scale-[0.99] ${
              committed ? "bg-[#10B981] text-white" : "bg-[#334155] text-white hover:bg-[#1E293B]"
            }`}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {committed ? "✓ COMMITTED TO WMS DIGITAL LOG" : "COMMIT TO WMS DIGITAL LOG"}
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="scanner" onNavigate={onNavigate} />

      <style>{`
        @keyframes scanline {
          0%, 100% { transform: translateY(-42px); opacity: 0.2; }
          50% { transform: translateY(42px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Screen 7: Integrity & SLAM ───────────────────────────────────────────────

function IntegrityScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      <StatusBar />
      <div className="flex items-center gap-3 px-5 mt-3 mb-4">
        <BackButton onPress={() => onNavigate("dashboard")} />
        <h1 className="text-[18px] font-bold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
          Packaging &amp; Navigation
        </h1>
      </div>

      {/* Top 50% — Structural Integrity */}
      <div className="mx-4 mb-3 bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col" style={{ flex: "1 1 0", minHeight: 0 }}>
        <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between flex-shrink-0">
          <h2 className="text-[13px] font-bold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Pallet Structural Integrity
          </h2>
          <span className="text-[11px] font-semibold text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-md" style={{ fontFamily: "Inter, sans-serif" }}>
            1 Breach
          </span>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center">
          <svg width="100%" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
            {/* Pallet base */}
            <rect x="20" y="112" width="260" height="14" rx="2" fill="none" stroke="#CBD5E1" strokeWidth="1.25" />
            <line x1="70" y1="112" x2="70" y2="126" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="150" y1="112" x2="150" y2="126" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="230" y1="112" x2="230" y2="126" stroke="#CBD5E1" strokeWidth="1" />

            {/* Four cargo boxes */}
            {[[22, 48, 58, 62], [84, 48, 58, 62], [146, 48, 58, 62], [208, 48, 58, 62]].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.25" />
            ))}

            {/* Stretch wrap outline */}
            <rect x="20" y="46" width="260" height="66" rx="4" fill="none" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="5 3" />

            {/* Breach zone — solid red box */}
            <rect x="143" y="65" width="63" height="42" rx="3" fill="none" stroke="#EF4444" strokeWidth="2" />

            {/* Torn film indication */}
            <path d="M 155 78 L 168 73 L 172 83 L 186 78" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

            {/* Breach label */}
            <text x="175" y="97" fontSize="8" fill="#EF4444" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700">
              Torn Film Wrap
            </text>
            <text x="175" y="107" fontSize="7.5" fill="#EF4444" textAnchor="middle" fontFamily="Inter, sans-serif">
              Rack Section 04
            </text>

            {/* Dimension lines */}
            <line x1="16" y1="48" x2="16" y2="110" stroke="#E2E8F0" strokeWidth="0.75" />
            <text x="10" y="82" fontSize="6.5" fill="#94A3B8" textAnchor="middle" transform="rotate(-90,10,82)" fontFamily="JetBrains Mono, monospace">
              1800mm
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom 50% — SLAM Grid */}
      <div className="mx-4 mb-[84px] bg-white border border-[#E2E8F0] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col" style={{ flex: "1 1 0", minHeight: 0 }}>
        <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between flex-shrink-0">
          <h2 className="text-[13px] font-bold text-[#0F172A]" style={{ fontFamily: "Inter, sans-serif" }}>
            Visual SLAM Navigation Array
          </h2>
          <span className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0" style={{ animation: "pulse 2s ease-in-out infinite" }} />
        </div>

        <div className="flex-1 p-3 flex flex-col" style={{ minHeight: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="slam" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="300" height="120" fill="url(#slam)" />

            {/* Axes */}
            <line x1="150" y1="0" x2="150" y2="120" stroke="#E2E8F0" strokeWidth="0.75" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#E2E8F0" strokeWidth="0.75" />

            {/* Pathing vector */}
            <polyline
              points="20,95 40,84 65,78 88,62 110,55 130,50 150,46 170,42 195,38 218,34 242,36 262,42"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Anchor locators */}
            {[[65, 78], [150, 46], [218, 34]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="none" stroke="#10B981" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="2" fill="#10B981" />
              </g>
            ))}

            {/* Drone position */}
            <circle cx="262" cy="42" r="5.5" fill="#0F172A" />
            <circle cx="262" cy="42" r="11" fill="none" stroke="#0F172A" strokeWidth="0.75" strokeDasharray="3 3" />

            {/* Axis labels */}
            <text x="8" y="12" fontSize="7" fill="#94A3B8" fontFamily="JetBrains Mono, monospace">+Y</text>
            <text x="8" y="116" fontSize="7" fill="#94A3B8" fontFamily="JetBrains Mono, monospace">-Y</text>
            <text x="268" y="57" fontSize="7" fill="#94A3B8" fontFamily="JetBrains Mono, monospace">+X</text>
          </svg>

          {/* Status tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { label: "GPS: OFFLINE", color: "#EF4444" },
              { label: "SLAM Grid: ACTIVE", color: "#10B981" },
              { label: "Anchor Locators: Locked", color: "#10B981" },
            ].map((tag) => (
              <span
                key={tag.label}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md border"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: tag.color,
                  borderColor: `${tag.color}35`,
                  backgroundColor: `${tag.color}12`,
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const APP_SCREENS: Screen[] = ["dashboard", "thermal", "frost", "scanner", "integrity"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const isApp = APP_SCREENS.includes(screen);

  return (
    <div className="min-h-screen bg-slate-400 flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #64748B 0%, #475569 100%)" }}>
      {/* Phone shell */}
      <div className="relative w-[390px] h-[844px] rounded-[52px] shadow-[0_40px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden border-[7px] border-[#1E293B]">
        {/* Dynamic island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1E293B] rounded-b-3xl z-50" />

        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden" style={{ paddingTop: "28px" }}>
          <div className="relative w-full h-full">
            {screen === "login" && <LoginScreen onNavigate={setScreen} />}
            {screen === "signup" && <SignUpScreen onNavigate={setScreen} />}
            {screen === "dashboard" && <DashboardScreen onNavigate={setScreen} />}
            {screen === "thermal" && <ThermalScreen onNavigate={setScreen} />}
            {screen === "frost" && <FrostScreen onNavigate={setScreen} />}
            {screen === "scanner" && <ScannerScreen onNavigate={setScreen} />}
            {screen === "integrity" && <IntegrityScreen onNavigate={setScreen} />}

            {/* Bottom nav — all app screens except scanner which manages its own */}
            {isApp && screen !== "scanner" && (
              <BottomNav active={screen} onNavigate={setScreen} />
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-[4px] bg-[#1E293B]/60 rounded-full z-50" />
