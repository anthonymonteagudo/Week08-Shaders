// UE Custom node body. Output Type: Float3. See README for inputs.
float3 base = Texture2DSample(BaseTexture, BaseTextureSampler, UV).rgb;
float3 color = base * Tint;
return color;
