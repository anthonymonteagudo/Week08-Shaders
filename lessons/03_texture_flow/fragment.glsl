// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
vec2 flowUV = UV * Tiling + vec2(Seconds * Speed, 0.0);
float mask = texture(BrushTexture, flowUV).r;
vec3 color = mix(ShadowColor, Tint, mask);
