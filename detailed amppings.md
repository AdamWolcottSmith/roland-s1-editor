### MIDI Implementation for Roland S-1

The Roland S-1 supports MIDI over USB and TRS jacks (MIDI IN/OUT), with a focus on Control Changes (CCs) for parameter control, note triggering, pitch bend, program changes, and clock synchronization. It does not support System Exclusive (SysEx) messages for parameter editing, and no Non-Registered Parameter Numbers (NRPNs) are documented. The default MIDI channel is 3 for synth operations and 16 for program changes, but channels are configurable from 1–16.

MIDI notes are recognized and transmitted across the full range (0–127), with velocity support for Note On (but not Note Off). The device operates in MIDI Mode 3 (polyphonic). Active Sensing is supported for transmission and recognition.

#### MIDI Implementation Chart

This chart outlines transmitted and recognized MIDI messages:

| Function                  | Transmitted | Recognized | Remarks |
|---------------------------|-------------|------------|---------|
| **Basic Channel**        | Default: 3 (Synth), 16 (Program Change)<br>Changed: 1–16 | Default: 3 (Synth), 16 (Program Change)<br>Changed: 1–16 | Memorized |
| **Mode**                 | Default: Mode 3<br>Messages: x<br>Altered: x | Default: Mode 3<br>Messages: x<br>Altered: x | - |
| **Note Number**          | 0–127 (True Voice) | 0–127 (True Voice) | - |
| **Velocity**             | Note On: Yes<br>Note Off: No | Note On: Yes<br>Note Off: No | - |
| **Aftertouch**           | Key's: No<br>Channel's: No | Key's: No<br>Channel's: No | - |
| **Pitch Bend**           | No | Yes | - |
| **Control Change**       | Yes (Specific CCs: 1, 3, 5, 10–31, 64–65, 71–83, 85–87, 89–93, 102–107) | Yes | See Control Change List below for details |
| **Program Change**       | Yes (True Number: 0–63) | Yes (True Number: 0–63) | - |
| **System Exclusive**     | No | No | - |
| **System Common**        | Song Position: No<br>Song Select: No<br>Tune Request: No | Song Position: No<br>Song Select: No<br>Tune Request: No | - |
| **System Real Time**     | Clock: Yes<br>Start: Yes<br>Continue: No<br>Stop: Yes | Clock: Yes<br>Start: Yes<br>Continue: No<br>Stop: Yes | - |
| **Aux Messages**         | All Sound Off: Yes<br>Reset All Controllers: Yes<br>All Notes Off: No<br>Omni Mode Off: No<br>Omni Mode On: No<br>Mono Mode On: No<br>Poly Mode On: No<br>Active Sensing: Yes<br>System Reset: No | All Sound Off: Yes<br>Reset All Controllers: No<br>All Notes Off: No<br>Omni Mode Off: No<br>Omni Mode On: No<br>Mono Mode On: No<br>Poly Mode On: No<br>Active Sensing: Yes<br>System Reset: No | Transmitted when MIDI is offline |

#### Control Change (CC) Mappings

All CCs use a value range of 0–127 unless otherwise noted. Parameters are grouped by functional section for clarity. Each maps to specific hardware controls on the S-1 (e.g., knobs, pads with [SHIFT]). Orientation is typically 0-based (0 = minimum/off, 127 = maximum), except for centered parameters like Pan (64 = center).

##### Controls
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 1 | Modulation Wheel | Controls modulation depth (e.g., for vibrato or effects) | 0–127 | External modulation wheel |
| 10 | Pan | Adjusts stereo panning | 0–127 (centered) | Menu or external controller |
| 11 | Expression Pedal | Controls overall expression level | 0–127 | External expression pedal |
| 64 | Damper Pedal | Sustain/hold notes | 0–127 (0–63: Off, 64–127: On) | External damper pedal |

##### LFO
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 3 | LFO Rate | Adjusts LFO speed | 0–127 | LFO [RATE] knob |
| 12 | LFO Waveform | Selects LFO shape (e.g., saw, triangle, square, random) | 0–127 | LFO [WAVE FORM] knob |
| 17 | LFO Modulation Depth | Sets intensity of LFO modulation (e.g., vibrato depth) | 0–127 | [SHIFT] + Pad [15] (MENU) > LFO Modulation Depth |
| 79 | LFO Mode | Switches LFO modes (e.g., normal, fast) | 0–127 (0–63: Normal, 64–127: Fast) | [SHIFT] + Pad [15] (MENU) > LFO Mode; or [SHIFT] + LFO [RATE] knob |
| 105 | LFO Key Trigger | Enables/disables LFO retrigger on key press | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + Pad [15] (MENU) > LFO Key Trigger |
| 106 | LFO Sync Mode | Syncs LFO to tempo (added in firmware v1.02) | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + Pad [15] (MENU) > LFO Sync; or [SHIFT] + LFO [WAVE FORM] knob |

