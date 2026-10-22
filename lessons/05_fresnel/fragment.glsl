// Original classroom calculation. Host supplies inputs; GLSL runs in the browser.
float edge = pow(1.0 - clamp(dot(normalize(N), normalize(V)), 0.0, 1.0), RimPower);
vec3 color = mix(Tint, EdgeColor, edge * EdgeStrength);
