// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
vec3 base = texture(BaseTexture, UV).rgb;
vec3 color = base * Tint;
