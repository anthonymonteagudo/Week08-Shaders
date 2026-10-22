// UE Custom node body. Output Type: Float3. See README for inputs.
float mask = smoothstep(0.25, 0.75, UV.x);
return lerp(ShadowColor, Tint, mask);
