import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { PageHeader, Panel, DemoTag, Button } from '../components/ui';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const paretoData = [
  { steamVolume: 1200, oilGain: 42.0, powerCost: 18.5, netMargin: 68.2 },
  { steamVolume: 1500, oilGain: 65.5, powerCost: 22.0, netMargin: 84.1 },
  { steamVolume: 1800, oilGain: 88.0, powerCost: 26.8, netMargin: 96.5 },
  { steamVolume: 2100, oilGain: 110.4, powerCost: 31.2, netMargin: 108.9 },
  { steamVolume: 2400, oilGain: 128.2, powerCost: 37.0, netMargin: 116.4 },
  { steamVolume: 2700, oilGain: 139.8, powerCost: 44.5, netMargin: 115.0 },
  { steamVolume: 3000, oilGain: 146.0, powerCost: 54.0, netMargin: 109.8 },
  { steamVolume: 3300, oilGain: 149.2, powerCost: 65.2, netMargin: 101.4 },
];

const scenarioComparisons = [
  { metric: 'Oil Rate (bbl/d)', baseline: 142.0, optimized: 178.5, maxPossible: 195.0 },
  { metric: 'Steam Vol (m³)', baseline: 2800, optimized: 2350, maxPossible: 3500 },
  { metric: 'SPM (strokes/min)', baseline: 6.2, optimized: 4.8, maxPossible: 8.0 },
  { metric: 'Power (kW)', baseline: 45.0, optimized: 34.2, maxPossible: 55.0 },
  { metric: 'OPEX Index ($/bbl)', baseline: 24.5, optimized: 18.2, maxPossible: 30.0 },
];

const Optimization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pareto' | 'comparison'>('pareto');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Optimization Engine"
        subtitle="CSS + SRP joint parameter optimization with constraint evaluation and predictive modeling."
        actions={
          <div className="flex items-center gap-2">
            <DemoTag />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded font-semibold">
              Prototype Module
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Projected Oil Uplift</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-status-success">+25.7%</span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +36.5 bbl/d
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Optimized vs baseline cycle</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Energy & Steam Savings</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-primary">-16.1%</span>
            <span className="text-xs text-text-muted font-mono">450 m³ Steam</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Reduced greenhouse footprint</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Net Margin Gain</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-status-success">+$2,480/d</span>
            <span className="text-xs text-text-muted font-mono">Per Well</span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">Calculated at $75/bbl oil</p>
        </div>

        <div className="bg-background border border-border rounded-lg p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Model Convergence</p>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-semibold font-mono text-text-main">100%</span>
            <span className="text-xs font-mono text-status-success flex items-center gap-0.5">
              <CheckCircle2 size={12} /> Solved
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-1">1,200 iterations evaluated</p>
        </div>
      </div>

      {/* Main Graph Panel */}
      <Panel
        title="Joint Optimization Response Surface & Pareto Frontier"
        icon={BarChart3}
        iconColor="text-primary"
        badge={
          <div className="flex items-center gap-2">
            <div className="flex bg-content border border-border rounded-md p-0.5 text-xs">
              <button
                onClick={() => setActiveTab('pareto')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'pareto' ? 'bg-background text-primary font-medium shadow-xs' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Pareto Curve
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'comparison' ? 'bg-background text-primary font-medium shadow-xs' : 'text-text-muted hover:text-text-main'
                }`}
              >
                Scenario Deltas
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text-muted pb-3 border-b border-border">
            <span>
              {activeTab === 'pareto'
                ? 'Evaluating Steam Volume (m³) vs Incremental Oil Recovery & Net Margin Frontier.'
                : 'Direct parameter comparison between current field setpoints and multi-variable recommended values.'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] bg-content border border-border px-2 py-0.5 rounded">
                Objective: Maximize Net Margin
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'pareto' ? (
                <AreaChart data={paretoData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="marginGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="oilGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis
                    dataKey="steamVolume"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(v) => `${v} m³`}
                  />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(value: any, name: any) => [`${value}`, name]}
                    labelFormatter={(label) => `Steam Injection Volume: ${label} m³`}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="netMargin"
                    name="Net Margin ($k/mo)"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#marginGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="oilGain"
                    name="Oil Gain (bbl/d)"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#oilGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="powerCost"
                    name="Power & Fuel Cost ($k/mo)"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3 }}
                  />
                </AreaChart>
              ) : (
                <BarChart data={scenarioComparisons} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="metric" stroke="#94A3B8" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="baseline" name="Current Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="optimized" name="Optimal Recommendation" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success" />
              <span>Optimal Operating Point: 2,400 m³ Steam Volume @ 4.8 SPM stroke speed.</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" icon={RotateCcw}>
                Reset
              </Button>
              <Button size="sm" variant="primary" icon={Play}>
                Apply Recommendation
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Optimization;

