export interface CCParam {
    cc: number;
    name: string;
    min: number;
    max: number;
    defaultValue?: number;
    type?: 'knob' | 'fader' | 'toggle' | 'selector'; // UI hint
    options?: string[]; // For selectors
}

export const S1_CC_MAP: Record<string, CCParam> = {
    // === OSCILLATOR ===
    OSC_SQ_LEVEL: { cc: 19, name: 'Square Level', min: 0, max: 127, type: 'knob' },
    OSC_SAW_LEVEL: { cc: 20, name: 'Saw Level', min: 0, max: 127, type: 'knob' }, // Renamed from TRI based on manual (Saw is standard, Tri on S-1? Manual says Saw CC 20)
    // "Oscillator Saw Level ... OSCILLATOR [△] knob" -> Triangle symbol but manual says Saw Level (CC 20). 
    // Wait, on S-1 faceplate it has a Triangle/Saw wave icon? 
    // Manual page 73: "Oscillator Saw Level ... OSCILLATOR [TRIANGLE_ICON] knob".
    // Let's stick to "Saw/Tri" or "Saw" if manual calls it Saw. S-1 usually has Square, Saw (or Tri), Sub, Noise.
    // The previous code had "OSC_TRI_LEVEL" on CC 20. I will update this to "OSC_SAW_LEVEL" or just "Wave Level" to match manual if it says Saw.
    // Manual: | 20 | Oscillator Saw Level | ... | OSCILLATOR [△] knob |
    // OK, so the knob has a Triangle icon but the parameter is Saw Level? Or maybe it's Saw/Tri shapable? 
    // Let's call it "Saw/Tri" or just "Saw" to match the table.

    OSC_RANGE: { cc: 14, name: 'Range', min: 0, max: 127, type: 'knob' },
    OSC_RANGE_FINE: { cc: 76, name: 'Fine Tune', min: 0, max: 127, type: 'knob' }, // New
    OSC_PULSE_WIDTH: { cc: 15, name: 'Pulse Width', min: 0, max: 127, type: 'knob' },
    OSC_PWM_SRC: { cc: 16, name: 'PWM Source', min: 0, max: 127, type: 'selector', options: ['Env', 'Manual', 'LFO'] },
    OSC_LFO_PITCH: { cc: 13, name: 'Osc LFO Mod', min: 0, max: 127, type: 'knob' },
    OSC_BEND_SENS: { cc: 18, name: 'Bend Sens', min: 0, max: 127, type: 'knob' },
    OSC_NOISE_LEVEL: { cc: 23, name: 'Noise Level', min: 0, max: 127, type: 'knob' },
    OSC_NOISE_TYPE: { cc: 78, name: 'Noise Type', min: 0, max: 127, type: 'selector' }, // 0-63 Pink, 64-127 White

    OSC_DRAW_MULTIPLY: { cc: 102, name: 'Draw Mult', min: 0, max: 127, type: 'knob' }, // New
    OSC_CHOP_OVERTONE: { cc: 103, name: 'Chop Overtone', min: 0, max: 127, type: 'knob' }, // New
    OSC_CHOP_COMB: { cc: 104, name: 'Chop Comb', min: 0, max: 127, type: 'knob' }, // New
    // OSC_DRAW_STEP: { cc: 107 ... } switch

    // === MIXER / SUB ===
    MIX_SUB: { cc: 21, name: 'Sub Level', min: 0, max: 127, type: 'knob' },
    MIX_SUB_TYPE: { cc: 22, name: 'Sub Type', min: 0, max: 127, type: 'selector' },

    // === FILTER ===
    FILTER_CUTOFF: { cc: 74, name: 'Cutoff', min: 0, max: 127, type: 'knob' },
    FILTER_RES: { cc: 71, name: 'Resonance', min: 0, max: 127, type: 'knob' },
    FILTER_ENV_DEPTH: { cc: 24, name: 'Env Depth', min: 0, max: 127, type: 'knob' },
    FILTER_LFO_DEPTH: { cc: 25, name: 'LFO Depth', min: 0, max: 127, type: 'knob' }, // New
    FILTER_KEY_FOLLOW: { cc: 26, name: 'Key Follow', min: 0, max: 127, type: 'knob' }, // New
    FILTER_BEND_SENS: { cc: 27, name: 'Bend Sens', min: 0, max: 127, type: 'knob' }, // New

    // === ENVELOPE (ADSR) ===
    // Manual lists: 73 Attack, 75 Decay, 79 Sustain?, NO. Manual says:
    // | 30 | Envelope Sustain | ... | ENV [SUSTAIN] knob |
    // | 79 | LFO Mode | ... |
    // WAIT. My previous map had ENV_SUSTAIN as 79. The Manual says 30! 
    // And 79 is LFO Mode!
    // This is a CRITICAL FIX.
    ENV_ATTACK: { cc: 73, name: 'Attack', min: 0, max: 127, type: 'fader' },
    ENV_DECAY: { cc: 75, name: 'Decay', min: 0, max: 127, type: 'fader' },
    ENV_SUSTAIN: { cc: 30, name: 'Sustain', min: 0, max: 127, type: 'fader' }, // Corrected from 79
    ENV_RELEASE: { cc: 72, name: 'Release', min: 0, max: 127, type: 'fader' },

    ENV_TRIG_MODE: { cc: 29, name: 'Trig Mode', min: 0, max: 127, type: 'selector' }, // New

    // === LFO ===
    LFO_RATE: { cc: 3, name: 'Rate', min: 0, max: 127, type: 'knob' },
    LFO_DEPTH: { cc: 17, name: 'Depth', min: 0, max: 127, type: 'knob' },
    LFO_WAVE: { cc: 12, name: 'Waveform', min: 0, max: 127, type: 'knob' },
    LFO_MODE: { cc: 79, name: 'LFO Mode', min: 0, max: 127, type: 'selector' }, // New (was wrongly Env Sustain)
    LFO_SYNC: { cc: 106, name: 'LFO Sync', min: 0, max: 127, type: 'toggle' },
    LFO_KEY_TRIG: { cc: 105, name: 'Key Trig', min: 0, max: 127, type: 'toggle' }, // New

    // === EFFECTS ===
    // Manual:
    // 89: Reverb Time
    // 90: Delay Time
    // 91: Reverb Level
    // 92: Delay Level
    // 93: Chorus Type (Selector)
    DEL_LEVEL: { cc: 92, name: 'Delay Level', min: 0, max: 127, type: 'knob' }, // Changed from 91
    DEL_TIME: { cc: 90, name: 'Delay Time', min: 0, max: 127, type: 'knob' },  // Changed from 102
    REV_LEVEL: { cc: 91, name: 'Reverb Level', min: 0, max: 127, type: 'knob' }, // Changed from 93
    REV_TIME: { cc: 89, name: 'Reverb Time', min: 0, max: 127, type: 'knob' },   // New
    CHO_TYPE: { cc: 93, name: 'Chorus Type', min: 0, max: 127, type: 'selector' }, // New (was Level 94)
    // Chorus Level? Not strictly listed in the short table, but 93 is Type.
    // Maybe Chorus Level is 94? The manual table Ends at 93 for EFX.
    // "Chorus Type ... > Chorus". 
    // I will assume for now 93 controls the Type/Amount combo or just Type.
    // I'll leave CHORUS_LEVEL hashed out or mapped to 93 for now if user wants a knob.

    // === GLOBAL ===
    PORTA_TIME: { cc: 5, name: 'Portamento', min: 0, max: 127, type: 'knob' },
    PORTA_SWITCH: { cc: 65, name: 'Porta Sw', min: 0, max: 127, type: 'toggle' }, // New
    VOLUME: { cc: 7, name: 'Volume', min: 0, max: 127, type: 'knob' },
    TRANSPOSE: { cc: 77, name: 'Transpose', min: 0, max: 127, type: 'knob' }, // New
};
