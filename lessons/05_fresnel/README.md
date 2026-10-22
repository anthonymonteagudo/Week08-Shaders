# View mask and dark edge

Try a pale edge, then dark purple. Why can a Lerp darken the edge while adding a positive color cannot?

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- N (float3, world)
- V (float3, world, toward camera)
- RimPower (float)
- EdgeStrength (float)
- Tint (float3)
- EdgeColor (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

PixelNormalWS · CameraVectorWS → Saturate → OneMinus → Power → Multiply EdgeStrength → Lerp Alpha. UE Fresnel with BaseReflectFraction 0 is a related native shortcut.

## Check

Try a pale edge, then dark purple. Why can a Lerp darken the edge while adding a positive color cannot?
