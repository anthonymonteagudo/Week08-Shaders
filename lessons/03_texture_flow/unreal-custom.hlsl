// UE Custom node body. Output Type: Float3. See README for inputs.
float2 flowUV = UV * Tiling + float2(Seconds * Speed, 0.0);
float mask = Texture2DSample(BrushTexture, BrushTextureSampler, flowUV).r;
return lerp(ShadowColor, Tint, mask);
