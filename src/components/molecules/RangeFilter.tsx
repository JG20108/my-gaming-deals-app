import React from 'react';

interface RangeFilterProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number | null;
  onChange: (value: number) => void;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ label, min, max, step, value, onChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <label>{label}: {value ?? min}</label> 
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value || min}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

export default RangeFilter;