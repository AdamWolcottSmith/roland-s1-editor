import React from 'react';

interface ToggleProps {
    label: string;
    value: boolean;
    onChange: (val: boolean) => void;
    color?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, value, onChange, color = '#00ff41' }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
                onClick={() => onChange(!value)}
                style={{
                    width: '40px',
                    height: '24px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: value ? `0 0 5px ${color}40` : 'none',
                    transition: 'all 0.2s ease'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: value ? '18px' : '2px',
                    width: '20px',
                    height: '20px',
                    background: value ? color : '#444',
                    borderRadius: '50%',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', userSelect: 'none' }}>
                {label}
            </span>
        </div>
    );
};