##### Voice/Polyphony
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 5 | Portamento Time | Sets glide time between notes | 0–127 | [SHIFT] + [PORTA TIME] pad |
| 31 | Portamento Mode | Selects portamento type (e.g., off, on, auto) | 0–127 (0: Off, 1–63: On, 64–127: Auto) | [SHIFT] + [PORTA ON] pad |
| 65 | Portamento Switch | Enables/disables portamento (similar to mode but binary) | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + [PORTA ON] pad |
| 77 | Keyboard Transpose | Transposes pitch in semitones | 0–127 (centered at 64: no transpose) | [SHIFT] + [STEP] (KEY TRANSPOSE) button |
| 80 | Polyphony Mode | Switches between mono, unison, poly, chord modes | 0–127 (e.g., 0–31: Mono, 32–63: Unison, etc.) | [SHIFT] + [POLY] pad > Poly Mode |
| 81 | Chord Mode Voice 2 On/Off | Enables/disables second voice in chord mode | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + [POLY] pad > Voice 2 SW |
| 82 | Chord Mode Voice 3 On/Off | Enables/disables third voice in chord mode | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + [POLY] pad > Voice 3 SW |
| 83 | Chord Mode Voice 4 On/Off | Enables/disables fourth voice in chord mode | 0–127 (0–63: Off, 64–127: On) | [SHIFT] + [POLY] pad > Voice 4 SW |
| 85 | Chord Mode Voice 2 Key Shift | Shifts second voice pitch in semitones | 0–127 (centered) | [SHIFT] + [POLY] pad > Voice 2 Key Shift |
| 86 | Chord Mode Voice 3 Key Shift | Shifts third voice pitch in semitones | 0–127 (centered) | [SHIFT] + [POLY] pad > Voice 3 Key Shift |
| 87 | Chord Mode Voice 4 Key Shift | Shifts fourth voice pitch in semitones | 0–127 (centered) | [SHIFT] + [POLY] pad > Voice 4 Key Shift |
| 93 | Chorus Type | Selects chorus effect type (off, 1–4) | 0–127 (0: Off, 1–31: Type 1, etc.) | [SHIFT] + Pad [15] (MENU) > Chorus |

##### Oscillators
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 13 | Oscillator LFO Pitch | LFO modulation depth for oscillator pitch | 0–127 | OSCILLATOR [LFO] knob |
| 14 | Oscillator Range | Sets oscillator octave range (64' to 2') | 0–127 | OSCILLATOR [RANGE] knob |
| 15 | Oscillator Square Pulse Width | Adjusts pulse width for square wave | 0–127 | [SHIFT] + [PWM DEPTH] pad; or [SHIFT] + OSCILLATOR [□] knob |
| 16 | Oscillator PWM Source | Selects PWM modulation source (e.g., Env, Manual, LFO) | 0–127 | [SHIFT] + [PWM SRC] pad |
| 18 | Oscillator Pitch Bend Sensitivity | Sets pitch bend range for oscillator (0–240 mapped to 0–127) | 0–127 | [SHIFT] + Pad [15] (MENU) > Oscillator Bend Sens |
| 19 | Oscillator Square Level | Volume of square waveform | 0–127 | OSCILLATOR [□] knob |
| 20 | Oscillator Saw Level | Volume of sawtooth waveform | 0–127 | OSCILLATOR [△] knob |
| 21 | Oscillator Sub Level | Volume of sub-oscillator | 0–127 | OSCILLATOR [SUB] knob |
| 22 | Oscillator Sub Octave Type | Selects sub-oscillator type/octave (-2 oct square A/C, -1 oct square C) | 0–127 | [SHIFT] + [SUB OCT] pad |
| 23 | Oscillator Noise Level | Volume of noise generator | 0–127 | OSCILLATOR [NOISE] knob |
| 76 | Oscillator Range Fine Tune | Fine pitch adjustment (±1 octave) | 0–127 (centered) | [SHIFT] + OSCILLATOR [RANGE] knob |
| 78 | Noise Mode | Selects noise type (pink, white) | 0–127 (0–63: Pink, 64–127: White) | [SHIFT] + Pad [15] (MENU) > Noise Mode; or [SHIFT] + OSCILLATOR [NOISE] knob |
| 102 | Oscillator Draw Multiply | Multiplies harmonics in draw mode | 0–127 | [SHIFT] + Pad [5] (OSC DRAW) > MULTIPLY; or [SHIFT] + OSCILLATOR [□] knob |
| 103 | Oscillator Chop Overtone | Adjusts overtone in chop mode | 0–127 | [SHIFT] + Pad [6] (OSC CHOP) > OVERTONE; or [SHIFT] + OSCILLATOR [LFO] knob |
| 104 | Oscillator Chop Comb | Adjusts comb filter in chop mode | 0–127 | [SHIFT] + Pad [6] (OSC CHOP) > COMB; or [SHIFT] + OSCILLATOR [SUB] knob |
| 107 | Oscillator Draw Step/Slope | Switches draw mode step/slope | 0–127 | [SHIFT] + Pad [5] (OSC DRAW) > SW; or [SHIFT] + OSCILLATOR [△] knob |

