import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle, Activity, Settings2, ArrowLeft, Droplets, Thermometer, FlaskConical, BarChart3 } from 'lucide-react';
import { PageHeader, Panel, Metric, StatusBadge, DemoTag, Button, AlertBanner } from '../components/ui';
import { API_BASE_URL } from '../config';

interface WellData {
  id: string;
  name: string;
  status: string;
  depth: number;
  reservoir_temperature: number;
  reservoir_pressure: number;
}

interface ProductionData {
  id: number;
  well_id: string;
  timestamp: string;
  oil_rate: number;
  water_rate: number;
  gas_rate: number;
}

interface SRPData {
  id: number;
  well_id: string;
  timestamp: string;
  stroke_length: number;
  strokes_per_minute: number;
  vfd_setting: number;
  pump_efficiency: number;
  rod_load: number;
}

interface CSSData {
  id: number;
  well_id: string;
  cycle_number: number;
  start_date: string;
  steam_volume: number;
  injection_pressure: number;
  soak_time_days: number;
  status: string;
}

interface AnomalyData {
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

interface WellState {
  well: WellData;
  latest_production: ProductionData | null;
  latest_srp: SRPData | null;
  active_css: CSSData | null;
  active_anomalies: AnomalyData[];
}

const WellView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<WellState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/wells/${id}/state`);
        setState(res.data);
      } catch (err) {
        console.error('Error fetching well state', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchState();
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-text-muted animate-pulse">Loading well state…</p>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <AlertBanner severity="critical" title="Data Load Error" message={`Could not load data for well ${id}. Verify the backend is running.`} icon={AlertTriangle} />
      </div>
    );
  }

  const { well, latest_production, latest_srp, active_css, active_anomalies } = state;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title={well.name}
        subtitle={`${well.id}  ·  Depth: ${well.depth} m  ·  Reservoir: ${well.reservoir_temperature}°C / ${well.reservoir_pressure} bar`}
        breadcrumb={
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary transition-colors">
            <ArrowLeft size={14} /> Command Center
          </Link>
        }
        actions={
          <>
            <StatusBadge label={well.status} severity="active" />
            <DemoTag />
            <Button variant="secondary" icon={FlaskConical} size="sm">Simulate</Button>
            <Button variant="primary" icon={BarChart3} size="sm">Optimize</Button>
          </>
        }
      />

      {/* ── Anomaly Alert ── */}
      {active_anomalies.length > 0 && (
        <AlertBanner
          severity="warning"
          title={`Active Anomaly — ${active_anomalies[0].anomaly_type}`}
          message={active_anomalies[0].description}
          icon={AlertTriangle}
        />
      )}

      {/* ── Data Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Production */}
        <Panel title="Production" icon={Droplets} iconColor="text-primary">
          {latest_production ? (
            <div className="space-y-4">
              <Metric label="Oil Rate" value={latest_production.oil_rate.toFixed(1)} unit="bbl/d" />
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <Metric label="Water Rate" value={latest_production.water_rate.toFixed(1)} unit="bbl/d" />
                <Metric label="Gas Rate" value={latest_production.gas_rate.toFixed(1)} unit="Mscf/d" />
              </div>
              <p className="text-[10px] text-text-muted font-mono pt-1 border-t border-border">
                Last update: {new Date(latest_production.timestamp).toLocaleString('en-IN')}
              </p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No production data available.</p>
          )}
        </Panel>

        {/* SRP */}
        <Panel title="SRP Status" icon={Settings2} iconColor="text-status-info">
          {latest_srp ? (
            <div className="space-y-4">
              <Metric
                label="Pump Efficiency"
                value={`${(latest_srp.pump_efficiency * 100).toFixed(1)}%`}
                alert={latest_srp.pump_efficiency < 0.7}
              />
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <Metric label="SPM" value={latest_srp.strokes_per_minute} />
                <Metric label="Rod Load" value={latest_srp.rod_load.toFixed(0)} unit="kN" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <Metric label="Stroke Length" value={latest_srp.stroke_length} unit="m" />
                <Metric label="VFD Setting" value={latest_srp.vfd_setting} unit="Hz" />
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No SRP data available.</p>
          )}
        </Panel>

        {/* CSS */}
        <Panel title="CSS Cycle" icon={Thermometer} iconColor="text-status-warning">
          {active_css ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Metric label="Cycle" value={`#${active_css.cycle_number}`} />
                <StatusBadge label={active_css.status} severity={active_css.status === 'Producing' ? 'active' : 'info'} />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                <Metric label="Steam Volume" value={active_css.steam_volume.toFixed(0)} unit="m³" />
                <Metric label="Injection Press." value={active_css.injection_pressure.toFixed(1)} unit="bar" />
              </div>
              <div className="pt-3 border-t border-border">
                <Metric label="Soak Time" value={active_css.soak_time_days.toFixed(1)} unit="days" />
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No active CSS cycle.</p>
          )}
        </Panel>
      </div>

      {/* ── Digital Twin ── */}
      <Panel
        title="Digital Twin — Subsurface Visualization"
        icon={Activity}
        iconColor="text-primary"
        badge={<DemoTag />}
        noPadding
      >
        <div className="h-[480px] bg-gray-950 relative">
          <iframe
            src="/legacy/well-3d.html"
            className="absolute inset-0 w-full h-full border-0"
            title="Digital Twin 3D Visualization"
          />
        </div>
      </Panel>
    </div>
  );
};

export default WellView;
