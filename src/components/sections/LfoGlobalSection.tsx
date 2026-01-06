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
                {/* LFO MAIN */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Knob label="Rate" value={getVal('LFO_RATE')} min={0} max={127} onChange={(v) => handleParamChange('LFO_RATE', v)} color="#00ff41" />
                    <Knob label="Depth" value={getVal('LFO_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('LFO_DEPTH', v)} color="#00ff41" />
                    <Knob label="Wave" value={getVal('LFO_WAVE')} min={0} max={127} onChange={(v) => handleParamChange('LFO_WAVE', v)} color="#00ff41" />
                    <Knob label="Mode" value={getVal('LFO_MODE')} min={0} max={127} onChange={(v) => handleParamChange('LFO_MODE', v)} color="#00ff41" size={40} />
                </div>

                {/* LFO TOGGLES */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <Toggle
                        label="Sync"
                        value={getVal('LFO_SYNC') > 63}
                        onChange={(b) => handleParamChange('LFO_SYNC', b ? 127 : 0)}
                        color="#00ff41"
                    />
                    <Toggle
                        label="Key Trig"
                        value={getVal('LFO_KEY_TRIG') > 63}
                        onChange={(b) => handleParamChange('LFO_KEY_TRIG', b ? 127 : 0)}
                        color="#00ff41"
                    />
                </div>

                <div className="spacer" style={{ height: '20px', width: '100%', borderBottom: '1px solid #333', marginBottom: '10px' }}></div>
                <div className="section-header" style={{ width: '100%' }}>GLOBAL</div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    <Knob label="Porta Time" value={getVal('PORTA_TIME')} min={0} max={127} onChange={(v) => handleParamChange('PORTA_TIME', v)} color="#ffffff" />
                    <div style={{ paddingBottom: '5px' }}>
                        <Toggle
                            label="Porta On"
                            value={getVal('PORTA_SWITCH') > 63}
                            onChange={(b) => handleParamChange('PORTA_SWITCH', b ? 127 : 0)}
                            color="#ffffff"
                        />
                    </div>
                    <Knob label="Transpose" value={getVal('TRANSPOSE')} min={0} max={127} onChange={(v) => handleParamChange('TRANSPOSE', v)} color="#ffffff" size={50} />
                    <Knob label="Volume" value={getVal('VOLUME')} min={0} max={127} onChange={(v) => handleParamChange('VOLUME', v)} color="#ffffff" size={50} />
                </div>
            </div>
        </section>
    );
};
