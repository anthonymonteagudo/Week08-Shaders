// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
float light = clamp(dot(normalize(N), normalize(L)), 0.0, 1.0);
float brush = texture(BrushTexture, UV * Tiling).r;
light = clamp(light + (brush * 2.0 - 1.0) * TextureInfluence, 0.0, 1.0);
vec3 color = mix(ShadowColor, MidColor, step(0.35, light));
color = mix(color, Tint, step(0.7, light));