##### Filter
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 24 | Filter Envelope Depth | Envelope modulation depth for filter cutoff | 0–127 | FILTER [ENV] knob |
| 25 | Filter LFO Depth | LFO modulation depth for filter cutoff | 0–127 | FILTER [LFO] knob |
| 26 | Filter Keyboard Follow | Keyboard tracking for filter cutoff | 0–127 | [SHIFT] + Pad [7] (FILTER KYBD); or [SHIFT] + FILTER [ENV] knob |
| 27 | Filter Bend Sensitivity | Pitch bend range for filter (0–255 mapped to 0–127) | 0–127 | [SHIFT] + Pad [15] (MENU) > Filter Bend Sens |
| 71 | Filter Resonance | Emphasizes frequencies around cutoff | 0–127 | FILTER [RESO] knob |
| 74 | Filter Frequency | Sets cutoff frequency | 0–127 | FILTER [FREQ] knob |

##### Envelope
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 28 | Amp Envelope Mode SW | Switches amp envelope mode (gate or envelope) | 0–127 (0–63: Gate, 64–127: Envelope) | [SHIFT] + [AMP] pad |
| 29 | Envelope Trigger Mode | Selects envelope trigger (LFO, Gate, Trig) | 0–127 | [SHIFT] + [ENV TRG] pad |
| 30 | Envelope Sustain | Sustain level | 0–127 | ENV [SUSTAIN] knob |
| 72 | Envelope Release | Release time | 0–127 | ENV [RELEASE] knob |
| 73 | Envelope Attack | Attack time | 0–127 | ENV [ATTACK] knob |
| 75 | Envelope Decay | Decay time | 0–127 | ENV [DECAY] knob |

##### Effects (EFX)
| CC | Parameter Name | Description/Function | Value Range | Hardware Mapping |
|----|----------------|----------------------|-------------|------------------|
| 89 | EFX Reverb Time | Reverb decay time | 0–127 | [SHIFT] + [REVERB] knob |
| 90 | EFX Delay Time | Delay time | 0–127 | [SHIFT] + [DELAY] knob |
| 91 | EFX Reverb Level | Reverb send level | 0–127 | [REVERB] knob |
| 92 | EFX Delay Level | Delay send level | 0–127 | [DELAY] knob |

#### Additional MIDI Configurations

These are accessible via the S-1's menu system (not direct CCs) but can be relevant for editor implementation:

- **MIDI Channel (CH)**: 1–16 (sets basic channel).
- **Transmit Program Change (txPc)**: Off/On (sends PC on pattern change).
- **Receive Program Change (rxPc)**: Off/On (changes pattern on received PC).
- **Program Change Channel (Pc.Ch)**: 1–16 (dedicated channel for PC messages).
- **MIDI Clock Sync (SYnC)**: Auto/Internal/MIDI/USB (selects sync source; SYNC IN jack overrides).
- **MIDI Thru (thru)**: Off/On (routes MIDI IN to OUT).
- **Pitch Bend Range**: Configurable via menu (Oscillator Bend Sens: 0–240 cents; Filter Bend Sens: 0–255 cents).
- **Motions**: The S-1 can record CCs and pitch bend into sequencer patterns (up to 8 parameters + pitch bend per pattern). Real-time recording captures incoming MIDI CCs.

This list covers all documented MIDI mappings. For building an editor, map these CCs to UI elements (e.g., sliders for 0–127 values, switches for binary on/off). Test with firmware v1.02 or later for features like LFO Sync.