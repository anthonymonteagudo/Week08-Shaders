// UE Custom node body. Output Type: Float3. See README for inputs.
float light = saturate(dot(normalize(N), normalize(L)));
float brush = Texture2DSample(BrushTexture, BrushTextureSampler, UV * Tiling).r;
light = saturate(light + (brush * 2.0 - 1.0) * TextureInfluence);
float3 color = lerp(ShadowColor, MidColor, step(0.35, light));
return lerp(color, Tint, step(0.7, light));
