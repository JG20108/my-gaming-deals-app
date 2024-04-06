import { Range } from 'react-range';

interface RangeFilterDualProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const RangeFilterDual: React.FC<RangeFilterDualProps> = ({ label, min, max, step, value, onChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <label>{label}: {value[0]} - {value[1]}</label>
    <Range
      step={step}
      min={min}
      max={max}
      values={value}
      onChange={onChange}
      renderTrack={({ props, children }) => (
        <div {...props} style={{ ...props.style, height: '6px', width: '100%', backgroundColor: '#ccc' }}>
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div {...props} style={{ ...props.style, height: '20px', width: '20px', backgroundColor: '#999' }} />
      )}
    />
  </div>
);

export default RangeFilterDual;
