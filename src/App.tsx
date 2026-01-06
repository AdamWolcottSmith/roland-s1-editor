import { useState, useEffect } from 'react';
import { midiManager } from './midi/MidiManager';
import { S1_CC_MAP } from './data/S1Mapping';
import { OscillatorSection } from './components/sections/OscillatorSection';
import { EnvelopeSection } from './components/sections/EnvelopeSection';
import { EffectsSection } from './components/sections/EffectsSection';
import { LfoGlobalSection } from './components/sections/LfoGlobalSection';
import './index.css';

function App() {
  const [midiReady, setMidiReady] = useState(false);
  const [connectedName, setConnectedName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'MAIN' | 'EFFECTS'>('MAIN');

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
    setParams(prev => ({ ...prev, [key]: value }));
    const mapping = S1_CC_MAP[key];
    if (mapping) {
      midiManager.sendCC(mapping.cc, value);
    }
  };

  const getVal = (key: string) => params[key] ?? 0;

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
        alert('Invalid Preset');
      }
    };
    reader.readAsText(file);
  };

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

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'MAIN' ? 'active' : ''}`}
          onClick={() => setActiveTab('MAIN')}
        >
          SYNTHESIS
        </button>
        <button
          className={`tab-btn ${activeTab === 'EFFECTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('EFFECTS')}
        >
          EFFECTS / GLOBAL
        </button>
      </div>

      <main className="synth-panel">
        {activeTab === 'MAIN' && (
          <>
            <OscillatorSection getVal={getVal} handleParamChange={handleParamChange} />
            <EnvelopeSection getVal={getVal} handleParamChange={handleParamChange} />
          </>
        )}

        {activeTab === 'EFFECTS' && (
          <>
            <EffectsSection getVal={getVal} handleParamChange={handleParamChange} />
            <LfoGlobalSection getVal={getVal} handleParamChange={handleParamChange} />
          </>
        )}
      </main>

      <footer style={{ marginTop: '30px', color: '#555', fontSize: '0.8rem' }}>
        Roland S-1 Web Editor | v0.2.0 | Extended Controls
      </footer>
    </div>
  );
}

export default App;
