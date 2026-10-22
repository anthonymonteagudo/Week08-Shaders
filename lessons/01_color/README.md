# Color and tint

Change the RGB channels independently. Which channel changes the result?

## Files

Edit `fragment.glsl`, save, then click Reload files in the web display. `unreal-custom.hlsl` is the equivalent Custom-node body, not a standalone shader. The browser executes GLSL only.

## Unreal

Create Surface / Opaque / Unlit material. Add Custom, Output Type Float3. Add these named inputs and connect parameters or engine nodes:

- Tint (float3)

Paste the HLSL and connect output to Emissive Color.

## Native graph

Vector Parameter Tint → Emissive Color. Use Surface / Opaque / Unlit.

## Check

Change the RGB channels independently. Which channel changes the result?
