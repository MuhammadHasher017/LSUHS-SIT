import React, { useState } from 'react';
import './SelectableChips.css';

const options = ['Age', 'Gender', 'Insurance', 'Test Date', 'Status: Active'];

const SelectableChips = () => {
  const [selected, setSelected] = useState({});

  const toggleSelect = (label) => {
    setSelected((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <div className="chip-container">
      {options.map((label) => (
        <div
          key={label}
          className={`chip ${selected[label] ? 'chip-selected' : ''}`}
          onClick={() => toggleSelect(label)}
        >
          <span className="chip-label">
            {label.includes(':') ? (
              <>
                {label.split(':')[0]}:{' '}
                <strong>{label.split(':')[1].trim()}</strong>
              </>
            ) : (
              label
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SelectableChips;
