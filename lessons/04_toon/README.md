# Light response and bands

Raise Threshold. Which region grows? Keep N and L in the same coordinate space.

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- N (float3, world)
- L (float3, world, toward light)
- Threshold (float)
- Tint (float3)
- ShadowColor (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

PixelNormalWS and LightDirection → Normalize → DotProduct → Saturate → Step (X = light, Y = Threshold) → Lerp Alpha. Unlit output uses a direction parameter, not scene lights.

## Check

Raise Threshold. Which region grows? Keep N and L in the same coordinate space.
