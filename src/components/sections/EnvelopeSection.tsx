import React from 'react';
import { Fader } from '../Fader';

interface Props {
    getVal: (key: string) => number;
    handleParamChange: (key: string, value: number) => void;
}

export const EnvelopeSection: React.FC<Props> = ({ getVal, handleParamChange }) => {
    return (
        <section className="panel-section">
            <div className="section-header">ENVELOPE (ADSR)</div>
            <div className="faders-row">
                <Fader label="A" value={getVal('ENV_ATTACK')} min={0} max={127} onChange={(v) => handleParamChange('ENV_ATTACK', v)} color="#ff0055" />
                <Fader label="D" value={getVal('ENV_DECAY')} min={0} max={127} onChange={(v) => handleParamChange('ENV_DECAY', v)} color="#ff0055" />
                <Fader label="S" value={getVal('ENV_SUSTAIN')} min={0} max={127} onChange={(v) => handleParamChange('ENV_SUSTAIN', v)} color="#ff0055" />
                <Fader label="R" value={getVal('ENV_RELEASE')} min={0} max={127} onChange={(v) => handleParamChange('ENV_RELEASE', v)} color="#ff0055" />
            </div>
        </section>
    );
};
