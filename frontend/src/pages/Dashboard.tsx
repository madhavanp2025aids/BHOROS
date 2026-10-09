import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Activity, AlertTriangle, ArrowUpRight, Droplets, TrendingDown } from 'lucide-react';
import { PageHeader, KpiCard, Panel, StatusBadge, DemoTag, EmptyState } from '../components/ui';
import { API_BASE_URL } from '../config';

interface Well {
  id: string;
  name: string;
  status: string;
  depth: number;
  reservoir_temperature: number;
  reservoir_pressure: number;
}

interface Anomaly {
  id: number;
  well_id: string;
  anomaly_type: string;
  severity: string;
  timestamp: string;
  subsystem: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [wells, setWells] = useState<Well[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wellsRes, anomaliesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/wells`),
          axios.get(`${API_BASE_URL}/anomalies`),
        ]);
        setWells(wellsRes.data);
        setAnomalies(anomaliesRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-text-muted animate-pulse">Loading command center data…</p>
      </div>
    );
  }

  const activeWells = wells.filter((w) => w.status === 'Active').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Command Center"
        subtitle="Fleet-wide operational overview and active alerts."
        actions={<DemoTag />}
      />

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active Wells" value={activeWells} icon={Droplets} iconColor="text-primary" />
        <KpiCard label="Total Wells" value={wells.length} icon={Droplets} iconColor="text-text-muted" />
        <KpiCard label="Active Anomalies" value={anomalies.length} icon={AlertTriangle} iconColor="text-status-warning" />
        <KpiCard label="Critical Alerts" value={anomalies.filter((a) => a.severity === 'CRITICAL').length} icon={TrendingDown} iconColor="text-status-critical" />
      </div>

      {/* ── Active Anomalies ── */}
      <Panel title="Active Anomalies" icon={Activity} iconColor="text-status-warning">
        {anomalies.length === 0 ? (
          <EmptyState icon={Activity} title="No Active Anomalies" message="All monitored parameters are within normal operating ranges." />
        ) : (
          <div className="-m-5">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Well</th>
                  <th>Subsystem</th>
                  <th>Anomaly</th>
                  <th>Severity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {anomalies.map((a) => (
                  <tr key={a.id} className="hover:bg-content/60 transition-colors">
                    <td className="font-mono text-xs tabular-nums">{new Date(a.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                    <td>
                      <Link to={`/wells/${a.well_id}`} className="font-medium text-primary hover:underline">{a.well_id}</Link>
                    </td>
                    <td className="text-text-muted">{a.subsystem}</td>
                    <td>{a.anomaly_type}</td>
                    <td>
                      <StatusBadge label={a.severity} severity={a.severity.toLowerCase() as any} />
                    </td>
                    <td>
                      <Link to={`/wells/${a.well_id}`} className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1">
                        Investigate <ArrowUpRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* ── Fleet Overview ── */}
      <Panel title="Fleet Overview" icon={Droplets} iconColor="text-primary" badge={<DemoTag />}>
        <div className="-m-5">
          <table className="data-table">
            <thead>
              <tr>
                <th>Well ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Depth (m)</th>
                <th>Reservoir Temp (°C)</th>
                <th>Reservoir Press (bar)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wells.map((well) => (
                <tr key={well.id} className="hover:bg-content/60 transition-colors">
                  <td>
                    <Link to={`/wells/${well.id}`} className="font-mono font-medium text-primary hover:underline">{well.id}</Link>
                  </td>
                  <td>{well.name}</td>
                  <td><StatusBadge label={well.status} severity="active" /></td>
                  <td className="font-mono tabular-nums">{well.depth.toFixed(1)}</td>
                  <td className="font-mono tabular-nums">{well.reservoir_temperature.toFixed(1)}</td>
                  <td className="font-mono tabular-nums">{well.reservoir_pressure.toFixed(1)}</td>
                  <td>
                    <Link to={`/wells/${well.id}`} className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1">
                      View <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
};

export default Dashboard;
