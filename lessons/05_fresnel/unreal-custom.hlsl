// UE Custom node body. Output Type: Float3. See README for inputs.
float edge = pow(1.0 - saturate(dot(normalize(N), normalize(V))), RimPower);
return lerp(Tint, EdgeColor, edge * EdgeStrength);
