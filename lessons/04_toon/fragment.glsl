// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
float light = clamp(dot(normalize(N), normalize(L)), 0.0, 1.0);
float mask = step(Threshold, light);
vec3 color = mix(ShadowColor, Tint, mask);
