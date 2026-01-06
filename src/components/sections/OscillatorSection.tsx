import React from 'react';
import { Knob } from '../Knob';


interface Props {
    getVal: (key: string) => number;
    handleParamChange: (key: string, value: number) => void;
}

export const OscillatorSection: React.FC<Props> = ({ getVal, handleParamChange }) => {
    return (
        <section className="panel-section">
            <div className="section-header">OSCILLATOR & FILTER</div>
            <div className="controls-grid">
                {/* WAVE is handled via Knobs, assuming standard implementation where range selects wave or continuous */}
                <Knob label="Wave" value={getVal('OSC_WAVE')} min={0} max={255} onChange={(v) => handleParamChange('OSC_WAVE', v)} color="#00aaff" />
                <Knob label="Range" value={getVal('OSC_RANGE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_RANGE', v)} color="#00aaff" />
                <Knob label="Pulse Width" value={getVal('OSC_PULSE_WIDTH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PULSE_WIDTH', v)} color="#00aaff" />
                <Knob label="LFO Mod" value={getVal('OSC_LFO_PITCH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_LFO_PITCH', v)} color="#00aaff" />

                {/* MIXER */}
                <Knob label="Noise" value={getVal('MIX_NOISE')} min={0} max={127} onChange={(v) => handleParamChange('MIX_NOISE', v)} color="#aaaaaa" />
                <Knob label="Sub" value={getVal('MIX_SUB')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB', v)} color="#00aaff" />

                <div className="spacer"></div>

                <Knob label="Cutoff" value={getVal('FILTER_CUTOFF')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_CUTOFF', v)} color="#ffaa00" size={70} />
                <Knob label="Resonance" value={getVal('FILTER_RES')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_RES', v)} color="#ffaa00" />
                <Knob label="Env Depth" value={getVal('FILTER_ENV_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_ENV_DEPTH', v)} color="#ffaa00" />
            </div>
        </section>
    );
};
