# UVs and masks

Move the transition edges. Explain why this is a mask rather than a color texture.

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- UV (float2)
- Tint (float3)
- ShadowColor (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

TextureCoordinate → ComponentMask R → SmoothStep (Min .25, Max .75) → Lerp Alpha. ShadowColor → A; Tint → B; result → Emissive Color.

## Check

Move the transition edges. Explain why this is a mask rather than a color texture.
