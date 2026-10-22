# Texture and motion

Set Speed to zero. Then double Tiling. Does the mesh move?

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- UV (float2)
- Tiling (float)
- Seconds (float)
- Speed (float)
- BrushTexture (TextureObject)
- Tint (float3)
- ShadowColor (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

TexCoord × Tiling → Add time offset → Texture Sample UVs. Use R → Lerp Alpha. In a Custom node use a TextureObject named BrushTexture; UE supplies BrushTextureSampler.

## Check

Set Speed to zero. Then double Tiling. Does the mesh move?
