import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';
import { ThresholdSlider } from '../ui/ThresholdSlider';
import { Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function DetectionEngineTab({
  initialPreferences = {
    autoFlagThreshold: 80,
    emailAlerts: true,
    compactTable: false,
    strictNLP: true,
    darkModeSimulation: false,
  },
  onSave,
}) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const { showToast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave(preferences);
    } else {
      showToast('Platform detection preferences saved.', 'success');
    }
  };

  return (
    <Card className="max-w-3xl">
      <CardHeader
        title="AI Detection & Sensitivity Controls"
        subtitle="Calibrate confidence thresholds and heuristic strictness"
      />
      <CardBody className="space-y-6">
        {/* Reusable Threshold Slider */}
        <ThresholdSlider
          label="Auto-Flag Probability Threshold"
          description="Reviews scoring above this percentage will be automatically quarantined for moderation."
          value={preferences.autoFlagThreshold}
          min={50}
          max={95}
          step={5}
          unit="%"
          onChange={(val) =>
            setPreferences({ ...preferences, autoFlagThreshold: val })
          }
        />

        <div className="border-t border-brand-border pt-4 space-y-4">
          <Toggle
            checked={preferences.strictNLP}
            onChange={(checked) =>
              setPreferences({ ...preferences, strictNLP: checked })
            }
            label="Strict Syntactic Clustering"
            description="Flags reviews with repeating sentence cadence or promotional exclamation bursts."
          />

          <Toggle
            checked={preferences.compactTable}
            onChange={(checked) =>
              setPreferences({ ...preferences, compactTable: checked })
            }
            label="Compact Table View"
            description="Increases row density on Review Explorer and Reports tables."
          />
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="sm"
          icon={Save}
          onClick={handleSave}
        >
          Update Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DetectionEngineTab;

