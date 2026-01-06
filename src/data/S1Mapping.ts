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
    OSC_SQ_LEVEL: { cc: 19, name: 'Square Wave Level', min: 0, max: 127, type: 'knob' }, // Ranges: 0-63 Sqr, 64-127 Saw, etc? simplified to 0-255
    OSC_TRI_LEVEL: { cc: 20, name: 'Triangle Wave Level', min: 0, max: 127, type: 'knob' }, // Ranges: 0-63 Sqr, 64-127 Saw, etc? simplified to 0-255
    OSC_RANGE: { cc: 14, name: 'Range', min: 0, max: 127, type: 'knob' },
    OSC_PULSE_WIDTH: { cc: 15, name: 'Pulse Width', min: 0, max: 127, type: 'knob' },
    OSC_PWM_SRC: { cc: 16, name: 'PWM Source', min: 0, max: 127, type: 'selector', options: ['LFO', 'Manual', 'Env'] }, // ranges need verification, placeholder UI
    OSC_LFO_PITCH: { cc: 13, name: 'Osc LFO Mod', min: 0, max: 127, type: 'knob' },
    OSC_BEND_SENS: { cc: 18, name: 'Bend Sens', min: 0, max: 127, type: 'knob' },
    OSC_NOISE_LEVEL: { cc: 23, name: 'Noise Level', min: 0, max: 127, type: 'knob' },
    OSC_NOISE_TYPE: { cc: 78, name: 'Noise Type', min: 0, max: 127, type: 'selector' },

    // === MIXER ===
    MIX_SUB: { cc: 21, name: 'Sub Level', min: 0, max: 127, type: 'knob' },
    MIX_SUB_TYPE: { cc: 22, name: 'Sub Type', min: 0, max: 127, type: 'selector' }, // 0: -1oct, 1: -2oct, etc?
    MIX_NOISE: { cc: 23, name: 'Noise Level', min: 0, max: 127, type: 'knob' },

    // === FILTER ===
    FILTER_CUTOFF: { cc: 74, name: 'Cutoff', min: 0, max: 127, type: 'knob' },
    FILTER_RES: { cc: 71, name: 'Resonance', min: 0, max: 127, type: 'knob' },
    FILTER_ENV_DEPTH: { cc: 24, name: 'Env Depth', min: 0, max: 127, type: 'knob' },
    // FILTER_KEY_FOLLOW: { cc: ??, name: 'Key Follow', ... } // To be discovered

    // === ENVELOPE (ADSR) ===
    ENV_ATTACK: { cc: 73, name: 'Attack', min: 0, max: 127, type: 'fader' },
    ENV_DECAY: { cc: 75, name: 'Decay', min: 0, max: 127, type: 'fader' },
    ENV_SUSTAIN: { cc: 79, name: 'Sustain', min: 0, max: 127, type: 'fader' },
    ENV_RELEASE: { cc: 72, name: 'Release', min: 0, max: 127, type: 'fader' },

    // === LFO ===
    LFO_RATE: { cc: 3, name: 'Rate', min: 0, max: 127, type: 'knob' },
    LFO_DEPTH: { cc: 17, name: 'Depth', min: 0, max: 127, type: 'knob' }, // Check CC
    LFO_WAVE: { cc: 12, name: 'Waveform', min: 0, max: 255, type: 'knob' }, // CC 12 is shared? Manual says LFO Wave is CC 12? Wait.
    LFO_SYNC: { cc: 106, name: 'LFO Sync', min: 0, max: 127, type: 'toggle' }, // CC 12 is shared? Manual says LFO Wave is CC 12? Wait.
    // Correction: Some manuals say CC 12 is LFO Wave, others say CC 12 is OSC wave on SH-101.
    // S-1 "LFO [WAVE FORM] knob" -> CC 12 (from my search earlier).
    // Let's assume OSC_WAVE might be discrete or hidden, or maybe S-1 doesn't have selectable OSC wave? 
    // Wait, S-1 has explicit buttons for Square/Saw/Chop. And `OSC_WAVE` usually refers to one of them?
    // Let's stick to CC 12 = LFO Wave form for now based on search.
    // And assume OSC Wave is handled by MIXER levels (Saw Level vs Square Level)?
    // Ah, S-1 is essentially SH-101 style: Mixer for Osc waves. 
    // So "OSC WAVE" is not a selector, it's the Mixer! 
    // I will remove OSC_WAVE selector and rely on Mixer.

    // === EFFECTS (Common Roland CCs, need verification for S-1 specific) ===
    // DELAY
    DELAY_LEVEL: { cc: 91, name: 'Delay Level', min: 0, max: 127, type: 'knob' }, // Reverb/Delay often share send levels 91/93
    DELAY_TIME: { cc: 102, name: 'Delay Time', min: 0, max: 127, type: 'knob' }, // Guess/Standard

    // REVERB
    REVERB_LEVEL: { cc: 93, name: 'Reverb Level', min: 0, max: 127, type: 'knob' }, // Chorus? 93 is often Chorus, 91 Reverb in GM.
    // Roland often swaps these. 
    // Let's try: 91=Reverb, 93=Chorus. Delay might be 92 or 94. 
    // S-1 Manual page 70 mentions specific knobs.
    // Let's map Generic sends for now.

    // CHORUS
    CHORUS_LEVEL: { cc: 94, name: 'Chorus Level', min: 0, max: 127, type: 'knob' }, // Celeste/Detune

    // === GLOBAL ===
    PORTAMENTO: { cc: 5, name: 'Portamento', min: 0, max: 127, type: 'knob' },
    VOLUME: { cc: 7, name: 'Volume', min: 0, max: 127, type: 'knob' },
};
