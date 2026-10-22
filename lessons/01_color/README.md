# Color and tint

Compare the original texture with its tinted result. Tint (1, 1, 1) preserves RGB; lowering one component reduces that channel.

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- BaseTexture (TextureObject): T_ColorGrid, with color RGB sampled as sRGB
- UV (float2): TextureCoordinate
- Tint (float3): linear RGB multiplier

Paste the HLSL and connect output to Emissive Color.

## Native graph

TextureCoordinate → Texture Sample UVs. Texture Sample RGB and Vector Parameter Tint → Multiply → Emissive Color. Use Surface / Opaque / Unlit.

In Unreal, use `/Game/Week08/01_Tint/MI_Tint_Graph` or `MI_Tint_HLSL`. Both are in gallery bay 01. `MI_Source` is the untinted baseline.

## Check

Start with white Tint, then reduce only Red. Capture before and after using the same texture and view. Explain why the original white squares change, while multiplication cannot turn a zero channel into a positive one.
