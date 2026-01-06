import { S1_CC_MAP } from '../data/S1Mapping';


type MidiCallback = (message: MIDIMessageEvent) => void;

class MidiManager {
    private access: MIDIAccess | null = null;
    private output: MIDIOutput | null = null;
    private input: MIDIInput | null = null;
    private listeners: Set<MidiCallback> = new Set();

    async init(): Promise<boolean> {
        try {
            this.access = await navigator.requestMIDIAccess({ sysex: false }); // S-1 no SysEx

            // Auto-select S-1 if found
            this.autoConnect();

            this.access.onstatechange = (e) => {
                console.log('MIDI State Change', e);
                this.autoConnect();
            };

            return true;
        } catch (e) {
            console.error('MIDI Access Failed', e);
            return false;
        }
    }

    private autoConnect() {
        if (!this.access) return;

        // Simple heuristic: look for "S-1" or "Roland" in existing ports
        const outputs = Array.from(this.access.outputs.values());
        const inputs = Array.from(this.access.inputs.values());

        const s1Output = outputs.find(o => o.name && (o.name.includes('S-1') || o.name.includes('Roland')));
        const s1Input = inputs.find(i => i.name && (i.name.includes('S-1') || i.name.includes('Roland')));

        if (s1Output && this.output?.id !== s1Output.id) {
            this.setOutput(s1Output.id);
            console.log('Auto-connected Output:', s1Output.name);
        }
        if (s1Input && this.input?.id !== s1Input.id) {
            this.setInput(s1Input.id);
            console.log('Auto-connected Input:', s1Input.name);
        }
    }

    getOutputs() {
        return this.access ? Array.from(this.access.outputs.values()) : [];
    }

    getInputs() {
        return this.access ? Array.from(this.access.inputs.values()) : [];
    }

    setOutput(id: string) {
        if (!this.access) return;
        this.output = this.access.outputs.get(id) || null;
    }

    setInput(id: string) {
        if (!this.access) return;
        if (this.input) {
            this.input.onmidimessage = null;
        }
        this.input = this.access.inputs.get(id) || null;
        if (this.input) {
            this.input.onmidimessage = this.handleMidiMessage.bind(this);
        }
    }

    private handleMidiMessage(e: MIDIMessageEvent) {
        this.listeners.forEach(cb => cb(e));
    }

    addListener(cb: MidiCallback) {
        this.listeners.add(cb);
    }

    removeListener(cb: MidiCallback) {
        this.listeners.delete(cb);
    }

    sendCC(cc: number, value: number, channel = 0) { // Channel 0 = MIDI Ch 1 implies... S-1 defaults to Ch 3?
        if (!this.output) return;

        // S-1 default channel might be 3 (0-indexed = 2). Let's make it configurable later.
        // For now, assuming Global or User selected channel.
        const status = 0xB0 | (channel & 0x0F);
        this.output.send([status, cc, value]);
    }

    sendBurst(preset: Record<string, number>, channel = 2) { // 2 = Ch 3
        if (!this.output) return;

        Object.entries(preset).forEach(([key, value]) => {
            const mapping = S1_CC_MAP[key];
            if (mapping) {
                this.sendCC(mapping.cc, value, channel);
                // MIDI buffer precaution? Browser usually handles it, but large bursts can choke hardware.
                // We might need a small delay if it drops messages.
            }
        });
    }
}

export const midiManager = new MidiManager();
