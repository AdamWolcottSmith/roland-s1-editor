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
                {/* MIXER (Square, Saw, Sub, Noise) */}
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Knob label="Square" value={getVal('OSC_SQ_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_SQ_LEVEL', v)} color="#00aaff" size={50} />
                    <Knob label="Saw" value={getVal('OSC_SAW_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_SAW_LEVEL', v)} color="#00aaff" size={50} />
                    <Knob label="Sub" value={getVal('MIX_SUB')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB', v)} color="#00aaff" size={50} />
                    <Knob label="Noise" value={getVal('OSC_NOISE_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_NOISE_LEVEL', v)} color="#aaaaaa" size={50} />
                </div>

                {/* SHAPE */}
                <Knob label="P.Width" value={getVal('OSC_PULSE_WIDTH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PULSE_WIDTH', v)} color="#00eeff" />
                <Knob label="PWM LFO" value={getVal('OSC_PWM_SRC')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PWM_SRC', v)} color="#00eeff" />
                <Knob label="LFO Mod" value={getVal('OSC_LFO_PITCH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_LFO_PITCH', v)} color="#00eeff" />

                {/* NOISE/SUB TYPE (Selectors - mapped to Knobs for now until selector UI exists) */}
                <Knob label="Sub Type" value={getVal('MIX_SUB_TYPE')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB_TYPE', v)} color="#444444" size={40} />
                <Knob label="Ns Type" value={getVal('OSC_NOISE_TYPE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_NOISE_TYPE', v)} color="#444444" size={40} />

                <div className="spacer"></div>

                <Knob label="Cutoff" value={getVal('FILTER_CUTOFF')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_CUTOFF', v)} color="#ffaa00" size={70} />
                <Knob label="Resonance" value={getVal('FILTER_RES')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_RES', v)} color="#ffaa00" />
            </div>
        </section>
    );
};
