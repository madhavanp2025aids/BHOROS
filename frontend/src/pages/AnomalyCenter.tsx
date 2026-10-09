import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bell, ArrowUpRight } from 'lucide-react';
import { PageHeader, Panel, StatusBadge, DemoTag, EmptyState } from '../components/ui';
import { API_BASE_URL } from '../config';

interface Anomaly {
  id: number;
  well_id: string;
  timestamp: string;
  subsystem: string;
  anomaly_type: string;
  severity: string;
  detected_parameter: string;
  deviation: number;
  status: string;
  description: string;
}

const AnomalyCenter: React.FC = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/anomalies`)
      .then((res) => setAnomalies(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-text-muted animate-pulse">Loading anomaly data…</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Anomaly Center"
        subtitle="Active anomalies detected across all monitored wells."
        actions={<DemoTag />}
      />

      <Panel title="Active Anomalies" icon={Bell} iconColor="text-status-warning" noPadding>
        {anomalies.length === 0 ? (
          <div className="p-5">
            <EmptyState icon={Bell} title="No Active Anomalies" message="All monitored parameters are within normal operating ranges." />
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Well</th>
                <th>Subsystem</th>
                <th>Anomaly</th>
                <th>Parameter</th>
                <th>Deviation</th>
                <th>Severity</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {anomalies.map((a) => (
                <tr key={a.id} className="hover:bg-content/60 transition-colors">
                  <td className="font-mono text-xs tabular-nums">
                    {new Date(a.timestamp).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>
                    <Link to={`/wells/${a.well_id}`} className="font-mono font-medium text-primary hover:underline">{a.well_id}</Link>
                  </td>
                  <td className="text-text-muted">{a.subsystem}</td>
                  <td>{a.anomaly_type}</td>
                  <td className="font-mono text-xs">{a.detected_parameter}</td>
                  <td className="font-mono text-xs tabular-nums text-status-critical">{a.deviation.toFixed(1)}%</td>
                  <td><StatusBadge label={a.severity} severity={a.severity.toLowerCase() as any} /></td>
                  <td><StatusBadge label={a.status} severity={a.status === 'Active' ? 'warning' : 'active'} /></td>
                  <td>
                    <Link to={`/wells/${a.well_id}`} className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1">
                      Details <ArrowUpRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
};

export default AnomalyCenter;
