import React from 'react';
import { Knob } from '../Knob';

interface Props {
    getVal: (key: string) => number;
    handleParamChange: (key: string, value: number) => void;
}

export const OscillatorSection: React.FC<Props> = ({ getVal, handleParamChange }) => {
    return (
        <section className="panel-section">
            <div className="section-header">OSCILLATOR</div>
            <div className="controls-grid">
                {/* MIXER */}
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <Knob label="Square" value={getVal('OSC_SQ_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_SQ_LEVEL', v)} color="#00aaff" size={50} />
                    <Knob label="Saw" value={getVal('OSC_SAW_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_SAW_LEVEL', v)} color="#00aaff" size={50} />
                    <Knob label="Sub" value={getVal('MIX_SUB')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB', v)} color="#00aaff" size={50} />
                    <Knob label="Noise" value={getVal('OSC_NOISE_LEVEL')} min={0} max={127} onChange={(v) => handleParamChange('OSC_NOISE_LEVEL', v)} color="#aaaaaa" size={50} />
                </div>

                {/* BASIC SHAPE & PITCH */}
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Knob label="Range" value={getVal('OSC_RANGE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_RANGE', v)} color="#00aaff" size={40} />
                    <Knob label="Fine" value={getVal('OSC_RANGE_FINE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_RANGE_FINE', v)} color="#00aaff" size={40} />
                    <Knob label="Bend" value={getVal('OSC_BEND_SENS')} min={0} max={127} onChange={(v) => handleParamChange('OSC_BEND_SENS', v)} color="#00aaff" size={40} />
                    <div className="spacer"></div>
                    <Knob label="P.Width" value={getVal('OSC_PULSE_WIDTH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PULSE_WIDTH', v)} color="#00eeff" size={40} />
                    <Knob label="PWM Src" value={getVal('OSC_PWM_SRC')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PWM_SRC', v)} color="#00eeff" size={40} />
                    <Knob label="LFO Mod" value={getVal('OSC_LFO_PITCH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_LFO_PITCH', v)} color="#00eeff" size={40} />
                </div>

                {/* DRAW / CHOP (Advanced) */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Knob label="Draw Mult" value={getVal('OSC_DRAW_MULTIPLY')} min={0} max={127} onChange={(v) => handleParamChange('OSC_DRAW_MULTIPLY', v)} color="#aa00ff" size={40} />
                    <Knob label="Chop Overt" value={getVal('OSC_CHOP_OVERTONE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_CHOP_OVERTONE', v)} color="#ff00aa" size={40} />
                    <Knob label="Chop Comb" value={getVal('OSC_CHOP_COMB')} min={0} max={127} onChange={(v) => handleParamChange('OSC_CHOP_COMB', v)} color="#ff00aa" size={40} />
                </div>

                {/* TYPES */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Knob label="Sub Type" value={getVal('MIX_SUB_TYPE')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB_TYPE', v)} color="#444444" size={40} />
                    <Knob label="Ns Type" value={getVal('OSC_NOISE_TYPE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_NOISE_TYPE', v)} color="#444444" size={40} />
                </div>

                <div className="spacer" style={{ height: '20px', width: '100%', borderBottom: '1px solid #333', marginBottom: '10px' }}></div>

                <div className="section-header" style={{ width: '100%' }}>FILTER</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Knob label="Cutoff" value={getVal('FILTER_CUTOFF')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_CUTOFF', v)} color="#ffaa00" size={60} />
                    <Knob label="Resonance" value={getVal('FILTER_RES')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_RES', v)} color="#ffaa00" size={60} />
                    <Knob label="Env Depth" value={getVal('FILTER_ENV_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_ENV_DEPTH', v)} color="#ffaa00" size={50} />
                    <Knob label="LFO Depth" value={getVal('FILTER_LFO_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_LFO_DEPTH', v)} color="#ffaa00" size={50} />
                    <Knob label="Key Follow" value={getVal('FILTER_KEY_FOLLOW')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_KEY_FOLLOW', v)} color="#ffaa00" size={40} />
                    <Knob label="Bend" value={getVal('FILTER_BEND_SENS')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_BEND_SENS', v)} color="#ffaa00" size={40} />
                </div>
            </div>
        </section>
    );
};
