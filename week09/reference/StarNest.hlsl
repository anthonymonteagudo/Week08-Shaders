// Star Nest by Pablo Roman Andrioli (Kali), 2013. License: MIT.
// Source: https://www.shadertoy.com/view/XlfGRj
// UE adaptation: explicit UV convention, scalar controls, explicit rotations,
// GLSL-compatible mod, guarded denominator, bounded adjustable step count.
// Custom inputs: UV(float2), Time, Aspect, Speed, Zoom, VolumeSteps,
// Brightness, Saturation, RotationX, RotationY, FreezeTime, UseFrozenTime.
float2 uv = float2(UV.x, 1.0-UV.y)-0.5;
uv.y /= max(Aspect,0.01);
float3 dir = float3(uv*Zoom,1.0);
float t=lerp(Time,FreezeTime,saturate(UseFrozenTime))*Speed+0.25;
float a1=0.5+RotationX*2.0, a2=0.8+RotationY*2.0;
float c1=cos(a1),s1=sin(a1),c2=cos(a2),s2=sin(a2);
// GLSL row-vector *= column-major mat2: do not blindly use HLSL '*'.
dir.xz=float2(c1*dir.x+s1*dir.z,-s1*dir.x+c1*dir.z);
dir.xy=float2(c2*dir.x+s2*dir.y,-s2*dir.x+c2*dir.y);
float3 origin=float3(1.0,0.5,0.5)+float3(t*2.0,t,-2.0);
origin.xz=float2(c1*origin.x+s1*origin.z,-s1*origin.x+c1*origin.z);
origin.xy=float2(c2*origin.x+s2*origin.y,-s2*origin.x+c2*origin.y);
float travel=0.1, fade=1.0;
float3 result=0;
int steps=clamp((int)VolumeSteps,4,20);
[loop] for(int r=0;r<20;r++){
 if(r>=steps) break;
 float3 p=origin+travel*dir*0.5;
 // GLSL mod(x,y)=x-y*floor(x/y); fmod differs for negative x.
 p=abs(0.85-(p-1.7*floor(p/1.7)));
 float previous=0, variation=0;
 [loop] for(int i=0;i<17;i++){
  p=abs(p)/max(dot(p,p),0.000001)-0.53;
  float len=length(p); variation+=abs(len-previous);previous=len;
 }
 float darkMatter=max(0.0,0.3-variation*variation*0.001);
 variation*=variation*variation;
 if(r>6)fade*=1.0-darkMatter;
 result+=fade;
 result+=float3(travel,travel*travel,pow(travel,4))*variation*Brightness*fade;
 fade*=0.73;travel+=0.1;
}
return lerp(length(result).xxx,result,Saturation)*0.01;
