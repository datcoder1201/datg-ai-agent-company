import type { AgentApp, AgentInfo, AgentState, MachineHealth, MachineId, ProjectsSnapshot, QuotaSnapshot, RoleId, SiteStatus, SkillsSnapshot } from "../shared/types.ts";

interface DemoSeat {
  app: AgentApp;
  machine: MachineId;
  project: string;
  role: RoleId;
  title: string;
  steps: string[];
  question?: { text: string; options: string[] };
}

const SEATS: DemoSeat[] = [
  { app: "claude", machine: "WORKSTATION", project: "datg-core", role: "frontend", title: "Giao diện 3D Trụ Sở DatG Corp", steps: ["Coding Three.js Canvas UI", "Tối ưu render WebGL 60fps", "Kiểm định giao diện Impeccable"] },
  { app: "codex", machine: "WORKSTATION", project: "openclaw-gateway", role: "backend", title: "OpenClaw AI Gateway 50+ kênh", steps: ["Mở WebSocket Telegram Relay", "Đồng bộ đa kênh", "Kiểm thử API Gateway"] },
  { app: "claude", machine: "WORKSTATION", project: "strix-secops", role: "test", title: "Strix Autonomous AI Pentest", steps: ["Rà quét cổng VPS", "Kiểm tra mã hóa API keys"], question: { text: "Phát hiện port VPS chưa bật token bảo mật. Sếp Đạt có duyệt chặn ngay không?", options: ["Duyệt chặn ngay", "Đưa vào danh sách theo dõi", "Bỏ qua"] } },
  { app: "antigravity", machine: "WORKSTATION", project: "datg-core", role: "uiux", title: "Bộ nhận diện 418 AI Agent", steps: ["Khắc logo Chủ tịch Đạt", "Hiệu chỉnh vật liệu Three.js"] },
  { app: "codex", machine: "LAPTOP", project: "mql5-quant", role: "backend", title: "Phó Chủ tịch: EA Trading SMC Order Block", steps: ["Backtest chiến lược MT5 MQL5", "Kiểm tra rủi ro equity 1%"] },
  { app: "claude", machine: "LAPTOP", project: "datg-docs", role: "content", title: "Phó Chủ tịch: Báo cáo Tác chiến Toàn Tập đoàn", steps: ["Soạn thảo hồ sơ chiến lược", "Cập nhật War Room"] },
  { app: "claude", machine: "LAPTOP", project: "media-studio", role: "ai", title: "Phó Chủ tịch: Dựng video OpenMontage", steps: ["Render video Wan2.1 ComfyUI", "Nhân bản giọng nói GPT-SoVITS"], question: { text: "Phó Chủ tịch đề xuất: Kích hoạt pipeline render video ngắn TikTok/Reels tự động?", options: ["Chủ tịch Đạt duyệt ngay", "Yêu cầu chỉnh sửa kịch bản"] } },
  { app: "codex", machine: "SERVER", project: "datg-infra", role: "devops", title: "Triển khai cụm VPS máy chủ DatG", steps: ["Cấu hình Tailscale Mesh VPN", "Khởi động Docker containers"] },
  { app: "claude", machine: "SERVER", project: "datg-infra", role: "data", title: "TradingAgents Hedge Fund Sentiment", steps: ["Phân tích tin tức tài chính", "Cập nhật dữ liệu thị trường"] },
  { app: "antigravity", machine: "SERVER", project: "datg-infra", role: "system", title: "Giám sát hệ sinh thái 418 Agent", steps: ["Kiểm tra CPU, RAM, GPU Nvidia", "Thực thi kiểm tra định kỳ"] },
  { app: "codex", machine: "SERVER", project: "rea-reverse", role: "system", title: "Dịch ngược với Siêu Vũ Khí REA", steps: ["Bóc tách nhị phân PE/ELF", "Decompile bytecode an toàn"] },
];

const MACHINES: { id: MachineId; os: string; cpuModel: string; cores: number; memTotal: number; diskTotal: number; lanIp: string; tailscaleIp: string }[] = [
  { id: "WORKSTATION", os: "Windows (Chủ tịch Đạt - Laptop HQ)", cpuModel: "Intel Core i5-10500H @ 2.50GHz (12 Cores)", cores: 12, memTotal: 24 * 2 ** 30, diskTotal: 512 * 2 ** 30, lanIp: "192.168.1.20", tailscaleIp: "100.64.0.10" },
  { id: "LAPTOP", os: "Windows/PC (Phó Chủ tịch - Tác chiến HQ)", cpuModel: "AMD Ryzen 9 / Intel Core i9 (16 Cores)", cores: 16, memTotal: 32 * 2 ** 30, diskTotal: 1000 * 2 ** 30, lanIp: "192.168.1.30", tailscaleIp: "100.64.0.11" },
  { id: "SERVER", os: "Ubuntu 24.04 (Hạ Tầng Strix Datacenter)", cpuModel: "AMD EPYC 32-Core Server", cores: 64, memTotal: 128 * 2 ** 30, diskTotal: 4000 * 2 ** 30, lanIp: "192.168.1.40", tailscaleIp: "100.64.0.12" },
];

function wave(now: number, periodMs: number, offset: number): number {
  return (Math.sin((now / periodMs + offset) * Math.PI * 2) + 1) / 2;
}

function stateOf(seat: DemoSeat, index: number, now: number): AgentState {
  if (seat.question) return "waiting";
  const phase = Math.floor(now / 45_000 + index * 1.7) % 6;
  return phase === 5 ? "idle" : phase % 2 === 0 ? "working" : "thinking";
}

