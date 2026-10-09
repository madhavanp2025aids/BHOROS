import React from 'react';
import { Activity } from 'lucide-react';
import { PageHeader, Panel, DemoTag } from '../components/ui';

const DigitalTwin: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Digital Twin"
        subtitle="3D subsurface visualization and real-time well state representation."
        actions={<DemoTag />}
      />

      <Panel
        title="Subsurface Well Visualization — BW-101"
        icon={Activity}
        iconColor="text-primary"
        badge={<DemoTag />}
        noPadding
      >
        <div className="h-[600px] bg-gray-950 relative">
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

export default DigitalTwin;
