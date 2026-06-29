import React, { useState } from 'react';

export default function FloorPlanSelector({ selectedTable, onSelectTable }) {
  // Simulate some busy tables (e.g., tables 3, 5, and 8 are occupied)
  const occupiedTables = [3, 5, 8];

  const tables = [
    { id: 1, name: 'T-1 (Window)', x: 40, y: 40, r: 25, seats: 2 },
    { id: 2, name: 'T-2 (Window)', x: 120, y: 40, r: 25, seats: 2 },
    { id: 3, name: 'T-3 (Bar)', x: 220, y: 50, w: 60, h: 30, seats: 4 },
    { id: 4, name: 'T-4 (Booth)', x: 40, y: 120, w: 50, h: 50, seats: 6 },
    { id: 5, name: 'T-5 (Center)', x: 130, y: 120, r: 30, seats: 4 },
    { id: 6, name: 'T-6 (Center)', x: 220, y: 120, r: 30, seats: 4 },
    { id: 7, name: 'T-7 (Corner)', x: 40, y: 220, w: 50, h: 40, seats: 4 },
    { id: 8, name: 'T-8 (Window)', x: 120, y: 220, r: 25, seats: 2 },
    { id: 9, name: 'T-9 (VIP Room)', x: 220, y: 220, w: 60, h: 40, seats: 8 }
  ];

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-md)', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: 'var(--primary-color)' }}>Select Dining Table Layout</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Click on a table to reserve your preferred spot.</p>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#e2e8f0', borderRadius: '2px' }} />
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '2px' }} />
          <span>Occupied</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary-color)', borderRadius: '2px', boxShadow: '0 0 6px var(--primary-color)' }} />
          <span>Selected</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 300 280" style={{ maxWidth: '400px', width: '100%', border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '10px', backgroundColor: '#fafbfd' }}>
          {/* Wall / Door indications */}
          <line x1="0" y1="280" x2="100" y2="280" stroke="#94a3b8" strokeWidth="4" />
          <line x1="160" y1="280" x2="300" y2="280" stroke="#94a3b8" strokeWidth="4" />
          <text x="110" y="278" fill="#94a3b8" fontSize="8" fontWeight="700">ENTRANCE DOOR</text>

          {tables.map(table => {
            const isOccupied = occupiedTables.includes(table.id);
            const isSelected = selectedTable === table.id;
            
            let fill = '#e2e8f0';
            let stroke = '#cbd5e1';
            let cursor = 'pointer';
            
            if (isOccupied) {
              fill = '#fecaca';
              stroke = '#ef4444';
              cursor = 'not-allowed';
            } else if (isSelected) {
              fill = '#fca5a5';
              stroke = 'var(--primary-color)';
            }

            const handleClick = () => {
              if (isOccupied) {
                alert('Table is currently occupied. Please choose another one.');
                return;
              }
              onSelectTable(table.id);
            };

            const shapeProps = {
              fill,
              stroke,
              strokeWidth: isSelected ? 3 : 1.5,
              cursor,
              onClick: handleClick,
              style: { transition: 'all 0.3s ease' }
            };

            return (
              <g key={table.id}>
                {table.r ? (
                  <circle cx={table.x} cy={table.y} r={table.r} {...shapeProps} />
                ) : (
                  <rect x={table.x - table.w / 2} y={table.y - table.h / 2} width={table.w} height={table.h} rx="4" {...shapeProps} />
                )}
                {/* Table Label */}
                <text 
                  x={table.x} 
                  y={table.y + 3} 
                  textAnchor="middle" 
                  fill={isOccupied ? '#b91c1c' : isSelected ? 'var(--primary-dark)' : '#475569'} 
                  fontSize="8" 
                  fontWeight="700" 
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  T-{table.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
