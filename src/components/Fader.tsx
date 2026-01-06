import React, { useState, useEffect, useRef } from 'react';

interface FaderProps {
    min: number;
    max: number;
    value: number;
    label: string;
    onChange: (val: number) => void;
    height?: number;
    color?: string;
}

export const Fader: React.FC<FaderProps> = ({
    min, max, value, label, onChange,
    height = 150,
    color = '#ff0055' // Cyberpunk Red/Pink
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef<number>(0);
    const startValue = useRef<number>(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startY.current = e.clientY;
        startValue.current = value;
        document.body.style.cursor = 'ns-resize';
        e.stopPropagation();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const delta = startY.current - e.clientY;
            const range = max - min;
            const pxRange = (height - 30);
            const deltaValue = (delta / pxRange) * range;

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
    }, [isDragging, min, max, height, onChange]);

    const percent = (value - min) / (max - min);

    return (
        <div className="fader-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div
                className="fader-track"
                ref={trackRef}
                style={{
                    width: '36px',
                    height: height,
                    background: '#1a1a1a',
                    borderRadius: '4px',
                    position: 'relative',
                    border: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {/* Center Line */}
                <div style={{ width: '2px', height: '100%', background: '#222' }}></div>

                {/* Thumb */}
                <div
                    onMouseDown={handleMouseDown}
                    style={{
                        position: 'absolute',
                        bottom: `calc(${percent * 100}% - 14px)`, // Center thumb
                        left: '2px',
                        width: '30px',
                        height: '28px',
                        background: 'linear-gradient(180deg, #444, #222)',
                        border: '1px solid #555',
                        borderRadius: '3px',
                        cursor: 'ns-resize',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: isDragging ? 'none' : 'bottom 0.1s cubic-bezier(0.4, 0.0, 0.2, 1)'
                    }}
                >
                    <div style={{ width: '80%', height: '2px', background: color, boxShadow: `0 0 5px ${color}` }}></div>
                </div>
            </div>
            <span className="fader-label" style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', userSelect: 'none' }}>{label}</span>
        </div>
    );
};
