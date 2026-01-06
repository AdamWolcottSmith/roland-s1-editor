import { useState, useEffect } from 'react';
import { midiManager } from './midi/MidiManager';
import { S1_CC_MAP } from './data/S1Mapping';
import { Knob } from './components/Knob';
import { Fader } from './components/Fader';
import './index.css';

function App() {
  const [midiReady, setMidiReady] = useState(false);
  const [connectedName, setConnectedName] = useState<string | null>(null);

  // State for all parameters
  const [params, setParams] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initial connection
    midiManager.init().then(success => {
      setMidiReady(success);
      const outputs = midiManager.getOutputs();
      if (outputs.length > 0) setConnectedName(outputs[0].name);
    });
  }, []);

  const handleParamChange = (key: string, value: number) => {
    // Update UI state
    setParams(prev => ({ ...prev, [key]: value }));

    // Send MIDI
    const mapping = S1_CC_MAP[key];
    if (mapping) {
      midiManager.sendCC(mapping.cc, value);
    }
  };

  const savePreset = () => {
    const data = JSON.stringify(params, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 's1-preset.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadPreset = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setParams(data);
        midiManager.sendBurst(data);
        console.log('Preset Loaded', data);
      } catch (err) {
        console.error('Failed to parse preset', err);
        alert('Invalid Preset File');
      }
    };
    reader.readAsText(file);
  };

  const getVal = (key: string) => params[key] ?? 0;

  return (
    <div className="app-container">
      <header className="status-bar">
        <div className="logo">
          <h1>ROLAND S-1 <span style={{ fontWeight: 300, fontSize: '0.8em', color: '#ff0055' }}>TWEAK EDITOR</span></h1>
        </div>
        <div className="connection-panel">
          <div className={`led ${midiReady ? 'on' : 'off'}`}></div>
          <span className="device-name">{connectedName || 'Searching...'}</span>
          <button onClick={() => midiManager.init()} style={{ marginLeft: '10px', fontSize: '0.8rem' }}>RESET MIDI</button>

          <div className="preset-controls" style={{ marginLeft: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={savePreset} style={{ fontSize: '0.8rem' }}>SAVE</button>
            <label className="file-upload">
              LOAD
              <input type="file" onChange={loadPreset} accept=".json" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      </header>

      <main className="synth-panel">
        {/* SECTION: OSCILLATOR & FILTER */}
        <section className="panel-section">
          <div className="section-header">OSCILLATOR & FILTER</div>
          <div className="controls-grid">
            <Knob label="Wave" value={getVal('LFO_WAVE')} min={0} max={255} onChange={(v) => handleParamChange('LFO_WAVE', v)} color="#00aaff" />
            <Knob label="Range" value={getVal('OSC_RANGE')} min={0} max={127} onChange={(v) => handleParamChange('OSC_RANGE', v)} color="#00aaff" />
            <Knob label="Pulse Width" value={getVal('OSC_PULSE_WIDTH')} min={0} max={127} onChange={(v) => handleParamChange('OSC_PULSE_WIDTH', v)} color="#00aaff" />
            <Knob label="Sub" value={getVal('MIX_SUB')} min={0} max={127} onChange={(v) => handleParamChange('MIX_SUB', v)} color="#00aaff" />

            <div className="spacer"></div>

            <Knob label="Cutoff" value={getVal('FILTER_CUTOFF')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_CUTOFF', v)} color="#ffaa00" size={70} />
            <Knob label="Resonance" value={getVal('FILTER_RES')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_RES', v)} color="#ffaa00" />
            <Knob label="Env Depth" value={getVal('FILTER_ENV_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('FILTER_ENV_DEPTH', v)} color="#ffaa00" />
          </div>
        </section>

        {/* SECTION: ENVELOPE */}
        <section className="panel-section">
          <div className="section-header">ENVELOPE (ADSR)</div>
          <div className="faders-row">
            <Fader label="A" value={getVal('ENV_ATTACK')} min={0} max={127} onChange={(v) => handleParamChange('ENV_ATTACK', v)} color="#ff0055" />
            <Fader label="D" value={getVal('ENV_DECAY')} min={0} max={127} onChange={(v) => handleParamChange('ENV_DECAY', v)} color="#ff0055" />
            <Fader label="S" value={getVal('ENV_SUSTAIN')} min={0} max={127} onChange={(v) => handleParamChange('ENV_SUSTAIN', v)} color="#ff0055" />
            <Fader label="R" value={getVal('ENV_RELEASE')} min={0} max={127} onChange={(v) => handleParamChange('ENV_RELEASE', v)} color="#ff0055" />
          </div>
        </section>

        {/* SECTION: LFO & GLOBAL */}
        <section className="panel-section">
          <div className="section-header">LFO / FX</div>
          <div className="controls-grid">
            <Knob label="LFO Rate" value={getVal('LFO_RATE')} min={0} max={127} onChange={(v) => handleParamChange('LFO_RATE', v)} color="#00ff41" />
            <Knob label="LFO Depth" value={getVal('LFO_MOD_DEPTH')} min={0} max={127} onChange={(v) => handleParamChange('LFO_MOD_DEPTH', v)} color="#00ff41" />
            <Knob label="Portamento" value={getVal('PORTAMENTO')} min={0} max={127} onChange={(v) => handleParamChange('PORTAMENTO', v)} color="#aa00ff" />
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '30px', color: '#555', fontSize: '0.8rem' }}>
        Roland S-1 Web Editor | v0.1.0 | No SysEx Support
      </footer>
    </div>
  );
}

export default App;
