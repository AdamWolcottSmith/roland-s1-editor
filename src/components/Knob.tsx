import React, { useState, useEffect, useRef } from 'react';

interface KnobProps {
    min: number;
    max: number;
    value: number;
    label: string;
    onChange: (val: number) => void;
    size?: number;
    color?: string;
}

export const Knob: React.FC<KnobProps> = ({
    min, max, value, label, onChange,
    size = 60,
    color = '#00ff41' // Cyberpunk Green default
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef<number>(0);
    const startValue = useRef<number>(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startY.current = e.clientY;
        startValue.current = value;
        document.body.style.cursor = 'ns-resize';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const delta = startY.current - e.clientY;
            const range = max - min;
            const sensitivity = 200; // pixels for full range
            const deltaValue = (delta / sensitivity) * range;

            let newValue = startValue.current + deltaValue;
            newValue = Math.max(min, Math.min(max, newValue));

            onChange(Math.round(newValue));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.cursor = '';
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, min, max, onChange]);

    // Calculate rotation: 270 degrees range (-135 to 135)
    // 0 = -135deg, 127 = 135deg
    // min/max normalization
    const percent = (value - min) / (max - min);
    const angle = -135 + (percent * 270);

    return (
        <div className="knob-container" style={{ width: size, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
                className="knob-ring"
                onMouseDown={handleMouseDown}
                style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 180deg at 50% 50%, #333 0deg, #111 180deg, #333 360deg)',
                    position: 'relative',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    cursor: 'ns-resize',
                    border: '1px solid #444'
                }}
            >
                {/* Indicator Line Wrapper */}
                <div style={{
                    width: '100%', height: '100%',
                    transform: `rotate(${angle}deg)`,
                    pointerEvents: 'none',
                    transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(0.4, 0.0, 0.2, 1)'
                }}>
                    {/* The Tick */}
                    <div style={{
                        position: 'absolute',
                        top: '10%', left: 'calc(50% - 1.5px)',
                        width: '3px', height: '25%',
                        background: color,
                        borderRadius: '2px',
                        boxShadow: `0 0 8px ${color}`
                    }} />
                </div>
            </div>
            <div className="knob-label" style={{ marginTop: '8px', fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', userSelect: 'none', textAlign: 'center' }}>
                {label}
            </div>
            {/* Optional Value Display */}
            {/* <div className="knob-value" style={{ fontSize: '0.7em', color: '#666' }}>{Math.round(value)}</div> */}
        </div>
    );
};
