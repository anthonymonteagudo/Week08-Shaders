// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
float mask = smoothstep(0.25, 0.75, UV.x);
vec3 color = mix(ShadowColor, Tint, mask);
