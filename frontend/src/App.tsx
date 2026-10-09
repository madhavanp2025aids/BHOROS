import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Droplets,
  Activity,
  BarChart3,
  Bell,
  Thermometer,
  Settings2,
  Wrench,
  FlaskConical,
  User,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Dashboard from './pages/Dashboard';
import WellView from './pages/WellView';
import Wells from './pages/Wells';
import DigitalTwin from './pages/DigitalTwin';
import Optimization from './pages/Optimization';
import AnomalyCenter from './pages/AnomalyCenter';

/* ─────────────────────── Sidebar Nav Item ─────────────────────── */
interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, exact }) => {
  const location = useLocation();
  const active = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        active
          ? 'bg-primary/8 text-primary font-medium'
          : 'text-text-muted hover:text-text-main hover:bg-content'
      }`}
    >
      <Icon size={18} strokeWidth={active ? 2 : 1.5} />
      {label}
    </Link>
  );
};

/* ─────────────────────── Sidebar Section ─────────────────────── */
const SidebarSection: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-1">
    <p className="px-3 mb-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-widest">{label}</p>
    <div className="space-y-0.5">{children}</div>
  </div>
);

/* ─────────────────────── App Shell ─────────────────────── */
const AppShell: React.FC = () => {
  return (
    <div className="flex h-screen bg-content">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-background border-r border-border flex flex-col shrink-0">
        {/* Brand */}
        <div className="h-14 flex items-center gap-2.5 px-5 border-b border-border shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Droplets size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-text-main leading-none tracking-tight">BHOROS</p>
            <p className="text-[9px] text-text-muted mt-0.5 uppercase tracking-widest">Baghewala Field</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-4">
          <SidebarSection label="Overview">
            <NavItem to="/" icon={LayoutDashboard} label="Command Center" exact />
            <NavItem to="/wells" icon={Droplets} label="Wells" />
          </SidebarSection>

          <SidebarSection label="Operations">
            <NavItem to="/digital-twin" icon={Activity} label="Digital Twin" />
            <NavItem to="/css" icon={Thermometer} label="CSS Management" />
            <NavItem to="/srp" icon={Settings2} label="SRP Management" />
          </SidebarSection>

          <SidebarSection label="Intelligence">
            <NavItem to="/anomalies" icon={Bell} label="Anomaly Center" />
            <NavItem to="/optimization" icon={BarChart3} label="Optimization" />
            <NavItem to="/simulation" icon={FlaskConical} label="What-If Simulation" />
          </SidebarSection>

          <SidebarSection label="System">
            <NavItem to="/maintenance" icon={Wrench} label="Maintenance" />
          </SidebarSection>
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-content border border-border flex items-center justify-center">
              <User size={14} className="text-text-muted" />
            </div>
            <div>
              <p className="text-xs font-medium text-text-main leading-none">Engineer</p>
              <p className="text-[10px] text-text-muted mt-0.5">Demo User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-text-muted tabular-nums">
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wells" element={<Wells />} />
            <Route path="/wells/:id" element={<WellView />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/anomalies" element={<AnomalyCenter />} />
            <Route path="/optimization" element={<Optimization />} />
            {/* Placeholder routes */}
            <Route path="/css" element={<PlaceholderPage title="CSS Management" subtitle="Cyclic Steam Stimulation monitoring and cycle management." />} />
            <Route path="/srp" element={<PlaceholderPage title="SRP Management" subtitle="Sucker Rod Pump performance tracking and diagnostics." />} />
            <Route path="/simulation" element={<PlaceholderPage title="What-If Simulation" subtitle="Parameter simulation engine for CSS + SRP scenarios." />} />
            <Route path="/maintenance" element={<PlaceholderPage title="Maintenance Intelligence" subtitle="Equipment tracking, failure history, and maintenance schedules." />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────── Placeholder / Under Development Page with Graphs ─────────────────────── */
const mockTelemetryData = [
  { time: '00:00', primary: 142.5, secondary: 88.2, baseline: 135.0, efficiency: 91.2 },
  { time: '02:00', primary: 148.2, secondary: 91.4, baseline: 136.1, efficiency: 92.0 },
  { time: '04:00', primary: 153.0, secondary: 94.8, baseline: 138.4, efficiency: 93.5 },
  { time: '06:00', primary: 161.4, secondary: 102.1, baseline: 140.2, efficiency: 95.1 },
  { time: '08:00', primary: 175.8, secondary: 114.6, baseline: 143.0, efficiency: 96.8 },
  { time: '10:00', primary: 182.3, secondary: 119.0, baseline: 145.5, efficiency: 97.4 },
  { time: '12:00', primary: 179.6, secondary: 116.8, baseline: 144.2, efficiency: 96.2 },
  { time: '14:00', primary: 174.1, secondary: 112.5, baseline: 142.8, efficiency: 94.8 },
  { time: '16:00', primary: 168.9, secondary: 107.3, baseline: 141.0, efficiency: 93.9 },
  { time: '18:00', primary: 162.2, secondary: 101.0, baseline: 139.5, efficiency: 92.7 },
  { time: '20:00', primary: 155.7, secondary: 96.4, baseline: 137.8, efficiency: 91.8 },
  { time: '22:00', primary: 146.3, secondary: 89.9, baseline: 135.5, efficiency: 90.5 },
];

const PlaceholderPage: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar'>('area');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [activeMetric, setActiveMetric] = useState<'primary' | 'secondary' | 'efficiency'>('primary');

  const metricConfig = {
    primary: { label: 'Operational Output / Rate', color: '#2563EB', unit: 'bbl/d' },
    secondary: { label: 'Pressure / Thermal Load', color: '#F59E0B', unit: 'bar' },
    efficiency: { label: 'System Efficiency Index', color: '#10B981', unit: '%' },
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-text-main tracking-tight">{title}</h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full font-semibold">
              Prototype Module
            </span>
          </div>
          <p className="text-sm text-text-muted mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted bg-content border border-border px-3 py-1.5 rounded-md font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            Live Simulated Telemetry
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Current Throughput</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-text-main">174.1</span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +8.4%
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Target baseline: 142.8 bbl/d</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Active System Load</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-status-warning">112.5</span>
            <span className="text-xs text-text-muted font-mono">bar / kN</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Operating in optimal threshold</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Estimated Efficiency</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-status-success">94.8%</span>
            <span className="text-xs text-text-muted font-mono">COP 3.2</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">+2.3% vs historic baseline</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Model Reliability</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-primary">98.9%</span>
            <span className="text-xs font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">R² = 0.98</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Calibrated on field sensors</p>
        </div>
      </div>

      {/* Main Graph Panel */}
      <div className="bg-background border border-border rounded-lg p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-main">Module Performance & Telemetry Graph</h3>
              <p className="text-xs text-text-muted">Real-time parameters, trend analysis & predictive confidence intervals</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Selector Buttons */}
            <div className="flex bg-content border border-border rounded-md p-0.5 text-xs">
              <button
                onClick={() => setActiveMetric('primary')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMetric === 'primary' ? 'bg-background text-primary font-medium shadow-xs' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Output Rate
              </button>
              <button
                onClick={() => setActiveMetric('secondary')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMetric === 'secondary' ? 'bg-background text-primary font-medium shadow-xs' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Load / Pressure
              </button>
              <button
                onClick={() => setActiveMetric('efficiency')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeMetric === 'efficiency' ? 'bg-background text-primary font-medium shadow-xs' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Efficiency
              </button>
            </div>

            {/* Chart Type Toggle */}
            <div className="flex bg-content border border-border rounded-md p-0.5 text-xs">
              <button
                onClick={() => setChartType('area')}
                className={`px-2 py-1 rounded ${chartType === 'area' ? 'bg-background font-medium text-text-main' : 'text-text-muted'}`}
                title="Area Chart"
              >
                Area
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2 py-1 rounded ${chartType === 'line' ? 'bg-background font-medium text-text-main' : 'text-text-muted'}`}
                title="Line Chart"
              >
                Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-2 py-1 rounded ${chartType === 'bar' ? 'bg-background font-medium text-text-main' : 'text-text-muted'}`}
                title="Bar Chart"
              >
                Bar
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex bg-content border border-border rounded-md p-0.5 text-xs">
              {(['24h', '7d', '30d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2 py-1 rounded uppercase font-mono ${
                    timeRange === r ? 'bg-primary text-white font-medium' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Rendering */}
        <div className="h-80 w-full mt-5">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={mockTelemetryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                  }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  name={metricConfig[activeMetric].label}
                  stroke={metricConfig[activeMetric].color}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#primaryGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  name="Baseline Target"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#baselineGradient)"
                />
              </AreaChart>
            ) : chartType === 'line' ? (
              <LineChart data={mockTelemetryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                  }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  name={metricConfig[activeMetric].label}
                  stroke={metricConfig[activeMetric].color}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  name="Baseline Target"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={mockTelemetryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px',
                  }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey={activeMetric} name={metricConfig[activeMetric].label} fill={metricConfig[activeMetric].color} radius={[4, 4, 0, 0]} />
                <Bar dataKey="baseline" name="Baseline Target" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Graph Sub-footer */}
        <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary" />
            <span>Telemetry data synchronized across active wells (BW-101 to BW-106).</span>
          </div>
          <span className="font-mono text-[11px] bg-content border border-border px-2 py-0.5 rounded">
            Sampling: 120s · Confidence: 99.4%
          </span>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