export function demoAgents(now = Date.now()): AgentInfo[] {
  return SEATS.map((seat, index) => {
    const state = stateOf(seat, index, now);
    const step = seat.steps[Math.floor(now / 20_000 + index) % seat.steps.length];
    const at = new Date(now - (index % 4) * 40_000).toISOString();
    return {
      id: `${seat.app}:${seat.machine}:demo-${index}`,
      app: seat.app,
      machine: seat.machine,
      title: seat.title,
      project: seat.project,
      role: seat.role,
      state,
      detail: state === "idle" ? "Turn finished" : step,
      task: seat.title,
      cwd: `/work/${seat.project}`,
      sessionId: `demo-${index}`,
      parentId: null,
      updatedAt: at,
      lastActivityAt: at,
      files: [{ path: `/work/${seat.project}/${step.split(" ").pop() ?? "README.md"}`, at }],
      pending: state === "waiting" && seat.question ? { question: seat.question.text, options: seat.question.options, askedAt: new Date(now - 90_000 - index * 30_000).toISOString(), kind: "question" } : null,
    };
  });
}

export function demoHealth(now = Date.now()): MachineHealth[] {
  return MACHINES.map((machine, index) => ({
    id: machine.id,
    online: true,
    source: index === 0 ? "local" : "collector",
    cpu: Math.round(18 + 50 * wave(now, 90_000, index / 3)),
    cpuModel: machine.cpuModel,
    cores: machine.cores,
    memUsed: Math.round(machine.memTotal * (0.42 + 0.2 * wave(now, 120_000, index / 5))),
    memTotal: machine.memTotal,
    netRxBps: Math.round(2_000_000 * wave(now, 30_000, index / 2)),
    netTxBps: Math.round(600_000 * wave(now, 40_000, index / 4)),
    diskUsed: Math.round(machine.diskTotal * (0.38 + index * 0.12)),
    diskTotal: machine.diskTotal,
    gpu: null,
    os: machine.os,
    lanIp: machine.lanIp,
    tailscaleIp: machine.tailscaleIp,
    uptimeSec: 86_400 * (3 + index * 5) + 3_600 * index,
    checkedAt: new Date(now).toISOString(),
  }));
}

export function demoQuota(now = Date.now()): QuotaSnapshot {
  const reset = (hours: number) => new Date(now + hours * 3_600_000).toISOString();
  return {
    connected: true,
    fetchedAt: new Date(now).toISOString(),
    rows: [
      { app: "antigravity", account: "datg.founder.dat@example.com", window: "5h", remaining: 98, resetsAt: reset(4) },
      { app: "claude", account: "dicon.orchestrator@example.com", window: "Week", remaining: 89, resetsAt: reset(84) },
      { app: "codex", account: "quant.trader@example.com", window: "5h", remaining: 76, resetsAt: reset(2) },
      { app: "codex", account: "strix.secops@example.com", window: "Week", remaining: 94, resetsAt: reset(96) },
    ],
  };
}

export function demoSites(now = Date.now()): SiteStatus[] {
  const checkedAt = new Date(now).toISOString();
  return [
    { url: "https://datgcorp.example.com/", label: "datgcorp.vn (Trụ sở số)", status: 200, ok: true, latencyMs: 28, checkedAt, note: "" },
    { url: "https://trading.example.com/", label: "trading.datgcorp.vn (SMC Bot)", status: 200, ok: true, latencyMs: 35, checkedAt, note: "" },
    { url: "https://api.example.com/health", label: "api.datgcorp.vn (Gateway)", status: 200, ok: true, latencyMs: 19, checkedAt, note: "" },
  ];
}

export function demoSkills(): SkillsSnapshot {
  const groups = [
    { source: "Codex (DatG)", count: 345, names: ["datg-mql5-ea-quant-architect", "datg-rea-reverse-engineering", "datg-fastapi-backend-pro", "datg-ui-ux-pro-max", "datg-ecc-recipes"] },
    { source: "Antigravity", count: 38, names: ["scroll-world", "impeccable", "hallmark", "taste-skill", "gsap-core"] },
  ];
  return { connected: true, note: "", total: 383, groups };
}

export function demoProjects(now = Date.now()): ProjectsSnapshot {
  const day = (days: number) => new Date(now - days * 86_400_000).toISOString();
  return {
    connected: true,
    note: "",
    fetchedAt: new Date(now).toISOString(),
    repos: [
      { name: "C-ng-ty-c-ph-n-Dat-The-Gioi", url: "https://github.com/example/C-ng-ty-c-ph-n-Dat-The-Gioi", isPrivate: true, isArchived: false, pushedAt: day(0), release: { tag: "v3.0.0", publishedAt: day(2) }, deploy: { environment: "production", state: "success", at: day(0) }, ci: "success" },
      { name: "datg-core", url: "https://github.com/example/datg-core", isPrivate: false, isArchived: false, pushedAt: day(1), release: { tag: "v1.2.0", publishedAt: day(4) }, deploy: null, ci: "success" },
      { name: "mql5-quant", url: "https://github.com/example/mql5-quant", isPrivate: true, isArchived: false, pushedAt: day(0), release: { tag: "v2.1.0", publishedAt: day(3) }, deploy: { environment: "production", state: "success", at: day(1) }, ci: "success" },
      { name: "strix-secops", url: "https://github.com/example/strix-secops", isPrivate: true, isArchived: false, pushedAt: day(2), release: null, deploy: null, ci: "success" },
    ],
  };
}
