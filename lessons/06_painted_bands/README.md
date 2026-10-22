# Palette and brush texture

Set TextureInfluence to zero, then .18. Change the palette without changing the band boundaries.

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- N (float3, world)
- L (float3, world)
- UV (float2)
- Tiling (float)
- TextureInfluence (float)
- BrushTexture (TextureObject)
- ShadowColor (float3)
- MidColor (float3)
- Tint (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

Brush sample R × 2 − 1 → Multiply influence → Add to light response → Saturate. Two Step nodes select three colors through two Lerps. The full UE playground adds a fourth color and editable thresholds.

## Check

Set TextureInfluence to zero, then .18. Change the palette without changing the band boundaries.
