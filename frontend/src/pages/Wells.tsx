import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Droplets, ArrowUpRight } from 'lucide-react';
import { PageHeader, Panel, StatusBadge, DemoTag } from '../components/ui';
import { API_BASE_URL } from '../config';

interface Well {
  id: string;
  name: string;
  status: string;
  depth: number;
  reservoir_temperature: number;
  reservoir_pressure: number;
}

const Wells: React.FC = () => {
  const [wells, setWells] = useState<Well[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/wells`)
      .then((res) => setWells(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <p className="text-sm text-text-muted animate-pulse">Loading wells…</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Wells"
        subtitle={`${wells.length} wells registered in the Baghewala field.`}
        actions={<DemoTag />}
      />

      <Panel title="Well Directory" icon={Droplets} iconColor="text-primary" noPadding>
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
                    Open <ArrowUpRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
};

export default Wells;
