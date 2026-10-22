// UE Custom node body. Output Type: Float3. See README for inputs.
float light = saturate(dot(normalize(N), normalize(L)));
float mask = step(Threshold, light);
return lerp(ShadowColor, Tint, mask);
