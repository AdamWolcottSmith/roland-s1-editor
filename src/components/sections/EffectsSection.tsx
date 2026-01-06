import React from 'react';
import { Knob } from '../Knob';

interface Props {
    getVal: (key: string) => number;
    handleParamChange: (key: string, value: number) => void;
}

export const EffectsSection: React.FC<Props> = ({ getVal, handleParamChange }) => {
    return (
        <section className="panel-section">
            <div className="section-header">EFFECTS</div>
            <div className="controls-grid">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7em', color: '#666', marginBottom: '5px' }}>DELAY</span>
                    <Knob label="Level" value={getVal('DELAY_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('DELAY_LEVEL', v)} color="#aa00ff" size={50} />
                    <Knob label="Time" value={getVal('DELAY_TIME')} min={0} max={127} onChange={(v) => handleParamChange('DELAY_TIME', v)} color="#aa00ff" size={50} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7em', color: '#666', marginBottom: '5px' }}>REVERB</span>
                    <Knob label="Level" value={getVal('REVERB_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('REVERB_LEVEL', v)} color="#00ffaa" size={50} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7em', color: '#666', marginBottom: '5px' }}>CHORUS</span>
                    <Knob label="Level" value={getVal('CHORUS_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('CHORUS_LEVEL', v)} color="#ffaa00" size={50} />
                </div>
            </div>
        </section>
    );
};
