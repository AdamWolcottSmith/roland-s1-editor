# Roland S-1 Web Editor - Project Context

## Overview
A browser-based MIDI editor and controller for the Roland S-1 Tweak Synth.
This application serves as a visual interface for the S-1, allowing users to create, save, and load "Soft Presets".

## Architecture
- **Tech Stack**: Vite, React, TypeScript.
- **core**: `webmidi` (or native API) for MIDI communication.
- **Styling**: Vanilla CSS / Custom Components for a premium, dark, Roland AIRA-inspired aesthetic.

## "Soft Preset" System
**Constraint**: The Roland S-1 does not facilitate full SysEx patch dumping for saving/restoring the hardware state exactly as it is (based on current research).
**Solution**:
1.  **State Source of Truth**: The Web App is the master.
2.  **Loading**: Improving a preset sends a burst of CC messages to the S-1 to match the App's state.
3.  **Saving**: The App saves its current internal state to a JSON file.

## Specific Requirements
- **MIDI Connection**: Must handle `navigator.requestMIDIAccess` gracefully.
- **Visuals**: High-quality, responsive knobs and sliders. glow effects (Green/Orange/Red) to match S-1 LED colors.
- **Routing**: Minimal routing needed, single-page "Synth Panel" view is primary.

## Development Rules
- Use `npm run dev` to test locally.
- Keep components small and focused (e.g., `Knob.tsx`, `Fader.tsx`).
- No placeholders; unimplemented features should be hidden or disabled.
