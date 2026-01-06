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
                    <Knob label="Level" value={getVal('DEL_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('DEL_LEVEL', v)} color="#aa00ff" size={50} />
                    <Knob label="Time" value={getVal('DEL_TIME')} min={0} max={127} onChange={(v) => handleParamChange('DEL_TIME', v)} color="#aa00ff" size={50} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7em', color: '#666', marginBottom: '5px' }}>REVERB</span>
                    <Knob label="Level" value={getVal('REV_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('REV_LEVEL', v)} color="#00ffaa" size={50} />
                    <Knob label="Time" value={getVal('REV_TIME')} min={0} max={127} onChange={(v) => handleParamChange('REV_TIME', v)} color="#00ffaa" size={50} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7em', color: '#666', marginBottom: '5px' }}>CHORUS</span>
                    <Knob label="Type" value={getVal('CHO_TYPE')} min={0} max={127} onChange={(v) => handleParamChange('CHO_TYPE', v)} color="#ffaa00" size={50} />
                </div>
            </div>
        </section>
    );
};
