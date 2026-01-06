export interface CCParam {
    cc: number;
    name: string;
    min: number;
    max: number;
    defaultValue?: number;
}

export const S1_CC_MAP: Record<string, CCParam> = {
    // LFO
    LFO_RATE: { cc: 3, name: 'LFO Rate', min: 0, max: 127 },
    LFO_WAVE: { cc: 12, name: 'LFO Waveform', min: 0, max: 255 }, // Check ranges
    LFO_MOD_DEPTH: { cc: 17, name: 'LFO Mod Depth', min: 0, max: 127 },

    // Oscillator
    OSC_LFO_PITCH: { cc: 13, name: 'Osc LFO Mod', min: 0, max: 127 },
    OSC_RANGE: { cc: 14, name: 'Osc Range', min: 0, max: 127 },
    OSC_PULSE_WIDTH: { cc: 15, name: 'Pulse Width', min: 0, max: 127 },
    OSC_PWM_SRC: { cc: 16, name: 'PWM Source', min: 0, max: 127 },
    OSC_BEND_SENS: { cc: 18, name: 'Bend Sens', min: 0, max: 127 },

    // Mixer
    MIX_SQUARE: { cc: 19, name: 'Square Level', min: 0, max: 127 }, // Assuming 19/20 split matches Saw/Square or similar
    MIX_SAW: { cc: 20, name: 'Saw Level', min: 0, max: 127 },       // Need to verify which is which
    MIX_SUB: { cc: 21, name: 'Sub Level', min: 0, max: 127 },
    MIX_NOISE: { cc: 23, name: 'Noise Level', min: 0, max: 127 },
    SUB_TYPE: { cc: 22, name: 'Sub Type', min: 0, max: 127 },

    // Filter
    FILTER_CUTOFF: { cc: 74, name: 'Cutoff', min: 0, max: 127 }, // Standard
    FILTER_RES: { cc: 71, name: 'Resonance', min: 0, max: 127 }, // Standard
    FILTER_ENV_DEPTH: { cc: 24, name: 'Filter Env Depth', min: 0, max: 127 },

    // Envelope (Standard ADSR CCs often used, but S-1 might vary via knobs)
    // S-1 has [ENV] faders. Usually mapped to standard ADSR CCs:
    ENV_ATTACK: { cc: 73, name: 'Attack', min: 0, max: 127 },
    ENV_DECAY: { cc: 75, name: 'Decay', min: 0, max: 127 },
    ENV_SUSTAIN: { cc: 79, name: 'Sustain', min: 0, max: 127 }, // Standard is 79/64? 
    ENV_RELEASE: { cc: 72, name: 'Release', min: 0, max: 127 },

    // Global
    PORTAMENTO: { cc: 5, name: 'Portamento Time', min: 0, max: 127 },
    VOLUME: { cc: 7, name: 'Volume', min: 0, max: 127 },
};
