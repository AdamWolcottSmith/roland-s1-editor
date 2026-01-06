import React from 'react';
import { Knob } from '../Knob';
import { Toggle } from '../Toggle';

interface Props {
    getVal: (key: string) => number;
    handleParamChange: (key: string, value: number) => void;
}

export const LfoGlobalSection: React.FC<Props> = ({ getVal, handleParamChange }) => {
    return (
        <section className="panel-section">
            <div className="section-header">LFO / GLOBAL</div>
            <div className="controls-grid">
                <Knob label="LFO Rate" value={getVal('LFO_RATE')} min={0} max={127} onChange={(v) => handleParamChange('LFO_RATE', v)} color="#00ff41" />
                <Knob label="LFO Depth" value={getVal('LFO_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('LFO_DEPTH', v)} color="#00ff41" />
                <Knob label="LFO Wave" value={getVal('LFO_WAVE')} min={0} max={255} onChange={(v) => handleParamChange('LFO_WAVE', v)} color="#00ff41" />

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '5px' }}>
                    <Toggle
                        label="Sync"
                        value={getVal('LFO_SYNC') > 63}
                        onChange={(b) => handleParamChange('LFO_SYNC', b ? 127 : 0)}
                        color="#00ff41"
                    />
                </div>

                <div className="spacer"></div>
                <Knob label="Porta" value={getVal('PORTA_TIME')} min={0} max={127} onChange={(v) => handleParamChange('PORTA_TIME', v)} color="#ffffff" />
                <Knob label="Vol" value={getVal('VOLUME')} min={0} max={127} onChange={(v) => handleParamChange('VOLUME', v)} color="#ffffff" />
            </div>
        </section>
    );
};
