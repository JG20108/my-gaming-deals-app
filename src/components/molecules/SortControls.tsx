import React from 'react';

export type SortField = 'dealRating' | 'salePrice' | 'savings';
export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

interface SortControlsProps {
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortOption,
  onSortChange,
}) => {
  const sortFields: { value: SortField; label: string }[] = [
    { value: 'dealRating', label: 'Deal Rating' },
    { value: 'salePrice', label: 'Sale Price' },
    { value: 'savings', label: 'Savings' },
  ];

  const sortDirections: { value: SortDirection; label: string }[] = [
    { value: 'desc', label: 'High to Low' },
    { value: 'asc', label: 'Low to High' },
  ];

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newField = event.target.value as SortField;
    onSortChange({
      field: newField,
      direction: sortOption.direction,
    });
  };

  const handleDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDirection = event.target.value as SortDirection;
    onSortChange({
      field: sortOption.field,
      direction: newDirection,
    });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label
        style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
      >
        Sort By
      </label>

      <div style={{ marginBottom: '10px' }}>
        <label
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
        >
          Field:
        </label>
        <select
          value={sortOption.field}
          onChange={handleFieldChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {sortFields.map((field) => (
            <option key={field.value} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}
        >
          Direction:
        </label>
        <select
          value={sortOption.direction}
          onChange={handleDirectionChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          {sortDirections.map((direction) => (
            <option key={direction.value} value={direction.value}>
              {direction.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortControls;
